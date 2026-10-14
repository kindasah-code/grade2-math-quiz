/* أبطال الضرب — shared, nickname-only classroom scoreboard.
   Uses a free public key-value API, without accounts or classroom links.
   For casual classroom competition only: server entries are publicly writable,
   so rankings cannot guarantee integrity. Local memorization tracking is separate.
*/
(function(){
"use strict";
const $=id=>document.getElementById(id);
const API="https://keyvalue.immanuel.co/api/KeyVal";
const APP="rywpvtou";
const SHARDS=8;
const TTL=48*60*60*1000;
const NAME_KEY="multiplication-player-name-v2";
const LOCAL_KEY="multiplication-named-local-scores-v2";
const ar=n=>String(n).replace(/[0-9]/g,d=>String.fromCharCode(0x0660+Number(d)));
const home=$("home"),results=$("results");
if(!home||!results)return;
let currentName="",lastShown=0,publicLoading=false,submitting=false,recent=null,refreshTimer=null;
try{currentName=(localStorage.getItem(NAME_KEY)||"").slice(0,20)}catch(e){}
const cats=[
 ["ch_e0","تحدّي سهل • بدون مؤقّت"],["ch_h0","تحدّي صعب • بدون مؤقّت"],
 ["ch_e30","تحدّي سهل • ٣٠ ثانية"],["ch_h30","تحدّي صعب • ٣٠ ثانية"],
 ["ch_e60","تحدّي سهل • ٦٠ ثانية"],["ch_h60","تحدّي صعب • ٦٠ ثانية"],
 ["ch_e90","تحدّي سهل • ٩٠ ثانية"],["ch_h90","تحدّي صعب • ٩٠ ثانية"],
 ["ch_e120","تحدّي سهل • ١٢٠ ثانية"],["ch_h120","تحدّي صعب • ١٢٠ ثانية"],
 ["pr","التدريب الذكي • ٢٠ سؤالًا"],["mc","الاختيار من متعدد • ٢٠ سؤالًا"],
 ["as","اختبار الإتقان • ١٠٠ سؤال"]
];
function category(run){
 return run.mode==="challenge"?"ch_"+(run.difficulty==="hard"?"h":"e")+run.seconds:
        run.mode==="assessment"?"as":run.mode==="choices"?"mc":"pr";
}
function nameKey(name){return String(name||"").trim().replace(/\s+/g," ").toLocaleLowerCase("ar")}
function nickname(value){return String(value||"").trim().replace(/\s+/g," ").slice(0,20)}
function nameIsValid(s){return s.length>=2&&s.length<=20&&!/[@<>/\\]/.test(s)&&!/\b(?:https?:|www\.)/i.test(s)&&!/^[\d٠-٩۰-۹\-+ ]+$/.test(s)}
function hash(s){
 let h=2166136261;
 for(let i=0;i<s.length;i++){h=Math.imul(h^s.charCodeAt(i),16777619)}
 return (h>>>0)%SHARDS;
}
function shardKey(cat,shard){return "mathheroes_v3_"+cat+"_s"+shard}
function pack(data){
 const str=JSON.stringify(data);
 const bytes=new TextEncoder().encode(str);
 let binary="";for(let i=0;i<bytes.length;i++)binary+=String.fromCharCode(bytes[i]);
 return btoa(binary).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"");
}
function unpack(s){
 const encoded=s.replace(/-/g,"+").replace(/_/g,"/");
 const binary=atob(encoded+"=".repeat((4-encoded.length%4)%4));
 const bytes=Uint8Array.from(binary,c=>c.charCodeAt(0));
 const result=JSON.parse(new TextDecoder("utf-8").decode(bytes));
 if(!Array.isArray(result))throw Error("Invalid score list");
 return result;
}
async function remoteGet(cat,part){
 const key=shardKey(cat,part);
 const uri=API+"/GetValue/"+APP+"/"+key;
 const res=await fetch(uri,{mode:"cors",cache:"no-store"});
 if(!res.ok)throw Error("GET "+res.status);
 const body=await res.text();let raw;
 try{raw=JSON.parse(body)}catch(e){throw Error("Unreadable scoreboard response")}
 if(raw===null||raw===""||raw==="null")return [];
 if(typeof raw!=="string")throw Error("Unexpected scoreboard response");
 const rows=unpack(raw);
 return rows.filter(r=>Array.isArray(r)&&typeof r[0]==="string"&&r[0].length<=20&&Number.isFinite(r[1])&&Number.isFinite(r[4]));
}
async function remoteSet(cat,part,rows){
 const encoded=pack(rows);
 if(encoded.length>980)throw Error("SCORE_CAPACITY");
 const uri=API+"/UpdateValue/"+APP+"/"+shardKey(cat,part)+"/"+encoded;
 // Important: an empty POST with NO Content-Type headers is a simple CORS request.
 // The provider does not return preflight CORS headers.
 const res=await fetch(uri,{method:"POST",mode:"cors",cache:"no-store"});
 if(!res.ok)throw Error("POST "+res.status);
 const result=await res.text();
 if(result.trim()!=="true"&&result.trim()!=='"true"')throw Error("Score was not accepted");
}
function latestRows(rows){
 const cutoff=Date.now()-TTL;
 const map=new Map();
 for(const r of rows){
  if(!Array.isArray(r)||typeof r[0]!=="string"||!Number.isFinite(Number(r[4]))||Number(r[4])<cutoff||Number(r[4])>Date.now()+120000)continue;
  const key=nameKey(r[0]),score=Math.round(Number(r[1])),attempts=Math.round(Number(r[2])),
   secs=Math.max(0,Math.round(Number(r[3])));
  if(!nameIsValid(r[0])||!Number.isFinite(score)||score<0||score>100000||!Number.isFinite(attempts)||attempts<score||attempts>100001)continue;
  const item=[r[0],score,attempts,secs,Number(r[4])],old=map.get(key);
  if(!old||item[1]>old[1]||(item[1]===old[1]&&item[3]<old[3]))map.set(key,item);
 }
 return [...map.values()].sort((a,b)=>b[1]-a[1]||a[3]-b[3]||a[0].localeCompare(b[0],"ar"));
}
function readLocal(){
 try{
  const list=JSON.parse(localStorage.getItem(LOCAL_KEY)||"[]");
  return Array.isArray(list)?list.filter(x=>x&&typeof x.name==="string"&&Number.isFinite(x.at)&&Date.now()-x.at<TTL&&x.at<=Date.now()):[];
 }catch(e){return []}
}
function saveLocal(x){
 try{localStorage.setItem(LOCAL_KEY,JSON.stringify(readLocal().concat(x).slice(-120)))}catch(e){}
}
function setStatus(id,value,error){
 const el=$(id);if(!el)return;
 el.textContent=value;el.classList.toggle("lb-error",!!error);
}
function buildChoices(){
 const options=cats.map(([value,label])=>{const op=document.createElement("option");op.value=value;op.textContent=label;return op});
 $("lbCategory").replaceChildren(...options);
 $("lbLocalCategory").replaceChildren(...cats.map(([value,label])=>{const op=document.createElement("option");op.value=value;op.textContent=label;return op}));
}
const nameSection=document.createElement("section");
nameSection.className="lb-player";
nameSection.innerHTML=[
 '<div class="panel lb-intro">',
 '<div><h2>👋 ابدأ باسمك</h2><p class="settings-note">اكتب اسمك أو لقبًا قصيرًا. لا حاجة إلى تسجيل دخول. يُنشر الاسم للآخرين فقط إذا اخترت نشر نتيجتك.</p></div>',
 '<div class="lb-name-row"><label for="lbPlayerName" class="sr-only">اسم اللاعب</label>',
 '<input id="lbPlayerName" class="select" type="text" maxlength="20" dir="auto" autocomplete="nickname" placeholder="مثال: أحمد" aria-describedby="lbNameHint">',
 '<span class="chip lb-name-state" id="lbNameState">اكتب اسمك للبدء</span></div>',
 '<p id="lbNameHint" class="lb-message" role="status" aria-live="polite"></p>',
 '</div>'
].join("");
const hero=home.querySelector(".hero");
if(hero)hero.insertAdjacentElement("afterend",nameSection);else home.prepend(nameSection);
const mainBoard=document.createElement("section");
mainBoard.className="lb-board-section";
mainBoard.innerHTML=[
 '<h2 class="section-title">🏆 لوحة المتصدرين العامة</h2>',
 '<div class="panel lb-public">',
 '<p class="settings-note">نتائج الطلاب من كل الأجهزة • خلال آخر ٤٨ ساعة • يتم تحديثها تلقائيًا عند العودة للصفحة. استخدم اسمًا مستعارًا بدل الاسم الكامل.</p>',
 '<div class="lb-controls"><label for="lbCategory">الترتيب حسب</label>',
 '<select class="select" id="lbCategory"></select>',
 '<button id="lbRefresh" class="btn ghost small" type="button">↻ تحديث</button></div>',
 '<p id="lbRemoteStatus" class="lb-message" role="status" aria-live="polite">جارٍ تحميل نتائج المتصدرين...</p>',
 '<div id="lbPublicRows"></div>',
 '<p class="settings-note lb-disclaimer">لوحة ودّية وليست نتائج موثّقة؛ يمكن للمشاركين إدخال ألقاب متشابهة أو تعديل البيانات. تختفي النتائج القديمة من العرض بعد ٤٨ ساعة، لكن قد يحتفظ مزوّد التخزين بها لمدة أطول.</p>',
 '</div>'
].join("");
const modeGrid=home.querySelector(".mode-grid");
if(modeGrid)modeGrid.insertAdjacentElement("afterend",mainBoard);else home.appendChild(mainBoard);
const localBoard=document.createElement("details");
localBoard.className="panel lb-local-board";
localBoard.innerHTML=[
 '<summary>📱 نتائجي على هذا الجهاز فقط</summary>',
 '<p class="settings-note">النسخة المحلية للاحتفاظ بالنتيجة إن تعذّر النشر. تختلف عن النتائج العامة أعلاه.</p>',
 '<div class="lb-controls"><label for="lbLocalCategory">الوضع</label><select id="lbLocalCategory" class="select"></select></div>',
 '<div id="lbLocalRows"></div>'
].join("");
mainBoard.insertAdjacentElement("afterend",localBoard);
const resultCard=document.createElement("div");
resultCard.id="lbPublishCard";resultCard.hidden=true;resultCard.className="panel lb-result";
resultCard.innerHTML=[
 '<h3>🏆 انشر نتيجتك للطلاب</h3>',
 '<p id="lbResultSummary" class="settings-note"></p>',
 '<button id="lbPublish" class="btn" type="button">نشر نتيجتي على اللوحة العامة</button>',
 '<p id="lbPublishStatus" class="lb-message" role="status" aria-live="polite"></p>',
 '<p class="settings-note">النشر اختياري. الاسم والنتيجة سيظهران لأي شخص يفتح هذا الرابط.</p>'
].join("");
results.appendChild(resultCard);
buildChoices();
const input=$("lbPlayerName");input.value=currentName;
function updateNameState(){
 const n=nickname(input.value),ready=nameIsValid(n);
 $("lbNameState").textContent=ready?"جاهز للعب ✓":"اكتب اسمك للبدء";
 $("lbNameState").classList.toggle("lb-name-ready",ready);
 if(ready)setStatus("lbNameHint","");
}
function saveName(){
 const n=nickname(input.value);
 if(!nameIsValid(n)){
  setStatus("lbNameHint","أدخل اسمًا من حرفين إلى ٢٠ حرفًا، وليس رقم هاتف أو بريدًا.",true);
  try{input.focus()}catch(e){}
  return false;
 }
 if(n!==currentName){
  currentName=n;
  try{localStorage.setItem(NAME_KEY,n)}catch(e){}
  if(window.MasteryGame&&typeof window.MasteryGame.useNickname==="function")window.MasteryGame.useNickname(n);
 }
 updateNameState();
 return true;
}
input.addEventListener("input",updateNameState);
input.addEventListener("change",()=>{if(nameIsValid(nickname(input.value)))saveName()});
updateNameState();
if(currentName&&window.MasteryGame&&typeof window.MasteryGame.useNickname==="function")window.MasteryGame.useNickname(currentName);
function tableRows(target,list){
 const root=$(target);root.replaceChildren();
 if(!list.length){
  const p=document.createElement("p");
  p.className="settings-note";p.textContent="لا توجد نتائج بعد لهذا الوضع. كن أول من يظهر في الترتيب!";
  root.appendChild(p);return;
 }
 const table=document.createElement("table");table.className="lb-table";
 table.innerHTML="<thead><tr><th>المركز</th><th>الاسم</th><th>الصحيح</th><th>الوقت</th></tr></thead>";
 const body=document.createElement("tbody");
 list.slice(0,15).forEach((r,i)=>{
  const tr=document.createElement("tr");
  const values=[i===0?"🥇":i===1?"🥈":i===2?"🥉":ar(i+1),r[0],ar(r[1])+" / "+ar(r[2]),ar(r[3])+" ث"];
  for(const value of values){const td=document.createElement("td");td.textContent=value;tr.appendChild(td)}
  body.appendChild(tr);
 });
 table.appendChild(body);root.appendChild(table);
}
function renderLocal(){
 const cat=$("lbLocalCategory").value;
 const rows=readLocal().filter(x=>(x.category||(x.difficulty?"ch_"+(x.difficulty==="hard"?"h":"e")+x.seconds:"pr"))===cat)
 .map(x=>[x.name,x.correct,x.answered,x.duration,x.at]);
 tableRows("lbLocalRows",latestRows(rows));
}
async function refresh(){
 if(publicLoading)return;
 publicLoading=true;$("lbRefresh").disabled=true;
 setStatus("lbRemoteStatus","جارٍ تحميل النتائج العامة...");
 const cat=$("lbCategory").value;
 try{
  const shards=await Promise.all(Array.from({length:SHARDS},(_,i)=>remoteGet(cat,i)));
  if($("lbCategory").value!==cat)return;
  const rows=latestRows(shards.flat());
  tableRows("lbPublicRows",rows);
  lastShown=Date.now();
  setStatus("lbRemoteStatus","<small>✓</small> النتائج مشتركة بين الأجهزة • آخر تحديث الآن".replace("<small>✓</small>","✓"));
 }catch(e){
  console.warn("Public leaderboard loading failed:",e);
  setStatus("lbRemoteStatus","تعذّر تحميل النتائج العامة حاليًا. اضغط «تحديث» للمحاولة مجددًا. تبقى نتائجك محفوظة محليًا.",true);
 }finally{publicLoading=false;$("lbRefresh").disabled=false}
}
async function publish(){
 if(submitting||!recent)return;
 if(!saveName())return;
 submitting=true;$("lbPublish").disabled=true;
 const cat=category(recent),name=currentName,shard=hash(nameKey(name));
 const entry=[name,Math.round(recent.correct),Math.round(recent.answered),Math.max(0,Math.round((Date.now()-recent.started)/1000)),Date.now()];
 setStatus("lbPublishStatus","جارٍ حفظ النتيجة العامة...");
 try{
  let confirmed=false,alreadyBetter=false;
  for(let attempt=0;attempt<3;attempt++){
   const current=latestRows(await remoteGet(cat,shard));
   const existing=current.find(r=>nameKey(r[0])===nameKey(name));
   if(existing && (existing[1]>entry[1] || (existing[1]===entry[1]&&existing[3]<=entry[3]))){
     confirmed=true;alreadyBetter=true;break;
   }
   const next=current.filter(r=>nameKey(r[0])!==nameKey(name)).concat([entry]);
   await remoteSet(cat,shard,next);
   const verify=latestRows(await remoteGet(cat,shard));
   const stored=verify.find(r=>nameKey(r[0])===nameKey(name));
   if(stored&&stored[1]>=entry[1]){confirmed=true;break}
  }
  if(!confirmed)throw Error("Could not verify remote score");
  $("lbCategory").value=cat;
  setStatus("lbPublishStatus",alreadyBetter?"✓ نتيجتك السابقة أفضل، واحتفظنا بها في الترتيب العام.":"✓ نُشرت نتيجتك وأصبحت مرئية للجميع على هذا الرابط.");
  $("lbPublish").textContent="تحديث أفضل نتيجة";
  refresh();
 }catch(e){
  console.warn("Public score submission failed:",e);
  setStatus("lbPublishStatus",e.message==="SCORE_CAPACITY"?"لوحة هذا الوضع ممتلئة. جرّب مجددًا لاحقًا.":"تعذّر تأكيد نشر النتيجة. نتيجتك محفوظة على هذا الجهاز، ويمكنك المحاولة مجددًا.",true);
 }finally{submitting=false;$("lbPublish").disabled=false}
}
function offer(run){
 if(!run||!Number.isFinite(run.correct)){resultCard.hidden=true;return}
 if(!currentName)saveName();
 const name=currentName||nickname(input.value);
 if(!nameIsValid(name)){resultCard.hidden=true;return}
 recent={
  mode:run.mode,difficulty:run.difficulty||"easy",seconds:run.seconds||0,
  correct:run.correct,answered:run.answered,started:run.started
 };
 const cat=category(recent),item={
  name,mode:recent.mode,category:cat,
  correct:recent.correct,answered:recent.answered,
  duration:Math.max(0,Math.round((Date.now()-recent.started)/1000)),
  difficulty:recent.difficulty,seconds:recent.seconds,at:Date.now()
 };
 saveLocal(item);$("lbLocalCategory").value=cat;renderLocal();
 resultCard.hidden=false;$("lbPublish").disabled=false;
 $("lbPublish").textContent="نشر نتيجتي على اللوحة العامة";
 $("lbResultSummary").textContent="اللاعب: "+name+" • الإجابات الصحيحة: "+ar(recent.correct)+" من "+ar(recent.answered)+" • نشرها علنًا اختياري.";
 setStatus("lbPublishStatus","تم حفظ النتيجة على جهازك. اضغط زر النشر لتظهر للآخرين.");
}
$("lbPublish").addEventListener("click",publish);
$("lbRefresh").addEventListener("click",refresh);
$("lbCategory").addEventListener("change",refresh);
$("lbLocalCategory").addEventListener("change",renderLocal);
document.addEventListener("visibilitychange",()=>{if(!document.hidden && !home.hidden && Date.now()-lastShown>40000)refresh()});
refreshTimer=setInterval(()=>{if(!document.hidden && !home.hidden && Date.now()-lastShown>110000)refresh()},120000);
window.MasteryLeaderboard={readyToPlay:saveName,offer,refresh};
renderLocal();refresh();
})();