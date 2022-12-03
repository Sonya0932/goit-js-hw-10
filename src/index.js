import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import { fetchCountries } from './fetchCountries'

const DEBOUNCE_DELAY = 300;
const inputEl = document.querySelector('#search-box')
const countryListEl = document.querySelector('.country-list')
const countruInfoEl = document.querySelector('.country-info')


// const url = `https://restcountries.com/v3.1/name/Italy?fields=name,capital,population,flags,languages`
//     fetch(url)
//     .then(response => response.json)
//     .then(name => {
//         console.log(name)
        
//     })
//     .catch(error => console.log(error))

inputEl.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY))

function onSearch(evt) {
    evt.preventDefault();
    const inputText = evt.target.value.trim()
    if (inputText === '') {
        clearMarking();
        return
    }
    fetchCountries(inputText).then(foundData => {
        if (foundData.length > 10) {
            Notiflix.Notify.info(
                'Too many matches found. Please enter a more specific name.'
            );
        } else if (foundData.length === 1) {
            clearMarking(countryList.innerHTML)
            oneCounrtyInSearch(foundData)
        } else if (foundData.length >= 2 && foundData.length <= 10) {
            clearMarking(oneCounrtyInSearch.innerHTML)
            countryList(foundData);
        }
    }).catch(error => {
        Notiflix.Notify.failure(
            'Oops, there is no country with that name'
        );
        clearMarking()
        console.error(error);
    });
}

function countryList(countries) {
    const markup = countries
    .map(country => {
        return `<li>
      <img src="${country.flags.svg}" alt="Flag of ${
        country.name.official
      }" width="30" hight="20">
         <b>${country.name.official}</p>
                </li>`;
    }).join('')

 countryListEl.insertAdjacentHTML('beforeend', markup)
}

function oneCounrtyInSearch(countries) {
    const markup = countries
    .map(country => {
      return `<li>
  <img src="${country.flags.svg}" alt="Flag of ${
        country.name.official
      }" width="30" hight="20">
     <b>${country.name.official}</b></p>
        <p><b>Capital</b>: ${country.capital}</p>
        <p><b>Population</b>: ${country.population}</p>
        <p><b>Languages</b>: ${Object.values(country.languages)} </p>
            </li>`;
    })
    .join('');
    
 countruInfoEl.insertAdjacentHTML('beforeend', markup)
}

function clearMarking() {
    countruInfoEl.innerHTML = '';
    countryListEl.innerHTML = '';
}
