/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 *
 * 这是框架核心主文件，需要用到框架，此文件必须要载入，
 *
 * 注意：全局变量 J 不能重复定义
 * 注意：此文件涉及到整站JS稳定正常运行的核心，请勿随意修改
 *
 *
 * @path: base/base.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/09/27
 *
 */


/**
 * 构造J对象
 *
 */
(function (W) {
    var BaseStart = +new Date(), PageStart = W.PAGESTART || BaseStart, hs = 'hasOwnProperty', mix = function (l, r, w) {
            if(w){
                var N = {};
                for (var n in l){ if (l[hs](n))N[n] = l[n]}
                for (var n in r){if (r[hs](n))N[n] = r[n]}
                return N;
            }
            for (var p in r) {if (r[hs](p)) {l[p] = r[p];} }return l;
        }, base = {},slice = Array.prototype.slice,jsH = 'http://jockjs.lunjiang.dev.anjuke.com/ujs/',cssH = 'http://jockjs.lunjiang.dev.anjuke.com/ucss/', _ = {}, times = {
        PS:PageStart,
        BS:BaseStart,
        CL:PageStart
    };

    var version = '05649b0d6dcf6ac5bed03ca14aee15a3', readyList = [], callList = [], jsModules = [], cssModules = [], D = W.document, h = D.getElementsByTagName('head')[0], dE = D.documentElement, A = arguments, U = A[2],  s = A[1].split(','), aL = s[0], rL = s[1], aT = s[2], dT = s[3], cL = s[4], sC = s[5], rS = s[6], C = s[7], ld = s[8], old = 'on' + ld, isReady = 0, bind = 0, sT = W.setTimeout,sI = W.setInterval, conf = {
            v:version, u:jsH, m:'/', c:'utf-8', s:cssH
        }, S = D[rS], Dt = D[aT], c2t = {}, IS = {}, nu = navigator.userAgent, R = RegExp, JS = 'js', CSS = 'css';


    /**
     * 增加引用，便于调用
     * @type {Object}
     */
    var link = {
        W:W,
        D:D,
        St:sT,
        Si:sI
    };


    /**
     * 遍历Object中所有元素。
     *
     * @param {Object} object 需要遍历的Object
     * @param {Function} callback 对每个Object元素进行调用的函数
     * @return {Object} 原对象
     *
     */
    function each(object, callback) {
        var i = 0, I, length = object.length, isObj = length === U, ret = true;
        if (isObj) {
            for (I in object) {
                if (callback.call(object[ I ], I, object[ I ]) === false) {
                    ret = false;
                    break;
                }
            }
        } else {
            for (; i < length;) {
                if (callback.call(object[ i ], i, object[ i++ ]) === false) {
                    ret = false;
                    break;
                }
            }
        }
        return ret;
    }

    function Tp( o ) {
        return o === null ? String( o ) : c2t[ Object.prototype.toString.call(o) ] || U;
    }

    (function(){
        each("Boolean Number String Function Array Date RegExp Object".split(" "), function(i, name) {
            var lowerName = name.toLowerCase();
            c2t[ "[object " + name + "]" ] = lowerName;
            IS['is'+name] = function(o){
                return Tp(o) === lowerName
            };
        });
        IS.isWindow = function( object ) {
            return object && IS.isObject(object) && "setInterval" in object;
        };
        IS.isUndefined = function( object ){
            return object === U;
        }
    })();




    /**
     * 提供自定义模块支持， 注：为保证自定义模块名称与核心类库模块名称冲突，
     * 自定义模块命名规则为 “模块类别_用途”，中间用 “_” ，
     *
     *      注册模块    J.add('u_login',object);
     *      使用模块    J.u_log etc...
     *
     *
     */
    mix(base, {
        /**
         * 绑定mix方法
         */
        mix:mix,
        /**
         * 添加核心模块，如果添加的模块已经存在，原模块将被重写，
         * 可以利用此特性进行多态开发, 但是这存在一定的风险，禁止覆盖核心模块
         * @param {String} module 模块名称
         * @param {Object | Function} object 模块对象
         */
        add:function (module, object) {
            if(IS.isFunction(object)){
                _[module] = object;
                return;
            }
            var m = {};
            _.mix(m, object);
            return _.mix(_[module] = _[module] || {}, m);
        },
        ua:{
            ua:nu,
            chrome : /chrome\/(\d+\.\d+)/i.test(nu) ? + R.$1 : U,
            firefox : /firefox\/(\d+\.\d+)/i.test(nu) ? + R.$1 : U,
            ie : /msie (\d+\.\d+)/i.test(nu) ? (D.documentMode || + R.$1) : U,
            opera : /opera(\/| )(\d+(\.\d+)?)(.+?(version\/(\d+(\.\d+)?)))?/i.test(nu) ?  + ( R.$6 || R.$2 ) : U,
            safari : /(\d+\.\d)?(?:\.\d)?\s+safari\/?(\d+\.\d+)?/i.test(nu) && !/chrome/i.test(nu) ? + (R.$1 || R.$2) : U
        }
    });

    /**
     * 绑定Ready事件
     */
    function bindReady() {
        if (bind)
            return;
        bind = 1;
        if (C === S)
            return finishRready();
        if (D[aL]) {
            D[aL](cL, function () {
                D[rL](cL, arguments.callee, 0), finishRready()
            }, 0);
            W[aL](ld, function () {
                W[rL](ld, arguments.callee, 0), finishRready(1)
            }, 0);
        } else if (Dt) {
            Dt(sC, function () {
                if (C === S)
                    D[dT](sC, arguments.callee), finishRready()
            });
            W[aT](old, function () {
                W[dT](old, arguments.callee), finishRready(1)
            });

            var fixDenied = false;

            try{
                fixDenied = null == W.frameElement
            }catch(e){}

            if (dE.doScroll && fixDenied) {
                (function () {
                    if (isReady)
                        return;
                    try {
                        dE.doScroll('left');
                    } catch (e) {
                        return sT(arguments.callee, 1);
                    }
                    finishRready();
                })()
            }
        }
    }

    /**
     * 加入任务队列，
     * 文档结构建立后会执行callback回调
     * @param {Function} callback
     */
    function ready(callback) {
        bindReady();
        isReady ? callback.call() : readyList.push(callback);
    }

    /**
     * 完成文档结构，如果队列有任务就执行任务
     */
    function finishRready(isLoad) {
        isLoad && (times.PL = getTime());
        if (!isReady) {
            if (!D.body) {
                return sT(finishRready, 1);
            }
            isReady = 1;
            times.CL = getTime();
            if (readyList) {
                var fn, i = 0;
                while (( fn = readyList[i++])) {
                    fn.call();
                }
                readyList = null;
            }
            return 0
        }
    }

    /**
     * 资源加载器，
     * 资源加载成功后会执行callback回调
     * @param {String} url 资源地址
     * @param {String} type 资源类型 || callback
     * @param {Function} callback
     */
    function loadResource(url, type, callback) {
        var n;
        IS.isFunction(type) && (callback = type);
        type = /\.(js|css)/g.exec(url.toLowerCase()), type = type ? type[1] : JS;
        if (JS === type) {
            n = D.createElement('script');
            n.type = 'text/javascript';
            n.src = url;
            n.async = 'true';
            n.charset = conf.c;
        } else if (CSS === type) {
            n = D.createElement('link');
            n.type = 'text/css';
            n.rel = 'stylesheet';
            n.href = url;
	    h.appendChild(n);
	    return;
        }

        n.onload = n[sC] = function () {
            var rs = this[rS];
            if (!rs || 'loaded' === rs || C === rs) {
                callback && callback();
                n.onload = n[sC] = null;
            }
        };
        h.appendChild(n);
    }

    /**
     * 获取模块资源地址
     * @param {Array} m 模块
     * @param {String} t 类型
     * @return {String} 资源地址
     */
    function buildUrl(m,t) {
        t || (t = JS);
        return conf[t == JS ? 'u':'s'] + m.join(conf.m) + conf.m + conf.v + '.' + t;
    }

    /**
     * 查看模块所否存在
     * @param {String} m 模块
     * @param {String} t 类型
     * @return {Boolean}
     */
    function moduleExits(m,t) {
        if(t == CSS) return inArray(m, cssModules) > -1;
        var o = m.split('.'), n = o.length, M = _[o[0]];
        return (n === 1 && M) ? true : (n === 2 && M && M[o[1]]) ? true : false;
    }

    /**
     * 过滤重复或已存在的模块
     * @param m 模块数组
     * @param {String} t 类型
     * @return {Array}
     */
    function filterModules(m,t){
        var l = m.length, M = [], R = [], re, K;
        while(l--){
            K = m[l];
            if(/^\w+$/.test(K)){
                M.push(K)
            }
        }
        l = m.length;
        while(l--){
            K = m[l];
            if(re = K.match(/^(\w+)\.\w+$/)){
                if(inArray(re[1], M) != -1){
                    m.splice(l,1);
                }
            }
        }
        l = m.length;
        while(l--){
            K = m[l];
            if(inArray(K, R) == -1 && ( t == CSS || !moduleExits(K,t) )){
                R.push(K);
            }
        }
        return R.sort();
    }

    function inArray( item, array ) {
        var i = 0, l;

        if ( array ) {
            l = array.length;

            for ( ; i < l; i++ ) {
                if ( array[ i ] === item ) {
                    return i;
                }
            }
        }

        return -1;
    }

    /**
     * 指定需要使用那些模块
     * @param {Array|String} require 依赖的模块，
     *         多个模块用数组的方式 ['module1','module2'] , 只依赖一个模块可直接传入模块字符串
     * @param {Function} callback 回调函数
     *         模块如果存在或加载完成后执行回调函数
     * @param {String} type 资源类型
     *         模块如果存在或加载完成后执行回调函数
     * @param {Boolean|Number} delay || undefined
     *         指定数字为延迟执行，单位毫秒，
     *         留空则等待ready后合并成一个请求
     *         ‘async’ 则立即请求，这样使用务必清楚所使用的核心模块安全可用，非特殊要求，否则不推荐这样使用
     * @return null
     */
    function use(require, callback, type, delay) {
        var mod, mods = [], cmods = [], i = 0, isJs;

        (type != JS && type != CSS) && (delay = type, type = JS), isJs = (type == JS);

        if (IS.isArray(require)) {
            while ((mod = require[i++])) (isJs ? mods : cmods).push(mod);
        } else if (IS.isString(require)) {
            (isJs ? mods : cmods).push(require);
        }

        mods = filterModules(isJs ? mods : cmods, type);

        if(IS.isNumber(delay)){
            ready(function () {
                var m, M = [], i = 0;
                while ((m = mods[i++]) && !moduleExits(m,type)) M.push(m);
                if (M.length) {
                    loadResource(buildUrl(M,type), type, callback)
                } else callback && callback.call()
            }.delay(delay));
        }else{
            if(!isReady && !delay){
                i = 0;
                while ((mod = mods[i++])) (isJs ? jsModules : cssModules).push(mod);
                callback && callList.push(callback);
            }else if(mods.length)
                loadResource(buildUrl(mods,type), type, callback)
            else callback && callback.call()
        }
    }


    /**
     * ready后执行队列任务
     */
    ready(function () {

        var mods = filterModules(jsModules, JS);
        function fCallbacks(){
            var fn , i = 0;
            while ( fn = callList[i++] ) fn.call();
            jsModules = callList = null;
        }
        if (mods.length) {
            loadResource(buildUrl(mods, JS), JS, fCallbacks);
            mods = [];
        }else fCallbacks();

        mods = filterModules(cssModules, CSS);
        if (mods.length) {
            loadResource(buildUrl(mods, CSS), CSS);
            cssModules = [];
        }

    });


    /**
     * 扩展ready方法
     */
    Function.prototype.ready = function () {
        ready.call(_,this)
    };

    /**
     * 扩展require方法
     */
    Function.prototype.require = function () {
        var a = arguments, args = slice.call(a), cssM = args[1];
        (IS.isArray(cssM) || IS.isString(cssM)) && (use.apply(_, [].concat([cssM], [null,CSS], slice.call(a,2))) , args.splice(1,1));
        args.splice(1,0,this,JS);
        use.apply(_, args)
    };

    /**
     * 扩展Function，延迟执行
     * @name delay
     * @function
     *
     */
    Function.prototype.delay = function(timeout){
        var m = this, args = slice.call(arguments, 1);
        sT(function() {
            return m.apply(m, args);
        }, timeout || 0);
    };


    /**
     * 在页面中插入 style 标签，设置特定的样式
     * @param cssText {String} 样式字符串
     * @param newStyle {Boolean} 使用新的Style标签添加
     */
    function rules(cssText, newStyle){
        var r = D.createTextNode(cssText),s;
        if(newStyle || !(s = D.getElementsByTagName('style')[0])){
            h.appendChild(s = D.createElement('style'));
            s.type = 'text/css';
        }
        s.styleSheet ? s.styleSheet.cssText += r.nodeValue : s.appendChild(r);
        return s;
    }

    function getTime(){
        return +new Date()
    }


    /**
     * 构造ready，load，use方法
     */
    _.base = mix(base, {
        ready:ready,
        finish:finishRready,
        load:loadResource,
        use:use,
        rules:rules,
        each:each,
        type:Tp,
        getTime:getTime,
        times:times,
        slice:slice
    });

    /**
     * 数据缓存
     * @type {}
     */
    _.data = {};

    /**
     * 提升 base 子集
     */
    mix(_, base);
    mix(_, IS);
    mix(_, link);

    W['J'] = _;

})(window, 'addEventListener,removeEventListener,attachEvent,detachEvent,DOMContentLoaded,onreadystatechange,readyState,complete,load', undefined);
/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: lang/lang.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/05/28
 *
 */



J.add('lang');
/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: lang/merge.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/01/12
 *
 */



/// require('lang.lang');


/**
 * 合并数组，返回新数组。
 *
 * @grammar J.merge(array, results)
 *
 * @name J.lang.merge
 * @param {Array} first
 * @param {Array} second
 * @return {Array}
 *
 */
J.merge = J.lang.merge = function( first, second ) {
	var i = first.length,
	    j = 0;
	if ( J.isNumber(second.length) ) {
	    for ( var l = second.length; j < l; j++ ) {
	        first[ i++ ] = second[ j ];
	    }
	} else {
	    while ( !J.isUndefined(second[j]) ) {
	        first[ i++ ] = second[ j++ ];
	    }
	}
	first.length = i;

	return first;
};/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: string/trim.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/08/24
 *
 */


/**
 * 删除目标字符串两端的空白字符
 *
 * @param {string} source 目标字符串
 * @returns {string} 删除两端空白字符后的字符串
 *
 */
String.prototype.trim = function () {
    return this.replace(/(^[\s\t\xa0\u3000]+)|([\u3000\xa0\s\t]+$)/g,'');
};/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: dom/dom.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/08/23
 *
 */

/// require('lang.merge');
/// require('string.trim');

/**
 * @namespace J.dom
 */
