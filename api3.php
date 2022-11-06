<?php
    header("Access-Control-Allow-Origin: *");
    header('Content-Type: application/json; charset=utf-8');
    $_DATA = json_decode(file_get_contents("php://input"),true);
class promedio{
        public $sumaA;
        public $canA;
        public $sumaB;
        public $canB;
        public $sumaC;
        public $canC;

        public function __construct(int $sumaA,int $canA,int $sumaB,int $canB, int $sumaC,int $canC){
            $this->sumaA = $sumaA;
            $this->canA = $canA;
            $this->sumaB = $sumaB;
            $this->canB = $canB;
            $this->sumaC = $sumaC;
            $this->canC = $canC;
        }
        public function promedioF():string{

            $sumaA = $this->sumaA;
            $canA = $this->canA;
            $sumaB = $this->sumaB;
            $canB = $this->canB;
            $sumaC = $this->sumaC;
            $canC = $this->canC;

            $canA<1?$proA=0:$proA = $sumaA/$canA;
            $canB<1?$proB=0:$proB = $sumaB/$canB;
            $canC<1?$proC=0:$proC = $sumaC/$canC;

            if($proA>$proB && $proA>$proC){
                if($proB>$proC){
                    return "C";
                } else{
                    return "B";
                }
            } else if($proB>$proA && $proB>$proC){
                if($proA>$proC){
                    return "C";
                } else{
                    return "A";
                }
            } else if($proC>$proA && $proC>$proB){
                if($proA>$proB){
                    return "B";
                } else{
                    return "A";
                }
            } else{
                return "A, B, C";
            }
        }
    }
    $lista = new promedio(sumaA:$_DATA[0],canA:$_DATA[1],sumaB:$_DATA[2],canB:$_DATA[3],sumaC:$_DATA[4],canC:$_DATA[5]);
    echo($lista->promedioF());
?>