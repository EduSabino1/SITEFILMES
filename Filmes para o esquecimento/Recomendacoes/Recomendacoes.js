const API_KEY = '9472eefb92d716c245df660282f1c10c';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_URL = 'https://image.tmdb.org/t/p/w300';

async function carregarFilmes() {
  const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=18&language=pt-BR&page=1`;

  const response = await fetch(url);
  const data = await response.json();

  const filmes = data.results.slice(10, 16);
  const cartazes = document.querySelectorAll('.cartaz');

  filmes.forEach((filme, index) => {
    const cartaz = cartazes[index];

    if (!cartaz) return;

    const img = cartaz.querySelector('img');
    const titulo = cartaz.querySelector('h3');
    const descricao = cartaz.querySelector('p');

    if (filme.poster_path) {
      img.src = IMG_URL + filme.poster_path;
      img.alt = filme.title;
    } else {
      img.src = '../img/Indisponivel.png';
    }

    const ano = filme.release_date
      ? filme.release_date.slice(0, 4)
      : '----';

    titulo.textContent = `${filme.title} (${ano})`;

    descricao.textContent = filme.overview
      ? filme.overview.slice(0, 90) + '...'
      : 'Descrição não disponível.';
  });
}

carregarFilmes();
