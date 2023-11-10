//API REQUEST FROM THE OTHER PAGES: https://api.themoviedb.org/3/search/movie?query=A&api_key=1ae540fbee59a7ed38b1dc6cf272ae3d&page=1 || necessário requisitar as outras pages
//API KEY: 1ae540fbee59a7ed38b1dc6cf272ae3d
const apiKey = '1ae540fbee59a7ed38b1dc6cf272ae3d';
//VARIÁVEIS 
const InfoFilmes = document.querySelector(".InfoFilmes");
const sinopseHTML = document.querySelector(".sinopse");
const trailer = document.querySelector(".trailer");
// GET ID IN URL
const urlID = new URLSearchParams(window.location.search);
const id = urlID.get('id');

//Function
async function PageFilme(){
    if(id){
        //FETCH REQUEST
        const resTrailer = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=pt-BR&api_key=${apiKey}`);
        const dataTrailer = await resTrailer.json();
        const res = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=pt-BR`);
        const data = await res.json();
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
        // CLASS ADD
        divSinopse.classList.add('divSinopse');
        divLancamento.classList.add('divLancamento');
        spanSinopse.id = "spanSinop";
        //ATTRIBUTED VALUE
        document.title = `${data.title}`;
        iframe.setAttribute('src', `https://www.youtube-nocookie.com/embed/${dataTrailer.results[0].key}`);
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
        InfoFilmes.append(cartaz, divTextos);
        InfoFilmes.style.background = `url(https://image.tmdb.org/t/p/original/${data.backdrop_path})`;
        InfoFilmes.style.backgroundSize = 'cover';
        sinopseHTML.append(divSinopse);
         
    }
}



//Call function 

if(id){
    PageFilme(id);
}