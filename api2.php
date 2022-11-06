<?php
    header('Access-Control-Allow-Origin: *');
    header('Content-Type: application/json; charset=utf-8');
    $_DATA = json_decode(file_get_contents("php://input"),true);
    class galeria{
        public $codigo;
        public $cantidad;

        public function __construct(int $codigo,int $cantidad){
            $this->codigo = $codigo;
            $this->cantidad = $cantidad;
        }

        public function codigos(){
            $codigo = match($this->codigo){
                 1 => $codigo=1289900,
                 2 => $codigo=829900,
                 3 => $codigo=299900,
                 4 => $codigo=7819900,
                 5 => $codigo=312200,
                 6 => $codigo=69900,
                 7 => $codigo=83900,
                 8 => $codigo=1673000,
                 9 => $codigo=1639900,
                 10 => $codigo=388700,
                default => $codigo="Ingrese un codigo correcto"
            };
            return $codigo;
        }

        public function pagar():string{
            $codigo = $this->codigos();
            if($codigo == "Ingrese un codigo correcto"){
                return $codigo;
            } else{   
                $pagar = $codigo*$this->cantidad;
                return $pagar;
            }
        }
    }
    $lista = new galeria(codigo:$_DATA['codigo'],cantidad:$_DATA['cantidad']);
    echo($lista->pagar());
?>