(function (J, W, D) {

    function g(id) {
        var domElm = new elem(id);
        return domElm.length ? domElm : null;
    }

    function s(selector, element) {
        return new select(selector, element)
    }

    function elem(id) {
        var selector = id;
        if (id === "body" && D.body) {
            this[0] = D.body;
            this.length = 1;
            this.selector = selector;
            return this
        }
        if (id instanceof elem){
            return id
        }

        if (id = ( id && id.nodeType ) ? id : D.getElementById(id)) {
            this[0] = id;
            this.length = 1;
        }
        this.selector = selector;
        return this;
    }

    var T = 'getElementsByTagName', C = 'getElementsByClassName', dom = g, float = 'float', cssFloat = 'cssFloat', opacity = 'opacity', U = J.isUndefined,

    Fix_ATTS = (function () {
        var result = {};
        if (J.ua.ie < 8) {
            result['for'] = 'htmlFor';
            result['class'] = 'className';
        } else {
            result['htmlFor'] = 'for';
            result['className'] = 'class';
        }
        return result;
    })(),

    valFix = (function () {
        function input(element, value) {
            switch (element.type.toLowerCase()) {
                case 'checkbox':
                case 'radio':
                    return inputSelector(element, value);
                default:
                    return valueSelector(element, value);
            }
        }

        function inputSelector(element, value) {
            if (U(value))  return element.checked ? element.value : null;
            else element.checked = !!value;
        }

        function valueSelector(element, value) {
            if (U(value)) return element.value; else element.value = value;
        }

        function select(element, value) {
            if (U(value))
                return selectOne(element);
        }

        function selectOne(element) {
            var index = element.selectedIndex;
            return index >= 0 ? optionValue(element.options[index]) : null;
        }

        function optionValue(opt) {
            return (!U(opt['value'])) ? opt.value : opt.text;
        }

        return {
            input:input,
            textarea:valueSelector,
            select:select,
            button:valueSelector
        };
    })();


    var fn = elem.prototype = {
        show:function () {
            this.get().style.display = '';
            return this
        },

        hide:function () {
            this.get().style.display = 'none';
            return this
        },

        visible: function() {
            return this.get().style.display != 'none';
        },

        remove:function(){
            var element = this.get();
            element.parentNode && element.parentNode.removeChild(element);
            return this
        },

        attr:function (key, value) {
            var element = this.get();
            if ('style' === key) {
                if (U(value)) return element.style.cssText; else element.style.cssText = value;
                return this;
            }
            key = Fix_ATTS[key] || key;
            if (J.isString(key))
                if (U(value)) return element.getAttribute(key); else (value === null) ? this.removeAttr(key) : element.setAttribute(key, value);
            else {
                for (var k in key) {
                    this.attr(k, key[k]);
                }
            }
            return this;
        },

        /**
         * 移除属性
         * @param key
         */
        removeAttr:function(key){
            this.get().removeAttribute(key);
            return this;
        },

        /**
         * 为元素添加className
         * @param className
         * @return this
         */
        addClass:function (className) {
            var element = this.get();
            if (!this.hasClass(className))
                element.className += (element.className ? ' ' : '') + className;
            return this;
        },

        /**
         * 移除目标元素的className
         * @param className
         * @return this
         */
        removeClass:function (className) {
            var element = this.get();
            element.className = element.className.replace(
                new RegExp("(^|\\s+)" + className + "(\\s+|$)"), ' ').trim();
            return this;
        },

        /**
         * 判断元素是否拥有指定的className
         * @param className
         * @return {Boolean}
         */
        hasClass:function (className) {
            var element = this.get();
            var elementClassName = element.className;
            return (elementClassName.length > 0 && (elementClassName == className ||
              new RegExp("(^|\\s)" + className + "(\\s|$)").test(elementClassName)));
        },

        /**
         * 获取样式
         * @param style
         * @returns {*}
         */
        getStyle: function(style) {
            var element = this.get();
            style = style == float ? cssFloat : style;
            var value = element.style[style];
            if (!value || value == 'auto') {
                var css = D.defaultView.getComputedStyle(element, null);
                value = css ? css[style] : null;
            }
            if (style == opacity) return value ? parseFloat(value) : 1.0;
            return value == 'auto' ? null : value;
        },

        /**
         * 设置样式
         * @param styles
         * @returns {*}
         */
        setStyle: function(styles) {
            var element = this.get(), elementStyle = element.style, match;
            if (J.isString(styles)) {
                element.style.cssText += ';' + styles;
                styles.indexOf(opacity) > 0 && this.setOpacity(styles.match(/opacity:\s*(\d?\.?\d*)/)[1]);
            }
            for (var property in styles)
                if (property == opacity) this.setOpacity(styles[property]);
                else
                elementStyle[(property == float || property == cssFloat) ?
                (elementStyle.styleFloat ? 'styleFloat' : cssFloat) :
                property] = styles[property];

            return this;
        },

        getOpacity: function() {
            return this.getStyle(opacity);
        },

        setOpacity: function(value) {
            this.get().style.opacity = (value == 1 || value === '') ? '' : (value < 0.00001) ? 0 : value;
            return this;
        },

        append:function(element){
            this.get().appendChild(element.nodeType === 1 ? element : element.get());
            return this;
        },

        appendTo:function(element){
            getRealElement(element).append(this.get());
            return this;
        },

        html:function(html){
            var self = this.get();
            if(!J.isUndefined(html)){
                if(html.nodeType === 1)
                    return this.append(html)
                self.innerHTML = html;
                return this;
            }
            return self.innerHTML;
        },

        val:function(value){
            var element = this.get(), V = valFix[element.tagName.toLowerCase() || element.type];
            V = V ? V (element, value) : null;
            return (U(value)) ? V : this;
        },

        s:function (selector) {
            return new select(selector, (this[0].nodeType === 1) ? this[0] : D);
        },

        get:function (index) {
            var index = index || 0, elm = this[index];
            if(!elm) throw('selector "'+this.selector+'" element is not found.');
            return elm;
        },

        width:function(){
            return getWH(this).width
        },

        height:function(){
            return getWH(this).height
        },

        offset:function() {
            var target = this.get();
            if(target && J.isUndefined(target.offsetLeft)) {
                target = target.parentNode;
            }
            var pageCoord = (function(element){
                var coord = {
                    x : 0,
                    y : 0
                };
                while(element) {
                    coord.x += element.offsetLeft;
                    coord.y += element.offsetTop;
                    element = element.offsetParent;
                }
                return coord;
            })(target);
            return {
                x : pageCoord.x,
                y : pageCoord.y
            };
        },

        /**
         * 将目标元素添加到基准元素之后
         * @param element 插入的元素
         */
        insertAfter:function (element) {
            var self = this.get(), parent = self.parentNode;
            if(parent){
                parent.insertBefore(element.nodeType === 1 ? element : element.get(), self.nextSibling);
            }
            return this;
        },

        /**
         * 将目标元素添加到基准元素之前
         * @param element 插入的元素
         */
        insertBefore:function (element) {
            var self = this.get(), parent = self.parentNode;
            if(parent){
                parent.insertBefore(element.nodeType === 1 ? element : element.get(), self);
            }
            return this;
        },

        /**
         * 将目标元素添加到基准元素第一个子节点之前
         * @param element 插入的元素
         */
        insertFirst:function (element) {
            var first = this.first();
            first ? first.insertBefore(element) : this.append(element);
            return this;
        },

        insertFirstTo:function (element) {
            getRealElement(element).insertFirst(this.get());
            return this;
        },

        /**
         * 将目标元素添加到基准元素最后一个子节点之后
         * @param element 插入的元素
         */
        insertLast:function (element) {
            return this.append(element)
        },

        /**
         * 获取目标元素的第一个元素节点
         */
        first:function () {
            return matchNode(this.get(), 'nextSibling', 'firstChild');
        },

        /**
         * 获取目标元素的最后一个元素节点
         */
        last:function () {
            return matchNode(this.get(), 'previousSibling', 'lastChild');
        },

        /**
         * 获取目标元素的下一个兄弟元素节点
         */
        next:function () {
            return matchNode(this.get(), 'nextSibling', 'nextSibling');
        },

        /**
         * 获取目标元素的上一个兄弟元素节点
         */
        prev:function () {
            return matchNode(this.get(), 'previousSibling', 'previousSibling');
        },

        /**
         *
         * @param expression '.className' | 'tagName' | '.className tagName'
         * @return {DOMObject}
         */
        up: function (expression) {
            var element = this.get();
            if (arguments.length == 0) return dom(element.parentNode);
            var i = 0, isNumber = J.isNumber(expression), R;
            isNumber || (R = expression.match(/^(\.)?(\w+)$/));
            while (element = element['parentNode']) {
                if (element.nodeType == 1)
                    if(isNumber && i == expression) return g(element);
                    else if(R && ((R[1] && R[2] == element.className) || R[2].toUpperCase() == element.tagName)) return g(element);
                i++;
            }
            return null;
        },

        /**
         *
         * @param expression '.className' | 'tagName' | '.className tagName'
         * @return {DOMObject}
         */
        down: function (expression) {
            var element = this.get();
            if (arguments.length == 0) return this.first();
            return J.isNumber(expression) ? new select('*', element).eq(expression) : new select(expression, element);
        },

        /**
         * 提交表单
         */
        submit: function(){
            this.get().submit();
        },

        eq:function (i) {
            i = i || 0;
            return g(this[ i === -1 ? this.length - 1 : i ]);
        },

        empty:function(){
            return this.html('');
        },

        length:0,
        splice:[].splice
    };

    J.mix(dom,{
        dom:dom,
        create:create,
        fn:fn,
        s:s,
        g:g
    });

    function getRealElement(element){
        return J.isString(element) ? dom(element) : element
    }

    function matchNode(element, direction, start) {
        for (var node = element[start]; node; node = node[direction]) {
            if (node.nodeType == 1) {
                return dom(node);
            }
        }
        return null;
    }

    function getWH(element) {
        var el = element.get();

        if(element.visible()){
            return { width:el.offsetWidth, height:el.offsetHeight }
        }

        var sty = el.style, stys, wh, ostys = {
            visibility:sty.visibility,
            position:sty.position,
            display:sty.display
        };

        stys = {
            visibility:'hidden',
            display:'block'
        };
        if (ostys.position !== 'fixed')
            stys.position = 'absolute';

        element.setStyle(stys);

        wh = {
            width:el.offsetWidth,
            height:el.offsetHeight
        };

        element.setStyle(ostys);

        return wh;
    }

    function create(tagName, attributes){
        var el = D.createElement(tagName), jEl = dom(el);
        return (U(attributes)) ? jEl : jEl.attr(attributes);
    }

    /**
     * class 选择器查询
     * @param selector '.className' | 'tagName' | '.className tagName'
     * @param element content | null
     * @return []
     */
    function select(selector, element) {
        this.selector = selector;

        // J.sizzle
        if (J.sizzle) return J.merge(this, J.sizzle(selector, element));

        var match = selector ? selector.match(/^(\.)?(\w+)(\s(\w+))?/) : null, result = [], len, i, elements, node, tagName;
        element = element || D;
        // div       -> [  "div"  ,   undefined  ,   "div"  ,   undefined  ,   undefined  ]
        // .ttt      -> [  ".ttt"  ,   "."  ,   "ttt"  ,   undefined  ,   undefined  ]
        // .ttt span -> [  ".ttt span"  ,   "."  ,   "ttt"  ,   " span"  ,   "span"  ]
        if (match && match[1]) {
            // 初始化tagName参数
            tagName = match[4] ? match[4].toUpperCase() : '';
            // 查询元素
            if (element[C]) {
                elements = element[C](match[2]);
                len = elements.length;
                for (i = 0; i < len; i++) {
                    node = elements[i];
                    if (tagName && node.tagName != tagName) {
                        continue;
                    }
                    result.push(node);
                }
            } else {
                var className = new RegExp("(^|\\s)" + match[2] + "(\\s|$)");
                elements = tagName ? element[T](tagName) : (element.all || element[T]("*"));
                len = elements.length;
                for (i = 0; i < len; i++) {
                    node = elements[i];
                    className.test(node.className) && result.push(node);
                }
            }
        } else {
            result = element[T](selector)
        }

        return J.merge(this, result)

    }

    select.prototype = {
        each:function (callback) {
            var i = 0, length = this.length;
            for (; i < length;) {
                if (callback.call(this[ i ], i, g(this[ i++ ])) === false) {
                    break;
                }
            }
            return this;
        },
        eq:function (i) {
            var i = i || 0, elm = this[ i === -1 ? this.length - 1 : i ];
            if(!elm) throw('"'+this.selector+'" element does not exist.');
            return g(elm);
        },
        get:function(i) {
            return this.eq(i);
        },
        length:0,
        splice:[].splice
    };

    J.mix(J, {
        dom:dom,
        create:create,
        s:s,
        g:g
    });

})(J, window, document);/*!
 * Sizzle CSS Selector Engine
 *  Copyright 2012, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
(function(e,t,n){function rt(e,t,n,r){var i=0,s=t.length;for(;i<s;i++)G(e,t[i],n,r)}function it(e,t,n,r,i,s){var o,u=Y.setFilters[t.toLowerCase()];return u||G.error(t),(e||!(o=i))&&rt(e||"*",r,o=[],i),o.length>0?u(o,n,s):[]}function st(e,t,r,i,s){var o,u,a,f,l,c,h,p,d=0,m=s.length,y=j.POS,b=new RegExp("^"+y.source+"(?!"+g+")","i"),w=function(){var e=1,t=arguments.length-2;for(;e<t;e++)arguments[e]===n&&(o[e]=n)};for(;d<m;d++){y.exec(""),e=s[d],f=[],a=0,l=i;while(o=y.exec(e)){p=y.lastIndex=o.index+o[0].length;if(p>a){h=e.slice(a,o.index),a=p,c=[t],k.test(h)&&(l&&(c=l),l=i);if(u=D.test(h))h=h.slice(0,-5).replace(k,"$&*");o.length>1&&o[0].replace(b,w),l=it(h,o[1],o[2],c,l,u)}}l?(f=f.concat(l),(h=e.slice(a))&&h!==")"?rt(h,f,r,i):v.apply(r,f)):G(e,t,r,i)}return m===1?r:G.uniqueSort(r)}function ot(e,t,n){var r,i,s,o=[],u=0,f=A.exec(e),l=!f.pop()&&!f.pop(),c=l&&e.match(L)||[""],h=Y.preFilter,p=Y.filter,d=!n&&t!==a;for(;(i=c[u])!=null&&l;u++){o.push(r=[]),d&&(i=" "+i);while(i){l=!1;if(f=k.exec(i))i=i.slice(f[0].length),l=r.push({part:f.pop().replace(C," "),captures:f});for(s in p)(f=j[s].exec(i))&&(!h[s]||(f=h[s](f,t,n)))&&(i=i.slice(f.shift().length),l=r.push({part:s,captures:f}));if(!l)break}}return l||G.error(e),o}function ut(e,t,n){var s=t.dir,o=p++;return e||(e=function(e){return e===n}),t.first?function(t,n){while(t=t[s])if(t.nodeType===1)return e(t,n)&&t}:function(t,n){var u,a=o+"."+i,f=a+"."+r;while(t=t[s])if(t.nodeType===1){if((u=t[m])===f)return t.sizset;if(typeof u=="string"&&u.indexOf(a)===0){if(t.sizset)return t}else{t[m]=f;if(e(t,n))return t.sizset=!0,t;t.sizset=!1}}}}function at(e,t){return e?function(n,r){var i=t(n,r);return i&&e(i===!0?n:i,r)}:t}function ft(e,t,n){var r,i,s=0;for(;r=e[s];s++)Y.relative[r.part]?i=ut(i,Y.relative[r.part],t):(r.captures.push(t,n),i=at(i,Y.filter[r.part].apply(null,r.captures)));return i}function lt(e){return function(t,n){var r,i=0;for(;r=e[i];i++)if(r(t,n))return!0;return!1}}var r,i,s,o,u,a=e.document,f=a.documentElement,l="undefined",c=!1,h=!0,p=0,d=[].slice,v=[].push,m=("sizcache"+Math.random()).replace(".",""),g="[\\x20\\t\\r\\n\\f]",y="(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",b=y.replace("w","w#"),w="([*^$|!~]?=)",E="\\["+g+"*("+y+")"+g+"*(?:"+w+g+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+b+")|)|)"+g+"*\\]",S=":("+y+")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|((?:[^,]|\\\\,|(?:,(?=[^\\[]*\\]))|(?:,(?=[^\\(]*\\))))*))\\)|)",x=":(nth|eq|gt|lt|first|last|even|odd)(?:\\((\\d*)\\)|)(?=[^-]|$)",T=g+"*([\\x20\\t\\r\\n\\f>+~])"+g+"*",N="(?=[^\\x20\\t\\r\\n\\f])(?:\\\\.|"+E+"|"+S.replace(2,7)+"|[^\\\\(),])+",C=new RegExp("^"+g+"+|((?:^|[^\\\\])(?:\\\\.)*)"+g+"+$","g"),k=new RegExp("^"+T),L=new RegExp(N+"?(?="+g+"*,|$)","g"),A=new RegExp("^(?:(?!,)(?:(?:^|,)"+g+"*"+N+")*?|"+g+"*(.*?))(\\)|$)"),O=new RegExp(N.slice(19,-6)+"\\x20\\t\\r\\n\\f>+~])+|"+T,"g"),M=/^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,_=/[\x20\t\r\n\f]*[+~]/,D=/:not\($/,P=/h\d/i,H=/input|select|textarea|button/i,B=/\\(?!\\)/g,j={ID:new RegExp("^#("+y+")"),CLASS:new RegExp("^\\.("+y+")"),NAME:new RegExp("^\\[name=['\"]?("+y+")['\"]?\\]"),TAG:new RegExp("^("+y.replace("[-","[-\\*")+")"),ATTR:new RegExp("^"+E),PSEUDO:new RegExp("^"+S),CHILD:new RegExp("^:(only|nth|last|first)-child(?:\\("+g+"*(even|odd|(([+-]|)(\\d*)n|)"+g+"*(?:([+-]|)"+g+"*(\\d+)|))"+g+"*\\)|)","i"),POS:new RegExp(x,"ig"),needsContext:new RegExp("^"+g+"*[>+~]|"+x,"i")},F={},I=[],q={},R=[],U=function(e){return e.sizzleFilter=!0,e},z=function(e){return function(t){return t.nodeName.toLowerCase()==="input"&&t.type===e}},W=function(e){return function(t){var n=t.nodeName.toLowerCase();return(n==="input"||n==="button")&&t.type===e}},X=function(e){var t=!1,n=a.createElement("div");try{t=e(n)}catch(r){}return n=null,t},V=X(function(e){e.innerHTML="<select></select>";var t=typeof e.lastChild.getAttribute("multiple");return t!=="boolean"&&t!=="string"}),$=X(function(e){e.id=m+0,e.innerHTML="<a name='"+m+"'></a><div name='"+m+"'></div>",f.insertBefore(e,f.firstChild);var t=a.getElementsByName&&a.getElementsByName(m).length===2+a.getElementsByName(m+0).length;return u=!a.getElementById(m),f.removeChild(e),t}),J=X(function(e){return e.appendChild(a.createComment("")),e.getElementsByTagName("*").length===0}),K=X(function(e){return e.innerHTML="<a href='#'></a>",e.firstChild&&typeof e.firstChild.getAttribute!==l&&e.firstChild.getAttribute("href")==="#"}),Q=X(function(e){return e.innerHTML="<div class='hidden e'></div><div class='hidden'></div>",!e.getElementsByClassName||e.getElementsByClassName("e").length===0?!1:(e.lastChild.className="e",e.getElementsByClassName("e").length!==1)}),G=function(e,t,n,r){n=n||[],t=t||a;var i,s,o,u,f=t.nodeType;if(f!==1&&f!==9)return[];if(!e||typeof e!="string")return n;o=et(t);if(!o&&!r)if(i=M.exec(e))if(u=i[1]){if(f===9){s=t.getElementById(u);if(!s||!s.parentNode)return n;if(s.id===u)return n.push(s),n}else if(t.ownerDocument&&(s=t.ownerDocument.getElementById(u))&&tt(t,s)&&s.id===u)return n.push(s),n}else{if(i[2])return v.apply(n,d.call(t.getElementsByTagName(e),0)),n;if((u=i[3])&&Q&&t.getElementsByClassName)return v.apply(n,d.call(t.getElementsByClassName(u),0)),n}return ht(e,t,n,r,o)},Y=G.selectors={cacheLength:50,match:j,order:["ID","TAG"],attrHandle:{},createPseudo:U,find:{ID:u?function(e,t,n){if(typeof t.getElementById!==l&&!n){var r=t.getElementById(e);return r&&r.parentNode?[r]:[]}}:function(e,t,r){if(typeof t.getElementById!==l&&!r){var i=t.getElementById(e);return i?i.id===e||typeof i.getAttributeNode!==l&&i.getAttributeNode("id").value===e?[i]:n:[]}},TAG:J?function(e,t){if(typeof t.getElementsByTagName!==l)return t.getElementsByTagName(e)}:function(e,t){var n=t.getElementsByTagName(e);if(e==="*"){var r,i=[],s=0;for(;r=n[s];s++)r.nodeType===1&&i.push(r);return i}return n}},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(B,""),e[3]=(e[4]||e[5]||"").replace(B,""),e[2]==="~="&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),e[1]==="nth"?(e[2]||G.error(e[0]),e[3]=+(e[3]?e[4]+(e[5]||1):2*(e[2]==="even"||e[2]==="odd")),e[4]=+(e[6]+e[7]||e[2]==="odd")):e[2]&&G.error(e[0]),e},PSEUDO:function(e){var t,n=e[4];return j.CHILD.test(e[0])?null:(n&&(t=A.exec(n))&&t.pop()&&(e[0]=e[0].slice(0,t[0].length-n.length-1),n=t[0].slice(0,-1)),e.splice(2,3,n||e[3]),e)}},filter:{ID:u?function(e){return e=e.replace(B,""),function(t){return t.getAttribute("id")===e}}:function(e){return e=e.replace(B,""),function(t){var n=typeof t.getAttributeNode!==l&&t.getAttributeNode("id");return n&&n.value===e}},TAG:function(e){return e==="*"?function(){return!0}:(e=e.replace(B,"").toLowerCase(),function(t){return t.nodeName&&t.nodeName.toLowerCase()===e})},CLASS:function(e){var t=F[e];return t||(t=F[e]=new RegExp("(^|"+g+")"+e+"("+g+"|$)"),I.push(e),I.length>Y.cacheLength&&delete F[I.shift()]),function(e){return t.test(e.className||typeof e.getAttribute!==l&&e.getAttribute("class")||"")}},ATTR:function(e,t,n){return t?function(r){var i=G.attr(r,e),s=i+"";if(i==null)return t==="!=";switch(t){case"=":return s===n;case"!=":return s!==n;case"^=":return n&&s.indexOf(n)===0;case"*=":return n&&s.indexOf(n)>-1;case"$=":return n&&s.substr(s.length-n.length)===n;case"~=":return(" "+s+" ").indexOf(n)>-1;case"|=":return s===n||s.substr(0,n.length+1)===n+"-"}}:function(t){return G.attr(t,e)!=null}},CHILD:function(e,t,n,r){if(e==="nth"){var i=p++;return function(e){var t,s,o=0,u=e;if(n===1&&r===0)return!0;t=e.parentNode;if(t&&(t[m]!==i||!e.sizset)){for(u=t.firstChild;u;u=u.nextSibling)if(u.nodeType===1){u.sizset=++o;if(u===e)break}t[m]=i}return s=e.sizset-r,n===0?s===0:s%n===0&&s/n>=0}}return function(t){var n=t;switch(e){case"only":case"first":while(n=n.previousSibling)if(n.nodeType===1)return!1;if(e==="first")return!0;n=t;case"last":while(n=n.nextSibling)if(n.nodeType===1)return!1;return!0}}},PSEUDO:function(e,t,n,r){var i=Y.pseudos[e]||Y.pseudos[e.toLowerCase()];return i||G.error("unsupported pseudo: "+e),i.sizzleFilter?i(t,n,r):i}},pseudos:{not:U(function(e,t,n){var r=ct(e.replace(C,"$1"),t,n);return function(e){return!r(e)}}),enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return t==="input"&&!!e.checked||t==="option"&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},parent:function(e){return!Y.pseudos.empty(e)},empty:function(e){var t;e=e.firstChild;while(e){if(e.nodeName>"@"||(t=e.nodeType)===3||t===4)return!1;e=e.nextSibling}return!0},contains:U(function(e){return function(t){return(t.textContent||t.innerText||nt(t)).indexOf(e)>-1}}),has:U(function(e){return function(t){return G(e,t).length>0}}),header:function(e){return P.test(e.nodeName)},text:function(e){var t,n;return e.nodeName.toLowerCase()==="input"&&(t=e.type)==="text"&&((n=e.getAttribute("type"))==null||n.toLowerCase()===t)},radio:z("radio"),checkbox:z("checkbox"),file:z("file"),password:z("password"),image:z("image"),submit:W("submit"),reset:W("reset"),button:function(e){var t=e.nodeName.toLowerCase();return t==="input"&&e.type==="button"||t==="button"},input:function(e){return H.test(e.nodeName)},focus:function(e){var t=e.ownerDocument;return e===t.activeElement&&(!t.hasFocus||t.hasFocus())&&(!!e.type||!!e.href)},active:function(e){return e===e.ownerDocument.activeElement}},setFilters:{first:function(e,t,n){return n?e.slice(1):[e[0]]},last:function(e,t,n){var r=e.pop();return n?e:[r]},even:function(e,t,n){var r=[],i=n?1:0,s=e.length;for(;i<s;i+=2)r.push(e[i]);return r},odd:function(e,t,n){var r=[],i=n?0:1,s=e.length;for(;i<s;i+=2)r.push(e[i]);return r},lt:function(e,t,n){return n?e.slice(+t):e.slice(0,+t)},gt:function(e,t,n){return n?e.slice(0,+t+1):e.slice(+t+1)},eq:function(e,t,n){var r=e.splice(+t,1);return n?e:r}}};Y.setFilters.nth=Y.setFilters.eq,Y.filters=Y.pseudos,K||(Y.attrHandle={href:function(e){return e.getAttribute("href",2)},type:function(e){return e.getAttribute("type")}}),$&&(Y.order.push("NAME"),Y.find.NAME=function(e,t){if(typeof t.getElementsByName!==l)return t.getElementsByName(e)}),Q&&(Y.order.splice(1,0,"CLASS"),Y.find.CLASS=function(e,t,n){if(typeof t.getElementsByClassName!==l&&!n)return t.getElementsByClassName(e)});try{d.call(f.childNodes,0)[0].nodeType}catch(Z){d=function(e){var t,n=[];for(;t=this[e];e++)n.push(t);return n}}var et=G.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return t?t.nodeName!=="HTML":!1},tt=G.contains=f.compareDocumentPosition?function(e,t){return!!(e.compareDocumentPosition(t)&16)}:f.contains?function(e,t){var n=e.nodeType===9?e.documentElement:e,r=t.parentNode;return e===r||!!(r&&r.nodeType===1&&n.contains&&n.contains(r))}:function(e,t){while(t=t.parentNode)if(t===e)return!0;return!1},nt=G.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(i===1||i===9||i===11){if(typeof e.textContent=="string")return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=nt(e)}else if(i===3||i===4)return e.nodeValue}else for(;t=e[r];r++)n+=nt(t);return n};G.attr=function(e,t){var n,r=et(e);return r||(t=t.toLowerCase()),Y.attrHandle[t]?Y.attrHandle[t](e):V||r?e.getAttribute(t):(n=e.getAttributeNode(t),n?typeof e[t]=="boolean"?e[t]?t:null:n.specified?n.value:null:null)},G.error=function(e){throw new Error("Syntax error, unrecognized expression: "+e)},[0,0].sort(function(){return h=0}),f.compareDocumentPosition?s=function(e,t){return e===t?(c=!0,0):(!e.compareDocumentPosition||!t.compareDocumentPosition?e.compareDocumentPosition:e.compareDocumentPosition(t)&4)?-1:1}:(s=function(e,t){if(e===t)return c=!0,0;if(e.sourceIndex&&t.sourceIndex)return e.sourceIndex-t.sourceIndex;var n,r,i=[],s=[],u=e.parentNode,a=t.parentNode,f=u;if(u===a)return o(e,t);if(!u)return-1;if(!a)return 1;while(f)i.unshift(f),f=f.parentNode;f=a;while(f)s.unshift(f),f=f.parentNode;n=i.length,r=s.length;for(var l=0;l<n&&l<r;l++)if(i[l]!==s[l])return o(i[l],s[l]);return l===n?o(e,s[l],-1):o(i[l],t,1)},o=function(e,t,n){if(e===t)return n;var r=e.nextSibling;while(r){if(r===t)return-1;r=r.nextSibling}return 1}),G.uniqueSort=function(e){var t,n=1;if(s){c=h,e.sort(s);if(c)for(;t=e[n];n++)t===e[n-1]&&e.splice(n--,1)}return e};var ct=G.compile=function(e,t,n){var r,i,s,o=q[e];if(o&&o.context===t)return o;i=ot(e,t,n);for(s=0;r=i[s];s++)i[s]=ft(r,t,n);return o=q[e]=lt(i),o.context=t,o.runs=o.dirruns=0,R.push(e),R.length>Y.cacheLength&&delete q[R.shift()],o};G.matches=function(e,t){return G(e,null,null,t)},G.matchesSelector=function(e,t){return G(t,null,null,[e]).length>0};var ht=function(e,t,n,s,o){e=e.replace(C,"$1");var u,a,f,l,c,h,p,m,g,y=e.match(L),b=e.match(O),w=t.nodeType;if(j.POS.test(e))return st(e,t,n,s,y);if(s)u=d.call(s,0);else if(y&&y.length===1){if(b.length>1&&w===9&&!o&&(y=j.ID.exec(b[0]))){t=Y.find.ID(y[1],t,o)[0];if(!t)return n;e=e.slice(b.shift().length)}m=(y=_.exec(b[0]))&&!y.index&&t.parentNode||t,g=b.pop(),h=g.split(":not")[0];for(f=0,l=Y.order.length;f<l;f++){p=Y.order[f];if(y=j[p].exec(h)){u=Y.find[p]((y[1]||"").replace(B,""),m,o);if(u==null)continue;h===g&&(e=e.slice(0,e.length-g.length)+h.replace(j[p],""),e||v.apply(n,d.call(u,0)));break}}}if(e){a=ct(e,t,o),i=a.dirruns++,u==null&&(u=Y.find.TAG("*",_.test(e)&&t.parentNode||t));for(f=0;c=u[f];f++)r=a.runs++,a(c,t)&&n.push(c)}return n};a.querySelectorAll&&function(){var e,t=ht,n=/'|\\/g,r=/\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,i=[],s=[":active"],o=f.matchesSelector||f.mozMatchesSelector||f.webkitMatchesSelector||f.oMatchesSelector||f.msMatchesSelector;X(function(e){e.innerHTML="<select><option selected></option></select>",e.querySelectorAll("[selected]").length||i.push("\\["+g+"*(?:checked|disabled|ismap|multiple|readonly|selected|value)"),e.querySelectorAll(":checked").length||i.push(":checked")}),X(function(e){e.innerHTML="<p test=''></p>",e.querySelectorAll("[test^='']").length&&i.push("[*^$]="+g+"*(?:\"\"|'')"),e.innerHTML="<input type='hidden'>",e.querySelectorAll(":enabled").length||i.push(":enabled",":disabled")}),i=i.length&&new RegExp(i.join("|")),ht=function(e,r,s,o,u){if(!o&&!u&&(!i||!i.test(e)))if(r.nodeType===9)try{return v.apply(s,d.call(r.querySelectorAll(e),0)),s}catch(a){}else if(r.nodeType===1&&r.nodeName.toLowerCase()!=="object"){var f=r.getAttribute("id"),l=f||m,c=_.test(e)&&r.parentNode||r;f?l=l.replace(n,"\\$&"):r.setAttribute("id",l);try{return v.apply(s,d.call(c.querySelectorAll(e.replace(L,"[id='"+l+"'] $&")),0)),s}catch(a){}finally{f||r.removeAttribute("id")}}return t(e,r,s,o,u)},o&&(X(function(t){e=o.call(t,"div");try{o.call(t,"[test!='']:sizzle"),s.push(Y.match.PSEUDO)}catch(n){}}),s=new RegExp(s.join("|")),G.matchesSelector=function(t,n){n=n.replace(r,"='$1']");if(!et(t)&&!s.test(n)&&(!i||!i.test(n)))try{var u=o.call(t,n);if(u||e||t.document&&t.document.nodeType!==11)return u}catch(a){}return G(n,null,null,[t]).length>0})}(),t.sizzle=G})(window,J);
(function(dom, sizzle){
	if(dom && sizzle){
		dom.find = sizzle;
	}
})(J.dom, J.sizzle);/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 *
 * 这是ajax核心文件，
 *
 *
 * @path: ajax/ajax.js
 * @author: Jock
 * @version: 1.0.1
 * @date: 2012/10/19
 *
 */


