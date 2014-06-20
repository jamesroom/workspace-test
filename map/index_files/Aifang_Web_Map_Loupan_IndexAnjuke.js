var APF = {
    log: function(v) {
        if (typeof console != 'undefined' && typeof console.log == 'function') {
            console.log(v);
        }
    }
};

APF.Namespace = {
    register: function(ns){
        var nsParts = ns.split(".");
        var root = window;
        for (var i = 0; i < nsParts.length; i++) {
            if (typeof root[nsParts[i]] == "undefined") {
                root[nsParts[i]] = new Object();
            }
            root = root[nsParts[i]];
        }
    }
}

APF.Utils = {
    getWindowSize: function() {
        var myWidth = 0, myHeight = 0;
            if( typeof( window.innerWidth ) == 'number' ) {
            //Non-IE
            myWidth = window.innerWidth;
            myHeight = window.innerHeight;
        } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
            //IE 6+ in 'standards compliant mode'
            myWidth = document.documentElement.clientWidth;
            myHeight = document.documentElement.clientHeight;
        } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
            //IE 4 compatible
            myWidth = document.body.clientWidth;
            myHeight = document.body.clientHeight;
        }
        return {
            width: myWidth,
            height: myHeight
        };
    },

    getScroll: function() {
        var scrOfX = 0, scrOfY = 0;
        if( typeof( window.pageYOffset ) == 'number' ) {
            //Netscape compliant
            scrOfY = window.pageYOffset;
            scrOfX = window.pageXOffset;
        } else if( document.body && ( document.body.scrollLeft || document.body.scrollTop ) ) {
            //DOM compliant
            scrOfY = document.body.scrollTop;
            scrOfX = document.body.scrollLeft;
        } else if( document.documentElement && ( document.documentElement.scrollLeft || document.documentElement.scrollTop ) ) {
            //IE6 standards compliant mode
            scrOfY = document.documentElement.scrollTop;
            scrOfX = document.documentElement.scrollLeft;
        }
        return {
            left: scrOfX,
            top: scrOfY
        };
    },

    // http://techpatterns.com/downloads/javascript_cookies.php
    setCookie: function(name, value, expires, path, domain, secure) {
        // set time, it's in milliseconds
        var today = new Date();
        today.setTime(today.getTime());
        /*
            if the expires variable is set, make the correct
            expires time, the current script below will set
            it for x number of days, to make it for hours,
            delete * 24, for minutes, delete * 60 * 24
        */
        if (expires) {
            expires = expires * 1000 * 60 * 60 * 24;
        }
        var expires_date = new Date(today.getTime() + (expires));

        document.cookie = name + "=" +escape(value) +
            ((expires) ? ";expires=" + expires_date.toGMTString() : "") +
            ((path) ? ";path=" + path : "") +
            ((domain) ? ";domain=" + domain : "" ) +
            ((secure) ? ";secure" : "" );
    },

    // this fixes an issue with the old method, ambiguous values
    // with this test document.cookie.indexOf( name + "=" );
    getCookie: function(check_name) {
        // first we'll split this cookie up into name/value pairs
        // note: document.cookie only returns name=value, not the other components
        var a_all_cookies = document.cookie.split( ';' );
        var a_temp_cookie = '';
        var cookie_name = '';
        var cookie_value = '';
        var b_cookie_found = false; // set boolean t/f default f

        for (i = 0; i < a_all_cookies.length; i++) {
            // now we'll split apart each name=value pair
            a_temp_cookie = a_all_cookies[i].split( '=' );
            // and trim left/right whitespace while we're at it
            cookie_name = a_temp_cookie[0].replace(/^\s+|\s+$/g, '');

            // if the extracted name matches passed check_name
            if (cookie_name == check_name) {
                b_cookie_found = true;
                // we need to handle case where cookie has no value but exists (no = sign, that is):
                if (a_temp_cookie.length > 1) {
                    cookie_value = decodeURIComponent(a_temp_cookie[1].replace(/^\s+|\s+$/g, ''));
                }
                // note that in cases where cookie is initialized but no value, null is returned
                return cookie_value;
                break;
            }
            a_temp_cookie = null;
            cookie_name = '';
        }
        if (!b_cookie_found) {
            return null;
        }
    },

    // this deletes the cookie when called
    deleteCookie: function(name, path, domain) {
        if (this.getCookie(name)) {
            document.cookie = name + "=" +
            ((path) ? ";path=" + path : "") +
            ((domain) ? ";domain=" + domain : "") + ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
        }
    },

    setScrollTop: function (n){
        if (document.body) {
            document.body.scrollTop = n;
            if(document.body.scrollTop == 0){
                if (document.documentElement) document.documentElement.scrollTop = n;
            }
        }else if (document.documentElement) {
            document.documentElement.scrollTop = n;
        }
    },

    getScrollTop: function (){
        return document.body ? document.body.scrollTop || document.documentElement.scrollTop : document.documentElement.scrollTop;
    },

    /*
    *
    * APF.Utils.gotoScrollTop(e, s); 这个函数可传两个参数
    * e 是滚动条滚动到什么地方(end)的缩写，如果不传默认是 0
    * s 是滚动条滚动的速度 ，参数值是默认滚动速度的倍数，比如想要加快滚动速度为默认2倍，输入2 ，如果想放慢速度
    *   到默认速度的一半，输入 0.5 。 如果不传默认是 1，就是默认速度。
    */
    gotoScrollTop: function (e, s){
        var t = APF.Utils.getScrollTop(), n = 0, c = 0;
        var s = s || 1;
        var e = e || 0;
        var i = t > e ? 1 : 0;
        (function() {
            t = APF.Utils.getScrollTop();
            n = i ? t - e : e - t;
            c = i ? t - n / 15 * s : t + 1 + n / 15 * s ;
            APF.Utils.setScrollTop( c );
            if (n <= 0 || t == APF.Utils.getScrollTop()) return;
            setTimeout(arguments.callee, 10);
        })();
    }
};
APF.Namespace.register('aifang.web.footer');
aifang.web.footer.fold = Class.create({
    initialize: function () {
        $$(".fold").each(function(element,index){
            Event.observe(element, 'click', function(){
                var silbing_n=element.siblings();
                element.style.display="none";
                silbing_n[0].style.display="block";
                if(index==0){
                    $('seo_con').setStyle({'height':'80px'});
                }
                else{
                    $('seo_con').setStyle({'height':'20px'});
                }
            });
        });
    },

    _thend:undefined
});var soj = function(elm,tag){
    var reg=/^http:\/\//;
    var a = (document.getElementById(elm)||document).getElementsByTagName("a"),s,url,u,n,r,i=a.length,tag=tag||'soj';
    while(i--){
        if(null!==a[i].getAttribute(tag)){
            a[i].onclick=function(){
                url=this.href;
                if(!url.match(reg))return;
                if(-1!==url.indexOf("from="))return;
                s=encodeURIComponent(this.getAttribute(tag));
                u=url.split("#");
                if(-1!==url.indexOf("?")){
                    r=u[0]+"&from="+s
                }else{
                    r=u[0]+"?from="+s
                }
                n=u.length;
                if(n>1){
                    for(var j=1;j<n;j++){
                        r+="#"+u[j]
                    }
                }
                this.href=r
            }
        }
    }
};

