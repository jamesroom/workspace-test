/**
 * Created with JetBrains PhpStorm.
 * User: kathleen
 * Date: 12-12-16
 * Time: 下午5:34
 * To change this template use File | Settings | File Templates.
 */
function City(config, data){
    this.x = config.x;
    this.y = config.y;
    var w = 120;
    var h = 60;
    this.w = w;
    var s_h =30;
    var tmp_data = new Array();
    var temp_y = this.y;
    for(var i= 0,len=data.length;i<len;i++){
        var temp_x = this.x;
        temp_y = temp_y+ s_h;
        tmp_data.push(new RidCire({x:temp_x,y:temp_y,w:w,h:h},{id:data[i].id,name:data[i].name}));
        temp_y = temp_y + h;
    }
    temp_y + s_h;
    this.data = tmp_data;
    this.h = temp_y-this.y;
    this.draw = function(h){
        if(h){
            for(var i= 0,len=this.data.length;i<len;i++){
                this.data[i].y = this.data[i].y + h;
                this.data[i].draw();
                return;
            }
        }
        for(var i= 0,len=this.data.length;i<len;i++){
            this.data[i].draw();

        }
    }
    this.isBelong = function(x,y){
        var s_x = this.x;
        var s_y = this.y;
        var e_x = this.x + this.w;
        var e_y  = this.y + this.h;
        if( y > s_y && y < e_y){
            for(var i= 0,len=this.data.length;i<len;i++){
                var result =  this.data[i].isBelong(x,y);
                if(result){
                    var obj = this.data[i];
                    this.clickHandler(obj,result);
                    return;
                }//遍功子节点
                if(this.data[i].state && this.data[i].child){
                    var result = this.data[i].child.isBelong(x,y);//子节返回高度
                    var h = result;
                    result = Math.abs(result);
                    if(result){
                       //result is the child return height;
                        this.nextChildDown(this.data[i],2*h);
                    }

                }


            }
        }
        return false;
    }
    this.clickHandler=function(obj,data){//data.name data.id
        if(!obj.state){
            var x = obj.x+ 300;
            var y = obj.y;
            var config = {x:x,y:y};
            var data = [{id:1,name:"technology"},{id:1,name:"MFG"},{id:1,name:"DATA"},{id:1,name:"PRODCUT"},{id:1,name:"OA"}];
            obj.child = new department(config,data);
            var h = obj.child.h;
            this.h = this.h + h;
            this.nextChildDown(obj,h);
            return h/2;
        }
          var h = obj.child.h;
            this.h = this.h - h;
            this.nextChildUp(obj,h);
            return -h/2;
    }
    this.nextChildDown = function(obj,h){
        for(var len=this.data.length,i=len-1;i>=0;i--){
            var temp_obj = this.data[i];
            if(temp_obj != obj){
                if(temp_obj.child){
                    if(temp_obj.state){
                        temp_obj.child.draw(h,false);
                     }
                }
                temp_obj.draw(h);
                continue;
            }
            temp_obj.child.draw();
            temp_obj.draw(h/2);
            temp_obj.state=true;
            return;
        }
    }
    this.nextChildUp = function(obj,h){
        for(var i=0,len=this.data.length;i<len;i++){
            var temp_obj = this.data[i];
            if(temp_obj == obj){
                temp_obj.child.clear();
                temp_obj.draw(-h/2);
                temp_obj.state = false;
                i++;
                while(i<len){
                    temp_obj = this.data[i];
                    if(temp_obj.child){
                        if(temp_obj.state){
                            temp_obj.child.draw(-h/2,true);
                        }
                    }
                    temp_obj.draw(-h);
                    i++;
                }
            }
        }


    }
    this.nextAllEquireDown= function(obj,h){//this method is for all of next obj to move down equire height
        for(var len=this.data.length,i=len-1;i>=0;i--){
            var temp_obj = this.data[i];
            if(temp_obj != obj){
                temp_obj.draw(h);
                continue;
            }
            temp_obj.draw(h);
            return;
        }
    }

}
