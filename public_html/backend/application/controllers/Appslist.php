<?php defined('BASEPATH') OR exit('No direct script access allowed');

class AppsList extends CI_Controller {
    
    public function __construct(){
        parent::__construct();
        header('Content-Type: application/json');
    }
    
    public function get_list(){
        
        $J = [
                [
                    'name' => 'Market Line',
                    'url' => 'http://10.61.3.49:8089/#/login',
                    'logo' => '',
                    'description' => 'Prospek, Survey, Review, Sync to MMS'
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
                    'name' => 'Agunan',
                    'url' => 'http://192.168.10.180/Agunan',
                    'logo' => '',
                    'description' => 'Mutasi Agunan, Pinjam Agunan, Pelepasan Agunan, Retaksasi Agunan, Stock Opname'
                ],
        ];
        
        echo json_encode($J,JSON_PRETTY_PRINT);
        
    }
    
}
    
