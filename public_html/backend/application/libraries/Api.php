<?php

class Api {

    public $CI;

    public function __construct() {

        $this->CI =& get_instance();

    }

    public function response($D){

        $F = $this->CI->uri->uri_to_assoc(3);

        $F = isset($F['format']) ? $F['format'] : '';

        if (strtoupper($F) == 'XML')
        {

        } else {
            $this->CI
                -> output
                -> set_content_type('application/json', 'utf-8')
                -> set_output(json_encode($D, JSON_PRETTY_PRINT))
                -> _display();
            exit();
        }

    }

    public function auth(){

        $uid = $this->CI->uri->uri_to_assoc(3)['userid'];
        $st = $this->CI->uri->uri_to_assoc(3)['token'];

        $R = FALSE;

        if ($this->CI->token->check($st,$uid) == TRUE)
            $R = TRUE;

        return $R;

    }

}
