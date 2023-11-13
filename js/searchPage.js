//API REQUEST FROM THE OTHER PAGES: https://api.themoviedb.org/3/search/movie?query=A&api_key=1ae540fbee59a7ed38b1dc6cf272ae3d&page=1 || necessário requisitar as outras pages
//API KEY: 1ae540fbee59a7ed38b1dc6cf272ae3d
const apiKey = '1ae540fbee59a7ed38b1dc6cf272ae3d';
//VARIÁVEIS 
const urlID = new URLSearchParams(window.location.search);
const movie = urlID.get('movie');
const searchBtn = document.querySelector('#btnSearch');
const mainDiv = document.querySelector('.main');
const searchInput = document.querySelector('#searchMv');
const mainFilmes = document.querySelector('.mainFilmes');
const btnNext = document.querySelector('#btnNext');
const btnBack = document.querySelector('#btnBack');
const currentPage = document.querySelector('#currentPage');
let pageAtual = 1;
//EVENT
searchInput.value = movie;
document.title = `Pesquisa: ${movie}`;

//FUNCTIONS

async function searchFilme(movie){

     const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${movie}&language=pt-BR&page=${pageAtual}&api_key=${apiKey}`);
     const data = await res.json();
     console.log(data);
     const totalResults = parseInt(data.total_results);
     console.log(totalResults);
     if(data.results){
        if(searchInput !== ""){
            searchInput.value = "";
            if(totalResults <= 4){
                mainDiv.style.height = '100vh';
              }
            data.results.map((filmes)=>{
                //createElements
                const div = document.createElement('div');
                const title = document.createElement('h2');
                const poster = document.createElement('img');
                const a = document.createElement('a');
                //assigning value
                title.innerText = `${filmes.title}`;
                poster.setAttribute('src', `https://image.tmdb.org/t/p/original/${filmes.poster_path}`);
                a.setAttribute('href', `/DBFILMES/pageFilme.php?id=${filmes.id}`);
                div.classList.add('divFilmes');
                // divMain.classList.add('divMainFilmes');
                //append elements into div
                a.append(poster, title);
                div.appendChild(a);
                mainFilmes.appendChild(div);
            })

            btnNext.addEventListener('click', async ()=>{
                pageAtual += 1;
                const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${movie}&language=pt-BR&page=${pageAtual}&api_key=${apiKey}`);
                const data = await res.json();
                let totalPage = parseInt(`${data.total_pages}`);
                console.log(totalPage);
                if(pageAtual <= totalPage){
                    mainFilmes.innerText = '';
                    data.results.map((filmes)=>{
                        //createElements
                        const titleResults = document.createElement('h2');
                        const div = document.createElement('div');
                        const title = document.createElement('h2');
                        const poster = document.createElement('img');
                        const a = document.createElement('a');
                        //assigning value
                        title.innerText = `${filmes.title}`;
                        poster.setAttribute('src', `https://image.tmdb.org/t/p/original/${filmes.poster_path}`);
                        a.setAttribute('href', `/DBFILMES/pageFilme.php?id=${filmes.id}`);
                        div.classList.add('divFilmes');
                        titleResults.innerText = "Resultados:";
                        titleResults.id = "title";
                        // divMain.classList.add('divMainFilmes');
                        //append elements into div
                        a.append(poster, title);
                        div.appendChild(a);
                        mainFilmes.append(titleResults, div);
                    })
                    currentPage.innerText = pageAtual;
                }
                else{
                    alert('Você alcançou a última página!');
                }
            })

            btnBack.addEventListener('click', async ()=>{
                pageAtual -= 1;
                const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${movie}&language=pt-BR&page=${pageAtual}&api_key=${apiKey}`);
                const data = await res.json();
                let totalPage = parseInt(`${data.total_pages}`);
                console.log(totalPage);
                if(pageAtual > 0){
                    mainFilmes.innerText = '';
                    data.results.map((filmes)=>{
                        //createElements
                        const div = document.createElement('div');
                        const title = document.createElement('h2');
                        const poster = document.createElement('img');
                        const a = document.createElement('a');
                        //assigning value
                        title.innerText = `${filmes.title}`;
                        poster.setAttribute('src', `https://image.tmdb.org/t/p/original/${filmes.poster_path}`);
                        a.setAttribute('href', `/DBFILMES/pageFilme.php?id=${filmes.id}`);
                        div.classList.add('divFilmes');
                        // divMain.classList.add('divMainFilmes');
                        //append elements into div
                        a.append(poster, title);
                        div.appendChild(a);
                        mainFilmes.appendChild(div);
                    })
                    currentPage.innerText = pageAtual;
                }
                else if(pageAtual <= 0){
                    alert('Você alcançou a primeira página!');
                }
            })
        }
     }

}

//CALL FUNCTIONS 
searchFilme(movie);