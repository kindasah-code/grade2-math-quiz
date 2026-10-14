(() => {
  'use strict';
  const {questions,normalize,isCorrect,summarize}=window.MathQuiz;
  const main=document.getElementById('main');
  const STORE='grade2-math-quiz-v1';
  const arabic=n=>String(n).replace(/[0-9]/g,d=>'٠١٢٣٤٥٦٧٨٩'[d]);
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  let state={index:0,responses:{},hints:{},complete:false};
  let selection='',storageOK=true,saved=readSaved();
  let printDetails=[];

  function readSaved(){
    try{
      const raw=localStorage.getItem(STORE);
      if(!raw)return null;
      const s=JSON.parse(raw);
      if(s.version!==1||!Number.isInteger(s.index)||s.index<0||s.index>=questions.length||typeof s.complete!=='boolean'||!s.responses||!s.hints) return null;
      if(s.complete&&s.index!==questions.length-1)return null;
      for(let i=0;i<questions.length;i++){
        const q=questions[i],r=s.responses[q.id];
        if((i<s.index||s.complete)&&!r)return null;
        if(i>s.index&&r)return null;
        if(r&&(typeof r.value!=='string'||typeof r.hint!=='boolean'||(q.type==='choice'?!q.options.includes(r.value):!/^\d{1,3}$/.test(normalize(r.value)))))return null;
      }
      return s;
    }catch{storageOK=false;return null;}
  }
  function persist(){
    try{localStorage.setItem(STORE,JSON.stringify({...state,version:1}));saved={...state,version:1};}
    catch{storageOK=false;}
  }
  function focusTop(selector='h1'){
    const el=main.querySelector(selector);
    if(el){el.setAttribute('tabindex','-1');el.focus({preventScroll:true});}
    // The educational activities library sits above the math quiz. Keep navigation inside the quiz.
    main.scrollIntoView({block:'start',behavior:'auto'});
  }
  function dots(n,extra=false,object){return Array.from({length:n},(_,i)=>object==='pencil'?'<span class="pencil" aria-hidden="true">✏️</span>':`<i class="dot${extra&&i===n-1?' extra':''}" aria-hidden="true"></i>`).join('');}
  function blocks(tens,ones){return `<div class="blocks"><div class="tens">${'<i class="rod"></i>'.repeat(tens)}</div><div class="ones">${'<i class="cube"></i>'.repeat(ones)}</div></div>`;}
  function groups(values,object,near=false){return `<div class="groups">${values.map((n,i)=>`${i?'<span class="plus">+</span>':''}<div class="group">${n?dots(n,near&&i===1,object):'<span class="zero">لا شيء</span>'}</div>`).join('')}</div>`;}
  function visual(q){
    const v=q.visual;let html='',caption='',label='';
    if(v.type==='blocks'){
      html=blocks(v.tens,v.ones);caption='كل عمود أخضر = ١٠ · كل مكعب برتقالي = ١';label=`${arabic(v.tens)} أعمدة عشرات و${arabic(v.ones)} مكعبات آحاد`;
    }else if(v.type==='place'){
      html=`<div class="place"><div><span>العشرات</span><strong>${v.tens}</strong></div><div><span>الآحاد</span><strong>${v.ones}</strong></div></div>`;caption='انظر إلى منزلة كل رقم';label=`لوحة المنازل: العشرات ${v.tens}، الآحاد ${v.ones}`;
    }else if(v.type==='compare'){
      html=`<div class="compare">${v.numbers.map(n=>`<div><strong>${arabic(n)}</strong>${blocks(Math.floor(n/10),n%10)}</div>`).join('')}</div>`;caption='قارن العشرات أولًا، ثم الآحاد';label='٤٧: أربع عشرات وسبعة آحاد. ٤٢: أربع عشرات وآحادان';
    }else if(v.type==='cards'||v.type==='sequence'){
      html=`<div class="sequence">${v.items.map((x,i)=>`${i&&v.type==='sequence'?'<span class="sequence-arrow">→</span>':''}<span class="number-tile">${x}</span>`).join('')}</div>`;caption=v.type==='sequence'?'اتجاه قراءة النمط: من اليسار إلى اليمين':'قارن منزلة العشرات في الأعداد الثلاثة';label=v.items.join('، ');
    }else if(v.type==='shapes'){
      html=`<div class="sequence">${v.items.map(s=>s==='?'?'<span class="number-tile">؟</span>':`<span class="shape ${s}"></span>`).join('')}</div>`;caption='اقرأ الأشكال من اليسار إلى اليمين';label='من اليسار: دائرة، مثلث، مثلث، دائرة، مثلث، شكل مفقود';
    }else if(v.type==='groups'||v.type==='near'||v.type==='swap'){
      html=groups(v.groups,v.object,v.type==='near');
      if(v.type==='swap')html+='<p class="visual-caption" aria-hidden="true">⇄ يمكن تبديل مكان المجموعتين</p>';
      caption=v.type==='near'?'الدائرة المحددة تزيد واحدة على المجموعة الأولى':'اجمع عناصر المجموعات معًا';label=v.groups.map(n=>`مجموعة فيها ${arabic(n)} ${v.object==='pencil'?'أقلام':'دوائر'}`).join('، ');
    }else if(v.type==='ten'){
      html=`<div class="groups"><div class="ten-frame">${Array.from({length:10},(_,i)=>`<span class="ten-cell">${i<v.a?'<i class="dot"></i>':''}</span>`).join('')}</div><span class="plus">+</span><div class="group">${dots(v.b).replaceAll('class="dot"','class="dot orange"')}</div></div>`;caption='املأ الفراغات لتكوّن عشرة، ثم أضف ما يتبقى';label=`إطار من عشر خانات فيه ${arabic(v.a)} دوائر و${arabic(10-v.a)} خانات فارغة، ومعه ${arabic(v.b)} دوائر أخرى`;
    }else if(v.type==='line'){
      html=`<div class="number-line">${Array.from({length:v.end-v.start+1},(_,i)=>`<div class="line-point">${v.jumps!==null&&i<v.jumps?'<i class="jump">↷</i>':''}<b></b><span>${arabic(v.start+i)}</span></div>`).join('')}</div>`;caption='ابدأ من العدد على اليسار · كل خطوة إلى اليمين تزيد ١';label=`خط أعداد من ${arabic(v.start)} إلى ${arabic(v.end)}${v.jumps===null?'':`، مع ${arabic(v.jumps)} قفزات تبدأ من ${arabic(v.start)}`}`;
    }
    return `<div class="visual"><div role="img" aria-label="${esc(label)}">${html}</div><p class="visual-caption">${caption}</p></div>`;
  }
  function renderHome(){
    main.innerHTML=`<section class="hero"><div><div class="eyebrow">رياضيات · الصف الثاني الابتدائي</div><h1>كل سؤال،<br><em>خطوة إلى الأمام.</em></h1><p class="hero-description">هيا نكتشف الأعداد والأنماط وطرائق الجمع! فكّر، واستعن بالصور، وتعلّم من كل إجابة.</p><div class="tags"><span><b>٢٠</b> سؤالًا متنوعًا</span><span><b>✧</b> مساعدة بصرية</span><span><b>✓</b> شرح فوري</span></div>${saved?`<div class="saved-banner">${saved.complete?'لديك نتيجة اختبار محفوظة على هذا الجهاز.':`رحلتك محفوظة. أجبت عن ${arabic(Object.keys(saved.responses).length)} من ٢٠ سؤالًا.`}</div>`:''}<div class="actions"><button class="primary" id="start">${saved?'ابدأ اختبارًا جديدًا':'هيا نبدأ الرحلة'} <span aria-hidden="true">←</span></button>${saved?`<button class="secondary" id="resume">${saved.complete?'اعرض نتيجتي':'أكمل رحلتي'}</button>`:''}</div><p class="privacy">لا تحتاج إلى اسم أو تسجيل دخول. يُحفظ تقدّمك في هذا المتصفح فقط.</p>${!storageOK?'<p class="notice">حفظ التقدّم غير متاح في هذا المتصفح. يمكنك إكمال الاختبار الآن؛ قد تفقد التقدّم إذا أغلقت الصفحة.</p>':''}</div><div class="hero-art" aria-hidden="true"><div class="art-top"><span class="art-label">لنرَ الأعداد بطريقة جديدة</span><span class="spark">✦</span></div><div class="art-equation"><span class="art-number">٥</span><span>+</span><span class="art-number">٣</span><span>=</span><span>؟</span></div><div class="art-dots">${'<i></i>'.repeat(8)}</div><p class="art-note">عدّها. اجمعها. اكتشفها!</p></div></section><section class="chapters" aria-label="محتوى الاختبار"><article class="chapter-card"><span class="chapter-icon" aria-hidden="true">▥</span><div><small>الفصل الأول · ١٠ أسئلة</small><h2>القيمة المنزلية حتى ١٠٠ والأنماط</h2><p>العشرات والآحاد، قراءة الأعداد ومقارنتها وترتيبها، والأنماط.</p></div></article><article class="chapter-card"><span class="chapter-icon" aria-hidden="true">+</span><div><small>الفصل الثاني · ١٠ أسئلة</small><h2>طرائق الجمع</h2><p>العدّ التصاعدي، جمع العدد ونفسه، تكوين العشرة، وحل المسائل.</p></div></article></section><div class="how"><span><b>١</b>فكّر وأجب</span><span><b>٢</b>اقرأ الشرح</span><span><b>٣</b>انتقل عندما تستعد</span></div>`;
    document.getElementById('start').onclick=()=>{
      if(saved&&!confirm('بدء اختبار جديد يمسح المحاولة المحفوظة على هذا الجهاز. هل تريد البدء؟'))return;
      state={index:0,responses:{},hints:{},complete:false};selection='';persist();renderQuestion();focusTop();
    };
    const resume=document.getElementById('resume');
    if(resume)resume.onclick=()=>{state=JSON.parse(JSON.stringify(saved));state.complete?renderResults():renderQuestion();focusTop();};
  }
  function renderQuestion(){
    const q=questions[state.index],response=state.responses[q.id],answered=!!response;
    selection=answered?response.value:'';
    const done=Object.keys(state.responses).length;
    const score=summarize(state.responses);
    main.innerHTML=`<div class="quiz-top"><p>رحلتك <strong>${arabic(done)} / ٢٠</strong> سؤالًا مكتملًا</p><button id="home" class="text-button">احفظ وارجع للبداية</button></div><div class="progress-track" role="progressbar" aria-label="التقدّم في الاختبار" aria-valuemin="0" aria-valuemax="20" aria-valuenow="${done}"><div class="progress-fill" style="width:${done/20*100}%"></div></div><div class="quiz-layout"><section class="question-card" aria-labelledby="question-title"><div class="question-meta"><span>السؤال ${arabic(state.index+1)} من ٢٠</span><span class="skill-pill">${esc(q.skill)}</span></div><h1 id="question-title">${esc(q.prompt)}</h1>${visual(q)}<form id="answer-form" novalidate><span class="input-title" id="answer-label">${q.type==='choice'?'اختر إجابتك':'اكتب العدد المناسب'}</span>${q.sequenceOptions?'<p class="number-note">اقرأ كل اختيار من اليمين إلى اليسار، باتجاه السهم.</p>':''}${q.type==='choice'?`<div class="choices ${q.sequenceOptions?'sequence-choices':''}" role="group" aria-labelledby="answer-label">${q.options.map((o,i)=>`<button type="button" class="choice ${answered?(o===q.answer?'correct':o===response.value?'incorrect':''):''} ${answered&&o===response.value?'selected':''}" data-choice="${i}" aria-pressed="${answered&&o===response.value}" ${answered?'disabled':''}><span class="${q.sequenceOptions?'sequence-option':''}">${esc(o)}</span><span class="choice-marker" aria-hidden="true">${answered&&o===q.answer?'✓':answered&&o===response.value?'×':''}</span></button>`).join('')}</div>`:`<input class="number-input" id="number-answer" aria-labelledby="answer-label" aria-describedby="number-note validation" inputmode="numeric" autocomplete="off" maxlength="3" placeholder="؟" value="${answered?esc(response.value):''}" ${answered?'disabled':''}><p id="number-note" class="number-note">يمكنك الكتابة بالأرقام ١٢٣ أو 123.</p>`}<p id="validation" class="validation" role="status" aria-live="polite"></p>${!answered?`<div class="question-actions"><button type="button" id="hint" class="hint-button" aria-expanded="${!!state.hints[q.id]}" aria-controls="hint-text">✧ أحتاج تلميحًا</button><button type="submit" class="primary" id="check" ${q.type==='choice'?'disabled':''}>تحقّق من إجابتي</button></div>`:''}</form><p id="hint-text" class="hint-text" ${state.hints[q.id]?'':'hidden'}>${esc(q.hint)}</p><div id="feedback" aria-live="polite" aria-atomic="true">${answered?feedbackHTML(q,response):''}</div></section><aside class="side-card"><h2>خطوة بخطوة <span aria-hidden="true">✦</span></h2><p>${q.chapter===1?'الفصل الأول: القيمة المنزلية والأنماط':'الفصل الثاني: طرائق الجمع'}</p><div class="side-stats"><span>أسئلة مكتملة<strong>${arabic(done)}</strong></span><span>إجابات صحيحة<strong>${arabic(score.correct)}</strong></span></div><div class="question-dots" aria-label="خريطة تقدّم الأسئلة">${questions.map((x,i)=>`<span class="question-dot ${state.responses[x.id]?'done':''} ${i===state.index?'current':''}" aria-label="السؤال ${arabic(i+1)}: ${state.responses[x.id]?'مكتمل':i===state.index?'الحالي':'لم تبدأه'}">${state.responses[x.id]?'✓':arabic(i+1)}</span>`).join('')}</div><p class="side-tip">خذ وقتك. الصور والتلميحات هنا لمساعدتك، ولا تُنقص درجتك.</p>${!storageOK?'<p class="notice">الحفظ غير متاح. أبقِ الصفحة مفتوحة حتى تنتهي.</p>':''}</aside></div>`;
    document.getElementById('home').onclick=()=>{persist();renderHome();focusTop();};
    if(!answered){
      main.querySelectorAll('[data-choice]').forEach(btn=>btn.onclick=()=>{
        selection=q.options[Number(btn.dataset.choice)];
        main.querySelectorAll('[data-choice]').forEach(el=>{const selected=el===btn;el.classList.toggle('selected',selected);el.setAttribute('aria-pressed',String(selected));el.querySelector('.choice-marker').textContent=selected?'✓':'';});
        document.getElementById('check').disabled=false;
      });
      document.getElementById('hint').onclick=()=>{
        state.hints[q.id]=true;persist();document.getElementById('hint-text').hidden=false;document.getElementById('hint').setAttribute('aria-expanded','true');
      };
      document.getElementById('answer-form').onsubmit=event=>{
        event.preventDefault();
        if(state.responses[q.id])return;
        const value=q.type==='number'?document.getElementById('number-answer').value.trim():selection;
        if(!value||(q.type==='number'&&!/^\d{1,3}$/.test(normalize(value)))){
          document.getElementById('validation').textContent=q.type==='number'?'اكتب عددًا صحيحًا من ٠ إلى ٩٩٩.':'اختر إجابة أولًا.';
          document.getElementById('number-answer')?.focus();return;
        }
        state.responses[q.id]={value,hint:!!state.hints[q.id]};persist();renderQuestion();
        const feedback=document.getElementById('feedback');feedback.setAttribute('tabindex','-1');feedback.focus({preventScroll:true});feedback.scrollIntoView({behavior:'smooth',block:'nearest'});
      };
    }else{
      document.getElementById('answer-form').onsubmit=e=>e.preventDefault();
      document.getElementById('next').onclick=()=>{
        if(state.index===questions.length-1){state.complete=true;persist();renderResults();}
        else{state.index++;selection='';persist();renderQuestion();}
        focusTop();
      };
    }
  }
  function feedbackHTML(q,response){
    const ok=isCorrect(q,response.value);
    return `<div class="feedback ${ok?'':'wrong'}"><h2>${ok?'✓ إجابة صحيحة، أحسنت!':'لنتعلّم معًا ✦'}</h2>${ok?'':`<p>إجابتك غير صحيحة هذه المرة. الإجابة الصحيحة: <strong>${esc(q.answer)}</strong>.</p>`}<p>${esc(q.explanation)}</p><button class="primary" id="next">${state.index===questions.length-1?'اعرض نتيجتي':'فهمت، إلى السؤال التالي'} <span aria-hidden="true">←</span></button></div>`;
  }
  function renderResults(){
    const stats=summarize(state.responses),wrong=questions.filter(q=>!isCorrect(q,state.responses[q.id].value));
    const title=stats.correct>=18?'رحلة رائعة يا بطل!':stats.correct>=12?'أحسنت، واصل التقدّم!':'كل محاولة تساعدك على التعلّم!';
    main.innerHTML=`<section class="results"><div class="results-heading"><div class="score-ring"><strong>${arabic(stats.correct)}</strong><span>من ٢٠ إجابة صحيحة</span></div><h1>${title}</h1><p>أكملت رحلتك. راجع الإجابات، واكتشف ما أتقنته وما يمكنك التدرّب عليه.</p></div><div class="results-stats"><div><strong>${arabic(stats.percent)}٪</strong><span>نسبة الإجابات الصحيحة</span></div><div><strong>${arabic(20-stats.correct)}</strong><span>إجابة تحتاج مراجعة</span></div><div><strong>${arabic(stats.hints)}</strong><span>تلميحًا استخدمته</span></div></div><div class="actions result-actions"><button class="primary" id="retry">أجرّب مرة أخرى ↺</button><button class="secondary" id="print">اطبع النتيجة</button><button class="secondary" id="share">انسخ رابط الاختبار</button></div><p class="only-print">رحلة الأعداد · الصف الثاني الابتدائي · تقرير المحاولة</p><p id="share-status" role="status" aria-live="polite" class="resume-note"></p><div class="result-chapters">${stats.chapters.map(c=>`<article class="results-card"><h2>${c.chapter===1?'القيمة المنزلية والأنماط':'طرائق الجمع'}</h2><div class="chapter-score"><span>الفصل ${c.chapter===1?'الأول':'الثاني'}</span><strong>${arabic(c.correct)} من ${arabic(c.total)}</strong></div><div class="result-track"><span style="width:${c.correct/c.total*100}%"></span></div></article>`).join('')}</div><div class="encouragement">${wrong.length?`خطوتك القادمة: راجع ${[...new Set(wrong.map(q=>q.skill))].map(esc).join('، ')}. ستجد شرح كل سؤال أدناه.`:'أتقنت جميع الأسئلة! جرّب أن تشرح لأحد أفراد أسرتك كيف كوّنت العشرة وكيف قارنت الأعداد.'}<br>درجة كل سؤال نقطة واحدة. استعمال الصور أو التلميحات لا يُنقص الدرجة.</div><div class="review-heading"><h2>مراجعة الأسئلة العشرين</h2><button class="text-button" id="expand" aria-expanded="false">افتح جميع الشروح</button></div>${questions.map(q=>{const r=state.responses[q.id],ok=isCorrect(q,r.value);return `<details class="review-item" ${ok?'':'open'}><summary><span class="review-mark ${ok?'':'wrong'}" aria-label="${ok?'صحيحة':'تحتاج مراجعة'}">${ok?'✓':'↺'}</span><span><b>${arabic(q.id)}.</b> ${esc(q.prompt)}</span></summary><div class="review-content"><div class="review-answer"><span>إجابتك: <strong>${esc(r.value)}</strong></span><span>الإجابة الصحيحة: <strong>${esc(q.answer)}</strong></span>${r.hint?'<span>استُخدم التلميح</span>':''}</div><p>${esc(q.explanation)}</p>${visual(q)}</div></details>`;}).join('')}</section>`;
    document.getElementById('retry').onclick=()=>{if(!confirm('هل تريد بدء محاولة جديدة؟ ستحل محل نتيجتك المحفوظة.'))return;state={index:0,responses:{},hints:{},complete:false};persist();renderQuestion();focusTop();};
    document.getElementById('print').onclick=()=>window.print();
    document.getElementById('share').onclick=async()=>{
      const url=new URL('./',location.href).href;
      const status=document.getElementById('share-status');
      if(!/^https?:/.test(url)){status.textContent='مشاركة الرابط متاحة من النسخة المنشورة على الإنترنت.';return;}
      try{await navigator.clipboard.writeText(url);status.textContent='نُسخ رابط الاختبار. يمكنك مشاركته الآن؛ لن تُشارك نتيجتك.';}
      catch{status.textContent=`رابط الاختبار: ${url}`;}
    };
    const expand=document.getElementById('expand');
    expand.onclick=()=>{const open=expand.getAttribute('aria-expanded')!=='true';main.querySelectorAll('details').forEach(el=>el.open=open);expand.setAttribute('aria-expanded',String(open));expand.textContent=open?'أغلق جميع الشروح':'افتح جميع الشروح';};
  }
  window.addEventListener('beforeprint',()=>{printDetails=[...main.querySelectorAll('details')].map(el=>[el,el.open]);printDetails.forEach(([el])=>el.open=true);});
  window.addEventListener('afterprint',()=>{printDetails.forEach(([el,open])=>el.open=open);});
  renderHome();
})();

