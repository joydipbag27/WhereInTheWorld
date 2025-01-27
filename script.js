const main = document.querySelector("main");
const darkModeBtn = document.querySelector(".dark-mode-btn");
const filter = document.querySelector(".filter");
const search = document.querySelector('input')



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

fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => {
    data.forEach((country) => {
      const countriesCard = document.createElement("a");
      countriesCard.classList.add("countries-card");
      countriesCard.href = `/country.html?name=${country.name.common}`;
      countriesCard.innerHTML = `<img src="${country.flags.svg}">
            <div class="countries-info">
              <h5 class="countryName">${country.name.common}</h5>
              <h6 class="population">Population: <span>${country.population.toLocaleString(
                "en-IN"
              )}</span></h6>
              <h6 class="region">Region: <span>${country.region}</span></h6>
              <h6 class="capital">Capital: <span>${country.capital}</span></h6>
            </div>`;
      main.appendChild(countriesCard);
    });
  });


filter.addEventListener("change", () => {
  while (main.hasChildNodes()) {
    main.removeChild(main.firstChild);
  }
  fetch(`https://restcountries.com/v3.1/region/${filter.value}`)
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    data.forEach((country) => {
      const countriesCard = document.createElement("a");
      countriesCard.classList.add("countries-card");
      countriesCard.href = `/country.html?name=${country.name.common}`;
      countriesCard.innerHTML = `<img src="${country.flags.svg}">
            <div class="countries-info">
              <h5 class="countryName">${country.name.common}</h5>
              <h6 class="population">Population: <span>${country.population.toLocaleString(
                "en-IN"
              )}</span></h6>
              <h6 class="region">Region: <span>${country.region}</span></h6>
              <h6 class="capital">Capital: <span>${country.capital}</span></h6>
            </div>`;
      main.appendChild(countriesCard);
    });
  })
});


search.addEventListener('input', (inp) =>{
const inputValue = (inp.target.value).toLowerCase()
const countriesCards = document.querySelectorAll('.countries-card')
countriesCards.forEach((searchCard) => {
  const countryName = searchCard.querySelector('.countryName').textContent.toLowerCase();
  if (countryName.includes(inputValue)) {
    searchCard.style.display = "block";
  } else {
    searchCard.style.display = "none";
  }
});
})
