/**
 * Created with JetBrains PhpStorm.
 * User: kathleen
 * Date: 13-3-11
 * Time: 下午3:29
 * To change this template use File | Settings | File Templates.
 */
(function(window){
    var defaultOPts={
        id:'block1',
        x:"800px",
        y:"800px",
        time:18000
    }
    function move(opts){
        var x1,y1,x2,y2,time,obj,k;
        function init(opts){
            opts = opts || {};
            var id= opts.id || defaultOPts.id;
            obj = document.getElementById(id);
            if(!id){
                alert("指定的ID不存在");
            }
            x1 = parseFloat( getComputedStyle(obj,"left"));
            y1 = parseFloat( getComputedStyle(obj,"top"));
            x2 = parseFloat( opts.x || defaultOPts.x);
            y2 = parseFloat( opts.y || defaultOPts.y);
            time = parseInt(opts.time || defaultOPts.time);
            k=getAngularRate(x1,y1,x2,y2);
        }
        init(opts);
        function getComputedStyle(obj,attr){
            var styledObj = document.defaultView&&document.defaultView.getComputedStyle(obj,null) || obj.currentStyle;
            return styledObj[attr];
        }
        function getAngularRate(x1,y1,x2,y2){
            var denominator = x2-x1;
            if(!denominator){
                return false;
            }
            return (y2-y1)/denominator;
        }
        function start(){
            var length = x2-x1;
            var rate = length/time;
            var total = 0;
            var timeKey = setInterval(function(){
                total++;
                obj.style.left=total*rate+"px";
                obj.style.top= k*total* rate+"px";
            },1);
            setTimeout(function(){
                clearTimeout(timeKey);
            },time);
        }
        return {
            start:start
        }

    }

    window.move = move;
})(window);