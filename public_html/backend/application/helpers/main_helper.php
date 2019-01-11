<?php defined('BASEPATH') OR exit('No direct script access allowed');

if ( ! function_exists('date_default'))
{
    function date_default()
    {
        return date('Y-m-d H:i:s', local_to_gmt(time()));
    }
}

if ( ! function_exists('date_gmtToLocal'))
{
    function date_gmtToLocal($time)
    {
        return date('Y-m-d H:i:s', gmt_to_local(strtotime($time),'UP8',FALSE));
    }
}

if ( ! function_exists('format_date_default'))
{
    function format_date_default($date)
    {					
		// $date = date('Y-m-d H:i:s', local_to_gmt($date));
        // return date('Y-m-d', strtotime($date.'+1 days'));
        if ($date == 'undefined')
            return NULL;
        else
            return date('Y-m-d', strtotime( $date));
    }
}

if ( ! function_exists('get_api'))
{
    function get_api($url,$token='',$output=''){
        
        $d = file_get_contents($url);
        
        $M = ['status' => FALSE, 'content'=>'Failed get data from '.$url];
        
        if ($output=='RTN') {
            if ($d == FALSE)
                return $M;
            else
                return $d;
        } else {
            if ($d == FALSE){
                log_message('ERROR', json_encode($M));
                echo json_encode($M,JSON_PRETTY_PRINT);
            }else
                echo $d;
        }
        
        
        
//        $CI = get_instance();
//        
//        $CI->curl->proxy('192.168.10.30', 8080);
//        
//        $d = $CI->curl->simple_get($url);
//
//        log_message('ERROR', $CI->curl->error_code . " || " .$CI->curl->error_string . " || " . json_encode($CI->curl->info));
//        
//        $CI->output->set_output($d)->_display();
        
        exit();
        
//            Create a curl handle to a non-existing location
//            $ch = curl_init($url);
//            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
//
//            if(curl_exec($ch) === false)
//            {
//                echo 'Curl error: ' . curl_error($ch);
//            }
//            else
//            {
//                $r = curl_exec($ch);
//                $i = curl_getinfo($ch);
//                echo $r . ' ' . json_encode($i);
//            }
//
//            // Close handle
//            curl_close($ch);
        
    }
}

if ( ! function_exists('post_api'))
{
    function post_api($url,$data,$token='',$multiarr=FALSE,$output=FALSE){
        
//        $CI = get_instance();
//        
//        $CI->curl->proxy('192.168.10.30', 8080);
//        
//        $c = array(
//            CURLOPT_CUSTOMREQUEST => "POST",
//            CURLOPT_RETURNTRANSFER => true,
//            CURLOPT_FOLLOWLOCATION => 1
//        );
//        
//        $d = $CI->curl->simple_post($url, json_decode(json_encode($data)), $c);
//        
//        log_message('ERROR', $CI->curl->error_code . " || " .$CI->curl->error_string . " || " . json_encode($CI->curl->info));
//        if ($d)
//            $CI->output->set_output($d)->_display();
//        exit();
        
//        echo $this->curl->info();
//        echo $d;
        
        $CI = get_instance();
        
        $ND =  new DateTime();
        
        $data['CREATED_DATE'] = $ND->format('Y-m-d H:i:s');
        $data['CREATED_BY_ID'] = $CI->session->login['ID_SDM'] . '</>' . $CI->session->login['NIK'];
        $data['CREATED_BY_NAME'] = $CI->session->login['POSISI_NAMA'] . ' - ' . $CI->session->login['NAMA'];
        $data['MODIFIED_DATE'] = $ND->format('Y-m-d H:i:s');
        $data['MODIFIED_BY_ID'] = $CI->session->login['ID_SDM']. '</>' . $CI->session->login['NIK'];
        $data['MODIFIED_BY_NAME'] = $CI->session->login['POSISI_NAMA'] . ' - ' . $CI->session->login['NAMA'];

        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");  
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        
        if ($multiarr == TRUE){
            $data = http_build_query($data);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        } else {
            curl_setopt($ch, CURLOPT_POSTFIELDS,$data);
        }
       
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
        
        $result = curl_exec($ch);
//        log_message('ERROR', json_encode($data));
//        log_message('ERROR', json_encode(curl_getinfo($ch)));
        curl_close($ch);
        
        if ($output=='RTN') {
            if ($result)
                return json_decode($result);
            else
                return ['status' => FALSE, 'content'=>'No response data from '.$url];
        } else {
            if ($result)
                echo $result;
            else
                echo json_encode(['status' => FALSE, 'content'=>'No response data from '.$url]);
        }
        
        exit();
    }
}

