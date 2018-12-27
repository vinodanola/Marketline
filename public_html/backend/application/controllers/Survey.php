<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Survey extends CI_Controller {
    
    public function __construct(){
        parent::__construct();
        header('Content-Type: application/json');
    }
    
    public function get_alldata(){
        
        @set_time_limit(300);
        
        get_api($this->config->item('baseAPI').'survey/get_object_scoring/'.$this->input->get('id'));
        
    }
    
    public function post_alldata(){
        
        $p = $this->input->post();
        
        if (isset($p['MS_MENGENAL_ULAMM_ID']))
            $p['MS_MENGENAL_ULAMM_ID'] = cleanMultiAwr($p['MS_MENGENAL_ULAMM_ID']);
        
        if (isset($p['MS_REPUTASI_ID']))
            $p['MS_REPUTASI_ID'] = cleanMultiAwr($p['MS_REPUTASI_ID']);
        
        if (isset($p['MS_HARTA_ID']))
            $p['MS_HARTA_ID'] = cleanMultiAwr($p['MS_HARTA_ID']);
        
        post_api($this->config->item('baseAPI').'survey/set_survey_individu',$p);
        
    }
    
    public function get_list(){
        
        $g = $this->input->get();
        
        if ($this->session->login['POSISI_NAMA'] == 'AOM')
            $ID_SDM = $this->session->login['ID_SDM'];
        else
            $ID_SDM = 0;
        
//        if ($this->session->login['POSISI_NAMA'] == 'SUPERADMIN') {
//            $MS_WILAYAH_ID  = $g['MS_WILAYAH_ID'];
//            $MS_KODE_CABANG = $g['MS_KODE_CABANG'];
//            $MS_KODE_UNIT   = $g['MS_KODE_UNIT'];
//        } else {
//            $MS_WILAYAH_ID  = $this->session->login['WILAYAH'];
//            $MS_KODE_CABANG = $this->session->login['CABANG_KODE'];
//            $MS_KODE_UNIT   = $this->session->login['UNIT_KODE'];
//        }
        
        $MS_WILAYAH_ID  = $this->session->login['WILAYAH'] ? $this->session->login['WILAYAH'] : $g['MS_WILAYAH_ID'];
        $MS_KODE_CABANG = $this->session->login['CABANG_KODE'] ? $this->session->login['CABANG_KODE'] : $g['MS_KODE_CABANG'];
        $MS_KODE_UNIT   = $this->session->login['UNIT_KODE'] ? $this->session->login['UNIT_KODE'] : $g['MS_KODE_UNIT'];
        
        $search = $g['SEARCH'] ? base64_encode($g['SEARCH']) : '';
        
        get_api($this->config->item('baseAPI').'survey/get_list_all/?DB_ID_SDM_AOM='.$ID_SDM.'&MS_WILAYAH_ID='.$MS_WILAYAH_ID.'&MS_KODE_CABANG='.$MS_KODE_CABANG.'&MS_KODE_UNIT='.$MS_KODE_UNIT.'&PAGE='.$g['PAGE'].'&LIMIT='.$g['LIMIT'].'&SEARCH='.$search);
        
    }
    
    public function get_listperid(){
        
        get_api($this->config->item('baseAPI').'survey/get_list/'.$this->input->get('id'));
        
    }	
    
    /* Informasi Survey */
    
//    public function post_informasisurvey(){
//        
//        $p = $this->input->post();
//        
//    }
//    
//    public function get_informasisurvey(){
//        
//        echo json_encode(['rencana_plafond' => "123213", 'jangka_waktu' => "12"]);
//        
//    }
    
    /* Alamat */
    
//    public function post_alamat(){
//        
//        $p = $this->input->post();
//        
//        post_api($this->config->item('baseAPI').'survey/',$p);
//        
//    }
//    
//    public function get_alamatid(){
//        
//        get_api($this->config->item('baseAPI').'survey/get_');
//        
//    }
//    
//    public function get_alamatlist(){
//        
//        get_api($this->config->item('baseAPI').'survey/',$this->input->get('id'));
//        
//    }
//    
//    public function delete_alamat(){
//        
//        $p = $this->input->post();
//        
//        post_api($this->config->item('baseAPI').'survey/',$p);
//        
//    }
    
    /* Kunjungan Usaha */
    
    public function post_kunjunganusaha(){
        
        $p = $this->input->post();
        
        $p['SV_TGL_SURVEY'] = format_date_default($p['SV_TGL_SURVEY']);
        
        post_api($this->config->item('baseAPI').'survey/set_kunjungan_usaha',$p);
        
    }
    
    public function get_kunjunganusahaid(){
        
        get_api($this->config->item('baseAPI').'survey/get_kunjungan_usaha_by_id/'.$this->input->get('id'));
        
    }
    
    public function get_kunjunganusahalist(){
        
        get_api($this->config->item('baseAPI').'survey/get_kunjungan_usaha_by_prospek/'.$this->input->get('id'));
        
    }
    
    public function delete_kunjunganusaha(){
        
        $p = $this->input->post();
        
        post_api($this->config->item('baseAPI').'survey/delete_kunjungan_usaha',$p);
        
    }
    
    /* Profile & Karakter */
    
//    public function post_profilekarakter(){
//        
//        $p = $this->input->post();
//        
//        post_api($this->config->item('baseAPI').'survey/',$p);
//        
//    }
//    
//    public function get_profilekarakter(){
//        
//        get_api($this->config->item('baseAPI').'survey/',$this->input->get('id'));
//        
//    }
    
    /* Sumber Informasi Reputasi */
    
    public function post_sumberinformasireputasi(){
        
        $p = $this->input->post();
        
        post_api($this->config->item('baseAPI').'survey/set_reputasi',$p);
        
    }
    
    public function get_sumberinformasireputasiid(){
        
        get_api($this->config->item('baseAPI').'survey/get_reputasi_by_id/'.$this->input->get('id'));
        
    }
    
    public function get_sumberinformasireputasilist(){
        
        get_api($this->config->item('baseAPI').'survey/get_reputasi_by_prospek/'.$this->input->get('id'));
        
    }
    
    public function delete_sumberinformasireputasi(){
        
        $p = $this->input->post();
        
        post_api($this->config->item('baseAPI').'survey/delete_reputasi',$p);
        
    }
    
    /* Dokumen */
    
    public function post_dokumen(){
        
        $p = $this->input->post();
        
        if (isset($_FILES['PR_DOKUMEN']) && $_FILES['PR_DOKUMEN']['tmp_name'])
            postWFile_api($this->config->item('baseAPI').'prospek/set_individu_dokumen',$p,'PR_DOKUMEN');
        else {
            unset($p['PR_DOKUMEN']);
            post_api($this->config->item('baseAPI').'prospek/set_individu_dokumen',$p);
        }
        
    }
    
//    public function get_dokumenpembiayaanid(){
//        
//        get_api($this->config->item('baseAPI').'survey/get_dokumen_by_prospek');
//        
//    }
    
    public function get_dokumenlist(){        
	
        get_api($this->config->item('baseAPI').'survey/get_dokumen_by_prospek/'.$this->input->get('id').'/'.$this->input->get('header'));
        
    }
    
//    public function delete_dokumenpembiayaan(){
//        
//        $p = $this->input->post();
//        
//        post_api($this->config->item('baseAPI').'survey/',$p);
//        
//    }
    
    /* Kapasitas Usaha */
    
//    public function post_kapasitasusaha(){
//        
//        $p = $this->input->post();
//        
//        post_api($this->config->item('baseAPI').'survey/',$p);
//        
//    }
    
//    public function get_kapasitasusaha(){
//        
//        get_api($this->config->item('baseAPI').'survey/',$this->input->get('id'));
//        
//    }
    
    /* Aktifitas Rekening Bank */
    
    public function post_aktifitasrekeningbank(){
        
        $p = $this->input->post();
        
        post_api($this->config->item('baseAPI').'survey/set_aktivitas_rekening',$p);
        
    }
    
    public function get_aktifitasrekeningbankid(){
        
        get_api($this->config->item('baseAPI').'survey/get_rek_by_id/'.$this->input->get('id'));
        
    }
    
    public function get_aktifitasrekeningbanklist(){
        
        get_api($this->config->item('baseAPI').'survey/get_rek_by_prospek/'.$this->input->get('id'));
        
    }
    
    public function delete_aktifitasrekeningbank(){
        
        $p = $this->input->post();
        
        post_api($this->config->item('baseAPI').'survey/delete_aktivitas_rek',$p);
        
    }
    
    /* Jenis Usaha */
    
    public function post_jenisusaha(){
        
        $p = $this->input->post();
        
        post_api($this->config->item('baseAPI').'survey/set_usaha',$p);
        
    }
    
    public function get_jenisusahaid(){
        
        get_api($this->config->item('baseAPI').'survey/get_usaha_by_prospek_usaha/'.$this->input->get('id'));
        
    }
    
    public function get_jenisusahalist(){
        
        get_api($this->config->item('baseAPI').'prospek/get_usaha_individu/'.$this->input->get('id'));
        
    }
    
    public function delete_jenisusaha(){
        
        $p = $this->input->post();
        
        post_api($this->config->item('baseAPI').'prospek/delete_usaha',$p);
        
    }
    
    public function post_jenisusahautama(){
        
        $p = $this->input->post();
        
        post_api($this->config->item('baseAPI').'survey/update_usaha_utama',$p);
        
    }
    
    /* Keuangan */
    
    /* Rincian Pinjaman */
    
    public function post_rincianpinjaman(){
        
        $p = $this->input->post();
        
        post_api($this->config->item('baseAPI').'survey/set_pinjaman_lain',$p);
        
    }
    
    public function get_rincianpinjamanid(){
        
        get_api($this->config->item('baseAPI').'survey/get_pinjaman_lain_by_id/'.$this->input->get('id'));
        
    }
    
    public function get_rincianpinjamanlist(){
        
        get_api($this->config->item('baseAPI').'survey/get_pinjaman_lain_by_prospek/'.$this->input->get('id').'/?FLAG='.$this->input->get('flag'));
        
    }
    
    public function delete_rincianpinjaman(){
        
        $p = $this->input->post();
        
        post_api($this->config->item('baseAPI').'survey/delete_pinjaman_lain',$p);
        
    }
    
    /* Angsuran */
    
    public function get_jadwalangsuran(){
        
        get_api($this->config->item('baseAPI').'3r/get_jadwal_angsuran/'.$this->input->get('id'));
	
    }
	
    public function post_jadwal(){
        
        $p = $this->input->post();
        
        postWFile_api($this->config->item('baseAPI').'3r/upload_jadwal',$p,'fileToUpload');
		
    }
    
    public function get_rekeningdebitur(){
        
        get_api($this->config->item('baseAPI').'mms/get_rekening_debitur/'.$this->input->get('id'));
        
    }
	
    public function post_createjadwalangsuran(){
        
        $p = $this->input->post();
		
        post_api($this->config->item('baseAPI').'survey/create_jadwal_angsuran', $p);
        
    }
    
    /* Kebutuhan Modal Kerja */
    
    /* Aset */
    
    public function post_aset(){
        
        $p = $this->input->post();
        
        post_api($this->config->item('baseAPI').'survey/set_asset',$p);
        
    }
    
    public function get_asetid(){
        
        get_api($this->config->item('baseAPI').'survey/get_asset_by_id/'.$this->input->get('id'));
        
    }
    
    public function get_asetlist(){
        
        get_api($this->config->item('baseAPI').'survey/get_asset_by_prospek/'.$this->input->get('id'));
        
    }
    
    public function delete_aset(){
        
        $p = $this->input->post();
        
        post_api($this->config->item('baseAPI').'survey/delete_asset',$p);
        
    }
    
    /* RAB */
    
    public function post_rab(){
        
        $p = $this->input->post();
        
        post_api($this->config->item('baseAPI').'survey/set_rab',$p);
        
    }
    
    public function get_rabid(){
        
        get_api($this->config->item('baseAPI').'survey/get_rab_by_id/'.$this->input->get('id'));
        
    }
    
    public function get_rablist(){
        
        get_api($this->config->item('baseAPI').'survey/get_rab_by_prospek/'.$this->input->get('id'));
        
    }
    
    public function delete_rab(){
        
        $p = $this->input->post();
        
        post_api($this->config->item('baseAPI').'survey/delete_rab',$p);
        
    }
    
    /* Dokumen RAB */
    
    public function post_dokumenrab(){
        
        $p = $this->input->post();
        
        if (isset($_FILES['PR_DOKUMEN']) && $_FILES['PR_DOKUMEN']['tmp_name'])
            postWFile_api($this->config->item('baseAPI').'prospek/set_individu_dokumen',$p,'PR_DOKUMEN');
        else {
            unset($p['PR_DOKUMEN']);
            post_api($this->config->item('baseAPI').'prospek/set_individu_dokumen',$p);
        }
        
    }
    
    public function get_dokumenrablist(){
        
        get_api($this->config->item('baseAPI').'survey/get_dokumen_by_prospek/'.$this->input->get('id').'/'.$this->input->get('header'));
        
    }
    
    /* Agunan */
    
    public function post_agunan(){
        
        $p = $this->input->post();
        
        $p['DB_TGL_KELUAR_SURAT_TANAH'] = format_date_default($p['DB_TGL_KELUAR_SURAT_TANAH']);
        $p['DB_TGL_IMB'] = format_date_default($p['DB_TGL_IMB']);
        $p['DB_TGL_AJB'] = format_date_default($p['DB_TGL_AJB']);
        
        post_api($this->config->item('baseAPI').'survey/set_agunan',$p);
        
    }
    
    public function get_agunanid(){
        
        get_api($this->config->item('baseAPI').'survey/get_agunan_by_id/'.$this->input->get('id'));
        
    }
    
    public function get_agunanlist(){
        
        get_api($this->config->item('baseAPI').'survey/get_agunan_by_prospek_id/'.$this->input->get('id'));
        
    }
    
    public function delete_agunan(){
        
        $p = $this->input->post();
        
        post_api($this->config->item('baseAPI').'survey/delete_agunan',$p);
        
    }
    
    /* Penilaian Agunan */
    
    public function post_penilaian(){
        
        $p = $this->input->post();
        
        post_api($this->config->item('baseAPI').'survey/set_nilai_agunan',$p);
        
    }
    
    public function get_penilaianid(){
        
        $R = [];
        
        $R = json_decode(get_api($this->config->item('baseAPI').'survey/get_agunan_nilai_by_id/'.$this->input->get('id'), '', 'RTN'));
        
        $R[0]->NILAI_PASAR_VALIDATOR_MASTER = json_decode(get_api($this->config->item('baseAPI').'survey/get_nilai_pasar_tanah_validator/?DB_INDIVIDU_AGUNAN_ID='.$R[0]->DB_INDIVIDU_AGUNAN_ID, '', 'RTN'))[0]->NILAI_PASAR_TANAH_VALIDATOR;
        
        echo json_encode($R);
        
    }
    
    public function get_penilaianlist(){
        
        get_api($this->config->item('baseAPI').'survey/get_agunan_nilai/'.$this->input->get('id'));
        
    }
    
    public function delete_penilaian(){
        
        $p = $this->input->post();
        
        post_api($this->config->item('baseAPI').'survey/delete_nilai_agunan',$p);
        
    }
    
    public function get_nilai_tanah_validator(){
        
        get_api($this->config->item('baseAPI').'survey/get_nilai_pasar_tanah_validator/?DB_INDIVIDU_AGUNAN_ID='.$this->input->get('id'));
        
    }
    
    /* Faktor Kualitatif */
    
    public function post_note(){
        
        $p = $this->input->post();
        
        post_api($this->config->item('baseAPI').'survey/set_note',$p);
        
    }
    
    public function get_noteid(){
        
        get_api($this->config->item('baseAPI').'survey/get_note_by_id/'.$this->input->get('id'));
        
    }
    
    public function get_notelist(){
        
        get_api($this->config->item('baseAPI').'survey/get_note_by_prospek/'.$this->input->get('id'));
        
    }
    
    public function delete_note(){
        
        $p = $this->input->post();
        
        post_api($this->config->item('baseAPI').'survey/delete_note',$p);
        
    }
    
    /* Kelengkapan Data */
    
    public function get_kelengkapandata(){
        
        get_api($this->config->item('baseAPI').'survey/get_percentage_survey/'.$this->input->get('id'));
        
    }
    
    /* Status */
    
    public function post_status(){
        
        $p = $this->input->post();
		        
        $Q1 = json_decode(file_get_contents($this->config->item('baseAPI').'globalclass/get_db_individu/'.$p['DB_PROSPEK_ID']))[0];
        
        $Qd = '{"unit":"'.$Q1->MS_KODE_UNIT.'","plafon":'.($Q1->PLAFOND + $Q1->PLAFOND_ONE_OBLIGOR).',"deviasi":"0","tipe_pembiayaan":"'.$Q1->JENIS_PEMBIAYAAN.'","program":"'.$Q1->PROGRAM.'"}';
        
        $Q = json_decode(file_get_contents($this->config->item('baseBWMPApi').'bwmp/?data='.$Qd));			
        
        if (isset($Q->inisialbwmp)){
            
            $Q2 = post_api($this->config->item('baseAPI').'globalclass/set_bwmp',[
                'DB_PROSPEK_ID' => $p['DB_PROSPEK_ID'],
                'DB_BWMP' => $Q->inisialbwmp,
                'DB_BWMP_NAMA' => $Q->namabwmp,
                'DB_BWMP_SK_BERLAKU' => $Q->skberlakubwmp,
                'DB_BWMP_SK_BERAKHIR' => $Q->skberakhirbwmp,
                'DB_BWMP_PLAFOND' => $Q->plafondskbwmp
            ],'',FALSE,'RTN');
            
            if (is_object($Q2) && $Q2->status == TRUE){
                
                post_api($this->config->item('baseAPI').'survey/submit_data_survey',$p);
                
            } else {
                
                echo json_encode(['DB_STATUS' => [ 'status' => FALSE , 'message' => $Q2]]);
                
            }
            
        } else {
            
            echo json_encode(['DB_STATUS' => [ 'status' => FALSE, 'message' => $Q , 'data' => $Qd ]]);
            
        }
        
        log_message('ERROR','Data from DB_INDIVIDU => '. json_encode($Q1));
        log_message('ERROR','Data to BWMP => '. $Qd);			
        
        
    }
    
    /* Penjamin */
    
    public function post_penjamin(){
        
        $p = $this->input->post();		
        
        post_api($this->config->item('baseAPI').'survey/set_penjamin',$p);
        
    }
    
    public function get_penjaminid(){
        
        get_api($this->config->item('baseAPI').'survey/get_penjamin/?DB_PROSPEK_ID='.$this->input->get('id'));
        
    }
    
    /* Deviasi */
    
    public function get_deviasilist(){
        
        get_api($this->config->item('baseAPI').'survey/get_deviasi/?DB_PROSPEK_ID='.$this->input->get('id'));
        
    }
    
    public function get_deviasiid(){
        
        get_api($this->config->item('baseAPI').'survey/get_deviasi/?SV_INDIVIDU_DEVIASI_ID='.$this->input->get('id'));
        
    }
    
    public function post_deviasi(){
        
        $p = $this->input->post();
        
        post_api($this->config->item('baseAPI').'survey/set_deviasi',$p);
        
    }
    
    public function delete_deviasi(){
        
        $p = $this->input->post();
        
        post_api($this->config->item('baseAPI').'survey/delete_deviasi',$p);
        
    }
    
}

