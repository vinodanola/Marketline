<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Review extends CI_Controller {
    
    public function __construct(){
        parent::__construct();
        header('Content-Type: application/json');
    }
    
    #List
    
    public function get_list(){
        
        $search = $this->input->get('SEARCH') ? base64_encode($this->input->get('SEARCH')) : '';
        
        $cluster_cabang = $this->session->login['CLUSTER']['CABANG'] ? implode(',',$this->session->login['CLUSTER']['CABANG']) : '';
        
        $f =    '?MS_WILAYAH_ID='.$this->input->get('MS_WILAYAH_ID').
                '&MS_KODE_CABANG='.$this->input->get('MS_KODE_CABANG').
                '&MS_KODE_UNIT='.$this->input->get('MS_KODE_UNIT').
                '&PAGE='.$this->input->get('PAGE').
                '&LIMIT='.$this->input->get('LIMIT').
                '&SEARCH='.$search.
                '&CLUSTER_CABANG='.$cluster_cabang
                ;
        
        get_api($this->config->item('baseAPI').'review/list/'.$f);
        
    }
    
    #All Data
    
    public function get_alldata(){
        
        get_api($this->config->item('baseAPI').'review/all_data/'.$this->input->get('id'));
        
    }
    
    public function post_alldata(){
        
		$p = json_decode(file_get_contents('php://input'), TRUE);
                
        $p['RV_PENJUALAN_SKENARIO_3'] = $p['SK3_SKENARIO_PERCENTAGE'];
        $p['RV_RCR_REKOMENDASI_PINJAMAN_YANG_DIREOMENDASI'] = $p['RCR_REKOMENDASI_PINJAMAN_YANG_DIREOMENDASI'];
        $p['RV_RCR_REKOMENDASI_BUNGA'] = $p['RCR_REKOMENDASI_BUNGA'];
        $p['RV_RCR_REKOMENDASI_TENOR'] = $p['RCR_REKOMENDASI_TENOR'];
        $p['RV_AMK_PERSEDIAAN_DOH_PROJ'] = $p['AMK_PERSEDIAAN_DOH_PROJ'];
        $p['RV_AMK_PIUTANG_DAGANG_DOH_PROJ'] = $p['AMK_PIUTANG_DAGANG_DOH_PROJ'];
        $p['RV_AMK_HUTANG_DAGANG_DOH_PROJ'] = $p['AMK_HUTANG_DAGANG_DOH_PROJ'];
        $p['RV_SCR_PLAFON_DIREKOMENDASIKAN'] = $p['SCR_PLAFON_DIREKOMENDASIKAN'];
        $p['RV_AMK_PROYEKSI_PERTUMBUHAN_OMSET'] = $p['AMK_PROYEKSI_PERTUMBUHAN_OMSET'];		
		
		$p['VARTABEL_NILAI_PASAR_TANAH_DIREKOMENDASIKAN'] = $p['NILAI_PASAR_TANAH_DIREKOMENDASIKAN'];		
        
		post_api($this->config->item('baseAPI').'review/set_rv',$p,'',TRUE);
		                       
    }
    
    #Note
    
    public function get_notelist(){
        
        get_api($this->config->item('baseAPI').'review/note/list/'.$this->input->get('id'));
        
    }
    
    public function get_noteid(){
        
        get_api($this->config->item('baseAPI').'review/note/id/'.$this->input->get('id'));
        
    }
    
    public function post_note(){
        
        $p = $this->input->post();
        
        post_api($this->config->item('baseAPI').'review/set_note',$p);
        
    }
    
    public function delete_note(){
        
        $p = $this->input->post();
        
        post_api($this->config->item('baseAPI').'review/delete_note/',$p);
        
    }
    
    #Agunan
    
    public function get_agunanlist(){
        
        get_api($this->config->item('baseAPI').'review/agunan/list/'.$this->input->get('id'));
        
    }
    
    #SID
    
    public function get_sidlist(){
        
        get_api($this->config->item('baseAPI').'review/sid/list/'.$this->input->get('id'));
        
    }
    
    #RCR
    
    public function get_analisasensitivitas(){
        
        get_api($this->config->item('baseAPI').'review/analisa_sensitivitas/'.$this->input->get('id'));
        
    }
    
    #Persyaratan Tambahan
    
    public function get_persyaratantambahanlist(){
        
        get_api($this->config->item('baseAPI').'review/persyaratantambahan/list/'.$this->input->get('id'));
        
    }
    
    public function get_persyaratantambahanid(){
        
        get_api($this->config->item('baseAPI').'review/persyaratantambahan/id/'.$this->input->get('id'));
        
    }
    
    public function post_persyaratantambahan(){
        
        $p = $this->input->post();
        
        post_api($this->config->item('baseAPI').'review/set_persyaratantambahan',$p);
        
    }
    
    public function delete_persyaratantambahan(){
        
        $p = $this->input->post();
        
        post_api($this->config->item('baseAPI').'review/delete_persyaratantambahan/',$p);
        
    }
    
    #Status
    
    public function post_submit(){
        
        $p = $this->input->post();
        
        post_api($this->config->item('baseAPI').'review/set_status',$p);
        
    }
    
    #Cek Dokumen
    
    public function get_cekdokumen(){
        
        get_api($this->config->item('baseAPI').'review/documents/id/'.$this->input->get('id'));
        
    }
    
    public function post_cekdokumen(){
        
        $p = json_decode(file_get_contents('php://input'), TRUE);
        
        post_api($this->config->item('baseAPI').'review/set_dokumen_cek',$p,'',TRUE);
        
    }
    
    #Request Dokumen
    
    public function post_requestdokumen(){
        
        $p = json_decode(file_get_contents('php://input'), TRUE);
        
        post_api($this->config->item('baseAPI').'review/set_request_dokumen',$p,'',TRUE);
        
    }
    
    public function get_requestdokumen(){
        
        get_api($this->config->item('baseAPI').'review/request_dokumen/id/'.$this->input->get('id'));
        
    }
    
    #Take Dokumen
    
    public function post_takeproposal(){
        
        $p = $this->input->post();
        
        post_api($this->config->item('baseAPI').'review/set_take_proposal',$p);
        
    }
    
    
}
