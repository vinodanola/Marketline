<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Portofolio extends CI_Controller {

    public function __construct() {
        parent::__construct();
        header('Content-Type: application/json');
    }

    #List

    public function get_list() {
		
		$search = $this->input->get('SEARCH') ? base64_encode($this->input->get('SEARCH')) : '';

        $f = '?ID_SDM=' . $this->input->get('ID_SDM') .
				'&MS_KODE_CABANG=' . $this->input->get('MS_KODE_CABANG') .
                '&MS_KODE_UNIT=' . $this->input->get('MS_KODE_UNIT') .
                '&PAGE='.$this->input->get('PAGE').
                '&LIMIT='.$this->input->get('LIMIT').
                '&SEARCH='.$search
        ;

        get_api($this->config->item('baseAPI') . 'portofolio/list/' . $f);
    }	
	
	public function get_count_aom() {		
        get_api($this->config->item('baseAPI') . 'portofolio/count_aom?ID_SDM=' . $this->input->get('ID_SDM').'&MS_KODE_UNIT='. $this->input->get('MS_KODE_UNIT') );
    }	

}
