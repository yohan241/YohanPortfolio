<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Windows extends CI_Controller {

	public function load_window($window = '')
        {
            if ($this->input->is_ajax_request()) {
                switch ($window) {
                    case 'getstarted':
                        $this->load->view('windows/getstartedwindow');
                        break;
                    case 'about':
                        $this->load->view('windows/aboutmewindow');
                        break;
                    case 'work':
                        $this->load->view('windows/workwindow');
                        break;
                    case 'home':
                        $this->load->view('windows/homewindow');
                        break;
                    case 'contacts':
                        $this->load->view('windows/contactswindow');
                        break;
                    case 'games':
                        $this->load->view('windows/gameswindow');
                        break;
                    default:
                        show_404();
                        break;
                }
            } else {
                show_404();
            }
        }

}
