<?php
    session_start();
    class getFav{

        private $idUser;
        private $idFilme;
        private $emailUser;
        private $senhaUser;

        public function __construct() {
            $this->emailUser = $_SESSION['email'];
            $this->senhaUser = $_SESSION['senha'];
            $this->idFilme = array();
        }

        public function getInfo(){
           if(isset($_SESSION['email']) && isset($_SESSION['senha'])){
            include_once('config.php');

            $queryID = "SELECT id_user FROM usuarios WHERE email_user = '$this->emailUser' AND senha_user = '$this->senhaUser';";
            $resID = $conexao->query($queryID);
            if(mysqli_num_rows($resID) > 0){
                $user = mysqli_fetch_assoc($resID);
                $this->idUser = $user['id_user'];
            }
            $queryMovie = "SELECT id_filme FROM filmesFavoritos WHERE id_user = '$this->idUser';";
            $resMovie = mysqli_query($conexao, $queryMovie);    
            if($resMovie){
                if(mysqli_num_rows($resMovie) > 0){
                    while($linha = mysqli_fetch_assoc($resMovie)){
                         $id_filme = $linha['id_filme'];
                         $this->idFilme[] = $id_filme;
                    }
                    $dadosId = json_encode($this->idFilme);
                }
            }  

                echo "<script>";
                echo "localStorage.setItem('favList', '" . $dadosId . "');";
                echo "</script>";
           }

        }
        

    }

    $get = new getFav();
    $get->getInfo();

?>


<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>EdMovie - Favoritos</title>
        <link rel="stylesheet" href="./css/listFav.css">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;1,400&display=swap" rel="stylesheet">
        <script src="./js/listFav.js" defer></script>
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
             <div class="list">
                    <h2>Favoritos:</h2>
                   <div class="Cartaz">
                   </div>
             </div>
             <div class="btn">
                <button><a id="voltar">Voltar</a></button>
             </div>
        </div>
    </body>
</html>