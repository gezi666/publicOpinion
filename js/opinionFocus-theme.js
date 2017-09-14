/**
 * Created by 魏阁 on 2017-3-3.
 */
$(function(){
    initData = function(){
        initTimeLine();
        intOpinionTop10();
    };
    initData();
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

//初始化民意热点主题(TOP10)
function intOpinionTop10(){
    var data = {
        "status": 200,
        "data": {
            "statisticsDates": [
                "2017-06-01",
                "2017-09-01"
            ],
            "govData":[
                {
                    "topicCode":"top01",
                    "topicName":"城建管理",
                    "opinionCount":600
                },
                {
                    "topicCode":"top02",
                    "topicName":"人事劳动",
                    "opinionCount":560
                },
                {
                    "topicCode":"top03",
                    "topicName":"交通管理",
                    "opinionCount":530
                },
                {
                    "topicCode":"top04",
                    "topicName":"社会治安",
                    "opinionCount":430
                },
                {
                    "topicCode":"top05",
                    "topicName":"资源环境",
                    "opinionCount":410
                },
                {
                    "topicCode":"top06",
                    "topicName":"民生问题",
                    "opinionCount":360
                },
                {
                    "topicCode":"top07",
                    "topicName":"劳动保障",
                    "opinionCount":310
                },
                {
                    "topicCode":"top08",
                    "topicName":"民政",
                    "opinionCount":305
                },
                {
                    "topicCode":"top09",
                    "topicName":"公安",
                    "opinionCount":300
                },
                {
                    "topicCode":"top10",
                    "topicName":"环境",
                    "opinionCount":280
                }
            ],
            "networkData":[
                {
                    "topicCode":"top01",
                    "topicName":"城建管理",
                    "opinionCount":700
                },
                {
                    "topicCode":"top02",
                    "topicName":"人事劳动",
                    "opinionCount":560
                },
                {
                    "topicCode":"top03",
                    "topicName":"交通管理",
                    "opinionCount":530
                },
                {
                    "topicCode":"top04",
                    "topicName":"社会治安",
                    "opinionCount":430
                },
                {
                    "topicCode":"top05",
                    "topicName":"资源环境",
                    "opinionCount":410
                },
                {
                    "topicCode":"top06",
                    "topicName":"民生问题",
                    "opinionCount":360
                },
                {
                    "topicCode":"top07",
                    "topicName":"劳动保障",
                    "opinionCount":310
                },
                {
                    "topicCode":"top08",
                    "topicName":"民政",
                    "opinionCount":305
                },
                {
                    "topicCode":"top09",
                    "topicName":"公安",
                    "opinionCount":300
                },
                {
                    "topicCode":"top10",
                    "topicName":"环境",
                    "opinionCount":280
                }
            ]
        }
    };

    //初始化政府渠道民意热点主题(TOP10)
    var xAxis1=[],seriesData1=[];
    for(var i=0;i<data.data.govData.length;i++){
        var item1 = data.data.govData[i];
        xAxis1.push(item1.topicName);
        seriesData1.push({
            value:item1.opinionCount,
            code:item1.topicCode
        });
    }
    var govChart = echarts.init(document.getElementById('govTop10'));
    var option1 = {
        title: {
            text: '政府渠道民意热点主题（TOP10）',
            left:'center',
            top:'10',
            textStyle: {
                color:simple?'#7989b0':'#00c7e2',
                fontSize: 14
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer : {
                type : 'shadow'
            }
        },
        calculable: true,
        xAxis: [{
            type: 'category',
            data: xAxis1,
            axisLabel:{
                textStyle:{
                    color:simple?'#333':'#00c7e2'
                }
            },
            axisLine:{
                lineStyle:{
                    color:simple?'#d9d9d9':'#62e2dd'
                }
            }
        }],
        color:simple?["#6199fb"]:["#00123d"],
        yAxis: [{
            type: 'value',
            name: '',
            axisLabel: {
                formatter: '{value}'
                ,textStyle:{
                    color:simple?'#808080':'#00c7e2'
                }
            },
            axisLine: {
                lineStyle: {
                    color: simple?'#d9d9d9':'#62e2dd',
                    width: 1
                }
            },
            splitLine: {
                show: false
            }
        }],
        grid: {
            x: '50',
            x2: '30',
            y: '40',
            y2: '40'
            //right: '10%'
        },
        series: [{
            name: '2016年12月',
            type: 'bar',
            barWidth:'40%',
            itemStyle:{
                normal:{
                    borderWidth:1,
                    borderColor:simple?'rgba(0,0,0,0)':'#018afe',
                    barBorderRadius:[5, 5, 0, 0]
                }
            },
            data:seriesData1
        }]
    };
    govChart.setOption(option1);
    govChart.on('click',function(d){
        window.open("./person_gov_search.html");
    });

    //初始化网络民意热点主题(TOP10)
    var xAxis=[],seriesData=[];
    for(var a=0;a<data.data.networkData.length;a++){
        var item = data.data.networkData[a];
        xAxis.push(item.topicName);
        seriesData.push({
            value:item.opinionCount,
            code:item.topicCode
        });
    }
    var netChart = echarts.init(document.getElementById('intTop10'));
    var option2 = {
        title: {
            text: '网络民意热点主题（TOP10）',
            left:'center',
            top:'10',
            textStyle: {
                color:simple?'#7989b0':'#00c7e2',
                fontSize: 14
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer : {
                type : 'shadow'
            }
        },
        calculable: true,
        xAxis: [{
            type: 'category',
            data: xAxis,
            axisLabel:{
                textStyle:{
                    color:simple?'#333':'#00c7e2'
                }
            },
            axisLine:{
                lineStyle:{
                    color:simple?'#d9d9d9':'#62e2dd'
                }
            }
        }],
        color:simple?["#6199fb"]:["#00123d"],
        yAxis: [{
            type: 'value',
            name: '',
            axisLabel: {
                formatter: '{value}'
                ,textStyle:{
                    color:simple?'#808080':'#00c7e2'
                }
            },
            axisLine: {
                lineStyle: {
                    color: simple?'#d9d9d9':'#62e2dd',
                    width: 1
                }
            },
            splitLine: {
                show: false
            }
        }],
        grid: {
            x: '50',
            x2: '30',
            y: '40',
            y2: '40'
            //right: '10%'
        },
        series: [{
            name: '2016年12月',
            type: 'bar',
            barWidth:'40%',
            itemStyle:{
                normal:{
                    borderWidth:1,
                    borderColor:simple?'rgba(0,0,0,0)':'#018afe',
                    barBorderRadius:[5, 5, 0, 0]
                }
            },
            data:seriesData
        }]
    };
    netChart.setOption(option2);
    netChart.on('click',function(d){
        window.open("./person_net_search.html");
    });
}
