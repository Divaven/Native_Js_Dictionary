import model from './model.js';
import view from './view.js';
import watchState from '../watch/watchers.js';

const controller = (() => {

    async function handleTranslate() {
        const word = view.wordInputEl.value.trim();
        if (!word) {
            view.renderError('Введите слово для перевода!');
            view.setAddButtonState(false);
            return;
        }
        view.clearTranslation();

        try {
            const translation = await model.fetchTranslation(word);

            model.state.currentWord = word;
            model.state.currentTranslation = translation;

            view.setAddButtonState(true);
        } catch (err) {
            view.renderError(err.message);
            view.setAddButtonState(false);
        }
    }

    function handleAdd() {
        const { currentWord, currentTranslation } = model.state;
        if (!currentWord || !currentTranslation) return;

        model.addWord(currentWord, currentTranslation);

        model.state.currentWord = '';
        model.state.currentTranslation = '';
        view.wordInputEl.value = '';
        view.setAddButtonState(false);
        view.clearTranslation();
    }

    function handleRemove(e) {
        if (!e.target.classList.contains('remove-btn')) return;
        const wordToRemove = e.target.getAttribute('data-word');
        model.removeWord(wordToRemove);
    }

    function initEventListeners() {
        view.translateBtnEl.addEventListener('click', handleTranslate);
        view.addToDictionaryBtnEl.addEventListener('click', handleAdd);
        view.wordInputEl.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                handleTranslate();
            }
        });
        view.dictionaryListEl.addEventListener('click', handleRemove);
    }

    function init() {
        model.init();
        watchState();
        view.renderDictionaryList(model.state.dictionary);
        initEventListeners();
    }

    return { init };
})();

document.addEventListener('DOMContentLoaded', () => {
    controller.init();
});
