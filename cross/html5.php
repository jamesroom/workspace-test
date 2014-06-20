<?php
/**
 * Created by PhpStorm.
 * User: lunjiang
 * Date: 11/28/13
 * Time: 12:57 AM
 */
header("Access-Control-Allow-Origin:http://www.jamesroom.com:81/");
$ret = array("code"=>0,"msg"=>$_REQUEST["num"]);
//$callback = $_REQUEST["callback"];
echo json_encode($ret);