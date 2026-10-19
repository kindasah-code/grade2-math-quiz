(function () {
  "use strict";
  var WORDS = Array.isArray(window.SPELLING_WORDS) ? window.SPELLING_WORDS : [];
  var NOTES = window.SPELLING_SOURCE_NOTES || {};
  var STORAGE_KEY = "alfal-spelling-grade4-2026-v1";
  var arabicDigits = new Intl.NumberFormat("ar-SA-u-nu-arab");
  var STORAGE = load();
  var tab = "study";
  var activeGroup = "1";
  var filterText = "";
  var game = null;
  var tick = null;
  var noticeTimer = null;
  var wordMap = new Map(WORDS.map(function (w) { return [w.id, w]; }));
  var info = {
    practice: {icon:"✏️", title:"تدريب الاستماع والكتابة", description:"استمع للكلمة، واكتب حروفها بنفسك. يمكنك طلب تلميح بالمعنى، وستظهر الإجابة الصحيحة فورًا بعد المحاولة.", start:"ابدأ التدريب", label:"تدريب بلا مؤقّت"},
    exam: {icon:"🎧", title:"اختبار الإملاء الصوتي", description:"لن تظهر الكلمة مكتوبة. استمع إلى الصوت ثم اكتب ما سمعته. لا توجد تلميحات أو تصحيحات حتى انتهاء الاختبار.", start:"ابدأ الاختبار الصوتي", label:"النتيجة بعد الانتهاء"},
    oral: {icon:"🎤", title:"تحدّي التهجئة الشفهية", description:"مثل مسابقة المدرسة: استمع، انطق الكلمة، تهجّأ حروفها بصوت مرتفع، ثم أعِد نطقها. اكشف الإجابة وقيّم نفسك.", start:"ابدأ التحدي الشفهي", label:"Say it · Spell it · Seal it"}
  };

  function load() {
    try {
      var obj = JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}");
      return {starred:Array.isArray(obj.starred) ? obj.starred : [], stats:obj.stats && typeof obj.stats === "object" ? obj.stats : {}, attempts:Array.isArray(obj.attempts) ? obj.attempts : []};
    } catch (_) { return {starred:[], stats:{}, attempts:[]}; }
  }
  function save() { try { localStorage.setItem(STORAGE_KEY, JSON.stringify(STORAGE)); } catch (_) {} }
  function ar(n) { return arabicDigits.format(Number(n) || 0); }
  function html(text) { return String(text == null ? "" : text).replace(/[&<>"']/g, function (ch) { return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]; }); }
  function normalize(text) { return String(text || "").normalize("NFKC").toLocaleLowerCase("en").replace(/[\s\-‐‑–—()'’.,!?]+/g, ""); }
  function spokenWord(word) { return String(word).replace(/[()]/g, "").replace(/[-‐‑–—]/g, " ").replace(/\s+/g, " ").trim(); }
  function getWord(id) { return wordMap.get(Number(id)); }
  function hasSpeech() { return "speechSynthesis" in window && typeof window.SpeechSynthesisUtterance === "function"; }
  function englishVoice() {
    var all = window.speechSynthesis.getVoices();
    var english = all.filter(function (voice) { return /^en([-_]|$)/i.test(voice.lang); });
    english.sort(function (a,b) {
      function rank(v) {
        var locale = (v.lang || "").toLowerCase();
        var name = (v.name || "").toLowerCase();
        return (locale.startsWith("en-us") ? 30 : 0) + (/(natural|google|samantha|aria|zira)/.test(name) ? 10 : 0) + (v.localService ? 1 : 0);
      }
      return rank(b) - rank(a);
    });
    return english[0] || null;
  }
  function speak(id, how) {
    var word = getWord(id);
    if (!word) return false;
    if (!hasSpeech()) { alertNotice("الصوت غير مدعوم في هذا المتصفح. افتح النشاط باستخدام Chrome أو Edge مع تفعيل الصوت."); return false; }
    var voiceText = spokenWord(word.word);
    if (how === "letters") {
      voiceText = voiceText.toUpperCase().split(/\s+/).map(function (segment) {
        return segment.replace(/[^A-Z]/g, "").split("").join(", ");
      }).join(".  ");
    }
    try {
      window.speechSynthesis.cancel();
      var utterance = new window.SpeechSynthesisUtterance(voiceText);
      utterance.lang = "en-US";
      var voice = englishVoice();
      if (voice) { utterance.voice = voice; utterance.lang = voice.lang; }
      utterance.rate = how === "slow" ? 0.64 : how === "letters" ? 0.72 : 0.86;
      utterance.pitch = 1;
      utterance.volume = 1;
      utterance.onerror = function (event) {
        if (event && !["interrupted","canceled"].includes(event.error)) {
          alertNotice("تعذّر تشغيل الصوت. تأكد من مستوى صوت الجهاز، ثم اضغط زر السماعة مجددًا.");
        }
      };
      window.speechSynthesis.speak(utterance);
      return true;
    } catch (_) {
      alertNotice("تعذّر تشغيل الصوت على هذا الجهاز. جرّب Chrome أو Edge.");
      return false;
    }
  }
  function alertNotice(message) {
    var node = document.getElementById("notice");
    if (!node) return;
    node.textContent = message;
    node.hidden = false;
    if (noticeTimer) clearTimeout(noticeTimer);
    noticeTimer = setTimeout(function () { node.hidden = true; }, 5500);
  }
  function studyStats() {
    var seen = 0, mastered = 0, need = 0;
    WORDS.forEach(function (w) {
      var s = STORAGE.stats[w.id];
      if (!s || !s.seen) return;
      seen++;
      if (s.correct >= 2 && s.correct / s.seen >= 0.7) mastered++;
      if (s.last === "wrong") need++;
    });
    return {seen:seen, mastered:mastered, need:need};
  }
  function renderStudy() {
    var result = WORDS.filter(function (w) {
      if (filterText) return (w.word + " " + w.meaning).toLocaleLowerCase().indexOf(filterText.toLocaleLowerCase()) >= 0;
      if (activeGroup === "all") return true;
      if (activeGroup === "starred") return STORAGE.starred.indexOf(w.id) >= 0;
      return Math.ceil(w.id / 20) === Number(activeGroup);
    });
    document.getElementById("study-count").textContent = ar(result.length) + " كلمة وعبارة";
    document.getElementById("study-list").innerHTML = result.length ? result.map(function (w) {
      var starred = STORAGE.starred.indexOf(w.id) >= 0;
      return '<article class="word-card">' +
        '<div class="word-top"><span class="word-number">#' + w.id + '</span><div class="word-actions">' +
        '<button type="button" class="icon-btn" data-speak-id="' + w.id + '" aria-label="اسمع كلمة ' + html(w.word) + '" title="اسمع الكلمة">🔊</button>' +
        '<button type="button" class="icon-btn" data-letters-id="' + w.id + '" aria-label="اسمع تهجئة ' + html(w.word) + '" title="اسمع الحروف">🔡</button>' +
        '<button type="button" class="icon-btn' + (starred ? ' starred' : '') + '" data-star-id="' + w.id + '" aria-pressed="' + starred + '" aria-label="حفظ كلمة ' + html(w.word) + ' للمراجعة" title="إضافة للمراجعة">⭐</button>' +
        '</div></div><div class="word-en" lang="en">' + html(w.word) + '</div><div class="word-ar">' + html(w.meaning) + '</div>' +
        (NOTES[w.id] ? '<p class="source-note">' + html(NOTES[w.id]) + '</p>' : '') +
        '</article>';
    }).join("") : '<div class="empty">🔎 لا توجد كلمات مطابقة. جرّب البحث بطريقة أخرى أو تغيير المجموعة.</div>';
  }
  function poolWords(value) {
    if (value === "all") return WORDS.slice();
    if (value === "starred") return WORDS.filter(function (w) { return STORAGE.starred.includes(w.id); });
    if (value === "mistakes") return WORDS.filter(function (w) { return STORAGE.stats[w.id] && STORAGE.stats[w.id].last === "wrong"; });
    var group = Number(value);
    if (group >= 1 && group <= 5) return WORDS.filter(function (w) { return Math.ceil(w.id / 20) === group; });
    return WORDS.slice();
  }
  function shuffled(items) {
    var copy = items.slice();
    for (var i = copy.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = copy[i]; copy[i] = copy[j]; copy[j] = temp;
    }
    return copy;
  }
  function stopTimer() { if (tick !== null) { clearInterval(tick); tick = null; } }
  function stopVoice() { if (hasSpeech()) window.speechSynthesis.cancel(); }
  function switchTab(next) {
    if (!["study","practice","exam","oral","progress"].includes(next)) return;
    if (game && !game.done && next !== game.mode) {
      if (!window.confirm("الخروج من النشاط الحالي؟ ستُلغى المحاولة غير المكتملة.")) return;
      stopTimer(); stopVoice(); game = null;
    }
    tab = next;
    document.querySelectorAll(".view").forEach(function (view) { view.hidden = view.id !== "view-" + tab; });
    document.querySelectorAll("[data-tab]").forEach(function (button) {
      var selected = button.dataset.tab === tab;
      button.classList.toggle("is-active", selected);
      if (selected) button.setAttribute("aria-current","page");
      else button.removeAttribute("aria-current");
    });
    if (tab === "study") renderStudy();
    if (tab === "progress") renderProgress();
    if (info[tab] && (!game || game.mode !== tab)) renderSetup(tab);
    var section = document.getElementById("view-" + tab);
    if (section) section.scrollIntoView({behavior:"smooth",block:"start"});
  }
  function renderSetup(mode) {
    var detail = info[mode], root = document.getElementById(mode + "-content");
    if (!root) return;
    var poolList = [["all","جميع الكلمات (١٠٠)"],["1","المجموعة ١ · ١–٢٠"],["2","المجموعة ٢ · ٢١–٤٠"],["3","المجموعة ٣ · ٤١–٦٠"],["4","المجموعة ٤ · ٦١–٨٠"],["5","المجموعة ٥ · ٨١–١٠٠"],["starred","⭐ المحفوظة للمراجعة"],["mistakes","🔁 الكلمات التي أخطأت فيها"]];
    var poolOptions = poolList.map(function (p) { return '<option value="' + p[0] + '">' + p[1] + '</option>'; }).join("");
    root.innerHTML = '<div class="setup"><div class="setup-header"><div class="mode-icon" aria-hidden="true">' + detail.icon + '</div>' +
      '<span class="kicker">' + detail.label + '</span><h2>' + detail.title + '</h2><p>' + detail.description + '</p>' +
      '<div class="settings">' +
      '<div class="setting"><label for="' + mode + '-pool">اختر الكلمات</label><select id="' + mode + '-pool">' + poolOptions + '</select><div class="helper">المجموعات من ٢٠ كلمة؛ ويمكنك مراجعة الكلمات التي أخطأت فيها.</div></div>' +
      '<div class="setting"><label for="' + mode + '-count">عدد الأسئلة</label><select id="' + mode + '-count"><option value="10">١٠ كلمات</option><option value="20" selected>٢٠ كلمة</option><option value="50">٥٠ كلمة</option><option value="100">١٠٠ كلمة (كامل القائمة)</option></select><div class="helper">إذا كانت المجموعة أصغر، تُستخدم جميع كلماتها دون تكرار.</div></div>' +
      (mode === "practice" ? '' : '<div class="setting wide"><label for="' + mode + '-seconds">الوقت المسموح لكل كلمة</label><select id="' + mode + '-seconds"><option value="0">بدون مؤقّت</option><option value="15">١٥ ثانية</option><option value="30" selected>٣٠ ثانية</option><option value="45">٤٥ ثانية</option><option value="60">٦٠ ثانية</option></select><div class="helper">المدرسة تشترط وقتًا محددًا لكنها لم تذكر عدد الثواني، لذلك تستطيع تحديده هنا.</div></div>') +
      '</div><div class="setup-footer"><button type="button" class="primary-btn" data-start="' + mode + '">' + detail.start + ' ←</button>' +
      '<span class="setup-disclaimer">🔊 يعتمد النشاط على النطق الإنجليزي في جهازك. شغّل الصوت قبل الاختبار.</span></div></div></div>';
  }
  function startGame(mode, overrideIds) {
    if (!hasSpeech()) {
      alertNotice("الاختبار يعتمد على الصوت. افتح هذا الموقع في متصفح Chrome أو Edge الذي يدعم القراءة الصوتية.");
      return;
    }
    var source;
    if (Array.isArray(overrideIds)) {
      source = overrideIds.map(getWord).filter(Boolean);
    } else {
      var choice = document.getElementById(mode + "-pool");
      source = poolWords(choice ? choice.value : "all");
    }
    if (!source.length) {
      alertNotice("هذه المجموعة فارغة الآن. اختر جميع الكلمات أو احفظ كلمات للمراجعة أولًا.");
      return;
    }
    var lengthSelect = document.getElementById(mode + "-count");
    var count = Array.isArray(overrideIds) ? source.length : Number(lengthSelect ? lengthSelect.value : 20);
    count = Math.min(count, source.length);
    var secsSelect = document.getElementById(mode + "-seconds");
    var seconds = mode === "practice" ? 0 : Number(secsSelect ? secsSelect.value : 30);
    game = {mode:mode, items:shuffled(source).slice(0, count).map(function (w) { return w.id; }), index:0, seconds:seconds, phase:"question", results:[], done:false, deadline:0};
    stopVoice();
    switchTab(mode);
    renderQuestion();
  }
  function currentWord() { return game && getWord(game.items[game.index]); }
  function timerMarkup() {
    return game.seconds > 0 ? '<span id="clock" class="timer" aria-label="الوقت المتبقي">' + game.seconds + 's</span>' : '<span class="game-label">بدون مؤقّت</span>';
  }
  function gameFrame(content) {
    return '<div class="game-wrap"><div class="game-header"><span class="game-label">' + info[game.mode].label + '</span>' +
      '<span class="progress-fraction">' + ar(game.index + 1) + ' / ' + ar(game.items.length) + '</span>' +
      timerMarkup() + '</div><div class="game-progress" aria-hidden="true"><div style="width:' + ((game.index / game.items.length) * 100).toFixed(2) + '%"></div></div>' +
      '<div class="game-card">' + content + '</div><p class="micro-note">🔒 لا تُعرض التهجئة الصحيحة قبل الإجابة في الاختبار الصوتي.</p></div>';
  }
  function renderQuestion() {
    if (!game || game.done) return;
    var w = currentWord();
    if (!w) { finishGame(); return; }
    game.phase = "question";
    var isOral = game.mode === "oral";
    var isPractice = game.mode === "practice";
    var content = '<p class="stage-badge">' + (isOral ? '🎤 تحدّي شفهي' : '🎧 اسمع الكلمة ثم أجب') + '</p>' +
      '<button type="button" class="speaker" data-action="replay" aria-label="استمع إلى الكلمة مجددًا" title="استمع مرة أخرى">🔊</button>' +
      '<p class="sound-desc">اضغط السماعة للاستماع إلى الكلمة مجددًا.</p>' +
      '<div class="sound-buttons"><button type="button" class="secondary-btn small-btn" data-action="replay">🔊 إعادة الاستماع</button>' +
      '<button type="button" class="secondary-btn small-btn" data-action="slow">🐢 نطق بطيء</button></div>';
    if (isOral) {
      content += '<div class="oral-instructions"><ol><li><span lang="en" dir="ltr">Say it:</span> انطق الكلمة.</li><li><span lang="en" dir="ltr">Spell it:</span> تهجّأ كل حرف بصوت مرتفع.</li><li><span lang="en" dir="ltr">Seal it:</span> أعِد نطق الكلمة.</li></ol></div>' +
        '<div class="answer-actions"><button type="button" class="primary-btn" data-action="reveal">👀 اكشف الكلمة وأقيّم نفسي</button></div>';
    } else {
      content += '<label class="sr-label" for="spelling-answer">اكتب الكلمة باللغة الإنجليزية</label>' +
        '<input id="spelling-answer" class="answer-input" type="text" lang="en" dir="ltr" inputmode="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" placeholder="Type the word..." aria-label="اكتب الكلمة بالإنجليزية">' +
        (isPractice ? '<div class="answer-actions"><button type="button" class="secondary-btn small-btn" data-action="hint">💡 أريد تلميحًا بالمعنى</button></div><div id="meaning-hint" class="letter-hint" hidden></div>' : '') +
        '<div class="answer-actions"><button type="button" class="primary-btn" data-action="submit">تأكيد الإجابة ✓</button></div>';
    }
    document.getElementById(game.mode + "-content").innerHTML = gameFrame(content);
    startTimer();
    speak(w.id,"normal");
  }
  function startTimer() {
    stopTimer();
    if (!game || game.seconds <= 0) return;
    game.deadline = Date.now() + game.seconds * 1000;
    tick = setInterval(function () {
      if (!game || game.done || game.phase !== "question") { stopTimer(); return; }
      var secondsLeft = Math.max(0, Math.ceil((game.deadline - Date.now()) / 1000));
      var node = document.getElementById("clock");
      if (node) {
        node.textContent = secondsLeft + "s";
        node.classList.toggle("urgent", secondsLeft <= 10);
      }
      if (secondsLeft <= 0) {
        stopTimer();
        if (game.mode === "oral") record(false,"",true);
        else submitAnswer(true);
      }
    }, 200);
  }
  function updateWordStats(id, correct) {
    var stats = STORAGE.stats[id] || {seen:0, correct:0, wrong:0, last:""};
    stats.seen++;
    if (correct) stats.correct++;
    else stats.wrong++;
    stats.last = correct ? "correct" : "wrong";
    STORAGE.stats[id] = stats;
    save();
  }
  function record(correct, typed, timedOut) {
    if (!game || game.phase !== "question") return;
    stopTimer();
    game.results.push({id:currentWord().id, correct:!!correct, typed:String(typed || "").slice(0,120), timeout:!!timedOut});
    updateWordStats(currentWord().id, !!correct);
    if (game.mode === "exam") nextQuestion();
    else { game.phase = "feedback"; renderFeedback(); }
  }
  function submitAnswer(timedOut) {
    if (!game || game.phase !== "question" || game.mode === "oral") return;
    var field = document.getElementById("spelling-answer");
    var typed = field ? field.value.trim() : "";
    if (!timedOut && !typed) { alertNotice("اكتب الكلمة أولًا، أو استمع مرة أخرى."); if (field) field.focus(); return; }
    var correct = !timedOut && normalize(typed) === normalize(spokenWord(currentWord().word));
    record(correct,typed,timedOut);
  }
  function revealOral() {
    if (!game || game.mode !== "oral" || game.phase !== "question") return;
    stopTimer();
    game.phase = "reveal";
    var w = currentWord();
    var content = '<p class="stage-badge">✅ قارن تهجئتك</p>' +
      '<p class="oral-answer" lang="en">' + html(w.word) + '</p><p class="subtext">' + html(w.meaning) + '</p>' +
      (NOTES[w.id] ? '<p class="source-note">' + html(NOTES[w.id]) + '</p>' : '') +
      '<div class="sound-buttons"><button type="button" class="secondary-btn small-btn" data-action="replay">🔊 الكلمة</button><button type="button" class="secondary-btn small-btn" data-action="letters">🔡 الحروف</button></div>' +
      '<p>هل نطقت الكلمة، وتهجّأتها حرفًا حرفًا بشكل صحيح، ثم أعدت نطقها؟</p>' +
      '<div class="answer-actions"><button type="button" class="primary-btn" data-action="oral-correct">✅ نعم، نجحت</button><button type="button" class="danger-btn" data-action="oral-wrong">🔁 أحتاج مراجعة</button></div>';
    document.getElementById("oral-content").innerHTML = gameFrame(content);
  }
  function recordOral(correct) {
    if (!game || game.mode !== "oral" || game.phase !== "reveal") return;
    game.results.push({id:currentWord().id, correct:!!correct, typed:"", timeout:false});
    updateWordStats(currentWord().id,!!correct);
    nextQuestion();
  }
  function renderFeedback() {
    if (!game || game.phase !== "feedback") return;
    var last = game.results[game.results.length-1], w = currentWord();
    var title = last.timeout ? '⏰ انتهى الوقت' : last.correct ? '🌟 إجابة صحيحة!' : '💡 لنراجع هذه الكلمة';
    var description = last.timeout ? 'لم تُحتسب هذه الكلمة بسبب انتهاء الوقت.' : last.correct ? 'رائع! لقد كتبت الحروف بشكل صحيح.' : 'هذه هي الكتابة الصحيحة؛ اسمع الحروف مجددًا وتدرّب عليها.';
    var content = '<div class="feedback-title' + (!last.correct ? ' bad' : '') + '">' + title + '</div><p class="subtext">' + description + '</p>' +
      '<div class="reveal' + (!last.correct ? ' bad' : '') + '"><strong lang="en">' + html(w.word) + '</strong><p>' + html(w.meaning) + '</p>' +
      (!last.correct && last.typed ? '<p class="review-note">إجابتك: <span lang="en" dir="ltr">' + html(last.typed) + '</span></p>' : '') +
      (NOTES[w.id] ? '<p class="source-note">' + html(NOTES[w.id]) + '</p>' : '') + '</div>' +
      '<div class="sound-buttons"><button type="button" class="secondary-btn small-btn" data-action="replay">🔊 سماع الكلمة</button>' +
      '<button type="button" class="secondary-btn small-btn" data-action="letters">🔡 سماع التهجئة حرفًا حرفًا</button></div>' +
      '<div class="answer-actions"><button type="button" class="primary-btn" data-action="next">' +
      (game.index + 1 >= game.items.length ? '🏆 عرض نتيجتي' : 'الكلمة التالية ←') + '</button></div>';
    document.getElementById(game.mode + "-content").innerHTML = gameFrame(content);
  }
  function nextQuestion() {
    if (!game || game.done) return;
    stopVoice(); stopTimer(); game.index++;
    if (game.index >= game.items.length) finishGame();
    else renderQuestion();
  }
  function finishGame() {
    if (!game || game.done) return;
    stopTimer(); stopVoice(); game.done = true;
    var correct = game.results.filter(function (r) { return r.correct; }).length;
    STORAGE.attempts.unshift({date:new Date().toISOString(),mode:game.mode,correct:correct,total:game.results.length});
    STORAGE.attempts = STORAGE.attempts.slice(0,30);
    save();
    renderResult();
  }
  function renderResult() {
    var root = document.getElementById(game.mode + "-content");
    var correct = game.results.filter(function (r) { return r.correct; }).length;
    var mistakes = game.results.filter(function (r) { return !r.correct; });
    var percent = Math.round(correct / Math.max(game.results.length,1) * 100);
    var slogan = percent === 100 ? "بطل التهجئة! نتيجة كاملة!" : percent >= 80 ? "أداء رائع! اقتربت من الإتقان." : percent >= 50 ? "تقدّم جميل؛ راجع الكلمات الصعبة." : "كل محاولة تقرّبك من الإتقان!";
    var blocks = mistakes.map(function (r) {
      var w = getWord(r.id);
      return '<article class="review-item"><header><strong lang="en">' + html(w.word) + '</strong><button type="button" class="icon-btn" data-speak-id="' + w.id + '" aria-label="اسمع ' + html(w.word) + '">🔊</button></header><p>' + html(w.meaning) + '</p>' +
        '<p class="wrong">' + (r.timeout ? '⏰ انتهى الوقت' : r.typed ? 'كتبت: <span lang="en" dir="ltr">' + html(r.typed) + '</span>' : 'لم تُكتب إجابة') + '</p>' +
        (NOTES[w.id] ? '<p class="source-note">' + html(NOTES[w.id]) + '</p>' : '') + '</article>';
    }).join("");
    root.innerHTML = '<div class="result-wrap"><div class="result-hero"><div class="trophy" aria-hidden="true">' + (percent >= 80 ? '🏆' : '🌟') + '</div><h2>' + slogan + '</h2>' +
      '<p>' + (game.mode === "oral" ? 'نتيجة تقييمك الذاتي للتحدي الشفهي' : 'انتهى النشاط، وهذه نتيجتك') + '</p>' +
      '<div class="result-grid"><div class="stat"><b>' + ar(correct) + '</b><small>صحيحة</small></div><div class="stat"><b>' + ar(mistakes.length) + '</b><small>تحتاج مراجعة</small></div><div class="stat"><b>' + ar(percent) + '%</b><small>درجة الإتقان</small></div></div>' +
      '<div class="result-actions"><button type="button" class="secondary-btn" data-action="restart">🔁 محاولة جديدة</button>' +
      (mistakes.length ? '<button type="button" class="primary-btn" data-action="review-current">✏️ تدرّب على أخطائي</button>' : '') +
      '<button type="button" class="secondary-btn" data-action="see-progress">🏅 سجل نتائجي</button></div></div>' +
      (mistakes.length ? '<h3 class="review-title">الكلمات التي تحتاج إلى مراجعة (' + ar(mistakes.length) + ')</h3><div class="review-grid">' + blocks + '</div>' : '<p class="micro-note">🎉 لا توجد أخطاء في هذه المحاولة!</p>') +
      '<p class="micro-note">حُفظت النتيجة في هذا المتصفح فقط. لا تحتاج إلى حساب أو تسجيل دخول.</p></div>';
  }
  function renderProgress() {
    var metrics = studyStats();
    var history = STORAGE.attempts.map(function (attempt) {
      var name = info[attempt.mode] ? info[attempt.mode].title : "نشاط";
      var date;
      try { date = new Date(attempt.date).toLocaleString("ar-SA", {dateStyle:"medium",timeStyle:"short"}); } catch (_) { date = attempt.date; }
      return '<div class="history-row"><div><strong>' + html(name) + '</strong><small>' + html(date) + '</small></div><span class="history-num">' + ar(attempt.correct) + ' / ' + ar(attempt.total) + '</span></div>';
    }).join("");
    document.getElementById("progress-content").innerHTML =
      '<section class="progress-panel"><span class="kicker">رحلتك مع الكلمات</span><h2>إنجازاتي</h2><p class="subtext">يتطلب تصنيف «متقن» إجابتين صحيحتين على الأقل ودقة ٧٠٪ أو أكثر.</p>' +
      '<div class="progress-stats"><div class="stat"><b>' + ar(metrics.seen) + '</b><small>كلمات تدرّبت عليها</small></div>' +
      '<div class="stat"><b>' + ar(metrics.mastered) + '</b><small>كلمات متقنة</small></div><div class="stat"><b>' + ar(metrics.need) + '</b><small>تحتاج مراجعة</small></div></div>' +
      '<div class="result-actions">' + (metrics.need ? '<button type="button" class="primary-btn" data-action="practice-mistakes">✏️ درّبني على أخطائي</button>' : '') +
      (STORAGE.starred.length ? '<button type="button" class="secondary-btn" data-action="practice-stars">⭐ مراجعة المحفوظة</button>' : '') +
      '<button type="button" class="secondary-btn" data-tab="study">📚 قائمة الكلمات</button></div></section>' +
      '<section class="progress-panel"><h2>آخر المحاولات</h2>' + (history || '<p class="subtext">لم تبدأ أي محاولة بعد. جرّب التدريب أو الاختبار الصوتي ثم عد إلى هنا.</p>') +
      '</section><p class="micro-note">التقدّم والنتائج محفوظة محليًا على الجهاز الحالي، ولا تنتقل بين الأجهزة تلقائيًا.</p>';
  }
  function toggleStar(id) {
    var word = getWord(id);
    if (!word) return;
    var i = STORAGE.starred.indexOf(word.id);
    if (i >= 0) STORAGE.starred.splice(i,1);
    else STORAGE.starred.push(word.id);
    save(); renderStudy();
  }
  function runAction(action) {
    if (action === "replay" || action === "slow" || action === "letters") {
      var word = currentWord();
      if (word) speak(word.id, action === "slow" ? "slow" : action === "letters" ? "letters" : "normal");
      return;
    }
    if (action === "submit") { submitAnswer(false); return; }
    if (action === "hint" && game && game.mode === "practice" && game.phase === "question") {
      var hint = document.getElementById("meaning-hint");
      if (hint) { hint.textContent = "💡 المعنى: " + currentWord().meaning + " · عدد الحروف: " + ar(normalize(spokenWord(currentWord().word)).length); hint.hidden = false; }
      return;
    }
    if (action === "next" && game && game.phase === "feedback") { nextQuestion(); return; }
    if (action === "reveal") { revealOral(); return; }
    if (action === "oral-correct") { recordOral(true); return; }
    if (action === "oral-wrong") { recordOral(false); return; }
    if (action === "restart" && game && game.done) { var oldMode=game.mode; game=null; renderSetup(oldMode); return; }
    if (action === "review-current" && game && game.done) {
      var ids = game.results.filter(function (r) { return !r.correct; }).map(function (r) { return r.id; });
      game = null;
      startGame("practice",ids);
      return;
    }
    if (action === "see-progress") { game = null; switchTab("progress"); return; }
    if (action === "practice-mistakes") {
      var weak = poolWords("mistakes").map(function (w) { return w.id; });
      startGame("practice",weak); return;
    }
    if (action === "practice-stars") { startGame("practice",STORAGE.starred.slice()); return; }
  }
  document.addEventListener("click", function (event) {
    var node = event.target.closest("button[data-tab],button[data-start],button[data-action],button[data-speak-id],button[data-letters-id],button[data-star-id]");
    if (!node) return;
    if (node.dataset.tab) { switchTab(node.dataset.tab); return; }
    if (node.dataset.speakId) { speak(Number(node.dataset.speakId),"normal"); return; }
    if (node.dataset.lettersId) { speak(Number(node.dataset.lettersId),"letters"); return; }
    if (node.dataset.starId) { toggleStar(Number(node.dataset.starId)); return; }
    if (node.dataset.start) { startGame(node.dataset.start); return; }
    if (node.dataset.action) runAction(node.dataset.action);
  });
  document.getElementById("study-unit").addEventListener("change", function (event) { activeGroup = event.target.value; renderStudy(); });
  document.getElementById("study-search").addEventListener("input", function (event) { filterText = event.target.value.trim(); renderStudy(); });
  document.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && event.target && event.target.id === "spelling-answer") {
      event.preventDefault(); submitAnswer(false);
    }
  });
  window.addEventListener("pagehide", function () { stopTimer(); stopVoice(); });
  if (hasSpeech() && "onvoiceschanged" in window.speechSynthesis) {
    window.speechSynthesis.addEventListener("voiceschanged", function () { window.speechSynthesis.getVoices(); });
  }
  if (WORDS.length !== 100) { alertNotice("تعذّر تحميل قائمة الكلمات كاملة. أعد تحميل الصفحة."); }
  renderStudy();
  renderSetup("practice");
  renderSetup("exam");
  renderSetup("oral");
})();
