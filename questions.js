(function (root) {
  'use strict';
  const questions = [
    {id:1,chapter:1,skill:'العشرات والآحاد',type:'choice',prompt:'ما العدد الذي تمثّله المكعبات؟',options:['٣٢','٢٣','٣٥','٢٠'],answer:'٣٢',visual:{type:'blocks',tens:3,ones:2},hint:'كل عمود يساوي عشرة. عدّ العشرات أولًا ثم الآحاد.',explanation:'٣ عشرات تساوي ٣٠، ومعها آحادان؛ إذن العدد هو ٣٢.'},
    {id:2,chapter:1,skill:'القيمة المنزلية',type:'choice',prompt:'ما قيمة الرقم ٧ في العدد ٧٤؟',options:['٤','٧','٧٠','٤٠'],answer:'٧٠',visual:{type:'place',hundreds:null,tens:'٧',ones:'٤'},hint:'الرقم ٧ في منزلة العشرات. كل عشرة فيها ١٠ آحاد.',explanation:'الرقم ٧ في منزلة العشرات، لذلك قيمته ٧ عشرات، أي ٧٠.'},
    {id:3,chapter:1,skill:'الصورة التحليلية',type:'number',prompt:'أكمل: ٥٠ + ٦ = ؟',answer:'٥٦',visual:{type:'blocks',tens:5,ones:6},hint:'كوّن عددًا من خمس عشرات وستة آحاد.',explanation:'٥٠ تعني ٥ عشرات، و٦ تعني ٦ آحاد؛ نجمعهما فنحصل على ٥٦.'},
    {id:4,chapter:1,skill:'قراءة الأعداد',type:'choice',prompt:'أي عدد نقرؤه «ثمانية وستون»؟',options:['٨٦','٦٠','٧٨','٦٨'],answer:'٦٨',visual:{type:'blocks',tens:6,ones:8},hint:'ابحث عن عدد فيه ٦ عشرات و٨ آحاد.',explanation:'ثمانية وستون تتكوّن من ٦ عشرات و٨ آحاد، وتُكتب ٦٨.'},
    {id:5,chapter:1,skill:'مقارنة الأعداد',type:'choice',prompt:'أي العددين أكبر: ٤٧ أم ٤٢؟',options:['٤٢','٤٧','العددان متساويان'],answer:'٤٧',visual:{type:'compare',numbers:[47,42]},hint:'العشرات متساوية؛ قارن عدد الآحاد.',explanation:'للعددين ٤ عشرات. وبما أن ٧ آحاد أكبر من آحادين، فإن ٤٧ أكبر من ٤٢.'},
    {id:6,chapter:1,skill:'ترتيب الأعداد',type:'choice',prompt:'اختر ترتيب الأعداد من الأصغر إلى الأكبر.',options:['٣٥ ← ٥٣ ← ٦٢','٦٢ ← ٥٣ ← ٣٥','٥٣ ← ٣٥ ← ٦٢'],answer:'٣٥ ← ٥٣ ← ٦٢',sequenceOptions:true,visual:{type:'cards',items:['٥٣','٦٢','٣٥']},hint:'ابدأ بأقل عدد من العشرات: ٣ عشرات، ثم ٥ عشرات، ثم ٦ عشرات.',explanation:'٣٥ أصغر من ٥٣، و٥٣ أصغر من ٦٢. الترتيب التصاعدي هو ٣٥ ثم ٥٣ ثم ٦٢.'},
    {id:7,chapter:1,skill:'العدد مئة',type:'number',prompt:'كل عمود فيه ١٠ مكعبات. كم مكعبًا في ١٠ أعمدة؟',answer:'١٠٠',visual:{type:'blocks',tens:10,ones:0},hint:'عدّ بالعشرات: ١٠، ٢٠، ٣٠… حتى العمود العاشر.',explanation:'١٠ عشرات تكوّن مئة واحدة؛ لذلك مجموع المكعبات ١٠٠.'},
    {id:8,chapter:1,skill:'العدّ القفزي',type:'number',prompt:'أكمل النمط بالعدّ خمسات. ابدأ من اليسار.',answer:'٢٥',visual:{type:'sequence',items:['٥','١٠','١٥','٢٠','؟'],step:'+٥'},hint:'أضف ٥ إلى العدد السابق في كل مرة.',explanation:'يزداد النمط ٥ في كل مرة. بعد ٢٠ يأتي ٢٥.'},
    {id:9,chapter:1,skill:'الأنماط العددية',type:'choice',prompt:'ما العدد الناقص؟ ابدأ من اليسار.',options:['٦٨','٧١','٧٠','٨٠'],answer:'٧٠',visual:{type:'sequence',items:['٦٤','٦٦','٦٨','؟','٧٢'],step:'+٢'},hint:'الفرق بين كل عدد والذي يليه هو ٢.',explanation:'نعدّ اثنين اثنين: ٦٤، ٦٦، ٦٨، ٧٠، ٧٢. العدد الناقص ٧٠.'},
    {id:10,chapter:1,skill:'الأنماط المتكررة',type:'choice',prompt:'ما الشكل التالي؟ ابدأ من اليسار.',options:['دائرة','مثلث','مربع'],answer:'مثلث',visual:{type:'shapes',items:['circle','triangle','triangle','circle','triangle','?']},hint:'المجموعة التي تتكرر هي: دائرة، مثلث، مثلث.',explanation:'يتكرر نمط «دائرة ثم مثلث ثم مثلث». ينقص المجموعة الثانية مثلث.'},
    {id:11,chapter:2,skill:'الجمع مع الصفر',type:'choice',prompt:'ما ناتج ٩ + ٠؟',options:['٠','١٠','٩','١'],answer:'٩',visual:{type:'groups',groups:[9,0]},hint:'إضافة صفر تعني أننا لا نضيف أي شيء جديد.',explanation:'عندما نضيف صفرًا يبقى العدد كما هو؛ لذلك ٩ + ٠ = ٩.'},
    {id:12,chapter:2,skill:'تبديل العددين',type:'number',prompt:'أكمل العدد الناقص: ٤ + ٦ = ٦ + □',answer:'٤',visual:{type:'swap',groups:[4,6]},hint:'نبدّل مكان العددين، ويبقى المجموع نفسه.',explanation:'٤ + ٦ تساوي ٦ + ٤. تغيير ترتيب العددين لا يغيّر المجموع، والعدد الناقص هو ٤.'},
    {id:13,chapter:2,skill:'العدّ التصاعدي',type:'number',prompt:'ابدأ من ٧، ثم عدّ ٣ خطوات إلى الأمام. أين تصل؟',answer:'١٠',visual:{type:'line',start:7,end:12,jumps:3},hint:'لا تعدّ ٧ مرة أخرى؛ أول خطوة تصل إلى ٨.',explanation:'نبدأ من ٧ ونعدّ ثلاث خطوات: ٨، ٩، ١٠. إذن ٧ + ٣ = ١٠.'},
    {id:14,chapter:2,skill:'حل مسألة بالرسم',type:'choice',prompt:'لدى نورة ٥ أقلام. أعطتها أختها ٣ أقلام أخرى. كم قلمًا أصبح معها؟',options:['٢','٧','٩','٨'],answer:'٨',visual:{type:'groups',groups:[5,3],object:'pencil'},hint:'اجمع الأقلام في المجموعتين، لأن نورة حصلت على أقلام إضافية.',explanation:'نرسم ٥ أقلام ثم نضيف ٣ أقلام: ٥ + ٣ = ٨ أقلام.'},
    {id:15,chapter:2,skill:'جمع العدد ونفسه',type:'choice',prompt:'ما ناتج جمع ٦ + ٦؟',options:['١١','١٢','١٠','١٣'],answer:'١٢',visual:{type:'groups',groups:[6,6]},hint:'المجموعتان متساويتان. هذا يسمى جمع العدد ونفسه.',explanation:'٦ و٦ مجموعتان متساويتان؛ مجموعهما ١٢.'},
    {id:16,chapter:2,skill:'جمع العدد ونفسه مضافًا إليه ١',type:'choice',prompt:'نعرف أن ٥ + ٥ = ١٠. فما ناتج ٥ + ٦؟',options:['١٠','١٢','١١','٩'],answer:'١١',visual:{type:'near',groups:[5,6]},hint:'٦ أكبر من ٥ بواحد، لذلك أضف واحدًا إلى ناتج ٥ + ٥.',explanation:'٥ + ٦ تساوي ٥ + ٥ + ١، أي ١٠ + ١ = ١١.'},
    {id:17,chapter:2,skill:'الجمع بتكوين العشرة',type:'number',prompt:'استعمل تكوين العشرة لإيجاد ناتج ٨ + ٥.',answer:'١٣',visual:{type:'ten',a:8,b:5},hint:'تحتاج ٨ إلى ٢ لتصبح ١٠. خذ ٢ من الخمسة، فكم يتبقى؟',explanation:'نقسّم ٥ إلى ٢ و٣. نجمع ٨ + ٢ = ١٠، ثم ١٠ + ٣ = ١٣.'},
    {id:18,chapter:2,skill:'جمع ثلاثة أعداد',type:'choice',prompt:'ما ناتج ٢ + ٧ + ٨؟',options:['١٥','١٦','١٧','١٨'],answer:'١٧',visual:{type:'groups',groups:[2,7,8]},hint:'ابحث عن عددين يكوّنان عشرة: ٢ و٨.',explanation:'نجمع ٢ و٨ أولًا فنحصل على ١٠، ثم نضيف ٧: ١٠ + ٧ = ١٧.'},
    {id:19,chapter:2,skill:'اختيار طريقة الجمع',type:'choice',prompt:'لحساب ٩ + ٤ بتكوين العشرة، كيف نقسّم العدد ٤؟',options:['٢ و٢','١ و٣','٠ و٤'],answer:'١ و٣',visual:{type:'ten',a:9,b:4},hint:'كم دائرة تحتاج التسعة لملء إطار العشرة؟',explanation:'تحتاج ٩ إلى ١ لتصبح ١٠. نقسّم ٤ إلى ١ و٣؛ ثم ١٠ + ٣ = ١٣.'},
    {id:20,chapter:2,skill:'العدد المفقود',type:'number',prompt:'في الحافلة ٨ أطفال. صعد أطفال آخرون فأصبحوا ١٤. كم طفلًا صعد؟',answer:'٦',visual:{type:'line',start:8,end:14,jumps:null},hint:'ابدأ بعد ٨، وعدّ القفزات حتى تصل إلى ١٤.',explanation:'نعدّ من ٨ إلى ١٤: ٩، ١٠، ١١، ١٢، ١٣، ١٤. هذه ٦ خطوات، إذن صعد ٦ أطفال.'}
  ];
  function normalize(value) {
    return String(value).trim().replace(/[٠-٩]/g,c=>String('٠١٢٣٤٥٦٧٨٩'.indexOf(c))).replace(/[۰-۹]/g,c=>String('۰۱۲۳۴۵۶۷۸۹'.indexOf(c)));
  }
  function isCorrect(q,value) {
    const text=normalize(value);
    return q.type==='number' ? /^\d{1,3}$/.test(text) && Number(text)===Number(normalize(q.answer)) : text===normalize(q.answer);
  }
  function summarize(responses) {
    const correct=questions.filter(q=>responses[q.id]&&isCorrect(q,responses[q.id].value)).length;
    return {correct,total:questions.length,percent:Math.round(correct/questions.length*100),chapters:[1,2].map(chapter=>({chapter,total:questions.filter(q=>q.chapter===chapter).length,correct:questions.filter(q=>q.chapter===chapter&&responses[q.id]&&isCorrect(q,responses[q.id].value)).length})),hints:questions.filter(q=>responses[q.id]?.hint).length};
  }
  const api={questions,normalize,isCorrect,summarize};
  root.MathQuiz=api;
  if(typeof module!=='undefined') module.exports=api;
})(typeof window==='undefined'?globalThis:window);
