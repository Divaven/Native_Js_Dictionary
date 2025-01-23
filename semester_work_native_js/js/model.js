const model = {
    state: {
        dictionary: [],
        currentWord: '',
        currentTranslation: ''
    },

    init() {
        try {
            const stored = localStorage.getItem('dictionary');
            if (stored) {
                this.state.dictionary = JSON.parse(stored);
            }
        } catch (err) {
            console.warn('Ошибка чтения localStorage:', err);
            this.state.dictionary = [];
        }
    },

    async fetchTranslation(word) {
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Не удалось получить перевод. Проверьте слово.');
        }
        const data = await response.json();
        const definition = data[0]?.meanings[0]?.definitions[0]?.definition || 'Нет перевода';
        return definition;
    },

    addWord(word, translation) {
        const exists = this.state.dictionary.some(item => item.word === word);
        if (!exists) {
            this.state.dictionary.push({ word, translation });
        }
    },

    removeWord(word) {
        this.state.dictionary = this.state.dictionary.filter(item => item.word !== word);
    }
};

export default model;
