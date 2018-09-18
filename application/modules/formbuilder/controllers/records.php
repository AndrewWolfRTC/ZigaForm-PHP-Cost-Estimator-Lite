<?php

/**
 * Intranet
 *
 * PHP version 5
 *
 * @category  PHP
 * @package   PHP_Form_Builder
 * @author    Softdiscover <info@softdiscover.com>
 * @copyright 2013 Softdiscover
 * @license   http://www.php.net/license/3_01.txt  PHP License 3.01
 * @version   CVS: $Id: intranet.php, v2.00 2013-11-30 02:52:40 Softdiscover $
 * @link      https://php-cost-estimator.zigaform.com/
 */
if (!defined('BASEPATH')) {
    exit('No direct script access allowed');
}

/**
 * Estimator intranet class
 *
 * @category  PHP
 * @package   PHP_Form_Builder
 * @author    Softdiscover <info@softdiscover.com>
 * @copyright 2013 Softdiscover
 * @license   http://www.php.net/license/3_01.txt  PHP License 3.01
 * @version   Release: 1.00
 * @link      https://php-cost-estimator.zigaform.com/
 */
class Records extends MX_Controller {
    /**
     * max number of forms in order show by pagination
     *
     * @var int
     */

    const VERSION = '0.1';

    /**
     * name of form estimator table
     *
     * @var string
     */
    var $per_page = 5;
    protected $modules;

    /**
     * Records::__construct()
     * 
     * @return 
     */
    function __construct() {
        parent::__construct();
        $this->load->language_alt(model_settings::$db_config['language']);
        $this->template->set('controller', $this);
        $this->load->model('model_forms');
        $this->load->model('model_fields');
        $this->load->model('model_record');
        //$this->auth->authenticate(true);
    }

    /**
     * Records::ajax_load_viewchart()
     * 
     * @return 
     */
    public function ajax_load_viewchart() {
        
        $this->auth->authenticate(true);
        
        $form_id = (isset($_POST['form_id']) && $_POST['form_id']) ? Uiform_Form_Helper::sanitizeInput($_POST['form_id']) : 0;

        $data_chart = $this->model_record->getChartDataByIdForm($form_id);

        $data = array();
        $data['data'] = $data_chart;
        header('Content-Type: application/json');
        echo json_encode($data);
        die();
    }

    /**
     * Records::ajax_load_savereport()
     * 
     * @return 
     */
    public function ajax_load_savereport() {
        
        $this->auth->authenticate(true);
        
        $form_id = (isset($_POST['form_id']) && $_POST['form_id']) ? Uiform_Form_Helper::sanitizeInput($_POST['form_id']) : 0;
        $data_fields = (isset($_POST['data']) && !empty($_POST['data'])) ? array_map(array('Uiform_Form_Helper', 'sanitizeRecursive'), $_POST['data']) : array();
        $data_fields2 = (isset($_POST['data2']) && !empty($_POST['data2'])) ? array_map(array('Uiform_Form_Helper', 'sanitizeRecursive'), $_POST['data2']) : array();
        
        /* update all fields by form */
        $where = array('form_fmb_id' => $form_id);
        $data = array('fmf_status_qu' => 0);

        $this->db->set($data);
        $this->db->where($where);
        $this->db->update($this->model_fields->table);
        //update the fields to show in list
        if (!empty($data_fields)) {
            foreach ($data_fields as $value) {
                $where = array('form_fmb_id' => $form_id, 'fmf_uniqueid' => $value);
                $data = array('fmf_status_qu' => 1);

                $this->db->set($data);
                $this->db->where($where);
                $this->db->update($this->model_fields->table);
            }
        }
        
        //update order for all fields according to form
        if (!empty($data_fields2)) {
            foreach ($data_fields2 as $value) {
                $where = array('form_fmb_id' => $form_id, 'fmf_uniqueid' => $value['name']);
                $data = array('order_rec' => $value['value']);

                $this->db->set($data);
                $this->db->where($where);
                $this->db->update($this->model_fields->table);
            }
        }
        
        die();
    }

