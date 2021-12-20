<?php

try {
	require "config.php";
	

	if(!$conexao){
		echo "Não foi possivel conectar com Banco de Dados!";
	}		

	$query = $conexao->prepare('SELECT * FROM `produto` order by idproduto asc');

		$query->execute();

		$out = "[";

		while($result = $query->fetch()){
			if ($out != "[") {
				$out .= ",";
			}
			$out .= '{"codigo": "'.$result["idproduto"].'",';
			$out .= '"nome": "'.$result["nome_prod"].'",';
			$out .= '"quantidade": "'.$result["quantidade_prod"].'",';
			$out .= '"descricao": "'.$result["descricao_prod"].'",';
			$out .= '"foto": "'.$result["foto_prod"].'",';
			$out .= '"valor": "'.$result["valor_prod"].'",';
			$out .= '"status": "'.$result["status_prod"].'",';
			$out .= '"criacao": "'.$result["data_cadastro_prod"].'"}';
		}
		$out .= "]";
		echo utf8_encode($out);



} catch (Exception $e) {
	echo "Erro: ". $e->getMessage();
};
