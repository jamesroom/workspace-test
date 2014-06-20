/*
 *自定义Select样式
  使用方法：1、在需要自定议Select样式的Select组件中添加Class='WCSelects' 2、[可选项] 使用WCSelects.Intation();初始化Select模拟组件*/
var WCSelects = {
    Offset:function(el) { //获取Select组件的坐标位
        var w = el.offsetWidth;
        var h = el.offsetHeight;
		
		var ua = navigator.userAgent.toLowerCase(); 
		var isOpera = (ua.indexOf('opera') != -1); 
		var isIE = (ua.indexOf('msie') != -1 && !isOpera); // not opera spoof 		  
		var parent = null; 
		var pos = [];     
		var box;     
		if(el.getBoundingClientRect){          
			box = el.getBoundingClientRect(); 
			var scrollTop = Math.max(document.documentElement.scrollTop,
							document.body.scrollTop); 
			var scrollLeft = Math.max(document.documentElement.scrollLeft, 
							 document.body.scrollLeft); 
			return {left:box.left + scrollLeft, top:box.top + scrollTop, width:w, height:h}; 
		}else if(document.getBoxObjectFor){ 
			box = document.getBoxObjectFor(el); 
			var borderLeft = (el.style.borderLeftWidth)?parseInt(el.style.borderLeftWidth):0; 
			var borderTop = (el.style.borderTopWidth)?parseInt(el.style.borderTopWidth):0; 
			pos = [box.x - borderLeft, box.y - borderTop]; 
		}else{ 
			// safari & opera 
			pos = [el.offsetLeft, el.offsetTop];  
			parent = el.offsetParent; 
				
			if (parent != el) { 
				while (parent){ 
					pos[0] += parent.offsetLeft; 
					pos[1] += parent.offsetTop; 
					parent = parent.offsetParent; 
				} 
			} 
			  
			if (ua.indexOf('opera') != -1 || ( ua.indexOf('safari') != -1 && 
				el.style.position == 'absolute' )) { 
				pos[0] -= document.body.offsetLeft; 
				pos[1] -= document.body.offsetTop;         
			}    
		} 
					
		if (el.parentNode) { 
			parent = el.parentNode; 
		}else { 
			parent = null; 
		} 
		 
		while (parent && parent.tagName != 'BODY' && parent.tagName != 'HTML') { 
			// account for any scrolled ancestors 
			pos[0] -= parent.scrollLeft; 
			pos[1] -= parent.scrollTop; 
			 
			if (parent.parentNode) { 
				parent = parent.parentNode; 
			}else { 
				parent = null; 
			} 
		}
		return {top:pos[1], left:pos[0], width:w, height:h};
    },
    setSelectStyle:function(obj,showHeight) {
        var offset = this.Offset(obj);
        var tValue = obj.options[obj.selectedIndex].innerHTML; //获取当前Select组件当前选中的值
        var OPDiv = document.createElement("div"); //创建DIV层模拟Select组件，并设置相应的定位CSS属性
        var OPStyle = OPDiv.style;
        var _this = this;
        OPDiv.className = "WCOPDiv";
        OPStyle.width = offset.width + "px";
        OPStyle.top = offset.top + "px";
        OPStyle.left = offset.left + "px";
        OPDiv.innerHTML = tValue;
        OPDiv.onmouseover = function() { OPDiv.className = "WCOPDiv WCOPDiv_over"; }
        OPDiv.onmouseout = function() { OPDiv.className = "WCOPDiv WCOPDiv_out"; }
        var SLDiv = document.createElement("div"); //创建外包DIV层
        SLDiv.appendChild(OPDiv);
        document.body.appendChild(SLDiv);

        OPDiv.onclick = function(event) { //为模拟Select组件的DIV绑定单击事件
            var WFragment = document.createDocumentFragment(); //创建一个文档碎
            var WUl = document.getElementById("WSUlist"); //获取是否有下垃列表UL对象
            for (var i = 0,c = obj.options.length; i< c; i++) {
                var CLi = document.createElement("li");
                CLi.innerHTML = obj.options[i].innerHTML;
                CLi.sValue = obj.options[i].value;
                WFragment.appendChild(CLi);
            }
            //判断下垃列表UL对象是否存在，如里存在，把内容清空；否则创建该对象
            if(WUl){
                WUl.innerHTML = '';
            } else {
                WUl = document.createElement("ul"); //创建下拉列表
                WUl.id = 'WSUlist';
            }
            var WUlstyle = WUl.style;
            WUlstyle.width = offset.width + "px";
            WUlstyle.height = obj.options.length * 20 + "px";
            var WUl_h = parseInt(WUlstyle.height);
            if( WUl_h > showHeight) {
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
            WUl.onselectstart = function() {return false;}; //IE不让其选择
            WUl.appendChild(WFragment);
            WUlstyle.display = WUlstyle.display == "block" ? "none" : "block"; //判断下垃列表UL对象是否是显示或隐藏
            document.body.appendChild(WUl);
            var liObj = WUl.getElementsByTagName("li"); //获取下垃列表UL对象下所有li对象
            if(liObj.length>0) {
                for (var j=0;j<obj.options.length;j++) {
                    liObj[j].onmouseover = function() { //设置鼠标悬浮样式
                        var arrLiObj = this.parentNode.getElementsByTagName("li");
                        for(var i=0;i<arrLiObj.length;i++) {
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
                    liObj[j].onclick = function(event) { //为列表UL对象下所有li对象绑定单击事件
                        obj.value = this.sValue;
                        OPDiv.innerHTML = this.innerHTML;
                        WUlstyle.display = 'none';
                        _this.ListenerOnchange(obj); //监听onchange事件
                    };
                }
            }
            (event || window.event).cancelBubble = true;
            document.onclick = function ()
            {
                WUlstyle.display = "none"
            }
        }

    },
    ListenerOnchange: function(obj){    //监听onchange事件
        if(document.all){
            obj.fireEvent("onchange");
        }else{
            var evt = document.createEvent('HTMLEvents');
            evt.initEvent('change',true,true);
            obj.dispatchEvent(evt);
        }
    },
    Intation:function() {
        var s = document.getElementsByTagName("select"),sc = s.length;
        for (var i = 0; i < sc; i++) {
            if(s[i].className == "WCSelects") {
                s[i].style.visibility = "hidden";
                //this.setSelectStyle(s[i],200);
            }
        }
    }
}
