<?php

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

?>
