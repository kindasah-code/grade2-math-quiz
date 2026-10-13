'use strict';
const LESSONS = [
  {
    title:'الخلايا', chapter:'الفصل الأول · ممالك المخلوقات الحية', emoji:'🔬',
    subtitle:'الوحدة الصغيرة التي تبني كل مخلوق حي',
    quote:'تخيّل أن أجسام المخلوقات الحية مبنية من قطع صغيرة جدًا، مثل قطع المكعبات!',
    quoteNote:'هذه القطع تسمّى خلايا، ولا نرى معظمها إلا بالمجهر.',
    sections:[
      {title:'١. كيف نعرف أن المخلوق حي؟',body:'<p>المخلوق الحي ينمو، ويحتاج إلى الماء والطاقة والغذاء، ويستجيب لما حوله، ويتكاثر لإنتاج مخلوقات جديدة. وقد يكون صغيرًا جدًا أو كبيرًا جدًا.</p><div class="fact-row"><div class="fact-card"><span class="fact-icon">🌱</span><strong>النمو</strong><p>البذرة تصبح نباتًا أكبر.</p></div><div class="fact-card"><span class="fact-icon">🐱</span><strong>التكاثر</strong><p>القطة تنجب صغارًا.</p></div><div class="fact-card"><span class="fact-icon">🌻</span><strong>الاستجابة</strong><p>ينمو النبات في اتجاه الضوء.</p></div></div><div class="example-note">💡 <b>فكّر:</b> السيارة تتحرك، لكنّها ليست مخلوقًا حيًّا؛ لأنها لا تتكون من خلايا ولا تتكاثر مثل المخلوقات الحية.</div>'},
      {title:'٢. ما الخلية؟ وما أجزاؤها؟',body:'<p><span class="hl">الخلية</span> أصغر وحدة بنائية في المخلوق الحي. يوجد مخلوقات تتكون من خلية واحدة، مثل كثير من البكتيريا، ومخلوقات تتكون من خلايا كثيرة مثل الإنسان والأشجار.</p><div class="fact-row"><div class="fact-card"><span class="fact-icon">🛡️</span><strong>الغشاء الخلوي</strong><p>يحيط بالخلية وينظّم دخول المواد وخروجها.</p></div><div class="fact-card"><span class="fact-icon">🟡</span><strong>السيتوبلازم</strong><p>مادة هلامية تحتوي على أجزاء الخلية.</p></div><div class="fact-card"><span class="fact-icon">🟣</span><strong>النواة</strong><p>تتحكم في كثير من أنشطة الخلية، وتحمل معلومات وراثية.</p></div></div><div class="example-note">🔎 <b>الوراثة:</b> تنتقل بعض الصفات من الآباء إلى الأبناء؛ مثل لون العينين في الإنسان.</div>'},
      {title:'٣. الخلية النباتية والخلية الحيوانية',body:'<p>تشترك الخليتان في وجود <b>غشاء خلوي وسيتوبلازم ونواة</b>، لكن الخلية النباتية تمتلك تراكيب إضافية تساعد النبات على الثبات وصنع غذائه.</p><div class="diagram"><div class="cell-grid"><div class="cell-box"><b>🌿 خلية نباتية</b><div class="cell-picture plant-cell" role="img" aria-label="رسم تعليمي مبسّط لخلية نباتية ذات جدار خارجي سميك، ونواة بنفسجية، وبلاستيدات خضراء، وفجوة مائية"><span class="cell-inner"></span><span class="vacuole"></span><span class="nucleus"></span><span class="organelle o1"></span><span class="organelle o2"></span><span class="organelle o3"></span></div><span class="diagram-tag">جدار خلوي • بلاستيدات خضراء • فجوة كبيرة</span></div><div class="cell-box"><b>🐈 خلية حيوانية</b><div class="cell-picture animal-cell" role="img" aria-label="رسم تعليمي مبسط لخلية حيوانية بغشاء مرن ونواة بنفسجية دون جدار خلوي أو بلاستيدات خضراء"><span class="cell-inner"></span><span class="nucleus"></span></div><span class="diagram-tag">غشاء خلوي مرن • نواة • لا جدار خلوي</span></div></div><small class="diagram-caption">رسم توضيحي غير مقياسي لتسهيل فهم الفروق</small></div><div class="diagram"><table class="compare-table"><thead><tr><th>التركيب</th><th>خلية نباتية</th><th>خلية حيوانية</th></tr></thead><tbody><tr><td>الغشاء الخلوي</td><td>✅ يوجد</td><td>✅ يوجد</td></tr><tr><td>النواة</td><td>✅ توجد</td><td>✅ توجد</td></tr><tr><td>الجدار الخلوي</td><td>✅ يوجد</td><td>❌ لا يوجد</td></tr><tr><td>البلاستيدات الخضراء</td><td>✅ توجد في الخلايا الخضراء</td><td>❌ لا توجد</td></tr></tbody></table></div><p><span class="hl">الجدار الخلوي</span> يدعم الخلية النباتية، و<span class="hl">البلاستيدات الخضراء</span> تساعد الأجزاء الخضراء من النبات على صنع الغذاء باستخدام ضوء الشمس.</p>'},
      {title:'٤. من الخلية إلى جسم كامل',body:'<p>في المخلوقات العديدة الخلايا تتعاون خلايا متشابهة لتكوين نسيج، وتكوّن الأنسجة عضوًا، وتعمل الأعضاء معًا لتكوين جهاز. وتتعاون الأجهزة ليعمل الجسم كله.</p><div class="diagram"><div class="levels"><div class="level">🔬 خلية<small>خلية عضلية</small></div><span class="level-arrow">←</span><div class="level">🧶 نسيج<small>نسيج عضلي</small></div><span class="level-arrow">←</span><div class="level">❤️ عضو<small>القلب</small></div><span class="level-arrow">←</span><div class="level">🫀 جهاز<small>الدوران</small></div><span class="level-arrow">←</span><div class="level">🏃 جسم<small>الإنسان</small></div></div></div><div class="example-note">🎯 <b>طريقة للحفظ:</b> خلية ← نسيج ← عضو ← جهاز ← مخلوق حي. مثل: قطعة واحدة ← مجموعة قطع ← جزء من آلة ← آلة كاملة.</div>'}
    ],
    activity:{prompt:'ما التركيب الموجود في الخلية النباتية ولا يوجد في الخلية الحيوانية؟',choices:['الغشاء الخلوي','الجدار الخلوي','السيتوبلازم'],answer:1,why:'أحسنت! الجدار الخلوي يميّز الخلية النباتية، ويساعدها على الحفاظ على شكلها.'}
  },
  {
    title:'تصنيف المخلوقات الحية', chapter:'الفصل الأول · ممالك المخلوقات الحية',emoji:'🌳',
    subtitle:'كيف يرتّب العلماء ملايين المخلوقات؟',
    quote:'تخيّل مكتبة فيها آلاف الكتب بلا ترتيب! العثور على كتاب سيكون صعبًا.',
    quoteNote:'لهذا يستخدم العلماء التصنيف: جمع المخلوقات المتشابهة في مجموعات.',
    sections:[
      {title:'١. لماذا نصنّف المخلوقات الحية؟',body:'<p><span class="hl">التصنيف</span> هو ترتيب المخلوقات الحية في مجموعات بحسب صفات مشتركة. ينظر العلماء إلى <b>شكل الجسم، وعدد الخلايا، ووجود النواة، وطريقة الحصول على الغذاء، والحركة</b> وغيرها.</p><div class="example-note">🍎 <b>مثال:</b> عندما تضع الكتب العلمية في رف والقصص في رف آخر، فأنت تصنّفها. وكذلك ينظّم العلماء الكائنات حتى تسهل دراستها.</div>'},
      {title:'٢. الممالك الست',body:'<p><span class="hl">المملكة</span> أكبر مجموعة رئيسة في التصنيف الذي ندرسه. يقسّم المنهج المخلوقات الحية إلى <b>ست ممالك</b>:</p><div class="kingdom-grid"><div class="kingdom"><span>🦁</span><strong>الحيوانات</strong><small>متعددة الخلايا، تتغذى على غيرها</small></div><div class="kingdom"><span>🌲</span><strong>النباتات</strong><small>معظمها يصنع غذاءه بالضوء</small></div><div class="kingdom"><span>🍄</span><strong>الفطريات</strong><small>مثل عفن الخبز والفطر</small></div><div class="kingdom"><span>🦠</span><strong>الطلائعيات</strong><small>مثل الأميبا وبعض الطحالب</small></div><div class="kingdom"><span>🔵</span><strong>البكتيريا</strong><small>دقيقة، خلاياها بلا نواة حقيقية</small></div><div class="kingdom"><span>🟣</span><strong>البدائيات</strong><small>دقيقة، خلاياها بلا نواة حقيقية</small></div></div><div class="example-note">💡 <b>تذكّر:</b> الحيوانات لا تصنع غذاءها بنفسها. والنباتات غالبًا تصنعه بالتمثيل الضوئي. أما الفطريات فتمتص غذاءها من مواد ومخلوقات أخرى.</div>'},
      {title:'٣. ما الفرق بين البكتيريا والبدائيات وبقية الممالك؟',body:'<p>أفراد مملكتي <b>البكتيريا والبدائيات</b> خلاياها لا تحتوي على نواة حقيقية محاطة بغشاء. أما خلايا النباتات والحيوانات والفطريات والطلائعيات فتحتوي على نواة حقيقية. وقد يتكون المخلوق من خلية واحدة أو من خلايا عديدة.</p><div class="fact-row"><div class="fact-card"><span class="fact-icon">🔬</span><strong>خلية واحدة</strong><p>مثل البكتيريا وكثير من الطلائعيات.</p></div><div class="fact-card"><span class="fact-icon">🌾</span><strong>خلايا كثيرة</strong><p>مثل شجرة النخيل والقط.</p></div></div><p>ليس الحجم وحده ما يحدّد المملكة؛ بل ننظر إلى عدة خصائص معًا. فبعض البكتيريا تصنع غذاءها، لكنها لا تنتمي إلى النباتات لأن تركيب خلاياها مختلف.</p>'},
      {title:'٤. درجات التصنيف من الأكبر إلى الأصغر',body:'<p>داخل كل مملكة توجد مجموعات أصغر. كلما انتقلنا إلى مجموعة أصغر، زاد التشابه بين أفرادها.</p><div class="diagram"><div class="levels"><div class="level">مملكة<small>الأوسع</small></div><span class="level-arrow">←</span><div class="level">شعبة</div><span class="level-arrow">←</span><div class="level">طائفة</div><span class="level-arrow">←</span><div class="level">رتبة</div><span class="level-arrow">←</span><div class="level">فصيلة</div><span class="level-arrow">←</span><div class="level">جنس</div><span class="level-arrow">←</span><div class="level">نوع<small>الأكثر تحديدًا</small></div></div><small class="diagram-caption">ترتيب المجموعات التصنيفية الرئيسة في هذا المنهج</small></div><p><b>مثال:</b> السنجاب والسحلية من مملكة الحيوانات، وكلاهما من الفقاريات لأن لهما عمودًا فقريًا، ولكنّهما ليسا من الطائفة نفسها.</p><div class="example-note">🧠 <b>سؤال تفكير:</b> أي مجموعة تضم مخلوقات أكثر: الشعبة أم الرتبة؟ <b>الشعبة</b>؛ لأنها أوسع.</div>'}
    ],
    activity:{prompt:'مخلوق متعدد الخلايا ويتحرك ولا يصنع غذاءه بنفسه. في أي مملكة يصنّف غالبًا؟',choices:['الحيوانات','النباتات','البدائيات'],answer:0,why:'صحيح! هذه صفات شائعة لمملكة الحيوانات.'}
  },
  {
    title:'الحيوانات اللافقارية', chapter:'الفصل الثاني · المملكة الحيوانية',emoji:'🦋',
    subtitle:'مخلوقات متنوعة تعيش بلا عمود فقري',
    quote:'هل تملك الفراشة عمودًا فقريًا مثل القطة؟ كلا!',
    quoteNote:'معظم أنواع الحيوانات المعروفة تنتمي إلى اللافقاريات.',
    sections:[
      {title:'١. ما اللافقاريات؟',body:'<p><span class="hl">اللافقاريات</span> حيوانات لا تمتلك عمودًا فقريًا. بعضها له غطاء خارجي صلب يحميه، وبعضها له جسم طري.</p><div class="animal-sort"><div class="sort-group"><strong>🦋 لا فقاريات</strong><div class="emoji-group">🦋 🐙 🐌 🕷️</div><p>لا يوجد عمود فقري</p></div><div class="sort-group"><strong>🐟 فقاريات</strong><div class="emoji-group">🐟 🐈 🐦 🐸</div><p>يوجد عمود فقري</p></div></div><div class="example-note">⚠️ <b>انتبه:</b> القوقعة الخارجية في الحلزون لا تعني وجود عمود فقري، وكذلك الهيكل الخارجي للحشرة.</div>'},
      {title:'٢. مجموعات اللافقاريات وأمثلتها',body:'<div class="fact-row"><div class="fact-card"><span class="fact-icon">🧽</span><strong>الإسفنجيات</strong><p>غالبًا تعيش في الماء، وتمتص الغذاء من الماء.</p></div><div class="fact-card"><span class="fact-icon">🪼</span><strong>اللاسعات</strong><p>مثل قنديل البحر والمرجان، ولها خلايا لاسعة.</p></div><div class="fact-card"><span class="fact-icon">🪱</span><strong>الديدان</strong><p>مثل دودة الأرض، منها المفلطحة والأسطوانية والحلقية.</p></div><div class="fact-card"><span class="fact-icon">🐌</span><strong>الرخويات</strong><p>أجسامها رخوة، مثل الحلزون والأخطبوط والحبار.</p></div><div class="fact-card"><span class="fact-icon">⭐</span><strong>شوكيات الجلد</strong><p>مثل نجم البحر وقنفذ البحر، وتعيش في البحر.</p></div><div class="fact-card"><span class="fact-icon">🦀</span><strong>المفصليات</strong><p>لها أرجل مفصلية وهيكل خارجي، مثل النمل والسرطان.</p></div></div><p><b>ملحوظة:</b> تمتلك شوكيات الجلد دعامات داخلية، لكنها ليست عمودًا فقريًا، ولذلك تُعدّ من اللافقاريات.</p>'},
      {title:'٣. مفصليات الأرجل: أكبر مجموعات اللافقاريات',body:'<p>تتميّز <span class="hl">المفصليات</span> بأرجل لها مفاصل، وجسم مقسم إلى أجزاء، و<span class="hl">هيكل خارجي</span> يساعد على الحماية والدعامة. وبعضها يبدّل هيكله الخارجي عندما ينمو في عملية تسمّى الانسلاخ.</p><div class="diagram"><table class="compare-table"><thead><tr><th>المجموعة</th><th>مثال</th><th>علامة مفيدة للتعرف</th></tr></thead><tbody><tr><td>الحشرات</td><td>🐜 نملة / 🦋 فراشة</td><td>٦ أرجل غالبًا</td></tr><tr><td>العنكبيات</td><td>🕷️ عنكبوت / عقرب</td><td>٨ أرجل غالبًا</td></tr><tr><td>القشريات</td><td>🦀 سرطان / روبيان</td><td>أجسام غالبًا مغطاة بهيكل خارجي صلب</td></tr><tr><td>عديدة الأرجل</td><td>أم أربع وأربعين</td><td>أرجل كثيرة</td></tr></tbody></table></div><div class="example-note">🎯 <b>خدعة للاختبار:</b> العنكبوت <b>ليس حشرة</b>؛ لأنه من العنكبيات وله ثماني أرجل، أما الحشرات فلها ست أرجل.</div>'},
      {title:'٤. كيف تحمي اللافقاريات أجسامها؟',body:'<div class="steps"><div class="step"><span class="step-no">🦀</span><div><b>هيكل خارجي</b><p>يحمي أجسام كثير من المفصليات ويدعمها.</p></div></div><div class="step"><span class="step-no">🐌</span><div><b>قوقعة</b><p>تحمي بعض الرخويات مثل الحلزون.</p></div></div><div class="step"><span class="step-no">🐙</span><div><b>التمويه</b><p>يمكن للأخطبوط تغيير لونه ليتشابه مع محيطه.</p></div></div><div class="step"><span class="step-no">🪼</span><div><b>خلايا لاسعة</b><p>تساعد بعض اللاسعات على اقتناص الغذاء والدفاع.</p></div></div></div>'}
    ],
    activity:{prompt:'رأيت حيوانًا له ثماني أرجل ولا عمود فقري. إلى أي مجموعة ينتمي غالبًا؟',choices:['الحشرات','العنكبيات','الطيور'],answer:1,why:'صحيح! العنكبيات مثل العنكبوت لها ثماني أرجل.'}
  },
  {
    title:'الحيوانات الفقارية', chapter:'الفصل الثاني · المملكة الحيوانية',emoji:'🐬',
    subtitle:'خمسة أنواع رئيسة من الحيوانات ذات العمود الفقري',
    quote:'السمكة والضفدع والعصفور والقط مختلفة جدًا، لكنها تشترك في شيء مهم!',
    quoteNote:'جميعها فقاريات: تمتلك عمودًا فقريًا وهيكلًا داخليًا.',
    sections:[
      {title:'١. ما الفقاريات؟',body:'<p><span class="hl">الفقاريات</span> حيوانات تمتلك عمودًا فقريًا يتكوّن من فقرات، وهو جزء من الهيكل الداخلي الذي يدعم الجسم ويحمي الحبل الشوكي. تشمل مجموعات أساسية ندرسها هنا: الأسماك والبرمائيات والزواحف والطيور والثدييات.</p><div class="fact-row"><div class="fact-card"><span class="fact-icon">🐟</span><strong>الأسماك</strong><p>تعيش في الماء وتتنفس معظمها بالخياشيم.</p></div><div class="fact-card"><span class="fact-icon">🐸</span><strong>البرمائيات</strong><p>مثل الضفدع، تعيش جزءًا من حياتها في الماء وجزءًا على اليابسة.</p></div><div class="fact-card"><span class="fact-icon">🦎</span><strong>الزواحف</strong><p>مثل السحلية والأفعى؛ يغطي أجسامها جلد جاف ذو حراشف.</p></div><div class="fact-card"><span class="fact-icon">🐦</span><strong>الطيور</strong><p>يغطي أجسامها الريش ولها مناقير.</p></div><div class="fact-card"><span class="fact-icon">🐪</span><strong>الثدييات</strong><p>لها شعر أو فرو، وترضع الإناث صغارها بالحليب.</p></div></div><div class="example-note">📌 <b>معلومة:</b> السمكة والقرش من الفقاريات، مع أن هيكل القرش يتكون في معظمه من الغضروف لا العظم.</div>'},
      {title:'٢. كيف أميّز المجموعات الخمس؟',body:'<div class="diagram"><table class="compare-table"><thead><tr><th>المجموعة</th><th>غطاء الجسم</th><th>التنفس في الغالب</th><th>مثال</th></tr></thead><tbody><tr><td>الأسماك</td><td>قشور غالبًا</td><td>خياشيم</td><td>سمكة</td></tr><tr><td>البرمائيات</td><td>جلد رطب</td><td>الصغير بالخياشيم، والبالغ بالرئتين والجلد</td><td>ضفدع</td></tr><tr><td>الزواحف</td><td>حراشف جافة</td><td>رئتان</td><td>سحلية</td></tr><tr><td>الطيور</td><td>ريش</td><td>رئتان</td><td>نسر</td></tr><tr><td>الثدييات</td><td>شعر أو فرو غالبًا</td><td>رئتان</td><td>قط أو حوت</td></tr></tbody></table></div><p>معظم الأسماك والبرمائيات والزواحف <b>متغيرة درجة الحرارة</b>؛ تتأثر حرارة أجسامها بحرارة البيئة. أما الطيور والثدييات فهي <b>ثابتة درجة الحرارة</b> وتحافظ على درجة حرارة أجسامها بدرجة كبيرة.</p>'},
      {title:'٣. دورة حياة الضفدع والتحوّل',body:'<p>يمر الضفدع بمراحل تتغير فيها هيئة جسمه، وهذا يسمى <span class="hl">التحوّل</span>. تبدأ حياته في الماء على شكل بيض، ثم يفقس إلى شرغوف، وتنمو له الأرجل وتظهر الرئتان تدريجيًا.</p><div class="diagram"><div class="levels"><div class="level">🥚 بيض<small>في الماء</small></div><span class="level-arrow">←</span><div class="level">🐟 شرغوف<small>ذيل وخياشيم</small></div><span class="level-arrow">←</span><div class="level">🐸 ضفدع صغير<small>تنمو الأرجل</small></div><span class="level-arrow">←</span><div class="level">🐸 بالغ<small>رئتان وجلد</small></div></div></div><div class="example-note">💧 <b>فكّر:</b> لماذا يحتاج الضفدع إلى بيئة رطبة؟ لأن جلده يساعد أيضًا في تبادل الغازات، ويجب أن يبقى رطبًا.</div>'},
      {title:'٤. اختبر قاعدة الاستثناءات',body:'<div class="fact-row"><div class="fact-card"><span class="fact-icon">🐧</span><strong>البطريق طائر</strong><p>له ريش ويضع البيض، رغم أنه لا يطير.</p></div><div class="fact-card"><span class="fact-icon">🐋</span><strong>الحوت ثديي</strong><p>يتنفس بالرئتين، وترضع الأنثى صغيرها بالحليب.</p></div><div class="fact-card"><span class="fact-icon">🦇</span><strong>الخفاش ثديي</strong><p>له شعر وتنتج إناثه الحليب رغم قدرته على الطيران.</p></div><div class="fact-card"><span class="fact-icon">🦆</span><strong>منقار البط ثديي</strong><p>من الثدييات القليلة التي تضع البيض.</p></div></div><p>لا تصنّف الحيوان بسبب مكان عيشه أو طريقة حركته فقط. انظر إلى صفاته الأساسية.</p>'}
    ],
    activity:{prompt:'حيوان يعيش في الماء، ويتنفس الهواء بالرئتين، وترضع الأنثى صغيرها. ما المجموعة الصحيحة؟',choices:['الأسماك','البرمائيات','الثدييات'],answer:2,why:'رائع! الحوت ثديي رغم أنه يعيش في الماء.'}
  },
  {
    title:'أجهزة أجسام الحيوانات',chapter:'الفصل الثاني · المملكة الحيوانية',emoji:'🫀',
    subtitle:'فِرَق تعمل معًا لتُبقي الحيوان حيًا',
    quote:'كيف يصل الأكسجين والغذاء إلى عضلات النعامة عندما تجري؟',
    quoteNote:'تتعاون أجهزة عديدة في الجسم، فلا يعمل أي جهاز وحده.',
    sections:[
      {title:'١. ما الجهاز؟ وكيف تتعاون الأجهزة؟',body:'<p><span class="hl">الجهاز</span> مجموعة أعضاء تعمل معًا لإنجاز وظيفة معينة. فالعضلات تحرّك العظام، والجهاز التنفسي يدخل الأكسجين، وجهاز الدوران ينقله إلى خلايا الجسم.</p><div class="diagram"><div class="levels"><div class="level">🫁 تنفسي<small>يدخل الأكسجين</small></div><span class="level-arrow">←</span><div class="level">❤️ دوران<small>ينقله بالدم</small></div><span class="level-arrow">←</span><div class="level">💪 عضلات<small>تستخدم الطاقة</small></div></div><small class="diagram-caption">مسار مبسط للتعاون بين ثلاثة أجهزة</small></div><div class="example-note">🎯 <b>مثال:</b> عندما تركض، تحتاج العضلات إلى أكسجين وغذاء؛ فيزداد التنفس، ويتسارع نبض القلب لنقل المواد.</div>'},
      {title:'٢. أجهزة للحركة والاستجابة',body:'<div class="system-grid"><div class="system-card"><span class="system-icon">🦴</span><h4>الجهاز الهيكلي</h4><p>يدعم الجسم ويحمي الأعضاء الداخلية ويساعد على الحركة مع العضلات.</p></div><div class="system-card"><span class="system-icon">💪</span><h4>الجهاز العضلي</h4><p>تنقبض العضلات وتنبسط لتولّد الحركة.</p></div><div class="system-card"><span class="system-icon">🧠</span><h4>الجهاز العصبي</h4><p>يستقبل المعلومات ويساعد الجسم على الاستجابة والتحكم في الحركات.</p></div><div class="system-card"><span class="system-icon">👁️</span><h4>أعضاء الحس</h4><p>كالعيون والأذنين والأنف؛ تستقبل معلومات من البيئة.</p></div></div><p>إذا رأيت كرة قادمة، تستقبل العين الصورة، وينقل الجهاز العصبي المعلومات، ثم تتحرك عضلات اليدين أو القدمين.</p>'},
      {title:'٣. أجهزة للحصول على المواد ونقلها والتخلص من الفضلات',body:'<div class="system-grid"><div class="system-card"><span class="system-icon">🫁</span><h4>الجهاز التنفسي</h4><p>تبادل الغازات؛ يأخذ الأكسجين ويتخلص من ثاني أكسيد الكربون. للأسماك خياشيم، وللإنسان رئتان.</p></div><div class="system-card"><span class="system-icon">🍽️</span><h4>الجهاز الهضمي</h4><p>يفتّت الغذاء ويهضمه، ثم تُمتص المواد الغذائية ليستفيد منها الجسم.</p></div><div class="system-card"><span class="system-icon">❤️</span><h4>جهاز الدوران</h4><p>ينقل الدم المحمّل بالأكسجين والمواد الغذائية إلى الخلايا ويساعد في نقل الفضلات.</p></div><div class="system-card"><span class="system-icon">🚰</span><h4>الجهاز الإخراجي</h4><p>يتخلص من فضلات الجسم؛ والكليتان تزيلان كثيرًا من الفضلات من الدم.</p></div></div><div class="example-note">❓ <b>فكّر:</b> إذا توقف الدم عن أخذ الأكسجين من الرئتين، فلن يصل الأكسجين الكافي إلى الخلايا، ولن تستطيع العمل بصورة طبيعية.</div>'},
      {title:'٤. رحلة قطعة طعام ونَفَس من الهواء',body:'<div class="steps"><div class="step"><span class="step-no">١</span><div><b>الجهاز الهضمي</b><p>يحوّل الطعام إلى مواد غذائية يمكن امتصاصها.</p></div></div><div class="step"><span class="step-no">٢</span><div><b>الجهاز التنفسي</b><p>يوفر الأكسجين من الهواء أو الماء بحسب نوع الحيوان.</p></div></div><div class="step"><span class="step-no">٣</span><div><b>جهاز الدوران</b><p>ينقل المواد الغذائية والأكسجين إلى خلايا الجسم.</p></div></div><div class="step"><span class="step-no">٤</span><div><b>العضلات والجهاز العصبي</b><p>تتلقى الإشارات وتتحرك للاستجابة.</p></div></div><div class="step"><span class="step-no">٥</span><div><b>الجهاز الإخراجي</b><p>يساعد على إزالة الفضلات حتى يبقى الجسم في حالة جيدة.</p></div></div></div><p><b>الخلاصة:</b> الجهاز = أعضاء تتعاون، والأجهزة = فرق تتعاون داخل الجسم.</p>'}
    ],
    activity:{prompt:'أي جهاز ينقل الأكسجين والمواد الغذائية إلى خلايا جسم الحيوان؟',choices:['جهاز الدوران','الجهاز الهيكلي','أعضاء الحس'],answer:0,why:'ممتاز! جهاز الدوران ينقل الدم إلى خلايا الجسم محمّلًا بالأكسجين والغذاء.'}
  }
];
const FLASHCARDS = [
 ['الخلية','أصغر وحدة بنائية في المخلوق الحي.','🔬',0],
 ['النواة','جزء يتحكم في كثير من أنشطة الخلية ويحمل معلومات وراثية.','🟣',0],
 ['الغشاء الخلوي','يحيط بالخلية وينظم مرور المواد إليها ومنها.','🛡️',0],
 ['الجدار الخلوي','تركيب يدعم الخلية النباتية ويحافظ على شكلها.','🌿',0],
 ['البلاستيدات الخضراء','تراكيب في خلايا النبات الخضراء تساعد على صنع الغذاء.','☀️',0],
 ['النسيج','مجموعة خلايا متشابهة تؤدي وظيفة محددة.','🧶',0],
 ['المملكة','مجموعة رئيسة كبيرة يُصنّف العلماء المخلوقات الحية فيها.','🌳',1],
 ['التصنيف','ترتيب المخلوقات الحية وفق الصفات المشتركة.','🗂️',1],
 ['الفطريات','مخلوقات تمتص غذاءها من مواد أو مخلوقات أخرى، مثل الفطر.','🍄',1],
 ['البدائيات','مخلوقات دقيقة وحيدة الخلية لا تحتوي على نواة حقيقية.','🟣',1],
 ['النوع','مجموعة تصنيفية دقيقة، وهي أكثر تحديدًا من الجنس.','🧬',1],
 ['اللافقاريات','حيوانات ليس لها عمود فقري.','🦋',2],
 ['المفصليات','لافقاريات لها أرجل مفصلية وهيكل خارجي، مثل النمل والسرطان.','🦀',2],
 ['الانسلاخ','طرح بعض المفصليات هيكلها الخارجي القديم لتتمكن من النمو.','🐜',2],
 ['الرخويات','حيوانات لا فقارية ذات أجسام رخوة، مثل الحلزون والأخطبوط.','🐌',2],
 ['شوكيات الجلد','لافقاريات بحرية مثل نجم البحر وقنفذ البحر.','⭐',2],
 ['الفقاريات','حيوانات لها عمود فقري وهيكل داخلي.','🐟',3],
 ['البرمائيات','فقاريات تعيش مراحل من حياتها في الماء وأخرى على اليابسة.','🐸',3],
 ['التحول','تغيّر هيئة الحيوان عبر مراحل نموه، مثل الضفدع.','🥚',3],
 ['الثدييات','فقاريات لها شعر أو فرو، وترضع إناثها صغارها.','🐪',3],
 ['الجهاز','مجموعة أعضاء تعمل معًا لأداء وظيفة محددة.','⚙️',4],
 ['الجهاز التنفسي','يوفّر الأكسجين ويساعد على التخلص من ثاني أكسيد الكربون.','🫁',4],
 ['جهاز الدوران','ينقل الدم وما يحمله من أكسجين ومواد غذائية.','❤️',4],
 ['الجهاز الإخراجي','يتخلص من فضلات الجسم.','🚰',4],
 ['الجهاز العصبي','يستقبل المعلومات ويساعد الجسم على التحكم والاستجابة.','🧠',4]
];
const QUESTIONS = [
 {id:1,l:0,q:'ما أصغر وحدة بنائية في المخلوق الحي؟',options:['الخلية','الجهاز','العضو','النسيج'],answer:0,why:'الخلية هي الوحدة البنائية الأساسية، وتتكون الأنسجة من خلايا متشابهة.'},
 {id:2,l:0,q:'أي تركيب يوجد في الخلية النباتية ولا يوجد في الخلية الحيوانية؟',options:['النواة','السيتوبلازم','الجدار الخلوي','الغشاء الخلوي'],answer:2,why:'الجدار الخلوي يحيط بالغشاء في الخلية النباتية ويدعمها.'},
 {id:3,l:0,q:'أي جزء من الخلية يتحكم في كثير من أنشطتها؟',options:['الجدار الخلوي','النواة','الفجوة','الغشاء الخلوي'],answer:1,why:'النواة مركز مهم للتحكم في أنشطة الخلية.'},
 {id:4,l:0,q:'ما الترتيب الصحيح من الأصغر إلى الأكبر؟',options:['جهاز ← عضو ← خلية ← نسيج','نسيج ← خلية ← جهاز ← عضو','عضو ← نسيج ← خلية ← جهاز','خلية ← نسيج ← عضو ← جهاز'],answer:3,why:'تكوّن الخلايا أنسجة، والأنسجة أعضاء، والأعضاء أجهزة.'},
 {id:5,l:0,q:'كيف تساعد البلاستيدات الخضراء النبات؟',options:['على المشي','على صنع الغذاء باستخدام ضوء الشمس','على السمع','على هضم اللحم'],answer:1,why:'البلاستيدات الخضراء تساعد الخلايا الخضراء على صنع الغذاء بالتمثيل الضوئي.'},
 {id:6,l:1,q:'لماذا يصنّف العلماء المخلوقات الحية؟',options:['لتغيير ألوانها','لزيادة أحجامها','لتنظيمها بحسب صفات مشتركة','لتعلّم أسماء الحيوانات فقط'],answer:2,why:'التصنيف يجعل دراسة المخلوقات الحية والتعرف على علاقاتها أسهل.'},
 {id:7,l:1,q:'كم مملكة رئيسة يدرسها هذا المنهج للمخلوقات الحية؟',options:['أربع','خمس','سبع','ست'],answer:3,why:'الممالك الست: الحيوانات والنباتات والفطريات والطلائعيات والبكتيريا والبدائيات.'},
 {id:8,l:1,q:'إلى أي مملكة ينتمي عفن الخبز؟',options:['الفطريات','الحيوانات','النباتات','البدائيات'],answer:0,why:'عفن الخبز فطر يحصل على غذائه من المواد التي ينمو عليها.'},
 {id:9,l:1,q:'ما الميزة المشتركة بين خلايا البكتيريا والبدائيات؟',options:['وجود الجدار في الحيوانات','عدم وجود نواة حقيقية محاطة بغشاء','تكوّن جميعها من خلايا كثيرة','صنعها جميعًا للغذاء'],answer:1,why:'خلايا البكتيريا والبدائيات لا تمتلك نواة حقيقية محاطة بغشاء.'},
 {id:10,l:1,q:'أي مجموعتين تصنيفيتين أوسع؟',options:['النوع أوسع من المملكة','الجنس أوسع من الشعبة','الشعبة أوسع من الرتبة','الفصيلة أوسع من المملكة'],answer:2,why:'الترتيب يبدأ بالمملكة ثم الشعبة ثم الطائفة ثم الرتبة، فالشعبة أوسع من الرتبة.'},
 {id:11,l:2,q:'ما الذي يميز الحيوانات اللافقارية؟',options:['لها ريش','لها عمود فقري','تعيش جميعها في البحر','ليس لها عمود فقري'],answer:3,why:'اللافقاريات حيوانات لا تمتلك عمودًا فقريًا.'},
 {id:12,l:2,q:'أي الحيوانات التالية من الرخويات؟',options:['الأخطبوط','السحلية','القرش','العصفور'],answer:0,why:'الأخطبوط من الرخويات ذات الأجسام الرخوة.'},
 {id:13,l:2,q:'للعنكبوت ثماني أرجل. في أي مجموعة يصنّف؟',options:['الحشرات','العنكبيات','الطيور','الأسماك'],answer:1,why:'العنكبيات ومنها العناكب لها ثماني أرجل، بينما الحشرات لها ست أرجل.'},
 {id:14,l:2,q:'ما الصفة الرئيسة للمفصليات؟',options:['وجود ريش','وجود عمود فقري','أرجل مفصلية وهيكل خارجي','وجود شعر'],answer:2,why:'للمفصليات أرجل ذات مفاصل وأجسام مقسمة وهيكل خارجي.'},
 {id:15,l:2,q:'أي مجموعة ينتمي إليها نجم البحر؟',options:['الثدييات','الزواحف','الحشرات','شوكيات الجلد'],answer:3,why:'نجم البحر من شوكيات الجلد، وهي لا فقاريات تعيش في البحر.'},
 {id:16,l:3,q:'ما الصفة المشتركة بين السمكة والقط؟',options:['وجود عمود فقري','القدرة على الطيران','التنفس بالخياشيم دائمًا','وجود ريش'],answer:0,why:'السمك والقطط من الفقاريات لأن كليهما يمتلك عمودًا فقريًا.'},
 {id:17,l:3,q:'لماذا يصنّف الحوت من الثدييات؟',options:['لأنه يعيش في البحر','لأنه يضع البيض دائمًا','لأن الأنثى ترضع صغيرها بالحليب','لأنه يتنفس بالخياشيم'],answer:2,why:'الحوت يتنفس بالرئتين وتنتج الأنثى الحليب لصغيرها، لذا فهو ثديي.'},
 {id:18,l:3,q:'أي غطاء للجسم يميز الطيور؟',options:['الفرو','الريش','الحراشف الجافة فقط','القوقعة'],answer:1,why:'الريش صفة مميزة للطيور حتى لو لم يكن الطائر قادرًا على الطيران.'},
 {id:19,l:3,q:'ما الذي يحدث للضفدع خلال التحول؟',options:['يتحول إلى سمكة بالغة','يفقد عموده الفقري','تنمو له أجنحة من ريش','يتغير من شرغوف إلى ضفدع بالغ'],answer:3,why:'ينمو الشرغوف وتظهر أرجله وتتغير طريقة تنفسه حتى يصبح ضفدعًا بالغًا.'},
 {id:20,l:3,q:'أي مجموعتين تحافظان على درجة حرارة الجسم بدرجة كبيرة؟',options:['الطيور والثدييات','الأسماك والبرمائيات','الزواحف والأسماك','الرخويات والحشرات'],answer:0,why:'الطيور والثدييات ثابتة درجة الحرارة، بخلاف معظم الأسماك والبرمائيات والزواحف.'},
 {id:21,l:4,q:'أي جهاز يعمل على هضم الطعام وامتصاص المواد الغذائية؟',options:['الجهاز العصبي','الجهاز الهضمي','الجهاز الهيكلي','الجهاز العضلي'],answer:1,why:'الجهاز الهضمي يحول الغذاء إلى مواد يمكن للجسم امتصاصها والاستفادة منها.'},
 {id:22,l:4,q:'أي جهاز ينقل الأكسجين إلى خلايا جسم الحيوان؟',options:['الجهاز الإخراجي','الجهاز الهيكلي','جهاز الدوران','أعضاء الحس'],answer:2,why:'ينقل جهاز الدوران الدم بما يحمله من أكسجين ومواد غذائية.'},
 {id:23,l:4,q:'ما الجهاز الذي يساعد على التحكم بالحركات والاستجابة لما حولنا؟',options:['الجهاز التنفسي','الجهاز الهضمي','الجهاز الإخراجي','الجهاز العصبي'],answer:3,why:'يتلقى الجهاز العصبي المعلومات ويعالجها ويوجّه استجابات الجسم.'},
 {id:24,l:4,q:'ما وظيفة الجهاز الإخراجي؟',options:['التخلص من الفضلات','حمل الأكسجين','تحريك العظام','التقاط الضوء'],answer:0,why:'يساعد الجهاز الإخراجي على التخلص من المواد غير المرغوبة الناتجة من عمل الجسم.'},
 {id:25,l:4,q:'عندما تجري النعامة، أي جهازين يتعاونان مباشرة لإحداث الحركة؟',options:['الهضمي والإخراجي','الهيكلي والعضلي','التنفسي والإخراجي فقط','العصبي والهضمي فقط'],answer:1,why:'تعمل العضلات مع العظام لإحداث الحركة، وتساعد أجهزة أخرى على توفير الطاقة والأكسجين.'}
];
const STORE_KEY = 'science-g4-living-unit1-v1';
const $ = (id) => document.getElementById(id);
function getSaved(){
 try{const v=JSON.parse(localStorage.getItem(STORE_KEY)||'{}');return v&&typeof v==='object'?v:{};}catch(_){return {};}
}
const saved = getSaved();
const state = {
 lesson: Number.isInteger(saved.lesson)&&saved.lesson>=0&&saved.lesson<LESSONS.length?saved.lesson:0,
 completed:Array.isArray(saved.completed)?saved.completed.filter(x=>Number.isInteger(x)&&x>=0&&x<LESSONS.length):[],
 quiz:saved.quiz&&Array.isArray(saved.quiz.order)&&saved.quiz.order.length===QUESTIONS.length&&Number.isInteger(saved.quiz.current)?saved.quiz:null
};
function persist(){try{localStorage.setItem(STORE_KEY,JSON.stringify(state));}catch(_){}}
function arabicNumber(n){return String(n).replace(/[0-9]/g,d=>'٠١٢٣٤٥٦٧٨٩'[Number(d)]);}
function clean(t){return String(t).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function drawNav(){
 let previous='';
 $('lesson-nav').innerHTML = LESSONS.map((lesson,index)=>{
  let chapter=index<2?'الفصل الأول: ممالك المخلوقات الحية':'الفصل الثاني: المملكة الحيوانية';
  const head=previous!==chapter?'<div class="nav-chapter">'+chapter+'</div>':'';
  previous=chapter;
  const isDone=state.completed.includes(index);
  return head+'<button type="button" class="lesson-link '+(state.lesson===index?'is-active ':'')+(isDone?'done':'')+'" data-lesson="'+index+'" aria-current="'+(state.lesson===index?'step':'false')+'"><span class="lesson-number">'+(isDone?'✓':arabicNumber(index+1))+'</span><span>'+lesson.title+'</span></button>';
 }).join('');
 document.querySelectorAll('[data-lesson]').forEach(btn=>btn.addEventListener('click',()=>selectLesson(Number(btn.dataset.lesson))));
}
function drawProgress(){
 const count=new Set(state.completed).size;
 $('done-label').textContent=arabicNumber(count)+' من '+arabicNumber(LESSONS.length);
 $('study-progress').style.width=(count/LESSONS.length*100)+'%';
}
function drawLesson(){
 const lesson=LESSONS[state.lesson];const done=state.completed.includes(state.lesson);
 $('lesson-content').innerHTML='<div class="lesson-intro"><div class="lesson-topline"><span class="chapter-kicker">'+lesson.chapter+'</span><span class="lesson-count">الدرس '+arabicNumber(state.lesson+1)+' من '+arabicNumber(LESSONS.length)+'</span></div><h2>'+lesson.title+'</h2><p>'+lesson.subtitle+'</p></div>'+
 '<div class="lesson-cover"><span class="cover-symbol" aria-hidden="true">'+lesson.emoji+'</span><div class="cover-quote">'+lesson.quote+'<small>'+lesson.quoteNote+'</small></div></div>'+
 lesson.sections.map(s=>'<article class="content-panel"><h3>'+s.title+'</h3>'+s.body+'</article>').join('')+
 '<section class="mini-activity" aria-label="تحدي نهاية الدرس"><div class="mini-head">⚡ تحدٍّ سريع · اختبر فهمك</div><h3>'+lesson.activity.prompt+'</h3><p>اختر الإجابة الصحيحة لإكمال الدرس.</p><div class="mini-actions">'+lesson.activity.choices.map((opt,i)=>'<button class="activity-option" type="button" data-activity="'+i+'">'+opt+'</button>').join('')+'</div><div id="activity-feedback" aria-live="polite">'+(done?'<div class="activity-feedback">✅ لقد أنهيت هذا الدرس سابقًا! يمكنك إعادة الإجابة للمراجعة.</div>':'')+'</div></section>';
 document.querySelectorAll('[data-activity]').forEach(btn=>btn.addEventListener('click',()=>checkActivity(Number(btn.dataset.activity),btn)));
 $('previous-lesson').disabled=state.lesson===0;
 $('next-lesson').textContent=state.lesson===LESSONS.length-1?'الانتقال إلى الاختبار ←':'الدرس التالي ←';
 drawNav();drawProgress();
}
function checkActivity(index,button){
 const activity=LESSONS[state.lesson].activity;
 document.querySelectorAll('[data-activity]').forEach(btn=>btn.classList.remove('is-wrong'));
 if(index===activity.answer){
  button.classList.add('is-correct');
  document.querySelectorAll('[data-activity]').forEach(btn=>btn.disabled=true);
  $('activity-feedback').innerHTML='<div class="activity-feedback">✅ '+activity.why+'<br>🌟 أُضيف الدرس إلى إنجازاتك.</div>';
  if(!state.completed.includes(state.lesson)){state.completed.push(state.lesson);persist();drawNav();drawProgress();}
 }else{
  button.classList.add('is-wrong');
  $('activity-feedback').innerHTML='<div class="activity-feedback" style="border-color:#e3a080">🔍 ليست هذه الإجابة. راجع الشرح وحاول مرة أخرى.</div>';
 }
}
function selectLesson(index){
 if(index<0||index>=LESSONS.length)return;
 state.lesson=index;persist();drawLesson();view('learn');
 document.querySelector('.study-layout').scrollIntoView({behavior:'smooth',block:'start'});
}
function drawCards(){
 $('flash-grid').innerHTML=FLASHCARDS.map((f,i)=>'<button class="flash-card" type="button" aria-expanded="false" aria-label="اكشف معنى '+f[0]+'" data-flash="'+i+'"><span class="flash-small">الفصل '+(f[3]<2?'الأول':'الثاني')+'</span><span class="flash-emoji">'+f[2]+'</span><span class="flash-title">'+f[0]+'</span><span class="flash-hint">اضغط لكشف المعنى ↗</span><span class="flash-answer">'+f[1]+'</span></button>').join('');
 document.querySelectorAll('[data-flash]').forEach(btn=>btn.addEventListener('click',()=>{
  const revealed=btn.classList.toggle('revealed');
  btn.setAttribute('aria-expanded',String(revealed));
  btn.setAttribute('aria-label',(revealed?'اخفِ':'اكشف')+' معنى '+FLASHCARDS[Number(btn.dataset.flash)][0]);
 }));
}
function view(id){
 if(!['learn','cards','quiz'].includes(id))id='learn';
 document.querySelectorAll('.main-tabs .tab').forEach(b=>{
  const active=b.dataset.view===id;b.classList.toggle('is-active',active);
  if(active)b.setAttribute('aria-current','page');else b.removeAttribute('aria-current');
 });
 ['learn','cards','quiz'].forEach(name=>$('view-'+name).hidden=(name!==id));
 if(id==='quiz')drawQuiz();
 window.scrollTo({top:0,behavior:'smooth'});
}
function shuffle(array){
 for(let i=array.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[array[i],array[j]]=[array[j],array[i]];}return array;
}
function startQuiz(){
 const field=$('student-name');
 const name=field?field.value.trim().slice(0,55):'';
 state.quiz={name:name||'العالِم الصغير',order:shuffle(QUESTIONS.map((q,i)=>i)),current:0,answers:{},done:false};
 persist();drawQuiz();
}
function restartQuiz(){
 if(state.quiz&&!confirm('هل تريد بدء محاولة جديدة؟ ستُستبدل نتيجة الاختبار السابقة.'))return;
 state.quiz=null;persist();drawQuiz();
}
function quizWelcome(){
 $('quiz-content').innerHTML='<div class="quiz-welcome"><span class="quiz-big" aria-hidden="true">🏆</span><span class="chapter-kicker">اختبار الوحدة الأولى</span><h2>جاهز لتصبح عالمًا صغيرًا؟</h2><p>بعد مذاكرة الدروس الخمسة، جرّب هذا الاختبار المتنوع. ستعرف إن كانت إجابتك صحيحة مباشرة، وستقرأ تفسيرًا يساعدك على التعلم حتى من الخطأ.</p><div class="quiz-features"><span>٢٥ سؤالًا</span><span>٥ أسئلة لكل درس</span><span>شرح فوري لكل إجابة</span><span>بلا مؤقّت</span><span>نتيجة مفصلة</span></div><div class="quiz-form"><label for="student-name">اسم الطالب (اختياري)</label><input id="student-name" maxlength="55" autocomplete="off" placeholder="اسم العالِم الصغير"></div><button type="button" id="start-quiz" class="button primary">ابدأ الاختبار الآن ←</button><p style="font-size:11px;margin-top:18px">تُحفَظ المحاولة على هذا الجهاز فقط، ولا تُرسَل بيانات إلى أي جهة.</p></div>';
 $('start-quiz').addEventListener('click',startQuiz);
}
function quizAnswer(choice){
 const quiz=state.quiz;if(!quiz||quiz.done)return;
 const q=QUESTIONS[quiz.order[quiz.current]];
 if(quiz.answers[q.id]!==undefined)return;
 quiz.answers[q.id]=choice;persist();drawQuiz();
}
function nextQuestion(){
 const quiz=state.quiz;if(!quiz)return;
 const q=QUESTIONS[quiz.order[quiz.current]];
 if(quiz.answers[q.id]===undefined)return;
 if(quiz.current===quiz.order.length-1){quiz.done=true;}else{quiz.current++;}
 persist();drawQuiz();
}
function quizQuestion(){
 const quiz=state.quiz;const q=QUESTIONS[quiz.order[quiz.current]];
 const selection=quiz.answers[q.id];const hasAnswer=selection!==undefined;
 const answered=Object.keys(quiz.answers).length;
 const n=quiz.current+1;
 $('quiz-content').innerHTML='<div class="quiz-head"><strong>سؤال '+arabicNumber(n)+' من '+arabicNumber(QUESTIONS.length)+'</strong><span>أجبت عن '+arabicNumber(answered)+' سؤالًا</span></div><div class="quiz-progress"><span style="width:'+(answered/QUESTIONS.length*100)+'%"></span></div><section class="quiz-card"><span class="quiz-chapter">'+LESSONS[q.l].title+'</span><h2 class="quiz-question">'+q.q+'</h2><div class="answer-list">'+q.options.map((opt,i)=>{
  const cls=hasAnswer?(i===q.answer?'is-correct':i===selection?'is-wrong':''):'';
  return '<button type="button" class="answer-option '+cls+'" data-answer="'+i+'" '+(hasAnswer?'disabled':'')+'><span class="option-letter">'+['أ','ب','ج','د'][i]+'</span>'+opt+'</button>';
 }).join('')+'</div>'+
 (hasAnswer?'<div class="answer-feedback '+(selection===q.answer?'':'wrong')+'" role="status"><strong>'+(selection===q.answer?'🎉 إجابة صحيحة!':'💡 تعلّم من المحاولة!')+'</strong><p>'+q.why+'</p></div>':'<p style="font-size:12px;color:#758b78;margin-top:18px">اضغط على الإجابة التي تراها صحيحة. لا يمكن تغيير الإجابة بعد اختيارها.</p>')+
 '<div class="quiz-actions"><button type="button" id="quit-quiz" class="button ghost">إنهاء المحاولة</button><button type="button" id="next-question" class="button primary" '+(!hasAnswer?'disabled':'')+'>'+(n===QUESTIONS.length?'عرض النتيجة 🏆':'السؤال التالي ←')+'</button></div></section>';
 document.querySelectorAll('[data-answer]').forEach(btn=>btn.addEventListener('click',()=>quizAnswer(Number(btn.dataset.answer))));
 $('next-question').addEventListener('click',nextQuestion);
 $('quit-quiz').addEventListener('click',restartQuiz);
}
function quizResult(){
 const quiz=state.quiz;
 let score=0;
 const breakdown=[{correct:0,total:0},{correct:0,total:0}];
 quiz.order.forEach(index=>{
  const q=QUESTIONS[index];const ch=quiz.answers[q.id];const group=q.l<2?0:1;breakdown[group].total++;
  if(ch===q.answer){score++;breakdown[group].correct++;}
 });
 const percent=Math.round(100*score/QUESTIONS.length);
 let message=percent>=90?'إنجاز مذهل! أنت عالم متميز 🌟':percent>=70?'أداء جميل! واصل الاستكشاف 🌱':percent>=50?'أحسنت المحاولة! راجع دروسك ثم جرّب ثانية 🧠':'كل تجربة فرصة للتعلّم. ارجع إلى المذكرة وابدأ بثقة 💚';
 $('quiz-content').innerHTML='<div class="quiz-welcome"><span class="quiz-big" aria-hidden="true">'+(percent>=70?'🏆':'🌱')+'</span><span class="chapter-kicker">نتيجة اختبار الوحدة الأولى</span><h2>أحسنت يا '+clean(quiz.name)+'!</h2><p>'+message+'</p><div class="score-circle" style="--percent:'+percent+'%"><div><strong>'+arabicNumber(score)+' / '+arabicNumber(QUESTIONS.length)+'</strong><span>'+arabicNumber(percent)+'٪ إجابات صحيحة</span></div></div><div class="score-breakdown"><div class="score-part"><span>الفصل الأول: الممالك</span><strong>'+arabicNumber(breakdown[0].correct)+' / '+arabicNumber(breakdown[0].total)+'</strong></div><div class="score-part"><span>الفصل الثاني: المملكة الحيوانية</span><strong>'+arabicNumber(breakdown[1].correct)+' / '+arabicNumber(breakdown[1].total)+'</strong></div></div><div style="display:flex;flex-wrap:wrap;gap:10px;justify-content:center"><button type="button" id="retry-quiz" class="button primary">أعد الاختبار ↻</button><button type="button" id="back-study" class="button secondary">راجع المذكرة 📖</button><button type="button" id="print-result" class="button ghost">اطبع النتيجة 🖨️</button></div></div>'+
 '<section class="review-list"><div class="section-heading"><h2>مراجعة إجاباتك</h2><p>انظر أين أصبت، وما المفهوم الذي يحتاج إلى مراجعة.</p></div>'+
 quiz.order.map((index,i)=>{
 const q=QUESTIONS[index];const answer=quiz.answers[q.id];const correct=answer===q.answer;
 return '<details class="review-item"><summary>'+(correct?'✅':'❌')+' '+arabicNumber(i+1)+'. '+q.q+'</summary><p>إجابتك: <b>'+clean(q.options[answer]??'لم تُجب')+'</b></p><p>الصحيح: <b>'+q.options[q.answer]+'</b></p><small>'+q.why+'</small></details>';
 }).join('')+'</section>';
 $('retry-quiz').addEventListener('click',restartQuiz);
 $('back-study').addEventListener('click',()=>view('learn'));
 $('print-result').addEventListener('click',()=>window.print());
}
function drawQuiz(){
 if(!state.quiz){quizWelcome();return;}
 if(state.quiz.done){quizResult();return;}
 if(state.quiz.current<0||state.quiz.current>=QUESTIONS.length){state.quiz.current=0;persist();}
 quizQuestion();
}
function init(){
 drawLesson();drawCards();
 document.querySelectorAll('[data-view]').forEach(btn=>btn.addEventListener('click',()=>view(btn.dataset.view)));
 $('previous-lesson').addEventListener('click',()=>selectLesson(state.lesson-1));
 $('next-lesson').addEventListener('click',()=>state.lesson===LESSONS.length-1?view('quiz'):selectLesson(state.lesson+1));
 if(location.hash==='#quiz')view('quiz');
 else if(location.hash==='#cards')view('cards');
 else view('learn');
}
init();
