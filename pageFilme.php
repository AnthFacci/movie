<?php
    class favorito{
        private $nmFilme;
        private $idFilme;

        public function __construct($nmFilme, $idFilme) {
            $this->nmFilme = $nmFilme;
            $this->idFilme = $idFilme;
        }

        public function favorita(){
            session_start();
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

        
    }


    if(isset($_POST['idFilme']) && isset($_POST['nmFilme'])){
        
        $fav = new favorito($_POST['nmFilme'], $_POST['idFilme']);
        $fav->favorita();
    }else{
    
    }
?>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Filme: </title>
    <link rel="stylesheet" href="./css/PageFilm.css">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;1,400&display=swap" rel="stylesheet">
    <script src="./js/pageFilm.js" defer></script>
</head>
<body>
    <div class="main">
         <div class="InfoFilmes">
         </div>
         <div class="sinopse">
         </div>
         <div class="trailer">
         </div>
         <div class="btn">
            <button><a id="voltar">Voltar</a></button>
         </div>
    </div>
</body>
</html>