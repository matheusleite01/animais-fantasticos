import AnimaNumeros from './anima-numeros.js';

export default function fetchAnimais(url, target) {
  const numerosGrid = document.querySelector(target);
  // cria a div contendo informações
  // com o total de animais
  function createAnimal(animal) {
    const div = document.createElement('div');
    div.classList.add('numero-animal');
    div.innerHTML = `<h3>${animal.specie}</h3><span data-numero>${animal.total}</span>`;
    return div;
  }

  // anima os números de cada animal
  function animaAnimaisNumeros() {
    const animaNumeros = new AnimaNumeros('[data-numero]', '.numeros', 'ativo');
    animaNumeros.init();
  }

  // Preenche cada animal no DOM
  function preencherAnimais(animal) {
    const divAnimal = createAnimal(animal);
    numerosGrid.appendChild(divAnimal);
  }

  // puxa os animais através de um arquivo json
  // e cria cada animal utilizando createAnimal
  async function criarAnimais() {
    try {
      // fetch e espera resposta e transforma a resposta em json
      const animaisResponse = await fetch(url);
      const animaisJSON = await animaisResponse.json();

      // Após a transformação de json, ativa as funções
      // para preencher e animar os numeros
      animaisJSON.forEach(animal => preencherAnimais(animal));
      const animaNumeros = new AnimaNumeros('[data-numero]', '.numeros', 'ativo');
      animaNumeros.init();
      animaAnimaisNumeros();
    } catch (erro) {
      console.log(erro);
    }
  }

  return criarAnimais();
}
