const endpoint='https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

const cities = []; //This holds the results from the search
const textInput = document.querySelector('.search-form input');
const suggestions = document.querySelector('.suggestions');

// let prom = fetch(endpoint);
// console.log(prom)

fetch(endpoint)
  .then(blob => blob.json())
  .then(data => cities.push(...data));

/*
The first arg will be what to match from the text input.
The 2nd arg will be the "master" list of cities, the orig dataset.
*/
function findMatches(wordToMatch, cities) {
  return cities.filter(place => {
    let regex = new RegExp(wordToMatch, 'gi');
    return place.city.match(regex) || place.state.match(regex);
  })
}

function displayMatches() {
  let html;
  //Default:
  if (this.value === "") {
    html = `
      <li>Filter for a city</li>
      <li>Filter for a state</li>
    `;
  }
  else {
    //Return the matches
    let resultsAry = findMatches(this.value, cities);
    html = resultsAry.map(place => {
      let matchedString = new RegExp(this.value, 'gi');
      let cityName  = place.city.replace(matchedString, `<span class="hl">${this.value}</span>`);
      let stateName = place.state.replace(matchedString, `<span class="hl">${this.value}</span>`);
      console.log(stateName);
      return `
        <li>
          <span class="name">${cityName}, ${stateName}</span>
          <span class="population">pop: ${numberWithCommas(place.population)}</span>
        </li>
      `;
      }).join(''); //Use .join() to create a string
    }
  suggestions.innerHTML = html;
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

textInput.addEventListener('input', displayMatches);
// textInput.addEventListener('change', displayMatches);
// textInput.addEventListener('keyup', displayMatches);