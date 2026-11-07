// ==========================================================================
// JP Furigana Flashcards & Sổ tay Từ vựng - Quản lý Học tập & Tra cứu
// ==========================================================================

(function () {
  'use strict';

  // Khởi tạo Engine tiếng Nhật & Audio TTS
  const engine = (typeof JapaneseEngine !== 'undefined') ? new JapaneseEngine() : null;
  const audioEngine = (typeof JapaneseAudioEngine !== 'undefined') 
    ? new JapaneseAudioEngine() 
    : ((typeof japaneseAudio !== 'undefined') ? japaneseAudio : null);

  // Dữ liệu mẫu ban đầu khi người dùng chưa lưu từ nào
  const SAMPLE_WORDS = [
    { word: '日本語', reading: 'にほんご', romaji: 'nihongo', hanviet: 'NHẬT BẢN NGỮ', meaning: 'Tiếng Nhật, ngôn ngữ Nhật', type: 'Danh từ', status: 'learning' },
    { word: '勉強', reading: 'べんきょう', romaji: 'benkyou', hanviet: 'MIỄN CƯỜNG', meaning: 'Học tập, việc học', type: 'Danh từ / Động từ Suru', status: 'learning' },
    { word: '約束', reading: 'やくそく', romaji: 'yakusoku', hanviet: 'ƯỚC THÚC', meaning: 'Lời hứa, cuộc hẹn, giao ước', type: 'Danh từ / Động từ Suru', status: 'learning' },
    { word: '学校', reading: 'がっこう', romaji: 'gakkou', hanviet: 'HỌC HIỆU', meaning: 'Trường học', type: 'Danh từ N5', status: 'mastered' },
    { word: '時計', reading: 'とけい', romaji: 'tokei', hanviet: 'THỜI KẾ', meaning: 'Đồng hồ', type: 'Danh từ N5', status: 'learning' },
    { word: '友達', reading: 'ともだち', romaji: 'tomodachi', hanviet: 'HỮU ĐẠT', meaning: 'Bạn bè, người bạn', type: 'Danh từ N5', status: 'mastered' },
    { word: '電車', reading: 'でんしゃ', romaji: 'densha', hanviet: 'ĐIỆN XA', meaning: 'Tàu điện', type: 'Danh từ N5', status: 'learning' },
    { word: '先生', reading: 'せんせい', romaji: 'sensei', hanviet: 'TIÊN SINH', meaning: 'Thầy cô giáo, giáo viên', type: 'Danh từ N5', status: 'mastered' },
    { word: '綺麗', reading: 'きれい', romaji: 'kirei', hanviet: 'KÌ LỆ', meaning: 'Đẹp đẽ, sạch sẽ', type: 'Tính từ đuôi Na', status: 'learning' },
    { word: '食べる', reading: 'たべる', romaji: 'taberu', hanviet: 'THỰC', meaning: 'Ăn', type: 'Động từ nhóm 2', status: 'mastered' }
  ];

  // Trạng thái ứng dụng
  let savedWords = [];
  let currentDeck = [];
  let currentCardIndex = 0;
  let isCardFlipped = false;
  let currentViewMode = 'grid'; // 'grid' | 'table'

  // Helper lưu trữ đồng nhất
  function getStorageData(keys, callback) {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      chrome.storage.local.get(keys, callback);
    } else {
      const res = {};
      keys.forEach(k => {
        try {
          const val = localStorage.getItem(k);
          if (val) res[k] = JSON.parse(val);
        } catch (_) {}
      });
      callback(res);
    }
  }

  function setStorageData(data, callback) {
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.local) {
      chrome.storage.local.set(data, callback);
    } else {
      Object.keys(data).forEach(k => {
        try {
          localStorage.setItem(k, JSON.stringify(data[k]));
        } catch (_) {}
      });
      if (callback) callback();
    }
  }

  // Khởi tạo trang
  document.addEventListener('DOMContentLoaded', () => {
    initApp();
  });

  function initApp() {
    loadWords(() => {
      setupTabSwitching();
      setupStudyControls();
      setupManagerControls();
      setupListeningControls();
      setupWritingExamControls();
      setupModals();
      setupGlobalShortcuts();
      updateAllUI();
      handleInitialHash();
    });

    // Lắng nghe thay đổi storage từ content script
    if (typeof chrome !== 'undefined' && chrome.storage && chrome.storage.onChanged) {
      chrome.storage.onChanged.addListener((changes, area) => {
        if (area === 'local' && changes.jpSavedWords) {
          savedWords = changes.jpSavedWords.newValue || [];
          updateAllUI();
        }
      });
    }
  }

  // 1. Tải danh sách từ vựng
  function loadWords(callback) {
    getStorageData(['jpSavedWords'], (res) => {
      if (res && Array.isArray(res.jpSavedWords)) {
        savedWords = res.jpSavedWords;
      } else {
        savedWords = [];
      }
      if (callback) callback();
    });
  }

  function saveWords(callback) {
    setStorageData({ jpSavedWords: savedWords }, () => {
      updateStats();
      if (callback) callback();
    });
  }

  // Cập nhật toàn bộ giao diện
  function updateAllUI() {
    updateStats();
    buildStudyDeck();
    renderStudyCard();
    renderManagerList();
  }

  // Cập nhật thống kê
  function updateStats() {
    const total = savedWords.length;
    const mastered = savedWords.filter(w => w.status === 'mastered').length;
    const learning = total - mastered;
    const ratio = total > 0 ? Math.round((mastered / total) * 100) : 0;

    document.getElementById('stat-total').textContent = total;
    document.getElementById('stat-learning').textContent = learning;
    document.getElementById('stat-mastered').textContent = mastered;
    document.getElementById('stat-ratio').textContent = `${ratio}%`;

    document.getElementById('badge-study-count').textContent = learning;
    document.getElementById('badge-total-count').textContent = total;
  }

  // ==========================================================================
  // TAB NAVIGATION
  // ==========================================================================
  function setupTabSwitching() {
    const tabs = document.querySelectorAll('.nav-tab');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetId = tab.dataset.tab;
        switchMainTab(targetId);
      });
    });

    window.addEventListener('hashchange', () => {
      handleInitialHash();
    });
  }

  function switchMainTab(targetId) {
    const tabs = document.querySelectorAll('.nav-tab');
    const panels = document.querySelectorAll('.tab-panel');

    tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === targetId));
    panels.forEach(p => p.classList.toggle('active', p.id === targetId));

    if (targetId === 'tab-study') {
      buildStudyDeck();
      renderStudyCard();
    } else if (targetId === 'tab-manager') {
      renderManagerList();
    } else if (targetId === 'tab-listening') {
      buildListeningDeck();
      renderListeningQuestion();
    } else if (targetId === 'tab-writing-exam') {
      const activeSubtab = document.querySelector('.sub-tab.active');
      const subMode = activeSubtab ? activeSubtab.dataset.subtab : 'writing';
      if (subMode === 'exam') {
        showExamLobby();
      } else {
        buildWritingDeck();
        renderWritingQuestion();
      }
    }
  }

  function handleInitialHash() {
    const hash = (window.location.hash || '').toLowerCase();
    if (hash === '#listening') {
      switchMainTab('tab-listening');
    } else if (hash === '#exam') {
      switchMainTab('tab-writing-exam');
      switchSubTab('exam');
    } else if (hash === '#writing') {
      switchMainTab('tab-writing-exam');
      switchSubTab('writing');
    } else if (hash === '#manager') {
      switchMainTab('tab-manager');
    } else if (hash === '#study') {
      switchMainTab('tab-study');
    }
  }

  // ==========================================================================
  // TAB 1: FLASHCARDS STUDY CONTROLLER
  // ==========================================================================
  function setupStudyControls() {
    const filterSelect = document.getElementById('study-filter');
    const directionSelect = document.getElementById('study-direction');
    const shuffleBtn = document.getElementById('btn-shuffle');
    const flashcard = document.getElementById('flashcard');
    const btnFlip = document.getElementById('btn-card-flip');
    const btnSrsAgain = document.getElementById('btn-srs-again');
    const btnSrsHard = document.getElementById('btn-srs-hard');
    const btnSrsGood = document.getElementById('btn-srs-good');
    const btnSrsEasy = document.getElementById('btn-srs-easy');

    const btnFrontAudio = document.getElementById('btn-card-front-audio');
    const btnBackAudio = document.getElementById('btn-card-back-audio');

    // Chuyển bộ lọc học
    filterSelect.addEventListener('change', () => {
      buildStudyDeck();
      renderStudyCard();
    });

    // Chuyển hướng xem
    directionSelect.addEventListener('change', () => {
      renderStudyCard();
    });

    // Xáo trộn thẻ
    shuffleBtn.addEventListener('click', () => {
      shuffleDeck();
      showToast('🔀 Đã xáo trộn thứ tự các thẻ!');
    });

    // Lật thẻ bằng click
    flashcard.addEventListener('click', (e) => {
      if (e.target.closest('.card-icon-btn') || e.target.closest('#btn-card-stroke')) return;
      toggleCardFlip();
    });

    btnFlip.addEventListener('click', () => {
      toggleCardFlip();
    });

    // Đánh giá SRS 4 cấp độ
    if (btnSrsAgain) btnSrsAgain.addEventListener('click', () => markAnswerSRS(1));
    if (btnSrsHard) btnSrsHard.addEventListener('click', () => markAnswerSRS(2));
    if (btnSrsGood) btnSrsGood.addEventListener('click', () => markAnswerSRS(3));
    if (btnSrsEasy) btnSrsEasy.addEventListener('click', () => markAnswerSRS(4));

    // Nút xem nét vẽ Kanji trên thẻ
    const btnCardStroke = document.getElementById('btn-card-stroke');
    if (btnCardStroke) {
      btnCardStroke.addEventListener('click', (e) => {
        e.stopPropagation();
        if (currentCardIndex >= currentDeck.length) return;
        const currentItem = currentDeck[currentCardIndex];
        const kanjis = Array.from(currentItem.word).filter(ch => /[\u4e00-\u9faf]/.test(ch));
        if (kanjis.length > 0) {
          openStrokeModalWindow(kanjis[0]);
        } else {
          showToast('Từ này không có chữ Hán (Kanji)!');
        }
      });
    }

    // Nút Đồng bộ Anki Desktop trực tiếp
    const btnSyncAnki = document.getElementById('btn-sync-anki-direct');
    if (btnSyncAnki) {
      btnSyncAnki.addEventListener('click', async () => {
        if (!savedWords.length) {
          showToast('⚠️ Sổ tay chưa có từ vựng nào!');
          return;
        }
        btnSyncAnki.innerHTML = '<span>⏳ Đang đồng bộ...</span>';
        let count = 0;
        for (const w of savedWords) {
          try {
            if (typeof ankiConnect !== 'undefined') {
              await ankiConnect.addWordNote(w);
              count++;
            }
          } catch (_) {}
        }
        btnSyncAnki.innerHTML = '<span>✅ Đã đồng bộ Anki</span>';
        showToast(`✅ Đã đồng bộ thành công ${count} từ sang Anki Desktop!`);
        setTimeout(() => {
          btnSyncAnki.innerHTML = '<span>Đồng bộ Anki Desktop</span>';
        }, 2500);
      });
    }

    // Phát âm mặt trước / sau
    const handleAudio = (e) => {
      e.stopPropagation();
      playCurrentWordAudio();
    };
    btnFrontAudio.addEventListener('click', handleAudio);
    btnBackAudio.addEventListener('click', handleAudio);

    // Xử lý nút màn hình kết thúc
    document.getElementById('btn-restart-study').addEventListener('click', () => {
      document.getElementById('session-finished').style.display = 'none';
      document.getElementById('flashcard-scene').style.display = 'flex';
      document.querySelector('.study-action-bar').style.display = 'flex';
      buildStudyDeck();
      renderStudyCard();
    });

    document.getElementById('btn-review-learning').addEventListener('click', () => {
      document.getElementById('study-filter').value = 'learning';
      document.getElementById('session-finished').style.display = 'none';
      document.getElementById('flashcard-scene').style.display = 'flex';
      document.querySelector('.study-action-bar').style.display = 'flex';
      buildStudyDeck();
      renderStudyCard();
    });

    // Empty state buttons
    document.getElementById('btn-empty-add-samples').addEventListener('click', () => {
      loadSampleWords();
    });
    document.getElementById('btn-empty-add-manual').addEventListener('click', () => {
      openModal('modal-add-word');
    });
  }

  function buildStudyDeck() {
    const filter = document.getElementById('study-filter').value;
    const now = Date.now();
    if (filter === 'due') {
      currentDeck = savedWords.filter(w => !w.srs || !w.srs.nextReview || w.srs.nextReview <= now);
      if (currentDeck.length === 0 && savedWords.length > 0) {
        currentDeck = savedWords.filter(w => w.status !== 'mastered');
        if (currentDeck.length === 0) currentDeck = [...savedWords];
      }
    } else if (filter === 'learning') {
      currentDeck = savedWords.filter(w => w.status !== 'mastered');
    } else if (filter === 'mastered') {
      currentDeck = savedWords.filter(w => w.status === 'mastered');
    } else {
      currentDeck = [...savedWords];
    }

    currentCardIndex = 0;
    isCardFlipped = false;
  }

  function shuffleDeck() {
    for (let i = currentDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [currentDeck[i], currentDeck[j]] = [currentDeck[j], currentDeck[i]];
    }
    currentCardIndex = 0;
    isCardFlipped = false;
    renderStudyCard();
  }

  function toggleCardFlip() {
    const card = document.getElementById('flashcard');
    isCardFlipped = !isCardFlipped;
    if (isCardFlipped) {
      card.classList.add('flipped');
    } else {
      card.classList.remove('flipped');
    }
  }

  function renderStudyCard() {
    const scene = document.getElementById('flashcard-scene');
    const actions = document.querySelector('.study-action-bar');
    const emptyState = document.getElementById('study-empty-state');
    const finishedState = document.getElementById('session-finished');

    const total = currentDeck.length;

    if (total === 0) {
      scene.style.display = 'none';
      actions.style.display = 'none';
      finishedState.style.display = 'none';
      emptyState.style.display = 'flex';
      updateProgressDisplay(0, 0);
      return;
    }

    if (currentCardIndex >= total) {
      scene.style.display = 'none';
      actions.style.display = 'none';
      emptyState.style.display = 'none';
      showSessionFinished();
      return;
    }

    scene.style.display = 'flex';
    actions.style.display = 'flex';
    emptyState.style.display = 'none';
    finishedState.style.display = 'none';

    const card = document.getElementById('flashcard');
    card.classList.remove('flipped');
    isCardFlipped = false;

    const item = currentDeck[currentCardIndex];
    const direction = document.getElementById('study-direction').value;

    const frontWord = document.getElementById('card-front-word');
    const frontHint = document.getElementById('card-front-hint');
    const frontStatus = document.getElementById('card-front-status');

    const backReading = document.getElementById('card-back-reading');
    const backRomaji = document.getElementById('card-back-romaji');
    const backWord = document.getElementById('card-back-word');
    const backHanviet = document.getElementById('card-back-hanviet');
    const backMeaning = document.getElementById('card-back-meaning');
    const backKanjiBreakdown = document.getElementById('card-kanji-breakdown');

    // Status pill
    if (item.status === 'mastered') {
      frontStatus.className = 'card-status-pill mastered';
      frontStatus.textContent = '✅ Đã thuộc';
    } else {
      frontStatus.className = 'card-status-pill';
      frontStatus.textContent = '🧠 Đang học';
    }

    if (direction === 'vi-jp') {
      // Mặt trước là tiếng Việt
      frontWord.textContent = item.meaning || item.word;
      frontWord.style.fontSize = (item.meaning && item.meaning.length > 25) ? '32px' : '44px';
      frontHint.textContent = item.type ? `Gợi ý: ${item.type}` : 'Hãy nhớ từ tiếng Nhật tương ứng!';
    } else {
      // Mặt trước là tiếng Nhật (Mặc định)
      frontWord.textContent = item.word;
      frontWord.style.fontSize = (item.word.length > 6) ? '40px' : '56px';
      frontHint.textContent = item.type || 'Tiếng Nhật';
    }

    // Mặt sau
    backWord.textContent = item.word;
    backReading.textContent = item.reading || item.word;
    backRomaji.textContent = item.romaji || (typeof toRomaji === 'function' ? toRomaji(item.reading || item.word) : '');
    
    if (item.hanviet) {
      backHanviet.textContent = `Âm Hán-Việt: ${item.hanviet}`;
      backHanviet.style.display = 'inline-block';
    } else {
      backHanviet.style.display = 'none';
    }

    backMeaning.textContent = item.meaning || 'Chưa có giải nghĩa';

    // Bóc tách Kanji
    backKanjiBreakdown.innerHTML = '';
    if (typeof decomposeKanji === 'function' && /[一-龯]/.test(item.word)) {
      const kanjis = decomposeKanji(item.word);
      kanjis.forEach(k => {
        const chip = document.createElement('div');
        chip.className = 'kanji-chip';
        chip.innerHTML = `<strong>${k.char}</strong> <span class="hv">${k.hv}</span> <span>${k.m ? ': ' + k.m : ''}</span>`;
        backKanjiBreakdown.appendChild(chip);
      });
    }

    updateProgressDisplay(currentCardIndex + 1, total);
  }

  function updateProgressDisplay(current, total) {
    const textElem = document.getElementById('study-progress-text');
    const fillElem = document.getElementById('study-progress-fill');
    textElem.textContent = `Thẻ ${current} / ${total}`;
    const percent = total > 0 ? (current / total) * 100 : 0;
    fillElem.style.width = `${percent}%`;
  }

  // Đánh giá mức độ ghi nhớ theo thuật toán SRS SM-2
  function markAnswerSRS(quality) {
    if (currentCardIndex >= currentDeck.length) return;

    const currentItem = currentDeck[currentCardIndex];
    const idx = savedWords.findIndex(w => w.word === currentItem.word);
    if (idx !== -1) {
      const newSrs = typeof calculateSM2 === 'function' 
        ? calculateSM2(savedWords[idx].srs, quality)
        : { interval: quality >= 3 ? 3 : 1, repetition: quality >= 3 ? 1 : 0, easeFactor: 2.5, nextReview: Date.now() + 86400000 };
      
      savedWords[idx].srs = newSrs;
      savedWords[idx].status = newSrs.interval >= 21 ? 'mastered' : 'learning';
      savedWords[idx].lastReviewedAt = Date.now();
      currentItem.srs = newSrs;
      currentItem.status = savedWords[idx].status;
    }

    saveWords(() => {
      currentCardIndex++;
      renderStudyCard();
    });
  }

  function markAnswer(isMastered) {
    markAnswerSRS(isMastered ? 4 : 1);
  }

  let flashcardStrokeNumbers = true;
  let currentFlashcardStrokeChar = '';

  async function openStrokeModalWindow(char) {
    const modal = document.getElementById('modal-stroke');
    if (!modal) return;
    currentFlashcardStrokeChar = char;
    openModal('modal-stroke');
    document.getElementById('modal-stroke-title').textContent = `✍️ Nét viết chữ [${char}]`;
    const canvas = document.getElementById('modal-stroke-canvas');
    canvas.innerHTML = '<div style="color:#64748b;font-size:13px;display:flex;align-items:center;justify-content:center;height:100%;">⏳ Đang tải nét vẽ...</div>';

    const infoBox = document.getElementById('modal-stroke-info');
    if (infoBox && typeof KANJI_DATA !== 'undefined' && KANJI_DATA[char]) {
      const k = KANJI_DATA[char];
      const hv = Array.isArray(k.hv || k.hanviet) ? (k.hv || k.hanviet).join(', ') : (k.hv || k.hanviet || 'Chưa có');
      const on = Array.isArray(k.on) ? k.on.join(', ') : (k.on || '—');
      const kun = Array.isArray(k.kun) ? k.kun.join(', ') : (k.kun || '—');
      infoBox.innerHTML = `
        <div style="font-size:15px;color:#fcd34d;font-weight:bold;margin-bottom:4px;">Âm Hán-Việt: ${hv}</div>
        <div style="color:#cbd5e1;font-size:13px;"><strong>Âm On:</strong> ${on} | <strong>Âm Kun:</strong> ${kun}</div>
        <div style="color:#94a3b8;font-size:12px;margin-top:4px;">${k.m || ''}</div>
      `;
    }

    if (typeof kanjiStrokeAnimator !== 'undefined') {
      const svg = await kanjiStrokeAnimator.fetchKanjiSvg(char);
      if (svg) {
        kanjiStrokeAnimator.renderAnimatedSvg(canvas, svg, { showNumbers: flashcardStrokeNumbers });
        kanjiStrokeAnimator.showAllStrokes(canvas);
      }
    }
  }

  document.getElementById('btn-stroke-show-all')?.addEventListener('click', () => {
    const canvas = document.getElementById('modal-stroke-canvas');
    if (canvas && typeof kanjiStrokeAnimator !== 'undefined') {
      kanjiStrokeAnimator.showAllStrokes(canvas);
    }
  });

  document.getElementById('btn-stroke-replay')?.addEventListener('click', () => {
    const canvas = document.getElementById('modal-stroke-canvas');
    if (canvas && typeof kanjiStrokeAnimator !== 'undefined') {
      kanjiStrokeAnimator.startAnimation(canvas);
    }
  });

  document.getElementById('btn-stroke-toggle-num')?.addEventListener('click', async () => {
    flashcardStrokeNumbers = !flashcardStrokeNumbers;
    const canvas = document.getElementById('modal-stroke-canvas');
    if (currentFlashcardStrokeChar && canvas && typeof kanjiStrokeAnimator !== 'undefined') {
      const svg = await kanjiStrokeAnimator.fetchKanjiSvg(currentFlashcardStrokeChar);
      if (svg) {
        const wasPlaying = kanjiStrokeAnimator.isPlaying;
        kanjiStrokeAnimator.renderAnimatedSvg(canvas, svg, { showNumbers: flashcardStrokeNumbers });
        if (wasPlaying) {
          kanjiStrokeAnimator.startAnimation(canvas);
        } else {
          kanjiStrokeAnimator.showAllStrokes(canvas);
        }
      }
    }
  });

  function showSessionFinished() {
    const finishedState = document.getElementById('session-finished');
    finishedState.style.display = 'flex';

    const masteredCount = currentDeck.filter(w => w.status === 'mastered').length;
    const learningCount = currentDeck.length - masteredCount;

    document.getElementById('finished-count-mastered').textContent = masteredCount;
    document.getElementById('finished-count-learning').textContent = learningCount;
    document.getElementById('finished-summary').textContent = 
      `Bạn đã hoàn thành phiên ôn tập gồm ${currentDeck.length} từ vựng!`;
  }

  function playCurrentWordAudio() {
    if (currentCardIndex >= currentDeck.length) return;
    const item = currentDeck[currentCardIndex];
    const textToSpeak = item.reading || item.word;

    const btns = [
      document.getElementById('btn-card-front-audio'),
      document.getElementById('btn-card-back-audio')
    ];

    btns.forEach(b => b.classList.add('playing'));

    if (audioEngine) {
      audioEngine.speak(
        textToSpeak,
        { rate: 0.95 },
        () => {},
        () => btns.forEach(b => b.classList.remove('playing'))
      );
    } else {
      setTimeout(() => btns.forEach(b => b.classList.remove('playing')), 1000);
    }
  }

  // ==========================================================================
  // TAB 2: VOCABULARY MANAGER (DANH SÁCH & TRA CỨU)
  // ==========================================================================
  function setupManagerControls() {
    const searchInput = document.getElementById('manager-search-input');
    const clearBtn = document.getElementById('manager-clear-search');
    const statusFilter = document.getElementById('manager-status-filter');
    const sortFilter = document.getElementById('manager-sort-filter');
    const btnGrid = document.getElementById('view-grid-btn');
    const btnTable = document.getElementById('view-table-btn');

    searchInput.addEventListener('input', () => {
      renderManagerList();
    });

    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      searchInput.focus();
      renderManagerList();
    });

    statusFilter.addEventListener('change', () => {
      renderManagerList();
    });

    sortFilter.addEventListener('change', () => {
      renderManagerList();
    });

    btnGrid.addEventListener('click', () => {
      btnGrid.classList.add('active');
      btnTable.classList.remove('active');
      currentViewMode = 'grid';
      document.getElementById('vocabulary-grid').style.display = 'grid';
      document.getElementById('vocabulary-table-wrap').style.display = 'none';
      renderManagerList();
    });

    btnTable.addEventListener('click', () => {
      btnTable.classList.add('active');
      btnGrid.classList.remove('active');
      currentViewMode = 'table';
      document.getElementById('vocabulary-grid').style.display = 'none';
      document.getElementById('vocabulary-table-wrap').style.display = 'block';
      renderManagerList();
    });
  }

  function getFilteredAndSortedWords() {
    const query = document.getElementById('manager-search-input').value.trim().toLowerCase();
    const statusFilter = document.getElementById('manager-status-filter').value;
    const sortFilter = document.getElementById('manager-sort-filter').value;

    let result = savedWords.filter(item => {
      // Lọc trạng thái
      if (statusFilter !== 'all' && item.status !== statusFilter) {
        return false;
      }
      // Lọc tìm kiếm
      if (query) {
        const inWord = item.word.toLowerCase().includes(query);
        const inReading = (item.reading || '').toLowerCase().includes(query);
        const inRomaji = (item.romaji || '').toLowerCase().includes(query);
        const inHanviet = (item.hanviet || '').toLowerCase().includes(query);
        const inMeaning = (item.meaning || '').toLowerCase().includes(query);
        const qNoTone = typeof removeVietnameseTones === 'function' ? removeVietnameseTones(query) : '';
        const inMeaningNoTone = qNoTone && typeof removeVietnameseTones === 'function' ? removeVietnameseTones(item.meaning || '').includes(qNoTone) : false;
        return inWord || inReading || inRomaji || inHanviet || inMeaning || inMeaningNoTone;
      }
      return true;
    });

    // Sắp xếp
    if (sortFilter === 'newest') {
      result.sort((a, b) => (b.savedAt || 0) - (a.savedAt || 0));
    } else if (sortFilter === 'oldest') {
      result.sort((a, b) => (a.savedAt || 0) - (b.savedAt || 0));
    } else if (sortFilter === 'alpha') {
      result.sort((a, b) => (a.reading || a.word).localeCompare(b.reading || b.word, 'ja'));
    }

    return result;
  }

  function renderManagerList() {
    const words = getFilteredAndSortedWords();
    const emptyState = document.getElementById('manager-empty-state');
    const gridView = document.getElementById('vocabulary-grid');
    const tableBody = document.getElementById('vocabulary-table-body');

    if (words.length === 0) {
      emptyState.style.display = 'flex';
      gridView.innerHTML = '';
      tableBody.innerHTML = '';
      return;
    }
    emptyState.style.display = 'none';

    if (currentViewMode === 'grid') {
      renderGridView(words);
    } else {
      renderTableView(words);
    }
  }

  function renderGridView(words) {
    const container = document.getElementById('vocabulary-grid');
    container.innerHTML = '';

    words.forEach(item => {
      const card = document.createElement('div');
      card.className = 'vocab-card';

      const isMastered = item.status === 'mastered';
      const statusText = isMastered ? '✅ Đã thuộc' : '🧠 Đang học';
      const statusClass = isMastered ? 'mastered' : 'learning';

      card.innerHTML = `
        <div class="vocab-header">
          <div>
            <div class="vocab-main-word">${item.word}</div>
            <div class="vocab-reading-row">
              <span class="vocab-reading">${item.reading || item.word}</span>
              ${item.romaji ? `<span class="vocab-romaji">${item.romaji}</span>` : ''}
              ${item.hanviet ? `<span class="vocab-hanviet">${item.hanviet}</span>` : ''}
            </div>
          </div>
          <button class="mini-icon-btn btn-audio" title="Nghe phát âm">
            <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
          </button>
        </div>

        <div class="vocab-meaning">💡 ${item.meaning || 'Chưa có giải nghĩa'}</div>

        <div class="vocab-footer">
          <span class="status-badge-toggle ${statusClass}" title="Nhấp để đổi trạng thái học">${statusText}</span>
          <div class="vocab-actions">
            <button class="mini-icon-btn btn-copy" title="Sao chép từ & nghĩa">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            </button>
            <button class="mini-icon-btn btn-edit" title="Sửa thông tin">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            </button>
            <button class="mini-icon-btn btn-delete" title="Xóa khỏi Sổ tay">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>
          </div>
        </div>
      `;

      // Event listeners
      card.querySelector('.btn-audio').addEventListener('click', (e) => {
        e.stopPropagation();
        if (engine) engine.speak(item.reading || item.word);
      });

      card.querySelector('.status-badge-toggle').addEventListener('click', () => {
        toggleWordStatus(item.word);
      });

      card.querySelector('.btn-copy').addEventListener('click', () => {
        copyWordText(item);
      });

      card.querySelector('.btn-edit').addEventListener('click', () => {
        openEditModal(item);
      });

      card.querySelector('.btn-delete').addEventListener('click', () => {
        deleteWord(item.word);
      });

      container.appendChild(card);
    });
  }

  function renderTableView(words) {
    const tbody = document.getElementById('vocabulary-table-body');
    tbody.innerHTML = '';

    words.forEach((item, index) => {
      const tr = document.createElement('tr');
      const isMastered = item.status === 'mastered';
      const statusText = isMastered ? '✅ Đã thuộc' : '🧠 Đang học';
      const statusClass = isMastered ? 'mastered' : 'learning';

      tr.innerHTML = `
        <td style="color: var(--text-dim);">${index + 1}</td>
        <td><strong style="font-size: 16px; color: #fff;">${item.word}</strong></td>
        <td>
          <span style="color: var(--accent-cyan); font-weight: 600;">${item.reading || item.word}</span>
          ${item.romaji ? `<div style="font-size: 11px; color: var(--text-muted);">${item.romaji}</div>` : ''}
        </td>
        <td><span class="vocab-hanviet">${item.hanviet || '—'}</span></td>
        <td style="color: #cbd5e1;">${item.meaning || '—'}</td>
        <td>
          <span class="status-badge-toggle ${statusClass}" title="Nhấp để đổi trạng thái">${statusText}</span>
        </td>
        <td style="text-align: right;">
          <div class="vocab-actions" style="justify-content: flex-end;">
            <button class="mini-icon-btn btn-audio" title="Nghe phát âm">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
            </button>
            <button class="mini-icon-btn btn-edit" title="Sửa thông tin">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
            </button>
            <button class="mini-icon-btn btn-delete" title="Xóa">
              <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>
          </div>
        </td>
      `;

      tr.querySelector('.btn-audio').addEventListener('click', () => {
        if (engine) engine.speak(item.reading || item.word);
      });

      tr.querySelector('.status-badge-toggle').addEventListener('click', () => {
        toggleWordStatus(item.word);
      });

      tr.querySelector('.btn-edit').addEventListener('click', () => {
        openEditModal(item);
      });

      tr.querySelector('.btn-delete').addEventListener('click', () => {
        deleteWord(item.word);
      });

      tbody.appendChild(tr);
    });
  }

  function toggleWordStatus(word) {
    const item = savedWords.find(w => w.word === word);
    if (!item) return;

    item.status = (item.status === 'mastered') ? 'learning' : 'mastered';
    saveWords(() => {
      renderManagerList();
      buildStudyDeck();
      renderStudyCard();
      showToast(`Đã chuyển trạng thái [${word}]: ${item.status === 'mastered' ? '✅ Đã thuộc' : '🧠 Đang học'}`);
    });
  }

  function deleteWord(word) {
    if (!confirm(`Bạn có chắc chắn muốn xóa từ [${word}] khỏi Sổ tay?`)) return;

    savedWords = savedWords.filter(w => w.word !== word);
    saveWords(() => {
      renderManagerList();
      buildStudyDeck();
      renderStudyCard();
      showToast(`🗑️ Đã xóa [${word}] khỏi Sổ tay`);
    });
  }

  function copyWordText(item) {
    const readingPart = (item.reading && item.reading !== item.word) ? ` [${item.reading}]` : '';
    const hvPart = item.hanviet ? ` (${item.hanviet})` : '';
    const text = `${item.word}${readingPart}${hvPart} - ${item.meaning || ''}`;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        showToast(`📋 Đã sao chép: ${item.word}`);
      });
    }
  }

  // ==========================================================================
  // MODALS & ACTIONS
  // ==========================================================================
  function setupModals() {
    // Đóng modal
    document.querySelectorAll('[data-close-modal]').forEach(btn => {
      btn.addEventListener('click', () => {
        closeModal(btn.dataset.closeModal);
      });
    });

    document.querySelectorAll('.modal-overlay').forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeModal(modal.id);
        }
      });
    });

    // Mở modal Thêm từ
    document.getElementById('btn-add-word').addEventListener('click', () => {
      openModal('modal-add-word');
      document.getElementById('input-new-word').focus();
    });

    // Tự điền khi nhập từ mới
    document.getElementById('btn-auto-lookup').addEventListener('click', () => {
      autoLookupNewWord();
    });

    document.getElementById('input-new-word').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        autoLookupNewWord();
      }
    });

    // Xác nhận thêm từ
    document.getElementById('btn-confirm-add').addEventListener('click', () => {
      confirmAddNewWord();
    });

    // Xác nhận sửa từ
    document.getElementById('btn-confirm-edit').addEventListener('click', () => {
      confirmEditWord();
    });

    // Mở modal sao lưu
    document.getElementById('btn-backup-restore').addEventListener('click', () => {
      openModal('modal-backup');
    });

    // Download JSON
    document.getElementById('btn-download-json').addEventListener('click', () => {
      downloadJsonBackup();
    });

    // Restore JSON
    document.getElementById('btn-execute-restore').addEventListener('click', () => {
      executeJsonRestore();
    });

    // Xuất Anki CSV
    document.getElementById('btn-export-anki').addEventListener('click', () => {
      exportAnkiCSV();
    });
  }

  function openModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.add('active');
  }

  function closeModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.classList.remove('active');
  }

  function autoLookupNewWord() {
    const wordInput = document.getElementById('input-new-word');
    const word = wordInput.value.trim();
    if (!word) {
      alert('Vui lòng nhập từ tiếng Nhật trước!');
      return;
    }

    if (!engine) return;

    const analyzed = engine.analyze(word);
    if (analyzed) {
      document.getElementById('input-new-reading').value = analyzed.reading || word;
      document.getElementById('input-new-romaji').value = analyzed.romaji || '';
      document.getElementById('input-new-hanviet').value = analyzed.hanviet || '';
      document.getElementById('input-new-type').value = analyzed.type || '';
      if (analyzed.meaning) {
        document.getElementById('input-new-meaning').value = analyzed.meaning;
      }
      showToast(`🔍 Đã tự động phân tích: ${word}`);
    }
  }

  function confirmAddNewWord() {
    const word = document.getElementById('input-new-word').value.trim();
    const reading = document.getElementById('input-new-reading').value.trim();
    const romaji = document.getElementById('input-new-romaji').value.trim();
    const hanviet = document.getElementById('input-new-hanviet').value.trim();
    const type = document.getElementById('input-new-type').value.trim();
    const meaning = document.getElementById('input-new-meaning').value.trim();
    const status = document.getElementById('input-new-status').value;

    if (!word) {
      alert('Vui lòng nhập từ tiếng Nhật!');
      return;
    }

    const existingIdx = savedWords.findIndex(w => w.word === word);
    const newEntry = {
      word: word,
      reading: reading || word,
      romaji: romaji,
      hanviet: hanviet,
      type: type,
      meaning: meaning || 'Chưa có giải nghĩa',
      status: status,
      savedAt: Date.now()
    };

    if (existingIdx !== -1) {
      savedWords[existingIdx] = { ...savedWords[existingIdx], ...newEntry };
      showToast(`Đã cập nhật từ [${word}]`);
    } else {
      savedWords.unshift(newEntry);
      showToast(`⭐ Đã thêm [${word}] vào Sổ tay!`);
    }

    saveWords(() => {
      closeModal('modal-add-word');
      // Reset inputs
      document.getElementById('input-new-word').value = '';
      document.getElementById('input-new-reading').value = '';
      document.getElementById('input-new-romaji').value = '';
      document.getElementById('input-new-hanviet').value = '';
      document.getElementById('input-new-type').value = '';
      document.getElementById('input-new-meaning').value = '';
      updateAllUI();
    });
  }

  function openEditModal(item) {
    document.getElementById('edit-original-word').value = item.word;
    document.getElementById('edit-word').value = item.word;
    document.getElementById('edit-reading').value = item.reading || item.word;
    document.getElementById('edit-romaji').value = item.romaji || '';
    document.getElementById('edit-hanviet').value = item.hanviet || '';
    document.getElementById('edit-type').value = item.type || '';
    document.getElementById('edit-meaning').value = item.meaning || '';
    document.getElementById('edit-status').value = item.status || 'learning';

    openModal('modal-edit-word');
  }

  function confirmEditWord() {
    const originalWord = document.getElementById('edit-original-word').value;
    const item = savedWords.find(w => w.word === originalWord);
    if (!item) return;

    item.reading = document.getElementById('edit-reading').value.trim();
    item.romaji = document.getElementById('edit-romaji').value.trim();
    item.hanviet = document.getElementById('edit-hanviet').value.trim();
    item.type = document.getElementById('edit-type').value.trim();
    item.meaning = document.getElementById('edit-meaning').value.trim();
    item.status = document.getElementById('edit-status').value;

    saveWords(() => {
      closeModal('modal-edit-word');
      updateAllUI();
      showToast(`Đã lưu thay đổi cho [${originalWord}]`);
    });
  }

  // Sao lưu JSON
  function downloadJsonBackup() {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(savedWords, null, 2));
    const dlAnchor = document.createElement('a');
    dlAnchor.setAttribute('href', dataStr);
    dlAnchor.setAttribute('download', `jp_notebook_backup_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(dlAnchor);
    dlAnchor.click();
    dlAnchor.remove();
    showToast('💾 Đã tải về file JSON sao lưu');
  }

  // Khôi phục JSON
  function executeJsonRestore() {
    const fileInput = document.getElementById('input-restore-file');
    if (!fileInput.files || fileInput.files.length === 0) {
      alert('Vui lòng chọn file JSON để khôi phục!');
      return;
    }

    const mode = document.querySelector('input[name="restore-mode"]:checked').value;
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target.result);
        if (!Array.isArray(imported)) {
          alert('Định dạng file JSON không hợp lệ (phải là mảng danh sách từ vựng)!');
          return;
        }

        if (mode === 'overwrite') {
          savedWords = imported;
        } else {
          // Merge: thêm các từ mới chưa có
          const existingMap = new Map(savedWords.map(w => [w.word, w]));
          imported.forEach(w => {
            if (w.word && !existingMap.has(w.word)) {
              savedWords.unshift(w);
            }
          });
        }

        saveWords(() => {
          closeModal('modal-backup');
          updateAllUI();
          showToast(`✅ Đã khôi phục thành công ${imported.length} từ vựng!`);
        });
      } catch (err) {
        alert('Lỗi đọc file JSON: ' + err.message);
      }
    };
    reader.readAsText(file);
  }

  // Xuất Anki CSV với UTF-8 BOM
  function exportAnkiCSV() {
    if (savedWords.length === 0) {
      alert('Sổ tay của bạn chưa có từ nào để xuất Anki!');
      return;
    }

    const rows = [
      ['Từ tiếng Nhật', 'Cách đọc', 'Romaji', 'Âm Hán-Việt', 'Giải nghĩa', 'Từ loại', 'Trạng thái']
    ];

    savedWords.forEach(item => {
      rows.push([
        item.word || '',
        item.reading || item.word || '',
        item.romaji || '',
        item.hanviet || '',
        item.meaning || '',
        item.type || '',
        item.status === 'mastered' ? 'Đã thuộc' : 'Đang học'
      ]);
    });

    const csvContent = '\uFEFF' + rows.map(e => e.map(cell => `"${(cell || '').replace(/"/g, '""')}"`).join('\t')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `anki_jp_words_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast('📥 Đã xuất file Anki (.csv) thành công!');
  }

  function loadSampleWords() {
    const existing = new Set(savedWords.map(w => w.word));
    let added = 0;
    SAMPLE_WORDS.forEach(s => {
      if (!existing.has(s.word)) {
        savedWords.push({ ...s, savedAt: Date.now() });
        added++;
      }
    });

    saveWords(() => {
      updateAllUI();
      showToast(`⭐ Đã nạp thành công ${added} từ vựng mẫu!`);
    });
  }

  // ==========================================================================
  // HELPER: TỰ ĐỘNG CHUYỂN ROMAJI SANG HIRAGANA THỜI GIAN THỰC (IME ASSIST)
  // ==========================================================================
  function attachRomajiInputAssist(inputElem) {
    if (!inputElem) return;
    inputElem.addEventListener('input', () => {
      if (typeof romajiToHiragana !== 'function') return;
      const original = inputElem.value;
      const converted = romajiToHiragana(original);
      if (converted !== original) {
        const start = inputElem.selectionStart;
        inputElem.value = converted;
        try {
          inputElem.setSelectionRange(start, start);
        } catch (_) {}
      }
    });
  }

  // ==========================================================================
  // TAB 3: LUYỆN NGHE JLPT (聴解 - CHOUKAI)
  // ==========================================================================
  let listeningDeck = [];
  let currentListeningIdx = 0;
  let listeningCorrectCount = 0;
  let isListeningAnswered = false;

  function setupListeningControls() {
    const levelSelect = document.getElementById('listening-level-filter');
    const modeSelect = document.getElementById('listening-mode-select');
    const speedSelect = document.getElementById('listening-speed-select');
    const btnPlay = document.getElementById('btn-listening-play');
    const btnReplay = document.getElementById('btn-listening-replay');
    const btnCheckDictation = document.getElementById('btn-listening-check-dictation');
    const dictationInput = document.getElementById('listening-dictation-input');
    const btnNext = document.getElementById('btn-listening-next');

    if (levelSelect) {
      levelSelect.addEventListener('change', () => {
        buildListeningDeck();
        renderListeningQuestion();
      });
    }

    if (modeSelect) {
      modeSelect.addEventListener('change', () => {
        renderListeningQuestion();
      });
    }

    if (btnPlay) {
      btnPlay.addEventListener('click', () => {
        playCurrentListeningAudio();
      });
    }

    if (btnReplay) {
      btnReplay.addEventListener('click', () => {
        playCurrentListeningAudio();
      });
    }

    if (btnCheckDictation && dictationInput) {
      btnCheckDictation.addEventListener('click', () => {
        checkDictationAnswer();
      });
      dictationInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          checkDictationAnswer();
        }
      });
      attachRomajiInputAssist(dictationInput);
    }

    if (btnNext) {
      btnNext.addEventListener('click', () => {
        nextListeningQuestion();
      });
    }
  }

  function buildListeningDeck() {
    const level = document.getElementById('listening-level-filter') ? document.getElementById('listening-level-filter').value : 'N5';
    const allItems = (typeof JLPT_EXAM_DATA !== 'undefined' && JLPT_EXAM_DATA.listening) ? JLPT_EXAM_DATA.listening : [];

    if (level === 'notebook') {
      const words = (savedWords && savedWords.length > 0) ? savedWords : SAMPLE_WORDS;
      listeningDeck = words.map((w, idx) => {
        const otherWords = words.filter(ow => ow.word !== w.word);
        const wrongOptions = [];
        for (let i = 0; i < 3; i++) {
          if (otherWords[i]) {
            wrongOptions.push({ text: otherWords[i].meaning || otherWords[i].word, isCorrect: false });
          } else {
            wrongOptions.push({ text: `Ý nghĩa bổ sung #${i + 1}`, isCorrect: false });
          }
        }
        const options = [
          { text: w.meaning || w.word, isCorrect: true },
          ...wrongOptions
        ];
        // Xáo trộn 4 phương án
        for (let i = options.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [options[i], options[j]] = [options[j], options[i]];
        }

        return {
          id: `lis_nb_${idx}`,
          level: 'Sổ tay',
          category: w.type || 'Từ vựng đã lưu',
          title: `Nghe từ: ${w.word}`,
          situation: `Từ vựng trong Sổ tay: 「${w.word}」 (Đọc là: ${w.reading || w.word})`,
          audioText: `${w.word}。${w.reading || w.word}。`,
          questionAudio: `${w.word}`,
          question: `Hãy nghe và chọn đúng nghĩa tiếng Việt của từ: 「${w.word}」`,
          options: options,
          script: `${w.word}（${w.reading || w.word}）`,
          scriptVi: w.meaning || '',
          explanation: `Từ vựng: ${w.word} [${w.reading || ''}] - Hán-Việt: ${w.hanviet || '---'} - Nghĩa: ${w.meaning || ''}`,
          dictationAnswer: w.reading || w.word,
          dictationAccepted: [w.word, w.reading, w.romaji].filter(Boolean)
        };
      });
    } else if (level === 'all') {
      listeningDeck = [...allItems];
    } else {
      listeningDeck = allItems.filter(item => item.level === level);
    }

    currentListeningIdx = 0;
    listeningCorrectCount = 0;
    isListeningAnswered = false;
  }

  function renderListeningQuestion() {
    const total = listeningDeck.length;
    const card = document.getElementById('listening-card');
    if (!card) return;

    if (total === 0) {
      document.getElementById('listening-question-text').textContent = 'Chưa có câu hỏi nghe cho mục này.';
      document.getElementById('listening-options-grid').innerHTML = '';
      return;
    }

    if (currentListeningIdx >= total) {
      showListeningFinished();
      return;
    }

    isListeningAnswered = false;
    const q = listeningDeck[currentListeningIdx];

    document.getElementById('listening-progress-text').textContent = `Câu ${currentListeningIdx + 1} / ${total}`;
    const fillPercent = ((currentListeningIdx + 1) / total) * 100;
    document.getElementById('listening-progress-fill').style.width = `${fillPercent}%`;

    document.getElementById('listening-q-level').textContent = `JLPT ${q.level}`;
    document.getElementById('listening-q-category').textContent = q.category || 'Hội thoại';
    document.getElementById('listening-score-tag').textContent = `Đúng: ${listeningCorrectCount} / ${currentListeningIdx}`;

    document.getElementById('listening-situation-text').textContent = q.situation || 'Nghe đoạn hội thoại sau:';
    document.getElementById('listening-question-text').textContent = q.question;

    const explCard = document.getElementById('listening-explanation-card');
    explCard.style.display = 'none';

    const mode = document.getElementById('listening-mode-select') ? document.getElementById('listening-mode-select').value : 'quiz';
    const optGrid = document.getElementById('listening-options-grid');
    const dictArea = document.getElementById('listening-dictation-area');

    if (mode === 'quiz') {
      optGrid.style.display = 'grid';
      dictArea.style.display = 'none';

      optGrid.innerHTML = '';
      const letters = ['A', 'B', 'C', 'D'];
      q.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = 'listening-option-btn';
        btn.dataset.optIndex = idx;
        btn.innerHTML = `
          <span class="option-prefix">${letters[idx]} (${idx + 1})</span>
          <span class="option-text">${opt.text}</span>
        `;
        btn.addEventListener('click', () => {
          handleListeningQuizAnswer(idx);
        });
        optGrid.appendChild(btn);
      });
    } else {
      optGrid.style.display = 'none';
      dictArea.style.display = 'block';

      const input = document.getElementById('listening-dictation-input');
      input.value = '';
      input.focus();
      document.getElementById('listening-dictation-feedback').innerHTML = '';
    }

    // Tự động phát âm thanh sau 250ms
    setTimeout(() => {
      playCurrentListeningAudio();
    }, 250);
  }

  function playCurrentListeningAudio() {
    if (currentListeningIdx >= listeningDeck.length) return;
    const q = listeningDeck[currentListeningIdx];
    const textToSpeak = q.audioText || q.questionAudio || q.question;
    const speedSelect = document.getElementById('listening-speed-select');
    const speed = speedSelect ? (parseFloat(speedSelect.value) || 0.95) : 0.95;

    const playBtn = document.getElementById('btn-listening-play');
    const playText = document.getElementById('listening-play-text');
    const waves = document.getElementById('listening-audio-waves');

    if (playBtn) playBtn.classList.add('playing');
    if (waves) waves.classList.add('playing');
    if (playText) playText.textContent = 'Đang phát âm thanh...';

    if (audioEngine) {
      audioEngine.speak(
        textToSpeak,
        { rate: speed },
        () => {
          if (playBtn) playBtn.classList.add('playing');
          if (waves) waves.classList.add('playing');
        },
        () => {
          if (playBtn) playBtn.classList.remove('playing');
          if (waves) waves.classList.remove('playing');
          if (playText) playText.textContent = 'Bấm nghe lại câu thoại';
        }
      );
    } else {
      setTimeout(() => {
        if (playBtn) playBtn.classList.remove('playing');
        if (waves) waves.classList.remove('playing');
        if (playText) playText.textContent = 'Bấm nghe lại câu thoại';
      }, 1500);
    }
  }

  function handleListeningQuizAnswer(chosenIdx) {
    if (isListeningAnswered) return;
    isListeningAnswered = true;

    const q = listeningDeck[currentListeningIdx];
    const isCorrect = q.options[chosenIdx] && q.options[chosenIdx].isCorrect;

    const optButtons = document.querySelectorAll('.listening-option-btn');
    optButtons.forEach((btn, idx) => {
      btn.disabled = true;
      if (q.options[idx].isCorrect) {
        btn.classList.add('correct');
      } else if (idx === chosenIdx) {
        btn.classList.add('wrong');
      }
    });

    if (isCorrect) {
      listeningCorrectCount++;
      showToast('🎉 Chính xác! Bạn nghe rất chuẩn!');
    } else {
      showToast('❌ Chưa đúng! Hãy xem lại kịch bản hội thoại.');
    }

    document.getElementById('listening-score-tag').textContent = `Đúng: ${listeningCorrectCount} / ${currentListeningIdx + 1}`;
    revealListeningExplanation(isCorrect);
  }

  function checkDictationAnswer() {
    if (isListeningAnswered) return;
    const input = document.getElementById('listening-dictation-input');
    const rawVal = (input ? input.value : '').trim();
    if (!rawVal) {
      showToast('Vui lòng gõ câu bạn nghe được trước khi kiểm tra!');
      return;
    }

    isListeningAnswered = true;
    const q = listeningDeck[currentListeningIdx];
    const normUser = rawVal.toLowerCase().replace(/[\s、。！？,!?.〜~]/g, '');

    const acceptedList = (q.dictationAccepted || [q.dictationAnswer || '']).map(a => 
      String(a).toLowerCase().replace(/[\s、。！？,!?.〜~]/g, '')
    );

    const isMatch = acceptedList.some(acc => {
      return normUser === acc || normUser.includes(acc) || acc.includes(normUser);
    });

    const feedback = document.getElementById('listening-dictation-feedback');
    if (isMatch) {
      listeningCorrectCount++;
      feedback.innerHTML = `<span class="text-green font-bold">✅ Hoàn toàn chính xác!</span> Bạn đã nghe và viết đúng: <strong>${q.dictationAnswer}</strong>`;
      showToast('🎉 Nghe chép chính tả chuẩn xác!');
    } else {
      feedback.innerHTML = `<span class="text-red font-bold">❌ Chưa chính xác!</span> Đáp án chuẩn: <strong>${q.dictationAnswer}</strong>`;
      showToast('❌ Xem lại câu thoại chuẩn!');
    }

    document.getElementById('listening-score-tag').textContent = `Đúng: ${listeningCorrectCount} / ${currentListeningIdx + 1}`;
    revealListeningExplanation(isMatch);
  }

  function revealListeningExplanation(isCorrect) {
    const q = listeningDeck[currentListeningIdx];
    const card = document.getElementById('listening-explanation-card');
    const status = document.getElementById('listening-result-status');
    const scriptEl = document.getElementById('listening-script-text');
    const transEl = document.getElementById('listening-translation-text');
    const explEl = document.getElementById('listening-explanation-text');

    card.style.display = 'block';

    if (isCorrect) {
      status.className = 'explanation-status correct';
      status.textContent = '🎉 CHÍNH XÁC (正解)';
    } else {
      status.className = 'explanation-status wrong';
      status.textContent = '❌ CHƯA ĐÚNG (不正解)';
    }

    scriptEl.textContent = q.script || q.audioText;
    transEl.textContent = q.scriptVi || '---';
    explEl.textContent = q.explanation || 'Không có giải thích thêm.';

    card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }

  function nextListeningQuestion() {
    currentListeningIdx++;
    renderListeningQuestion();
  }

  function showListeningFinished() {
    const optGrid = document.getElementById('listening-options-grid');
    const dictArea = document.getElementById('listening-dictation-area');
    const explCard = document.getElementById('listening-explanation-card');
    if (optGrid) optGrid.style.display = 'none';
    if (dictArea) dictArea.style.display = 'none';
    if (explCard) explCard.style.display = 'none';

    document.getElementById('listening-question-text').textContent = 
      `🎉 Bạn đã hoàn thành phiên luyện nghe với ${listeningCorrectCount} / ${listeningDeck.length} câu đúng!`;

    const existingBtn = document.getElementById('btn-listening-restart-session');
    if (!existingBtn) {
      const restartBtn = document.createElement('button');
      restartBtn.id = 'btn-listening-restart-session';
      restartBtn.className = 'btn btn-primary';
      restartBtn.style.margin = '20px auto';
      restartBtn.style.display = 'block';
      restartBtn.textContent = 'Luyện nghe lại từ đầu 🔄';
      restartBtn.addEventListener('click', () => {
        restartBtn.remove();
        buildListeningDeck();
        renderListeningQuestion();
      });
      document.getElementById('listening-card').appendChild(restartBtn);
    }
  }

  // ==========================================================================
  // TAB 4A: LUYỆN VIẾT CHỮ HÁN & TỪ VỰNG (WRITING PRACTICE)
  // ==========================================================================
  let writingDeck = [];
  let currentWritingIdx = 0;
  let writingCorrectCount = 0;
  let isWritingAnswered = false;

  // TAB 4B: THI THỬ JLPT (MOCK EXAM)
  let activeExam = null;
  let currentExamQIdx = 0;
  let examUserAnswers = [];
  let examTimerInterval = null;
  let examSecondsLeft = 0;
  let examTotalSeconds = 0;

  function setupWritingExamControls() {
    // Sub-tab navigation
    const subtabs = document.querySelectorAll('.sub-tab');
    subtabs.forEach(st => {
      st.addEventListener('click', () => {
        const mode = st.dataset.subtab;
        switchSubTab(mode);
      });
    });

    // 4A. Writing Controls
    const writingLevel = document.getElementById('writing-level-filter');
    const btnWritingSubmit = document.getElementById('btn-writing-submit');
    const writingInput = document.getElementById('writing-input');
    const btnToggleHint = document.getElementById('btn-toggle-writing-hint');
    const btnWritingNext = document.getElementById('btn-writing-next');
    const btnWritingAudio = document.getElementById('btn-writing-audio');

    if (writingLevel) {
      writingLevel.addEventListener('change', () => {
        buildWritingDeck();
        renderWritingQuestion();
      });
    }

    if (writingInput) {
      attachRomajiInputAssist(writingInput);
      writingInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          if (isWritingAnswered) {
            nextWritingQuestion();
          } else {
            submitWritingAnswer();
          }
        }
      });
    }

    if (btnWritingSubmit) {
      btnWritingSubmit.addEventListener('click', submitWritingAnswer);
    }

    if (btnWritingNext) {
      btnWritingNext.addEventListener('click', nextWritingQuestion);
    }

    if (btnToggleHint) {
      btnToggleHint.addEventListener('click', () => {
        const hintText = document.getElementById('writing-hint-text');
        if (hintText.style.display === 'inline' || hintText.style.display === '') {
          hintText.style.display = 'none';
          btnToggleHint.textContent = 'Hiện gợi ý';
        } else {
          hintText.style.display = 'inline';
          btnToggleHint.textContent = 'Ẩn gợi ý';
        }
      });
    }

    if (btnWritingAudio) {
      btnWritingAudio.addEventListener('click', () => {
        if (currentWritingIdx >= writingDeck.length) return;
        const q = writingDeck[currentWritingIdx];
        if (audioEngine) {
          audioEngine.speak(q.answers[0] || q.kana || q.meaning);
        }
      });
    }

    // 4B. Exam Lobby buttons
    const startBtns = document.querySelectorAll('.btn-start-exam');
    startBtns.forEach(b => {
      b.addEventListener('click', () => {
        const level = b.dataset.examLevel;
        startMockExam(level);
      });
    });

    // Exam Active Screen controls
    const btnExamSubmit = document.getElementById('btn-exam-submit');
    const btnExamPrev = document.getElementById('btn-exam-prev');
    const btnExamNext = document.getElementById('btn-exam-next');
    const btnExamAudio = document.getElementById('btn-exam-audio-sentence');

    if (btnExamSubmit) {
      btnExamSubmit.addEventListener('click', () => {
        const unanswered = examUserAnswers.filter(a => a === null).length;
        if (unanswered > 0) {
          if (!confirm(`Bạn còn ${unanswered} câu chưa trả lời. Bạn có chắc chắn muốn nộp bài thi ngay không?`)) {
            return;
          }
        }
        submitMockExam();
      });
    }

    if (btnExamPrev) {
      btnExamPrev.addEventListener('click', () => {
        if (currentExamQIdx > 0) {
          currentExamQIdx--;
          renderExamQuestion();
        }
      });
    }

    if (btnExamNext) {
      btnExamNext.addEventListener('click', () => {
        if (activeExam && currentExamQIdx < activeExam.questions.length - 1) {
          currentExamQIdx++;
          renderExamQuestion();
        }
      });
    }

    if (btnExamAudio) {
      btnExamAudio.addEventListener('click', () => {
        if (!activeExam) return;
        const q = activeExam.questions[currentExamQIdx];
        const cleanSentence = q.sentence.replace(/<[^>]*>/g, '');
        if (audioEngine) audioEngine.speak(cleanSentence);
      });
    }

    // Exam Report buttons
    const btnRetry = document.getElementById('btn-exam-retry');
    const btnBackLobby = document.getElementById('btn-exam-back-lobby');
    if (btnRetry) {
      btnRetry.addEventListener('click', () => {
        if (activeExam) startMockExam(activeExam.level);
      });
    }
    if (btnBackLobby) {
      btnBackLobby.addEventListener('click', showExamLobby);
    }
  }

  function switchSubTab(mode) {
    const subtabs = document.querySelectorAll('.sub-tab');
    const subpanels = document.querySelectorAll('.sub-panel');
    subtabs.forEach(st => st.classList.toggle('active', st.dataset.subtab === mode));
    subpanels.forEach(sp => sp.classList.toggle('active', sp.id === `subpane-${mode}`));

    if (mode === 'writing') {
      buildWritingDeck();
      renderWritingQuestion();
    } else if (mode === 'exam') {
      showExamLobby();
    }
  }

  function buildWritingDeck() {
    const level = document.getElementById('writing-level-filter') ? document.getElementById('writing-level-filter').value : 'N5';
    const allWriting = (typeof JLPT_EXAM_DATA !== 'undefined' && JLPT_EXAM_DATA.writing) ? JLPT_EXAM_DATA.writing : [];

    if (level === 'notebook') {
      const words = (savedWords && savedWords.length > 0) ? savedWords : SAMPLE_WORDS;
      writingDeck = words.map((w, idx) => ({
        id: `wri_nb_${idx}`,
        level: 'Sổ tay',
        type: 'notebook',
        prompt: `Viết từ tiếng Nhật mang nghĩa: "${w.meaning}"`,
        hint: `Cách đọc: ${w.reading || w.word} ${w.hanviet ? `(Hán-Việt: ${w.hanviet})` : ''}`,
        kana: w.reading || w.word,
        romaji: w.romaji || (typeof toRomaji === 'function' ? toRomaji(w.reading || w.word) : ''),
        answers: [w.word, w.reading, w.romaji].filter(Boolean),
        meaning: w.meaning,
        sampleSentence: `「${w.word}」 - ${w.meaning}`
      }));
    } else if (level === 'all') {
      writingDeck = [...allWriting];
    } else {
      writingDeck = allWriting.filter(item => item.level === level);
    }

    currentWritingIdx = 0;
    writingCorrectCount = 0;
    isWritingAnswered = false;
  }

  function renderWritingQuestion() {
    const total = writingDeck.length;
    const card = document.getElementById('writing-card');
    if (!card) return;

    if (total === 0) {
      document.getElementById('writing-prompt-text').textContent = 'Chưa có bài tập viết cho mục này.';
      document.getElementById('writing-feedback-card').style.display = 'none';
      return;
    }

    if (currentWritingIdx >= total) {
      showWritingFinished();
      return;
    }

    isWritingAnswered = false;
    const q = writingDeck[currentWritingIdx];

    document.getElementById('writing-progress-text').textContent = `Bài ${currentWritingIdx + 1} / ${total}`;
    const fillPercent = ((currentWritingIdx + 1) / total) * 100;
    document.getElementById('writing-progress-fill').style.width = `${fillPercent}%`;

    document.getElementById('writing-q-level').textContent = `JLPT ${q.level}`;
    document.getElementById('writing-score-tag').textContent = `Đúng: ${writingCorrectCount} / ${currentWritingIdx}`;

    document.getElementById('writing-prompt-text').textContent = q.prompt;
    document.getElementById('writing-hint-text').textContent = q.hint || 'Không có gợi ý';
    document.getElementById('writing-hint-text').style.display = 'none';
    document.getElementById('btn-toggle-writing-hint').textContent = 'Hiện gợi ý';

    const input = document.getElementById('writing-input');
    input.value = '';
    input.disabled = false;
    input.focus();

    document.getElementById('writing-feedback-card').style.display = 'none';
  }

  function submitWritingAnswer() {
    if (isWritingAnswered) return;
    const input = document.getElementById('writing-input');
    const rawVal = (input ? input.value : '').trim();
    if (!rawVal) {
      showToast('Vui lòng gõ câu trả lời trước khi kiểm tra!');
      return;
    }

    isWritingAnswered = true;
    input.disabled = true;

    const q = writingDeck[currentWritingIdx];
    const normUser = rawVal.toLowerCase().replace(/[\s、。！？,!?.〜~]/g, '');

    const acceptedList = (q.answers || []).map(a => 
      String(a).toLowerCase().replace(/[\s、。！？,!?.〜~]/g, '')
    );
    if (q.kana) acceptedList.push(q.kana.toLowerCase().replace(/[\s、。！？,!?.〜~]/g, ''));
    if (q.romaji) acceptedList.push(q.romaji.toLowerCase().replace(/[\s、。！？,!?.〜~]/g, ''));

    const isMatch = acceptedList.includes(normUser);

    if (isMatch) {
      writingCorrectCount++;
      showToast('🎉 Xuất sắc! Bạn viết hoàn toàn chính xác!');
    } else {
      showToast('❌ Chưa đúng! Hãy xem đáp án mẫu bên dưới.');
    }

    document.getElementById('writing-score-tag').textContent = `Đúng: ${writingCorrectCount} / ${currentWritingIdx + 1}`;

    const feedbackCard = document.getElementById('writing-feedback-card');
    const badge = document.getElementById('writing-result-badge');
    const correctWord = document.getElementById('writing-correct-word');
    const kanaVal = document.getElementById('writing-kana-val');
    const sampleSent = document.getElementById('writing-sample-sentence');

    feedbackCard.style.display = 'block';

    if (isMatch) {
      badge.className = 'writing-result-badge correct';
      badge.textContent = '🎉 CHÍNH XÁC (正解)';
    } else {
      badge.className = 'writing-result-badge wrong';
      badge.textContent = `❌ CHƯA ĐÚNG - BẠN ĐÃ GÕ: 「${rawVal}」`;
    }

    correctWord.textContent = q.answers[0] || q.kana;
    kanaVal.textContent = q.kana || '---';
    if (q.sampleSentence) {
      document.getElementById('writing-sentence-row').style.display = 'flex';
      sampleSent.textContent = q.sampleSentence;
    } else {
      document.getElementById('writing-sentence-row').style.display = 'none';
    }

    if (audioEngine) {
      audioEngine.speak(q.answers[0] || q.kana);
    }
  }

  function nextWritingQuestion() {
    currentWritingIdx++;
    renderWritingQuestion();
  }

  function showWritingFinished() {
    document.getElementById('writing-prompt-text').textContent = 
      `🎉 Bạn đã hoàn thành phiên luyện viết với ${writingCorrectCount} / ${writingDeck.length} câu đúng!`;
    document.getElementById('writing-feedback-card').style.display = 'none';
    document.getElementById('writing-input').disabled = true;
  }

  // ==========================================================================
  // TAB 4B: THI THỬ JLPT THỰC CHIẾN (MOCK EXAM CONTROLLER)
  // ==========================================================================
  function showExamLobby() {
    clearInterval(examTimerInterval);
    document.getElementById('exam-lobby').style.display = 'block';
    document.getElementById('exam-active-screen').style.display = 'none';
    document.getElementById('exam-report-screen').style.display = 'none';
  }

  function startMockExam(level) {
    const allExams = (typeof JLPT_EXAM_DATA !== 'undefined' && JLPT_EXAM_DATA.mockExams) ? JLPT_EXAM_DATA.mockExams : [];
    const found = allExams.find(e => e.level === level) || allExams[0];
    if (!found) {
      showToast('Không tìm thấy đề thi cho cấp độ này!');
      return;
    }

    activeExam = JSON.parse(JSON.stringify(found));
    currentExamQIdx = 0;
    examUserAnswers = new Array(activeExam.questions.length).fill(null);
    examTotalSeconds = (activeExam.timeLimitMinutes || 15) * 60;
    examSecondsLeft = examTotalSeconds;

    document.getElementById('exam-lobby').style.display = 'none';
    document.getElementById('exam-report-screen').style.display = 'none';
    document.getElementById('exam-active-screen').style.display = 'block';

    document.getElementById('exam-live-title').textContent = activeExam.title;

    buildExamDots();
    renderExamQuestion();
    startExamTimer();
  }

  function startExamTimer() {
    clearInterval(examTimerInterval);
    updateTimerDisplay();

    examTimerInterval = setInterval(() => {
      examSecondsLeft--;
      updateTimerDisplay();

      if (examSecondsLeft <= 0) {
        clearInterval(examTimerInterval);
        showToast('⏰ Hết giờ làm bài! Hệ thống tự động nộp bài.');
        submitMockExam();
      }
    }, 1000);
  }

  function updateTimerDisplay() {
    const mins = Math.floor(examSecondsLeft / 60);
    const secs = examSecondsLeft % 60;
    const str = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    const display = document.getElementById('exam-timer-display');
    const box = document.getElementById('exam-timer-box');
    if (display) display.textContent = str;
    if (box) {
      if (examSecondsLeft < 120) {
        box.classList.add('urgent');
      } else {
        box.classList.remove('urgent');
      }
    }
  }

  function buildExamDots() {
    const container = document.getElementById('exam-dots-navigator');
    if (!container || !activeExam) return;
    container.innerHTML = '';

    activeExam.questions.forEach((_, idx) => {
      const dot = document.createElement('button');
      dot.className = 'exam-nav-dot';
      dot.dataset.qIdx = idx;
      dot.textContent = idx + 1;
      dot.addEventListener('click', () => {
        currentExamQIdx = idx;
        renderExamQuestion();
      });
      container.appendChild(dot);
    });
  }

  function updateExamDots() {
    const dots = document.querySelectorAll('.exam-nav-dot');
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentExamQIdx);
      dot.classList.toggle('answered', examUserAnswers[idx] !== null);
    });
  }

  function renderExamQuestion() {
    if (!activeExam || currentExamQIdx >= activeExam.questions.length) return;
    const q = activeExam.questions[currentExamQIdx];

    document.getElementById('exam-live-qindex').textContent = `Câu ${currentExamQIdx + 1} / ${activeExam.questions.length}`;
    document.getElementById('exam-mondai-title').textContent = q.mondai || 'Mondai';
    document.getElementById('exam-prompt-instruction').textContent = q.prompt || '';
    document.getElementById('exam-sentence-text').innerHTML = q.sentence || '';

    const list = document.getElementById('exam-options-list');
    list.innerHTML = '';
    q.options.forEach((optText, optIdx) => {
      const btn = document.createElement('button');
      btn.className = 'exam-option-item';
      if (examUserAnswers[currentExamQIdx] === optIdx) {
        btn.classList.add('selected');
      }
      btn.innerHTML = `
        <span class="exam-option-num">${optIdx + 1}</span>
        <span class="exam-option-label">${optText}</span>
      `;
      btn.addEventListener('click', () => {
        examUserAnswers[currentExamQIdx] = optIdx;
        renderExamQuestion();
      });
      list.appendChild(btn);
    });

    const btnPrev = document.getElementById('btn-exam-prev');
    const btnNext = document.getElementById('btn-exam-next');
    if (btnPrev) btnPrev.disabled = (currentExamQIdx === 0);
    if (btnNext) btnNext.disabled = (currentExamQIdx === activeExam.questions.length - 1);

    updateExamDots();
  }

  function submitMockExam() {
    clearInterval(examTimerInterval);
    if (!activeExam) return;

    let correctCount = 0;
    activeExam.questions.forEach((q, idx) => {
      if (examUserAnswers[idx] === q.correct) {
        correctCount++;
      }
    });

    const totalQ = activeExam.questions.length;
    const timeSpentSeconds = examTotalSeconds - Math.max(0, examSecondsLeft);
    const spentMins = Math.floor(timeSpentSeconds / 60);
    const spentSecs = timeSpentSeconds % 60;
    const timeSpentStr = `${String(spentMins).padStart(2, '0')}:${String(spentSecs).padStart(2, '0')}`;

    const jlptScaledScore = Math.round((correctCount / totalQ) * 180);
    const percentage = Math.round((correctCount / totalQ) * 100);
    const isPassed = percentage >= (activeExam.passScore || 60);

    document.getElementById('exam-active-screen').style.display = 'none';
    document.getElementById('exam-report-screen').style.display = 'block';

    const banner = document.getElementById('report-banner');
    const icon = document.getElementById('report-icon');
    const verdict = document.getElementById('report-verdict');
    const subtitle = document.getElementById('report-subtitle');

    if (isPassed) {
      banner.className = 'report-header-banner pass';
      icon.textContent = '🎉';
      verdict.textContent = `XUẤT SẮC - ĐÃ ĐỖ (合格) [${percentage}%]`;
      subtitle.textContent = `Chúc mừng bạn! Bạn đã vượt qua bài thi thử ${activeExam.title} một cách thuyết phục.`;
    } else {
      banner.className = 'report-header-banner fail';
      icon.textContent = '💪';
      verdict.textContent = `CHƯA ĐẠT (不合格) - CẦN CỐ GẮNG [${percentage}%]`;
      subtitle.textContent = `Bạn cần đạt tối thiểu ${activeExam.passScore}% để vượt qua kỳ thi. Hãy ôn tập lại các lỗi sai dưới đây!`;
    }

    document.getElementById('report-score-points').textContent = `${jlptScaledScore} / 180`;
    document.getElementById('report-correct-count').textContent = `${correctCount} / ${totalQ} câu`;
    document.getElementById('report-time-spent').textContent = timeSpentStr;

    const reviewList = document.getElementById('report-questions-review');
    reviewList.innerHTML = '';

    activeExam.questions.forEach((q, idx) => {
      const userChoice = examUserAnswers[idx];
      const isCorrect = userChoice === q.correct;
      const card = document.createElement('div');
      card.className = `review-item-card ${isCorrect ? 'correct' : 'wrong'}`;

      const userChoiceText = userChoice !== null ? q.options[userChoice] : '(Chưa chọn)';
      const correctChoiceText = q.options[q.correct];

      card.innerHTML = `
        <div class="review-item-header">
          <span class="review-qnum">Câu ${idx + 1}: ${q.mondai}</span>
          <span class="review-badge ${isCorrect ? 'correct' : 'wrong'}">${isCorrect ? '✅ ĐÚNG' : '❌ SAI'}</span>
        </div>
        <div class="review-sentence">${q.sentence}</div>
        <div class="review-answers-grid">
          <div><strong>Lựa chọn của bạn:</strong> <span class="${isCorrect ? 'text-green' : 'text-red'}">${userChoiceText}</span></div>
          <div><strong>Đáp án chuẩn:</strong> <span class="text-green font-bold">${correctChoiceText}</span></div>
        </div>
        <div class="review-explanation">
          💡 <strong>Phân tích:</strong> ${q.explanation || 'Không có giải thích chi tiết.'}
        </div>
      `;
      reviewList.appendChild(card);
    });

    document.getElementById('exam-report-screen').scrollIntoView({ behavior: 'smooth' });
  }

  // ==========================================================================
  // GLOBAL KEYBOARD SHORTCUTS
  // ==========================================================================
  function setupGlobalShortcuts() {
    window.addEventListener('keydown', (e) => {
      const tag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
      if (tag === 'input' || tag === 'textarea' || tag === 'select') return;

      const studyTab = document.getElementById('tab-study');
      const listeningTab = document.getElementById('tab-listening');
      const writingTab = document.getElementById('tab-writing-exam');

      // 1. Phím tắt trong Tab Study
      if (studyTab && studyTab.classList.contains('active')) {
        if (e.key === ' ' || e.code === 'Space') {
          e.preventDefault();
          toggleCardFlip();
        } else if (e.key === '1' || e.key === 'ArrowLeft') {
          e.preventDefault();
          markAnswerSRS(1);
        } else if (e.key === '2') {
          e.preventDefault();
          markAnswerSRS(2);
        } else if (e.key === '3') {
          e.preventDefault();
          markAnswerSRS(3);
        } else if (e.key === '4' || e.key === 'ArrowRight') {
          e.preventDefault();
          markAnswerSRS(4);
        } else if (e.key === 's' || e.key === 'S') {
          e.preventDefault();
          playCurrentWordAudio();
        } else if (e.key === 'r' || e.key === 'R') {
          e.preventDefault();
          shuffleDeck();
          showToast('🔀 Đã xáo trộn thứ tự thẻ!');
        }
      }

      // 2. Phím tắt trong Tab Luyện nghe
      else if (listeningTab && listeningTab.classList.contains('active')) {
        if (e.key === ' ' || e.code === 'Space' || e.key === 's' || e.key === 'S') {
          e.preventDefault();
          playCurrentListeningAudio();
        } else if (['1', '2', '3', '4'].includes(e.key)) {
          const optIdx = parseInt(e.key) - 1;
          handleListeningQuizAnswer(optIdx);
        } else if (e.key === 'Enter') {
          const explCard = document.getElementById('listening-explanation-card');
          if (explCard && explCard.style.display !== 'none') {
            e.preventDefault();
            nextListeningQuestion();
          }
        }
      }

      // 3. Phím tắt trong Tab Thi thử JLPT
      else if (writingTab && writingTab.classList.contains('active')) {
        const examActive = document.getElementById('exam-active-screen');
        if (examActive && examActive.style.display !== 'none') {
          if (['1', '2', '3', '4'].includes(e.key)) {
            const optIdx = parseInt(e.key) - 1;
            examUserAnswers[currentExamQIdx] = optIdx;
            renderExamQuestion();
          } else if (e.key === 'ArrowLeft') {
            if (currentExamQIdx > 0) {
              currentExamQIdx--;
              renderExamQuestion();
            }
          } else if (e.key === 'ArrowRight') {
            if (activeExam && currentExamQIdx < activeExam.questions.length - 1) {
              currentExamQIdx++;
              renderExamQuestion();
            }
          }
        }
      }
    });
  }

  // Toast
  let toastTimer = null;
  function showToast(msg) {
    const toast = document.getElementById('app-toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.classList.add('active');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('active');
    }, 2200);
  }

})();