    /**
     * Records::ajax_load_customreport()
     * 
     * @return 
     */
    public function ajax_load_customreport() {
        $this->auth->authenticate(true);
        
        $form_id = (isset($_POST['form_id']) && $_POST['form_id']) ? Uiform_Form_Helper::sanitizeInput($_POST['form_id']) : 0;

        $all_fields = $this->model_record->getAllFieldsForReport($form_id);

        $data = array();
        $data['list_fields'] = $all_fields;

        $textfield_tmp = $this->load->view('formbuilder/records/custom_report_getAllfields', $data, true);
        echo $textfield_tmp;
        die();
    }

    /**
     * Records::view_charts()
     * 
     * @return 
     */
    public function view_charts() {
        $this->auth->authenticate(true);
        
        $data = array();
        $data['list_forms'] = $this->model_forms->getListForms();
        $this->template->loadPartial('layout', 'records/view_charts', $data);
    }

    /**
     * Records::custom_report()
     * 
     * @return 
     */
    public function custom_report() {
        $this->auth->authenticate(true);
        
        $data = array();
        $data['list_forms'] = $this->model_forms->getListForms();

        $this->template->loadPartial('layout', 'records/custom_report', $data);
    }

    /**
     * Records::ajax_load_record_byform()
     * 
     * @return 
     */
    public function ajax_load_record_byform() {
        $this->auth->authenticate(true);
        
        $form_id = (isset($_POST['form_id']) && $_POST['form_id']) ? Uiform_Form_Helper::sanitizeInput($_POST['form_id']) : 0;
        //records to show
        $name_fields = $this->model_record->getNameFieldEnabledByForm($form_id,true);
        $data = array();
        $data['datatable_head'] = $name_fields;
        //process record
        $flag_types=array();
        foreach ($name_fields as $key=>$value) {
            
            $flag_types[$key] = $value->fby_id;
           
        }
       
        $pre_datatable_body= $this->model_record->getDetailRecord($name_fields,$form_id);
        $new_record=array();
        foreach ($pre_datatable_body as $key => $value) {
            $count1=0;
            foreach ($value as $key2 => $value2) {
                
                 $new_record[$key][$key2]=$value2;
                 
                if(isset($flag_types[$count1])){
                    switch (intval($flag_types[$count1])) {
                        case 12:
                        case 13:    
                            //checking if image exists
                            if(@is_array(getimagesize($value2))){
                                 $new_record[$key][$key2]='<img width="100px" src="'.$value2.'"/>';
                            }  
                            break;
                        default:
                            break;
                    }
                }
                $count1++;
               
            }
            
        }
                        
        $data['datatable_body'] = $new_record;
        $textfield_tmp = $this->load->view('formbuilder/records/list_records_getdatatable', $data, true);
        echo $textfield_tmp;
        die();
    }

    /**
     * Records::ajax_delete_record()
     * 
     * @return 
     */
    public function ajax_delete_record() {
        $this->auth->authenticate(true);
        
        $form_id = (isset($_POST['rec_id']) && $_POST['rec_id']) ? Uiform_Form_Helper::sanitizeInput($_POST['rec_id']) : 0;
        $where = array(
            'fbh_id' => $form_id
        );
        $data = array(
            'flag_status' => 0
        );

        $this->db->set($data);
        $this->db->where($where);
        $this->db->update($this->model_record->table);
    }

    /**
     * Records::info_records_byforms()
     * 
     * @return 
     */
    public function info_records_byforms() {
        $this->auth->authenticate(true);
        
        $data = array();
        $data['list_forms'] = $this->model_forms->getListForms();
        $this->template->loadPartial('layout', 'records/list_records_byforms', $data);
    }

