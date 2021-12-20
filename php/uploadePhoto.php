<?php 

header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Methods: GET, POST, PUT, PATCH, POST, DELETE, OPTIONS");
header('Access-Control-Max-Age: 86400');
header("Access-Control-Expose-Headers: Content-Length, X-JSON");
header("Access-Control-Allow-Headers: *");

       $fotobase64 = file_get_contents('php://input');
       $obj =  json_decode($fotobase64);
       $fileEncode =  $obj->foto;


        if (!$fileEncode) {
            return false;
        }
        $namePhoto = md5(uniqid(rand(), true));

        $nameFile = $namePhoto.'.png';
        $pathUpload = "img_produtos/";

        $binaryData = base64_decode($fileEncode, true);

        if (!$binaryData) {
            $encodeData = base64_encode(file_get_contents($fileEncode));
            $binaryData = base64_decode($encodeData);
        }
   
        return file_put_contents($pathUpload . $nameFile, $binaryData);

        
    ?>