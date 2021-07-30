// Obtendo o JSON via Fetch
const url = `https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json`;
fetch(url)
  .then((response) => response.json())
  .then((superHeroesJson) => preencheCards(superHeroesJson));

let pesquisa = document.querySelector("#filtroHeroi");
pesquisa.onkeyup = function () {
  let nomePesquisa = pesquisa.value;
  for (let i = 0; i < section.childNodes.length; i++) {
    let conteudoH3 = section.childNodes[i].childNodes[0].innerText;
    var corresponde = conteudoH3.toLowerCase().indexOf(nomePesquisa) >= 0;
    section.childNodes[i].style.display = corresponde ? "flex" : "none";
  }
};

// Salvando a <section> em uma variável
let section = document.querySelector("section");

// Preenchendo a <section> com heróis
function preencheCards(jsonObj) {
  let heroes = jsonObj;
  for (let i = 0; i < heroes.length; i++) {
    let myArticle = document.createElement("article");
    myArticle.id = heroes[i].id;
    let nameHero = document.createElement("h3");
    let imgHero = document.createElement("img");
    let btnMaisDetalhes = document.createElement("button");

    nameHero.textContent = heroes[i].name;
    btnMaisDetalhes.id = "details_btn";
    btnMaisDetalhes.textContent = "+ detalhes";
    imgHero.src = heroes[i].images.sm;

    myArticle.appendChild(nameHero);
    myArticle.appendChild(imgHero);
    myArticle.appendChild(btnMaisDetalhes);

    section.appendChild(myArticle);
  }
  //console.log(heroes[1].images.xs)

  // Get the modal
  let modal = document.getElementById("myModal");

  let modalContent = document.querySelector(".modal-content");

  // Get the <span> element that closes the modal
  let fechar = document.getElementsByClassName("close")[0];

  let modalBody = document.createElement("div");

  // retorna o id do personagem
  document.addEventListener("click", (event) => {
    // Details button
    if (event.target.id == "details_btn") {
      let id = event.target.parentNode.id;
      modal.style.display = "block";
      let superHero = heroes.find((hero) => hero.id == id);
      console.log(superHero);

      // Preencher Informações
      modalContent.appendChild(modalBody);
      modalBody.innerHTML = `
      <h1>${superHero.name}</h1>
      <div id="dataContainer">
        <div id="image">
          <img src='${superHero.images.sm}' />
        </div>
        
        <div id="detailContainer">
          <h3 id="powerstats">Estatística de Poder</h3>
          <div id="statsContainer">
            <div id="statsItem">
              <div id="name-stats">
                <span>Combate</span>
                <span>Durabilidade</span>
                <span>Inteligência</span>
                <span>Potência</span>
                <span>Velocidade</span>
                <span>Força</span>
              </div>
              <div id="bars-stats">
                <span style="width: ${superHero.powerstats.combat}%">${superHero.powerstats.combat}</span>
                <span style="width: ${superHero.powerstats.durability}%">${superHero.powerstats.durability}</span>
                <span style="width: ${superHero.powerstats.intelligence}%">${superHero.powerstats.intelligence}</span>
                <span style="width: ${superHero.powerstats.power}%">${superHero.powerstats.power}</span>
                <span style="width: ${superHero.powerstats.speed}%">${superHero.powerstats.speed}</span>
                <span style="width: ${superHero.powerstats.strangth}%">${superHero.powerstats.strength}</span>
              </div>
            </div>
          </div>
        </div>
        
      </div>
      `;
    }

    // When the user clicks on <span> (x), close the modal
    fechar.onclick = function () {
      modalBody.innerHTML = "";
      modal.style.display = "none";
    };
    window.onclick = function (event) {
      if (event.target == modal) {
        modalBody.innerHTML = "";
        modal.style.display = "none";
      }
    };
  });
}