    /**
     * Records::info_record()
     * 
     * @return 
     */
    public function info_record() {
        $this->auth->authenticate(true);
        
        $id_rec = (isset($_GET['id_rec']) && $_GET['id_rec']) ? Uiform_Form_Helper::sanitizeInput($_GET['id_rec']) : 0;
        $name_fields = $this->model_record->getNameField($id_rec);
        $form_rec_data = $this->model_record->getFormDataById($id_rec);
        $form_data=json_decode($form_rec_data->fmb_data, true);;
        $form_data_currency = (isset($form_data['main']['price_currency'])) ? $form_data['main']['price_currency'] : '';
        
           //price numeric format
        $format_price_conf=array();
        $format_price_conf['price_format_st']=(isset($form_data['main']['price_format_st']))?$form_data['main']['price_format_st']:'0';
        $format_price_conf['price_sep_decimal']=(isset($form_data['main']['price_sep_decimal']))?$form_data['main']['price_sep_decimal']:'.';
        $format_price_conf['price_sep_thousand']=(isset($form_data['main']['price_sep_thousand']))?$form_data['main']['price_sep_thousand']:',';
        $format_price_conf['price_sep_precision']=(isset($form_data['main']['price_sep_precision']))?$form_data['main']['price_sep_precision']:'2';
        
        //calculation
        $form_calculation = (isset($form_data['calculation']['enable_st']))?$form_data['calculation']['enable_st']:'0';
         
        
        $name_fields_check = array();
        $fields_type_check = array();
        foreach ($name_fields as $value) {
            $name_fields_check[$value->fmf_uniqueid] = $value->fieldname;
            $fields_type_check[$value->fmf_uniqueid] = $value->type_fby_id;
        }
       
        $data_record = $this->model_record->getRecordById($id_rec);
        $record_user = json_decode($data_record->fbh_data, true);
        $new_record_user = array();
        foreach ($record_user as $key => $value) {
            if (isset($name_fields_check[$key])) {
                $key_det = $name_fields_check[$key];
            }
            if (isset($fields_type_check[$key])) {
                
                switch (intval($value['type'])) {
                    case 9:case 11:
                        $new_record_user[] = array('field' => $key_det,'type'=>$fields_type_check[$key],'value' => $value['input_value']);
                        break;
                     case 12:case 13:
                    
                    $value_new=$value['input'];
                    //checking if image exists
                            if(@is_array(getimagesize($value_new))){
                                 $value_new='<img width="100px" src="'.$value_new.'"/>';
                            }
                    
                      $new_record_user[] = array('field' => $value['label'],'type'=>$fields_type_check[$key], 'value' => $value_new);
                    break;
                    default:
                        $new_record_user[] = array('field' => $key_det,'type'=>$fields_type_check[$key],'value' => $value['input']);
                        break;
                }
                
                
            } 
        }
        $data = array();
        $data2 = array();
        
           //processs tax
          $form_data_tax_st = (isset($form_data['main']['price_tax_st'])) ? $form_data['main']['price_tax_st'] : '0';
        $form_data_tax_val = (isset($form_data['main']['price_tax_val'])) ? $form_data['main']['price_tax_val'] : '';
        
        $tmp_amount_total=  floatval($form_rec_data->fbh_total_amount);
        if(isset($form_data_tax_st) && intval($form_data_tax_st)===1){
            $tmp_tax=(floatval($form_data_tax_val)/100);
            $tmp_sub_total=($tmp_amount_total)*(100 / (100 + (100 * $tmp_tax)));
             $data['form_subtotal_amount'] = $tmp_sub_total;
             $data['form_tax'] = $tmp_amount_total - $tmp_sub_total;
        }
        
        $data['form_total_amount'] = $tmp_amount_total;
        $data['form_currency'] = $form_data_currency;
        $data['form_calculation'] = $form_calculation;
        $data['record_id'] = $id_rec;
        $data['record_info'] = $data2['record_info'] = $new_record_user;
        
       
       
        $data['price_format'] = $format_price_conf;
        
        $data['info_date'] = $data2['info_date'] = date("F j, Y, g:i a", strtotime($data_record->created_date));
        $data['info_ip'] = $data2['info_ip'] = $data_record->created_ip;
        require_once( APPPATH . '/helpers/clientsniffer.php' );
        $data['info_useragent'] = $data2['info_useragent'] = ClientSniffer::test(array($data_record->fbh_user_agent));
        $data['info_referer'] = $data2['info_referer'] = $data_record->fbh_referer;
        $data['form_name'] = $data2['form_name'] = $form_rec_data->fmb_name;
        $data2['info_labels'] = array(
            'title' => __('Entry information', 'FRocket_admin'),
            'info_submitted' => __('Submitted form data', 'FRocket_admin'),
            'info_additional' => __('Additional info', 'FRocket_admin'),
            'info_date' => __('Date', 'FRocket_admin'),
            'info_ip' => __('IP', 'FRocket_admin'),
            'info_pc' => __('Client PC info', 'FRocket_admin'),
            'info_frmurl' => __('Form URL', 'FRocket_admin'),
            'form_name' => __('Form name', 'FRocket_admin')
        );
        
        $data['info_export'] = Uiform_Form_Helper::base64url_encode(json_encode($data2));
        $data['record_info_str'] = $this->get_info_records($new_record_user,$data); 
        $this->template->loadPartial('layout', 'records/info_record', $data);
    }
    
