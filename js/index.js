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
//EVENT 
window.addEventListener('scroll', ()=>{
    if(window.scrollY > 100){
        header.classList.add('opaco');
    }else{
        header.classList.remove('opaco');
    }
})

//FUNCTION

async function carrosel(){
    const res = await fetch(`https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=pt-BR&page=1&sort_by=popularity.desc&api_key=${apiKey}`);
    const data = await res.json();
    // console.log(data);

    if(data.results){
       for (let index = 0; index < 12; index++) {
        const div = document.createElement('div');
        const title = document.createElement('h3');
        const poster = document.createElement('img');
        title.innerText = data.results[index].original_title;
        poster.setAttribute('src', `https://image.tmdb.org/t/p/original/${data.results[index].poster_path}`);
        div.classList.add('carrosselDiv');
        div.append(poster, title);
        slider.appendChild(div);
       }
    }

    leftBtn.addEventListener('click', (e)=>{
        e = 1;
        if(e == 1){
         slider.scrollLeft = slider.scrollLeft - 300;

        }
    })

    rightBtn.addEventListener('click', (e)=>{
        e = 2;
        if(e == 2){
         slider.scrollLeft = slider.scrollLeft + 300;
         
        }
    })
}

async function Cartaz(){

     const res = await fetch(`https://api.themoviedb.org/3/movie/now_playing?language=pt-BR&page=1&api_key=${apiKey}`);
     const dataCartaz = await res.json();
     console.log(dataCartaz);

     if(dataCartaz.results){
        dataCartaz.results.map((filmes)=>{
            const div = document.createElement('div');
            const title = document.createElement('h3');
            const release = document.createElement('h4');
            const img = document.createElement('img');

            title.innerText = `${filmes.title}`;
            release.innerText = `${filmes.release_date}`;
            img.setAttribute('src', `https://image.tmdb.org/t/p/original/${filmes.poster_path}`);
            div.classList.add('divCartaz');
            div.append(img, title, release);
            cartazFilmes.appendChild(div);
         })
     }

}


carrosel();
Cartaz();