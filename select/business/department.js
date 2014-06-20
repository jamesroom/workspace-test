/**
 * Created with JetBrains PhpStorm.
 * User: kathleen
 * Date: 12-12-8
 * Time: 下午7:42
 * To change this template use File | Settings | File Templates.
 */
function Department(id,name,x,y,w,h,cxt){
    this.name = name;
    this.id = id;
    this.x = x;
    this.y = y ;
    this.state = false;
    if(w){
        this.w = w;
    }
    if(h){
        this.h = h;
    }
    if(cxt){
        var cxt = cxt;
    }
    this.draw = function(h){

        if(h){

           if(this.children){

               if(this.state){

                   this.children.reDraw(h);
               }
           }
        }
        this.drawRadiusRect();
        this.drawText(this.name);
    }
    this.isBelongDepartment=function(x,y){
        var result = this.isBelong(x,y);
        if(result){
            return {type:"department",id:this.id,name:this.name};
        }
        return false;
    }
}
Department.prototype =  new base();
function Departments(data,x,y,H){//r_h调整高度
    this.x = x;
    this.y = y;
    this.w = 100;
    this.data = data;
    this.s_h  = 20;
    var len = data.length;
    var s_h = this.s_h;
    var h = 50;//position height;
    var t_h = len *h + s_h * (len+1);//实际高度
    this.h = t_h > H ? t_h :H;
    this.draw = function(){
        var x = this.x;
        var w = this.w;
        var h = 40;//position height;
        var len = this.data.length;
        var y  = this.y + s_h;
        var t_h = len *h + s_h * (len+1);//实际高度
        var l_h = t_h -this.h;
        var data = this.data;
        if(l_h >=0){
            this.h = t_h;
            for(var i = 0;i<data.length;i++){
                data[i] = new Department(data[i].id,data[i].name,x,y,w,h,cxt);
                data[i].draw();
                y= y+ s_h +h;
            }
            return l_h;
        }
        if(l_h <0){//空间过大，需要居中
            y = y + Math.abs(l_h/2);
            for(var i = 0;i<data.length;i++){
                data[i] = new Department(data[i].id,data[i].name,x,y,w,h,cxt);
                data[i].draw();
                y= y+ s_h +h;
            }
            return l_h;
        }
    }
    this.reDraw=function(h){
        var data = this.data;
        for(var i = 0;i<data.length;i++){
            data[i].y = data[i].y + h;
            data[i].draw();
        }
    }
    this.isBelong= function(x,y){
        var data = this.data;
        for(var i = 0;i<data.length;i++){
            var obj = data[i];
            var result = obj.isBelongDepartment(x,y);
               if(result){//是否于这个部门
                   var id = obj.id;//部门id
                   var name = obj.name;//部门名称
                   //测试数据
                   //data 职位数组 id name必含
                   //start_x 块的起始位置 左上角的坐标x
                   //start_y 块的起始位置 左上角的坐坐y
                   //block_h 块的高度 假如数据超过高度，则为返回一个超过的高度值
                   var start_x =obj.x +300;
                   var start_y = obj.y;
                   var block_h =obj.h;
                   if(!obj.children){
                       var data=[{id:"1",name:"职位1"},{id:"2",name:"职位2"},{id:"3",name:"职位3"},{id:"4",name:"职位4"},{id:"1",name:"职位1"},{id:"2",name:"职位2"}];

                       obj.children = new positions(data,start_x,start_y,block_h);

                   }
                   if(obj.state){//展开状态,点击后收缩
                       var x = obj.children.x-cxt.lineWidth;
                       var y = obj.children.y;
                       var w = obj.children.w+cxt.lineWidth*2;
                       var h = obj.children.h;
                       cxt.clearRect(x,y,w,h);
                       obj.state = false;
                       this.indexChange(obj,-h+obj.h);
                       obj.children.h = obj.children.default_h;//怀复高度

                       //return 0;
                        return;
                   }
                    result =  obj.children.draw();//未展开状态
                     obj.state = true;
                    if(result > 0){
                        this.indexChange(obj,result);;
                    }
                   obj.children.draw();//未展开状态
                    return 0;
               }
        }
    }
    this.indexChange= function(obj,h){
        if(!obj.state){
            for(var i =0;i<this.data.length;i++){
                if(obj == this.data[i]){//找到需要调整位置 的数据
                    obj.y = obj.y + h/2;
                    obj.draw();
                    i++;
                    while(i<this.data.length){
                        var temp = data[i];
                        temp.y = temp.y + h;
                        temp.draw(h);
                        i++;

                    }
                    return;
                }

            }
            return h;
        }
        for(var i =this.data.length-1 ;i >= 0;i--){
            if(obj == this.data[i]){//找到需要调整位置 的数据
                obj.y = obj.y + h/2;
                obj.draw();
                return;
            }
            var temp = data[i];
            temp.y = temp.y + h;
            temp.draw(h);
           // alert("asdfa");
        }
        return h;
    }
}
