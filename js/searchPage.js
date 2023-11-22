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
const logout = document.querySelector('#logout');
let pageAtual = 1;
//EVENT
searchInput.value = movie;
document.title = `Pesquisa: ${movie}`;

searchBtn.addEventListener('click', ()=>{
    const movie = searchMv.value;
    console.log(movie)
    if(movie !== ""){
        window.location.href = `./search.php?movie=${movie}`;
}
    else{
        alert('Digite um valor válido!')
}  
});

var btnLogout = new FormData();
btnLogout.append('Logout', 'Saindo');

logout.addEventListener('click', ()=>{

  fetch('home.php', {
    method: 'POST',
    body: btnLogout,
    credentials: 'same-origin'
  }).then(response => {
    if (response.ok) {
        window.location.href = 'index.php#paralogin';
    } else {
        console.error('Erro na solicitação de logout:', response.statusText);
    }
}).catch(error => {
    console.error('Erro ao enviar dados:', error);
});
});

//FUNCTIONS

async function searchFilme(movie){

     const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${movie}&language=pt-BR&page=${pageAtual}&api_key=${apiKey}`);
     const data = await res.json();
     const totalResults = parseInt(data.total_results);
     const dataF = localStorage.getItem('favList');
     const dataFav = JSON.parse(dataF);
     console.log(data);
     console.log(totalResults);
     if(data.results){
        if(searchInput !== ""){
            searchInput.value = "";
            if(totalResults <= 5){
                mainDiv.style.height = '100vh';
              }
            data.results.map((filmes)=>{
                //createElements
                const div = document.createElement('div');
                const title = document.createElement('h2');
                const poster = document.createElement('img');
                const a = document.createElement('a');
                const i = document.createElement('i');
                i.className = 'fa-regular fa-heart heartSearchPage';
                if(dataFav != null) {
                for (let ind = 0; ind < dataFav.length; ind++) {
                     if(dataFav[ind] == filmes.id){
                        i.className = 'fa-solid fa-heart heartSearchPage';
                     } 
                }
              }
                //EVENT BTN LIKE
                i.addEventListener('click', () => {
                    if(i.className === 'fa-solid fa-heart heartSearchPage'){
                      i.className = 'fa-regular fa-heart heartSearchPage';
                      var idRemove = filmes.id;
                      var nmRemove = filmes.title;
        
                      // FormData é uma classe nativa do js que tem metodos simples para criação de pares chave/valor
                      var formDataRemove = new FormData();
                      formDataRemove.append('idFilmeRemove', idRemove);
                      formDataRemove.append('nmFilmeRemove', nmRemove);
        
                      fetch('search.php', {
                        method: 'POST',
                        body: formDataRemove
                      })
                      .then(response => response.text())
                      .catch(error => {
                        console.error('Erro ao enviar dados:', error);
                      });
                    }else{
                      i.className = 'fa-solid fa-heart heartSearchPage';  
                      console.log(i);
                      var id = filmes.id;
                      var nm = filmes.title;
                      // FormData é uma classe nativa do js que tem metodos simples para criação de pares chave/valor
                      var formData = new FormData();
                      formData.append('idFilme', id);
                      formData.append('nmFilme', nm);
                    
                      fetch('search.php', {
                        method: 'POST',
                        body: formData
                      })
                      .then(response => response.text())
                      .catch(error => {
                        console.error('Erro ao enviar dados:', error);
                      });
                    }
                });
                //assigning value
                title.innerText = `${filmes.title}`;
                poster.setAttribute('src', `https://image.tmdb.org/t/p/original/${filmes.poster_path}`);
                a.setAttribute('href', `/DBFILMES/pageFilme.php?id=${filmes.id}`);
                div.classList.add('divFilmes');
                // divMain.classList.add('divMainFilmes');
                //append elements into div
                a.append(poster, title);
                div.append(a, i);
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
                        const div = document.createElement('div');
                        const title = document.createElement('h2');
                        const poster = document.createElement('img');
                        const a = document.createElement('a');
                        const i = document.createElement('i');
                        i.className = 'fa-regular fa-heart heartSearchPage';
                        if(dataFav != null) {
                        for (let ind = 0; ind < dataFav.length; ind++) {
                             if(dataFav[ind] == filmes.id){
                                i.className = 'fa-solid fa-heart heartSearchPage';
                             } 
                        }
                      }
                        //EVENT BTN LIKE
                        i.addEventListener('click', () => {
                            if(i.className === 'fa-solid fa-heart heartSearchPage'){
                              i.className = 'fa-regular fa-heart heartSearchPage';
                              var idRemove = filmes.id;
                              var nmRemove = filmes.title;
                
                              // FormData é uma classe nativa do js que tem metodos simples para criação de pares chave/valor
                              var formDataRemove = new FormData();
                              formDataRemove.append('idFilmeRemove', idRemove);
                              formDataRemove.append('nmFilmeRemove', nmRemove);
                
                              fetch('search.php', {
                                method: 'POST',
                                body: formDataRemove
                              })
                              .then(response => response.text())
                              .catch(error => {
                                console.error('Erro ao enviar dados:', error);
                              });
                            }else{
                              i.className = 'fa-solid fa-heart heartSearchPage';  
                              console.log(i);
                              var id = filmes.id;
                              var nm = filmes.title;
                              // FormData é uma classe nativa do js que tem metodos simples para criação de pares chave/valor
                              var formData = new FormData();
                              formData.append('idFilme', id);
                              formData.append('nmFilme', nm);
                            
                              fetch('search.php', {
                                method: 'POST',
                                body: formData
                              })
                              .then(response => response.text())
                              .catch(error => {
                                console.error('Erro ao enviar dados:', error);
                              });
                            }
                        });
                        //assigning value
                        title.innerText = `${filmes.title}`;
                        poster.setAttribute('src', `https://image.tmdb.org/t/p/original/${filmes.poster_path}`);
                        a.setAttribute('href', `/DBFILMES/pageFilme.php?id=${filmes.id}`);
                        div.classList.add('divFilmes');
                        // divMain.classList.add('divMainFilmes');
                        //append elements into div
                        a.append(poster, title);
                        div.append(a, i);
                        mainFilmes.appendChild(div);
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
                        const i = document.createElement('i');
                        i.className = 'fa-regular fa-heart heartSearchPage';
                        if(dataFav != null) {
                        for (let ind = 0; ind < dataFav.length; ind++) {
                             if(dataFav[ind] == filmes.id){
                                i.className = 'fa-solid fa-heart heartSearchPage';
                             } 
                        }
                      }
                        //EVENT BTN LIKE
                        i.addEventListener('click', () => {
                            if(i.className === 'fa-solid fa-heart heartSearchPage'){
                              i.className = 'fa-regular fa-heart heartSearchPage';
                              var idRemove = filmes.id;
                              var nmRemove = filmes.title;
                
                              // FormData é uma classe nativa do js que tem metodos simples para criação de pares chave/valor
                              var formDataRemove = new FormData();
                              formDataRemove.append('idFilmeRemove', idRemove);
                              formDataRemove.append('nmFilmeRemove', nmRemove);
                
                              fetch('search.php', {
                                method: 'POST',
                                body: formDataRemove
                              })
                              .then(response => response.text())
                              .catch(error => {
                                console.error('Erro ao enviar dados:', error);
                              });
                            }else{
                              i.className = 'fa-solid fa-heart heartSearchPage';  
                              console.log(i);
                              var id = filmes.id;
                              var nm = filmes.title;
                              // FormData é uma classe nativa do js que tem metodos simples para criação de pares chave/valor
                              var formData = new FormData();
                              formData.append('idFilme', id);
                              formData.append('nmFilme', nm);
                            
                              fetch('search.php', {
                                method: 'POST',
                                body: formData
                              })
                              .then(response => response.text())
                              .catch(error => {
                                console.error('Erro ao enviar dados:', error);
                              });
                            }
                        });
                        //assigning value
                        title.innerText = `${filmes.title}`;
                        poster.setAttribute('src', `https://image.tmdb.org/t/p/original/${filmes.poster_path}`);
                        a.setAttribute('href', `/DBFILMES/pageFilme.php?id=${filmes.id}`);
                        div.classList.add('divFilmes');
                        // divMain.classList.add('divMainFilmes');
                        //append elements into div
                        a.append(poster, title);
                        div.append(a, i);
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


//ERRO -> POR CONTA DE O ULTIMO ELEMENTO ANCESTRAL DO I SER A MAIN, TODOS ACABAM TENDO O MESMO POSICIONAMENTO.