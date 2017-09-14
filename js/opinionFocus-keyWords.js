/**
 * Created by 魏阁 on 2017-3-3.
 */
$(function(){
    initTimeLine();
    initKeyWords();
});

//初始化时间轴
function initTimeLine(){
    // 创建滑块(样式需要自行调整).
    var min = new Date("01-01");
    var max = new Date("12-31");

    var defaultBegin = new Date("06-01");
    var defaultEnd = new Date("09-01");

    var s = function(event, ui) {
        //var startDate = new Date(ui.values[0]);
        //var endDate = new Date(ui.values[1]);
        //$.ajax({
        //    url: baseURl+"/hotpointbubbles/graph",
        //    dataType:"json",
        //    data:{
        //        startYM:$("#date-slider_slider").next("div").find("span").eq(0).html(),
        //        endYM:$("#date-slider_slider").next("div").find("span").eq(1).html(),
        //        areaCode:$("#address").val(),
        //        typeCode:$("#type").val()
        //    },
        //    success: function(msg){
        //        chart.data(msg.datas);
        //    }
        //});
    };
    var ss = {
        format: "MM-dd",
        dateCls: "dateSpan",
        offsetFontPath: 32
    };

    createSliderUI("timeLine", defaultBegin, defaultEnd, min, max, s, ss);
}

//初始化民意热点图
function initKeyWords(){
    var data = {
        "status": 200,
        "data": {
            "govData":[
                {
                    "opinionCount":randomData(),
                    "keyword":"大数据"
                },
                {
                    "opinionCount":randomData(),
                    "keyword":"空气污染"
                },
                {
                    "opinionCount":randomData(),
                    "keyword":"小学教育"
                },
                {
                    "opinionCount":randomData(),
                    "keyword":"创业"
                },
                {
                    "opinionCount":randomData(),
                    "keyword":"医疗"
                },
                {
                    "opinionCount":randomData(),
                    "keyword":"环境恶化"
                },
                {
                    "opinionCount":randomData(),
                    "keyword":"雾霾"
                },
                {
                    "opinionCount":randomData(),
                    "keyword":"废弃物"
                },
                {
                    "opinionCount":randomData(),
                    "keyword":"互联网"
                },
                {
                    "opinionCount":randomData(),
                    "keyword":"智慧城市"
                }
            ],
            "networkData":[
                {
                    "opinionCount":randomData(),
                    "keyword":"大数据"
                },
                {
                    "opinionCount":randomData(),
                    "keyword":"空气污染"
                },
                {
                    "opinionCount":randomData(),
                    "keyword":"小学教育"
                },
                {
                    "opinionCount":randomData(),
                    "keyword":"创业"
                },
                {
                    "opinionCount":randomData(),
                    "keyword":"医疗"
                },
                {
                    "opinionCount":randomData(),
                    "keyword":"环境恶化"
                },
                {
                    "opinionCount":randomData(),
                    "keyword":"雾霾"
                },
                {
                    "opinionCount":randomData(),
                    "keyword":"废弃物"
                },
                {
                    "opinionCount":randomData(),
                    "keyword":"互联网"
                },
                {
                    "opinionCount":randomData(),
                    "keyword":"智慧城市"
                }
            ],
            "statisticsDates": [
                "2017-06-01",
                "2017-09-01"
            ]
        }
    };

    //初始化政府渠道民意热点关键词
    var seriesData1=[],govDataArr=[];
    data.data.govData.forEach(function(p){
        govDataArr.push(p.opinionCount);
    });
    govDataArr.sort(function(a,b){return b-a});        //降序排列数组
    for(var i=0;i<data.data.govData.length;i++){
        var item1 = data.data.govData[i];
        var itemDate1 = item1.opinionCount;
        var itemColor1=AutoConfigureColor(govDataArr,itemDate1);
        seriesData1.push({
            value:itemDate1,
            name:item1.keyword,
            itemStyle : {
                normal : {
                    color :itemColor1          //颜色填充
                }
            }
        });
    }
    var govChart = echarts.init(document.getElementById('gov-keyWords'));
    var option1 = {
        title: {
            text: '政府渠道民意热点关键词',
            x:'center',
            top: 40,
            textStyle: {
                color: simple?'#7989b0':'#00c7e2'
            }
        },
        series: [{
            type: 'graph',
            layout: 'force',
            roam: true,
            symbol: 'circle',
            force: {
                repulsion: 150
            },
            symbolSize: function (val) {
                return (40+val*60/govDataArr[0]);},
            animation: false,
            label: {
                normal: {
                    show: true,
                    position: 'inside',
                    formatter: '{b}',
                    textStyle:{
                        color:'#fff',
                        fontSize:10
                    }
                }
            },
            draggable: false,    //控制节点是否可以拖拽
            data:seriesData1
        }]
    };
    govChart.setOption(option1);
    govChart.on('click',function(d){
        window.open("./person_gov_search.html");
    });

    //初始化网络民意热点关键词
    var seriesData=[],netDataArr=[];
    data.data.networkData.forEach(function(p){
        netDataArr.push(p.opinionCount);
    });
    netDataArr.sort(function(a,b){return b-a});        //降序排列数组
    for(var m=0;m<data.data.networkData.length;m++){
        var item = data.data.networkData[m];
        var itemDate = item.opinionCount;
        var itemColor=AutoConfigureColor(netDataArr,itemDate);
        seriesData.push({
            value:itemDate,
            name:item.keyword,
            itemStyle : {
                normal : {
                    color :itemColor          //颜色填充
                }
            }
        });
    }

    var netChart = echarts.init(document.getElementById('int-keyWords'));
    var option2 = {
        title: {
            text: '网络民意热点关键词',
            x:'center',
            top: 40,
            textStyle: {
                color: simple?'#7989b0':'#00c7e2'
            }
        },
        series: [{
            type: 'graph',
            layout: 'force',
            roam: true,
            symbol: 'circle',
            force: {
                repulsion: 150
            },
            symbolSize: function (val) {
                return (40+val*60/netDataArr[0]);},
            animation: false,
            label: {
                normal: {
                    show: true,
                    position: 'inside',
                    formatter: '{b}',
                    textStyle:{
                        color:'#fff',
                        fontSize:10
                    }
                }
            },
            draggable: false,    //控制节点是否可以拖拽
            data:seriesData
        }]
    };
    netChart.setOption(option2);
    netChart.on('click',function(d){
        window.open("./person_net_search.html");
    });
}