    public function get_info_records($new_record_user,$data) {
       /*echo json_encode($new_record_user);
       die();*/
         $tmp_form_info='<ul>';
        foreach ($new_record_user as $value) {
            $tmp_form_info.='<li>';
            
                if(isset($value['value']) && is_array($value['value'])){
                            
                    $tmp_form_info.='<b>'.$value['field'].'</b>';
                   
                        switch (intval($value['type'])) {
                            case 8:
                            case 9:
                            case 10:
                            case 11:
                              $tmp_form_info.='<ul>';
                                        foreach ($value['value'] as $key3 => $value3) {
                                            $tmp_form_info.='<li>';
                                           
                                                if(isset($value3['label'])){
                                                    $tmp_form_info.=$value3['label'];
                                                 }
                                                 if(isset($value3['qty']) && floatval($value3['qty'])>0){
                                                        $tmp_form_info.=' - '.__('qty','frocket_front').': '.$value3['qty'].' '.__('Units','FRocket_admin');   
                                                 }
                                                 if( (isset($value3['amount']) && floatval($value3['amount'])>0) && intval($data['form_calculation'])===0 ){ 
                                                    $tmp_form_info.=' - '.__('Amount','frocket_front').': '.Uiform_Form_Helper::cformat_numeric($data['price_format'],$value3['amount']).' '.$data['form_currency']; 
                                                  } 
                                                 
                                            
                                            $tmp_form_info.='</li>';
                                        }
                                    $tmp_form_info.='</ul>'; 
                                break;
                            case 16:
                                //slider
                            case 18:
                                //spinner  
                                $tmp_form_info.='<ul>';
                                $tmp_form_info.='<li>'; 
                                if(isset($value['value']['input_cost_amt'])){
                                    if(intval($data['form_calculation'])===1){
                                        //with math calculation
                                        $tmp_form_info.=' : '.Uiform_Form_Helper::cformat_numeric($data['price_format'],$value['value']['input_cost_amt']);
                                    }else{
                                        //withoout math calc
                                        $tmp_form_info.=' cost : '.$value['value']['input'][0]['cost'].' -  qty: '.$value['value']['input'][0]['qty'].' - '.__('Amount','FRocket_admin').' : '.Uiform_Form_Helper::cformat_numeric($data['price_format'],$value['value']['input_cost_amt']).' '.$data['form_currency'].' '.$data['form_currency'];
                                    }

                                }
                                $tmp_form_info.='</li>'; 
                                $tmp_form_info.='</ul>';
                                break;
                            default:
                                if(isset($value['value']) && is_array($value['value'])){
                                    $tmp_form_info.='<ul>';
                                        foreach ($value['value']as $key3 => $value3) {
                                            $tmp_form_info.='<li>';
                                            if( (isset($value['value']['input_cost_amt']) && floatval($value['value']['input_cost_amt'])>0) && intval($data['form_calculation'])===1 ){ 
                                                $tmp_form_info.=$value['value']['input_cost_amt'];
                                            }else{
                                                if(isset($value3['label'])){
                                                    $tmp_form_info.=$value3['label'];
                                                 }
                                                 if(isset($value3['qty']) && floatval($value3['qty'])>0){
                                                        $tmp_form_info.=' - '.__('qty','frocket_front').': '.$value3['qty'].' '.__('Units','FRocket_admin');   
                                                 }
                                                 if( (isset($value3['amount']) && floatval($value3['amount'])>0) && intval($data['form_calculation'])===0 ){ 
                                                    $tmp_form_info.=' - '.__('Amount','frocket_front').': '.Uiform_Form_Helper::cformat_numeric($data['price_format'],$value3['amount']).' '.$data['form_currency']; 
                                                  } 
                                                 
                                            }
                                            $tmp_form_info.='</li>';
                                        }
                                    $tmp_form_info.='</ul>';    
                                }else{
                                    $tmp_form_info.=' : '.$value['value'];
                                }
                                
                                break;
                        }
                    
                    
                }else{
                    
                     switch (intval($value['type'])) {
                            case 8:
                            case 9:
                            case 10:
                            case 11:
                                $tmp_form_info.='<b>'.$value['field'].'</b>';
                                if(!empty($value['value'])){
                                    $tmp_form_info.=' : '.$value['value'];
                                }
                                
                                break;
                            default:
                                $tmp_form_info.='<b>'.$value['field'].'</b>';
                                if(!empty($value['value'])){
                                    $tmp_form_info.=' : '.$value['value'];
                                }
                                break;
                        }
                    
                }
            $tmp_form_info.='</li>';
        }
        $tmp_form_info.='</ul>';
        
        
        return $tmp_form_info;
    }
    
    
    /**
     * Records::list_records()
     * 
     * @return 
     */
    public function list_records($offset = 0) {
        $this->auth->authenticate(true);
        //list all forms
        $data = $config = array();
        //create pagination
        $this->load->library('pagination');
        $config['base_url'] = site_url() . 'formbuilder/records/list_records';
        $config['total_rows'] = $this->model_record->CountRecords();
        $config['per_page'] = $this->per_page;
        $config['first_link'] = 'First';
        $config['last_link'] = 'Last';
        $config['full_tag_open'] = '<ul class="pagination pagination-sm">';
        $config['full_tag_close'] = '</ul>';
        $config['first_tag_open'] = '<li>';
        $config['first_tag_close'] = '</li>';
        $config['last_tag_open'] = '<li>';
        $config['last_tag_close'] = '</li>';
        $config['cur_tag_open'] = '<li><span>';
        $config['cur_tag_close'] = '</span></li>';
        $config['next_tag_open'] = '<li>';
        $config['next_tag_close'] = '</li>';
        $config['prev_tag_open'] = '<li>';
        $config['prev_tag_close'] = '</li>';
        $config['num_tag_open'] = '<li>';
        $config['num_tag_close'] = '</li>';
        $config['page_query_string'] = true;
        $config['query_string_segment'] = 'offset';

        $this->pagination->initialize($config);
        // If the pagination library doesn't recognize the current page add:
        $this->pagination->cur_page = $offset;
        $data['query'] = $this->model_record->getListRecords($this->per_page, $offset);
        $data['pagination'] = $this->pagination->create_links();

        $this->template->loadPartial('layout', 'records/list_records', $data);
    }

