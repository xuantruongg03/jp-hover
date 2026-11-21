/**
 * ZYNO Nihon v2.0.0
 * Part of the ZYNO Digital Product Ecosystem (https://zyno.top)
 * Centralized Settings, Constants, Storage Keys & Configuration
 */

(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory();
    } else {
        const exp = factory();
        root.ZynoNihonConstants = exp;
        root.JPConstants = exp;
        root.JP_STORAGE_KEYS = exp.STORAGE_KEYS;
        root.JP_DEFAULT_SETTINGS = exp.DEFAULT_SETTINGS;
        root.JP_CONFIG = exp.CONFIG;
        root.OFFICIAL_DOMAINS = exp.OFFICIAL_DOMAINS;
        root.isOfficialDomain = exp.isOfficialDomain;
    }
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
    const OFFICIAL_DOMAINS = [
        'zyno.top'
    ];

    function isOfficialDomain(urlOrHost) {
        if (!urlOrHost) return false;
        try {
            let host = urlOrHost;
            if (host.includes('://')) {
                host = new URL(host).hostname;
            } else {
                host = host.split('/')[0].split(':')[0];
            }
            host = host.toLowerCase().replace(/^www\./i, '');
            return OFFICIAL_DOMAINS.some(d => host === d || host.endsWith('.' + d));
        } catch (e) {
            return false;
        }
    }

    const STORAGE_KEYS = {
        SETTINGS: 'jpSettings',
        FLASHCARDS: 'jpFlashcards',
        DECKS: 'jpDecks',
        STUDY_STATS: 'jpStudyStats',
        HISTORY: 'jpHistory'
    };

    const CONFIG = {
        APP_NAME: 'ZYNO Nihon',
        APP_VERSION: '2.0.0',
        ECOSYSTEM_URL: 'https://zyno.top/products/zyno-nihon',
        DEFAULT_ANKI_HOST: 'http://127.0.0.1:8765',
        DEFAULT_ANKI_DECK: 'JP Hover Notebook',
        DEFAULT_ANKI_MODEL: 'Basic',
        DEFAULT_SPEECH_RATE: 0.95,
        DEFAULT_SPEECH_PITCH: 1.0,
        DEFAULT_AI_PROVIDER: 'gemini',
        DEFAULT_AI_MODEL: 'gemini-flash-latest',
        DEFAULT_DECKS: ['Mặc định', 'Từ vựng JLPT', 'IT & Công nghệ', 'Đời sống & Manga']
    };

    const DEFAULT_SETTINGS = {
        enabled: true,
        allowQuickSearchWhenDisabled: true,
        activationMode: 'always', // 'always' | 'shift' | 'alt'
        showReading: true,
        showRomaji: true,
        showHanViet: true,
        showMeaning: true,
        showKanjiBreakdown: true,
        showPitchAccent: true,
        enableVisualHighlight: true,
        enableSelectionTranslate: true,
        enableOnlineFallback: true,
        autoPlayAudio: false,
        speechRate: CONFIG.DEFAULT_SPEECH_RATE,
        speechPitch: CONFIG.DEFAULT_SPEECH_PITCH,
        voiceUri: '',
        translationEngine: 'google',
        geminiApiKey: '',

        // === AI Engine ===
        aiProvider: CONFIG.DEFAULT_AI_PROVIDER,
        aiApiKey: '',
        aiModel: CONFIG.DEFAULT_AI_MODEL,
        aiCustomEndpoint: '',
        aiEnableSentenceTranslate: true,
        aiEnableGrammarAnalysis: true,
        aiEnableWordExplain: true,

        // === AnkiConnect Settings ===
        ankiEnabled: true,
        ankiHost: CONFIG.DEFAULT_ANKI_HOST,
        ankiDeckName: CONFIG.DEFAULT_ANKI_DECK,
        ankiModelName: CONFIG.DEFAULT_ANKI_MODEL,

        // === Video Subtitle Hover Settings ===
        enableSubtitleHover: true,
        autoPauseVideoOnHover: false,

        // === Feedback / Báo lỗi ===
        feedbackWebhookUrl: '',

        // === SRS & Decks ===
        activeDeck: 'Mặc định',
        decks: [...CONFIG.DEFAULT_DECKS]
    };

    return {
        OFFICIAL_DOMAINS,
        isOfficialDomain,
        STORAGE_KEYS,
        CONFIG,
        DEFAULT_SETTINGS
    };
});
