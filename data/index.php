<?php
/**
 * Created by PhpStorm.
 * User: kathleen
 * Date: 14-6-5
 * Time: 下午2:22
 */

$callback = $_REQUEST["callback"];
echo $callback.'(alert("callback")'.')';