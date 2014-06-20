/**
 * Created with JetBrains PhpStorm.
 * User: lunjiang
 * Date: 12-12-8
 * Time: 下午2:57
 * x:begain x
 * y:begain y
 * type:1,rectange
 * type:2,circle
 * type:3,line
 * To change this template use File | Settings | File Templates.
 */
function clear(x,y,w,h,type,lineWidth){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.lineWidth = lineWidth;
    this.type = type;
    this.clear= function(){
        switch (this.type){
            case 1:
                cxt.clearRect(this.x- this.lineWidth,this.y- this.lineWidth,this.w+2*this.lineWidth,this.h+2*this.lineWidth);//清除长方形，w,h ,长宽
                break;
            case 2:
                cxt.clearRect(this.x-this.w- this.lineWidth,this.y-this.w- this.lineWidth,2*this.w+2*this.lineWidth,2*this.w+2*this.lineWidth);//清除圆，所以w = r
                break;
            case 3:
                if(this.w - this.x){//水平直线
                    cxt.clearRect(this.x,this.y-this.lineWidth,this.w-this.x,2*this.lineWidth);//清除，直线，w,为第二个坐标
                    return;
                }
                if(this.h-this.y){//竖线
                    cxt.clearRect(this.x-this.lineWidth,this.y,2*this.lineWidth,this.h-this.y);
                    return;
                }
                break;
        }
    }
}
