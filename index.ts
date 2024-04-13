// Import stylesheets
import './style.css';

const baseurl: string = "https://api.dictionaryapi.dev/api/v2/entries/en/";

const form: HTMLFormElement = document.querySelector('#defineform');
const wordname: HTMLParagraphElement = document.querySelector('.lead');

form.onsubmit = () => {
  const formData = new FormData(form);

  console.log(formData);
  const text = formData.get('defineword') as string;
  // console.log(text);
  let on = getWord(text);
  on.then(words => {
    wordname.innerHTML = words[0].word;
  })
  return false; // prevent reload
};

function getWord(text: string) {
  let url: URL = new URL(baseurl + text);
  let request: RequestInfo = new Request(url, {
    method: 'GET'
  })
  let promise = fetch(request).then(r => r.json()).then(r => {return r as Word[]});
  return promise;
}

interface Word {
  "word": string;
  "phonetic": string;
  "phonetics": Phonetic[];
  "meanings": Meaning[];
  "license": License;
  "sourceUrls": string[];
}

interface Definition {
  "definition": string;
  "synonyms": Word[];
  "antonyms": Word[];
}

interface License {
  "name": string;
  "url": string;
}

interface Phonetic {
  "text": string;
  "audio": string;
}

interface Meaning {
  "partOfSpeech": string;
  "definitions": Definition[];
}