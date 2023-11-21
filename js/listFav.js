//API REQUEST FROM THE OTHER PAGES: https://api.themoviedb.org/3/search/movie?query=A&api_key=1ae540fbee59a7ed38b1dc6cf272ae3d&page=1 || necessário requisitar as outras pages
//API KEY: 1ae540fbee59a7ed38b1dc6cf272ae3d
const apiKey = '1ae540fbee59a7ed38b1dc6cf272ae3d';
//VARIÁVEIS 
const header = document.querySelector('#header');
const slider = document.querySelector('.slider');
const inputSearch = document.querySelector('#searchMv');
const leftBtn = document.getElementById('btnCarroselLeft');
const rightBtn = document.getElementById('btnCarroselRight');
const cartazFilmes = document.querySelector('.Cartaz');
const searchMv = document.querySelector('#searchMv');
const btnSearch = document.querySelector('#btnSearch');
const favList = document.querySelector('#favList');
const mainDiv = document.querySelector('.main');
const listH = document.querySelector('.list');
// GET ID IN URL
const urlID = new URLSearchParams(window.location.search);
const id = urlID.get('id');
//EVENT 
voltar.addEventListener('click', () => {
    console.log('Botão Voltar Clicado');
    window.history.back();
});

window.addEventListener('scroll', ()=>{
    if(window.scrollY > 100){
        header.classList.add('opaco');
    }else{
        header.classList.remove('opaco');
    }
})

if(!id){
    btnSearch.addEventListener('click', ()=>{
       const movie = searchMv.value;
       console.log(movie)
       if(movie !== ""){
          window.location.href = `./search.php?movie=${movie}`;
       }
       else{
          alert('Digite um valor válido!')
       }
  
    })
  }

//FUNCTIONS

async function list(){
   const favListItens = localStorage.getItem('favList');

if(favListItens){
    const list = JSON.parse(favListItens);
    console.log(list);
    if(list && list.length > 0) {
        for (let index = 0; index < list.length; index++) {
            let res = await fetch(`https://api.themoviedb.org/3/movie/${list[index]}?api_key=${apiKey}&language=pt-BR`);
            let data = await res.json();

            if(data){
                    const div = document.createElement('div');
                    const title = document.createElement('h3');
                    const release = document.createElement('h4');
                    const img = document.createElement('img');
                    const ancor = document.createElement('a');
                    const divStar = document.createElement('div'); 

                    ancor.setAttribute('href', `./pageFilme.php?id=${data.id}`);
                    title.innerText = `${data.title}`;
                    release.innerHTML = `<i class="fa-solid fa-star"></i> <span>${data.vote_average.toFixed(2)}</span>`;
                    img.setAttribute('src', `https://image.tmdb.org/t/p/original/${data.poster_path}`);
                    div.classList.add('divCartaz');
                    divStar.classList.add('divStar');
                    divStar.append(release)
                    ancor.append(img, title, divStar);
                    div.append(ancor);
                    cartazFilmes.appendChild(div);
            }
        }
   }else {
    const span = document.createElement('span');
    span.innerText = 'Sua lista de favoritos está vazia.';
    span.id = "span";
    cartazFilmes.appendChild(span);
    mainDiv.style.height = '100vh';
}
}else{
    const span = document.createElement('span');
    span.innerText = 'Sua lista de favoritos está vazia.';
    span.id = "span";
    cartazFilmes.appendChild(span);
    mainDiv.style.height = '100vh';
}
}


list();