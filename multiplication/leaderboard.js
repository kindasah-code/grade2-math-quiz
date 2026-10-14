/* One-link, nickname-first classroom interface.
 * Shared online publishing is intentionally NOT claimed unless a backend is verified.
 * Casual high scores are stored locally per browser and expire after 48 hours.
 */
(function () {
"use strict";
const $=id=>document.getElementById(id);
const toArabic=n=>String(n).replace(/[0-9]/g,d=>String.fromCharCode(0x0660+Number(d)));
const NAME_KEY="multiplication-player-name-v2";
const SCORE_KEY="multiplication-named-local-scores-v2";
const TTL=48*60*60*1000;
const home=$("home"), results=$("results");
if(!home || !results)return;
let currentName="";
try{currentName=(localStorage.getItem(NAME_KEY)||"").slice(0,20)}catch(e){}
function readScores(){
 try{
  const raw=JSON.parse(localStorage.getItem(SCORE_KEY)||"[]");
  return Array.isArray(raw)?raw.filter(x=>x&&Number.isFinite(x.at)&&Date.now()-x.at<TTL&&Date.now()>=x.at&&typeof x.name==="string"&&Number.isFinite(x.correct)).slice(-120):[];
 }catch(e){return []}
}
function persistScores(scores){try{localStorage.setItem(SCORE_KEY,JSON.stringify(scores))}catch(e){}}
function normalizeName(s){return String(s||"").trim().replace(/\s+/g," ").slice(0,20)}
function status(message,error){
 const node=$("lbNameHint");if(node){node.textContent=message;node.classList.toggle("lb-error",!!error)}
}
const section=document.createElement("section");
section.className="lb-player";
section.innerHTML=[
 '<div class="panel lb-intro">',
 '<div><h2>👋 ابدأ باسمك</h2><p class="settings-note">ادخل اسمك أو لقبًا قصيرًا للعب. لا حاجة إلى حساب أو تسجيل دخول.</p></div>',
 '<div class="lb-name-row"><label for="lbPlayerName" class="sr-only">اسم اللاعب</label>',
 '<input class="select" id="lbPlayerName" type="text" maxlength="20" dir="auto" placeholder="مثال: أحمد" autocomplete="nickname" aria-describedby="lbNameHint">',
 '<span class="chip lb-name-state" id="lbNameState">اكتب اسمك للبدء</span></div>',
 '<p id="lbNameHint" class="lb-message" role="status" aria-live="polite"></p>',
 '</div>'
].join("");
const hero=home.querySelector(".hero");
if(hero)hero.insertAdjacentElement("afterend",section);
else home.prepend(section);

const localBoard=document.createElement("details");
localBoard.className="panel lb-local-board";
localBoard.innerHTML=[
 '<summary><span>🏆 النتائج السابقة <small>آخر ٤٨ ساعة • هذا الجهاز فقط</small></span></summary>',
 '<p class="settings-note">المشاركة بين أجهزة الطلاب غير مفعّلة بعد. تظهر هنا أفضل النتائج المحفوظة في هذا المتصفح فقط، وليست ترتيبًا عامًا للفصل.</p>',
 '<div class="lb-controls"><label for="lbFilter">نوع التحدّي</label><select class="select" id="lbFilter">',
 '<option value="easy:0">سهل — بدون مؤقّت</option><option value="hard:0">صعب — بدون مؤقّت</option>',
 '<option value="easy:30">سهل — ٣٠ ثانية</option><option value="hard:30">صعب — ٣٠ ثانية</option>',
 '<option value="easy:60">سهل — ٦٠ ثانية</option><option value="hard:60">صعب — ٦٠ ثانية</option>',
 '<option value="easy:90">سهل — ٩٠ ثانية</option><option value="hard:90">صعب — ٩٠ ثانية</option>',
 '<option value="easy:120">سهل — ١٢٠ ثانية</option><option value="hard:120">صعب — ١٢٠ ثانية</option>',
 '</select></div><div id="lbLocalRows"></div>'
].join("");
const modes=home.querySelector(".mode-grid");
if(modes)modes.insertAdjacentElement("afterend",localBoard);
else home.appendChild(localBoard);

const resultNote=document.createElement("div");
resultNote.id="lbResultNote";
resultNote.className="panel lb-result";
resultNote.hidden=true;
resultNote.innerHTML='<h3>🏅 نتيجة <span id="lbFinalName"></span></h3><p id="lbFinalMessage" class="settings-note"></p>';
results.appendChild(resultNote);

const input=$("lbPlayerName");
input.value=currentName;
function updateNameState(){
 const name=normalizeName(input.value);
 $("lbNameState").textContent=name.length>=2?"جاهز للعب ✓":"اكتب اسمك للبدء";
 $("lbNameState").classList.toggle("lb-name-ready",name.length>=2);
 if(name.length>=2)status("");
}
function saveName(){
 const name=normalizeName(input.value);
 if(name.length<2){
  status("يرجى إدخال اسم من حرفين على الأقل قبل اختيار اللعبة.",true);
  try{input.focus({preventScroll:false})}catch(e){input.focus()}
  return false;
 }
 if(name!==currentName){
  currentName=name;
  try{localStorage.setItem(NAME_KEY,name)}catch(e){}
  if(window.MasteryGame && typeof window.MasteryGame.useNickname==="function"){
   window.MasteryGame.useNickname(name);
  }
 }
 updateNameState();
 return true;
}
function readyToPlay(){return saveName()}
input.addEventListener("input",updateNameState);
input.addEventListener("change",()=>{if(input.value.trim().length>=2)saveName()});
updateNameState();
if(currentName && window.MasteryGame && typeof window.MasteryGame.useNickname==="function"){
 window.MasteryGame.useNickname(currentName);
}
function renderLocal(){
 const root=$("lbLocalRows");root.replaceChildren();
 const key=$("lbFilter").value;
 const data=readScores();
 const byName=new Map();
 for(const x of data){
  if(x.difficulty+":"+x.seconds!==key)continue;
  const id=x.name.trim().toLocaleLowerCase("ar");
  const current=byName.get(id);
  if(!current||x.correct>current.correct||(x.correct===current.correct&&x.duration<current.duration))byName.set(id,x);
 }
 const sorted=[...byName.values()].sort((a,b)=>b.correct-a.correct||a.duration-b.duration).slice(0,15);
 if(!sorted.length){
  const empty=document.createElement("p");empty.className="settings-note";empty.textContent="لا توجد نتائج لهذا التحدّي محفوظة على الجهاز حتى الآن.";
  root.appendChild(empty);return;
 }
 const table=document.createElement("table");table.className="lb-table";
 table.innerHTML="<thead><tr><th>المركز</th><th>الاسم</th><th>الإجابات الصحيحة</th><th>الوقت</th></tr></thead>";
 const body=document.createElement("tbody");
 sorted.forEach((x,i)=>{
  const tr=document.createElement("tr");
  for(const v of [i===0?"🥇":i===1?"🥈":i===2?"🥉":toArabic(i+1),x.name,toArabic(x.correct),toArabic(x.duration)+" ث"]){
   const td=document.createElement("td");td.textContent=v;tr.appendChild(td);
  }
  body.appendChild(tr);
 });
 table.appendChild(body);root.appendChild(table);
}
$("lbFilter").addEventListener("change",renderLocal);
function offer(run){
 if(!run||run.mode!=="challenge"){resultNote.hidden=true;return}
 const name=normalizeName(currentName || input.value);
 if(!name){resultNote.hidden=true;return}
 const item={name,correct:run.correct,answered:run.answered,duration:Math.max(0,Math.round((Date.now()-run.started)/1000)),difficulty:run.difficulty,seconds:run.seconds,at:Date.now()};
 const items=readScores();items.push(item);persistScores(items.slice(-120));
 $("lbFinalName").textContent=name;
 $("lbFinalMessage").textContent="تم حفظ نتيجتك على هذا الجهاز فقط. عرض النتائج العامة ومشاركتها بين الأجهزة غير متاحين حاليًا.";
 resultNote.hidden=false;
 $("lbFilter").value=item.difficulty+":"+item.seconds;
 renderLocal();
}
window.MasteryLeaderboard={readyToPlay,offer};
renderLocal();
})();