    public function action_pdf_show_invoice() {
        modules::run('formbuilder/frontend/pdf_show_invoice');
    }
    
    public function action_pdf_show_record() {
        modules::run('formbuilder/frontend/pdf_show_record');
    }
    
    public function action_csv_show_allrecords() {
        $this->auth->authenticate(true);
        
        $form_id=isset($_GET['id']) ? Uiform_Form_Helper::sanitizeInput($_GET['id']) :'';
       
        echo modules::run('formbuilder/records/csv_showAllForms',$form_id);
       
       die();
    }
    
    public function csv_showAllForms($form_id){
        $this->auth->authenticate(true);
        
        require_once(APPPATH . '/helpers/exporttocsv.php');
        if(false){
            $name_fields = $this->model_record->getNameFieldEnabledByForm($form_id,true);
        }else{
            $name_fields = $this->model_record->getNameFieldEnabledByForm($form_id,false);
        }
        
        $tmp_data = array();
        $tmp_data['datatable_head'] = $name_fields;
        $tmp_data['datatable_body'] = $this->model_record->getDetailRecord($name_fields,$form_id);
       
       $data=array();
       $tmp_ar=array();
       foreach ($tmp_data['datatable_head'] as $value) {
           $tmp_ar[]=$value->fieldname;
       }
       $data[]=$tmp_ar;
       
       foreach ($tmp_data['datatable_body'] as $key => $value) {
           $tmp_ar=array();
            foreach ($value as $key=>$value2){
                if($key!='fbh_id'){
                    $tmp_ar[]=$value2;
                }
                
            }
            $data[]=$tmp_ar;
       }
       
        $tsv = new ExportDataCSV('browser');
        $tsv->filename = "csv_".$form_id.".csv";
        
        $tsv->initialize();
        foreach($data as $row) {
                $tsv->addRow($row);
        }
        $tsv->finalize();
    }
}