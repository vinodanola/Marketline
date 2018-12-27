<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Proposal extends CI_Controller {
    
    public function __construct(){
        parent::__construct();
        header('Content-Type: application/json');
    }
    
    public function get_proposallist(){
        
        $g = $this->input->get();
        
        if ($this->session->login['POSISI_NAMA'] == 'AOM' || $this->session->login['POSISI_NAMA'] == 'SUPERADMIN')
            $ID_SDM = $this->session->login['ID_SDM'];
        else
            $ID_SDM = 0;
        
        if ($this->session->login['POSISI_NAMA'] == 'SUPERADMIN') {
            $MS_WILAYAH_ID  = $g['MS_WILAYAH_ID'];
            $MS_KODE_CABANG = $g['MS_KODE_CABANG'];
            $MS_KODE_UNIT   = $g['MS_KODE_UNIT'];
        } else {
            $MS_WILAYAH_ID  = $this->session->login['WILAYAH'];
            $MS_KODE_CABANG = $this->session->login['CABANG_KODE'];
            $MS_KODE_UNIT   = $this->session->login['UNIT_KODE'];
        }
        
        $search = $g['SEARCH'] ? base64_encode($g['SEARCH']) : '';
        
        get_api($this->config->item('baseAPI').'prospek/get_wizard/?DB_ID_SDM_AOM='.$ID_SDM.'&PAGE='.$g['PAGE'].'&LIMIT='.$g['LIMIT'].'&MS_WILAYAH_ID='.$MS_WILAYAH_ID.'&MS_KODE_CABANG='.$MS_KODE_CABANG.'&MS_KODE_UNIT='.$MS_KODE_UNIT.'&SEARCH='.$search);
        
    }
    
    public function get_proposalid(){
        
        $g = $this->input->get();
        
        $search = $g['SEARCH'] ? base64_encode($g['SEARCH']) : '';
        
        get_api($this->config->item('baseAPI').'globalclass/get_log_status/?DB_PROSPEK_ID='.$g['DB_PROSPEK_ID'].'&PAGE='.$g['PAGE'].'&LIMIT='.$g['LIMIT'].'&SEARCH='.$search);
        
    }
    
}
