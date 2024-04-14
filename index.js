"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// Import stylesheets
require("./style.css");
const form = document.querySelector('#defineform');
form.onsubmit = (event) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    event.preventDefault();
    console.timeLog("Form submitted")
    const formData = new FormData(form);
    const word = formData.get('defineword');
    console.log("Word to define:", word);
    try {
        const response = yield fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        console.log("API response:", response);
        if (!response.ok) {
            console.error("API call failed with status:", response.status);
            return;
        }
        const data = yield response.json();
        console.log("API data:", data);

        const definition = ((_c = (_b = (_a = data[0]) === null || _a === void 0 ? void 0 : _a.meanings[0]) === null || _b === void 0 ? void 0 : _b.definitions[0]) === null || _c === void 0 ? void 0 : _c.definition) || 'Definition not found.';
        const definitionElement = document.getElementById('definition');
        if (definitionElement) {
            definitionElement.innerText = definition;
            console.log("Definition set:", definition);

        }
        else {
            console.error('Element with id "definition" not found');
        }
    }
    catch (error) {
        console.error('Error fetching data:', error);
    }
});
