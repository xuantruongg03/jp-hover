// ==========================================================================
// JP Furigana Flashcards & Sổ tay Từ vựng - Quản lý Học tập & Tra cứu
// ==========================================================================

(function () {
  'use strict';

  // Khởi tạo Engine tiếng Nhật
  const engine = (typeof JapaneseEngine !== 'undefined') ? new JapaneseEngine() : null;

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
      setupModals();
      setupGlobalShortcuts();
      updateAllUI();
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
    const panels = document.querySelectorAll('.tab-panel');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        panels.forEach(p => p.classList.remove('active'));

        tab.classList.add('active');
        const targetId = tab.dataset.tab;
        const panel = document.getElementById(targetId);
        if (panel) panel.classList.add('active');

        if (targetId === 'tab-study') {
          buildStudyDeck();
          renderStudyCard();
        } else if (targetId === 'tab-manager') {
          renderManagerList();
        }
      });
    });
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
    const btnWrong = document.getElementById('btn-answer-wrong');
    const btnCorrect = document.getElementById('btn-answer-correct');

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
      if (e.target.closest('.card-icon-btn')) return;
      toggleCardFlip();
    });

    btnFlip.addEventListener('click', () => {
      toggleCardFlip();
    });

    // Đánh giá chưa nhớ
    btnWrong.addEventListener('click', () => {
      markAnswer(false);
    });

    // Đánh giá đã nhớ
    btnCorrect.addEventListener('click', () => {
      markAnswer(true);
    });

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
    if (filter === 'learning') {
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

  function markAnswer(isMastered) {
    if (currentCardIndex >= currentDeck.length) return;

    const currentItem = currentDeck[currentCardIndex];
    const newStatus = isMastered ? 'mastered' : 'learning';

    // Cập nhật vào danh sách tổng
    const idx = savedWords.findIndex(w => w.word === currentItem.word);
    if (idx !== -1) {
      savedWords[idx].status = newStatus;
      savedWords[idx].lastReviewedAt = Date.now();
    }
    currentItem.status = newStatus;

    saveWords(() => {
      currentCardIndex++;
      renderStudyCard();
    });
  }

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

    if (engine) {
      engine.speak(
        textToSpeak,
        0.95,
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
        return inWord || inReading || inRomaji || inHanviet || inMeaning;
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
  // GLOBAL KEYBOARD SHORTCUTS
  // ==========================================================================
  function setupGlobalShortcuts() {
    window.addEventListener('keydown', (e) => {
      // Bỏ qua nếu đang gõ trong input/textarea
      const tag = document.activeElement ? document.activeElement.tagName.toLowerCase() : '';
      if (tag === 'input' || tag === 'textarea' || tag === 'select') return;

      const studyTab = document.getElementById('tab-study');
      if (!studyTab || !studyTab.classList.contains('active')) return;

      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        toggleCardFlip();
      } else if (e.key === '1' || e.key === 'ArrowLeft') {
        e.preventDefault();
        markAnswer(false);
      } else if (e.key === '2' || e.key === 'ArrowRight') {
        e.preventDefault();
        markAnswer(true);
      } else if (e.key === 's' || e.key === 'S') {
        e.preventDefault();
        playCurrentWordAudio();
      } else if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        shuffleDeck();
        showToast('🔀 Đã xáo trộn thứ tự thẻ!');
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
