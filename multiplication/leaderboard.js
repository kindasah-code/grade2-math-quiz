/* Temporary, anonymous classroom leaderboard. Casual use only; not tamper-proof. */
(function(){
"use strict";
const API="https://superjsonblob.com/api/jsonBlob", KIND="multiplication-class-v1", TTL=48*3600*1000;
const $=id=>document.getElementById(id);
const ar=v=>String(v).replace(/[0-9]/g,c=>String.fromCharCode(c.charCodeAt(0)+0x630));
const valid=id=>/^[0-9a-f-]{32,50}$/i.test(id||"");
const apiUrl=id=>API+"/"+encodeURIComponent(id);
const cat=(level,seconds)=>level+":"+seconds;
let room=new URLSearchParams(location.search).get("board");
if(!valid(room))room=null;
let board=null, pending=false, recent=null, lastName="";
try{lastName=localStorage.getItem("multiplication-public-name")||""}catch(e){}
const home=$("home"),results=$("results");
if(!home||!results)return;
const section=document.createElement("section");
section.className="lb-section";
section.innerHTML=[
'<h2 class="section-title">🏆 لوحة المتصدرين للفصل</h2><div class="panel lb-panel">',
'<p>نتائج تحدّي الضرب بين الزملاء. اكتب اسمًا مستعارًا فقط؛ لا حاجة إلى حساب أو تسجيل دخول.</p>',
'<div id="lbNew"><button class="btn" id="lbCreate" type="button">إنشاء رابط لوحة الفصل (٤٨ ساعة)</button><p class="settings-note">أنشئ الرابط مرة واحدة وأرسله للطلاب ليروا النتائج نفسها.</p></div>',
'<div id="lbActive" hidden><p id="lbExpires" class="settings-note"></p>',
'<div class="lb-share"><input class="select" id="lbURL" type="text" readonly aria-label="رابط الفصل"><button class="btn secondary small" id="lbCopy" type="button">نسخ الرابط</button></div>',
'<p class="settings-note">شارك رابط الفصل الذي يحتوي على رمز اللوحة، وليس رابط اللعبة الأصلي.</p></div>',
'<div id="lbControls" class="lb-controls" hidden><label for="lbCategory">نوع التحدّي</label><select id="lbCategory" class="select">',
'<option value="easy:0">سهل • بدون مؤقّت</option><option value="hard:0">صعب • بدون مؤقّت</option>',
'<option value="easy:30">سهل • ٣٠ ثانية</option><option value="hard:30">صعب • ٣٠ ثانية</option>',
'<option value="easy:60">سهل • ٦٠ ثانية</option><option value="hard:60">صعب • ٦٠ ثانية</option>',
'<option value="easy:90">سهل • ٩٠ ثانية</option><option value="hard:90">صعب • ٩٠ ثانية</option>',
'<option value="easy:120">سهل • ١٢٠ ثانية</option><option value="hard:120">صعب • ١٢٠ ثانية</option>',
'</select><button class="btn ghost small" id="lbRefresh" type="button">تحديث</button></div>',
'<p class="lb-message" id="lbMessage" role="status" aria-live="polite"></p><div id="lbRows"></div>',
'<p class="settings-note">لوحة ودّية وليست نتائج موثّقة؛ قد يغيّر المشاركون الدرجات. استخدم ألقابًا بدل الأسماء الكاملة. تنتهي النتائج المعروضة بعد ٤٨ ساعة، وقد يحتفظ مزود التخزين بالبيانات لمدة أطول.</p></div>'
].join("");
const mode=home.querySelector(".mode-grid");
if(mode)mode.insertAdjacentElement("afterend",section);else home.appendChild(section);
const resultBlock=document.createElement("div");
resultBlock.className="panel lb-result";
resultBlock.hidden=true;
resultBlock.id="lbResult";
resultBlock.innerHTML=[
'<h3>🏆 انشر نتيجتك للفصل</h3><p class="settings-note">اختياري: أدخل اسمًا مستعارًا لنشر أفضل نتيجة لتحدّيك.</p>',
'<div class="lb-share"><label class="sr-only" for="lbName">اسم مستعار</label>',
'<input class="select" id="lbName" maxlength="20" type="text" dir="auto" placeholder="الاسم المستعار">',
'<button class="btn small" id="lbPublish" type="button">نشر النتيجة</button></div>',
'<button class="btn secondary small" id="lbNewFromResult" type="button" hidden>إنشاء لوحة للفصل أولًا</button>',
'<p class="lb-message" id="lbSaved" role="status" aria-live="polite"></p>'
].join("");
results.appendChild(resultBlock);$("lbName").value=lastName;
const expired=b=>!b||!Number.isFinite(Date.parse(b.expiresAt))||Date.now()>=Date.parse(b.expiresAt);
const msg=(id,value,error)=>{const n=$(id);n.textContent=value;n.classList.toggle("lb-error",!!error)};
const busy=v=>{pending=v;$("lbCreate").disabled=v;$("lbNewFromResult").disabled=v;$("lbPublish").disabled=v||!board||expired(board)};
async function json(url,opt){
 const res=await fetch(url,Object.assign({cache:"no-store"},opt||{}));
 if(!res.ok)throw Error("HTTP "+res.status);
 return {value:await res.json(),headers:res.headers};
}
function checked(v){
 if(!v||v.kind!==KIND||!Array.isArray(v.entries)||!Number.isFinite(Date.parse(v.expiresAt)))throw Error("Invalid board");
 return v;
}
function link(){
 const u=new URL(location.href);u.searchParams.set("board",room);u.hash="";return u.href;
}
function draw(){
 if(!board)return;
 $("lbNew").hidden=true;$("lbActive").hidden=false;$("lbURL").value=link();
 if(expired(board)){
  $("lbControls").hidden=true;$("lbRows").replaceChildren();$("lbPublish").disabled=true;
  msg("lbExpires","انتهت صلاحية لوحة الفصل بعد ٤٨ ساعة. يمكنك إنشاء واحدة جديدة من رابط اللعبة الأصلي.",true);
  msg("lbMessage","انتهت هذه اللوحة ولا تقبل نتائج جديدة.",true);
  return;
 }
 $("lbPublish").disabled=pending;
 const remaining=Math.max(0,Date.parse(board.expiresAt)-Date.now()),hours=Math.ceil(remaining/3600000);
 msg("lbExpires","المتبقي على انتهاء لوحة الفصل: قرابة "+ar(hours)+" ساعة.");
 $("lbControls").hidden=false;
 const rows=$("lbRows");rows.replaceChildren();
 const chosen=$("lbCategory").value,byName=new Map();
 for(const x of board.entries){
  if(!x||typeof x.name!=="string"||!Number.isFinite(Number(x.score))||cat(x.difficulty,x.seconds)!==chosen)continue;
  const key=x.name.trim().toLocaleLowerCase("ar");if(!key)continue;
  const val={name:x.name.slice(0,20),score:Math.max(0,Math.min(100000,Math.round(Number(x.score)))),duration:Math.max(0,Math.round(Number(x.duration)||0))};
  const prev=byName.get(key);
  if(!prev||val.score>prev.score||(val.score===prev.score&&val.duration<prev.duration))byName.set(key,val);
 }
 const list=[...byName.values()].sort((a,b)=>b.score-a.score||a.duration-b.duration).slice(0,15);
 if(!list.length){const e=document.createElement("p");e.className="settings-note";e.textContent="لا توجد نتائج لهذا التحدّي بعد. كن أول من يشارك!";rows.appendChild(e);return}
 const table=document.createElement("table");table.className="lb-table";
 table.innerHTML="<thead><tr><th>المركز</th><th>الاسم</th><th>الصحيح</th><th>الوقت</th></tr></thead>";
 const tbody=document.createElement("tbody");
 list.forEach((x,i)=>{const tr=document.createElement("tr");const vals=[i===0?"🥇":i===1?"🥈":i===2?"🥉":ar(i+1),x.name,ar(x.score),ar(x.duration)+" ث"];for(const v of vals){const td=document.createElement("td");td.textContent=v;tr.appendChild(td)}tbody.appendChild(tr)});
 table.appendChild(tbody);rows.appendChild(table);
}
async function refresh(){
 if(!room)return;
 msg("lbMessage","جارٍ تحميل نتائج الفصل…");
 try{board=checked((await json(apiUrl(room))).value);draw();if(!expired(board))msg("lbMessage","هذه النتائج مرئية لجميع الطلاب الذين لديهم رابط الفصل.")}
 catch(e){msg("lbMessage","تعذّر تحميل النتائج العامة. قد تكون الخدمة الخارجية غير متاحة.",true)}
}
async function create(){
 if(pending)return;busy(true);msg("lbMessage","جارٍ إنشاء رابط الفصل…");
 const now=Date.now(),seed={kind:KIND,createdAt:new Date(now).toISOString(),expiresAt:new Date(now+TTL).toISOString(),entries:[]};
 try{
  const r=await json(API,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(seed)});
  const id=r.value.id||String(r.headers.get("Location")||"").split("/").pop();
  if(!valid(id))throw Error("No board id");
  room=id;board=seed;
  const u=new URL(location.href);u.searchParams.set("board",room);history.replaceState({},"",u.href);
  msg("lbMessage","تم إنشاء اللوحة! انسخ رابط الفصل وأرسله للطلاب.");
  msg("lbSaved",recent?"اكتب اسمك المستعار ثم اضغط «نشر النتيجة».":"");
  $("lbNewFromResult").hidden=true;
 }catch(e){msg("lbMessage","تعذّر إنشاء اللوحة. لم يُنشأ حساب أو يحفظ أي اسم. حاول مرة أخرى.",true);msg("lbSaved","تعذّر إنشاء اللوحة.",true)}
 finally{busy(false);draw()}
}
function localId(){
 const key="multiplication-public-player-id";let id;
 try{id=localStorage.getItem(key)}catch(e){}
 if(!id){id=window.crypto&&crypto.randomUUID?crypto.randomUUID():Date.now()+"-"+Math.random().toString(36).slice(2);try{localStorage.setItem(key,id)}catch(e){}}
 return id;
}
async function publish(){
 if(pending||!room||!recent)return;
 const name=$("lbName").value.trim().replace(/\s+/g," ");
 if(name.length<2||name.length>20||/@|[<>/\\]/.test(name)||/^[0-9٠-٩۰-۹+\- ]+$/.test(name)){msg("lbSaved","اكتب اسمًا مستعارًا من حرفين إلى ٢٠ حرفًا، وليس رقم هاتف أو بريدًا.",true);return}
 if(!board||expired(board)){msg("lbSaved","انتهت هذه اللوحة؛ أنشئ رابط فصل جديدًا.",true);return}
 busy(true);msg("lbSaved","جارٍ نشر النتيجة…");
 try{
  const uid=localId(),now=Date.now(),r=recent;
  const entry={uid,name,score:r.correct,answered:r.answered,duration:r.duration,difficulty:r.difficulty,seconds:r.seconds,savedAt:new Date(now).toISOString(),submissionId:uid+"-"+now};
  const type=cat(entry.difficulty,entry.seconds);
  let done=false,previous=false;
  for(let i=0;i<3;i++){
   const v=checked((await json(apiUrl(room))).value);if(expired(v))throw Error("Expired");
   const entries=v.entries.filter(x=>x&&typeof x.name==="string").slice(-95);
   const existing=entries.find(x=>x.uid===uid&&cat(x.difficulty,x.seconds)===type);
   if(existing&&(Number(existing.score)>entry.score||(Number(existing.score)===entry.score&&Number(existing.duration)<=entry.duration))){board=v;done=true;previous=true;break}
   const replacement=Object.assign({},v,{entries:entries.filter(x=>!(x.uid===uid&&cat(x.difficulty,x.seconds)===type)).concat(entry)});
   await json(apiUrl(room),{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(replacement)});
   board=checked((await json(apiUrl(room))).value);
   if(board.entries.some(x=>x.submissionId===entry.submissionId)){done=true;break}
  }
  if(!done)throw Error("Save not confirmed");
  lastName=name;try{localStorage.setItem("multiplication-public-name",name)}catch(e){}
  $("lbCategory").value=type;draw();
  msg("lbSaved",previous?"✅ نتيجتك السابقة أفضل، واحتفظنا بها.":"✅ نُشرت نتيجتك على لوحة الفصل!");
 }catch(e){msg("lbSaved","تعذّر تأكيد نشر النتيجة. بقيت نتيجتك المحلية محفوظة؛ حاول مجددًا.",true)}
 finally{busy(false)}
}
function offer(run){
 if(!run||run.mode!=="challenge"){resultBlock.hidden=true;return}
 recent={correct:run.correct,answered:run.answered,duration:Math.max(0,Math.round((Date.now()-run.started)/1000)),difficulty:run.difficulty,seconds:run.seconds};
 resultBlock.hidden=false;$("lbName").value=lastName;
 $("lbNewFromResult").hidden=!!room;
 $("lbPublish").disabled=!room||!board||expired(board);
 msg("lbSaved",room?"يمكنك نشر نتيجتك باسم مستعار.":"للمشاركة مع زملائك، أنشئ رابط الفصل أولًا.");
}
$("lbCreate").addEventListener("click",create);$("lbNewFromResult").addEventListener("click",create);
$("lbPublish").addEventListener("click",publish);
$("lbCategory").addEventListener("change",draw);
$("lbRefresh").addEventListener("click",refresh);
$("lbCopy").addEventListener("click",async()=>{
 const l=$("lbURL");
 try{if(navigator.clipboard&&navigator.clipboard.writeText)await navigator.clipboard.writeText(l.value);
 else{l.focus();l.select();document.execCommand("copy")}
 msg("lbMessage","نُسخ رابط الفصل. أرسله للطلاب ليشاركوا في اللوحة نفسها.")
 }catch(e){l.select();msg("lbMessage","حدد الرابط وانسخه يدويًا للمشاركة.")}
});
window.MasteryLeaderboard={offer,refresh};
if(room)refresh();else msg("lbMessage","يمكنك إنشاء لوحة للفصل حين تريد.");
})();