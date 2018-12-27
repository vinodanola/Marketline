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
    
}

