// Import stylesheets
import './style.css';


const form: HTMLFormElement = document.querySelector('#defineform') as HTMLFormElement;

interface DefineWord {
  word:string,
  phonetic:string,
  phonetics: [
    {
      text:string,
      audio:string
    },
  ],
  origin:string,
  meanings: [
    {
      partOfSpeech:string,
      definitions: [
        {
          definition:string,
          example:string,
          synonyms: [],
          antonyms: []
        }
      ]
    }
  ]
}

// https://www.sohamkamani.com/typescript/rest-http-api-call/
function getDefineWord(word: string) : Promise<DefineWord>{

  // const headers: Headers = new Headers()
  // headers.set('Content-Type', 'application/json')
  // headers.set('Accept', 'application/json')
  // headers.set('X-Custom-Header', 'Test')

  // Create the request object, which will be a RequestInfo type. 
  // Here, we will pass in the URL as well as the options object as parameters.
  const request: RequestInfo = new Request(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`, {
    method: 'GET',
    // headers: headers
  })

  return fetch(request)
    .then(res => res.json())
    .then(res => {
      return res as DefineWord;
    });
}

form.onsubmit = () => {
  const formData = new FormData(form);

  console.log(formData);
  const text = formData.get('defineword') as string;
  console.log(text);

  var word = getDefineWord(text);
  // const test: HTMLFormElement = document.querySelector('#test') as HTMLFormElement;
  // test.innerText = word;
  return false; // prevent reload
};