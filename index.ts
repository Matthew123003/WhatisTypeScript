// Import stylesheets
// import './style.css';

const form = document.getElementById('defineform') as HTMLFormElement;

// const form = document.querySelector('#defineform') as HTMLFormElement;
form.onsubmit = async (event: Event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const word: string = formData.get('defineword') as string;
  try {
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data = await response.json();
    const definition: string = data[0]?.meanings[0]?.definitions[0]?.definition || 'Definition not found.';
    const definitionElement = document.getElementById('definition');
    if (definitionElement) {
      definitionElement.innerText = definition;
    } else {
      console.error('Element with id "definition" not found');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};