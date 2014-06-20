/**
 * Created with JetBrains PhpStorm.
 * User: kathleen
 * Date: 12-12-16
 * Time: 下午1:10
 * To change this template use File | Settings | File Templates.
 */
function Cire(config,values){
    this.x = config.x ? config.x:0;
    this.y = config.y ? config.y:0;
    this.w = config.w ? config.w :80;
    this.h = config.h ? config.h :40;
    this.c_x = this.x;
    this.c_y = this.y+this.h/2;
    this.name = values.name? values.name:"name";
    this.id = values.id? values.id:"id";
    cxt = document.getElementById("canvas");
    cxt = cxt.getContext("2d");
    this.draw = function(h){
        if(this.l_w){
            cxt.moveTo(this.x,this.y);
            cxt.clearRect(this.x-this.l_w,this.y-this.l_w,this.w+ 2*this.l_w,this.h+ 2*this.l_w);
        }
        if(h){
            this.y = this.y + h;
        }
        this.l_w = cxt.lineWidth;
        cxt.beginPath();
        cxt.moveTo(this.x,this.y);
        cxt.rect(this.x,this.y,this.w,this.h);
        cxt.stroke();
        cxt.fillStyle = "red";
        cxt.font = "normal 20px 宋体";
        cxt.textAlign="center";
        cxt.textBaseline="middle";
        cxt.fillText(this.name, this.x+ this.w/2,this.y+ this.h/2);
        cxt.closePath();
        return this.h;
    }
    this.clear = function(){
    	  	cxt.moveTo(this.x,this.y);
            cxt.clearRect(this.x-this.l_w,this.y-this.l_w,this.w+ 2*this.l_w,this.h+ 2*this.l_w);
    }
    this.isBelong= function(x,y){
        var s_x = this.x;
        var s_y = this.y;
        var e_x = this.x + this.w;
        var e_y  = this.y + this.h;

        if(x > s_x && x < e_x && y > s_y && y < e_y){
            return {id:this.id,name:this.name};
        }
        return false;
    }
}
function RidCire(config,values){
    this.x = config.x ? config.x:0;
    this.y = config.y ? config.y:0;
    this.w = config.w ? config.w :80;
    this.h = config.h ? config.h :40;
    this.c_x = this.x;
    this.c_y = this.y + this.h/2;
    this.r = config.r ? config.r : 10;
    this.name = values.name ? values.name : "name";
    this.id = values.id ? values.id : "id";

    this.draw=function(h){
        if(this.l_w){
            cxt.moveTo(this.x,this.y);
            cxt.clearRect(this.x-this.l_w,this.y-this.l_w,this.w+ 2*this.l_w,this.h+ 2*this.l_w);
        }
        if(h){
            this.y = this.y + h;
        }
        this.l_w = cxt.lineWidth;

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

        cxt.fillStyle = "red";
        cxt.font = "normal 20px 宋体";
        cxt.textAlign="center";
        cxt.textBaseline="middle";
        cxt.fillText(this.name, this.x+ this.w/2,this.y+ this.h/2);
        cxt.stroke();
        return this.h;
    }
    this.isBelong= function(x,y){
        var s_x = this.x;
        var s_y = this.y;
        var e_x = this.x + this.w;
        var e_y  = this.y + this.h;

        if(x > s_x && x < e_x && y > s_y && y < e_y){
            return {id:this.id,name:this.name};
        }
        return false;
    }
}
function Line(config){
    this.x= config.x? config.x:0;
    this.y = config.y? config.y:0;
    this.e_x = config.e_x ? config.e_x:0;
    this.e_y = config.e_y ? config.e_y:0;
    this.draw = function(config){
        if(this.l_w){
             cxt.moveTo(this.x,this.y);
           if(this.x == this.e_x){
             cxt.clearRect(this.x-this.l_w,this.y,this.l_w*2,this.e_y-this.y);
           }
           if(this.y == this.e_y){
               cxt.clearRect(this.x,this.y-this.l_w,this.e_x-this.x,this.l_w*2);
           }
        }
        if(config){
            if(config.h){
                this.y = this.y + config.h;
                this.e_y = this.e_y + config.h;
            }
            if(config.w){
                this.x = this.x + config.w;
                this.e_x = this.e_x + config.w;
            }

        }

        this.l_w = cxt.lineWidth;
        cxt.beginPath();
        cxt.moveTo(this.x,this.y);
        cxt.lineTo(this.e_x,this.e_y);
        cxt.closePath();
        cxt.stroke();
    }
}
function ArcAdd(config){
    this.x = config.x ? config.x:0;
    this.y = config.y ? config.y:0;
    this.r = config.r ? config.r:0;
    this.R = config.R ? config.R : 0;
    this.lineWidth = cxt.lineWidth;
    this.draw= function(h){
        this.clear();
        this.y = h ?this.y + h: this.y;
        cxt.beginPath();
        cxt.arc(this.x,this.y,this.r,0,2*Math.PI,false);



        cxt.closePath();

        var x = this.x - this.R/2;
        cxt.moveTo(x,this.y);
        cxt.lineTo(this.x+ this.R/2,this.y);
        cxt.moveTo(this.x,this.y-this.R/2);
        cxt.lineTo(this.x,this.y+ this.R/2);

        cxt.stroke();
    }
    this.clear = function(){
        cxt.clearRect(this.x-this.r- this.lineWidth,this.y-this.r- this.lineWidth,2*this.r+2*this.lineWidth,2*this.r+2*this.lineWidth);//清除圆，所以w = r
    }
    this.isBelong = function(x,y){
        var s_x = this.x-this.r/2;
        var s_y = this.y-this.r/2;
        var e_x = this.x + this.r/2;;
        var e_y  = this.y + this.r/2;
        if(x > s_x && x < e_x && y > s_y && y < e_y){
            return true;
        }
        return false;
    }

}
function ArcSub(config){
    this.x = config.x ? config.x:0;
    this.y = config.y ? config.y:0;
    this.r = config.r ? config.r:0;
    this.R = config.R ? config.R : 0;
    this.lineWidth = cxt.lineWidth;
    this.draw= function(h){
        this.clear();
        this.y = h ?this.y + h: this.y;
        cxt.beginPath();
        cxt.arc(this.x,this.y,this.r,0,2*Math.PI,false);
        cxt.closePath();

        var x = this.x - this.R/2;
        cxt.moveTo(x,this.y);
        cxt.lineTo(this.x+ this.R/2,this.y);
        cxt.stroke();
    }
    this.clear = function(){
        cxt.clearRect(this.x-this.r- this.lineWidth,this.y-this.r- this.lineWidth,2*this.r+2*this.lineWidth,2*this.r+2*this.lineWidth);//清除圆，所以w = r
    }
    this.isBelong = function(x,y){
        var s_x = this.x-this.r/2;
        var s_y = this.y-this.r/2;
        var e_x = this.x + this.r/2;;
        var e_y  = this.y + this.r/2;
        if(x > s_x && x < e_x && y > s_y && y < e_y){
            return true;
        }
        return false;
    }

}

