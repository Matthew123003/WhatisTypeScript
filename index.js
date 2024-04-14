// Import stylesheets
// import './style.css';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const form = document.getElementById('defineform');
// const form = document.querySelector('#defineform') as HTMLFormElement;
form.onsubmit = (event) => __awaiter(this, void 0, void 0, function* () {
    var _a, _b, _c;
    event.preventDefault();
    const formData = new FormData(form);
    const word = formData.get('defineword');
    try {
        const response = yield fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const data = yield response.json();
        const definition = ((_c = (_b = (_a = data[0]) === null || _a === void 0 ? void 0 : _a.meanings[0]) === null || _b === void 0 ? void 0 : _b.definitions[0]) === null || _c === void 0 ? void 0 : _c.definition) || 'Definition not found.';
        const definitionElement = document.getElementById('definition');
        if (definitionElement) {
            definitionElement.innerText = definition;
        }
        else {
            console.error('Element with id "definition" not found');
        }
    }
    catch (error) {
        console.error('Error fetching data:', error);
    }
});
