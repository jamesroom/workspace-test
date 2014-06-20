<?php
/**
 * Created by PhpStorm.
 * User: lunjiang
 * Date: 11/28/13
 * Time: 12:57 AM
 */
sleep(10);
header('Location:'.$_REQUEST["url"].'?'.http_build_query($_REQUEST),TRUE,302);
