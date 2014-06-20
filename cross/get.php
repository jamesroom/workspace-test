<?php
/**
 * Created by PhpStorm.
 * User: lunjiang
 * Date: 11/28/13
 * Time: 12:57 AM
 */
 sleep(rand(0,5));
$ret = array("code"=>0,msg=>$_REQUEST["num"]);
$callback = $_REQUEST["callback"];
setcookie("user","12345");
echo $callback.'('.json_encode($ret).')';