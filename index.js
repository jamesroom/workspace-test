(function(context){
    var defaultOpts = {
        rowSelector: "li",
        submenuSelector: "*",
        submenuDirection: "right",
        tolerance: 75,  // bigger = more forgivey when entering submenu
        enter: function(){},
        exit: function(){},
        activate: function(){},
        deactivate: function(){},
        exitMenu: function(){}
    }
    var menu = function(elm,options){
        console.log(options);
        var opts = J.mix(defaultOpts, options || {});
        var points=[],timeoutId=0,DELAY=1000,activeElm=null,lastDelayElm= null,prevLoc=null,lastDelayLoc = null;
        (function(){
            J.on(document,'mousemove',mouseMoveDocument);
            J.on(elm,'mouseleave',mouseLeaveMenu);
            elm.s(defaultOpts.rowSelector).each(function(k,v){
                J.on(v,"mouseenter",mouseEnterRow);
                J.on(v,"mouseleave",mouseLeaveRow);
                J.on(v,"click",activeRow);
            });
        })();
        function mouseMoveDocument(e){
            points.push(points.length>1&&points.shift()&&false||{x: e.pageX,y: e.pageY});
        }
        function mouseLeaveMenu(){
           timeoutId&& clearTimeout(timeoutId)&&opts.exitMenu.call(this)&&!!activeElm&&opts.deactivate(activeElm)
            activeElm = null;
        }
        function mouseEnterRow(){
            (timeoutId&&clearTimeout(timeoutId))
            opts.enter.call(this);
            possiblyActivate(this);
        }
        function possiblyActivate(row){
            var intervalTime = getTimeOut();
            console.log("dely",intervalTime)
            if(intervalTime){
                timeoutId = setTimeout(function(){possiblyActivate(row)},DELAY);
                return;
            }
            activeRow(row);
        }
        function mouseLeaveRow(){
            opts.exit(this);
        }
        function activeRow(row){
            if (row == activeElm) {
                return;
            }
            if (activeElm) {
                opts.deactivate(activeRow);
            }
            opts.active(row);
            activeElm = row;
        }
        function getTimeOut(){
            if (!activeElm) {
                return 0;
            }
            var offset = elm.offset(),
                upperLeft = {
                    x: offset.left,
                    y: offset.top
                },
                upperRight = {
                    x: offset.left + elm.width(),
                    y: upperLeft.y
                },
                lowerLeft = {
                    x: offset.left,
                    y: offset.top + elm.height()
                },
                lowerRight = {
                    x: offset.left +elm.width(),
                    y: lowerLeft.y
                },
                loc = points[points.length - 1],
                prevLoc = points[0];
             if (!loc) {

                return 0;
            }
            if (!prevLoc) {
                prevLoc = loc;
            }
            if (prevLoc.x < offset.left || prevLoc.x > lowerRight.x ||
                prevLoc.y < offset.top || prevLoc.y > lowerRight.y) {
                // If the previous mouse location was outside of the entire
                // menu's bounds, immediately activate.

                return 0;
            }

            if (lastDelayLoc &&
                loc.x == lastDelayLoc.x && loc.y == lastDelayLoc.y) {
                console.log("alway here")
                return 0;
            }
            function slope(a, b) {
                return (b.y - a.y) / (b.x - a.x);
            };
            console.log("alway here")
            var decreasingCorner = upperRight,
                increasingCorner = lowerRight;
            var decreasingSlope = slope(loc, decreasingCorner),
                increasingSlope = slope(loc, increasingCorner),
                prevDecreasingSlope = slope(prevLoc, decreasingCorner),
                prevIncreasingSlope = slope(prevLoc, increasingCorner);

            if (decreasingSlope < prevDecreasingSlope &&
                increasingSlope > prevIncreasingSlope) {
                    lastDelayLoc = loc;
                return DELAY;
            }
            lastDelayLoc = null;
            return 0;
        }
    }
    J.dom.fn.menu = function(options){
        return new menu(J.g("menu"), {active:function(elm){
         elm.lastElementChild.style.display="block";
        },deactivate:function(elm){
            elm.lastElementChild.style.display="none";
        }})
    };

})(window);
J.g("menu").menu();