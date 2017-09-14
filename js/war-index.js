/**
 * Created by 魏阁 on 2017-2-27.
 */
$(function(){
    //changeMenuTo("大数据预警");

    laydate({elem: '#date01', format: 'YYYY-MM-DD',fixed: false,
        choose: function(datas){ //选择日期完毕的回调
            //alert('得到：'+datas);
        }
    });

    $("span.switch").click(function(){
        $(this).addClass("active").siblings().removeClass("active");
        var txt =$(this).text();
        if(txt === "投诉举报预警"){
            $('#chart_warnId').show();
            $(".complaints").removeClass("disNone");
            $(".negTrend").addClass("disNone");
            initLine();
            initAreaMap();    //初始化投诉举报预警区域地图
            initDepartment();        //初始化投诉举报预警部门柱状图
            initTheme();            //初始化投诉举报预警主题柱状图
        } else {
            $('#chart_warnId').hide();
            $(".complaints").addClass("disNone");
            $(".negTrend").removeClass("disNone");
            initNegAreaMap();           //初始化负面网络民意预警区域地图
            initnegTrend();             //初始化负面网络民意变化趋势图
            initnegTheme();            //初始化负面网络民意预警主题柱状图
        }
    });

    initData = function(){
        initLine();            //初始化投诉举报投诉举报变化趋势折线图
        initAreaMap();            //初始化投诉举报预警区域地图
        initDepartment();        //初始化投诉举报预警部门柱状图
        initTheme();            //初始化投诉举报预警主题柱状图
    };
    initData();
});

function initLine(){
    var data = {
        "status": 200,
        "data": {
            "dayTime": ["2017-02-20"],
            "timeDates": ["1:00", "2:00","3:00","4:00","5:00","6:00","7:00"],
            "numberData": [randomData(100), randomData(100),randomData(100),randomData(100),randomData(100),randomData(100),randomData(100)],
            "proportionData": [randomData(100), randomData(100),randomData(100),randomData(100),randomData(100),randomData(100),randomData(100)]
        }
    };
    var myChart = echarts.init(document.getElementById('chartLine'));
    var option = {
        tooltip : {
            trigger: 'axis',
            formatter: function (params){
                return params[0].seriesName+"："+params[0].value+"<br/>"+params[1].seriesName+"："+params[1].value+"%";
            }
        },
        legend: {
            right:'10%',
            top:'10',
            textStyle:{
                color:simple?'#333':'#70c1df',
            },
            itemHeight:12,
            icon:'line',
            data:['负面网络民意数量','负面网络民意占比']
        },
        xAxis:{
            type : 'category',
            data : data.data.timeDates,
            axisLabel:{
                textStyle:{
                    color:simple?'#333':'#2bc4fd'
                }
            },
            axisLine:{
                lineStyle:{
                    color:simple?'#d9d9d9':'#62e2dd'
                }
            }
        },
        yAxis: [
            {
                name:'数量',
                type : 'value',
                axisLabel: {
                    formatter: '{value}'
                    ,textStyle:{
                        color:simple?'#808080':'#00c7e2'
                    }
                },
                axisLine:{
                    lineStyle:{
                        color:simple?'#d9d9d9':'#62e2dd'
                    }
                },
                splitLine: {
                    show: false
                }
            },
            {
                name:'占比',
                type : 'value',
                axisLabel: {
                    formatter: '{value}'
                    ,textStyle:{
                        color:simple?'#808080':'#00c7e2'
                    }
                },
                axisLine:{
                    lineStyle:{
                        color:simple?'#d9d9d9':'#62e2dd'
                    }
                },
                splitLine: {
                    show: false
                }
            }
        ],
        color:[ '#f72f63','#2b821d'],
        grid: {x: '50', x2: '50', y: '40', y2: '50'},
        series: [
            {
                name:'负面网络民意数量',
                type:'line',
                data:data.data.numberData,
                symbol:simple?'emptyCircle':'circle',
                symbolSize:10
            },
            {
                name:'负面网络民意占比',
                type:'line',
                yAxisIndex: 1,
                data:data.data.proportionData,
                symbol:simple?'emptyCircle':'circle',
                symbolSize:10
            }
        ]
    };
    myChart.setOption(option);
}
//初始化投诉举报预警区域地图
function initAreaMap(){
    var data =[
        {
            "areaName": "任城区",
            "opinionCount": randomData()
        },
        {
            "areaName": "兖州区",
            "opinionCount": randomData()
        },
        {
            "areaName": "微山县",
            "opinionCount": randomData()
        },
        {
            "areaName": "鱼台县",
            "opinionCount": randomData()
        },
        {
            "areaName": "金乡县",
            "opinionCount": randomData()
        },
        {
            "areaName": "嘉祥县",
            "opinionCount": randomData()
        },
        {
            "areaName": "汶上县",
            "opinionCount": randomData()
        },
        {
            "areaName": "泗水县",
            "opinionCount": randomData()
        },
        {
            "areaName": "梁山县",
            "opinionCount": randomData()
        },
        {
            "areaName": "曲阜市",
            "opinionCount": randomData()
        },
        {
            "areaName": "邹城市",
            "opinionCount": randomData()
        },
        {
            "areaName": "高新区",
            "opinionCount": randomData()
        },
        {
            "areaName": "太白湖区",
            "opinionCount": randomData()
        },
        {
            "areaName": "经济技术开发区",
            "opinionCount": randomData()
        }
    ];      //投诉举报预警区域地图样例数据 （相当于联调时后台返回的数据）
    if(data.length >0){
        for(var i= 0,newAreaData=[];i<data.length;i++){
            newAreaData[i]={
                name:data[i].areaName,
                value:data[i].opinionCount
            };
        }
    }

    echarts.registerMap("jining",jijing);
    var newData ={
        id:"warningArea",
        map:'jining',
        title:"投诉举报预警区域",
        titleColor:simple?'#7989b0':'#00c7e2',
        rangeColor:['#55d821', '#ff8400', '#ff3a5a'],
        toUrl: "../html/war-department-sub.html",
        geoCoord: {
            "任城区":[116.53,35.40],
            "兖州区":[116.75,35.56],
            "微山县":[117.02,34.87],
            "鱼台县":[116.56,35.03],
            "金乡县":[116.31,35.07],
            "嘉祥县":[116.29,35.42],
            "汶上县":[116.48,35.73],
            "泗水县":[117.25,35.67],
            "梁山县":[116.09,35.81],
            "曲阜市":[116.98,35.59],
            "邹城市":[117.00,35.41],
            "高新区":[116.70,35.41],
            "太白湖区":[116.66,35.31],
            "经济技术开发区":[116.40,35.37]
        },
        data:newAreaData
    };
    initScatter(newData);
}

