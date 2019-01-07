<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Globalclass extends CI_Controller {
    
    public function __construct(){
        parent::__construct();
        header('Content-Type: application/json');
    }
    
    public function get_laststatus(){
        
        get_api($this->config->item('baseAPI').'globalclass/last_status/'.$this->input->get('id'));
        
    }
    
    public function get_wilayah(){
        
        get_api($this->config->item('baseAPI').'globalclass/get_wilayah/'.$this->input->get('kd'));
        
    }
    
    public function set_status(){
        
        $p = $this->input->post();
        
        $p['DB_USER_APPROVAL'] = $this->session->login['USERNAME'];
        $p['IDSDM_APPROVAL'] = $this->session->login['ID_SDM'];
        
        post_api($this->config->item('baseAPI').'globalclass/set_status',$p);
        
    }
    
    public function get_bwmp(){
        
        get_api($this->config->item('baseBWMPApi').'listbwmp/'.$this->input->get('unit').'/'.$this->input->get('tipe_pembiayaan').'/'.$this->input->get('id_program'));
        
    }
	
    public function get_reviewer(){
        
        get_api($this->config->item('baseBWMPApi').'cluster_reviewer/'.$this->input->get('id_krw'));
        
    }	
    
    public function get_bwmp_deviasi(){
        
        get_api($this->config->item('baseBWMPApi').'listbwmp/'.$this->input->get('unit').'/deviasi');
        
    }
    
    public function set_bwmp(){
        
        $p = $this->input->post();
        
        post_api($this->config->item('baseAPI').'globalclass/set_bwmp',$p);
        
    }
    
    public function set_lkku_ulang(){
        
        $p = $this->input->post();
        
        post_api($this->config->item('baseAPI').'globalclass/set_lkku_ulang',$p);
        
    }
    
    public function get_dashboard_total_prospek(){
        
        get_api($this->config->item('baseAPI').'globalclass/get_total_prospek_dashboard');
        
    }
    
    public function get_dashboard_best_aom(){
        
        get_api($this->config->item('baseAPI').'globalclass/get_best_aom_dashboard');
        
    }
    
}