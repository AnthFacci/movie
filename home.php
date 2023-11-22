<?php
    session_start();
    include_once('list.php');

    class favorito{
        private $nmFilme;
        private $idFilme;
        private $idUser;

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
    
    class getName{
        public function getNM(){
            include_once('config.php');
            $email = $_SESSION['email'];
            $senha = $_SESSION['senha'];
            $requestUser = "SELECT nm_user FROM usuarios WHERE 
          email_user = '$email' AND senha_user = '$senha';";
          $resultado = mysqli_query($conexao, $requestUser);
          if(mysqli_num_rows($resultado) > 0){
              $userData = mysqli_fetch_assoc($resultado);
              $userNM = $userData['nm_user'];
          }

          return $userNM;
        }
    }
     
    if(isset($_SESSION['email']) && $_SESSION['senha']){
    if(isset($_POST['idFilme']) && isset($_POST['nmFilme'])){ 
        $fav = new favorito($_POST['nmFilme'], $_POST['idFilme']);
        $fav->favorita();
    }elseif(isset($_POST['idFilmeRemove']) && isset($_POST['nmFilmeRemove'])){
        $fav = new favorito($_POST['nmFilmeRemove'], $_POST['idFilmeRemove']);
        $fav->removeFav($_POST['nmFilmeRemove'], $_POST['idFilmeRemove']);  
    }if(isset($_POST['Logout'])){
           unset($_SESSION['email']);
           unset($_SESSION['senha']);
           header('Location: index.php#paralogin');
    }
    $getNm = new getName();
    $Nm = $getNm->getNM(); 
}else{
    header('Location: index.php#paralogin');
}

  
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>EdMovie - Home</title>
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
                </div>   
                <div class="search">
                    <a href="./listFav.php"><i class="fa-solid fa-list-ul favList" id="favList"></i></a>
                    <input type="search" name="" id="searchMv">
                    <button id="btnSearch"> <i class="fa-solid fa-magnifying-glass"></i></button>
                </div>
                <div class="user">
                    <span>Bem-vindo novamente, <span><?php echo ucfirst($Nm); ?></span></span>
                    <button id="logout">Sair</button>
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
            <div id="cartazTitle">
                    <h2>Em cartaz</h2>
                </div>    
            <div class="Cartaz">
            </div>
        </div>
    </body>
</html>