<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Btb extends CI_Controller {
    
    public function __construct(){
        parent::__construct();
        header('Content-Type: application/json');
    }
    
    public function get_kombinasi(){
        
        get_api($this->config->item('baseAPI').'btb/kombinasi/?KATEGORI_ID='.$this->input->get('KATEGORI_ID').'&TIPE_BANGUNAN_ID='.$this->input->get('TIPE_BANGUNAN_ID').'&JENIS_BANGUNAN_ID='.$this->input->get('JENIS_BANGUNAN_ID').'&MATERIAL_ID='.$this->input->get('MATERIAL_ID'));
        
    }
    
    public function post_all(){
        
//        $p = $this->input->post();
        $p = json_decode(file_get_contents('php://input'), TRUE);
        
        $p['TANGGAL_PENILAIAN']=format_date_default($p['TANGGAL_PENILAIAN']);
        
//        echo json_encode($p); exit();
        
        post_api($this->config->item('baseAPI').'btb/set_all',$p,'',TRUE);
        
    }
    
    public function get_list(){
        
        get_api($this->config->item('baseAPI').'btb/list/'.$this->input->get('id'));
        
    }
    
    public function get_allById(){
        
        get_api($this->config->item('baseAPI').'btb/byId/'.$this->input->get('id'));
        
    }
    
    public function delete_by_id(){
        
        post_api($this->config->item('baseAPI').'btb/delete',$this->input->post());
        
    }
    
    public function get_parameter(){
        
        get_api($this->config->item('baseAPI').'btb/parameter/'.$this->input->get('id'));
        
    }
    
    
}