<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Report extends CI_Controller {

    public function __construct() {
        parent::__construct();
        header('Content-Type: application/json');
    }

    #List

    public function get_list() {
		
		$search = $this->input->get('SEARCH') ? base64_encode($this->input->get('SEARCH')) : '';

        $f = '?MS_WILAYAH_ID=' . $this->input->get('MS_WILAYAH_ID') .
                '&MS_KODE_CABANG=' . $this->input->get('MS_KODE_CABANG') .
                '&MS_KODE_UNIT=' . $this->input->get('MS_KODE_UNIT') .
                '&PAGE='.$this->input->get('PAGE').
                '&LIMIT='.$this->input->get('LIMIT').
                '&SEARCH='.$search
        ;

        get_api($this->config->item('baseAPI') . 'report/list/' . $f);
    }

    public function sp3u() {

        $f = $this->uri->segment(3);

        get_api($this->config->item('baseAPI') . 'report/surat_sp3u/' . $f);
    }

    public function lkku() {

        $f = $this->uri->segment(3);

        get_api($this->config->item('baseAPI') . 'report/lkku/' . $f);
    }
    
    public function scoring() {
        
        $f = $this->uri->segment(3);

        get_api($this->config->item('baseAPI') . 'report/scoring/' . $f);
        
    }
    
    public function mrpu() {
        
        $f = $this->uri->segment(3);

        get_api($this->config->item('baseAPI') . 'report/mrpu/' . $f);
        
    }
	
	public function post_history() {
            
        $data = $this->input->post();       
        
        post_api($this->config->item('baseAPI').'report/history_post',$data);
    }
	
	public function set_note_sp3u() {
        
        $data = $this->input->post();  

        post_api($this->config->item('baseAPI').'report/report_note_post',$data);
        
    }	
	
	public function get_note_sp3u() {
        
        $f = $this->uri->segment(3);

        get_api($this->config->item('baseAPI') . 'report/report_note/' . $f);			
        
    }

}
