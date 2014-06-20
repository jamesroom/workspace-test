function (subwayLineName){
    var busline = new BMap.BusLineSearch(this._map,{
        renderOptions:{
            map:this._map
        },
        onGetBusListComplete: function(result){
            if(result) {
                var fstLine = result.getBusListItem(0);//获取第一个公交列表显示到map上
                busline.getBusLine(fstLine);
            }
        }
    });
    setTimeout(function(){
        busline.getBusList(subwayLineName);
    },10);
    this._busLine = busline;
}