(function (J, W) {

    /**
     * 初始配置
     * @param {Boolean} async                 是否异步请求。默认为true（异步）
     * @param {String | Object} data         需要发送的数据。
     * @param {Object} headers               要设置的头信息
     * @return {Function} onSuccess           请求成功时触发，      function(XMLHttpRequest xhr, string responseText)
     * @return {Function} onFailure           请求失败时触发，      function(XMLHttpRequest xhr)
     * @return {Function} onBeforerequest     发送请求之前触发，    function(XMLHttpRequest xhr)
     * @return {Function} onTimeout           发送请求超时触发，    function(XMLHttpRequest xhr)
     * @param {String} cache                 是否需要缓存，默认为true（缓存）
     */
    var defaultOpts = {
        url:'',
        async:true,
        data:'',
        callback:'',
        headers:'',
        onSuccess:'',
        onFailure:'',
        onBeforerequest:'',
        onTimeout:'',
        cache:true,
        timeout:5000, // 毫秒
        type:''
    }, encode = encodeURIComponent, ajaxObj, D = document, head = D.head || D.getElementsByTagName( "head" )[0], aboutBlank = 'about:blank', I = 0;

    function Ajax(url, options, method) {

        var xhr, opts = defaultOpts, eventHandlers = {}, timerHander, timeout;

        J.isString(url) ? (opts.url = url) : (opts = J.mix(opts, url || {}, true));
        J.isFunction(options) ? (opts.onSuccess = options) : (opts = J.mix(opts, options || {}, true));

        timeout = parseInt(opts.timeout);

        if(opts.url == '') return null;

        method = method.toUpperCase();

        J.each("onSuccess onFailure onBeforerequest onTimeout".split(' '), function (i, k) {
            eventHandlers[k] = opts[k];
        });

        if (opts.type == 'jsonp') {
            method == 'GET' ? getJSONP() : postJSONP();
        } else {
            return request();
        }

        function clearTimeOut(){
            (timeout > 0 && timerHander) && clearTimeout(timerHander);
        }

        function domDispose(element, container){
            if(head && element){
                element = container||element;
                if (element && element.parentNode) {
                    head.removeChild(element);
                }
                element = undefined;
            }
        }

        function domLoad(element, container){
            element.onload = element.onreadystatechange = function (_, isAbort) {
                if (isAbort || !element.readyState || /loaded|complete/.test(element.readyState)) {
                    clearTimeOut();
                    element.onload = element.onreadystatechange = null;
                    isAbort && fire('Failure');
                    setTimeout(function(){
                        domDispose(element, container);
                    },500);
                }
            };
            if (timeout > 0) {
                timerHander = setTimeout(function () {
                    fire("Timeout");
                    domDispose(element, container)
                }, timeout);
            }
        }

        function getJSONP() {
            var script = D.createElement('script');
            domLoad(script);
            script.async = opts.async;
            script.charset = 'utf-8';
            script.src = buildUrl();
            head.insertBefore( script, head.firstChild );
        }

        function postJSONP() {
            var guid = 'J__ID' + J.getTime().toString(16) + '' + (++I),
                sojContainer = D.createElement('div'),
                form = D.createElement('form'),
                inputs = [], items = opts.data;

            sojContainer.innerHTML = '<iframe id="' + guid + '" name="' + guid + '"></iframe>';
            sojContainer.style.display = 'none';

            for (var k in items) {
                inputs.push("<input type='hidden' name='" + k + "' value='" + items[k] + "' />")
            }
            opts.callback && inputs.push("<input type='hidden' name='callback' value='" + opts.callback + "' />");
            form.innerHTML = inputs.join('');

            //form.action = opts.url;
            // DEBUG BEGIN
            form.action = addSessionID(opts.url);
            form.method = 'post';
            form.target = guid;
            sojContainer.appendChild(form);
            head.insertBefore( sojContainer, head.firstChild );

            var a = D.getElementById(guid);

            a && domLoad(a, sojContainer);

            form.submit();
            //a.src = aboutBlank;
            /*form.action = aboutBlank;
            form.method = 'get';
            form.target = '_self';*/
            form = null;
        }

        function addSessionID(url) {
            if(J.requestSessionId){
                return url += (url.indexOf('?') > 0 ? '&' : '?') + '__REQU_SESSION_ID=' + J.requestSessionId;
            }
            return url;
        }

        function request() {
            try {
                var async = opts.async, headers = opts.headers, data = opts.data, aUrl;

                xhr = getXHR();

                headers['X-Request-With'] = 'XMLHttpRequest';

                if (method == 'GET') {
                    aUrl = buildUrl();
                    data = null
                } else {
                    //aUrl = opts.url;
                    aUrl = addSessionID(opts.url);

                    if (data && !J.isString(data)) (data = param(data));
                }

                xhr.open(method, aUrl, async);

                if (async) {
                    xhr.onreadystatechange = stateChangeHandler;
                }

                // 在open之后再进行http请求头设定
                if (method == 'POST') {
                    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                }

                for (var key in headers) {
                    if (headers.hasOwnProperty(key)) {
                        xhr.setRequestHeader(key, headers[key]);
                    }
                }

                // DEBUG
                J.requestSessionId && xhr.setRequestHeader('REQU_SESSION_ID', J.requestSessionId);

                fire('Beforerequest');

                if (timeout > 0) {
                    timerHander = setTimeout(function () {
                        xhr.onreadystatechange = function () {};
                        xhr.abort();
                        fire("Timeout");
                    }, timeout);
                }

                xhr.send(data);

                if (!async) {
                    stateChangeHandler();
                }
            } catch (ex) {
                fire('Failure', ex);
            }
            return xhr;
        }

        function buildUrl() {
            var data = opts.data, url = opts.url;
            // DEBUG BEGIN
            J.requestSessionId && (url = url.replace(/__REQU_SESSION_ID=[^&]+/,''));
            // DEBUG END
            if (data && !J.isString(data)) (data = param(data));
            if (method == "GET") {
                data && (url += fn() + data);
                (opts.type == 'jsonp' && opts.callback) && (url += fn() + 'callback=' + opts.callback);
                opts.cache || (url += fn() + 'J' + J.getTime())
            }

            // DEBUG BEGIN
            url = addSessionID(url);

            function fn() {
                return url.indexOf('?') > 0 ? '&' : '?'
            }

            return url;
        }

        function param(a) {
            var s = [ ];

            function add(key, value) {
                s[ s.length ] = encode(key) + '=' + encode(value);
            }

            for (var j in a)
                add(j, J.isFunction(a[j]) ? a[j]() : a[j]);
            return s.join("&").replace(/%20/g, "+");
        }


        /**
         * readyState发生变更时调用
         *
         * @ignore
         */
        function stateChangeHandler() {
            if (xhr.readyState == 4) {
                clearTimeOut();
                try {
                    var stat = xhr.status;
                } catch (ex) {
                    // 在请求时，如果网络中断，Firefox会无法取得status
                    fire('Failure', ex);
                    return;
                }
                if ((stat >= 200 && stat < 300) || stat == 304 || stat == 1223) {
                    fire('Success');
                } else {
                    fire('Failure');
                }
                xhr.onreadystatechange = function () {};
                if (opts.async) {
                    xhr = null;
                }
            }
        }

        /**
         * 获取XMLHttpRequest对象
         *
         * @ignore
         * @return {XMLHttpRequest} XMLHttpRequest对象
         */
        function getXHR() {
            if (W.ActiveXObject) {
                try {
                    return new ActiveXObject("Msxml2.XMLHTTP");
                } catch (e) {
                    try {
                        return new ActiveXObject("Microsoft.XMLHTTP");
                    } catch (e) {
                    }
                }
            }
            if (W.XMLHttpRequest) {
                return new XMLHttpRequest();
            }
        }

        /**
         * 触发事件
         *
         * @ignore
         * @param {String} type 事件类型
         * @param {EventHandler} eventHandler 事件句柄
         */
        function fire(type, eventHandler) {
            type = 'on' + type;
            var handler = eventHandlers[type], responseRet;
            if (handler) {
                if (type != 'onSuccess') {
                    handler(eventHandler||xhr);
                } else {
                    try {
                        responseRet = (opts.type == 'json') ? (new Function("return (" + xhr.responseText + ")"))() : xhr.responseText
                    } catch (ex) {
                        fire('Failure', ex);
                    };
                    try{
                        handler(responseRet);
                    }catch(ex){
                        if(eventHandlers['onFailure']){
                            fire('Failure', ex)
                        }else{
                            throw ex
                        }
                    }
                }
            }
        }


    }

    ajaxObj = J.add('ajax');

    J.each('get post'.split(' '), function (i, v) {
        /**
         *
         * 发送一个get请求
         *
         * @grammar J.get(url | options [,function | options])
         *
         *    options.url               String
         *    options.data              Object | String
         *    options.type              String
         *    options.timeout           Int
         *    options.onSuccess         Function
         *    options.onFailure         Function
         *    options.onBeforerequest   Function
         *    options.async,            Boolean
         *
         *
         * @name J.ajax.get
         * @param {String|Object} options 请求的url或参数配置
         * @param {Object|Function} options 参数配置或者回调函数
         * @return {Object}
         *
         */

        /**
         * 发送一个post请求
         *
         * @grammar J.post(url | options [,function | options])
         *
         *    options.url               String
         *    options.data              Object | String
         *    options.type              String
         *    options.timeout           Int
         *    options.onSuccess         Function
         *    options.onFailure         Function
         *    options.onBeforerequest   Function
         *    options.async,            Boolean
         *
         *
         * @name J.ajax.post
         * @param {String|Object} options 请求的url或参数配置
         * @param {Object|Function} options 参数配置或者回调函数
         * @return {Object}
         *
         */

        ajaxObj[v] = function (url, options) {
            return new Ajax(url, options, v)
        };
    });

    J.mix(J, ajaxObj);

})(J, window);/*opts
 * Jock
 * * Base api
 */
