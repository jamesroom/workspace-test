<?php
/**
 * Created by PhpStorm.
 * User: kathleen
 * Date: 13-12-27
 * Time: 下午3:51
 */
if(isset($_GET["callback"])){
    $str = '{"keyword":"AB","is_contain_num":true,"type":1,"list":[{"keyword":"\u7231\u535a\u5bb6\u56ed","num":74},{"keyword":"\u7231\u535a\u5bb6\u56ed\uff08\u4e00\u81f3\u4e8c\u671f\uff09","num":64},{"keyword":"\u7231\u90a6\u5927\u53a6","num":24},{"keyword":"\u5b89\u6ce2\u8def","num":91},{"keyword":"\u7231\u535a\u5bb6\u56ed \u4e8c\u5ba4","num":31},{"keyword":"\u5b89\u6ce2\u8def200\u5f04","num":14},{"keyword":"\u7231\u535a\u5bb6\u56ed \u4e00\u5ba4","num":25},{"keyword":"\u7231\u535a\u5bb6\u56ed\u4e94\u6751","num":6},{"keyword":"\u7231\u535a\u5bb6\u56ed \u4e09\u5ba4","num":13},{"keyword":"\u5b89\u5e03\u74e6\u6e56","num":448}],"total_info":[{"type":1,"num":447,"name":"\u4e8c\u624b\u623f"},{"type":3,"num":2,"name":"\u597d\u79df"}]}';
    echo $_GET['callback']."(".$str.")";
return;
}


echo '{"keyword":"AB","is_contain_num":true,"type":1,"list":[{"keyword":"\u7231\u535a\u5bb6\u56ed","num":74},{"keyword":"\u7231\u535a\u5bb6\u56ed\uff08\u4e00\u81f3\u4e8c\u671f\uff09","num":64},{"keyword":"\u7231\u90a6\u5927\u53a6","num":24},{"keyword":"\u5b89\u6ce2\u8def","num":91},{"keyword":"\u7231\u535a\u5bb6\u56ed \u4e8c\u5ba4","num":31},{"keyword":"\u5b89\u6ce2\u8def200\u5f04","num":14},{"keyword":"\u7231\u535a\u5bb6\u56ed \u4e00\u5ba4","num":25},{"keyword":"\u7231\u535a\u5bb6\u56ed\u4e94\u6751","num":6},{"keyword":"\u7231\u535a\u5bb6\u56ed \u4e09\u5ba4","num":13},{"keyword":"\u5b89\u5e03\u74e6\u6e56","num":448}],"total_info":[{"type":1,"num":447,"name":"\u4e8c\u624b\u623f"},{"type":3,"num":2,"name":"\u597d\u79df"}]}';