//初始化投诉举报预警部门柱状图
function initDepartment(){
    var data = {
        "status": 200,
        "data": {
            "dayTime": [
                "2017-02-20"
            ],
            "warmingLink": 430,
            "warmingLinkName": "轻微预警",
            "showData":[
                {
                    "departCode":"dept01",
                    "departName":"交管局",
                    "opinionCount":600
                },
                {
                    "departCode":"dept02",
                    "departName":"环保局",
                    "opinionCount":560
                },
                {
                    "departCode":"dept03",
                    "departName":"农业局",
                    "opinionCount":530
                },
                {
                    "departCode":"dept04",
                    "departName":"城管局",
                    "opinionCount":430
                },
                {
                    "departCode":"dept05",
                    "departName":"公安局",
                    "opinionCount":410
                },
                {
                    "departCode":"dept06",
                    "departName":"司法局",
                    "opinionCount":360
                },
                {
                    "departCode":"dept07",
                    "departName":"水利局",
                    "opinionCount":310
                },
                {
                    "departCode":"dept08",
                    "departName":"计划生育局",
                    "opinionCount":305
                },
                {
                    "departCode":"dept09",
                    "departName":"城建局",
                    "opinionCount":300
                },
                {
                    "departCode":"dept10",
                    "departName":"任城管理办公室",
                    "opinionCount":280
                }
            ]
        }
    };
    var xAxis=[],seriesData=[];
    for(var i=0;i<data.data.showData.length;i++){
        var item = data.data.showData[i];
        var itemColor = item.opinionCount>data.data.warmingLink?'#ff9000':'#6199fb';
        xAxis.push(item.departName);
        seriesData.push({
            value:item.opinionCount,
            code:item.departCode,
            itemStyle:{
                normal:{
                    color:itemColor
                }
            }
        });
    }
    var myChart = echarts.init(document.getElementById('chart-department'));
    var option = {
        title: {
            text: '投诉举报预警部门',
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
        //color:simple?["#ff9000","#6199fb"]:["#00123d"],
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
            data:seriesData,
            markLine: {
                data: [
                    {
                        type: '',
                        name:data.data.warmingLinkName,
                        yAxis:data.data.warmingLink
                    }
                ],
                label:{
                    normal:{
                        position: 'middle',
                        formatter:data.data.warmingLinkName
                    }
                },
                lineStyle:{
                    normal:{
                        color:'#ffb077'
                    }
                }
            }
        }]
    };
    myChart.setOption(option);
    myChart.on('click',function(params){
        //$('#content').load("../html/war-department-sub.html");    //联调时要带参数
        window.location.href = "../html/war-department-sub.html";   //点击跳转的页面(联调时要带参数)
    });
}

