import WatchJS from './melanke-watchjs.js';
import model from '../js/model.js';
import view from '../js/view.js';

const { watch } = WatchJS;

function watchState() {
    watch(model.state, 'dictionary', () => {
        localStorage.setItem('dictionary', JSON.stringify(model.state.dictionary));
        view.renderDictionaryList(model.state.dictionary);
    });

    watch(model.state, 'currentWord', () => {
        console.log('currentWord изменился на:', model.state.currentWord);
    });

    watch(model.state, 'currentTranslation', () => {
        view.renderTranslation(model.state.currentTranslation);
    });
}

export default watchState;
