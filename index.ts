// Import stylesheets
import './style.css';

  
// // Define the API URL
// // Make a GET request
// const apiUrl = 'https://api.dictionaryapi.dev/api/v2/entries/en/${text}';
// const outputElement = document.getElementById('output');
// fetch(apiUrl)
//   .then(response => {
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return response.json();
//   })
//   .then(data => {
//     // Display data in an HTML element
//     outputElement.textContent = JSON.stringify(data, null, 2);
//   })
//   .catch(error => {
//     console.error('Error:', error);
//   });

const form: HTMLFormElement = document.querySelector('#defineform');

form.onsubmit = async (event: Event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const word: string = formData.get('defineword') as string;

  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await response.json();


    const definition: string = data[0]?.meanings[0]?.definitions[0]?.definition || 'Definition not found.';

    document.getElementById('definition').innerText = definition;
  } catch (error) {
    console.error('Error fetching data:', error);
  }

form.onsubmit = () => {
  const formData = new FormData(form);

  console.log(formData);
  const text = formData.get('defineword') as string;
  console.log(text);
  return false; // prevent reload
};
}