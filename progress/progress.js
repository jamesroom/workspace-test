

/**
 * Created with JetBrains PhpStorm.
 * User: lunjiang
 * Date: 13-2-25
 * Time: 下午2:24
 * To change this template use File | Settings | File Templates.
 */
J={};
(function(){
    var defaultOpts = {
        container:document.body,
        data:[{css:{},event:{}}],
        label:{
            width:50,
            height:100,
            html:'<div class="tip_content"><em class="tip_up"></em><span>30%，</span> <a href="#">p完成地图标点</a><span>+30%</span></div>',
            left:0.1,
            top:100
        }
    }
    function Progress(opts){
        var data,labelopts,container,big =0 ,percentTarget= null,height= 0,small =null;
        var arrs=[];
        var objLabel;

        (function(){
            container = opts.container;
            labelopts = opts.label || defaultOpts.label;
            container = document.getElementById(container);
            container.style.position="relative";
            data = opts.data;
            //height = (document.defaultView&&document.defaultView.getComputedStyle(container,null).height) || container.currentStyle.height;
            for(var i= 0,len=data.length;i<len;i++){
                data[i].css.position="absolute";
                arrs.push(create(data[i],container));
            }
            //create the label
            labelopts.container = container;
            objLabel = new label(labelopts);


        })();
        function create(data,container){
            if(!data){
                return;
            }
            var obj = document.createElement("div");

            for(var i in data.css){
                obj.style[i]= data.css[i];
                if(i === "width"){
                    var num = parseFloat(data.css[i]);
                    small = small === null ?  num : small;
                    if(num < small ){
                        small = num;
                        percentTarget = obj;
                    }
                    obj.style.width = parseFloat(data.css[i])+"%";
                }
            }
            for(var i in data.event){
                obj['on'+i]= data.event[i];
            }
            container.appendChild(obj);
            return obj;
        }
        function add(num){
            var per = parseFloat( percentTarget.style.width) + parseFloat( num);
            percentTarget.style.width=per+"%";
            objLabel.xMove(num);
        }
        function set(num){
            percentTarget.style.width= parseFloat(num)+"%";
            objLabel.xMoveTo(num);
        }
        function remove(){
            container.innerHTML='';
        }
        function hide(){
            container.style.display="block";
        }
        function show(){
            container.style.display="none";
        }
        return {
            set:set,
            add:add,
            hide:hide,
            show:show,
            setMessage:objLabel.setMessage
        }
    }
    function label(opts){
        var defaultOpts = {
            container:document.body,
            width:50,
            height:100,
            html:'',
            left:20,
            top:100
        }
        var container,width,height,html,left,top;
        var content;
        function init(opts){
            container =  opts.container || defaultOpts.container;
            width= parseFloat(opts.width || defaultOpts.width)+"%";
            height =parseFloat(opts.height || defaultOpts.height)+"%";
            html = opts.html || defaultOpts.html;
            left = parseFloat(opts.left || defaultOpts.left) +"%";
            top = parseFloat(opts.top || defaultOpts.top) +"%";
            create();
        }
        init(opts);
        function create(){
            var obj = document.createElement("div");
            obj.style.position="absolute";
            obj.style.width = width;
            obj.style.height = height;
            obj.style.left = left;//只是偏移值，默认为跟随当前进度下面
            obj.style.top= top;//只是偏移值，默认为跟随当前进度条的最左测
            typeof html === "string" ? (obj.innerHTML= html) :(obj.appendChild(html));
            container.appendChild(obj);
            content = obj;
        }
        function setMessage(text,id){
            if(text&&tagName){
                var coll = content.getElementById(id);
                coll.innerHTML = text;
            }
        }
        function xMove(num){
            content.style.left = parseFloat(num) + parseFloat(content.style.left)+"%";
        }
        function xMoveTo(num){
            content.style.left =  parseFloat(num)+"%";
        }
        function yMoveTo(num){
            content.style.left =  parseFloat(num)+"%";
        }
        function yMove(num){
            content.style.left =  parseFloat(num)+ parseFloat(num)+"%";
        }
        function show(){
            content.style.display="block";
        }
        function hide(){
            content.style.display="hide";
        }
        function remove(){
            container.removeChild(content);
        }
        return {
            xMove:xMove,
            xMoveTo:xMoveTo,
            yMove:yMove,
            yMoveTo:yMoveTo,
            show:show,
            hide:hide,
            remove:remove,
            setMessage:setMessage
        }
    }
    J.progress = Progress;
})(J);