(function(win){
    J.map = {};
    var BmapVersion = 2.0;
    J.map.Bload = function(callback){

        J.load('http://api.map.baidu.com/getscript?v='+BmapVersion+'&ak=63c4ca91e854d14a9cbdd8f7cf663071','js',callback);
    }
})(J);
/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: page/page.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/08/28
 *
 */
(function () {

    var W = window, D = document, DE = D.documentElement;

    function B(){
        return D.body
    }

    function C(){
        return D.compatMode == 'BackCompat' ? B() : DE
    }

    J.add('page', {
        /**
         * 获取页面高度
         * @name J.page.getHeight
         * @function
         * @grammar J.page.getHeight()
         * @see J.page.getWidth
         *
         * @returns {number} 页面高度
         */
        height:function () {
            return Math.max(DE.scrollHeight, B().scrollHeight, C().clientHeight);
        },

        /**
         * 获取页面宽度
         * @name J.page.getWidth
         * @function
         * @grammar J.page.getWidth()
         * @see J.page.getHeight
         *
         * @returns {number} 页面宽度
         */
        width:function () {
            return Math.max(DE.scrollWidth, B().scrollWidth, C().clientWidth);
        },
        /**
         * 获取横向滚动量
         *
         * @return {number} 横向滚动量
         */
        scrollLeft:function () {
            return W.pageXOffset || DE.scrollLeft || B().scrollLeft;
        },
        /**
         * 获取纵向滚动量
         *
         * @returns {number} 纵向滚动量
         */
        scrollTop:function () {
            return W.pageYOffset || DE.scrollTop || B().scrollTop;
        },

        /**
         * 获取页面视觉区域高度
         * @name J.page.viewHeight
         * @function
         * @grammar J.page.viewHeight()
         *
         * @returns {number} 页面视觉区域高度
         */
        viewHeight:function () {
            return C().clientHeight;
        },

        /**
         * 获取页面视觉区域宽度
         * @name J.page.viewWidth
         * @function
         * @grammar J.page.viewWidth()
         *
         * @returns {number} 页面视觉区域宽度
         */
        viewWidth:function () {
            return C().clientWidth;
        }
    });
})();

/// require('map.Bload');
/// require('page.page');


