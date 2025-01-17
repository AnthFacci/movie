//API REQUEST FROM THE OTHER PAGES: https://api.themoviedb.org/3/search/movie?query=A&api_key=1ae540fbee59a7ed38b1dc6cf272ae3d&page=1 || necessário requisitar as outras pages
//API KEY: 1ae540fbee59a7ed38b1dc6cf272ae3d
const apiKey = '1ae540fbee59a7ed38b1dc6cf272ae3d';
//VARIÁVEIS 
const InfoFilmes = document.querySelector(".InfoFilmes");
const sinopseHTML = document.querySelector(".sinopse");
const trailer = document.querySelector(".trailer");
const voltar = document.querySelector("#voltar");
// GET ID IN URL
const urlID = new URLSearchParams(window.location.search);
const id = urlID.get('id');
//EVENT 
voltar.addEventListener('click', () => {
    console.log('Botão Voltar Clicado');
    window.history.back();
});

//Function
async function PageFilme(){
    if(id){
        //FETCH REQUEST
        const resTrailer = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=pt-BR&api_key=${apiKey}`);
        const dataTrailer = await resTrailer.json();
        const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=pt-BR`);
        const data = await res.json();
        const dataF = localStorage.getItem('favList');
        const dataFav = JSON.parse(dataF);
        console.log(dataTrailer)
        console.log(data);
        console.log(dataTrailer);
        //VARIAVEIS
        const cartaz = document.createElement('img');
        const sinopse = document.createElement('p');
        const Title = document.createElement('h2');
        const spanFilme = document.createElement('span');
        const spanAno = document.createElement('span');
        const divTextos = document.createElement('div');
        const dataLancamento = document.createElement('span');
        const spanSinopse = document.createElement('span');
        const divLancamento = document.createElement('div');
        const divSinopse = document.createElement('div');
        const iframe = document.createElement('iframe');
        const i = document.createElement('i');
        // CLASS ADD
        divSinopse.classList.add('divSinopse');
        divLancamento.classList.add('divLancamento');
        spanSinopse.id = "spanSinop";
        i.className = 'fa-regular fa-heart heartPageFilm';
        if(dataFav != null) {
        for (let ind = 0; ind < dataFav.length; ind++) {
          if(dataFav[ind] == data.id){
            i.className = 'fa-solid fa-heart heartPageFilm';
        }
      }
      }
          //EVENT BTN LIKE
          i.addEventListener('click', () => {
            if(i.className === 'fa-solid fa-heart heartPageFilm'){
              i.className = 'fa-regular fa-heart heartPageFilm';
              var idRemove = data.id;
              var nmRemove = data.title;

              // FormData é uma classe nativa do js que tem metodos simples para criação de pares chave/valor
              var formDataRemove = new FormData();
              formDataRemove.append('idFilmeRemove', idRemove);
              formDataRemove.append('nmFilmeRemove', nmRemove);

              fetch('pageFilme.php', {
                method: 'POST',
                body: formDataRemove
              })
              .then(response => response.text())
              .catch(error => {
                console.error('Erro ao enviar dados:', error);
              });
            }else{
              i.className = 'fa-solid fa-heart heartPageFilm';  
              console.log(i);
              var id = data.id;
              var nm = data.title;
              // FormData é uma classe nativa do js que tem metodos simples para criação de pares chave/valor
              var formData = new FormData();
              formData.append('idFilme', id);
              formData.append('nmFilme', nm);
            
              fetch('pageFilme.php', {
                method: 'POST',
                body: formData
              })
              .then(response => response.text())
              .catch(error => {
                console.error('Erro ao enviar dados:', error);
              });
            }
        });
        //ATTRIBUTED VALUE
        document.title = `${data.title}`;
        if(dataTrailer.results.length > 0){
            iframe.setAttribute('src', `https://www.youtube-nocookie.com/embed/${dataTrailer.results[0].key}`);
        }
        dataLancamento.innerText = "Data de lançamento: ";
        spanSinopse.innerText = "Sinopse: ";
        divTextos.classList.add('TextosDiv');
        cartaz.setAttribute('src', `https://image.tmdb.org/t/p/original/${data.poster_path}`);
        sinopse.innerText = `${data.overview}`;
        spanFilme.innerText = `${data.title}`;
        spanAno.innerText = `${data.release_date}`;
        //APPEND
        trailer.append(iframe);
        divLancamento.append(dataLancamento, spanAno)
        Title.append(spanFilme, divLancamento);
        divSinopse.append(spanSinopse, sinopse);
        divTextos.append(Title);
        InfoFilmes.append(cartaz, divTextos, i);
        InfoFilmes.style.background = `url(https://image.tmdb.org/t/p/original/${data.backdrop_path})`;
        InfoFilmes.style.backgroundSize = 'cover';
        sinopseHTML.append(divSinopse);
         
    }
}



//Call function 

if(id){
    PageFilme(id);
}