APF.Namespace.register("aifang.map.louapn");
aifang.map.louapn.Header = Class.create({
    eventBind:function(elm, pelm, overClass){
        var timeOutHandlers = null;
        var showPopInfo = function(t, pelm){
            //APF.log('display')
            if(pelm.innerHTML=="") return;
            if (t === 0) {
                if (overClass)
                    elm.removeClassName(overClass);
                pelm.hide();
            } else {
                if(overClass)
                    elm.addClassName(overClass);
                pelm.show();
            }
        };
        var eventOverHandler = function(){
            //APF.log('Over')
            if(timeOutHandlers){
                clearTimeout(timeOutHandlers);
                timeOutHandlers = null;
            }else{
                showPopInfo(1, pelm);
            }
        };
        var eventOutHandler = function(){
            //APF.log('out')
            timeOutHandlers = setTimeout(function(){
                showPopInfo(0, pelm);
                timeOutHandlers = null
            },100);
        };
        Event.observe(elm,'mouseover',eventOverHandler);
        Event.observe(elm,'mouseout',eventOutHandler);
        Event.observe(pelm,'mouseover',eventOverHandler);
        Event.observe(pelm,'mouseout',eventOutHandler);
    },

    initialize: function() {
        this.timeOutHandlers = null;
        this.jmapHeader = $('jmapHeader');
        this.tip = $('m_tip');
        this.hideTimeout = 600;
        var imgSearch = $('qwhereimg');
        this.txtSearch = $('qwhereinput');
        this.tool_area = $('tool_area');
        this.tool_area_pop = $('tool_area_pop');

        this.eventBind(this.tool_area, this.tool_area_pop,'tool_hover');

        $$('.region_selector a').each(function(a) {
            a.observe("click", function(e) {
                e.stop();
                this.regionFire(a);
            }.bind(this));
        }.bind(this));

        imgSearch.observe("click", function() {
            if(this.txtSearch.value == '输入找房地点或楼盘名'){
                alert('输入找房地点或楼盘名');
                this.txtSearch.focus();
                return;
            }
            this.searchTodo()
        }.bind(this));

        this.txtSearch.observe("keyup", function(e) {
            if (e.keyCode == 13) {
                var kw = this.txtSearch.value;
                if (!kw.blank()) {
                    this.searchTodo()
                }
            }
        }.bind(this));

    },

    regionFire:function(a){
        var pop = a.readAttribute("pop"),
        lat = a.readAttribute("lat"),
        lng = a.readAttribute("lng"),
        zoom = parseInt(a.readAttribute("zoom"));
        this.txtSearch.value = '输入找房地点或楼盘名';
        document.fire("map:region", {"lat":lat, "lng":lng, "zoom":zoom, 'keyword':a.innerHTML});
        //if(pop){
            this.regionChange(a);
        //}
    },

    regionChange:function(a){
        this.tool_area.removeClassName('tool_hover');
        var t = a.innerHTML;
        t == '全部' ? this.tool_area.update('选择区域'):this.tool_area.update(t);
        this.tool_area_pop.hide();
    },

    searchTodo:function(){
        var kw = this.txtSearch.value, url = "/a/map/keyword/?baidu_swlat=1&kw="+kw;
        document.fire("map:search");
        new Ajax.Request(url,{
            "method":"get",
            "onSuccess":function(transport){
                var data = transport.responseJSON, type = data.t, val = data.v;

                if(type === 1){//关键词为楼盘
                    document.fire("map:loupan", val);
                }else if(type===2){//关键词为区域
                    document.fire("map:region", {"lat":val.lat, "lng":val.lng, "zoom":val.zoom, 'keyword':kw});
                }else{//关键词为地标
                    document.fire("map:geo", {"keyword":kw});
                }
            }
        });
    }

});

