$.ready((function(){
    var label = document.createElement("label");
    label.className="tip";
    $("input").after(label);
    $("input").bind("blur",function(){
        var obj = $(this);
        var target = obj.parent().find(".tip");
        target.text(obj.val());
    });
    $("select").bind("change",function(){
        var type = $(this).val();
        if(type == 1){
            $(".tip").css("left","");
            return;
        }
        $(".tip").css("left",0);
    });
})());