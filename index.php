<?php

 class cadastro{
      
     private $nm_user;
     private $email_user;
     private $senha_user;
     
     public function __construct($nm_user, $email_user, $senha_user) {
        $this->nm_user = $nm_user;
        $this->email_user = $email_user;
        $this->senha_user = $senha_user;
     }

     public function cadastrar(){
         include_once('config.php');
         
         if(isset($_POST['submit']) && isset($_POST['nome_cad']) && isset($_POST['email_cad']) && isset($_POST['senha_cad'])){
         $query = "INSERT INTO usuarios(nm_user, senha_user, email_user) VALUES 
         ('$this->nm_user', '$this->senha_user', '$this->email_user');";

         $res = mysqli_query($conexao, $query);
         }
     }

 }   
    if(isset($_POST['nome_cad']) && isset($_POST['email_cad']) && isset($_POST['senha_cad'])){
      $cadastrando = new cadastro($_POST['nome_cad'], $_POST['email_cad'], $_POST['senha_cad']);
      $cadastrando->cadastrar();
    }
?>

<!DOCTYPE html>
<head>
  <meta charset="UTF-8" />
  <title>Formulário de Login e Registro com HTML5 e CSS3</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
  <link rel="stylesheet" type="text/css" href="style.css" />
  <link rel="stylesheet" href="./css/styleLogin.css">
</head>
<body>
  <div class="container" >
    <a class="links" id="paracadastro"></a>
    <a class="links" id="paralogin"></a>
     
    <div class="content">      
      <!--FORMULÁRIO DE LOGIN-->
      <div id="login">
        <form method="post" action="testLogin.php"> 
          <h1>Login</h1> 
          <p> 
            <label for="email_login">Seu e-mail</label>
            <input id="email_login" name="email_login" required="required" type="text" placeholder="ex. contato@gmail.com"/>
          </p>
           
          <p> 
            <label for="senha_login">Sua senha</label>
            <input id="senha_login" name="senha_login" required="required" type="password" placeholder="ex. senha" /> 
          </p>
           
          <p> 
            <input type="checkbox" name="manterlogado" id="manterlogado" value="" /> 
            <label for="manterlogado">Manter-me logado</label>
          </p>
           
          <p> 
            <input type="submit" value="Logar" value="submit_login"/> 
          </p>
           
          <p class="link">
            Ainda não tem conta?
            <a href="#paracadastro">Cadastre-se</a>
          </p>
        </form>
      </div>
 
      <!--FORMULÁRIO DE CADASTRO-->
      <div id="cadastro">
        <form method="post" action="index.php"> 
          <h1>Cadastro</h1> 
           
          <p> 
            <label for="nome_cad">Seu nome</label>
            <input id="nome_cad" name="nome_cad" required="required" type="text" placeholder="nome" />
          </p>
           
          <p> 
            <label for="email_cad">Seu e-mail</label>
            <input id="email_cad" name="email_cad" required="required" type="email" placeholder="contato@gmail.com"/> 
          </p>
           
          <p> 
            <label for="senha_cad">Sua senha</label>
            <input id="senha_cad" name="senha_cad" required="required" type="password" placeholder="ex. 1234"/>
          </p>
           
          <p> 
            <input type="submit" value="Cadastrar" name="submit"/> 
          </p>
           
          <p class="link">  
            Já tem conta?
            <a href="#paralogin"> Ir para Login </a>
          </p>
        </form>
      </div>
    </div>
  </div>  
</body>
</html>