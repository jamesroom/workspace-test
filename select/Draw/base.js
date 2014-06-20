/**
 * Created with JetBrains PhpStorm.
 * User: lunjiang
 * Date: 12-12-8
 * Time: 下午12:33
 * To change this template use File | Settings | File Templates.
 */
function base(x,y,w,h,cxt){
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
}
base.prototype.w = 80;//共有的长
base.prototype.h = 40;//共有的宽
base.prototype.drawCircle = function(){//画圆
    if(this.clear){
        this.clear.clear();//清除原有图
    }
    cxt.beginPath();
    cxt.arc(this.x,this.y,this.w,0,2*Math.PI,false);
    cxt.closePath();
    cxt.stroke();
    this.clear = new clear(this.x,this.y,this.w,0,2,cxt.lineWidth);
    this.reDraw= arguments.callee;
};
base.prototype.drawRect = function(){//画长方形
    if(this.clear){
        this.clear.clear();
    }
    cxt.beginPath();
    cxt.rect(this.x,this.y,this.w,this.h);
    cxt.closePath();
    cxt.stroke();
    this.clear = new clear(this.x,this.y,this.w,this.h,1,cxt.lineWidth);
    this.reDraw= arguments.callee;
};
base.prototype.drawRadiusRect = function(r){//画有圆角的长方形
    if(this.clear){
        this.clear.clear();
    }
    this.r= 10;
    if(r){
        this.r = r;
    }
    cxt.beginPath();
    cxt.moveTo(this.x+this.r,this.y);
    cxt.lineTo(this.w+this.x-this.r,this.y);
    cxt.quadraticCurveTo(this.w+this.x,this.y, this.w+this.x, this.y+this.r);
    cxt.lineTo(this.w+this.x,this.h+this.y -this.r);
    cxt.quadraticCurveTo(this.w+this.x,this.h+this.y, this.w+this.x-this.r, this.h+this.y);
    cxt.lineTo(this.x+this.r,this.h+ this.y);
    cxt.quadraticCurveTo(this.x,this.h+this.y, this.x, this.h+this.y -this.r);
    cxt.lineTo(this.x,this.y+this.r);
    cxt.quadraticCurveTo(this.x,this.y,this.x+this.r,this.y);
    cxt.closePath();
    cxt.stroke();
    this.clear = new clear(this.x,this.y,this.w,this.h,1,cxt.lineWidth);
    this.reDraw= arguments.callee;
};
base.prototype.drawText = function(text,font){
    cxt.beginPath();
    cxt.font = "bold 20px 黑体";
    if(font){
        cxt.font= font;
    }
    cxt.textAlign="center";
    cxt.textBaseline="middle";
    cxt.fillText(text, this.x+ this.w/2,this.y+ this.h/2);
    cxt.stroke();
    cxt.closePath();
};
base.prototype.drawLine = function(){//画直线
    this.lineWidth = cxt.lineWidth;
    if(this.clear){//当得绘的时候，需要把上次画 的图像清空
        this.clear.clear();
    }
    cxt.beginPath();
    cxt.moveTo(this.x,this.y);
    cxt.lineTo(this.w,this.h);
    cxt.closePath();
    cxt.stroke();
    this.clear = new clear(this.x,this.y,this.w,this.h,3,this.lineWidth);//3表示直线，暂时只支持横线或竖线
    this.reDraw= arguments.callee;
};
base.prototype.isBelong = function(point_x,point_y,callback){//无回调，返回ture或false
    var x = this.x;
    var y = this.y;
    var end_x = this.x + this.w;
    var end_y = this.y + this.h;
    switch (this.reDraw){
        case base.prototype.drawCircle://为圆的时候
            x = this.x-this.w;
            y = this.y - this.y ;
            end_x = this.x + this.w;
            end_y = this.y + this.h ;
            break;
        case base.prototype.drawRadiusRect:
            x = this.x;
            y = this.y;
            end_x = this.x + this.w;
            end_y = this.y + this.h ;
            break;
        case base.prototype.drawRect:
            x = this.x;
            y = this.y;
            end_x = this.x + this.w;
            end_y = this.y + this.h ;
            break;
        case base.prototype.drawLine://线不好处理
            x = this.x;
            y = this.y- this.lineWidth/2;
            end_x = this.w;
            end_y = this.h;

            return;
            break;
    }

    if(point_x > x && point_x < end_x && point_y > y && point_y < end_y){
        if(callback){
            callback();
            return;
        }
        return true;
    }
    return false;
}
