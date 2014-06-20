/**
 * Created with JetBrains PhpStorm.
 * User: kathleen
 * Date: 12-12-16
 * Time: 下午5:34
 * To change this template use File | Settings | File Templates.
 */
function position(config, data){
    this.x = config.x;
    this.y = config.y;

    var w = 80;
    var h = 40;
    this.w = w;

    var s_h =10;
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
    this.h = temp_y-this.y-h;
    console.dir(tmp_data);
    this.draw = function(h,dir){//
        if(h ){
			this.y = this.y + h;
			if(dir){
				for(var i= 0,len=this.data.length;i<len;i++){
					this.data[i].draw(h);
					
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
					this.data[i].clear();
				}
			}
			for(var len=this.data.length,i= len-1;i>=0;i--){
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
                     return result;
                 }
            }
        }
        return false;
    }
}
