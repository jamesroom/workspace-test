(function(G, window,undefined) {
	function _instanceOf(o, type)  {
		return (o && o.hasOwnProperty && (o instanceof type));
	};
	function multiSliceSlidePlay(opt) {
		if (!(_instanceOf(this, multiSliceSlidePlay))) {
			return new multiSliceSlidePlay(opt);
		}
		if (!opt.dataSource || !opt.dataSource.length) {
			return;
		}

		this.opt = $.extend({
			'target' : 			null,	//目标窗器
			'width' : 			null,   //宽度
			'height': 			null,   //高度
			'direction': 		1, //切换的方向， 1代表水平，0代表垂直
			'duration' : 		'400', //切换所耗费的时间
			'speed' : 			2000, //切换的间隔时间
			'imgHoverSpeed' : 200, //图片上下动画时间
			'showLink' : 		true, //是否显示文字链接
			'openTarget':		'_blank',	//找开位置
			'showBar' : 		true, //显示索引按钮
			'mainClass' : 		'main_slide', //最外层样式
			'bodyClass':		'body_slide', //播放区域样式
			'bottomClass':	'bor_slide',
			'showLink' : 		true,
			'pClass' : 			't',
			'barClass' : 		'ctrl',
			'barLink' : 			false,
			'hoverStop':		true, //鼠标在面板上时停止切换
			'barNumber' : 	true, //按钮是否显示文字
			'barArrow' : 		false ,// 按钮上是否显示小尖角
			'imgType' :      null, //宽屏图片or窄屏图片
			'moveTop' :      -40, //单个图片向上移动高度
			'dataSource' :	[{
				'link' : null, //链接地址
				'text' : null, //链接文字
				'src' : null //图片地址
			}] //数据源
		}, opt || {});

		this.general();
		this.show(0);
		this.setTimer();
		this.bindHover();
		this.innerImgHover();
	}

	$.extend(multiSliceSlidePlay.prototype,{
		setTimer: function() {
			var self = this;
			clearInterval(this.timer);

			this.timer = setInterval(function() {
				self.show((self.bars.filter(function(){return /(^|\s+)item\d_hover/.test(this.className.toString())}).index() + 1 ) % self.len, true);
			},this.opt.speed);
		},

		clearTimer: function() {
			clearInterval(this.timer);
		},

		general : function() {
			var opt = this.opt, 
				_panel = ['<div id="slide_'+(new Date()).getTime()+'" class="'+ opt.mainClass +'"><ul class="' + opt.bodyClass + '">'], 
				barStr = [];

			this.len = opt.dataSource.length;
			for (var i = 0; i < this.len; i++) {
				var itemArray = opt.dataSource[i];
				var slide0 = '<a '+(itemArray['slice0']['ytag'] ? (' ytag="'+itemArray['slice0']['ytag']+'"') : '')+'href="'+ itemArray['slice0']['href'] +'" class="item_477_327" target="_blank" hotName="'+ (itemArray['slice0']['hotName'] || '') +'"><img ksrc="'+ itemArray['slice0'][opt.imgType] +'" alt="'+ itemArray['slice0']['text'] +'" title="'+ itemArray['slice0']['text'] +'"/></a>';
				switch(itemArray['type']) {
					case 0:
					_panel.push('<li>'+ slide0 +'<a '+(itemArray['slice1']['ytag'] ? (' ytag="'+itemArray['slice1']['ytag']+'"') : '')+'href="'+ itemArray['slice1']['href'] +'" class="item_163_163" target="_blank" hotName="'+ (itemArray['slice1']['hotName'] || '') +'"><img ksrc="'+ itemArray['slice1'][opt.imgType] +'" alt="'+ itemArray['slice1']['text'] +'" title="'+ itemArray['slice1']['text'] +'"/></a><a '+(itemArray['slice2']['ytag'] ? (' ytag="'+itemArray['slice2']['ytag']+'"') : '')+'href="'+ itemArray['slice2']['href'] +'" class="item_163_163" target="_blank" hotName="'+ (itemArray['slice2']['hotName'] || '') +'"><img ksrc="'+ itemArray['slice2'][opt.imgType] +'" alt="'+ itemArray['slice1']['text'] +'" title="'+ itemArray['slice2']['text'] +'"/></a><a '+(itemArray['slice3']['ytag'] ? (' ytag="'+itemArray['slice3']['ytag']+'"') : '')+'href="'+ itemArray['slice3']['href'] +'" class="item_327_163" target="_blank" hotName="'+ (itemArray['slice3']['hotName'] || '') +'"><img ksrc="'+ itemArray['slice3'][opt.imgType] +'" alt="'+ itemArray['slice3']['text'] +'" title="'+ itemArray['slice3']['text'] +'"/></a></li>');
					break;
					case 1:
					_panel.push('<li>'+ slide0 +'<a '+(itemArray['slice1']['ytag'] ? (' ytag="'+itemArray['slice1']['ytag']+'"') : '')+'href="'+ itemArray['slice1']['href'] +'" class="item_163_327" target="_blank" hotName="'+ (itemArray['slice1']['hotName'] || '') +'"><img ksrc="'+ itemArray['slice1'][opt.imgType] +'" alt="'+ itemArray['slice1']['text'] +'" title="'+ itemArray['slice1']['text'] +'"/></a><a '+(itemArray['slice2']['ytag'] ? (' ytag="'+itemArray['slice2']['ytag']+'"') : '')+'href="'+ itemArray['slice2']['href'] +'" class="item_163_327" target="_blank" hotName="'+ (itemArray['slice2']['hotName'] || '') +'"><img ksrc="'+ itemArray['slice2'][opt.imgType] +'" alt="'+ itemArray['slice2']['text'] +'" title="'+ itemArray['slice2']['text'] +'"/></a></li>');
					break;
					case 2:
					_panel.push('<li>'+ slide0 +'<a '+(itemArray['slice1']['ytag'] ? (' ytag="'+itemArray['slice1']['ytag']+'"') : '')+'href="'+ itemArray['slice1']['href'] +'" class="item_327_163" target="_blank" hotName="'+ (itemArray['slice1']['hotName'] || '') +'"><img ksrc="'+ itemArray['slice1'][opt.imgType] +'" alt="'+ itemArray['slice1']['text'] +'" title="'+ itemArray['slice1']['text'] +'"/></a><a '+(itemArray['slice2']['ytag'] ? (' ytag="'+itemArray['slice2']['ytag']+'"') : '')+'href="'+ itemArray['slice2']['href'] +'" class="item_163_163" target="_blank" hotName="'+ (itemArray['slice2']['hotName'] || '') +'"><img ksrc="'+ itemArray['slice2'][opt.imgType] +'" alt="'+ itemArray['slice2']['text'] +'" title="'+ itemArray['slice2']['text'] +'"/></a><a '+(itemArray['slice3']['ytag'] ? (' ytag="'+itemArray['slice3']['ytag']+'"') : '')+'href="'+ itemArray['slice3']['href'] +'" class="item_163_163" target="_blank" hotName="'+ (itemArray['slice3']['hotName'] || '') +'"><img ksrc="'+ itemArray['slice3'][opt.imgType] +'" alt="'+ itemArray['slice3']['text'] +'" title="'+ itemArray['slice3']['text'] +'"/></a></li>');
					break;
					case 3:
					_panel.push('<li>'+ slide0 +'<a '+(itemArray['slice1']['ytag'] ? (' ytag="'+itemArray['slice1']['ytag']+'"') : '')+'href="'+ itemArray['slice1']['href'] +'" class="item_163_327" target="_blank" hotName="'+ (itemArray['slice1']['hotName'] || '') +'"><img ksrc="'+ itemArray['slice1'][opt.imgType] +'" alt="'+ itemArray['slice1']['text'] +'" title="'+ itemArray['slice1']['text'] +'"/></a><a '+(itemArray['slice2']['ytag'] ? (' ytag="'+itemArray['slice2']['ytag']+'"') : '')+'href="'+ itemArray['slice2']['href'] +'" class="item_163_163" target="_blank" hotName="'+ (itemArray['slice2']['hotName'] || '') +'"><img ksrc="'+ itemArray['slice2'][opt.imgType] +'" alt="'+ itemArray['slice2']['text'] +'" title="'+ itemArray['slice2']['text'] +'"/></a><a '+(itemArray['slice3']['ytag'] ? (' ytag="'+itemArray['slice3']['ytag']+'"') : '')+'href="'+ itemArray['slice3']['href'] +'" class="item_163_163" target="_blank" hotName="'+ (itemArray['slice3']['hotName'] || '') +'"><img ksrc="'+ itemArray['slice3'][opt.imgType] +'" alt="'+ itemArray['slice3']['text'] +'" title="'+ itemArray['slice3']['text'] +'"/></a></li>');
					break;												
					case 4:
					_panel.push('<li>'+ slide0 +'<a '+(itemArray['slice1']['ytag'] ? (' ytag="'+itemArray['slice1']['ytag']+'"') : '')+'href="'+ itemArray['slice1']['href'] +'" class="item_163_163" target="_blank" hotName="'+ (itemArray['slice1']['hotName'] || '') +'"><img ksrc="'+ itemArray['slice1'][opt.imgType] +'" alt="'+ itemArray['slice1']['text'] +'" title="'+ itemArray['slice1']['text'] +'"/></a><a '+(itemArray['slice2']['ytag'] ? (' ytag="'+itemArray['slice2']['ytag']+'"') : '')+'href="'+ itemArray['slice2']['href'] +'" class="item_163_163" target="_blank" hotName="'+ (itemArray['slice2']['hotName'] || '') +'"><img ksrc="'+ itemArray['slice2'][opt.imgType] +'" alt="'+ itemArray['slice2']['text'] +'" title="'+ itemArray['slice2']['text'] +'"/></a><a '+(itemArray['slice3']['ytag'] ? (' ytag="'+itemArray['slice3']['ytag']+'"') : '')+'href="'+ itemArray['slice3']['href'] +'" class="item_163_163" target="_blank" hotName="'+ (itemArray['slice3']['hotName'] || '') +'"><img ksrc="'+ itemArray['slice3'][opt.imgType] +'" alt="'+ itemArray['slice3']['text'] +'" title="'+ itemArray['slice3']['text'] +'"/></a><a '+(itemArray['slice4']['ytag'] ? (' ytag="'+itemArray['slice4']['ytag']+'"') : '')+'href="'+ itemArray['slice4']['href'] +'" class="item_163_163" target="_blank" hotName="'+ (itemArray['slice4']['hotName'] || '') +'"><img ksrc="'+ itemArray['slice4'][opt.imgType] +'" alt="'+ itemArray['slice4']['text'] +'" title="'+ itemArray['slice4']['text'] +'"/></a></li>');
					break;
					case 5:
					_panel.push('<li><a '+(itemArray['slice0']['ytag'] ? (' ytag="'+itemArray['slice0']['ytag']+'"') : '')+'href="'+ itemArray['slice0']['href'] +'" class="item_807_327" target="_blank" hotName="'+ (itemArray['slice0']['hotName'] || '') +'"><img ksrc="'+ itemArray['slice0'][opt.imgType] +'" alt="'+ itemArray['slice0']['text'] +'" title="'+ itemArray['slice0']['text'] +'"/></a></li>');
					break;									
				}
				//var item = opt.dataSource[i], 
					//text = item.text.replace(/<[^>]*>/g,'');
				//_panel.push('<li><a'+(item.ytag ? (' ytag="'+item.ytag+'"') : '')+' href="'+ item.link +'" target="_blank" hotName="'+ (item.hotName || '') +'"><img title="'+ item.text +'" alt="'+ item.text +'"  ksrc="'+ item.src +'"></a></li>');
			}
			_panel.push('</ul>');

			if (opt.showBar) {
				_panel.push('<div class="'+opt.bottomClass+'">');
				if (opt.showLink)
					_panel.push('<p class="' + opt.pClass + '"><a ' + ( opt.openTarget !== '_self' ? (' target="'+ opt.openTarget +'"') : '') + '></a></p>');
				_panel.push('<ul class="'+opt.barClass+'">');
				for(var i = 0; i < this.len; i++) {
					var item = opt.dataSource[i];
					//_panel.push('<li class="item'+i+'">' + ( opt.barLink ? ('<a ' + ( opt.openTarget !== '_self' ? (' target="'+ opt.openTarget +'"') : '')) + ' href="' + item.link + '">' : '')+ (opt.barNumber? (i+1) : item.text )+ (opt.barArrow ? '<span class="arrow_bottom"><i>◆</i></span>' : '') +  ( opt.barLink ? '</a>' : '' )+  '</li>');
					_panel.push('<li class="item'+i+'"></li>');
				}
				_panel.push('</ul></div>');
			}

			var obj = $(_panel.join(''));

			this.panel = obj.find(">ul");
			this.bottom = obj.find("." + opt.bottomClass);
			if (opt.showLink)
				this.link = this.bottom.find("p>a");
			if (opt.showBar)
				this.bars =  this.bottom.find("li");
			$(opt.target).html("").append(obj);
		},

		bindHover: function() {
			if (!this.opt.hoverStop)
				return;

			var self= this;
			this.bars && this.bars.hover(function() {
				self.clearTimer();
				self.show($(this).index());
			}, function() {
				self.setTimer();
			});

			var node = this.panel;
			if (this.opt.showLink)
				node.add(this.link);

			node.hover(function() {
				self.clearTimer();
			},function() {
				self.setTimer();
			});
		},
		innerImgHover: function () {
			opt = this.opt;
    	var aArray = this.panel.find('a');
    	aArray.each(function(i){
    		var a_item = $(aArray[i]);
    		if (!a_item.hasClass('item_807_327')) {
    			a_item.hover(function() {
    				$(this).children('img').stop(true,true).animate({'top':opt.moveTop, 'z-index':'5'}, opt.imgHoverSpeed);
    			},function() {
    				$(this).children('img').stop(true,true).animate({'top':'0px', 'z-index':'1'}, opt.imgHoverSpeed);
    			});	
    		}

    	});
		},
		show: function(index, autoTrigger) {
			if (this.index == index) return;

			var special = !!autoTrigger && index == 0,
				self = this, 
				first = null, 
				opt = this.opt,
				//img = this.panel.find("img:eq("+ index +")")[0], src = img.getAttribute("src");
				currentLi = this.panel.find("li:eq("+ index +")");
				imgArray = currentLi.find("img");
				imgLen = imgArray.length;
				for (var i = 0; i < imgLen; i++) {
					src = imgArray[i].getAttribute("src");
					if (!src) {
						imgArray[i].src = imgArray[i].getAttribute('ksrc');
						imgArray[i].removeAttribute('ksrc');
					}					
				}
			/*if (!src) {
				img.src = img.getAttribute('ksrc');
				img.removeAttribute('ksrc');
			}*/
			if (opt.showBar) {
				this.bars.removeClass(function(i){return 'item' + i + '_hover';}).eq(index).addClass("item" + index + "_hover");
			}

			var cfg = {};
			cfg[opt.direction ? "left" : "top"] = -1 * ( special ? self.len : index ) * (opt.direction ? opt.width : opt.height);

			if (special) {
				first = this.panel.find(">li:first");
				var _css = {"position" : 'relative'};
				_css[opt.direction? 'left' : 'top'] = opt[opt.direction? 'width' : 'height'] * this.len;
				first.css(_css);
			}
			this.panel.stop(1,0).animate(cfg, opt.duration, function() {
				if (special && first ) {
					var _css = {position: ''};
					_css[opt.direction? 'left' : 'top'] = '';
					first.css(_css);
					self.panel.css(opt.direction? 'left' : 'top', "");
				}
			});
			this.index = index;
			if (opt.showLink) {
				var item = opt.dataSource[index];
				this.opt.showLink && self.link.attr({"href": item.link, title : item.text.replace(/<[^>]+>/g,'')}).html(item.text);
			}
		}
	});
	G.ui.multiSliceSlidePlay = multiSliceSlidePlay;
})(G,window);
