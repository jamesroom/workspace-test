(function(window, undefined) {
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
        getPosition : function(h) {
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
        VWH : function(){
            var scrolltop = document.body.scrollTop | document.documentElement.scrollTop;
            var documetheight = document.documentElement.clientHeight;
            return documetheight + scrolltop;
        },
        addEvent : function(obj, type, fn) {
            if(obj.attachEvent) {
                obj['e' + type + fn] = fn;
                obj[type + fn] = function() {
                    obj['e' + type + fn](window.event);
                }
                obj.attachEvent('on' + type, obj[type + fn]);
            } else
                obj.addEventListener(type, fn, false);
        },
        removeEvent : function(obj, type, fn) {
            if(obj.removeEventListener) {
                obj.removeEventListener(type, fn, false);
            } else if(obj.detachEvent) {
                obj.detachEvent("on" + type, fn);
            } else {
                obj["on" + type] = null;
            }

        },
        creatset : function(s,sc){
            var d = this.VWH();
            var i = this.Scur;
            var scrolltop = document.body.scrollTop | document.documentElement.scrollTop;
            //console.log(i);
            while(i < sc){
                if(s[i].className == "CSelects") {
                    var c=this.getPosition(s[i]).y;
                    if(c<=d&&(c+s[i].clientHeight)>=scrolltop){
                        s[i].style.visibility = "hidden";
                        this.setSelectStyle(s[i], 200);
                        this.Scur++;
                    } else {
                        break;
                    }
                }
                i++;
            }
            this.Status=1;
        },
        setSelectStyle : function(obj, showHeight) {
            var offset = this.Offset(obj);
            var tValue = obj.options[obj.selectedIndex].innerHTML;
            //获取当前Select组件当前选中的值
            var OPDiv = document.createElement("div");
            //创建DIV层模拟Select组件，并设置相应的定位CSS属性
            var OPStyle = OPDiv.style;
            var _this = this;
            OPDiv.className = "CSOPDiv";
            OPStyle.width = offset.width + "px";
            OPStyle.top = offset.top + "px";
            OPStyle.left = offset.left + "px";
            OPDiv.innerHTML = tValue;
            OPDiv.onmouseover = function() {
                OPDiv.className = "CSOPDiv CSOPDiv_over";
            }
            OPDiv.onmouseout = function() {
                OPDiv.className = "CSOPDiv CSOPDiv_out";
            }
            document.body.appendChild(OPDiv);

            OPDiv.onclick = function(event) {//为模拟Select组件的DIV绑定单击事件
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
                WUlstyle.width = offset.width + "px";
                WUlstyle.height = obj.options.length * 20 + "px";
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
                WUlstyle.top = (offset.top + 21) + "px";
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
            var s = document.getElementsByTagName("select"),sc = s.length;
            var _this = this;
            this.creatset(s,sc);
            var c = 100;
            var b = 0;
            this.addEvent(window,'scroll',function(event){
                var t = document.body.scrollTop | document.documentElement.scrollTop;
                var e=t-b;
                e = parseInt(e);
                if(e>=c){
                    _this.creatset(s,sc);
                    //console.log(t + '/' + e + '/' +c +'/' + b + '/' + _this.Status);
                    if(_this.Status==1){
                        b+=c;
                        _this.Status=0
                    }
                    //console.log('status:'+_this.Status);
                }
            });
            this.removeEvent(window,'scroll',function(event){});
        }
    };
    window.cselect = CSelect;
})(window)