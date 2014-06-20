function getPosition(h){
    var a=navigator.userAgent.toLowerCase();
    var b=(a.indexOf("opera")!=-1);
    var e=(a.indexOf("msie")!=-1&&!b);
    var d=h;
    if(d.parentNode===null||d.style.display=="none"){
        return false
    }
    var l=null;
    var k=[];
    var i;
    if(d.getBoundingClientRect){
        i=d.getBoundingClientRect();
        if(a.indexOf("ipad")!=-1){
            return{
                x:i.left,y:i.top
            }
        }
        var c=jQuery(window).scrollTop();
        var f=jQuery(window).scrollLeft();
        return{
            x:i.left+f,y:i.top+c
        }
    }
    else{
        if(document.getBoxObjectFor){
            i=document.getBoxObjectFor(d);
            var j=(d.style.borderLeftWidth)?parseInt(d.style.borderLeftWidth):0;
            var g=(d.style.borderTopWidth)?parseInt(d.style.borderTopWidth):0;
            k=[i.x-j,i.y-g]
        }
        else{
            k=[d.offsetLeft,d.offsetTop];
            l=d.offsetParent;
            if(l!=d){
                while(l){
                    k[0]+=l.offsetLeft;
                    k[1]+=l.offsetTop;
                    l=l.offsetParent
                }
            }
            if(a.indexOf("opera")!=-1||(a.indexOf("safari")!=-1&&d.style.position=="absolute")){
                k[0]-=document.body.offsetLeft;
                k[1]-=document.body.offsetTop
            }
        }
    }
    if(d.parentNode){
        l=d.parentNode
    }
    else{
        l=null
    }
    while(l&&l.tagName!="BODY"&&l.tagName!="HTML"){
        k[0]-=l.scrollLeft;
        k[1]-=l.scrollTop;
        if(l.parentNode){
            l=l.parentNode
        }
        else{
            l=null
        }
    }
    return{
        x:k[0],y:k[1]
    }
}
jQuery(document).ready(function lazyload(){
    var d=jQuery("img[src2]");
    var a=function(){
        return jQuery(window).height()+jQuery(window).scrollTop()
    };
    imgLoad(d,a());
    var c=150;
    var b=0;
    jQuery(window).bind("scroll",function(){
        var e=Math.abs(jQuery(window).scrollTop()-b);
        if(e>=c){
            imgLoad(d,a());
            if(imgLoadStatus==1){
                b+=c;
                imgLoadStatus=0
            }
        }
    })
});
var imgLoadStatus=0;
function imgLoad(b,a){
    b=jQuery("img[src2]");
    b.each(function(){
        var d=jQuery(this).attr("src2");
        if(d){
            var c=getPosition(jQuery(this)[0]).y;
            if(c<=a&&(c+jQuery(this).height())>=jQuery(window).scrollTop()){
                jQuery(this).attr("src",d).removeAttr("src2")
            }
        }
    });
    imgLoadStatus=1
};