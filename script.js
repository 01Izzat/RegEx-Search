//===============================RegEx==========================//
let input = document.querySelector(".search"),
suggestions = document.querySelector(".suggestions");

let cities = [];

function getCityes() {
  fetch("https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json",{
    method: "GET",
  })
  .then((res) => {
    return res.json();
  })
  .then((res) => {
    cities= res;
  });
  };

  getCityes();


  function getSearchCityes(keyword) {
    
    let arr2 = cities.filter((item) => {
      let regexExp = new RegExp(keyword, "gi");
      return (item.city.match(regexExp)  || item.state.match(regexExp)  );
    });
    return arr2;
  }


  function renderSug(e) {
    const searchWord = e.target.value;
    const arr = getSearchCityes(searchWord);
    let result = "";
    arr.forEach(element => {
      let regexExaple = new RegExp(searchWord, "gi");
      const city = element.city.replace(regexExaple,
        `<span class="hl">${searchWord}</span>`);
        const state = element.state.replace(regexExaple,
          `<span class="hl">${searchWord}</span>`); 

          result += `
          <li>
          <span>${city} or ${state}</span>
          </li>`;
    });
    suggestions.innerHTML = result;
}

  input.addEventListener("keyup" , renderSug);