//初始化投诉举报预警主题柱状图
function initTheme(){
    var data = {
        "status": 200,
        "data": {
            "dayTime": [
                "2017-02-20"
            ],
            "warmingLink": 430,
            "warmingLinkName": "轻微预警",
            "showData":[
                {
                    "topicCode":"top01",
                    "topicName":"交通管理",
                    "opinionCount":600
                },
                {
                    "topicCode":"top02",
                    "topicName":"资源环境",
                    "opinionCount":560
                },
                {
                    "topicCode":"top03",
                    "topicName":"三农问题",
                    "opinionCount":530
                },
                {
                    "topicCode":"top04",
                    "topicName":"财税金融",
                    "opinionCount":430
                },
                {
                    "topicCode":"top05",
                    "topicName":"文化教育",
                    "opinionCount":410
                },
                {
                    "topicCode":"top06",
                    "topicName":"认识劳动",
                    "opinionCount":360
                },
                {
                    "topicCode":"top07",
                    "topicName":"民生问题",
                    "opinionCount":310
                },
                {
                    "topicCode":"top08",
                    "topicName":"社会治安",
                    "opinionCount":305
                },
                {
                    "topicCode":"top09",
                    "topicName":"机关建设",
                    "opinionCount":300
                },
                {
                    "topicCode":"top10",
                    "topicName":"公共服务",
                    "opinionCount":280
                }
            ]
        }
    };
    var xAxis=[],seriesData=[];
    for(var i=0;i<data.data.showData.length;i++){
        var item = data.data.showData[i];
        var itemColor = item.opinionCount>data.data.warmingLink?'#ff9000':'#6199fb';
        xAxis.push(item.topicName);
        seriesData.push({
            value:item.opinionCount,
            code:item.topicCode,
            itemStyle:{
                normal:{
                    color:itemColor
                }
            }
        });
    }
    var myChart = echarts.init(document.getElementById('chart-theme'));
    var option = {
        title: {
            text: '投诉举报预警主题',
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
        //color:simple?["#6199fb"]:["#00123d"],
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
            data:seriesData,
            markLine: {
                data: [
                    {
                        type: '',
                        name:data.data.warmingLinkName,
                        yAxis:data.data.warmingLink
                    }
                ],
                label:{
                    normal:{
                        position: 'middle',
                        formatter:data.data.warmingLinkName
                    }
                },
                lineStyle:{
                    normal:{
                        color:'#ffb077'
                    }
                }
            }
        }]
    };
    myChart.setOption(option);
    myChart.on('click',function(d){
        //$('#content').load("../html/war-theme-sub.html");    //联调时要带参数
        window.location.href = "../html/war-theme-sub.html";   //点击跳转的页面(联调时要带参数)
    });
}

