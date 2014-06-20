

<?php
/**
 * 调用oauth登录
 * return json格式的用户基本信息
 */
/**
 * 使用前确认安装了php的curl扩展,
 * 使用前请到https://auth.corp.anjuke.com/addclient.php注册您的应用
 * 下面的代码可以直接调用，就可以实现OAUTH登录，
 */


error_reporting(E_ALL);

$client_id = 'wish';
$client_secret = 'a1a8206e';
$oauth_url = 'http://test.lunjiang.dev.aifang.com';
$info = login_with_oauthcurl($client_id, $client_secret, $oauth_url);
var_dump($info);
if(!$info){
    echo "登录失败，请重试，若多次尝试失败请联系管理员";exit;
}
$info = json_decode($info,true);

/*检查用户是否注册，已注册，则正常登录*/
/***************/
/*检查用户是否注册，未注册，则继续获取详细信息*/
$info = get_info_from_ldap($info['access_token'], $oauth_url);
var_dump($info);
if(!$info){
    echo "注册失败，读不到此人域信息，请重试，若多次尝试失败请联系管理员";exit;
}

function login_with_oauthcurl($client_id, $client_secret, $oauth_url){
    if(isset($_REQUEST['access_token']) && $_REQUEST['access_token']){
        var_dump($_REQUEST);
        /*3、用AccessToken,获取info*/
        $access_token = $_REQUEST['access_token'];

        $data = array(
            "oauth_token"=>$access_token,
        );
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $oauth_url."/resource.php");
        curl_setopt($ch, CURLOPT_POST, TRUE);
        curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
        $info = curl_exec($ch);
        if($info) return $info;
        else return false;
        exit();
    }
    header("Content-type: text/html; charset=utf-8");
    /*1、获取临时令牌RequestToken*/
    $array = array(
        "client_id"=>$client_id,
        "response_type"=>"code",/*默认*/
        "curl"=>true,/*使用curl还是使用redirect*/
    );
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $oauth_url."/authorize.php");
    curl_setopt($ch, CURLOPT_POST, TRUE);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($array));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
    $info = json_decode(curl_exec($ch),true);

    var_dump($info);

    if($info['code']){
        /*2、用临时令牌，申请访问令牌,回传地址就是申请时的redirect_uri地址*/
        $data = array(
            "client_id"=>$client_id,
            "client_secret"=>$client_secret,
            "grant_type"=>'authorization_code',/*默认*/
            "code"=>$info['code'],/*临时令牌*/
            "custom"=>"refer://fjioa.daij.dao.com/project/list?fa=0&fda=post",/*可选，用户自定义字段，可用于传跳转地址*/
        );
        header("HTTP/1.1 302 Found");
        header("Location: " . $oauth_url.'/token.php?'.http_build_query($data));
        exit();
    }
}
/**
 * 用户注册流程，
 * 用$access_token到oauth获取用户详细信息
 */
function get_info_from_ldap($access_token, $oauth_url){
    $data = array(
        "oauth_token"=>$access_token,
        "getinfo"=>true,
    );
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $oauth_url."/resource.php");
    curl_setopt($ch, CURLOPT_POST, TRUE);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($data));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
    $info = curl_exec($ch);
    if($info) return $info;
    else return false;
}

