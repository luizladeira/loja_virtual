<?php


    if(isset($_GET["email"]) || isset($_GET["senha"]) ){
        if(!empty($_GET["email"]) || !empty($_GET["senha"])  ){
    
            require "config.php";
    
            $email= $_GET["email"];
            $senha= $_GET["senha"];

	$sql = $conexao->prepare("SELECT * FROM usuario where email_user='$email'  and senha_user='$senha'");

		$sql->execute();

            $outp = "";
            if($rs=$sql->fetch()) {
                if ($outp != "") {$outp .= ",";}
                $outp .= '{"idusuario":"'  . $rs["idusuario"] . '",';
                $outp .= '"nome":"'   . $rs["nome_user"]        . '",';
                $outp .= '"email":"'   . $rs["email_user"]        . '",';
                $outp .= '"senha":"'   . $rs["senha_user"]        . '",';
                $outp .= '"nivel":"'   . $rs["nivel_user"]        . '",';
                $outp .= '"status":"'   . $rs["status_user"]        . '",';
                $outp .= '"data_cadastro_user":"'. $rs["data_cadastro_user"]     . '"}';

                $outp ='{"msg": {"logado": "sim", "texto": "logado com sucesso!"}, "dados": '.$outp.'}';
            }else{
            
                $outp ='{"msg": {"logado": "nao", "texto": "login ou senha invalidos!"}, "dados": {'.$outp.'}}';
                
            }
		
        echo utf8_encode($outp); 
			
    }
}

?>
