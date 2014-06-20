/**
 * Created with JetBrains PhpStorm.
 * User: kathleen
 * Date: 12-12-8
 * Time: 下午7:42
 * To change this template use File | Settings | File Templates.
 */
function Position(id,name,x,y,w,h,cxt){
    this.name = name;
    this.id = id;
    this.x = x;
    this.y = y ;
    if(w){
        this.w = w;
    }
    if(h){
        this.h = h;
    }
    if(cxt){
        var cxt = cxt;
    }
    this.draw = function(){
        this.drawRect();
        this.drawText(this.name);
    }
    this.isBelongPosition=function(x,y){
        var result = this.isBelong(x,y);
        if(result){
           return {type:"position",id:this.id,name:this.name};
        }
        return false;
    }
}
Position.prototype =  new base();
function positions(data,x,y,H){//r_h调整高度
    this.x = x;
    this.y = y;
    this.w = 80;
    this.data = data;
    var len = data.length;
    var s_h = 10;
    this.default_h = 40;
    var h = this.default_h;//position height;
    var t_h = len *h + s_h * (len+1);//实际高度
    this.h = t_h > H ? t_h :H;
    this.H = H;
    this.draw = function(){
        cxt.moveTo(this.x,this.y);
        cxt.rect(this.x,this.y,this.w,this.h);
        cxt.stroke();
        var x = this.x;
        var w = this.w;
        var h = 40;//position height;
        var len = this.data.length;
        var y  = this.y + s_h;
        var t_h = len *h + s_h * (len+1);//实际高度
        var data = this.data;
        var l_h = t_h - this.H;
        if(l_h >=0){
            this.h = t_h;
            for(var i = 0;i<data.length;i++){
                data[i] = new Position(data[i].id,data[i].name,x,y,w,h,cxt);
                data[i].draw();
                y= y+ s_h +h;
            }
            return l_h;
        }
        if(l_h <0){//空间过大，需要居中
            y = y + Math.abs(l_h/2);
            for(var i = 0;i<data.length;i++){
                data[i] = new Position(data[i].id,data[i].name,x,y,w,h,cxt);
                data[i].draw();
                y= y+ s_h +h;
            }
            return 0;
        }
    }
    this.reDraw=function(h){
        cxt.moveTo(this.x,this.y);
        cxt.rect(this.x,this.y,this.w,this.h);
        cxt.stroke();
        var data = this.data;
        for(var i = 0;i<data.length;i++){
            data[i].y = data[i].y + h;
            data[i].draw();
        }
    }
    this.isBelong= function(x,y){
        for(var i = 0;i<data.length;i++){
            var result = data[i].isBelong(x,y);
            return result ?  result: false;
        }
    }
}
