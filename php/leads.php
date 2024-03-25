<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: *');

$host = "mysql.tenhafibra.com.br";
$usuario = "tenhafibra";
$senha = "Es986532";
$banco_de_dados = "tenhafibra";

$conexao = mysqli_connect($host, $usuario, $senha, $banco_de_dados);
mysqli_set_charset($conexao, 'utf8mb4');

if (!$conexao) {
    die("Conexão falhou: " . mysqli_connect_error());
}

$dados_post = json_decode(file_get_contents("php://input"), true);

$dataInicio = mysqli_real_escape_string($conexao, $dados_post['dataInicio']);
$dataFim = mysqli_real_escape_string($conexao, $dados_post['dataFim']);

//Executa a consulta
$sql = "SELECT * FROM leads WHERE data_lead BETWEEN '$dataInicio' AND '$dataFim'";
$result = mysqli_query($conexao, $sql);

$lista = []; 

while($row = mysqli_fetch_assoc($result)){
	$lista[] = $row;
}

echo json_encode($lista, JSON_UNESCAPED_UNICODE);

mysqli_close($conexao);
?>
