<?php defined('BASEPATH') OR exit('No direct script access allowed');

class AppsList extends CI_Controller {
    
    public function __construct(){
        parent::__construct();
        header('Content-Type: application/json');
    }
    
    public function get_list(){
        
        $J = [
                [
                    'name' => 'MarketLine',
                    'url' => 'http://10.61.3.49:8089/#/login',
                    'logo' => '',
                    'description' => ''
                ],
                [
                    'name' => 'Manajemen Produk & BWMP',
                    'url' => 'http://10.61.3.49/BWMP3/public',
                    'logo' => '',
                    'description' => ''
                ],
//                [
//                    'name' => 'Scoring',
//                    'url' => 'http://mbahdukun.pnm.co.id/Scoring',
//                    'logo' => '',
//                    'description' => ''
//                ],
                [
                    'name' => 'Simapan',
                    'url' => 'http://10.61.3.49/simapan3.1/public',
                    'logo' => '',
                    'description' => ''
                ],
                [
                    'name' => 'Operasional',
                    'url' => 'http://10.61.3.48:82/OPS_ITD',
                    'logo' => '',
                    'description' => ''
                ],
                [
                    'name' => 'Mangan',
                    'url' => 'http://192.168.10.180/Agunan',
                    'logo' => '',
                    'description' => ''
                ],
        ];
        
        echo json_encode($J,JSON_PRETTY_PRINT);
        
    }
    
}
    
