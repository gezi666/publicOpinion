/**
 * Created by yyg on 2017/2/27.
 */
function randomData(str) {
    return Math.round(Math.random()*(str?str:1000));
}
function initMap(data){
    var myChartMap = echarts.init(document.getElementById(data.id));
    var mapJsonName = data.mapJsonName?data.mapJsonName:'mapJson';
    if(data.mapJson){
        echarts.registerMap(mapJsonName,data.mapJson);
    }
    var max = 0;
    for(var i=0;i<data.data.length;i++){
        max = data.data[i].value>max?data.data[i].value:max;
    }
    var option = {
        title: {
            text: data.title,
            left: 'center',
            top:'10',
            textStyle:{
                fontSize: 14,
                color:data.titleColor
            }
        },
        tooltip: {
            trigger: 'item'
        },
        visualMap: {
            show:data.visualMap===false?data.visualMap:true,
            min: 0,
            max: max,
            left: '10%',
            bottom: '5%',
            text: ['高','低'],
            color: data.color,
            textStyle:{
                color:simple?'#333':'#70c1df',
            },
            calculable: true
        },
        series: [
            {
                name: '数量',
                type: 'map',
                mapType: mapJsonName,
                roam: false,
                data:data.data
            }
        ]
    };
    myChartMap.setOption(option);
    return myChartMap;
}

//预警区域散点图公共方法
function initScatter(data){
    var myChartMap = echarts.init(document.getElementById(data.id));
    var max = 0;
    for(var i=0;i<data.data.length;i++){
        max = data.data[i].value>max?data.data[i].value:max;
    }
    var geoCoordMap = data.geoCoord;
    var convertData = function (data) {

        var res = [];
        for (var i = 0; i < data.length; i++) {
            var geoCoord = geoCoordMap[data[i].name];
            if (geoCoord) {
                res.push({
                    name: data[i].name,
                    value: geoCoord.concat(data[i].value)
                });
            }
        }
        return res;
    };

    var option = {
        title: {
            text: data.title,
            x:'center',
            top: '2%',
            textStyle: {
                color: data.titleColor
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: function (params) {
                return params.name + ' : ' + params.value[2];
            }
        },
        //legend: {
        //    orient: 'vertical',
        //    y: 'bottom',
        //    x:'right',
        //    data:['数量'],
        //    textStyle: {
        //        color: '#000'
        //    }
        //},
        visualMap: {
            min: 0,
            max: max,
            left: '10%',
            bottom: '5%',
            calculable: true,
            inRange: {
                color: data.rangeColor
            },
            text: ['高','低'],
            textStyle: {
                color: simple?'#000':'#00c7e2'
            }
        },
        geo: {
            map: data.map,
            roam: true,
            label: {
                emphasis: {
                    show: false
                }
            },
            itemStyle: {
                normal: {
                    areaColor: '#0898D9',
                    borderColor: '#fff'
                },
                emphasis: {
                    areaColor: '#004EA4'
                }
            }
        },
        series: [
            {
                name: '数量',
                type: 'effectScatter',
                //rippleEffect: {
                //    period: 400,
                //    scale: 100,
                //    brushType: 'fill'
                //},
                coordinateSystem: 'geo',
                showEffectOn: 'render',
                rippleEffect: {
                    brushType: 'stroke'
                },
                data: convertData(data.data),
                symbolSize: 10,
                label: {
                    normal: {
                        show: false
                    },
                    emphasis: {
                        show: false
                    }
                },
                itemStyle: {
                    emphasis: {
                        borderColor: '#fff',
                        borderWidth: 1
                    }
                }
            }
        ]
    };
    myChartMap.setOption(option);
    myChartMap.on('click',function(params){
        if(params.componentType==='series'){    //series(点)   geo（地图）
            if(data.menuName){changeMenuTo(data.menuName);}    //切换菜单
            //$('#content').load(data.toUrl);    //点击跳转的页面
            window.location.href = data.toUrl;   //点击跳转的页面
        }
        else{
            return;
        }

    });
}

String.prototype.colorRgb = function(){
    var sColor = this.toLowerCase();
    if(sColor && /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(sColor)){
        if(sColor.length === 4){
            var sColorNew = "#";
            for(var i=1; i<4; i+=1){
                sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));
            }
            sColor = sColorNew;
        }
        //处理六位的颜色值
        var sColorChange = [];
        for(var i=1; i<7; i+=2){
            sColorChange.push(parseInt("0x"+sColor.slice(i,i+2)));
        }
        return "rgba(" + sColorChange.join(",") + ",1)";
    }else{
        return sColor;
    }
};
/***
 * 水球图
 * @param id 饼图的id
 * @param pieCart 饼图的对象
 */
