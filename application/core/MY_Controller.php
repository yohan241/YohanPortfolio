<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class MY_Controller extends CI_Controller {
    // properties that CI assigns dynamically (declare them here to avoid PHP 8.2 deprecation)
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
    public $load;

    public function __construct()
    {
        parent::__construct();
    }
}
