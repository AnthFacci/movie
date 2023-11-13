<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="./css/searchPage.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;1,400&display=swap" rel="stylesheet">
    <script src="./js/searchPage.js" defer></script>
</head>
    <body>
        <div class="main">
            <header id="header">
                <div class="logoAnimated">
                    <a href="./home.php"><img id="logo" src="./assets/video-solid.svg" alt="#"></a>
                    <div class="animate">
                        <hr>
                        <hr>
                        <hr>
                        <hr>
                    </div>
                </div>    
                <div class="search">
                    <input type="search" name="" id="searchMv">
                    <button id="btnSearch"> <i class="fa-solid fa-magnifying-glass"></i></button>
                </div>
            </header>
            <div class="mainFilmes">
                <h2 id="title" >Resultados:</h2>
            </div>
            <div class="pagination">
                <button id="btnBack">Voltar</button>
                <span class="current-page" id="currentPage">1</span>
                <button id="btnNext">Avançar</button>
            </div>
        </div>
    </body>
</html>