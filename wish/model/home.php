<?php
/**
 * Created by JetBrains PhpStorm.
 * User: kathleen
 * Date: 13-9-3
 * Time: 上午10:28
 * To change this template use File | Settings | File Templates.
 */
require_once("db.php");
function page_home_list(){
    echo "this is list";
}
//添加愿忘　
function page_home_add(){
    $data = array(
        "insert_row_time" =>time(),
        "update_row_time" => time(),
        "content" => $_REQUEST["content"],
        "name" => $_REQUEST["name"]
    );
    insert_wish();
}
