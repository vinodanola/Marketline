<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Usermanagement extends CI_Controller {
    
    public function __construct(){
        parent::__construct();
        header('Content-Type: application/json');
    }
    
    #Role
    
    public function post_role(){
        
        $p = json_decode(file_get_contents('php://input'), TRUE);
        
        post_api($this->config->item('baseAPI').'user_management/set_role',$p,'',TRUE);
        
    }
    
    public function get_role(){
        
        get_api($this->config->item('baseAPI').'user_management/role_list');
        
    }
    
    public function get_roleid(){
        
        get_api($this->config->item('baseAPI').'user_management/role/?group_alias='. $this->input->get('group_alias'));
        
    }
    
    public function delete_role(){
        
        $p = json_decode(file_get_contents('php://input'), TRUE);
        
        post_api($this->config->item('baseAPI').'user_management/delete_role',$p,'',TRUE);
        
    }
    
    
    #Menu
    
    public function get_menu(){
        
        get_api($this->config->item('baseAPI').'user_management/menu');
        
    }
    
    #Group
    
    public function get_group_available(){
        
        get_api($this->config->item('baseAPI').'user_management/group_available');
        
    }
	
	
    #user alternate
	
    public function get_alternate_list(){        
		
        $g = $this->input->get();

        // var_dump($g);die();
        
        $MS_KODE_CABANG = $this->session->login['CABANG_KODE'] ? $this->session->login['CABANG_KODE'] : $g['MS_KODE_CABANG'];
        $MS_KODE_UNIT   = $this->session->login['UNIT_KODE'] ? $this->session->login['UNIT_KODE'] : $g['MS_KODE_UNIT'];
        
        $search = $g['SEARCH'] ? base64_encode($g['SEARCH']) : '';
        
        get_api($this->config->item('baseAPI').'user_management/alternate_list?PAGE='.$g['PAGE'].'&LIMIT='.$g['LIMIT'].'&MS_KODE_CABANG='.$MS_KODE_CABANG.'&MS_KODE_UNIT='.$MS_KODE_UNIT.'&SEARCH='.$search);
        
    }
    
    public function get_sso_list(){        
		
        $g = $this->input->get();

        // var_dump($g);die();
        
        $MS_KODE_CABANG = $this->session->login['CABANG_KODE'] ? $this->session->login['CABANG_KODE'] : $g['MS_KODE_CABANG'];
        $MS_KODE_UNIT   = $this->session->login['UNIT_KODE'] ? $this->session->login['UNIT_KODE'] : $g['MS_KODE_UNIT'];
        
        $search = $g['SEARCH'] ? base64_encode($g['SEARCH']) : '';
        
        get_api($this->config->item('baseAPI').'user_management/user_sso_list?PAGE='.$g['PAGE'].'&LIMIT='.$g['LIMIT'].'&MS_KODE_CABANG='.$MS_KODE_CABANG.'&MS_KODE_UNIT='.$MS_KODE_UNIT.'&SEARCH='.$search);
        
    }
	
    public function set_user_alternate(){
        
        $p = $this->input->post();				
        
        post_api($this->config->item('baseAPI').'user_management/set_user_alternate',$p);
        
    }
	
    public function delete_user_alternate(){
        
        $p = $this->input->post();				
        
        post_api($this->config->item('baseAPI').'user_management/delete_user_alternate',$p);
        
    }	
    
}

