<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class MY_Router extends CI_Router {
    // CI assigns a URI instance onto Router::$uri — declare it to avoid dynamic property creation
    public $uri;

    public function __construct()
    {
        parent::__construct();
    }
}
