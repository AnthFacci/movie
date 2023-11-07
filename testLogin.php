<?php
 

 class login{
      
    private $email_user;
    private $senha_user;

    public function __construct($email, $senha) {
        $this->email_user = $email;
        $this->senha_user = $senha;
    }

    public function verificaLog(){
        if(isset($_POST['email_login']) && isset($_POST['senha_login'])){
            session_start();
            include_once('config.php');

            $query = "SELECT email_user, senha_user FROM usuarios WHERE
            email_user = '$this->email_user' AND senha_user = '$this->senha_user';";

            $res = $conexao->query($query);

            if(mysqli_num_rows($res) > 0){
                $_SESSION['email'] = $this->email_user;
                $_SESSION['senha'] = $this->senha_user;
                header('Location: home.php');
            }
            else{
                unset($_SESSION['email']);
                unset($_SESSION['senha']);
                header('Location: index.php#paralogin');
            }
        }else{
            header('Location: index.php#paralogin');
        }
    }
     
 }
 
   $logar = new login($_POST['email_login'], $_POST['senha_login']);
   $logar->verificaLog();

?>