if ( ! function_exists('postWFile_api')) {
    
    function postWFile_api($url,$data,$fn,$token=''){
        
        $data[$fn] = new CurlFile($_FILES[$fn]['tmp_name'], $_FILES[$fn]['type']);
        
        $data[$fn.'_NAMA'] = $_FILES[$fn]['name'];
        
        $ch = curl_init();
	curl_setopt($ch, CURLOPT_URL,$url);
	curl_setopt($ch, CURLOPT_POST,1);
	curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER,1);
	$result=curl_exec ($ch);
	curl_close ($ch);
        if ($result)
            echo $result;
        else
            echo json_encode(['status' => FALSE, 'content'=>'No response data from '.$url]);
        exit();
        
    }
    
}

if ( ! function_exists('clearArray')) {
    
    function cleanMultiAwr($A){
        
        $A = explode(',', $A);
        $B = '';
        for ($i = 0; $i < count($A); $i++) {
            if ($A[$i] == '' || $A[$i] == 'undefined' || $A[$i] == 0) {} else {
                $B .= $A[$i];
                if ($i != count($A)-1)
                    $B .= ',';
            }
        }
        log_message('ERROR',$B);
        return $B;
        
    }
    
}

if ( ! function_exists('http_build_query_for_curl')) {
    
    function http_build_query_for_curl( $arrays, &$new = array(), $prefix = null ) {

        if ( is_object( $arrays ) ) {
            $arrays = get_object_vars( $arrays );
        }

        foreach ( $arrays AS $key => $value ) {
            $k = isset( $prefix ) ? $prefix . '[' . $key . ']' : $key;
            if ( is_array( $value ) OR is_object( $value )  ) {
                http_build_query_for_curl( $value, $new, $k );
            } else {
                $new[$k] = $value;
            }
        }
    }
    
}

if (!function_exists('array_group_by')) {
    /**
     * Groups an array by a given key.
     *
     * Groups an array into arrays by a given key, or set of keys, shared between all array members.
     *
     * Based on {@author Jake Zatecky}'s {@link https://github.com/jakezatecky/array_group_by array_group_by()} function.
     * This variant allows $key to be closures.
     *
     * @param array $array   The array to have grouping performed on.
     * @param mixed $key,... The key to group or split by. Can be a _string_,
     *                       an _integer_, a _float_, or a _callable_.
     *
     *                       If the key is a callback, it must return
     *                       a valid key from the array.
     *
     *                       If the key is _NULL_, the iterated element is skipped.
     *
     *                       ```
     *                       string|int callback ( mixed $item )
     *                       ```
     *
     * @return array|null Returns a multidimensional array or `null` if `$key` is invalid.
     */
    function array_group_by(array $array, $key)
    {
            if (!is_string($key) && !is_int($key) && !is_float($key) && !is_callable($key) ) {
                    trigger_error('array_group_by(): The key should be a string, an integer, or a callback', E_USER_ERROR);
                    return null;
            }

            $func = (!is_string($key) && is_callable($key) ? $key : null);
            $_key = $key;

            // Load the new array, splitting by the target key
            $grouped = [];
            foreach ($array as $value) {
                    $key = null;

                    if (is_callable($func)) {
                            $key = call_user_func($func, $value);
                    } elseif (is_object($value) && isset($value->{$_key})) {
                            $key = $value->{$_key};
                    } elseif (isset($value[$_key])) {
                            $key = $value[$_key];
                    }

                    if ($key === null) {
                            continue;
                    }

                    $grouped[$key][] = $value;
            }

            // Recursively build a nested grouping if more parameters are supplied
            // Each grouped array value is grouped according to the next sequential key
            if (func_num_args() > 2) {
                    $args = func_get_args();

                    foreach ($grouped as $key => $value) {
                            $params = array_merge([ $value ], array_slice($args, 2, func_num_args()));
                            $grouped[$key] = call_user_func_array('array_group_by', $params);
                    }
            }

            return $grouped;
    }
}

if (!function_exists('ftp_is_dir')) 
{
    function ftp_is_dir($ftp, $dir)
    {
        $pushd = ftp_pwd($ftp);

        if ($pushd !== false && @ftp_chdir($ftp, $dir))
        {
            ftp_chdir($ftp, $pushd);   
            return true;
        }

        return false;
    } 
}

if (!function_exists('ftp_mksubdirs')) 
{
    function ftp_mksubdirs($ftpcon,$ftpbasedir,$ftpath)
    {
       @ftp_chdir($ftpcon, $ftpbasedir); 
       $parts = array_filter(explode('/',$ftpath)); 
       foreach($parts as $part){
            if(!@ftp_chdir($ftpcon, $part)){
                ftp_mkdir($ftpcon, $part);
                ftp_chmod($ftpcon, 0777, $part);
                ftp_chdir($ftpcon, $part);
            }
       }
       return true;
    }
}



