//API REQUEST FROM THE OTHER PAGES: https://api.themoviedb.org/3/search/movie?query=A&api_key=1ae540fbee59a7ed38b1dc6cf272ae3d&page=1 || necessário requisitar as outras pages
//API KEY: 1ae540fbee59a7ed38b1dc6cf272ae3d
const apiKey = '1ae540fbee59a7ed38b1dc6cf272ae3d';
//VARIÁVEIS 
const header = document.querySelector('#header');
const slider = document.querySelector('.slider');
const inputSearch = document.querySelector('#searchMv');
const leftBtn = document.getElementById('btnCarroselLeft');
const rightBtn = document.getElementById('btnCarroselRight');

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
    console.log(data);

    if(data.results){
       for (let index = 0; index < 5 && index < data.results.length; index++) {
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

}


carrosel();