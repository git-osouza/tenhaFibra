<?php

$host = "mysql.tenhafibra.com.br";
$usuario = "tenhafibra";
$senha = "Es986532";
$banco_de_dados = "tenhafibra";

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: *');

$metodo = $_SERVER['REQUEST_METHOD'];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $conexao = mysqli_connect($host, $usuario, $senha, $banco_de_dados);

    if (!$conexao) {
        die("Conexão falhou: " . mysqli_connect_error());
    }

    $dados_post = json_decode(file_get_contents("php://input"), true);

    $email = mysqli_real_escape_string($conexao, $dados_post['email']);
    $senha = mysqli_real_escape_string($conexao, $dados_post['senha']);

    $consulta = mysqli_query($conexao, "SELECT * FROM users WHERE usuario = '$email' AND senha = '$senha'");

    if (mysqli_num_rows($consulta) > 0) {
        http_response_code(200);
        echo json_encode(["mensagem" => "Autenticado com sucesso"]);
    } else {
        http_response_code(401);
        echo json_encode(["erro" => "Usu�rio ou senha inv�lidos"]);
    }

    mysqli_free_result($consulta);

    if ($conexao) {
      mysqli_close($conexao);
    }
}

?>
				