(function(J){
    function Bmap(opption){
        var baseDomain = "http://pages.lunjiang.dev.aifcdn.com/";
        var defOpts ={
            id:'',
            lng:0,
            lat:0,
            latlng:0,
            zoom:15,
            mark:0,
            u3d:0,
            city:'',
            ctype:1,
            cdn:baseDomain+'img/',
            ezoom:0,
            top:0,
            d:true,//debug
            minz:0,
            maxz:0,
            scale:0,
            onMoveStart:null,
            onMoveEnd:null,
            onZoomStart:null,
            onZoomEnd:null,
            target:document//自定主事件触对的对象
        },elm,isLoaded;

        var io = {
                title: '',
                popInfo: '',
                barInfo: '',
                icon: 'http://pages.lunjiang.dev.aifcdn.com/img/jmap/1/mapMarker-Default.png',
                size: {
                    w: 35,
                    h: 34
                },
                offset: {
                    x: 9,
                    y: 34
                },
                imgOffset: {x: 0, y: 0}, lat: 0, lng: 0,
                latlng: {}
            },opts = {},
            OVERLAYS = {},
            map,
            skipOvList = [];

        function init(){
            opts = J.mix( defOpts,opption || {});
            opts.latlng = getLatLng(opts);
            if (!opts.id || typeof BMap!=='object') return;
            var elem = J.g(opts.id);
            if(!elem){
                alert('文档中未找到id：'+opts.id+'对像');
                return false;
            }
            opts.elm=elem;
            //opts.elm.setStyle({background:'none'});
            createMap();
        }
        J.map.Bload(init);//加载完百度地图后自动实例化地图对像

        function createMap(){
            map = new BMap.Map(opts.id, {
                mapType: !!opts.u3d && opts.city != '' ? BMAP_PERSPECTIVE_MAP : BMAP_NORMAL_MAP,
                minZoom: opts.minz ? opts.minz : 3,
                maxZoom: opts.maxz ? opts.maxz : 18
            });
            if (!!opts.u3d && opts.city != '')
                map.setCurrentCity(opts.city);
            map.centerAndZoom(new BMap.Point(opts.lng, opts.lat), opts.zoom);

            if (!!opts.mark){
                var marker = addMarker(opts,'center');
            }
            if (!!opts.ezoom)
                map.enableScrollWheelZoom();  // 开启鼠标滚轮缩放
            map.enableKeyboard();         // 开启键盘控制
            map.enableContinuousZoom();   // 开启连续缩放效果
            map.enableInertialDragging(); // 开启惯性拖拽效果

            var ctrl_nav = new BMap.NavigationControl({
                anchor: BMAP_ANCHOR_TOP_LEFT,
                type: !!opts.ctype ? BMAP_NAVIGATION_CONTROL_LARGE : BMAP_NAVIGATION_CONTROL_ZOOM
            });
            map.addControl(ctrl_nav);
            if(!!opts.scale){
                var ctrl_scale = new BMap.ScaleControl({
                    anchor: BMAP_ANCHOR_BOTTOM_LEFT
                });
                map.addControl(ctrl_scale);
            }
            J.fire(opts.target,'mapLoaded',map,true);//地图实例化完毕发

        }
        function setOverlaysVisible(t, visible, skip){
            var ovs = OVERLAYS[t];
            for(var ov in ovs){
                setOverlayVisible(t, ov, visible)
            }
        }
        function setOverlayVisible(t, key, visible){
            if(OVERLAYS[t] && OVERLAYS[t][key]) OVERLAYS[t][key].setVisible(visible||false);
        }
        function getOverlay(t, key){
            OVERLAYS[t] = OVERLAYS[t] ? OVERLAYS[t] : {};
            return OVERLAYS[t][key]
        }
        function getOverlays(t){
            return OVERLAYS[t] ? OVERLAYS[t] : undefined
        }
        function clearOverlays(){
            map.clearOverlays();
            OVERLAYS = {};
        }
        function pushOverlayList(t,k,o) {
            OVERLAYS[t] = OVERLAYS[t] ? OVERLAYS[t] : {}
            OVERLAYS[t][k] = o;
        }
        function getLatLng (p) {
            var p = p || opts;
            return new BMap.Point(p.lng, p.lat);
        }
        function getMap(){
            return map || {};
        }
        function reset(){
            map.reset()
        }
        function getBounds(){
            return map.getBounds();
        }
        function getBoundsWE(zoom){
            var b=getBounds(),w=b.getSouthWest(),e=b.getNorthEast();
            if(zoom && typeof zoom == 'number'){
                var _w = map.pointToOverlayPixel(w),_e = map.pointToOverlayPixel(e);
                _w.x+=-zoom; // w.lng 横向
                _w.y+=zoom; // w.lat 纵向
                _e.x+=zoom-30;
                _e.y+=-(zoom-20);
                w=map.overlayPixelToPoint(new BMap.Pixel(_w.x,_w.y));
                e=map.overlayPixelToPoint(new BMap.Pixel(_e.x,_e.y));
            }
            return {
                swlat:w.lat,
                nelat:e.lat,
                swlng:w.lng,
                nelng:e.lng
            }
        }
        function inBounds(latlng) {
            var b = getBounds();
            if(typeof b === 'object'){
                return b.containsPoint(latlng);
            }
            return true;
        }
        function pointToPixel(latlng){
            return map.pointToPixel(latlng);
        }
        function addMarker (p, overlayType, key) {
            p.latlng = p.latlng ? p.latlng : getLatLng(p);
            var _key = key || buildOverlayKey(p.latlng), _type = overlayType || overlaysType.overlay;
            if (getOverlay(_type, _key)) return;
            var marker = new BMap.Marker(p.latlng, {
                icon: getMarkerImage(J.mix(io, p, true))
            });
            if (p.title) {
                marker.setTitle(p.title)
            }
            if (p.showInfo) {
                var s = this;
                marker.addEventListener('click',function(){
                    s.openMarkerWindow(p);
                })
            }
            map.addOverlay(marker);
            pushOverlayList(_type, _key, marker);
            return marker;
        }
        function getMarkerImage(p){
            return new BMap.Icon(p.icon, new BMap.Size(p.size.w, p.size.h), {
                anchor: new BMap.Size(p.offset.x, p.offset.y),
                imageOffset: new BMap.Size(p.imgOffset.x, p.imgOffset.y)
            });
        }
        function openWindow(p){
            var opts={}
            if(typeof p.offset != 'undefined'){
                opts['pixelOffset'] = new BMap.Size(p.offset.x,p.offset.y)
            }
            var infoWindow = new BMap.InfoWindow(p.popInfo, opts);
            map.openInfoWindow(infoWindow, p.latlng);
        }
        function openMarkerWindow(p){
            openWindow(p)
        }
        function openOverlayWindow(p, openerOverlay){
            openWindow(p)
        }

        function clone (obj) {
            if (null == obj || "object" != typeof obj) return obj;
            var copy = obj.constructor();
            for (var attr in obj) {
                if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
            }
            return copy;
        }
        function userOverlay(){


        }
        function addOverlay(param, overlayType, key) {
            var p = fn.clone(param);
            p.latlng = p.latlng ? p.latlng : getLatLng(p);
            var _key = key||buildOverlayKey(p.latlng),
                _type = overlayType,
                oldOverlay = getOverlay(_type,_key),
                me;
            if(oldOverlay) return oldOverlay;

            function userOverlay(p){
                this.p = p;
            }
            userOverlay.prototype = new BMap.Overlay();
            userOverlay.prototype.initialize = function(map){
                this._map = map;
                this._locked = false;
                this._CName = !!this.p.className ? this.p.className : '';
                this._CHover = !!this.p.classHover ? this.p.classHover : '';
                this._barOffsetX = this.p.x || 0;
                this._barOffsetY = this.p.y || 0;
                me = this;
                var div = document.createElement("DIV");
                div.style.position = "absolute";
                div.style.cursor = "pointer";
                div.style.zIndex = 0;

                if(this._CName){
                    div.className = me._CName;
                }
                div.innerHTML = this.p.html;
                div.title = !!this.p.title ? this.p.title : '';

                if(this.p.showInfo){
                    J.on(div,'click',function(){
                        fn.openOverlayWindow(me.p, me)
                    });
                }
                J.on(div,"mouseover", function(){
                    me.setOver();
                });
                J.on(div,"mouseout", function(){
                    me.setOut();
                });
                map.getPanes().labelPane.appendChild(div);
                this._div = div;
                return div
            }
            userOverlay.prototype.setOver = function(){
                if(!this._locked){
                    this._div.style.zIndex = 1;
                    if(this._CName && this._CHover){
                        this._div.className = this._CName+' '+this._CHover;
                    }
                }
            }
            userOverlay.prototype.setOut = function(){
                if(!this._locked){
                    this._div.style.zIndex = 0;
                    if(this._CName){
                        this._div.className = this._CName;
                    }
                }
            }
            userOverlay.prototype.setLock = function(isLocked){
                if(isLocked) this._locked = true;
                else this._locked = false;
            }
            userOverlay.prototype.draw = function(){
                var map = this._map;
                var pixel = map.pointToOverlayPixel(this.p.latlng);
                this._div.style.left = pixel.x + this._barOffsetX + "px";
                this._div.style.top  = pixel.y + this._barOffsetY + "px";
            }
            userOverlay.prototype.setVisible = function(b){
                if (this._div) {
                    this._div.style.visibility = (b) ? "visible" : "hidden";
                }
            }
            userOverlay.prototype.removeOverlay=function(){
                J.un(this._div);
                map.removeOverlay(this)
            }
            var uO = new userOverlay(p);
            uO.key = _key;
            map.addOverlay(uO);
            fn.pushOverlayList(_type,_key,uO);
            return uO;
        }
        function addPloyline(path, PloylineOptions, overlayType, key){
            var _key = key||buildOverlayKey(PloylineOptions.latlng), _type = overlayType || this.overlaysType.ployline;
            if(getOverlay(overlaysType.ployline,_key)) return;
            var _PloylineOptions = Jock.extend({
                strokeColor : "#0030ff",
                strokeOpacity : 0.60,
                strokeWeight : 6,
                enableMassClear : true
            }, PloylineOptions || {});
            var _polyline = new BMap.Polyline(path, _PloylineOptions)
            map.addOverlay(_polyline);
            pushOverlayList(_type,_key,_polyline);
        }
        function buildOverlayKey(latlng){
            return latlng.lat+'_'+latlng.lng;
        }
        function getGeocoder(address,callback,city){
            var geo = new BMap.Geocoder();
            geo.getPoint(address,callback,city);
        }

        function localSearch(keyword, obj, callback, args){
            var A = new BMap.LocalSearch(map);
            A.setPageCapacity(10);
            A.enableAutoViewport();
            //A.setLocation('北京市');
            A.setSearchCompleteCallback( function(D) {
                var s = [];
                if (A.getStatus() == BMAP_STATUS_SUCCESS) {
                    var l = D.getCurrentNumPois();
                    while (l--) {
                        var rs = D.getPoi(l);
                        var r = {};
                        r['title'] = rs.title;
                        r['point'] = rs.point;
                        r['address'] = rs.address;
                        s.push(r)
                    }
                }
                if (obj && callback){
                    callback.call(obj, s, args);
                    A = null;
                }
            });
            A.search(keyword)
        }
        function localSearchNearby(keyword, callback, capacity, radius){
            if(!keyword) return;
            var A = new BMap.LocalSearch(map);
            radius = radius || 1000;
            A.setPageCapacity(capacity || 50);
            A.enableAutoViewport();
            A.setSearchCompleteCallback( function(D) {
                var s = [];
                if (A.getStatus() == BMAP_STATUS_SUCCESS) {
                    var l = D.getCurrentNumPois();
                    for(var i=0;i<l;i++){
                        s.push( D.getPoi(i) );
                    }
                }
                callback && callback.call(null, s),A=null;
            });
            A.searchNearby(keyword, map.getCenter(), radius)
        }
        function setCenter(lng,lat,zoom){
            map.centerAndZoom(new BMap.Point(lng, lat),zoom);
            map.setCenter(new BMap.Point(lng, lat));
        }
        function geolocation(obj, callback){
            var gl = new BMap.Geolocation();
            gl.getCurrentPosition(function(result){
                if (obj && callback && result)
                    callback.call(obj, result.point)
            });
        }

        return {
            addOverlay:addOverlay,
            geolocation:geolocation,
            setCenter:setCenter,
            getGeocoder:getGeocoder,
            addMarker:addMarker,
            getOverlays:getOverlays,
            getMap:getMap

        }


    }

    J.map.bmap = Bmap;

})(J);















/// require('map.Bmap');

