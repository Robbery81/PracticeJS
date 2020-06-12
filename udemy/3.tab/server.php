<?php
$_POST = json_decode(file_get_contents("php://input"), true); //ненужно при XMLHttpRequest запросе
echo var_dump($_POST);