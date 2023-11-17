<?php
    session_start();
    class favorito{
        private $nmFilme;
        private $idFilme;

        public function __construct($nmFilme, $idFilme) {
            $this->nmFilme = $nmFilme;
            $this->idFilme = $idFilme;
        }

        public function favorita(){
            include_once('config.php');
            
            $email = $_SESSION['email'];
            $senha = $_SESSION['senha'];

            $requestUser = "SELECT id_user FROM usuarios WHERE 
            email_user = '$email' AND senha_user = '$senha';";
              
            $resultado = mysqli_query($conexao, $requestUser);
            if(mysqli_num_rows($resultado) > 0){
                $userData = mysqli_fetch_assoc($resultado);
                $userID = $userData['id_user'];
            }

            $query = "INSERT INTO filmesFavoritos(id_filme, nmFilme, id_user) VALUES
            ('$this->idFilme', '$this->nmFilme', '$userID');";
            
            $res = mysqli_query($conexao, $query);
        }
         
        public function removeFav($nmFilmeRemove, $idFilmeRemove){
          include_once('config.php');
          $email = $_SESSION['email'];
          $senha = $_SESSION['senha'];

          $requestUser = "SELECT id_user FROM usuarios WHERE 
          email_user = '$email' AND senha_user = '$senha';";
            
          $resultado = mysqli_query($conexao, $requestUser);
          if(mysqli_num_rows($resultado) > 0){
              $userData = mysqli_fetch_assoc($resultado);
              $userID = $userData['id_user'];
          }

          $res = "DELETE FROM filmesFavoritos WHERE id_user = '$userID' AND id_filme = '$idFilmeRemove'
          AND nmFilme = '$nmFilmeRemove';";

          $result = $conexao->query($res);
        }
        
    }


    if(isset($_POST['idFilme']) && isset($_POST['nmFilme'])){
        
        $fav = new favorito($_POST['nmFilme'], $_POST['idFilme']);
        $fav->favorita();

    }elseif(isset($_POST['idFilmeRemove']) && isset($_POST['nmFilmeRemove'])){
        $fav = new favorito($_POST['nmFilme'], $_POST['idFilme']);
        $fav->removeFav($_POST['nmFilmeRemove'], $_POST['idFilmeRemove']);
    }else{
    
    }
?>


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
                </div>   
                <div class="search">
                    <a href="./listFav.php"><i class="fa-solid fa-list-ul favList" id="favList"></i></a>
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