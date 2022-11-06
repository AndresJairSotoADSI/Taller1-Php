<?php
    header("Access-Control-Allow-Origin: *");
    header('Content-Type: application/json; charset=utf-8');
    $_DATA = json_decode(file_get_contents("php://input"),true);

    class promedio{
        public $lista;

        public function __construct($lista){

            $this->lista = $lista;
        }
        public function masa():string{
            $lista = $this->lista;

            $contador= count($lista);
            $suma= array_sum($lista);

            return $suma/$contador;
    }
}

$lista = new promedio($_DATA);
echo($lista->masa());
?>