//初始化负面网络民意预警区域地图
function initNegAreaMap(){
    var data =[
        {
            "areaName": "任城区",
            "opinionCount": randomData()
        },
        {
            "areaName": "兖州区",
            "opinionCount": randomData()
        },
        {
            "areaName": "微山县",
            "opinionCount": randomData()
        },
        {
            "areaName": "鱼台县",
            "opinionCount": randomData()
        },
        {
            "areaName": "金乡县",
            "opinionCount": randomData()
        },
        {
            "areaName": "嘉祥县",
            "opinionCount": randomData()
        },
        {
            "areaName": "汶上县",
            "opinionCount": randomData()
        },
        {
            "areaName": "泗水县",
            "opinionCount": randomData()
        },
        {
            "areaName": "梁山县",
            "opinionCount": randomData()
        },
        {
            "areaName": "曲阜市",
            "opinionCount": randomData()
        },
        {
            "areaName": "邹城市",
            "opinionCount": randomData()
        },
        {
            "areaName": "高新区",
            "opinionCount": randomData()
        },
        {
            "areaName": "太白湖区",
            "opinionCount": randomData()
        },
        {
            "areaName": "经济技术开发区",
            "opinionCount": randomData()
        }
    ];      //投诉举报预警区域地图样例数据 （相当于联调时后台返回的数据）
    if(data.length >0){
        for(var i= 0,newAreaData=[];i<data.length;i++){
            newAreaData[i]={
                name:data[i].areaName,
                value:data[i].opinionCount
            };
        }
    }
    var newData ={
        id:"neg-warningArea",
        map:'jining',
        title:"负面网络民意预警区域",
        titleColor:simple?'#7989b0':'#00c7e2',
        rangeColor:['#55d821', '#ff8400', '#ff3a5a'],
        menuName: "民意查询",
        toUrl: "../html/person_net_search.html",
        geoCoord: {
            "任城区":[116.53,35.40],
            "兖州区":[116.75,35.56],
            "微山县":[117.02,34.87],
            "鱼台县":[116.56,35.03],
            "金乡县":[116.31,35.07],
            "嘉祥县":[116.29,35.42],
            "汶上县":[116.48,35.73],
            "泗水县":[117.25,35.67],
            "梁山县":[116.09,35.81],
            "曲阜市":[116.98,35.59],
            "邹城市":[117.00,35.41],
            "高新区":[116.70,35.41],
            "太白湖区":[116.66,35.31],
            "经济技术开发区":[116.40,35.37]
        },
        data:newAreaData
    };
    initScatter(newData);
}

//初始化负面网络民意变化趋势图
function initnegTrend(){
    var data ={
        "status": 200,
        "data": {
            "dayTime": [
                "2017-02-20"
            ],
            "timeDates": ['0点','1点','2点','3点','4点','5点','6点','7点','8点','9点','10点','11点','12点','13点','14点','15点','16点','17点','18点','19点','20点','21点','22点','23点','24点'],
            "numberData": [randomData(),randomData(),randomData(),randomData(),randomData(),randomData(),randomData(),randomData(),randomData(),randomData(),randomData(),randomData(),randomData(),randomData(),randomData(),randomData(),randomData(),randomData(),randomData(),randomData(),randomData(),randomData(),randomData(),randomData()],
            "proportionData": [randomData(100),randomData(100),randomData(100),randomData(100),randomData(100),randomData(100),randomData(100),randomData(100),randomData(100),randomData(100),randomData(100),randomData(100),randomData(100),randomData(100),randomData(100),randomData(100),randomData(100),randomData(100),randomData(100),randomData(100),randomData(100),randomData(100),randomData(100),randomData(100)]
        }
    };
    var lineColor=['#ff9000',"#6389f8"];
    var myChart = echarts.init(document.getElementById('chart-negTrend'));
    var option = {
        title: {
            text: '负面网络民意变化趋势',
            textStyle: {
                color:simple?'#7989b0':'#00c7e2',
                fontSize: 14
            },
            top:10,
            left:'center'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:['负面网络民意数量','负面网络民意占比'],
            right:'center',
            bottom: 10,
            itemGap: 30,
            itemHeight:10,
            icon:'line',
            textStyle: {
                color: simple?'#333':'#00c7e2'
            }
        },
        grid: {
            x: '60',
            x2: '45',
            y: '50',
            y2: '60'
        },
        label:{
            normal:{
                show:true,
                position:'top',
                textStyle:{
                    color:'#808080'
                }
            }
        },
        xAxis:  {
            name:'',
            nameLocation:'middle',
            nameGap :'30',
            nameTextStyle:{
                color:simple?'#333':'#00c7e2'
            },
            type: 'category',
            axisLabel:{
                textStyle:{
                    color:simple?'#333':'#00c7e2'
                }
            },
            axisLine:{
                lineStyle:{
                    color:simple?'#d9d9d9':'#62e2dd'
                }
            },
            axisTick:{
                show:false
            },
            splitLine: {
                show: false,
                lineStyle: {
                    color: '#ccc',
                    type : "solid"
                }
            },
            boundaryGap: false,
            data: data.data.timeDates
        },
        yAxis: [
            {
                name:'',
                min:'0',
                //interval:200,
                type: 'value',
                axisLabel:
                {
                    textStyle:{
                        color:simple?'#333':'#00c7e2'
                    },
                    formatter: '{value}'
                },
                axisLine:{
                    lineStyle:{
                        color:simple?'#d9d9d9':'#62e2dd'
                    }
                },
                axisTick:{
                    show:false
                },
                splitLine: {
                    show: false
                }
            },
            {
                name: '',
                min: '0',
                //interval:200,
                type: 'value',
                axisLabel: {
                    textStyle: {
                        color: simple?'#333':'#00c7e2'
                    },
                    formatter: '{value}%'
                },
                axisLine: {
                    lineStyle: {
                        color: '#d9d9d9'
                    }
                },
                axisTick: {
                    show: false
                },
                splitLine: {
                    show: false
                }
            }
        ],
        color:lineColor,
        series: [
            {
                name:'负面网络民意数量',
                type:'line',
                data:data.data.numberData,
                showSymbol: false
            },
            {
                name:'负面网络民意占比',
                type:'line',
                yAxisIndex:1,
                data:data.data.proportionData,
                showSymbol: false
            }
        ]
    };
    myChart.setOption(option);
    myChart.on('click',function(d){
        //$('#content').load("../html/person_net_search.html");    //联调时要带参数
        window.location.href = "../html/person_net_search.html";   //点击跳转的页面(联调时要带参数)
    });
}

