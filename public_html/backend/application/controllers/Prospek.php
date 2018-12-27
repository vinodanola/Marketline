<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Prospek extends CI_Controller {
    
    public function __construct(){
        parent::__construct();
        header('Content-Type: application/json');
    }
    
    
    public static function PARAMETER_PARSE_GET_IDENTITAS($d){
        
        $si = $d->individu[0];
        
        $si->kode_cabang          = $si->MS_KODE_CABANG;
        $si->kode_unit            = $si->MS_KODE_UNIT;
        $si->id_golongan_individu = $si->MS_GOLONGAN_INDIVIDU_ID;
        $si->id_jenis_pemohon     = $si->MS_JENIS_PEMOHON_ID;
        $si->id_individu          = $si->PR_INDIVIDU_ID;
        $si->id_prospek           = $si->PR_PROSPEK_ID;
        $si->id_debitur           = $si->PR_DEBITUR_ID;
        
        $si->namalengkap          = $si->PR_NAMA_LENGKAP;
        $si->namaibukandung       = $si->PR_NAMA_IBU_KANDUNG;
        $si->namalengkap          = $si->PR_NAMA_LENGKAP;
        $si->namapanggilan        = $si->PR_NAMA_PANGGILAN;
        //$si->nomor_hp             = $si->PR_KONTAK;
        //$si->nomor_telepon        = $si->PR_ARR_INDIVIDU_KONTAK->PR_NO_HP;
        $si->pekerjaan            = $si->MS_PEKERJAAN_ID;
        $si->pendidikan_terakhir  = $si->MS_PENDIDIKAN_ID;
        $si->keterangan_pekerjaan = $si->PR_KET_PEKERJAAN;
        $si->statusperkawinan     = $si->MS_STATUS_KAWIN_ID;
        $si->tanggallahir         = $si->PR_TGL_LAHIR;
        $si->tempatlahir          = $si->PR_TEMPAT_LAHIR;
        $si->agama                = $si->MS_AGAMA_ID;
        $si->gelar                = $si->PR_GELAR;
        $si->kewarganegaraan      = $si->MS_KEWARGANEGARAAN_ID;
        $si->nomor_kartu_keluarga = $si->PR_NO_KK;
        $si->jumlah_anak          = $si->PR_JML_ANAK;
        $si->jenis_identitas      = $si->MS_JENIS_IDENTITAS_ID;
        
        $sk = $d->kontak;
        
        for ($i=0; $i<count($sk); $i++) {
            $sk[$i]->jenis_kontak = $sk[$i]->MS_TIPE_KONTAK;
            $sk[$i]->kontak = $sk[$i]->PR_KONTAK;
            $sk[$i]->kontak_utama = $sk[$i]->PR_KONTAK_UTAMA;
        }
        
        $sa = $d->alamat;
        
        for ($j=0; $j<count($sa); $j++) {
            $sa[$j]->alamat_id = $sa[$j]->PR_INDIVIDU_ALAMAT_ID;
            $sa[$j]->id_individu = $sa[$j]->PR_INDIVIDU_ID;
            $sa[$j]->jenis_alamat = $sa[$j]->MS_JENIS_ALAMAT_ID;
            $sa[$j]->alamat_detail = $sa[$j]->PR_ALAMAT;
            $sa[$j]->rt = $sa[$j]->PR_RT;
            $sa[$j]->rw = $sa[$j]->PR_RW;
            $sa[$j]->provinsi = $sa[$j]->MS_PROVINSI_ID;
            $sa[$j]->kabupaten_kota = $sa[$j]->MS_KABKOT_ID;
            $sa[$j]->kecamatan = $sa[$j]->MS_KECAMATAN_ID;
            $sa[$j]->kelurahan = $sa[$j]->MS_KELDES_ID;
            $sa[$j]->kodepos = $sa[$j]->MS_KODE_POS_ID;
            $sa[$j]->lama_menempati = $sa[$j]->PR_LAMA_MENEMPATI;
            $sa[$j]->status_tempat = $sa[$j]->MS_STATUS_TEMPAT_ID;
        }
        
        return $d;
        
    }
    
    public static function PARAMETER_PARSE_POST_IDENTITAS($p){
        
        $p['PR_INDIVIDU_ID']            = $p['id_individu'];
        $p['PR_PROSPEK_ID']             = $p['id_prospek'];
        $p['PR_DEBITUR_ID']             = $p['id_debitur'];
        $p['MS_KODE_CABANG']            = $p['kode_cabang'];
        $p['MS_KODE_UNIT']              = $p['kode_unit'];
        $p['MS_GOLONGAN_INDIVIDU_ID']   = $p['id_golongan_individu'];
        $p['MS_JENIS_PEMOHON_ID']       = $p['id_jenis_pemohon'];
        $p['PR_NAMA_LENGKAP']           = $p['namalengkap'];
        $p['PR_NAMA_PANGGILAN']         = $p['namapanggilan'];
        $p['PR_TGL_LAHIR']              = format_date_default($p['tanggallahir']);
        $p['PR_NAMA_IBU_KANDUNG']       = $p['namaibukandung'];
        $p['MS_STATUS_KAWIN_ID']        = $p['statusperkawinan'];
        $p['PR_TEMPAT_LAHIR']           = $p['tempatlahir'];
        $p['MS_PENDIDIKAN_ID']          = $p['pendidikan_terakhir'];
        $p['MS_AGAMA_ID']               = $p['agama'];
        $p['PR_GELAR']                  = $p['gelar'];
        $p['MS_KEWARGANEGARAAN_ID']     = $p['kewarganegaraan'];
        $p['PR_NPWP']                   = $p['npwp'];
        $p['MS_JENIS_IDENTITAS_ID']     = $p['jenis_identitas'];
        $p['PR_NO_IDENTITAS']           = $p['nomor_identitas'];
        $p['PR_MASA_BERLAKU_IDENTITAS'] = $p['masa_berlaku_identitas'];
        $p['MS_JENIS_KELAMIN_ID']       = $p['jeniskelamin'];
        $p['PR_NO_KK']                  = $p['nomor_kartu_keluarga'];
        $p['PR_JML_ANAK']               = $p['jumlah_anak'];
        $p['MS_JENIS_USAHA_ID']         = $p['jenis_usaha'];
        
        
        $p['PR_ARR_INDIVIDU_KONTAK']    = [
            'PR_NO_HP'      => $p['nomor_hp'],
            'PR_NO_TELP'    => $p['nomor_telepon'],
            'PR_EMAIL'      => $p['email']
        ];
        
        $p['PR_ARR_INDIVIDU_ALAMAT']['PR_ALM_KTP'] = [
            "MS_JENIS_ALAMAT_ID" => 45,
            'PR_ALAMAT'         => $p['ktp']['alamat_detail'],
            'PR_RT'             => $p['ktp']['rt'],
            'PR_RW'             => $p['ktp']['rw'],
            'MS_PROVINSI_ID'    => $p['ktp']['provinsi'],
            'MS_KABKOT_ID'      => $p['ktp']['kabupaten_kota'],
            'MS_KECAMATAN_ID'   => $p['ktp']['kecamatan'],
            'MS_KELDES_ID'      => $p['ktp']['kelurahan'],
            'MS_KODE_POS_ID'    => $p['ktp']['kodepos'],
            'PR_LAMA_MENEMPATI' => $p['ktp']['lama_menempati'],
            'MS_STATUS_TEMPAT_ID' => $p['ktp']['status_tempat'],
        ];
        
        $p['PR_ARR_INDIVIDU_ALAMAT']['PR_ALM_DOMISILI'] = [
            "MS_JENIS_ALAMAT_ID" => 46,
            'PR_ALAMAT'         => $p['domisili']['alamat_detail'],
            'PR_RT'             => $p['domisili']['rt'],
            'PR_RW'             => $p['domisili']['rw'],
            'MS_PROVINSI_ID'    => $p['domisili']['provinsi'],
            'MS_KABKOT_ID'      => $p['domisili']['kabupaten_kota'],
            'MS_KECAMATAN_ID'   => $p['domisili']['kecamatan'],
            'MS_KELDES_ID'      => $p['domisili']['keluarahan'],
            'MS_KODE_POS_ID'    => $p['domisili']['kodepos'],
            'PR_LAMA_MENEMPATI' => $p['domisili']['lama_menempati'],
            'MS_STATUS_TEMPAT_ID' => $p['domisili']['status_tempat'],
        ];
        
        $p['MS_PEKERJAAN_ID']           = $p['pekerjaan'];
        $p['PR_KET_PEKERJAAN']          = $p['keterangan_pekerjaan'];
        
        $p['MS_JENIS_REFERENSI_ID']     = $p['jenis_referensi'];
        $p['PR_NAMA_REFERENSI']         = $p['nama_referensi'];
        $p['PR_NO_HP_REFERENSI']        = $p['nomor_hp_refenresi'];
        
        return $p;
        
    }
    
    /* Cek IDI */
    
    public function check_idi(){
        
        post_api($this->config->item('baseAPI').'prospek/cek_IDI',$this->input->post());
        
    }
    
    /* Create Calon Debitur */
    
    public function post_create(){
        
        $p = $this->input->post();
		
		log_message('ERROR', json_encode($p));

        $p['PR_TGL_REALISASI_KUNJUNGAN'] = format_date_default($p['PR_TGL_REALISASI_KUNJUNGAN']);
        $p['PR_TGL_LAHIR'] = format_date_default($p['PR_TGL_LAHIR']);
				
       
        if ($p['masa_berlaku_identitas_seumur_hidup'])
            $p['PR_MASA_BERLAKU_IDENTITAS'] = 1;
        else
            $p['PR_MASA_BERLAKU_IDENTITAS'] = format_date_default($p['PR_MASA_BERLAKU_IDENTITAS']);
        
        unset($p['masa_berlaku_identitas_seumur_hidup']);
        
        post_api($this->config->item('baseAPI').'prospek/insert_wizard',$p);
        
    }
    
    /* Calon Debitur Data */
    
    public function get_calonDebitur(){
        
        $g = $this->input->get();
        
        if ($this->session->login['POSISI_NAMA'] == 'AOM' || $this->session->login['POSISI_NAMA'] == 'SUPERADMIN')
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
        
        get_api($this->config->item('baseAPI').'prospek/get_wizard/?DB_ID_SDM_AOM='.$ID_SDM.'&PAGE='.$g['PAGE'].'&LIMIT='.$g['LIMIT'].'&MS_WILAYAH_ID='.$MS_WILAYAH_ID.'&MS_KODE_CABANG='.$MS_KODE_CABANG.'&MS_KODE_UNIT='.$MS_KODE_UNIT.'&SEARCH='.$search);
        
    }
    
    public function get_detailCalonDebitur(){
        
        get_api($this->config->item('baseAPI').'prospek/get_indentity/'.$this->input->get('id'));
        
    }
    
    public function post_indentitasIndividu(){
        
        $p = $this->input->post();
		
		$p['PR_TGL_LAHIR']=format_date_default($p['PR_TGL_LAHIR']);
        
        if ($p['masa_berlaku_identitas_seumur_hidup'])
            $p['PR_MASA_BERLAKU_IDENTITAS'] = 1;
        else
            $p['PR_MASA_BERLAKU_IDENTITAS'] = format_date_default($p['PR_MASA_BERLAKU_IDENTITAS']);
        
        post_api($this->config->item('baseAPI').'prospek/update_individu',$p);		
        
    }
    
    public function get_detail_pr_individu(){
        
        $R = [];
        
        $R = json_decode(get_api($this->config->item('baseAPI').'prospek/get_individu_by_pr_id/'.$this->input->get('id'), '', 'RTN'))[0];
        
        $R->INFORMASI_PEMBIAYAAN = json_decode(get_api($this->config->item('baseAPI').'mms/get_rekening_debitur/'.$R->DB_DEBITUR_ID, '', 'RTN'));
        
        $R->INFORMASI_SCORING = json_decode(get_api($this->config->item('baseAPI').'globalclass/get_informasi_scoring/'.$R->PR_INDIVIDU_ID, '', 'RTN'));
        
        echo json_encode([$R]);
        
    }
    
    /* Kontak */
    
    public function get_kontaklist(){
        
        get_api($this->config->item('baseAPI').'prospek/get_kontak_individu/'.$this->input->get('id'));

    }
    
    public function get_kontakid(){
        
        get_api($this->config->item('baseAPI').'prospek/get_kontak_id/'.$this->input->get('id'));

    }
    
    public function post_kontak(){
        
        $p = $this->input->post();
        
//        $p['PR_KONTAK_UTAMA'] = ($p['PR_KONTAK_UTAMA'] == 'true') ? 1 : 0; 
        
        post_api($this->config->item('baseAPI').'prospek/set_individu_kontak',$p);
        
    }
    
    public function delete_kontak(){
        
        post_api($this->config->item('baseAPI').'prospek/delete_kontak',$this->input->post());
        
    }
    
    /* Alamat */ 
    
    public function post_alamat(){
        
        post_api($this->config->item('baseAPI').'prospek/set_individu_alamat',$this->input->post());
        
    }
    
    public function get_alamatlist(){
        
        get_api($this->config->item('baseAPI').'prospek/get_alamat_individu/'.$this->input->get('id'));
        
    }
    
    public function get_alamatid(){
        
        get_api($this->config->item('baseAPI').'prospek/get_alamat_id/'.$this->input->get('id'));
        
    }
    
    public function delete_alamat(){
        
        post_api($this->config->item('baseAPI').'prospek/delete_alamat',$this->input->post());
        
    }
    
    public function post_alamatutama(){
        
        post_api($this->config->item('baseAPI').'prospek2/set_alamat_utama',$this->input->post());
        
    }
    
    /* Data Keluarga */
    
    public function get_datakeluarga(){
        
//        get_api($this->config->item('baseAPI').'prospek/get_individu_id/'.$this->input->get('id'));
        get_api($this->config->item('baseAPI').'prospek/get_individu_kk_w_anak/'.$this->input->get('id'));
        
    }
    
    public function post_datakeluarga(){
        
        if (isset($_FILES['PR_DOKUMEN']) && $_FILES['PR_DOKUMEN']['tmp_name'])
            postWFile_api($this->config->item('baseAPI').'prospek/update_individu_w_upload',$this->input->post(),'PR_DOKUMEN');
        else 
            post_api($this->config->item('baseAPI').'prospek/update_individu_w_upload',$this->input->post());
        
    }
    
    /* Detail Keluarga */
    
    public function get_detailkeluargalist(){
        
        get_api($this->config->item('baseAPI').'prospek/get_keluarga_individu/'.$this->input->get('id'));
        
    }
    
    public function get_detailkeluargaid(){
        
        get_api($this->config->item('baseAPI').'prospek/get_keluarga_id/'.$this->input->get('id'));
        
    }
    
    public function post_detailkeluarga(){
        
        $p = $this->input->post();
        
        if ($p['masa_berlaku_identitas_seumur_hidup'])
            $p['PR_MASA_BERLAKU_IDENTITAS'] = 1;
        else
            $p['PR_MASA_BERLAKU_IDENTITAS'] = format_date_default($p['PR_MASA_BERLAKU_IDENTITAS']);
        
        $p['PR_TANGGAL_LAHIR'] = format_date_default($p['PR_TANGGAL_LAHIR']);
        
        unset($p['masa_berlaku_identitas_seumur_hidup']);        
        
        post_api($this->config->item('baseAPI').'prospek/set_individu_keluarga',$p);
        
    }
    
    public function delete_detailkeluarga(){
        
        post_api($this->config->item('baseAPI').'prospek/delete_keluarga',$this->input->post());
        
    }
    
    /* Data Pembiayaan */
    
    public function get_datapembiayaan(){
        
        $R = json_decode(get_api($this->config->item('baseAPI').'prospek/get_pembiayaan_individu/'.$this->input->get('id'),'','RTN'));
        
        
        if (!$R[0]->PR_INDIVIDU_PEMBIAYAAN_SEBELUMNYA_ID) {
            $R2 = json_decode(get_api($this->config->item('baseAPI').'mms/get_rekening_debitur_by_prospek_id/'.$this->input->get('id').'/?STATUS_AKTIF=2','','RTN'))->data[0];
        
            $R[0]->DB_DEBITUR_ID_SEBELUMNYA = $R2->NASABAH_ID;
            $R[0]->JENIS_FASILITAS_SEBELUMNYA = '';
            $R[0]->PLAFOND_SEBELUMNYA = $R2->JML_PINJAMAN;
            $R[0]->OUTSTANDING_SEBELUMNYA = $R2->OUTSTANDING;
            $R[0]->KOLEKTIBILITAS_SEBELUMNYA = $R2->KOLEKTIBILITAS;
        } else {
            $R[0]->DB_DEBITUR_ID_SEBELUMNYA = $R[0]->DB_DEBITUR_ID;
        }
        
        echo json_encode($R);
        
    }
    
    public function post_datapembiayaan(){
        
        $p = $this->input->post();
        
        if ($p['PR_INDIVIDU_PEMBIAYAAN_ID'] == 'NULL')
            unset($p['PR_INDIVIDU_PEMBIAYAAN_ID']);
        
        post_api($this->config->item('baseAPI').'prospek/set_individu_pembiayaan',$this->input->post());
        
    }
    
    /* Informasi Usaha */
    
    public function get_infousahalist(){
        
        get_api($this->config->item('baseAPI').'prospek/get_usaha_individu/'.$this->input->get('id'));
        
    }
    
    public function get_infousahaid(){
        
        get_api($this->config->item('baseAPI').'prospek/get_usaha_id/'.$this->input->get('id'));
        
    }
    
    public function post_infousaha(){
        
        post_api($this->config->item('baseAPI').'prospek/set_individu_usaha',$this->input->post());
        
    }
    
    public function delete_infousaha(){
        
        post_api($this->config->item('baseAPI').'prospek/delete_usaha',$this->input->post());
        
    }
    
    /* Agunan */
    
    public function get_agunanid(){
        
        get_api($this->config->item('baseAPI').'prospek/get_rencana_agunan_id/'.$this->input->get('id'));
        
    }
    
    public function get_agunanlist(){
        
        get_api($this->config->item('baseAPI').'prospek/get_rencana_agunan_individu/'.$this->input->get('id'));
        
    }
    
    public function post_agunan(){
        
        $p = $this->input->post();
        
        post_api($this->config->item('baseAPI').'prospek/set_individu_agunan',$p);
        
    }
    
    public function delete_agunan(){
        
        post_api($this->config->item('baseAPI').'prospek/delete_agunan',$this->input->post());
        
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
    
    public function get_dokumenlist(){
        
        get_api($this->config->item('baseAPI').'prospek/get_dokumen_individu/'.$this->input->get('id'));
        
    }
    
    public function get_dokumenid(){
        
        get_api($this->config->item('baseAPI').'prospek/get_dokumen_id/'.$this->input->get('id'));
        
    }
    
    public function delete_dokumen(){
        
        post_api($this->config->item('baseAPI').'prospek/delete_dokumen',$this->input->post());
        
    }
    
    /* AOM */
    
    public function get_aom(){
        
        get_api($this->config->item('baseAPI').'prospek2/get_aom/'.$this->input->get('id'));
        
    }
    
    public function post_aomkunjungan(){
        
        $p = $this->input->post();
        
        $p['PR_TGL_REALISASI_KUNJUNGAN'] = format_date_default($p['PR_TGL_REALISASI_KUNJUNGAN']);
                 
        post_api($this->config->item('baseAPI').'prospek/set_individu_kunjungan',$p);
        
    }
    
    public function get_aomkunjunganlist(){
        
        get_api($this->config->item('baseAPI').'prospek/get_kunjungan_deb_individu/'.$this->input->get('id'));
        
    }
    
    public function get_aomkunjunganid(){
        
        get_api($this->config->item('baseAPI').'prospek/get_kunjungan_deb_id/'.$this->input->get('id'));
        
    }
    
    public function delete_aomkunjungan(){
        
        post_api($this->config->item('baseAPI').'prospek/delete_aom_kunjungan',$this->input->post());
        
    }
    
    /* Prospek Per Individu */
    
    public function get_prospekperindividu(){
        
        get_api($this->config->item('baseAPI').'prospek/get_pr_per_individu/'.$this->input->get('id'));
        
    }
    
    /* Kelengkapan Data */
    
    public function get_kelengkapandata(){
        
        get_api($this->config->item('baseAPI').'prospek/get_percentage_prospek/'.$this->input->get('id'));
        
    }
    
    /* Status */
    
    public function post_status(){
        
        $p = $this->input->post();
        
        post_api($this->config->item('baseAPI').'prospek/submit_data_prospek',$p);
        
        post_api($this->config->item('baseAPI').'survey/set_survey_individu',$p);
        
    }
    
    #Cek SID
    
    public function post_ceksid(){
        
        $p = $this->input->post();
        
        post_api($this->config->item('baseAPI').'operational_2/set_request_sid/0',$p);
        
    }
    
    public function get_ceksid(){
        
        get_api($this->config->item('baseAPI').'operational_2/get_request_sid/?DB_PROSPEK_ID='.$this->input->get('id'));
        
    }
    
    public function get_dokumensid(){
        
        get_api($this->config->item('baseAPI').'operational_2/get_dokumen_sid/?DB_PROSPEK_ID='.$this->input->get('id'));
        
    }
    
    #One Obligor
    
    public function get_individu_one_obligor(){
        
        get_api($this->config->item('baseAPI').'prospek2/get_individu_one_obligor/'.$this->input->get('id'));
        
    }
    
    public function post_one_obligor(){
        
        $p = $this->input->post();
        
        post_api($this->config->item('baseAPI').'prospek2/get_one_obligor',$p);
        
    }
    
    #Produk
    
    public function get_produklist(){
        
//        get_api($this->config->item('baseBWMPApi').'products/');
        
        get_api($this->config->item('baseBWMPApi').'productsnew/');
//        get_api('http://manpro.pnm.co.id/api/productsnew/');
        
        
    }
    
    public function get_produkid(){
        
        get_api($this->config->item('baseBWMPApi').'products/'.$this->input->get('id'));
        
    }
    
    #Program
    
    public function get_programlist(){
        
//        get_api($this->config->item('baseBWMPApi').'programs/');
        
        get_api($this->config->item('baseBWMPApi').'programsnew/');
//        get_api('http://manpro.pnm.co.id/api/programsnew/');
        
    }
    
    public function get_programid(){
        
        get_api($this->config->item('baseBWMPApi').'programs/'.$this->input->get('id'));
        
    }
    
    #Calculate Produk & Program
    
    public function get_calculate_produk_program(){
        
        get_api($this->config->item('baseBWMPApi').'calculateprogramnew/'.$this->input->get('id_produk').'/'.$this->input->get('id_program').'/'.$this->input->get('id_pembiayaan'));
//        get_api('http://manpro.pnm.co.id/api/calculateprogramnew/'.$this->input->get('id_produk').'/'.$this->input->get('id_program'));
        
    }
    
}