

/*$(document).ready(function() {

 }*//*.require(['ui.validate', 'ui.form', 'ui.autocomplete'], ['ui.validate_def','ui.autocomplete_def'])*//*);*/


;(function(){
    /**
     * 联系人联想
     */
    autoUser();
    function autoUser(){
        var url = '/bj/Crm/Ajax/MyContact/';
        J.g('auto').autocomplete({
            url:url,
            width:"259",
            autoSubmit:false,
            forceClear:false,
            source:[{mail:'@qq.com'},{mail:'@163.com'},{mail:'@anjuke.com'},{mail:'@gamil.com'},{mail:'@162.com'},{mail:'@baidu.com'}],
            dataMap:function(data){
                data.k = data.mail;
                data.l = data.mail;
                data.v = data.mail;
                return data;
            },
            itemBuild:function(item){
                console.log(item);

                return {
                    l:J.g('auto').val()+item.l
                 //   v:item.l
                }
            },
            onFocus:function(){

            },
            onBlur:function(){
            },
            onForceClear:function(){
            },
            onSelect:function(data){
                J.g("task_user")&& J.g("task_user").val(data.k);
                return;
            },
            onResult:function(obj,data){//有返回结果
                return;
            }
        });
    }
}.require(['ui.validate', 'ui.form', 'ui.autocomplete'], ['ui.validate_def','ui.autocomplete_def']));

