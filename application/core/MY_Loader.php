<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class MY_Loader extends CI_Loader {
    // declare properties that CI assigns to loader instance
    public $load;
    public $benchmark;
    public $hooks;
    public $config;
    public $log;
    public $utf8;
    public $uri;
    public $exceptions;
    public $router;
    public $output;
    public $security;
    public $input;
    public $lang;

    public function __construct()
    {
        parent::__construct();
    }
}
