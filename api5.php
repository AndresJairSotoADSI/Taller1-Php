<?php
    header("Access-Control-Allow-Origin: *");
    header('Content-Type: application/json; charset=utf-8');
    $_DATA = json_decode(file_get_contents("php://input"),true);

    class pago{
        public function __construct($lista){

        }

        public function ventas():string{
        }
    }
?>