(function(J){
    function core(opption){
        var defOpts={
            url:'',
            id: "",
            lat: "31.230246775887",
            lng: "121.48246298372",
            mark: 0,
            zoom: 12,
            ezoom: 1,
            minz: 11,
            maxz: 18,
            onBeforeRequest:null,//取数据之前的操作　
            callback:init,
            target:document//自定义事件触发的对象
        },BMap,opts,MSG,context,dataCenter,map;
        function init(){
            opts = J.mix(defOpts,opption);
            context = new  J.map.bmap(opts);
            MSG = new MessageCenter(opts);
            dataCenter = new DataCenter(opts);
            map = context.getMap();
        }


        init();
        function eventBind(){
            var map = context.getMap();
          //  var event = ['click','dbclick','rightclick','rightdblclick','maptypechange','maptypechange'];
            J.on(opts.target,'mapLoaded',function(map){
                console.log("have resceived the event");
            });

            map.addEventListener('click',function(){
                //map click
            });
            map.addEventListener('dbclick',function(){
                //map click
            });
            map.addEventListener('rightclick', function () {
                //map click
            });
            map.addEventListener('rightdblclick', function () {
                //map click
            });
            map.addEventListener('maptypechange', function () {
                //map click
            });
            map.addEventListener('mousemove', function () {
                //map click
            });
            map.addEventListener('mouseover', function () {
                //map click
            });
            map.addEventListener('mouseout', function () {
                //map click
            });
            map.addEventListener('movestart', function () {
                //map click
            });
            map.addEventListener('moveend', function () {
                dataCenter.getData();
            });
            map.addEventListener('zoomstart', function () {
                //map click
            });
            map.addEventListener('zoomend', function () {
                dataCenter.getData();

                //map click
            });
            map.addEventListener('touchstart', function () {
                //map click
            });
            map.addEventListener('touchmove', function () {
                //map click
            });
            map.addEventListener('touchend', function () {
                dataCenter.getData();
            });
            map.addEventListener('longpress', function () {
                //map click
            });


        }




        /**
         * 数据中心
         * @constructor
         */
        function DataCenter(opption){
            var defOpts = {
                    url:'',
                    type:'json',
                    onBeforeRequest:null//发送请求之前接收用户传递的参数

                },
                CACHE = [],
                opts,
                callback = {},
                guid= 0,
                key;

            opts = J.mix(defOpts,opption);

            /**
             * 得到地图可视化区域坐标
             * @param zoom
             */
            function getBoundsWE(zoom){
                var b=map.getBounds(),w=b.getSouthWest(),e=b.getNorthEast();
                if(zoom && typeof zoom == 'number'){
                    var _w = map.pointToOverlayPixel(w),_e = map.pointToOverlayPixel(e);
                    _w.x+=-zoom; // w.lng 横向
                    _w.y+=zoom; // w.lat 纵向
                    _e.x+=zoom-30;
                    _e.y+=-(zoom-20);
                    w=map.overlayPixelToPoint(new BMap.Pixel(_w.x,_w.y));
                    e=map.overlayPixelToPoint(new BMap.Pixel(_e.x,_e.y));
                }
                return {
                    swlat:w.lat,
                    nelat:e.lat,
                    swlng:w.lng,
                    nelng:e.lng
                }
            }

            /**
             * 发送ajax请求数据
             */
            function getData(){
                var ajaxSetting={
                    type:opts.type,
                    onSuccess: null
                },params = beforeRequest(),data;
                if(!params){
                    return false;
                }

                data = CACHE[ key = getCacheKey(params)];
                if(data){
                    onResult(data);
                    return true;
                }
                callback[guid]&&(callback[guid]=J.map.bmap['callback'+guid]=function(){});
                guid++;
                ajaxSetting.callback =ajaxSetting.onSuccess = callback[guid]=J.map.bmap['callback'+guid] = onResult;
                J.get(ajaxSetting);
            }

            /**
             * 发送ajax请求之前所需要的参数
             * @returns {ajaxsetting} or {ajaxsetting.data}
             */
            function beforeRequest(){
                var params = getBoundsWE(),clientData;
                params.zoom =map.getZoom();
                clientData =  opts.onBeforeRequest&&opts.onBeforeRequest(params,map);
                return clientData ? false : J.mix(params,clientData);
            }

            /**
             * ajax数据回来　，创建Ｏverlay 并发现消息
             * @param data
             */
            function onResult(data){
                if(data&&!CACHE[key])CACHE[key] = data;
                data&&(CACHE[key]= data);
                MSG.ajaxChange(data);//通过消息中心发送消息
            }

            /**
             * get the cache key
             * @returns {string}
             */
            function getCacheKey (params){
                var i,key='';
                for(i in params){
                    key= key+i;
                }
                return key;
            }
            return {
                getData:getData,
                getBoundsWE:getBoundsWE
            }
        }


        /**
         * 标点中心
         * @constructor
         */

        function OverlayCenter(option){
            var defOpts= {
                html:'',//标点要显示html
                onMouseOver:null,
                onMouseOut:null,
                onClick:null,
                onItemBuild:null,
                overlaysType:'overlays',//标点的类型
                showInfo:'',//点击要展示的文本,
                className:'',//默认展示的Class
                classHover:'',//鼠标放上去展示的样式
                x:0,//x轴要偏移的像素
                y:0//y轴要偏 移的像素
            },opts,preCache;
            (function(){
                opts= J.mix(defOpts,option);


            })();
            function addOverlay(data){

            }
            function onClick(elm,data){
                MSG.overlayClick({
                    target:elm,
                    data:data
                });
            }
            function onMouseOver(elm,data){
                MSG.overlayMouseOver({
                    target:elm,
                    data:data
                });

            }
            function onMouseOut(elm,data){
                MSG.overlayMouseOut({
                    target:elm,
                    data:data
                });
            }
            function remove(elm,data){
                MSG.overlayRemove({
                    target:elm,
                    data:data
                });
            }

            /**
             *
             * @param data array
             */
            function addOverlays(data){
                var i,len=data.length,itemOpts,item,key,tmpObj={},removeHandler;
                for(i=0;i<len;i++){
                    itemOpts = onItemBuild(data[i]);
                    if(!html) continue;
                    itemOpts = J.mix(defOpts,itemOpts,true);
                    key = buildOverlayKey(itemOpts);
                    if(!preCache[key+itemOpts.overlaysType]){
                        item =  context.addOverLays(itemOpts,itemOpts.overlaysType,key);
                        item.onClick = function(){
                            var ret = itemOpts.onClick&&itemOpts.onClick.call(this);
                            if(ret === false) return;
                            onClick(item,itemOpts);
                        };
                        item.onMouseOver = function(){
                            var ret = onMouseOver.call(this);
                            if(ret === false) return;
                            onMouseOver(item,itemOpts);

                        };

                        item.onMouseOut = function(){
                            var ret = onMouseOver.call(this);
                            if(ret === false) return;
                            onMouseOut(item,itemOpts);
                        }
                        item.onRemove = function(){
                            itemOpts.remove&&itemOpts.remove(item,itemOpts);
                            remove(item,itemOpts);
                        }
                        tmpObj[key+itemOpts.overlaysType] = item;
                    }
                    for(i in preCache){
                        remove(preCache[i]);
                    }
                    preCache = tmpObj;
                }
            }

            /**
             * 为创建的Overlay创建参数
             */
            function onItemBuild(data){
                var tmp ;
                var html = opts.onItemBuild&& (tmp =opts.onItemBuild(data))?opts.html:tmp;
                return html;
            }

            /**
             * 移除上次ajax所添加的数据，并移除不应该显示的点
             * data OverlaysArray
             */
            function removeOverlays(data){

            }
            function buildOverlayKey(latlng){
                return latlng.lat+'_'+latlng.lng;
            }
            function k_means(){


            }
            return {
                addOverLays:addOverlays
            }




        }

        /**
         * 消息中心
         * @returns {{ajaxChange: Function, overlayRemove: Function, overlayClick: Function, overlayMouseOver: Function}}
         * @constructor
         */
        function MessageCenter(option){

            var defOpts = {
                target:document,//触发对象
                data:null//附带消息
            },opts;
            (function(){
                opts = J.mix(defOpts,option);

            })();

            /**
             * 发送的ajax请求变化
             */
            function ajaxChange(data){
                sendMessage('ajaxChange',data);
            }
            /**
             *
             */
            function overlayRemove(data){
                sendMessage('overlayRemove',data);

            }
            function overlayClick(data){
                sendMessage('overlayClick',data);
            }
            function overlayMouseOver(data){
                sendMessage('overlayMouseOver',data);
            }
            function overlayMouseOut(data){
                sendMessage('overlayMouseOut',data);
            }
            function mapMoveStart(data){
                sendMessage('mapMoveStart',data);
            }
            function mapMoveStop(data){
                sendMessage('mapMoveStop',data);
            }
            function zoomChange(data){
                sendMessage('zoomChange',data);
            }
            function sendMessage(eventName,data){
                J.fire(opts.target,eventName,data,true);
            }
            return {
                ajaxChange:ajaxChange,
                overlayRemove:overlayRemove,
                overlayClick:overlayClick,
                overlayMouseOver:overlayMouseOver,
                overlayMouseOut:overlayMouseOut,
                mapMoveStart:mapMoveStart,
                mapMoveStop:mapMoveStop,
                zoomChange:zoomChange

            }
        }
        return {
            getData:dataCenter.getData

        }
    }
    J.map.core =core;

})(J);;
/// require('map.Core');

(function(){
   function pad(opption){
       var defOpts ={
           url:'',
           id: "jmap_fill",
           lat: "31.230246775887",
           lng: "121.48246298372",
           mark: 0,
           zoom: 14,
           ezoom: 1,
           minz: 10,
           maxz: 18,
           onBeforeRequest:beforeRequest
       },opts,elm;
       function init(){
           opts = J.mix(defOpts,opption);
           elm = document.getElementById(opts.id);
           if(!elm)return;
           showContent();
           bindEvent();
           var map =  J.map.core(opts);
           map.getData();
       }
       init();
        function showContent(){
            elm.style.height = J.page.viewHeight() - J.g('header').height() + 'px';
        }
       function bindEvent(){
           window.onresize = showContent;
       }
       function beforeRequest(data){
            console.log(data)
       }




   }
    pad();
})();/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: event/event.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/08/29
 *
 *
 *
 *
 */

/**
 *
KEY_BACKSPACE:8,
KEY_TAB:9,
KEY_RETURN:13,
KEY_ESC:27,
KEY_LEFT:37,
KEY_UP:38,
KEY_RIGHT:39,
KEY_DOWN:40,
KEY_DELETE:46,
KEY_HOME:36,
KEY_END:35,
KEY_PAGEUP:33,
KEY_PAGEDOWN:34,
KEY_INSERT:45,
 */

(function (J, W, D) {

    J.add('event', {
        DA:'dataavailable',
        LO:'losecapture',
        ME:'mouseenter',
        ML:'mouseleave',
        CACHE:[],
        fix:getResponder,
        fixName:fixEventName,
        getKeyCode:function (event) {
            return event.which || event.keyCode;
        },
        g:function(element){
            return (!element) ? '' : J.isString(element) ? D.getElementById(element) : (element && (element === W || element === D || (element.nodeType && element.nodeType === 1))) ? element : element.get(0);
        }
    });

    var E = J.event, dom = J.dom, ME = E.ME, ML = E.ML, U= 'unload', docEl = D.documentElement, isIE = J.ua.ie;
    E.MMES = 'on'+ ME in docEl && 'on'+ ML in docEl;

    dom && dom.fn && J.each('on un once fire'.split(' '), function(i, v){
        dom.fn[v] = function(){
            E[v].apply(null, [this.get()].concat(J.slice.call(arguments)));
            return this;
        }
    });

    function extend(event, element, data, preventDefault, stopPropagation) {
        if (!event) return false;
        var d = 'preventDefault',p = 'stopPropagation',c = 'currentTarget';

        event[c] || (event[c] = element);
        event[d] || (event[d] = function () {
            event.returnValue = false;
        });
        event[p] || (event[p] = function () {
            event.cancelBubble = true;
        });
        event.stop = function () {
            event[d]();
            event[p]()
        };

        if (preventDefault) event[d]();
        if (stopPropagation) event[p]();

        return event;
    }

    function getResponder(element, type, handler, data, preventDefault, stopPropagation) {
        return function (event) {
            if (type.indexOf(':') > -1 && event && event.eventName !== type) return false;
            if (!E.MMES && (type === ME || type === ML)) {
                var a = event.currentTarget || element, b = event.relatedTarget;
                //火狐支持compareDocumentPosition(), 其他浏览器支持 contains();
                if (!(a != b && !(a.contains ? a.contains(b) : !!(a.compareDocumentPosition(b) & 16) ))) return false;
            }
            extend(event, element, data, preventDefault, stopPropagation);
            handler.call(element, event, data);
        };
    }

    function fixEventName(e) {
        var translations = { mouseenter:"mouseover", mouseleave:"mouseout" };
        return (translations[e] || e);
    }

    // 释放内存，防止造成内存泄漏
    if (isIE)
        W.attachEvent('on'+U, function(){
            var e, E = J.event, a = E.CACHE, l = a.length, dE = 'detachEvent';
            while (l--) {
                e = a[l];
                e.e[dE]('on' + e.t, e.r, false);
                if (e.t.indexOf(':') > -1) {
                    e.e[dE]("on"+ E.DA, e.r);
                    e.e[dE]("on"+ E.LO, e.r);
                }
                a.splice(l, 1);
            }
        });
    // else
    //     W.addEventListener(U, function () {}, false);

})(J, window, document);
/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: event/fire.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/08/29
 *
 */

/// require('event.event');

/**
 * 触发已经注册的事件。
 * @name J.event.fire
 * @function
 * @grammar J.fire(element, type, [,data [,bubble]])
 * @param {HTMLElement|string|window} element 目标元素或目标元素id
 * @param {string} type 事件类型
 * @param {Object} data 需要传递的数据 ，通过 event.data 获取
 * @param {Boolean} bubble || true 是否冒泡
 *
 * @shortcut fire
 * @meta standard
 *
 * @returns {Event}
 */
J.fire = J.event.fire = function(element, type, data, bubble) {

    var event, E = J.event, DA = E.DA, LO = E.LO, D = document;

    if( (element = E.g(element)).length == 0 ) return false;

    bubble = bubble || true;

    if (element == D && D.createEvent && !element.dispatchEvent)
        element = D.documentElement;


    if (D.createEvent) {
        event = D.createEvent('HTMLEvents');
        event.initEvent(DA, bubble, true);
    } else {
        event = D.createEventObject();
        event.eventType = bubble ? 'on'+DA : 'on'+LO;
    }

    event.eventName = type;
    event.data = data || { };

    if (D.createEvent)
        element.dispatchEvent(event); else
        element.fireEvent(event.eventType, event);

    return event;
};/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: event/getPageX.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/08/31
 *
 */


/**
 * 获取鼠标事件的鼠标x坐标
 * @name J.event.getPageX
 * @function
 * @grammar J.event.getPageX(event)
 * @param {Event} event 事件对象
 *
 * @returns {number} 鼠标事件的鼠标x坐标
 */
J.event.getPageX = function (event) {
    var doc = document, docEl = doc.documentElement,  body = doc.body || { scrollLeft:0 };
    return event.pageX || (event.clientX + (docEl.scrollLeft || body.scrollLeft) - (docEl.clientLeft || 0));
};
/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: event/getPageY.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/08/31
 *
 */


/**
 * 获取鼠标事件的鼠标y坐标
 * @name J.event.getPageY
 * @function
 * @grammar J.event.getPageY(event)
 * @param {Event} event 事件对象
 *
 * @returns {number} 鼠标事件的鼠标y坐标
 */
J.event.getPageY = function (event) {
    var doc = document, docEl = doc.documentElement, body = doc.body || { scrollTop:0 };
    return  event.pageY || (event.clientY + (docEl.scrollTop || body.scrollTop) - (docEl.clientTop || 0));
};
/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: event/on.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/08/29
 *
 */


/// require('event.event');

/**
 * 为目标元素添加事件监听器
 * @name J.event.on
 * @function
 * @grammar J.on(element, type, handler [,data [,preventDefault [,stopPropagation]]])
 * @param {HTMLElement|string|window} element 目标元素或目标元素id
 * @param {string} type 事件类型
 * @param {Function} handler 需要添加的监听器
 * @param {Object} data 需要传递的数据 ，通过 event.data 获取
 * @param {Boolean} preventDefault 阻止事件默认行为
 * @param {Boolean} stopPropagation 停止事件冒泡
 *
 * @shortcut on
 * @meta standard
 * @see J.event.un
 *
 * @returns {HTMLElement|window} 目标元素
 */

J.on = J.event.on = function (element, type, handler, data, preventDefault, stopPropagation) {

    var E = J.event, a = E.CACHE, responder, isFire = type.indexOf(':') > -1, aD = 'addEventListener', aT = 'attachEvent', DA = E.DA, LO = E.LO;

    //if( (element = E.g(element)).length == 0 ) return false;

    element = E.g(element);

    responder = E.fix(element, type, handler, data, preventDefault, stopPropagation);

    if (!E.MMES) type = E.fixName(type);

    if (element[aD])
        element[aD](isFire ? DA : type, responder, false); else {
        if (isFire) {
            element[aT]("on" + DA, responder);
            element[aT]("on" + LO, responder);
        } else element[aT]("on" + type, responder);
    }

    a.push({
        e:element,
        t:type,
        h:handler,
        r:responder
    });

    return element;
};
/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: event/un.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/08/29
 *
 */


/// require('event.event');


/**
 * 为目标元素移除事件监听器
 * @name J.event.un
 * @function
 * @grammar J.un(element, type, handler)
 * @param {HTMLElement|string|window} element 目标元素或目标元素id
 * @param {string} type 事件类型
 * @param {Function} handler 需要移除的监听器
 *
 * @shortcut un
 * @meta standard
 * @see J.event.on
 *
 * @returns {HTMLElement|window} 目标元素
 */

J.un = J.event.un = function (element, type, handler) {

    var E = J.event, a = E.CACHE,  DA = E.DA, LO = E.LO, l = a.length, e, elmAll = !type, typeAll = !handler, isFire , rE = 'removeEventListener', dT = 'detachEvent';

    //if( (element = E.g(element)).length == 0 ) return false;

    element = E.g(element);

    if (!E.MMES && !type) {
        type = E.fixName(type);
    }

    while (l--) {
        e = a[l];
        if (e.e == element && (elmAll || e.t == type) && (typeAll || e.h == handler)) {
            isFire = e.t.indexOf(':') > -1;
            if (element[rE])
                element[rE](isFire ? DA : (type || e.t), e.r, false); else {
                if (isFire) {
                    element[dT]("on"+DA, e.r);
                    element[dT]("on"+LO, e.r);
                } else element[dT]("on" + (type || e.t), e.r);
            }
            a.splice(l, 1);
        }

    }

    return element;

};/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: event/once.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/08/29
 *
 */