var waterPoloOpt = {legend:true,isMouse:true,isRose:false,labelLine:false,defaultParam:{percent: '0', color: simple?'#3373e6':'#00fffc'}};
function resetOpt(){
    waterPoloOpt = {
        legend:true,//是否需要图例
        isMouse:true,//是否需要鼠标事件
        isRose:false,//是否使用玫瑰图
        labelLine:false,//是否显示指示线及其文字
        defaultParam:{
            percent: '0',//水波显示
            color: simple?'#3373e6':'#00fffc'//水波颜色
        }
    };
}
function waterPolo(id,pieCart){
    var pieDom= document.getElementById(id);
    var dom = pieDom.parentNode;
    dom.style.position = 'relative';
    pieDom.style.position = 'absolute';
    pieDom.style.top = '0px';
    pieDom.style.left = '0px';
    pieDom.style.zIndex = '10';
    $(dom).find('div[name="waterChart"]').remove();
    var chartDom = document.createElement('div');
    chartDom.style.width = pieDom.offsetWidth+'px';
    chartDom.style.height = pieDom.offsetHeight+'px';
    chartDom.setAttribute("name", "waterChart");
    dom.appendChild(chartDom);
    var opt = pieCart.getOption();
    var maxValue = 0;
    if(waterPoloOpt.isMouse){
        pieCart.on('mouseover',function(d){
            liquidFill({
                percent: d.percent,
                color: d.color
            });
        });
        pieCart.on('mouseout',function(d){
            liquidFill({percent: '0', color: simple?'#3373e6':'#00fffc'});
        });
        pieCart.on('legendselectchanged',function(d){
            maxValue = 0;
            for(var i=0;i<opt.series.length;i++){
                for(var j=0;j<opt.series[i].data.length;j++){
                    var item = opt.series[i].data[j];
                    if(d.selected[item.name]){
                        maxValue += item.value;
                    }
                }
            }
            liquidFill({percent: '0', color: simple?'#3373e6':'#00fffc'});
        });
    }
    for(var i=0;i<opt.series.length;i++){
        for(var j=0;j<opt.series[i].data.length;j++){
            var item = opt.series[i].data[j];
            if(item.value){
                maxValue += item.value;
            }
        }
    }
    var radius = opt.series[0].radius[0]+'';
    radius = radius.indexOf('%')==-1?(radius*1.5):(radius.replace('%','')*0.7+'%');
    var chart = echarts.init(chartDom);
    var defaultParam =waterPoloOpt.defaultParam;
    liquidFill(defaultParam);
    function liquidFill(param){
        var option = {
            series: [{
                type: 'liquidFill',
                radius: radius,
                center: opt.series[0].center,
                label: {
                    normal: {
                        formatter: function() {
                            return param.percent!=0?(param.percent+'%'):maxValue;
                        },
                        textStyle: {
                            color: param.color,
                            insideColor: '#fff',
                            fontSize: 18
                        }
                    }
                },
                outline: {
                    show: false
                },
                backgroundStyle: {
                    borderColor: param.color,
                    color:simple?'#fff':'rgba(0,15,20,0.8)',
                    borderWidth: 1
                },
                data: [
                    {
                        value: param.percent*0.01,
                        direction: 'left',
                        itemStyle: {
                            normal: {
                                color: param.color.colorRgb().replace('1)','0.9)')
                            }
                        }
                    },
                    {
                        value: param.percent*0.009,
                        direction: 'right',
                        itemStyle: {
                            normal: {
                                color: param.color.colorRgb().replace('1)','0.5)')
                            }
                        }
                    }
                ]
            }]
        };
        chart.setOption(option);
    }
}
function initPie(param){
    var legendData = [];
    for(var i=0;i<param.data.length;i++){
        legendData.push(param.data[i].name);
    }
    var color = param.color?param.color:['#005ed2', '#e12001', '#fe2b00', '#ff4e18', '#ff7900','#fe9b00','#feb300','#ffc602', '#fce693', '#67e8fe','#00d7fe','#00c0fe','#009eff','#0081d2'];
    var radius = param.radius?param.radius:['40%','60%'];
    var center = param.center?param.center:['50%', '50%'];
    var titleGrid = param.titleGrid?param.titleGrid:{top:'10',left:'center'};
    var legendGrid = param.legendGrid?param.legendGrid:{top:'10',left:'center'};
    document.getElementById(param.id).innerHTML = '';
    var myChart = echarts.init(document.getElementById(param.id));
    var option = {
        title: {
            text: param.title,
            left: titleGrid.left,
            top: titleGrid.top,
            textStyle:{
                fontSize: 14,
                color:param.titleColor
            }
        },
        legend: {
            show:waterPoloOpt.legend,
            orient: 'vertical',
            itemHeight: 16,
            bottom: legendGrid.bottom,
            right: legendGrid.right,
            top:legendGrid.top,
            left:legendGrid.left,
            icon:"circle",
            textStyle:{
                color:simple?'#333':'#70c1df',
            },
            data:legendData
        },
        color:color,
        series : [
            {
                name:'',
                type:'pie',
                radius : radius,
                center : center,
                roseType:waterPoloOpt.isRose?'angle':'',
                labelLine:{
                    normal: {
                        show:waterPoloOpt.labelLine,
                        textStyle: {
                            fontSize: 10
                        },
                        length: 40,
                        length2: 30
                    }
                },
                label: {
                    normal: {
                        position: 'outside',
                        show: waterPoloOpt.labelLine,
                        formatter: "{b}",
                        textStyle: {
                            color:simple?'#333':'#81ddff',
                            fontSize:10
                        }
                    }
                },
                itemStyle:{
                    normal:{
                        borderColor:simple?'#fff':'rgba(0,0,0,0)',
                        borderWidth:2
                    }
                },
                data:param.data
            }
        ]
    };
    myChart.setOption(option);
    waterPolo(param.id,myChart);
    return myChart;
}