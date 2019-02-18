<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Globalclass extends CI_Controller {
    
    public function __construct(){
        parent::__construct();
        header('Content-Type: application/json');
    }
    
    public function get_laststatus(){
        
        get_api($this->config->item('baseAPI').'globalclass/last_status/'.$this->input->get('id'));
        
    }
    
    public function get_wilayah(){
        
        get_api($this->config->item('baseAPI').'globalclass/get_wilayah/'.$this->input->get('kd'));
        
    }
    
    public function set_status(){
        
        $p = $this->input->post();
        
        $p['DB_USER_APPROVAL'] = $this->session->login['USERNAME'];
        $p['IDSDM_APPROVAL'] = $this->session->login['ID_SDM'];
        
        post_api($this->config->item('baseAPI').'globalclass/set_status',$p);
        
    }
    
    public function get_bwmp(){
        
        get_api($this->config->item('baseBWMPApi').'listbwmp/'.$this->input->get('unit').'/'.$this->input->get('tipe_pembiayaan').'/'.$this->input->get('id_program'));
        
    }
	
    public function get_reviewer(){
        
        get_api($this->config->item('baseBWMPApi').'cluster_reviewer/'.$this->input->get('id_krw'));
        
    }	
    
    public function get_bwmp_deviasi(){
        
        get_api($this->config->item('baseBWMPApi').'listbwmp/'.$this->input->get('unit').'/deviasi');
        
    }
    
    public function set_bwmp(){
        
        $p = $this->input->post();
        
        post_api($this->config->item('baseAPI').'globalclass/set_bwmp',$p);
        
    }
    
    public function set_lkku_ulang(){
        
        $p = $this->input->post();
        
        post_api($this->config->item('baseAPI').'globalclass/set_lkku_ulang',$p);
        
    }
    
    public function get_dashboard_total_prospek(){
        
        get_api($this->config->item('baseAPI').'globalclass/get_total_prospek_dashboard');
        
    }
    
    public function get_dashboard_best_aom(){
        
        get_api($this->config->item('baseAPI').'globalclass/get_best_aom_dashboard');
        
    }
    
    public function get_ticket_alfresco(){
        
        $arr_login_alfresco = array(
            'username' => $this->config->item('alfrescoUsername'),
            'password' => $this->config->item('alfrescoPassword')
        );

        $url_login_alf = $this->config->item('baseAlfresco').'s/api/login?format=json';
        $options_login_alf = array(
                'http' => array(
                'header'  => "Content-type: application/application/json",
                'method'  => 'POST',
                'content' => json_encode($arr_login_alfresco),
            )
        );

        $context_login__alf = stream_context_create($options_login_alf);
        $login_alf = json_decode(file_get_contents($url_login_alf, false, $context_login__alf));
        
        $ticket_alf = $login_alf->data->ticket;
        
        return $ticket_alf;
        
    }
    
    public function get_file_alfresco(){
        
        $get = $this->input->get();
        
        $ticket_alf = $this->get_ticket_alfresco();
        
        $a = $this->config->item('baseAlfresco').'s/slingshot/node/content/workspace/SpacesStore/'.$get['NODE_ID'].'/?a=true&alf_ticket='.$ticket_alf.'&format=json';
        $b = fopen($a, 'rb');
        
        $pd = explode('.', $get['dok']);
        $extension = end($pd);
        
        if ($extension == 'JPG') {
            $ct = 'image/jpeg'; 
        } else {
            $ct = 'application/pdf';
        }
        
        header("Content-Type: ".$ct);
        header("Content-Length: " . filesize($a));
        
        fpassthru($b);
        
    }
    
    public function sync_doc_to_qnap() {
        
        $p = $this->input->post();
        $qB = $this->config->item('qnapBase');
        
        $ftp_server = $this->config->item('server');
        $ftp_user = $this->config->item('username');
        $ftp_pass =$this->config->item('password');
        
        $R = [
            'status' => FALSE,
            'error' => []
        ];
        
        $D = json_decode(get_api($this->config->item('baseAPI').'qnap/documents/'.$p['DB_PROSPEK_ID'], '', 'RTN'));
        
        // set up a connection or die
        $conn_id = ftp_connect($ftp_server) or $R['message'] = "Couldn't connect to $ftp_server";
        
        if (@ftp_login($conn_id, $ftp_user, $ftp_pass)) {
        
            for ($i=0; $i<count($D); $i++) {

                $node_id    = $D[$i]->NODE_ID;
                $dok        = $D[$i]->PR_PATH_DOKUMEN;
                $prospek_id = $D[$i]->DB_PROSPEK_ID;
                $kode_cabang= $D[$i]->MS_KODE_CABANG;
                $cabang_des = trim($D[$i]->MS_CABANG_DESKRIPSI);
                $kode_unit  = $D[$i]->MS_KODE_UNIT;
                $unit_des   = trim($D[$i]->MS_UNIT_DESKRIPSI);
                $wilayah    = $D[$i]->MS_WILAYAH;
                $tahun      = $D[$i]->TAHUN_PROPOSAL;
                $bulan      = $D[$i]->BULAN_PROPOSAL;
                $nama_nasabah = $D[$i]->PR_NAMA_LENGKAP;
                $id_nasabah = $D[$i]->PR_INDIVIDU_ID;
                $mrg_dok_des = $D[$i]->MRG_DOKUMEN_HEADER_DESKRIPSI;

                $pd         = explode('/', $dok);
                $ticket_alf = $this->get_ticket_alfresco();

                if ($node_id)
                    $a = $this->config->item('baseAlfresco').'s/slingshot/node/content/workspace/SpacesStore/'.$node_id.'/?a=true&alf_ticket='.$ticket_alf.'&format=json';
                else
                    $a = $dok;

                $fN = end($pd);

                $dir = $qB.$wilayah.'/'.$cabang_des.' ('.$kode_cabang.')'.'/'.$unit_des.' ('.$kode_unit.')'.'/'.$tahun.'/'.$bulan.'/'.$nama_nasabah.' ('.$id_nasabah.')/'.$mrg_dok_des.'/';

                $fL = $dir.$fN;

//                if (!file_exists($dir))
//                    mkdir($dir, 0777, true);
//
//                if (file_exists($fL)) unlink($fL);
//
//                if (file_put_contents($fL, fopen($a, 'r')) !== false) {} else {
//                    array_push($R['error'],$i."-".$a."-".$fL);
//                }
                $aPath = explode('/',$dir);
                $homeDir = str_repeat('../', count($aPath) - 1);
                ftp_chdir($conn_id, $homeDir);
                
                if (ftp_mksubdirs($conn_id,'',$dir)) {
                    if (ftp_put($conn_id, $fN, $a , FTP_ASCII)) {} else {
                        array_push($R['error'],$i."-".$a."-".$fL);
                    }
                }
            }
        } else {
            $R['message'] = "Couldn't connect as $ftp_user\n";
        }
        
        ftp_close($conn_id);
        
        $R['status'] = TRUE;
        
//        if (count($R['error']) > 0){
//            $R['status'] = FALSE;
//            $R['message'] = 'Sync error';
//        }
        
        echo json_encode($R);
        
    }
    
    public function tes_qnap(){
        
        $ftp_server = "10.61.4.110";
        $ftp_user = "itd";
        $ftp_pass = "pnm123#";
        $dir = 'MARKETLINE/www';

        // set up a connection or die
        $conn_id = ftp_connect($ftp_server) or die("Couldn't connect to $ftp_server"); 

        // try to login
        if (@ftp_login($conn_id, $ftp_user, $ftp_pass)) {
            if (ftp_mkdir($conn_id, $dir)) {
                echo "successfully created $dir\n";
            } else {
             echo "There was a problem while creating $dir\n";
            }
            
            $file = "http://10.61.3.246:8080/alfresco/s/slingshot/node/content/workspace/SpacesStore/7f911f33-0340-4406-9b91-aac19df09ab4/?a=true&alf_ticket=TICKET_ce1539cdd2083b2a7e1957a579dfd1a0a03b577b&format=json";
            
//            $file = 'license.txt';
            // upload file
            if (ftp_put($conn_id, "MARKETLINE/2.txt", $file, FTP_ASCII))
            {
                echo "Successfully uploaded $file.";
            }
            else
            {
                echo "Error uploading $file.";
            }
            
            echo "Connected as $ftp_user@$ftp_server\n";
        } else {
            echo "Couldn't connect as $ftp_user\n";
        }

        // close the connection
        ftp_close($conn_id);
        
    }
    
}