/// require('event.event');
/// require('event.on');
/// require('event.un');

/**
 * 为目标元素添加一次事件绑定
 * @name J.event.once
 * @function
 * @grammar J.once(element, type, handler)
 * @param {HTMLElement|string} element 目标元素或目标元素id
 * @param {string} type 事件类型
 * @param {Function} handler 需要添加的监听器
 * @see J.event.un,J.event.on
 *             
 * @returns {HTMLElement} 目标元素
 */
J.once = J.event.once = function(element, type, handler){
    function onceListener(event){
        handler.call(element,event);
        J.event.un(element, type, onceListener);
    } 
    J.event.on(element, type, onceListener);
    return element;
};
/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: ui/ui.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/10/11
 *
 */


J.add('ui');/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: ui/panel.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/12/05
 *
 */

/// require('ui.ui');
/// require('page');

;
(function (J) {
    /**
     * 缺省的选项配置
     * @type {Object}
     */
    var defaultOpts = {
        autoClose: '',
        scroll:false,
        mask: true,
        modal: true,
        title: '',
        content: '',
        close: true,
        ok: '',
        cancel: '',
        width: 360,
        height: '',
        position: {}, // {top:'',left:'',right:'',bottom:''}
        drag: false,
        fixed: '',
        onClose: null,
        onOk: null,
        onCancel: null,
        custom:null,
        tpl: 'panel_def'
    }, main, boxModal, identityIndex = 0;

    /**
     * Panel Function
     * @param options 扩展选项
     * @constructor
     */
    function Panel(options) {
        var m, boxPanel, boxIfm, boxTitle, boxContent, boxClose, boxFooter, opts , tpl , page = J.page, timer, title, boxTopRadius = '0 0', boxBottomRadius = '0 0', okDisable = false, okBt, cancelBt, pageWidth = page.width(), pageHeight = page.height();

        main || (main = insertFirst('body', {style: 'padding:0;margin:0'}));


        /**
         * Initialize
         */
        (function() {
            opts = J.mix(defaultOpts, options || {}, true);
            opts.modal && (boxModal || (boxModal = createModal()), boxModal.show());
            opts.mask && boxModal.addClass('panel_modal_mask');
            tpl = opts.tpl;
            title = opts.title;
            boxPanel = J.create('div', {style: 'z-index:10001;position:absolute', 'class': tpl, 'id':(tpl + Math.random()).replace(/\./,'')+(++identityIndex)});
            boxIfm = J.create('iframe', {style: 'z-index:-1;position:absolute;', 'scrolling': 'no', 'frameborder': '0'});
            boxPanel.append(boxIfm);
            opts.mask && boxPanel.addClass(tpl + '_mask');
            title && (boxTitle = appendTo(boxPanel, 'title').html(title));
            opts.close && (boxClose = appendTo(boxPanel, 'close', 'a')).attr('href', 'javascript:;').on('click', close, null, true, true);
            boxContent = appendTo(boxPanel, 'box');
            title || (boxContent.setStyle('border-top:0'), boxTopRadius = '5px 5px');
            opts.ok ? createFooter() : (boxContent.setStyle('border-bottom:0'), boxBottomRadius = '5px 5px');
            boxContent.setStyle('border-radius:' + boxTopRadius + ' ' + boxBottomRadius);
            main.append(boxPanel);
            var s = {};
            J.each(['width','height'],function(i, v){
                opts[v] && (s[v] = opts[v] + 'px');
            });
            boxPanel.setStyle(s);

            if(opts.content){
                setContent(opts.content);
            }else{
                fixPosition();
            }
            opts.autoClose && setAutoClose(opts.autoClose);
            opts.custom && opts.custom(boxPanel)

        })();


        /**
         * 设置自动关闭
         * @param second 秒
         */
        function setAutoClose(second){
            timer = setTimeout(close, (parseInt(second) - 1) * 1000);
        }


        function createFooter() {
            boxFooter = appendTo(boxPanel, 'footer');
            var ok = opts.ok, cancel = opts.cancel;
            okBt = appendTo(boxFooter, 'button', 'a').attr('href', 'javascript:;').addClass(tpl + '_ok').html(ok);
            cancel && (cancelBt = appendTo(boxFooter, 'button', 'a')).attr('href', 'javascript:;').html(cancel);
            (opts.onOk && okBt) && okBt.on('click', function () {
                if (okDisable) {
                    return false;
                }
                opts.onOk(m)
            }, null, true, true);
            (opts.onCancel && cancelBt) && cancelBt.on('click', function () {
                opts.onCancel(m)
            }, null, true, true);
        }

        function removeFooter(){
            if(boxFooter){
                J.s('.' + opts.tpl + '_button').each(function(i, v){
                    v.un()
                });
                boxFooter.remove();
            }
        }

        function createModal() {
            return J.create('div').addClass('panel_modal').setStyle({
                backgroundColor: '#333',
                zIndex: 10000,
                width: page.width() + 'px',
                height: page.height() + 'px',
                position: 'absolute',
                left: '0',
                top: '0'
            }).insertFirstTo(main);
        }

        function fixPosition(width, height) {
            var viewHeight = page.viewHeight(), viewWidth = page.viewWidth(),
                scrollTop = !opts.fixed ? page.scrollTop() : 0, scrollLeft = !opts.fixed ? page.scrollLeft() : 0,
                position = opts.position || {},
                panelWidth = width || boxPanel.width(), panelHeight = (height || boxPanel.height() - 2), s = {
                    width: panelWidth + 'px'
                };

            J.each(position, function (i, v) {
                s[i] = v + 'px';
            });

            // 如果panel的高度超过一屏，设置panel内的content为滚动条，达到panel在一屏内显示的目的
            if (panelHeight > viewHeight) {
                if(opts.scroll){
                    boxContent.setStyle('height:' + (viewHeight - 140) + 'px;overflow-y:auto;');
                    panelHeight = boxPanel.height();
                }else{
                    s.top = '0';
                }
            }

            //s.height = panelHeight + 'px';  modify by hqyun 2013.03.28
            s.top || (s.top = ((viewHeight / 2) - (panelHeight / 2) + scrollTop + 'px'));
            s.left || (s.left = ((viewWidth / 2) - (panelWidth / 2) + scrollLeft + 'px'));
            s.right && (s.left = 'auto');
            s.bottom && (s.top = 'auto');
            boxPanel.setStyle(s);

            if (opts.fixed) {
                s = {};
                if (J.ua.ie == 6) {
                    var html = document.getElementsByTagName('html')[0],
                        boxPanelStyle = boxPanel.get().style,
                        dom = '(document.documentElement || document.body)',
                        oldTop = parseInt(boxPanelStyle.top || 0),
                        oldLeft = parseInt(boxPanelStyle.left || 0);
                    // 给IE6 fixed 提供一个"不抖动的环境"
                    // 只需要 html 与 body 标签其一使用背景静止定位即可让IE6下滚动条拖动元素也不会抖动
                    // 注意：IE6如果 body 已经设置了背景图像静止定位后还给 html 标签设置会让 body 设置的背景静止(fixed)失效
                    if (document.body.currentStyle.backgroundAttachment !== 'fixed') {
                        html.style.backgroundImage = 'url(about:blank)';
                        html.style.backgroundAttachment = 'fixed';
                    }
                    boxPanelStyle.setExpression('top', 'eval(' + dom + '.scrollTop + ' + oldTop + ') + "px"');
                    boxPanelStyle.setExpression('left', 'eval(' + dom + '.scrollLeft + ' + oldLeft + ') + "px"');
                } else {
                    s.position = 'fixed';
                }
                boxPanel.setStyle(s);
            }

            boxIfm.setStyle({
                width: boxPanel.width() + 'px',
                height: (boxPanel.height()-1) + 'px'
            });
        }

        function insertFirst(container, attrs) {
            return J.create('div', attrs || {}).insertFirstTo(container);
        }

        function appendTo(container, type, tagName) {
            return J.create(tagName || 'div', {'class': tpl + '_' + type}).appendTo(container);
        }

        // public

        function close() {
            timer && clearTimeout(timer);
            boxClose && boxClose.un('click');
            boxPanel.remove();
            (opts.modal && boxModal) && boxModal.removeClass('panel_modal_mask').hide();
            opts.onClose && opts.onClose();
        }

        function setContent(content, width, height) {
            boxContent.html(content);
            fixPosition(width, height);
        }

        function setTitle(content) {
            boxTitle.html(content)
        }

        function setOptions(newOpts) {
            opts = J.mix(opts, newOpts || {});
        }

        function setOkDisable(boolDisable){
            boolDisable ? okBt.addClass(tpl + '_ok_disable') : okBt.removeClass(tpl + '_ok_disable');
            okDisable = boolDisable;
        }

        m = {
            close: close,
            setTitle: setTitle,
            setContent: setContent,
            setAutoClose: setAutoClose,
            setOptions: setOptions,
            setOkDisable: setOkDisable,
            removeFooter:removeFooter
        }

        return m;

    }

    J.ui.panel = Panel;

})(J);/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: ui/autocomplete.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/10/11
 *
 */

/// require('ui.ui');
/// require('string.trim');

/**
 * @namespace J.ui.autocomplete
 *
 * @require dom.dom, event.on, event.un
 *
 *
 */
