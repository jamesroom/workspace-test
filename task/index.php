<?php
//echo "{code:-1,msg:''}";
set_time_limit(0);
sleep(10000);
echo "abc(".json_encode(array(
    "code"=>-1,
    "msg" => ""
)).")";