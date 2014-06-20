<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
<html lang="en">
<head>
 <meta http-equiv="Content-Type" content="text/html;charset=UTF-8">
    <title>瀑布流</title>
    <style type="text/css">

        *{
            margin:0;
            padding:0;
        }
        h1{
            text-align:center;
            height:100px;
        }
        body{
            background-color:RGB(232,231,226);
        }
        .all{
            margin:0 auto;
            width:1000px;
        }
        .number{
            float:left;
            width:225px;
        }
        .content
        {
            margin:5px;
            background-color:white;
        }
        img{
            margin:5px;
        }
        .loading{
            width:100%;
            height:60px;
            background-color:red;
         position: absolute;
         text-align:center;
         padding-top:10px;
        }
    </style>
    <script type="text/javascript">
        window.onload=function(){
            function getOs()
            {
               var OsObject = "";
               if(navigator.userAgent.indexOf("MSIE")>0) {
                    return "MSIE";
               }
               if(isFirefox=navigator.userAgent.indexOf("Firefox")>0){
                    return "Firefox";
               }
               if(isSafari=navigator.userAgent.indexOf("Safari")>0) {
                    return "Safari";
               }
               if(isCamino=navigator.userAgent.indexOf("Camino")>0){
                    return "Camino";
               }
               if(isMozilla=navigator.userAgent.indexOf("Gecko/")>0){
                    return "Gecko";
               }

            }
            //数据源
            var imgArray=[];//img数组 也就是数据来源
            var textArray=[];//img底下的文字和img对应

            //初始参数
            var reset=0;//某些滚动条会触发三次scroll事件 用这个解决
            var begin=0;//初始加载不执行某些东西
            var surplusHeight=800;//差值
            var imgWidth="206px";//img的宽度
            var imgHeight=0;//img的高度
            var textHeight=0;//文字高度
            var defaultDivAll=document.getElementById("all");//大div
            var defaultH1All=document.getElementById("h1");//标题对象
            var div1=document.getElementById("one");
            var div2=document.getElementById("two");
            var div3=document.getElementById("three");
            var div4=document.getElementById("four");
            var im=document.getElementById("im");
            var tex=document.getElementById("tex");
            textArray[0]="小花美女";
            textArray[1]="小花美女小花美女";
            textArray[2]="小花美女小花美女小花美女";
            textArray[3]="小花美女小花美女小花美女小花美女";
            textArray[4]="小花美女   小花美女";
            textArray[5]="小花美女小花小花美女";
            textArray[6]="小花美女";
            textArray[7]="小花美女小花美女";
            textArray[8]="小花美女小花美女小花美女";
            textArray[9]="小花美女小花美女小花美女小花美女小花美女";
            textArray[10]="小花美女小花美女小花美女小花美女小花美女";
            textArray[11]="小花美女小花美女小花美女小花美女小花美女小花美女";
            textArray[12]="小花美女小花美女小花美女小花美女小花美女小花美女小花美女";
            textArray[13]="小花美女小花美女小花美女小花美女小花美女小花美女小花美女小花美女";
            textArray[14]="小花美女小花美女小花美女小花美女小花美女小花美女小花美女小花美女";
            textArray[15]="小花美女小花美女小花美女小花美女小花美女小花美女小花美女小花美女";
            imgArray[0]="http://ww4.sinaimg.cn/mw205/960bda11tw1dnw504ga3vj.jpg";
            imgArray[1]="http://ww1.sinaimg.cn/mw205/771f735ctw1dnw5gv6dmcj.jpg";
            imgArray[2]="http://ww3.sinaimg.cn/mw205/5d5e9605gw1dnw4o6uk3gj.jpg";
            imgArray[3]="http://ww1.sinaimg.cn/mw205/6d9cb0b8jw1dnw5m0y5yrj.jpg";
            imgArray[4]="http://ww2.sinaimg.cn/mw205/62dae985gw1dnzc4mwvm5j.jpg";
            imgArray[5]="http://ww2.sinaimg.cn/mw205/8d95fb4cgw1dnzec2c6cdj.jpg";
            imgArray[6]="http://ww4.sinaimg.cn/mw205/872bccc8jw1dnzch2aqtkj.jpg";
            imgArray[7]="http://ww4.sinaimg.cn/mw205/5b104465tw1dnzdlozp6tj.jpg";
            imgArray[8]="http://ww4.sinaimg.cn/mw205/6de170f6jw1dnzl7jbzidj.jpg";
            imgArray[9]="http://ww2.sinaimg.cn/mw205/6a93dbfbgw1dnzeiu1draj.jpg";
            imgArray[10]="http://ww3.sinaimg.cn/mw205/6ea59a74jw1dnzm0wbf7vj.jpg";
            imgArray[11]="http://ww2.sinaimg.cn/mw205/48bf076ejw1dnzexjhl6dj.jpg";
            imgArray[12]="http://ww4.sinaimg.cn/mw205/6da7993fjw1dnvsnesrutj.jpg";
            imgArray[13]="http://ww2.sinaimg.cn/mw205/75914d3fgw1dnzlgn33njj.jpg";
            imgArray[14]="http://ww1.sinaimg.cn/mw205/6a8dea72gw1dnzlwnfju0j.jpg";
            imgArray[15]="http://ww1.sinaimg.cn/mw205/696387aagw1dnzqd829yyj.jpg";
            //初始化
            doSomeThing();
            //主会场
            window.onscroll=fun_scroll;
            //滚动方法
            function fun_scroll()
            {
                if(reset==0)
                {

                    var topAll=(getOs()=="Firefox")?document.documentElement.scrollHeight:document.body.scrollHeight;//body的高度
                    var top_top=document.body.scrollTop||document.documentElement.scrollTop;//卷上去的高度
                    var result=topAll-top_top;
                    if(result<surplusHeight)
                    {
                        setTimeout(doSomeThing,1000);
                        reset=1;
                    }
                }else
                {
                    setTimeout(function(){reset=0;},1000);
                }
            }
             //做一些事情
            function doSomeThing()
            {
                var length=4;
                var numArray=[0,0,0,0];
                for(var i=0;i<length;i++)
                {
                    div1.appendChild(addDiv());
                    numArray[0]+=imgHeight+10+textHeight;
                    div2.appendChild(addDiv());
                    numArray[1]+=imgHeight+10+textHeight;
                    div3.appendChild(addDiv());
                    numArray[2]+=imgHeight+10+textHeight;
                    div4.appendChild(addDiv());
                    numArray[3]+=imgHeight+10+textHeight;
                }
                //排序得到数组最小值
                numArray.sort();

                //首次加载不执行
                if(begin>0)
                    defaultDivAll.style.height=defaultDivAll.offsetHeight+numArray[0]+"px";

                var hh=(getOs()=="Firefox")?document.documentElement.scrollHeight:document.body.scrollHeight;
                document.getElementById("loading").style.top=hh+"px";
                begin=1;
            }

            //包含img的div
            function addDiv()
            {
                //数组下标的随机值
                var ran=Math.round(Math.random()*(imgArray.length-1));
                //title层
                var small_div=document.createElement("div");
                small_div.innerHTML=textArray[ran];
                //内部img
                var img=document.createElement("img");
                img.alt="";
                img.src=imgArray[ran];
                img.style.width=imgWidth;
                //img高度
                im.style.display="block";
                im.src=imgArray[ran];
                imgHeight=im.height;
                im.style.display="none";
                //text高度
                tex.style.display="block";
                tex.innerHTML=textArray[ran];
                textHeight=tex.offsetHeight;
                tex.style.display="none";
                //包含img的层
                var div=document.createElement("div");
                div.className="content";
                div.appendChild(img);
                div.appendChild(small_div);
                return div;
            }


        }
    </script>
</head>
<body>
    <img id="im"  alt="" src="http://ww1.sinaimg.cn/mw205/696387aagw1dnzqd829yyj.jpg"/>
    <div id="tex"></div>
    <h1 id="h1">I like TRY</h1>
    <div id="all"  class="all">
        <div id="one" class="number">
        </div>
        <div id="two" class="number">
        </div>
        <div  id="three"  class="number">
        </div>
         <div id="four" class="number">
        </div>
    </div>
    <div id="loading" class="loading">
        加载中...
    </div>
</body>
</html>