<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Prospek_m extends CI_Model {
    
    public function __construct(){
        parent::__construct();
    }
    
    public function select_individu($d=array()){
        
        return $this->db->query('dbo.PR_GET_INDIVIDU_BY_ID 1');
        
    }
    
}
