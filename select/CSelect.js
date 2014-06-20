/**
 * JS模拟Select组件
 */
(function(window, undefined) {
    var doc = document;
    CSelect = {
        author : "Aifang Spark",
        version : 1.0,
        Status : 0, //渲染状态 0,1
        Scur : 0, //已渲染的个数

        /**
         * Offset 获取对象工作区域内的绝对位置
         * @param t 对象e距离上方或上层控件的位置，整型，单位像素。
         * @param l 对象e距离左方或上层控件的位置，整型，单位像素。
         * @param w 对象e自身的宽度，整型，单位像素。
         * @param h 对象e自身的高度，整型，单位像素。
         * @return {Object} 返回传递过来的对象的 Offset属性集
         */
        Offset : function(e) {
            var t = e.offsetTop;
            var l = e.offsetLeft;
            var w = e.offsetWidth;
            var h = e.offsetHeight;
            while( e = e.offsetParent) {
                t += e.offsetTop;
                l += e.offsetLeft;
            };
            return {
                top : t,
                left : l,
                width : w,
                height : h
            };
        },
        /**
         * getPosition 获取对象工作区域内的纵向坐标
         * @param a 获取浏览器的类型参数
         * @param h 所要传递的对象
         * @return {Object} 返回传递过来的对象的Y坐标
         */
        getPosition : function(h) {
            var a = navigator.userAgent.toLowerCase();
            var d = h;
            if(d.parentNode === null || d.style.display == "none") {
                return false
            }
            var l = null;
            var k = [];
            var i;
            if(d.getBoundingClientRect) {
                i = d.getBoundingClientRect();
                if(a.indexOf("ipad") != -1) {
                    return {
                        y : i.top
                    }
                }
                var st = Math.max(doc.documentElement.scrollTop, doc.body.scrollTop);
                return {
                    y : i.top + st
                };
            } else {
                if(doc.getBoxObjectFor) {
                    i = doc.getBoxObjectFor(d);
                    var g = (d.style.borderTopWidth) ? parseInt(d.style.borderTopWidth) : 0;
                    k = [i.y - g]
                } else {
                    k = [d.offsetLeft, d.offsetTop];
                    l = d.offsetParent;
                    if(l != d) {
                        while(l) {
                            k[0] += l.offsetTop;
                            l = l.offsetParent
                        }
                    }
                    if(a.indexOf("opera") != -1 || (a.indexOf("safari") != -1 && d.style.position == "absolute")) {
                        k[0] -= doc.body.offsetTop
                    }
                }
            }
            d.parentNode ? l = d.parentNode : l = null;
            while(l && l.tagName != "BODY" && l.tagName != "HTML") {
                k[0] -= l.scrollTop;
                l.parentNode ? l = l.parentNode : l = null;
            }
            return {
                y : k[0]
            };
        },
        /**
         * VWH 获取当前工作区域的滚动高度
         * @param scrolltop 获取浏览器的滚动条的高度
         * @param documetheight 获取浏览器的工作区域的高度
         * @return {Object} 返回当前工作区域的滚动高度
         */
        VWH : function() {
            var scrolltop = doc.body.scrollTop | doc.documentElement.scrollTop;
            var documetheight = doc.documentElement.clientHeight;
            return documetheight + scrolltop;
        },
        /**
         * addEvent 为指定对象绑定事件
         * @param obj 指定的对象
         * @param type 要绑定的事件名称
         * @param fn 返回函数
         */
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
        /**
         * removeEvent 移除指定对象绑定的事件
         * @param obj 指定的对象
         * @param type 要绑定的事件名称
         * @param fn 返回函数
         */
        removeEvent : function(obj, type, fn) {
            if(obj.removeEventListener) {
                obj.removeEventListener(type, fn, false);
            } else if(obj.detachEvent) {
                obj.detachEvent("on" + type, fn);
            } else {
                obj["on" + type] = null;
            }
        },
        /**
         * creatset 判断SELECT是否符合指定条件并激活模拟函数
         * @param s 传递过来的SELECT集合
         * @param sc 传递过来的SELECT集合的总数
         */
        creatset : function(s) {
            var d = this.VWH(), i = this.Scur,sc = s.length,cs = null;
            sc = sc - 1
            while(i < sc) {
                cs = s[i];
                var c = this.getPosition(cs).y;
                if(c <= d) {
                    //cs.style.visibility = "hidden";
                    this.setSelectStyle(cs, 200, i);
                    this.Scur++;
                } else {
                    break;
                }
                i++;
            }
            this.Status = 1;
        },
        /**
         * Upwxy 更新已渲染的SELECT坐标位置
         * @param obj 传递过来的SELECT对象
         * @param index 传递过来的SELECT对象索引
         * @param OPDiv 根据ID所查找到的模拟的Selcet的DIV层
         */
        Upwxy : function(obj, index) {
            var offset = this.Offset(obj), OPDivid = "CSOPDiv_" + index, OPDiv = doc.getElementById(OPDivid);
            if(OPDiv) {
                var OPStyle = OPDiv.style;
                OPStyle.width = offset.width + "px";
                OPStyle.top = offset.top + "px";
                OPStyle.left = offset.left + "px";
            }
        },
        /**
         * setSelectStyle 对要模拟的Select组件创建DIV层，并绑定单击事件列来所有Options值
         * @param obj 传递过来的SELECT对象
         * @param showHeight 设置模拟的Select Options列表最大高度值
         * @param index 传递过来的SELECT对象的索引值
         */
        setSelectStyle : function(obj, showHeight, index) {
            var offset = this.Offset(obj);
            var tValue = obj.options[obj.selectedIndex].innerHTML;
            var OPDivid = "CSOPDiv_" + index, OPDiv = doc.createElement("div"), OPStyle = OPDiv.style;
            ;
            var _this = this;
            OPDiv.className = "CSOPDiv";
            OPDiv.id = OPDivid;
            OPStyle.width = offset.width + "px";
            OPStyle.height = offset.height + "px";
            OPStyle.lineHeight = offset.height + "px";
            OPStyle.top = offset.top + "px";
            OPStyle.left = offset.left + "px";
            OPDiv.innerHTML = tValue;
            doc.body.appendChild(OPDiv);

            /**
             * 为模拟的Select组件绑定单击事件，并创建Options列表
             */
            OPDiv.onclick = function(event) {//为模拟Select组件的DIV绑定单击事件
                var offset = _this.Offset(this);
                var WFragment = doc.createDocumentFragment();
                //创建一个文档碎
                var WUl = doc.getElementById("WSUlist");
                //获取是否有下垃列表UL对象
                for(var i = 0, c = obj.options.length; i < c; i++) {
                    var CLi = doc.createElement("li");
                    CLi.innerHTML = obj.options[i].innerHTML;
                    CLi.sValue = obj.options[i].value;
                    WFragment.appendChild(CLi);
                }
                //判断下垃列表UL对象是否存在，如里存在，把内容清空；否则创建该对象
                if(WUl) {
                    WUl.innerHTML = '';
                } else {
                    WUl = doc.createElement("ul");
                    //创建下拉列表
                    WUl.id = 'WSUlist';
                    WUl.className = 'WSUlist';
                }
                var WUlstyle = WUl.style;
                WUlstyle.width = (offset.width - 2) + "px";
                WUlstyle.height = (obj.options.length * 20) + "px";
                var WUl_h = parseInt(WUlstyle.height);
                if(WUl_h > showHeight) {
                    WUlstyle.height = showHeight + "px";
                }
                WUlstyle.listStyle = 'none';
                WUlstyle.borderTop = 'none';
                WUlstyle.background = '#fff';
                WUlstyle.overflowY = 'auto';
                WUlstyle.position = 'absolute';
                WUlstyle.top = (offset.top + offset.height) + "px";
                WUlstyle.left = offset.left + "px";
                WUl.onselectstart = function() {
                    return false;
                };
                //IE不让其选择
                WUl.appendChild(WFragment);
                WUlstyle.display = WUlstyle.display == "block" ? "none" : "block";
                //判断下垃列表UL对象是否是显示或隐藏
                doc.body.appendChild(WUl);
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
                            _this.ListenerOnchange(obj); //监听onchange事件
                        };
                    }
                }
                //取消模拟的Select Options列表的显示
                (event || window.event).cancelBubble = true;
                doc.onclick = function() {
                    WUlstyle.display = "none"
                }
            }
        },
        /**
         * 为模拟出来的Select组件添加监听Onchange事件
         * @param obj 传递过来的SELECT对象
         */
        ListenerOnchange : function(obj) {//监听onchange事件
            if(doc.all) {
                obj.fireEvent("onchange");
            } else {
                var evt = doc.createEvent('HTMLEvents');
                evt.initEvent('change', true, true);
                obj.dispatchEvent(evt);
            }
        },
        /**
         * 初始化安装程序
         * @param c 代表显示加载的高度
         * @param b 计算已加载过的高度
         */
        Intation : function() {
            var s = doc.getElementsByTagName("select"), sc = s.length, sarr = new Array(), crselect = null, c = 100, b = 0;
            var _this = this;
            for(var i = 0; i<sc; i++){
                crselect = s[i];
                if(crselect.className == "CSelects") {
                    sarr.push(crselect);
                }
            }
            this.creatset(sarr);
            this.addEvent(window, 'scroll', function(event) {
                var t = doc.body.scrollTop | doc.documentElement.scrollTop;
                var e = parseInt(t - b);
                if(e >= c) {
                    _this.creatset(sarr);
                    if(_this.Status == 1) {
                        b += c;
                        _this.Status = 0
                    }
                }
            });
            this.removeEvent(window, 'scroll', function(event) {});
            this.addEvent(window, 'resize', function(event) {
                var WUl = doc.getElementById("WSUlist");
                if(WUl)
                    WUl.style.display = "none";
                for(var i = 0; i < _this.Scur; i++) {
                    _this.Upwxy(sarr[i], i);
                }
                _this.creatset(sarr);
            });
            this.removeEvent(window, 'resize', function(event) {});
        }



    };
    window.cselect = CSelect;
})(window)