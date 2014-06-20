(function(window) {
    CSelect = {
        author : "Aifang Spark",
        version : 1.0,
        Status : 0,
        Scur : 0,
        Offset : function(e) {//获取Select组件的坐标位
            var t = e.offsetTop;
            var l = e.offsetLeft;
            var w = e.offsetWidth;
            var h = e.offsetHeight;
            while( e = e.offsetParent) {
                t += e.offsetTop;
                l += e.offsetLeft;
            };
            return {top : t,left : l,width : w,height : h};
        },
        getPosition : function(h) {//获取当前select组件的Y坐标
            var a=navigator.userAgent.toLowerCase();
            var b=(a.indexOf("opera")!=-1);
            var e=(a.indexOf("msie")!=-1&&!b);
            var d=h;
            if(d.parentNode===null||d.style.display=="none"){
                return false
            }
            var l=null;
            var k=[];
            var i;
            if(d.getBoundingClientRect){
                i=d.getBoundingClientRect();
                if(a.indexOf("ipad")!=-1){
                    return{y:i.top}
                }
                var st = Math.max(document.documentElement.scrollTop,document.body.scrollTop);
                return{y : i.top + st};
            }
            else{
                if(document.getBoxObjectFor){
                    i=document.getBoxObjectFor(d);
                    var g=(d.style.borderTopWidth)?parseInt(d.style.borderTopWidth):0;
                    k=[i.y-g]
                }
                else{
                    k=[d.offsetLeft,d.offsetTop];
                    l=d.offsetParent;
                    if(l!=d){
                        while(l){
                            k[0]+=l.offsetTop;
                            l=l.offsetParent
                        }
                    }
                    if(a.indexOf("opera")!=-1||(a.indexOf("safari")!=-1&&d.style.position=="absolute")){
                        k[0]-=document.body.offsetTop
                    }
                }
            }
            d.parentNode ? l=d.parentNode : l=null;
            while(l&&l.tagName!="BODY"&&l.tagName!="HTML"){
                k[0]-=l.scrollTop;
                l.parentNode ? l=l.parentNode : l=null;
            }
            return{y:k[0]};
        },
        VWH : function(){//获取当前对象的滚动高度
            var scrolltop = document.body.scrollTop | document.documentElement.scrollTop;
            var documetheight = document.documentElement.clientHeight;
            return documetheight + scrolltop;
        },
        addEvent : function(obj, type, fn) {//为对象添加事件
            if(obj.attachEvent) {
                obj['e' + type + fn] = fn;
                obj[type + fn] = function() {
                    obj['e' + type + fn](window.event);
                }
                obj.attachEvent('on' + type, obj[type + fn]);
            } else
                obj.addEventListener(type, fn, false);
        },
        removeEvent : function(obj, type, fn) {//移除对象事件
            if(obj.removeEventListener) {
                obj.removeEventListener(type, fn, false);
            } else if(obj.detachEvent) {
                obj.detachEvent("on" + type, fn);
            } else {
                obj["on" + type] = null;
            }
        },
        creatset : function(s,sc){//创建模拟Select组件（s接收select对象，sc接收select对象的总数）
            var d = this.VWH(),i = this.Scur;
            while(i < sc){
                //console.log(i+'/c:'+c+'/'+d)
                if(s[i].className == "CSelects") {
                    var c=this.getPosition(s[i]).y;//cc = c + s[i].clientHeight;//获取当前select组件的y坐标
                    //console.log(cc+'/'+st+'/c:'+c+'/d:'+d)
                    //console.log(c+'/'+s[i].clientHeight+'/'+d+'/'+scrolltop+'/'+i);
                    // if(c<=d&&(c+s[i].clientHeight)>=scrolltop){
                    if(c<=d){
                        //if(cc>=st){
                            s[i].style.visibility = "hidden";
                            this.setSelectStyle(s[i], 200,i);
                            this.Scur++;
                        //}
                    } else {
                        break;
                    }
                }
                i++;
            }
            this.Status=1;
        },
        Upwxy : function(obj,index){//更新已渲染的select坐标
            var offset = this.Offset(obj),OPDivid = "CSOPDiv_"+index,OPDiv = document.getElementById(OPDivid);
            if(OPDiv != null){
                var OPStyle = OPDiv.style;
                OPStyle.width = offset.width + "px";
                OPStyle.top = offset.top + "px";
                OPStyle.left = offset.left + "px";
            }
        },
        setSelectStyle : function(obj, showHeight,index) {
            var offset = this.Offset(obj);
            var tValue = obj.options[obj.selectedIndex].innerHTML;
            var OPDivid = "CSOPDiv_"+index,OPDiv = document.createElement("div"),OPStyle = OPDiv.style;;
            var _this = this;
            OPDiv.className = "CSOPDiv";
            OPDiv.id = OPDivid;
            OPStyle.width = offset.width + "px";
            OPStyle.height = offset.height + "px";
            OPStyle.lineHeight = offset.height + "px";
            OPStyle.top = offset.top + "px";
            OPStyle.left = offset.left + "px";
            OPDiv.innerHTML = tValue;
            document.body.appendChild(OPDiv);

            OPDiv.onclick = function(event) {//为模拟Select组件的DIV绑定单击事件
                var offset = _this.Offset(this);
                var WFragment = document.createDocumentFragment();
                //创建一个文档碎
                var WUl = document.getElementById("WSUlist");
                //获取是否有下垃列表UL对象
                for(var i = 0, c = obj.options.length; i < c; i++) {
                    var CLi = document.createElement("li");
                    CLi.innerHTML = obj.options[i].innerHTML;
                    CLi.sValue = obj.options[i].value;
                    WFragment.appendChild(CLi);
                }
                //判断下垃列表UL对象是否存在，如里存在，把内容清空；否则创建该对象
                if(WUl) {
                    WUl.innerHTML = '';
                } else {
                    WUl = document.createElement("ul");
                    //创建下拉列表
                    WUl.id = 'WSUlist';
                }
                var WUlstyle = WUl.style;
                WUlstyle.width = (offset.width - 2) + "px";
                WUlstyle.height = (obj.options.length * 20) + "px";
                var WUl_h = parseInt(WUlstyle.height);
                if(WUl_h > showHeight) {
                    WUlstyle.height = showHeight + "px";
                }
                WUlstyle.listStyle = 'none';
                WUlstyle.border = '1px solid #AAA';
                WUlstyle.borderTop = 'none';
                WUlstyle.background = '#fff';
                WUlstyle.overflowY = 'auto';
                WUlstyle.position = 'absolute';
                WUlstyle.top = (offset.top + offset.height) + "px";
                WUlstyle.left = offset.left + "px";
                WUl.onselectstart = function() {
                    return false;
                };//IE不让其选择
                WUl.appendChild(WFragment);
                WUlstyle.display = WUlstyle.display == "block" ? "none" : "block";
                //判断下垃列表UL对象是否是显示或隐藏
                document.body.appendChild(WUl);
                var liObj = WUl.getElementsByTagName("li");
                //获取下垃列表UL对象下所有li对象
                if(liObj.length > 0) {
                    for(var j = 0; j < obj.options.length; j++) {
                        liObj[j].onmouseover = function() {//设置鼠标悬浮样式
                            var arrLiObj = this.parentNode.getElementsByTagName("li");
                            for(var i = 0; i < arrLiObj.length; i++) {
                                var _background = "#ccc";
                                var _color = "#fff";
                                if(arrLiObj[i] != this) {
                                    _background = "#fff";
                                    _color = "#000";
                                }
                                arrLiObj[i].style.background = _background;
                                arrLiObj[i].style.color = _color;
                                arrLiObj[i].style.cursor = 'pointer';
                            }
                        }
                        liObj[j].onclick = function(event) {//为列表UL对象下所有li对象绑定单击事件
                            obj.value = this.sValue;
                            OPDiv.innerHTML = this.innerHTML;
                            WUlstyle.display = 'none';
                            _this.ListenerOnchange(obj);
                            //监听onchange事件
                        };
                    }
                }
                (event || window.event).cancelBubble = true;
                document.onclick = function() {
                    WUlstyle.display = "none"
                }
            }
        },
        ListenerOnchange : function(obj) {//监听onchange事件
            if(document.all) {
                obj.fireEvent("onchange");
            } else {
                var evt = document.createEvent('HTMLEvents');
                evt.initEvent('change', true, true);
                obj.dispatchEvent(evt);
            }
        },
        Intation : function() {
            var s = document.getElementsByTagName("select"),sc = s.length,c = 100, b = 0;//变量C代表显示加载的高度，b计算已加载过的高度
            var _this = this;
            this.creatset(s,sc);
            this.addEvent(window,'scroll',function(event){
                var t = document.body.scrollTop | document.documentElement.scrollTop;
                var e=parseInt(t-b);
                if(e>=c){
                    _this.creatset(s,sc);
                    if(_this.Status==1){
                        b+=c;
                        _this.Status=0
                    }
                }
            });
            this.removeEvent(window,'scroll',function(event){});
            this.addEvent(window,'resize',function(event){
                var WUl = document.getElementById("WSUlist");
                if(WUl) WUl.style.display = "none";
                for(var i = 0; i<_this.Scur; i++){
                    _this.Upwxy(s[i],i);
                }
                _this.creatset(s,sc);
            });
            this.removeEvent(window,'resize',function(event){});
        }
    };
    window.cselect = CSelect;
})(window)