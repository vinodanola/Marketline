<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Produk extends CI_Controller {
    
    public function __construct(){
        parent::__construct();
        header('Content-Type: application/json');
    }
    
    public function post_produk(){
        
        $p = json_decode(file_get_contents('php://input'), TRUE);
        
        post_api($this->config->item('baseAPI').'produk/set_produk',$p,'',TRUE);
        
    }
    
    public function get_produkid(){
        
        get_api($this->config->item('baseAPI').'produk/get_produk_id/'.$this->input->get('id'));
        
    }
    
    public function get_produklist(){
        
        get_api($this->config->item('baseAPI').'produk/get_produk');
        
    }
    
    public function delete_produk(){
        
        $p = $this->input->post();
        
        post_api($this->config->item('baseAPI').'produk/delete_produk/',$p);
        
    }
    
    #Produk Kategori
    
    public function post_produkkategori(){
        
        $p = json_decode(file_get_contents('php://input'), TRUE);
        
        post_api($this->config->item('baseAPI').'produk/set_produk_kategori',$p,'',TRUE);
        
    }
    
    public function get_produkkategoriid(){
        
        get_api($this->config->item('baseAPI').'produk/get_produk_kategori/'.$this->input->get('id'));
        
    }
    
    #Produk Lokasi
    
    public function post_produklokasi(){
        
        $p = json_decode(file_get_contents('php://input'), TRUE);
        
        post_api($this->config->item('baseAPI').'produk/set_produk_lokasi',$p,'',TRUE);
        
    }
    
    public function get_produklokasiid(){
        
        get_api($this->config->item('baseAPI').'produk/get_produk_lokasi/'.$this->input->get('id'));
        
    }
    
    #Produk Scoring
    
    public function post_produkscoring(){
        
        $p = json_decode(file_get_contents('php://input'), TRUE);
        
        post_api($this->config->item('baseAPI').'produk/set_produk_scema',$p,'',TRUE);
        
    }
    
    public function get_produkscoringid(){
        
        get_api($this->config->item('baseAPI').'produk/get_produk_scema/'.$this->input->get('id'));
        
    }
    
}
