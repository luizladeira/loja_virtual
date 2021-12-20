<?php

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

date_default_timezone_set('America/Sao_Paulo');

$data = file_get_contents("php://input");
$objData = json_decode($data);

$nome = $objData->nome;
$qtd = $objData->qtd;
//$foto = $objData->foto;
$valor = $objData->valor;
$descricao = $objData->descricao;
//$idempresa = $objData->idempresa;
//$idusuario = $objData->idusuario;

$nome = stripslashes($nome);
$qtd = stripslashes($qtd);
//$foto = stripslashes($foto);
$valor = stripslashes($valor);
$descricao = stripslashes($descricao);
//$status = stripslashes($status);
//$idempresa = stripslashes($idempresa);
//$idusuario = stripslashes($idusuario);

$nome = trim($nome);
$qtd = trim($qtd);
//$foto = trim($foto);
$valor = trim($valor);
$descricao = trim($descricao);
//$idempresa = trim($idempresa);
//$idusuario = trim($idusuario);

$dados; 

//print_r('nome: '.$nome.'|| qtd: '.$qtd.' || valor: '.$valor.' || descricao: '.$descricao);

require_once 'config.php';



if($conexao){

        $Sql = "INSERT INTO `db_catalago`.`produto` (`nome_prod`, `descricao_prod`, `quantidade_prod`, `foto_prod`, `valor_prod`, `status_prod`, `data_cadastro_prod`, `empresa_idempresa`, `usuario_idusuario`) 
VALUES ('".$nome."','".$descricao."','".$qtd."','img_produtos/esgotado.jpg','".$valor."', 'Ativo', '', '1', '1');";

    $query = $conexao->prepare($Sql);
    $query->execute();

    echo '<br/> dados inseridos com sucesso';
    echo json_encode($query);
    //echo json_encode($query);
   
}else{
   
      $dados = array('mensage' => "Não foi possivel iserir os dados! Tente novamente mais tarde.");
      echo json_encode($dados);
};

?>