(function (J, D) {

    /**
     * 缺省的选项配置
     * @type {Object}
     */
    var defaultOpts = {
        url:'/',
        dataKey:'',
        filterHtml: true,
        autoSubmit: true,
        forceClear:false,
        defer: 100,
        width: 0,
        allowEmpty:false,//是否允许空值触发ａｊａｘ
        params: {},
        source: null,
        offset:{
            x:0,
            y:-1
        },
        offsetTarget:null, //偏移量目标元数，可以是回调函数 | ID
        boxTarget:null, //搜索结果在目标元数内呈现，可以是回调函数 | ID
        query: '',
        placeholder:'',
        toggleClass:'',
        cache:true,
        onForceClear:null,
        onItemClick:null,
        onResult:null,
        onChange:null,
        onSelect:null,
        onFoucs:null,
        onKeyPress:null,
        onBlur:null,
        onKeyUp:null,
        dataMap:null, // {id:'k', name:'v}
        itemBuild:null,
        tpl:'autocomplete_def'
    };

    /**
     * Auto Complete Function
     * @param el 需要绑定的输入框
     * @param options 扩展选项
     * @constructor
     */
    function Autocomplete(el, options) {
        var disabled = false, el = J.g(el), targetEl, equaled = -1, selectedIndex = -1, currentValue = el.val().trim(), CACHED = [], DATA = [], opts, aId, isShow = false, divs,
            mainContainer, container, valueChangeTimer = null, ignoreValueChange = false, intervalTimer = null,isFocusSupport=false,sendedStr='',skipedNum=0;
        (function(){
            el.attr('autocomplete', 'off');
            opts = J.mix(defaultOpts, options || {}, true);
            aId = 'Autocomplete_' + getId();
            targetEl = opts.offsetTarget ? J.isFunction(opts.offsetTarget) ? opts.offsetTarget() : J.g(opts.offsetTarget) : el;
            opts.width || (opts.width = targetEl.width()-2);
            opts.query = (opts.query || el.attr('name') || 'q');
            if(currentValue === '' && opts.placeholder){
                el.val(opts.placeholder);
                opts.toggleClass && el.removeClass(opts.toggleClass);
            }
            buildMain();
            bindEvent();
        })();

        function setPlaceholder(value){
            opts.placeholder = value
        }

        function getId(){
            return Math.floor(Math.random() * 0x1000000).toString(16);
        }

        function buildMain(){
            var boxTarget;
            mainContainer = J.create('div', {style:'position:absolute;z-index:10100'}).html('<div class="'+opts.tpl+'" id="' + aId + '" style="display:none; width:'+opts.width+'px"></div>');
            if(opts.boxTarget){
                if(J.isFunction(opts.boxTarget) && (boxTarget = opts.boxTarget())){
                    boxTarget.append(mainContainer);
                }else{
                    (boxTarget = J.g(opts.boxTarget)) ? boxTarget.append(mainContainer) : bodyInsert();
                }
            }else{
                bodyInsert()
            }

            function bodyInsert(){
                J.g('body').first().insertBefore(mainContainer)
            }
            container = J.g(aId);
        }

        function fixPosition() {
            var offset = targetEl.offset();
            mainContainer.setStyle({ top: (offset.y + el.height() + opts.offset.y) + 'px', left: (offset.x + opts.offset.x) + 'px' });
        }

        function bindEvent(){
            J.on(el, J.ua.opera ? 'keypress' : 'keydown', KeyPress);
            J.on(el, 'keyup', keyup);
            J.on(el, 'blur', blur);
            J.on(el, 'focus', focus);
            J.on(el, 'click', function(e){
                e&& e.stop();
            });
            J.on(window, 'resize', fixPosition);

        }

        function KeyPress(e){
            if (disabled) { return; }
            (opts.onKeyPress) && opts.onKeyPress(el);
            switch (e.keyCode) {
                case 27: //KEY_ESC:
                    el.val(currentValue.trim());
                    hide();
                    break;
                case 9: //KEY_TAB:
                case 13: //KEY_RETURN:
                    if (selectedIndex === -1) {
                        hide();
                        return;
                    }
                    select(null, selectedIndex);
                    break;
                case 38: //KEY_UP:
                    moveUp();
                    break;
                case 40: //KEY_DOWN:
                    moveDown();
                    break;
                default:
                    ignoreValueChange = false;
                    return;
            }
            e.preventDefault();
        }

        function keyup(e){
            if (disabled) return;
            (opts.onKeyUp) && opts.onKeyUp(el);
            switch (e.keyCode) {
                case 38: //KEY_UP:
                case 40: //KEY_DOWN:
                case 13: //KEY_RETURN:
                case 27: //KEY_ESC:
                    return;
            }
            if(ignoreValueChange) return;
            if(!el.val().trim()&&!opts.allowEmpty) hide();
            clearTimeout(valueChangeTimer);
            !isFocusSupport &&el.val().trim()&&(valueChangeTimer = setTimeout( valueChange, opts.defer));
        }

        function blur(e){
            clearTimeout(valueChangeTimer);
            clearInterval(intervalTimer);
            (opts.onBlur) && opts.onBlur(e);
            J.on(D,'click',function(){
                isFocusSupport = false;
                if(opts.forceClear){
                    if(equaled == -1) {
                        el.val('');
                        opts.onForceClear && opts.onForceClear(el);
                    }
                    else onSelect(equaled);
                }
                hide();
                J.un(D, 'click', arguments.callee);
            });
            if(opts.placeholder && el.val().trim() === ''){
                opts.toggleClass && el.removeClass(opts.toggleClass);
                el.val(opts.placeholder);
            }
            currentValue = el.val();
        }
        //mark onchange
        function focus(){
            isFocusSupport = true;
            if (disabled) { return; }
            (opts.onFocus) && opts.onFocus(el);
            if (opts.placeholder == el.val().trim()){
                el.val('');
                opts.toggleClass && el.addClass(opts.toggleClass);
            }
            isFocusSupport && (intervalTimer = setInterval(function(){
                if(currentValue != (el.val().trim()) && !ignoreValueChange){
                    valueChange();}
            },30));
        }

        function valueChange(){
            if (disabled || ignoreValueChange) {
                ignoreValueChange = false;
                return;
            }
            currentValue = el.val().trim();
            selectedIndex = -1;
            onChange(selectedIndex);
            getData();
        }
        function getCacheKey(){
            return encodeURIComponent(currentValue.trim());
        }

        function getData(){
            sendedStr= opts.params[opts.query] = currentValue.trim();
            var a;
           // hide();
            if(opts.cache && (a = CACHED[getCacheKey()])) return suggest(a,'c');
            if(opts.source){
                if(J.isFunction(opts.source)) opts.source(opts.params, suggest);
                else suggest(opts.source);
                return;
            }
            J.get({
                url:opts.url,
                type:'json',
                data:opts.params,
                onSuccess:suggest
            });
        }
        function buildData(a){
            var dataArr = [];
            if(J.isString(a)) return dataArr;
            J.each(a, function(i, v){
                dataArr.push(buildItem(i,v));
            });
            return dataArr;
        }

        function buildItem(k, v){
            var ret = {};
            if(J.isString(v)){
                return { k:k,v:v,l:v};
            }else{
                ret = opts.dataMap ? opts.dataMap(v) : v;
                ret.v || (ret.v = getFirstValue(v));
                ret.k || (ret.k = ret.v);
                ret.l || (ret.l = ret.v);
            }
            return ret;
        }

        function suggest(a, cached){
            var div, t, val, elVal = el.val();
            equaled = -1;
            if(cached){
                DATA = a
            }else{
                // 兼容 jQuery autocomplete 数据格式
                a = opts.dataKey && a[opts.dataKey] || a.data || a;
                DATA = buildData(a);
            }
            (opts.onResult) && opts.onResult(el, DATA);

            if (!DATA || DATA.length === 0) {
                hide();
                return;
            }

            cached || (CACHED[getCacheKey()] = DATA);
            container.s("div").each(function(k,v){
                v.un();
            })
            container.empty();

            J.each(DATA, function(i, v){
                var buildItem = opts.itemBuild(v);//ｉｔｅｍ build出来的数据;
                var isSkip = !!buildItem.isSkip;

                cached || (opts.itemBuild && J.mix( v, buildItem || {} ) );
                t = opts.filterHtml ? getValue(v.v) : v.v;
                if(t == elVal) equaled = i;
                if(isSkip){
                    skipedNum++;
                    v.l && (div = J.create('p', {"class": 'ui_item'}).html(v.l).appendTo(container).on('click',function(e){
                        e&& e.stop();
                    }));
                    delete DATA[i];
                }else{
                    i = i -skipedNum;
                    v.l && (div = J.create('div', {"class": selectedIndex === i ? 'ui_item ui_sel':'ui_item', title:t}).html(v.l).appendTo(container)).on('mouseover', activate, i).on('click', function(e, i){
                        if(opts.onItemClick && opts.onItemClick(i, v, div) === false){
                            return
                        }
                        select(e, i);
                    }, i, true, true);
                }
            });
            skipedNum =0;
            J.each(DATA,function(k,v){
                !v&&DATA.splice(k,1);
            });
            show();
            divs = container.s('div');
        }

        function getFirstValue(values){
            var firstValue;
            J.each(values, function(i, v){
                firstValue = v;
                return false;
            });
            return firstValue;
        }


        function activate(e, selIndex){
            divs.each(function(i, div){
                div.removeClass('ui_sel')
            });
            this.className = "ui_item ui_sel";
//            divs.eq(selectedIndex = selIndex).addClass('ui_sel');
        }

        function select(e, selIndex){
            e && e.stop();
            equaled = selIndex;
            var form, item;
            ignoreValueChange = true;
            if(!J.isUndefined(selIndex)){
                item = DATA[selIndex];
                J.mix( item, onSelect(selIndex) || {} );
                el.val( currentValue = ( opts.filterHtml ? getValue(item.v) : item.v) );
            }
            hide();
            if(opts.autoSubmit && (form = el.up('form'))){
                if (opts.placeholder == el.val().trim()){
                    el.val('');
                }
                form && form.get().submit();
            }
        }

        function getValue(v){
            return v ? v.trim().replace(/<\/?[^>]*>/g,'') : '';
        }

        function moveUp(){
            if(!isShow){
                return;
            }
            if (selectedIndex <= 0){
                divs.eq(selectedIndex).removeClass("ui_sel");
                selectedIndex = divs.length;
                el.val(sendedStr);
                return;
            };
            var div;
            ignoreValueChange = true;
            divs.each(function(i, div){
                div.removeClass('ui_sel')
            });
            el.val( currentValue = getValue((div = divs.eq(--selectedIndex).addClass('ui_sel')).html()) );
            onChange(selectedIndex);
        }

        function moveDown(){
            if(!isShow){
                return
            }
            if (selectedIndex === divs.length-1){
                divs.eq(selectedIndex).removeClass("ui_sel");
                selectedIndex = -1;
                el.val(sendedStr);
                return;
            }
            var div;
            ignoreValueChange = true;
            divs.each(function(i, div){
                if(div.hasClass('ui_sel')){
                    div.removeClass('ui_sel')
                    return false;
                }

            });
            el.val( currentValue = getValue((div = divs.eq(++selectedIndex).addClass('ui_sel')).html()) );
            onChange(selectedIndex);
        }

        function onChange(selIndex){
            (opts.onChange && selIndex != -1) && opts.onChange(DATA[selIndex]);
        }

        function onSelect(selIndex){
            return (opts.onSelect && selIndex != -1) && opts.onSelect(DATA[selIndex]);
        }

        function show(){
            selectedIndex = -1;
            isShow || (container.show(),isShow = true);
            fixPosition();
        }

        function hide(){
            selectedIndex = -1;
            ignoreValueChange = false;
            isShow && (container.empty().hide(),isShow = false);
        }

        function enable(){
            disabled = false;
        }

        function disable(){
            disabled = true;
        }

        function setParams(params, rewrite){
            opts.params = (!rewrite) ? J.mix(opts.params, params, true) : params;
        }

        return {
            setParams:setParams,
            setPlaceholder:setPlaceholder,
            enable:enable,
            disable:disable,
            hide:hide,
            show:show
        };
    }
    J.dom.fn.autocomplete = function(options){
        return new Autocomplete(this.get(), options)
    };
    J.ui.autocomplete = Autocomplete;
})(J, document);/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: ui/exposure.js
 * @author: Lunjiang
 * @version: 1.0.0
 * @date: 2013/09/08
 *
 */

/// require('ui.ui');
/// require('page');
(function (J) {
    /**
     * 缺省的选项配置
     * @type {Object}
     */
    var defaultOpts = {
        trackTag:"data-trace",
        trackType:'',
        pageName:null,
        site:null,
        autoStart:true//是否页面加载全局搜索A
    }, data = 0;

    /**
     * Panel Function
     * @param options 扩展选项
     * @constructor
     */
    function Exposure(options) {
        var opts,disPatch,tasker,traceTag,page = J.page,tracker;
        (function(){
            opts = J.mix(defaultOpts, options || {},true);
            traceTag = opts.trackTag;
            tracker = new J.logger.Tracker(opts.site, opts.pageName);
            opts.trackType && tracker.setSendType(opts.trackType);
            tasker = new Tasker(opts);
            disPatch =  new Dispatch();
        })();
        function Dispatch() {
            var timer = null,cache=[],botY,topY,pageW,pageH,delay = 50,Ret={};
            function init(){
               resize();
               opts.autoStart&&add(J.s("a"));
               eventBind();
            }
            function eventBind(){
                J.ready(taskAdd);
                J.on(window,"scroll",taskAdd);
                J.on(window,"resize",resize);
            }

            /**
             *
             * @param doms
             */
            function add(doms){
                (doms&&doms.length)&&(doms.each(function(k,v){
                    v&&v.attr(traceTag)&&(function(){
                            var tmpY = v.offset().y;
                            cache.push({elm:v,trace: v.attr(traceTag)})
                            v.attr("pos",v.offset().y)
                    })();
                }),taskAdd());
            }
            function remove(dom){
                dom && J.each(dom, function(i, v){
                    (cache[i].elm.get() == dom.get()) && (cache.splice(i,1));
                });
            }
            function taskAdd(){
                timer&&clearTimeout(timer);
                timer=setTimeout(function(){
                    topY = page.scrollTop(),botY=topY+ pageH;
                    var ret= [];
                    for(var i in cache){
                        var tmp = cache[i];
                        if(!tmp.elm){
                            delete cache[i];
                            continue;
                        }
                        var offsetY =  tmp.elm.offset().y;
                        if(tmp && (offsetY>topY && offsetY < botY)){
                            ret.push(tmp.trace);
                            delete cache[i];
                        }
                    }
                    if(!ret.length){
                        return;
                    }
                    tasker.add(ret);
                },delay);
            }
            function resize(){
                pageW = J.page.viewWidth();
                pageH = J.page.viewHeight();
            }
            return {
                add:add,
                remove:remove,
                init:init
            }
        }

        function Tasker(options) {
            var timer = null,delay = 1000,Ret={},WAITEDDATA= [];
            
            (function(){
                J.on(window,'beforeunload',function(){
                    sendData()
                });
            })();

            function setData(items) {
                for (var key in items) {
                    /^\d+$/.test(items[key]) && (Ret[key] || (Ret[key] = []), Ret[key].push(items[key]))
                }
            }
            function buildData(){
                var data = eval('([' + WAITEDDATA.join(',') + '])');
                var l = data.length;
                while (l--) {
                    setData(data[l]);
                }
                var U = [];
                for (var item in Ret) {
                    U.push('"' + item + '":[' + Ret[item].join(',') + ']')
                }
                Ret = {};
                WAITEDDATA = [];
                //return U;
                return  '{"exposure":' + '{' + U.join(",") + '}'+ '}';
            }
            function add(data){
                WAITEDDATA=WAITEDDATA.concat(data)
                timer&&clearTimeout(timer);
                timer= setTimeout(sendData,delay);
            }
            function sendData(){
                if(WAITEDDATA.length){
                    tracker.setCustomParam(buildData());
                    tracker.track();
                }
            }
            return {
                add:add
            }
        }
        var ret ={
            add:disPatch.add,
            remove:disPatch.remove,
            start:disPatch.init
        };
        return J.mix(ret,tracker);
    }
    J.ui.exposure = Exposure;
})(J);
/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 *
 * 这是cookie核心文件，
 *
 *
 * @path: cookie/cookie.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/02/10
 *
 */

(function(J){
    var D = document,
        millisecond = 24 * 60 * 60 * 1000,
        encode = encodeURIComponent,
        decode = decodeURIComponent;

    /**
     * 验证字符串是否合法的cookie值
     *
     * @param {String} val cookie值
     * @return {Boolean} 是否合法的cookie值
     */
    function validString(val){
        return J.isString(val) && '' !== val;
    }

    /**
     * 设置cookie
     *
     * @param {String} name cookie名称
     * @param {String} value cookie值
     * @param {String} date cookie过期时间
     * @param {String} path cookie path
     * @param {String} domain cookie domain
     * @param {String} secure cookie secure
     * @return null
     */
    function setCookie(name, value, date, domain, path, secure){
        D.cookie = decode(name) + "=" + String(encode( value )) +
                ((date) ? ";expires=" + date.toGMTString() : "") +
                ";path=" + (validString(path) ? path : "/") +
                (validString(domain) ? ";domain=" + domain : "" ) +
                ((secure) ? ";secure" : "" );
    }

    var cookie = {
        /**
         * 获取cookie值
         *
         * @param {String} name cookie名称
         * @return {String} cookie值
         */
        getCookie: function (name) {
            var ret = null, m, result;
            if (validString(name)) {
                m = new RegExp("(?:^|)" + decode(name) + "=([^;]*)(?:;|$)",'ig');
                while((result = m.exec(D.cookie)) != null){
                    ret = decode(result[1])||null;
                }
            }
            return ret;
        },
        /**
         * 设置cookie
         *
         * @param {String} name cookie名称
         * @param {String} value cookie值
         * @param {String} expires cookie过期时间 （单位天）
         * @param {String} path cookie path
         * @param {String} domain cookie domain
         * @param {String} secure cookie secure
         * @return null
         */
        setCookie: function(name, value, expires, domain, path, secure) {
            var date = '';
            if (expires) {
                date = new Date();
                date.setTime(date.getTime() + expires * millisecond);
            }
            setCookie(name, value, date, domain, path, secure)
        },
        /**
         * 删除cookie
         *
         * @param {String} name cookie名称
         * @return null
         */
        rmCookie: function(name, domain, path, secure){
            if ( cookie.getCookie( name ) ) D.cookie = decode(name) + "=" +
                ";path=" + (validString(path) ? path : "/") +
                ( ( domain ) ? ";domain=" + domain : "" ) +
                ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
        }
    };

    J.add('cookie', cookie);

    J.mix(J, cookie);

})(J);

/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: utils/utils.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/11/15
 *
 */


J.add('utils');/**
 * Aifang Javascript Framework.
 * Copyright 2012 ANJUKE Inc. All rights reserved.
 *
 * @path: utils/base.js
 * @author: Jock
 * @version: 1.0.0
 * @date: 2012/11/15
 *
 */

/// require('utils.utils');

(function () {

    // private method for UTF-8 decoding
    function utf8_decode(utftext) {
        var string = "", i = 0, c ,c1, c2, c3, s = S;

        while ( i < utftext.length ) {
            c = utftext.charCodeAt(i);
            if (c < 128) {
                string += S.fromCharCode(c);
                i++;
            }
            else if((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i+1);
                string += S.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = utftext.charCodeAt(i+1);
                c3 = utftext.charCodeAt(i+2);
                string += S.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }

        return string;
    }

    // private method for UTF-8 encoding
    function utf8_encode(string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += S.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utftext += S.fromCharCode((c >> 6) | 192);
                utftext += S.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += S.fromCharCode((c >> 12) | 224);
                utftext += S.fromCharCode(((c >> 6) & 63) | 128);
                utftext += S.fromCharCode((c & 63) | 128);
            }

        }

        return utftext;
    }

    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", S = String;

    J.utils.base = {

        // public method for encoding
        encode : function (input) {
            var output = "";
            var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
            var i = 0;

            input = utf8_encode(input);

            while (i < input.length) {

                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }

                output = output +
                keyStr.charAt(enc1) + keyStr.charAt(enc2) +
                keyStr.charAt(enc3) + keyStr.charAt(enc4);

            }

            return output;
        },

        // public method for decoding
        decode : function (input) {
            var output = "";
            var chr1, chr2, chr3;
            var enc1, enc2, enc3, enc4;
            var i = 0;

            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            while (i < input.length) {

                enc1 = keyStr.indexOf(input.charAt(i++));
                enc2 = keyStr.indexOf(input.charAt(i++));
                enc3 = keyStr.indexOf(input.charAt(i++));
                enc4 = keyStr.indexOf(input.charAt(i++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + S.fromCharCode(chr1);

                if (enc3 != 64) {
                    output = output + S.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + S.fromCharCode(chr3);
                }

            }

            output = utf8_decode(output);

            return output;

        }
    };

})();