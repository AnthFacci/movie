<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="./css/style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;1,400&display=swap" rel="stylesheet">
    <script src="./js/index.js" defer></script>
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
            <div class="carrosel">
                <button id="btnCarroselRight"><i class="fa-solid fa-arrow-right"></i></button>
                <button id="btnCarroselLeft"><i class="fa-solid fa-arrow-left"></i></button>
                <div class="title">
                <h2 class="titleCarrosel">Most popular</h2><span id="fire"><i id="fogo" class="fa-solid fa-fire"></i></span>
                </div>
                <div class="slider">
                </div>
            </div>
            <!-- <div class="generos">
                <h2>Em cartaz</h2>
            </div> -->
            <div id="cartazTitle">
                    <h2>Em cartaz</h2>
                </div>    
            <div class="Cartaz">
            </div>
        </div>
    </body>
</html>