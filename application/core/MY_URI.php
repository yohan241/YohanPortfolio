<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class MY_URI extends CI_URI {
    // CI creates $this->config on URI instances in some versions — declare it
    public $config;

    public function __construct()
    {
        parent::__construct();
    }
}
