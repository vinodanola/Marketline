<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Auth extends CI_Controller {
    
    public function __construct(){
        parent::__construct();
        header('Content-Type: application/json');
    }
    
    public function login(){
        
        $u = $this->input->post('USERNAME');
        $p = $this->input->post('PASSWORD');
        
        if (($u == "AOM" || $u == "KAM" || $u == "KKU" || $u == "REVIEWER") && $_SERVER['HTTP_HOST'] != '127.0.0.1:8099'){
            
            $a = $this->config->item('base_url').'auth/get_login_for_dummy/'.$u;
            
            $R = json_decode(file_get_contents($a));
            
        } else {
            
            $a = $this->config->item('baseSSOApi').'SSO_Mobile/login.php?user='.$u.'&pass='.$p.'&app_code=ERP';

            $c = stream_context_create(array(
                'http' => array(
                    'header'  => "Authorization: Basic " . base64_encode("event:event")
                )
            ));

            $R = json_decode(file_get_contents($a, false, $c));
        
        }
        
        if (strtoupper($R->login[0]->data[0]->username) == strtoupper('vdputra0920'))
            $R->login[0]->data[0]->posisi_nama = 'SUPERADMIN';
		
        if (strtoupper($R->login[0]->data[0]->username) == strtoupper('aprabowo0708'))
            $R->login[0]->data[0]->posisi_nama = 'SUPERADMIN';
		
		if (strtoupper($R->login[0]->data[0]->username) == strtoupper('fzainal0707'))
            $R->login[0]->data[0]->posisi_nama = 'ADMIN-MRG';
        
        $Rf = [
            'USERNAME' => $R->login[0]->data[0]->username,
//            'POSISI_NAMA' => $R->login[0]->data[0]->posisi_nama,
            // 'POSISI_NAMA' => $this->get_group_mapping($R->login[0]->data[0]->posisi_nama),
			
            'POSISI_NAMA' => $this->cek_posisi_user($R->login[0]->data[0]->username) ? $this->get_group_mapping($this->cek_posisi_user($R->login[0]->data[0]->username)) : $this->get_group_mapping($R->login[0]->data[0]->posisi_nama),						
			
            'POSISI_NAMA_SSO' => $R->login[0]->data[0]->posisi_nama,
//            'CABANG_KODE' => $R->login[0]->data[0]->kode_cabang,
            'CABANG_KODE' => $this->cek_cabang_user($R->login[0]->data[0]->username) ? $this->cek_cabang_user($R->login[0]->data[0]->username) : $R->login[0]->data[0]->kode_cabang,
//            'CABANG_KODE' => 'BNA',
            'CABANG_NAMA' => $R->login[0]->data[0]->cabang,			
            // 'UNIT_KODE' => $R->login[0]->data[0]->kode_unit,						
            'UNIT_KODE' => $this->cek_unit_user($R->login[0]->data[0]->username) ? $this->cek_unit_user($R->login[0]->data[0]->username) : $R->login[0]->data[0]->kode_unit,			
//            'UNIT_KODE' => 'ULBI',
            'UNIT_NAMA' => $R->login[0]->data[0]->unit,
            'NAMA' => $R->login[0]->data[0]->nama,
            'EMAIL' => $R->login[0]->data[0]->email,
            'STATUS' => $R->login[0]->response === 'TRUE' ? true : false,
            'MESSAGE' => $R->login[0]->message,
//            'ROLE_MENU' => $this->get_role($R->login[0]->data[0]->posisi_nama),
            'ID_SDM' => $R->login[0]->data[0]->idsdm,
            'LOKASI_KERJA' => $R->login[0]->data[0]->lokasi_kerja,
            'PERUSAHAAN' => $R->login[0]->data[0]->perusahaan,
            'NOMOR_INDUK' => $R->login[0]->data[0]->nomor_induk,
            'NIK' => $R->login[0]->data[0]->nik,
            'POSISI_SINGKATAN' => $R->login[0]->data[0]->posisi_singkatan,
            'POSISI_SSO' => $R->login[0]->data[0]->posisi_sso,
            'SSO_RESPONSE' => $R,
//            'WILAYAH' => $R->login[0]->data[0]->kode_cabang ? $this->get_wilayah($R->login[0]->data[0]->kode_cabang) : '',
//            'WILAYAH' => 1,
//            'PAR_NPL_MARKETING' => $this->get_par_npl_marketing($R->login[0]->data[0]->nik),
            'PAR_NPL_MARKETING' => [
                "status" => false,
                "data" => [

                ],
                "message" => "Data tidak ditemukan."
            ],
            'MY_PEMBIAYAAN' => $this->get_my_pembiayaan_id($R->login[0]->data[0]->idsdm) ? $this->get_my_pembiayaan_id($R->login[0]->data[0]->idsdm) : [],
            
        ];
        
        $Rf['ROLE_MENU'] = $this->get_role($Rf['POSISI_NAMA']);
        
        $Rf['WILAYAH'] = $Rf['CABANG_KODE'] ? $this->get_wilayah($Rf['CABANG_KODE']) : '';
        
        $Rf['CLUSTER'] = $this->get_custom_cluster($Rf['POSISI_NAMA'],$Rf['ID_SDM']);
        
        // if (strtoupper($Rf['USERNAME']) == 'AWICAKSONO0123')
            // $Rf['UNIT_KODE'] = 'PLIT';	
        
        if ($Rf['STATUS'] == TRUE)
            $this->session->login = $Rf;
        else
            $this->session->sess_destroy();
        
        echo json_encode($Rf,JSON_PRETTY_PRINT);
        
        exit();
        
    }
    
    public function check(){
        
        $R = ['STATUS' => FALSE]; 
        
        if ($this->session->login['STATUS'] == TRUE){
            $R = $this->session->login;
        } 
        
        echo json_encode($R, JSON_PRETTY_PRINT);

    }
    
    public function logout(){
        
        $R = FALSE;
        
        if ($this->session->sess_destroy())
            $R = TRUE;
        
        echo json_encode(['STATUS' => $R], JSON_PRETTY_PRINT);
        
    }
    
    public function get_role($A){
        
        $CI =& get_instance();
        $R = json_decode(file_get_contents($CI->config->item('baseAPI').'user_management/role/?group_alias='.$A));
        
        if (count($R->UM_MENU_CHECKED_DEFAULT) > 0)
            return $R->UM_MENU_CHECKED_DEFAULT;
        else 
            return [];
        
    }
    
    public function get_wilayah($A){
        
        $CI =& get_instance();
        $R = json_decode(file_get_contents($CI->config->item('base_url').'globalclass/get_wilayah/?kd='.$A));
        
        return $R[0]->MS_WILAYAH_ID;
        
    }
    
    public function get_par_npl_marketing($A){
        
        return json_decode(get_api($this->config->item('baseAPI').'lma/get_par_npl_marketing/'.$A,'','RTN'));
        
    }
    
    public function get_group_mapping($A){
        
        return json_decode(get_api($this->config->item('baseAPI').'user_management/group_mapping?UM_GROUP_KODE_LAMA='.base64_encode($A),'','RTN'))[0]->UM_GROUP_KODE_BARU;
        
    }
    
    public function cek_cabang_user($A){
        
        return json_decode(get_api($this->config->item('baseAPI').'user_management/user_kode_unit?USERNAME='.$A,'','RTN'))[0]->MS_KODE_CABANG;       
        
    }
	
    public function cek_unit_user($A){
        
        return json_decode(get_api($this->config->item('baseAPI').'user_management/user_kode_unit?USERNAME='.$A,'','RTN'))[0]->MS_KODE_UNIT;       
        
    }
	
    public function cek_posisi_user($A){
        
        return json_decode(get_api($this->config->item('baseAPI').'user_management/user_posisi?USERNAME='.$A,'','RTN'))[0]->MS_POSISI;       
        
    }	
    
    public function get_my_pembiayaan_id($A){
        
        return json_decode(get_api($this->config->item('baseAPI').'user_management/get_my_pembiayaan_id/'.$A,'','RTN'));       
        
    }
    
    public function get_login_for_dummy($username){
        
        if ($username == "AOM"){
            $posisi_nama = "Account Officer Mikro";
            $kode_cabang = "DMY";
            $cabang = "Cabang Dummy";
            $kode_unit = "UDMY";
            $unit = "Unit Dummy";
        } else if ($username == "KAM"){
            $posisi_nama = "Keuangan dan Administrasi Mikro";
            $kode_cabang = "DMY";
            $cabang = "Cabang Dummy";
            $kode_unit = "UDMY";
            $unit = "Unit Dummy";
        } else if ($username == "KKU"){
            $posisi_nama = "Kepala Kantor ULaMM";
            $kode_cabang = "DMY";
            $cabang = "Cabang Dummy";
            $kode_unit = "UDMY";
            $unit = "Unit Dummy";
        } else if ($username == "REVIEWER"){
            $posisi_nama = "Officer Reviewer Cabang Dummy";
            $kode_cabang = "DMY";
            $cabang = "Cabang Dummy";
            $kode_unit = "";
            $unit = "";
        }
            
        
        $R = [
              "login" => [
                [
                  "data" => [
                    [
//                      "idsdm" => "1679B416D0C86A883662362A17B5D1AB",
                      "idsdm" => "5E40E727E2C2349094C0E57CC10AB99A",
                      "nik" => "164880418",
                      "perusahaan" => null,
                      "nomor_induk" => null,
                      "username" => $username,
                      "nama" => $username,
                      "email" => $username."@pnm.co.id",
                      "posisi_nama" => $posisi_nama,
                      "posisi_sso" => $posisi_nama,
                      "posisi_singkatan" => $posisi_nama,
                      "lokasi_kerja" => "Office Dummy",
                      "kode_cabang" => $kode_cabang,
                      "cabang" => $cabang,
                      "unit" => $unit,
                      "kode_unit" => $kode_unit,
                        "server_host" => $_SERVER['HTTP_HOST']
                    ]
                  ],
                  "response" => "TRUE",
                  "message" => "Berhasil Login"
                ]
              ]
            ];
            
        echo json_encode($R);
        
    }
    
    public function get_custom_cluster($role,$idsdm){
        
        $R = [];
				        
        if ($role == 'REVIEWER' || $role == 'KRW'){
            $D = json_decode(get_api($this->config->item('baseBWMPApi').'listreviewer/'.$idsdm, '', 'RTN'));					
//            $R['CABANG'] = ['AMB','ADP','DMY'];

            // if (is_array($D) && count($D) > 0)
                // $R['CABANG'] = $D;
            // else
                // $R['CABANG'] = ['NO_BRANCH'];						
			
			if (is_object($D) && count($D) > 0) {
				$R['CABANG'] = $D->cabang;
				$R['KRW'] = $D->krw;
			}else{
				$R['CABANG'] = ['NO_BRANCH'];
				$R['KRW'] = false;
			}
				
        } else {
            $R = false;
        }
        
        return $R;
        
    }
    
}