//初始化负面网络民意预警主题柱状图
function initnegTheme(){
    var data = {
        "status": 200,
        "data": {
            "dayTime": [
                "2017-02-20"
            ],
            "warmingLink": 430,
            "warmingLinkName": "轻微预警",
            "showData":[
                {
                    "topicCode":"top01",
                    "topicName":"交通管理",
                    "opinionCount":600
                },
                {
                    "topicCode":"top02",
                    "topicName":"资源环境",
                    "opinionCount":560
                },
                {
                    "topicCode":"top03",
                    "topicName":"三农问题",
                    "opinionCount":530
                },
                {
                    "topicCode":"top04",
                    "topicName":"财税金融",
                    "opinionCount":430
                },
                {
                    "topicCode":"top05",
                    "topicName":"文化教育",
                    "opinionCount":410
                },
                {
                    "topicCode":"top06",
                    "topicName":"认识劳动",
                    "opinionCount":360
                },
                {
                    "topicCode":"top07",
                    "topicName":"民生问题",
                    "opinionCount":310
                },
                {
                    "topicCode":"top08",
                    "topicName":"社会治安",
                    "opinionCount":305
                },
                {
                    "topicCode":"top09",
                    "topicName":"机关建设",
                    "opinionCount":300
                },
                {
                    "topicCode":"top10",
                    "topicName":"公共服务",
                    "opinionCount":280
                }
            ]
        }
    };
    var xAxis=[],seriesData=[];
    for(var i=0;i<data.data.showData.length;i++){
        var item = data.data.showData[i];
        var itemColor = item.opinionCount>data.data.warmingLink?'#ff9000':'#6199fb';
        xAxis.push(item.topicName);
        seriesData.push({
            value:item.opinionCount,
            code:item.topicCode,
            itemStyle:{
                normal:{
                    color:itemColor
                }
            }
        });
    }
    var myChart = echarts.init(document.getElementById('chart-negTheme'));
    var option = {
        title: {
            text: '负面网络民意预警主题',
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
            data:seriesData,
            markLine: {
                data: [
                    {
                        type: '',
                        name:data.data.warmingLinkName,
                        yAxis:data.data.warmingLink
                    }
                ],
                label:{
                    normal:{
                        position: 'middle',
                        formatter:data.data.warmingLinkName
                    }
                },
                lineStyle:{
                    normal:{
                        color:'#ffb077'
                    }
                }
            }
        }]
    };
    myChart.setOption(option);
    myChart.on('click',function(d){
        //$('#content').load("../html/person_net_search.html");    //联调时要带参数
        window.location.href = "../html/person_net_search.html";   //点击跳转的页面(联调时要带参数)
    });
}