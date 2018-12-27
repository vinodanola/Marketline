<?php defined('BASEPATH') OR exit('No direct script access allowed');

class FDE extends CI_Controller {
    
    public function __construct(){
        parent::__construct();
        header('Content-Type: application/json');
    }
    
    #List
    
    public function get_list(){
        
        $search = $this->input->get('SEARCH') ? base64_encode($this->input->get('SEARCH')) : '';
        
        $f =    '?MS_WILAYAH_ID='.$this->input->get('MS_WILAYAH_ID').
                '&MS_KODE_CABANG='.$this->input->get('MS_KODE_CABANG').
                '&MS_KODE_UNIT='.$this->input->get('MS_KODE_UNIT').
                '&PAGE='.$this->input->get('PAGE').
                '&LIMIT='.$this->input->get('LIMIT').
                '&SEARCH='.$search
                ;
        
        get_api($this->config->item('baseAPI').'fde/list/'.$f);
        
    }
    
    #All data
    
    public function get_alldata(){
        
        get_api($this->config->item('baseAPI').'fde/data/'.$this->input->get('id'));
        
    }
    
    public function post_alldata(){
        
        $p = $this->input->post();
        
        post_api($this->config->item('baseAPI').'fde/set_global/',$p);
        
    }
    
    #Virtual Account
    
    public function get_virtualaccountlist(){
        
        get_api($this->config->item('baseAPI').'fde/virtual_account/list/'.$this->input->get('id'));
        
    }
    
    public function get_virtualaccountid(){
        
        get_api($this->config->item('baseAPI').'fde/virtual_account/id/'.$this->input->get('id'));
        
    }
    
    public function post_virtualaccount(){
        
        $p = $this->input->post();
        
        post_api($this->config->item('baseAPI').'fde/set_virtual_account/',$p);
        
    }
    
    public function delete_virtualaccount(){
        
        $p = $this->input->post();
        
        post_api($this->config->item('baseAPI').'fde/delete_virtual_account/',$p);
        
    }
    
    #Produk Asuransi
    
    public function get_produkasuransilist(){
        
        get_api($this->config->item('baseAPI').'fde/produk_asuransi/list/'.$this->input->get('id'));
        
    }
    
    public function get_produkasuransiid(){
        
        get_api($this->config->item('baseAPI').'fde/produk_asuransi/id/'.$this->input->get('id'));
        
    }
    
    public function post_produkasuransi(){
        
        $p = $this->input->post();
        
        post_api($this->config->item('baseAPI').'fde/set_produk_asuransi/',$p);
        
    }
    
    public function delete_produkasuransi(){
        
        $p = $this->input->post();
        
        post_api($this->config->item('baseAPI').'fde/delete_produk_asuransi/',$p);
        
    }
    
    #Asuransi LPK
    
    public function get_asuransilpklist(){
        
        get_api($this->config->item('baseAPI').'fde/asuransi_lpk/list/'.$this->input->get('id'));
        
    }
    
    public function get_asuransilpkid(){
        
        get_api($this->config->item('baseAPI').'fde/asuransi_lpk/id/'.$this->input->get('id'));
        
    }
    
    public function post_asuransilpk(){
        
        $p = $this->input->post();
        
        post_api($this->config->item('baseAPI').'fde/set_asuransi_lpk/',$p);
        
    }
    
    public function delete_asuransilpk(){
        
        $p = $this->input->post();
        
        post_api($this->config->item('baseAPI').'fde/delete_asuransi_lpk/',$p);
        
    }
    
    #Submit
    
    public function submit(){
        
        $p = $this->input->post();
        
        post_api($this->config->item('baseAPI').'mismms/sync_data_prospek',$p);
        
    }
    
    #Banding
    
    public function post_banding(){
        
        $p = $this->input->post();			
        
        if (isset($_FILES['BD_FILE']) && $_FILES['BD_FILE']['tmp_name'])
            postWFile_api($this->config->item('baseAPI').'fde/set_banding',$p,'BD_FILE');
        else {
            unset($p['BD_FILE']);
            post_api($this->config->item('baseAPI').'fde/set_banding',$p);
        }
        
    }
    
    #History Approval
    
    public function get_historyapproval(){
        
        get_api($this->config->item('baseAPI').'fde/history_approval/'.$this->input->get('id'));
        
    }
   
    
}