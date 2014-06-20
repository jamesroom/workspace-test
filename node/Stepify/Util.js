/**
 * Created by lunjiang on 14-2-27.
 */
var Util = {
    isFunction:function(fn){
        return  Object.prototype.toString.call(fn) ==='[object Function]'?true :false;
    },

    find:function(arr,fn){

    },
    /**
     * data is object or array
     * @param data
     */
    cloneData:function(data){
        var type = this.getType(data);
        if(type== 'Array'){
            return data.slice(0);
        }
        if(type == 'Object'){
            var ret = {};
            for(var i in data){
                var type = this.getType(data[i]);
                if(type== 'Object' || type== 'Array'){
                    ret[i] = this.cloneData(data[i]);
                }
                ret[i] = data[i];
            }
            return ret;
        }
        return data;
    },
    getType:function(data){
      var ret = Object.prototype.toString.call(data);
      return ret.replace(/\[object\s*/,'').replace(']','');
    },
    hasPrototypeProperty:function(obj,name){
        return obj[name]&&!obj.hasOwnProperty(name)&&(name in obj);
    },
    setTimeout:function(fn,time){
        var args = Array.prototype.slice.call(arguments,2);
        var _fn = function(){
            fn.apply(null,args);
        };
        return window.setTimeout(_fn,time);
    },
    domListToArray:function(nodeList){
        var arr = null;
        try{
            arr = Array.prototype.slice.call(nodeList);
        }catch(e){
            arr = [];
            for(var i= 0,len=nodeList.length;i<len;i++){
                arr.push(nodeList[i]);
            }
        }
        return arr;
    },
    // callback the callback name
    // url  the calllback url
    getJsonp:function(url,callback){
        var script  = document. createElement("script");
        var head = document.getElementsByTagName("head")[0];
        url = url.replace(/(?=\?).+?|$/,function(a){
                return "?callback="+callback;
            });
         script.onload = script.onreadystatechange = function( _, isAbort ) {

                        if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

                            // Handle memory leak in IE
                            script.onload = script.onreadystatechange = null;

                            // Remove the script
                            if ( head && script.parentNode ) {
                                head.removeChild( script );
                            }

                            // Dereference the script
                            script = undefined;

                            // Callback if not abort
                            if ( !isAbort ) {
                                callback( 200, "success" );
                            }
                        }
                    };
        head.appendChild(script);

    },
    mix:function(obj1,obj2){
        for(var i in obj2){
            obj1[i] = obj2[i]
        };
        return obj1;
    }


}