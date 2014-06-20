
function department(config, data){
    this.x = config.x;
    this.y = config.y;

    var w = 100;
    var h = 50;
    this.w = w;
    var s_h =20;
    var tmp_data = new Array();
    var temp_y = this.y;
    for(var i= 0,len=data.length;i<len;i++){
        var temp_x = this.x;
        temp_y = temp_y+ s_h;
        tmp_data.push(new Cire({x:temp_x,y:temp_y,w:w,h:h},{id:data[i].id,name:data[i].name}));
        temp_y = temp_y + h;
    }
    temp_y + s_h;
    this.data = tmp_data;
    this.h = temp_y-this.y;
    this.draw = function(h,dir){
            if(h ){
			this.y = this.y + h;
			if(dir){
				for(var i= 0,len=this.data.length;i<len;i++){
					this.data[i].draw(h);
					return;
				}
			}
			for(var len=this.data.length,i= len-1;i>=0;i--){
					this.data[i].draw(h);
				}
        }
        for(var i= 0,len=this.data.length;i<len;i++){
            this.data[i].draw();

        }
    }
    this.clear = function(dir){//遍历删除
    	if(dir){
				for(var i= 0,len=this.data.length;i<len;i++){

					if(this.data[i].state && this.data[i].child){//first ,we need clear child ,is existed
                        this.data[i].child.clear();
                    }
                    this.data[i].clear();

				}
			}
			for(var len=this.data.length,i= len-1;i>=0;i--){
                if(this.data[i].state && this.data[i].child){//first ,we need clear child ,is existed
                    this.data[i].child.clear();
                }
					this.data[i].clear();
				}
    	
    }
    this.isBelong = function(x,y){
        var s_x = this.x;
        var s_y = this.y;
        var e_x = this.x + this.w;
        var e_y  = this.y + this.h;
        if(x > s_x && x < e_x && y > s_y && y < e_y){
            for(var i= 0,len=this.data.length;i<len;i++){
                var result =  this.data[i].isBelong(x,y);
                if(result){
                      var obj = this.data[i];
                     var h = this.clickHandler(obj,result);
                    return h;
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
            var data = [{id:1,name:"james"},{id:1,name:"james"},{id:1,name:"james"},{id:1,name:"james"},{id:1,name:"james"}];
            obj.child = new position(config,data);
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
}
