<?php

$host = "mysql.tenhafibra.com.br";
$usuario = "tenhafibra";
$senha = "Es986532";
$banco_de_dados = "tenhafibra";

$conexao = mysqli_connect($host, $usuario, $senha, $banco_de_dados);

if (!$conexao) {
    die("Conexão falhou: " . mysqli_connect_error());
}

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: *');

$metodo = $_SERVER['REQUEST_METHOD'];


if ($metodo === 'POST') {
    $dados_post = json_decode(file_get_contents("php://input"), true);

    $nome_completo = mysqli_real_escape_string($conexao, $dados_post['nome_completo']);
    $cpf = mysqli_real_escape_string($conexao, $dados_post['cpf']);
    $telefone = mysqli_real_escape_string($conexao, $dados_post['telefone']);
    $whatsapp = mysqli_real_escape_string($conexao, $dados_post['whatsapp']);
    $cep = mysqli_real_escape_string($conexao, $dados_post['cep']);
    $endereco = mysqli_real_escape_string($conexao, $dados_post['endereco']);
    $numero = mysqli_real_escape_string($conexao, $dados_post['numero']);
    $bairro = mysqli_real_escape_string($conexao, $dados_post['bairro']);
    $complemento = mysqli_real_escape_string($conexao, $dados_post['complemento']);
    $cidade = mysqli_real_escape_string($conexao, $dados_post['cidade']);
    $uf = mysqli_real_escape_string($conexao, $dados_post['uf']);
    $plano = mysqli_real_escape_string($conexao, $dados_post['plano']);
    $turno_instalacao = mysqli_real_escape_string($conexao, $dados_post['turno_instalacao']);
    $data_lead = mysqli_real_escape_string($conexao, $dados_post['data_lead']);
    $email = mysqli_real_escape_string($conexao, $dados_post['email']);

    $inserir = mysqli_prepare($conexao, "INSERT INTO leads (
        nome_completo, cpf, telefone, whatsapp,
        cep, endereco, numero, bairro, complemento,
        cidade, uf, plano, turno_instalacao, data_lead, email
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

    mysqli_stmt_bind_param($inserir, "sssssssssssssss", $nome_completo, $cpf, $telefone, $whatsapp,
        $cep, $endereco, $numero, $bairro, $complemento,
        $cidade, $uf, $plano, $turno_instalacao, $data_lead, $email);

    mysqli_set_charset($conexao, 'utf8');
    $sucesso = mysqli_stmt_execute($inserir);

    if ($sucesso) {
        echo json_encode(["mensagem" => "Dados inseridos com sucesso"]);
    } else {
        echo json_encode(["erro" => "Erro ao inserir dados: " . mysqli_error($conexao)]);
    }

    mysqli_stmt_close($inserir);
}

mysqli_close($conexao);

?>
				