String.prototype.trim = function() { return this.replace(/(^\s*)|(\s*$)/g, ''); }
/**
 *
 * Online test Api
*/

(function(){
    var BetaObject = BetaObject || {
        DISPLAY_BAR : true,
        IS_DEV : document.location.href.indexOf('.dev.') !== -1,
        show_bete_info : function(){
            var body = document.getElementsByTagName('body')[0];
            var div = document.createElement('div'), html = [];

            div.style.width = '180px';
            div.style.height = '45px';
            div.style.border = '1px solid red';
            div.style.background = '#ff9';
            div.style.position = 'fixed';
            div.style.right = '5px';
            if(Prototype && Prototype.Browser.IE){
                div.style.position = 'absolute';
                (function(){
                    var divID = 'stage_line_' + Math.round(Math.random() * 10000),
                        head = document.getElementsByTagName('head')[0],
                        style = document.createElement('style'),
                        rules = document.createTextNode(
                            'body{background-image:url(about:blank);background-attachment:fixed;} ' +
                            '#' + divID + '{filter:progid:DXImageTransform.Microsoft.dropshadow(OffX=3, OffY=3, Color="gray", Positive=true);  background-image:url(about:blank);overflow:hidden; zoom:1; bottom:auto;margin-bottom:5px;top:expression(eval(document.documentElement.scrollTop+document.documentElement.clientHeight-this.offsetHeight-(parseInt(this.currentStyle.marginTop,10)||0)-(parseInt(this.currentStyle.marginBottom,10)||0)));}');

                    style.type = 'text/css';
                    if(style.styleSheet)
                        style.styleSheet.cssText = rules.nodeValue;
                    else style.appendChild(rules);
                    head.appendChild(style);
                    div.id = divID;
                })();

            }else{
                div.style.bottom = '5px';
            }
            div.style.padding = '8px';
            div.style.lineHeight = '22px';
            div.style.fontSize = '14px';
            div.style.fontFamily = ' \5FAE\8F6F\96C5\9ED1 , \9ED1\4F53';
            div.style.color = 'red';
            div.style.borderRadius = '3px';
            div.style.boxShadow = '0px 0px 16px #333';
            div.style.opacity = '0.7';

            //div.style.fontWeight = '700';
            html.push('<div>★ 当前状态为测试环境 ★</div>');
            html.push('<div><a id="sw_online_standard" href="javascript:;">立即切换到正式环境 &gt;&gt;</a></div>');
            div.innerHTML = html.join('');
            body.appendChild(div);
            Event.observe($('sw_online_standard'), 'click', function(){
                APF.Utils.deleteCookie('beta_auth_token', '/', 'lunjiang.dev.aifang.com');
                window.location = '/';
            });
        }
    };
    Event.observe(window, "load", function(){
        var cookie = APF.Utils.getCookie('beta_auth_token');
        if(BetaObject.DISPLAY_BAR && cookie && !BetaObject.IS_DEV)
            BetaObject.show_bete_info();
    });
})();
/**
*/
APF.Utils.htmlspecialchars_decode = function (str) {
    str = str.replace(/&amp;/g,'&');
    str = str.replace(/&quot;/g,'"');
    str = str.replace(/&#039;/g,"'");
    str = str.replace(/&lt;/g,'<');
    str = str.replace(/&gt;/g,'>');
    return str;
}

APF.Utils.get_sapan_base_url = function (host_id) {
    var base_url = 'http://pic{{host_id}}.ajkimg.com/display/aifang';
    base_url = base_url.replace(/{{host_id}}/,host_id);
    return base_url;
}
