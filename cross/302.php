<?php
/**
 * Created by PhpStorm.
 * User: lunjiang
 * Date: 11/28/13
 * Time: 12:57 AM
 */

$ret = array("code"=>0,msg=>$_REQUEST["num"]);
$callback = $_REQUEST["callback"];
echo '<script type="text/javascript">'.$callback.'('.json_encode($ret).')'.'</script>';