<?php
/**
 * Created by PhpStorm.
 * User: lunjiang
 * Date: 11/28/13
 * Time: 12:57 AM
 */
$file_pointer = fopen("/home/kathleen/workspace/workspace-test/haozu/log.txt","a+");
$str = date('Y m d h:i:s')."\t".$_REQUEST["num"]."\t".$_SERVER['HTTP_USER_AGENT']."\t\n";
fwrite($file_pointer,$str);
fclose($file_pointer);
$ret = array("code"=>0,'msg'=>$_REQUEST["num"]);
echo json_encode($ret);
