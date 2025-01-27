const flag = document.querySelector(".flag");
const darkModeBtn = document.querySelector(".dark-mode-btn");
const countryName = document.querySelector(".country-name");
const nativeName = document.querySelector(".native-name > span");
const population = document.querySelector(".population > span");
const region = document.querySelector(".region > span");
const subRegion = document.querySelector(".sub-region > span");
const capital = document.querySelector(".capital > span");
const topDomain = document.querySelector(".top-domain > span");
const currencies = document.querySelector(".currencies > span");
const languages = document.querySelector(".languages > span");
const borderCountries = document.querySelector(".border-countries-container");
const backBtn = document.querySelector(".back-btn");




if(localStorage.getItem('darkMode') == 'true'){
  document.body.classList.add('dark-mode')
  darkModeBtn.innerHTML = `<i class="ri-sun-line"></i> Light Mode`
}else{
  darkModeBtn.innerHTML = '<i class="ri-moon-line"></i> Dark Mode'
}

darkModeBtn.addEventListener('click', () =>{
  document.body.style.transition = 'all 0.5s'
  document.body.classList.toggle('dark-mode')
  if(document.body.classList.contains('dark-mode')){
    darkModeBtn.innerHTML = `<i class="ri-sun-line"></i> Light Mode`
    localStorage.setItem('darkMode', true)
  }else{
    document.body.style.transition = 'all 0.5s'
    darkModeBtn.innerHTML = '<i class="ri-moon-line"></i> Dark Mode'
    localStorage.setItem('darkMode', false)
  }
})

let allData;
const urlSplit = "%20";
let countryURLName = new URLSearchParams(location.search)
  .get("name")
  .toLocaleLowerCase()
  .replace(" ", urlSplit);

fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => {
    allData = data;
  });

fetch(`https://restcountries.com/v3.1/name/${countryURLName}?fullText=true`)
  .then((res) => res.json())
  .then((data) => {
    flag.src = data[0].flags.svg;
    countryName.textContent = data[0].name.common;
    try {
      nativeName.textContent = Object.values(data[0].name.nativeName)[
        length
      ].common;
    } catch (err) {
      console.log(`did not find value`);
    }
    population.textContent = data[0].population.toLocaleString("en-IN");
    region.textContent = data[0].region;
    subRegion.textContent = data[0].subregion;
    capital.textContent = data[0].capital;
    topDomain.textContent = data[0].tld;
    try {
      currencies.textContent = Object.values(data[0].currencies)[0].name;
    } catch (err) {
      console.log(`did not find value`);
    }
    try {
      languages.textContent = Object.values(data[0].languages).join(", ");
    } catch (err) {
      console.log(`did not find value`);
    }

    if (data[0].borders) {
      data[0].borders.forEach((con) => {
        allData.forEach((search, index) => {
          if (con == search.cca3) {
            const borderCountry = document.createElement("a");
            borderCountry.innerText = allData[index].name.common;
            borderCountry.href = `/country.html?name=${allData[index].name.common}`;
            borderCountries.appendChild(borderCountry);
          }
        });
      });
    }
  });

backBtn.addEventListener("click", () => {
  window.history.back();
});
