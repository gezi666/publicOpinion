/**
 * Created by yyg on 2017/2/28.
 */
$(document).ready(function(){
    laydate({elem: '#date03', format: 'YYYY/MM/DD',
        choose: function(datas){ //选择日期完毕的回调
            //alert('得到：'+datas);
        }
    });
    laydate({elem: '#date04', format: 'YYYY/MM/DD',
        choose: function(datas){ //选择日期完毕的回调
            //alert('得到：'+datas);
        }
    });

    initData = function(){
        chartType();//民意类型占比
        chartTypeCount();//民意类型数量变化趋势
        chartTypeTop();//各类型民意指向部门top10
    }
    initData();
    function chartType(){
        var data = {
            "status": 200,
            "data": {
                "statisticsDates": ["2017-02-17", "2017-02-18"],
                "showData": [
                    {
                        "opinionCount": 1956,
                        "opinionTypeCode": "ot01",
                        "opinionTypeName": "咨询"
                    },
                    {
                        "opinionCount": 2956,
                        "opinionTypeCode": "ot01",
                        "opinionTypeName": "投诉举报"
                    },
                    {
                        "opinionCount": 56,
                        "opinionTypeCode": "ot01",
                        "opinionTypeName": "求助"
                    },
                    {
                        "opinionCount": 956,
                        "opinionTypeCode": "ot01",
                        "opinionTypeName": "建议"
                    },
                    {
                        "opinionCount": 3956,
                        "opinionTypeCode": "ot01",
                        "opinionTypeName": "表扬"
                    }
                ]
            }
        };
        var paramData = {
            id:'chart01',
            color:['#00c0fe','#0082d2','#fbc802','#fe5600','#ff9200'],
            legendGrid:{ left:'10%', top:'28%',},
            center: ['50%', '44%'],
            radius: ['45%', '70%'],
            data:[]
        };
        for(var i=0;i<data.data.showData.length;i++){
            paramData.data.push({
                value:data.data.showData[i].opinionCount,
                code:data.data.showData[i].opinionTypeCode,
                name:data.data.showData[i].opinionTypeName
            })
        }
        resetOpt();//重置默认配置
        waterPoloOpt.isRose = true;//使用玫瑰图
        waterPoloOpt.labelLine = true;//使用标线
        waterPoloOpt.legend = true;//使用图例
        var myChart = initPie(paramData);

        myChart.on('click',function(param){
            //localStorage.setItem('type','20');//type=20 类型分析--民意主题占比
            //localStorage.setItem('code',param.data.code);
            //localStorage.setItem('name',param.data.name);
            var pm = '?type=20&time=&name='+param.data.name+'&code='+param.data.code;
            window.open("./classes_theme.html"+pm);
        });
    }
    function chartTypeCount(){
        var data = {
            "status": 200,
            "data": {
               "statisticsDates": ["2017-02-17", "2017-02-18"],
               "dates": ["2016-11-01", "2016-11-02", "2016-11-03", "2016-11-04", "2016-11-05", "2016-11-06"],
               "showData": [
                 {"opinionCount": [53, 12, 68,randomData(100),randomData(100),randomData(100)], "opinionTypeCode": "ot00", "opinionTypeName": "全部"},
                 {"opinionCount": [32, 12, 52,randomData(100),randomData(100),randomData(100)], "opinionTypeCode": "ot01", "opinionTypeName": "投诉举报"},
                 {"opinionCount": [53, 12, 68,randomData(100),randomData(100),randomData(100)], "opinionTypeCode": "ot02", "opinionTypeName": "咨询"},
                 {"opinionCount": [53, 12, 68,randomData(100),randomData(100),randomData(100)], "opinionTypeCode": "ot03", "opinionTypeName": "求助"},
                 {"opinionCount": [53, 12, 68,randomData(100),randomData(100),randomData(100)], "opinionTypeCode": "ot04", "opinionTypeName": "建议"},
                 {"opinionCount": [53, 12, 68,randomData(100),randomData(100),randomData(100)], "opinionTypeCode": "ot05", "opinionTypeName": "表扬"}
            ]
        }};
        function searchCode(name){
            for(var i=0;i< data.data.showData.length;i++){
                if(data.data.showData[i].opinionTypeName==name){
                    return data.data.showData[i].opinionTypeCode;
                }
            }
        }
        var legend = [],seriesData=[];
        for(var i=0;i<data.data.showData.length;i++){
            var item = data.data.showData[i];
            legend.push(item.opinionTypeName);
            seriesData.push({
                name:item.opinionTypeName,
                code:item.opinionTypeCode,
                type:'line',
                data:item.opinionCount,
                symbol:simple?'emptyCircle':'circle',
                symbolSize:10
            });
        }
        var myChart = echarts.init(document.getElementById('chart02'));
        var option = {
            tooltip : {
                trigger: 'axis',
                formatter: function (params){
                    return params[0].name + ' : '
                        + (params[2].value - params[1].value > 0 ? '+' : '-')
                        + params[0].value + '<br/>'
                        + params[2].seriesName + ' : ' + params[2].value + '<br/>'
                        + params[3].seriesName + ' : ' + params[3].value + '<br/>'
                }
            },
            legend: {
                right:'30',
                top:'10',
                textStyle:{
                    color:simple?'#333':'#70c1df',
                },
                itemHeight:12,
                icon:'square',
                data:legend
            },
            xAxis:{
                type : 'category',
                data : data.data.dates,
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
            yAxis: {
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
            color:['#24df67', '#1788f1', '#f72f63','#2b821d', '#fdd030','#fa6822'],
            grid: {x: '50', x2: '30', y: '40', y2: '50'},
            series: seriesData
        };
        myChart.setOption(option);
        myChart.on('click',function(param){
            var name = param.seriesName;
            var code = searchCode(param.seriesName);
            var time = param.name;
            //localStorage.setItem('type','21');//type=21类型分析--民意数量变化趋势
            var pm = '?type=21&time='+time+'&name='+name+'&code='+code;
            window.open("./source_ays2.html"+pm);
        });
    }
    function chartTypeTop(){
        var data = {
            "status": 200,
            "data": {
                "statisticsDates": ["2017-02-17", "2017-02-18"],
                "appealTypes": [
                    {"opinionTypeCode": "at01", "opinionTypeName": "咨询"},
                    {"opinionTypeCode": "at02", "opinionTypeName": "投诉举报"},
                    {"opinionTypeCode": "at03", "opinionTypeName": "求助"},
                    {"opinionTypeCode": "at04", "opinionTypeName": "建议"},
                    {"opinionTypeCode": "at05", "opinionTypeName": "表扬"}
                ],
                "showData": [
                    {
                        "opinionCount": [randomData(100), randomData(100), randomData(100), randomData(100), randomData(100)],
                        "departCode": "dept02",
                        "departName": "教育局"
                    },
                    {
                        "opinionCount": [randomData(100), randomData(100), randomData(100), randomData(100), randomData(100)],
                        "departCode": "dept03",
                        "departName": "司法部门"
                    },
                    {
                        "opinionCount": [randomData(100), randomData(100), randomData(100), randomData(100), randomData(100)],
                        "departCode": "dept03",
                        "departName": "交通运输局"
                    },
                    {
                        "opinionCount": [randomData(100), randomData(100), randomData(100), randomData(100), randomData(100)],
                        "departCode": "dept03",
                        "departName": "公安局"
                    },
                    {
                        "opinionCount": [randomData(100), randomData(100), randomData(100), randomData(100), randomData(100)],
                        "departCode": "dept03",
                        "departName": "环保局"
                    },
                    {
                        "opinionCount": [randomData(100), randomData(100), randomData(100), randomData(100), randomData(100)],
                        "departCode": "dept03",
                        "departName": "人口和计划生育局"
                    },
                    {
                        "opinionCount": [randomData(100), randomData(100), randomData(100), randomData(100), randomData(100)],
                        "departCode": "dept03",
                        "departName": "食品药品监督管理局"
                    }
                ]
            }
        };
        function searchLineCount(idx){
            var arr = [];
            for(var i=0;i<data.data.showData.length;i++){
                arr.push(data.data.showData[i].opinionCount[idx]);
            }
            return arr;
        }
        function searchCode(name){
            for(var i=0;i<data.data.showData.length;i++){
                if(data.data.showData[i].departName==name){
                    return data.data.showData[i].departCode;
                }
            }
        }
        var legend = [],xAxis=[],seriesData=[];
        for(var i=0;i<data.data.appealTypes.length;i++){
            var item = data.data.appealTypes[i];
            legend.push(item.opinionTypeName);
            seriesData.push({
                name:item.opinionTypeName,
                barWidth:'30%',
                type:'bar',
                stack: '1',
                data:searchLineCount(i)
            });
        }
        for(var i=0;i<data.data.showData.length;i++){
            var item = data.data.showData[i];
            xAxis.push(item.departName);
        }
        var myChart = echarts.init(document.getElementById('chart03'));
        var option = {
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                top:'10',
                right:'30',
                orient:'horizontal',
                textStyle:{
                    color:simple?'#333':'#70c1df',
                },
                itemHeight:12,
                icon:'square',
                data:legend
            },
            grid: {x: '50', x2: '30', y: '40', y2: '50'},
            color:['#ff8a18','#ef3026','#358f36','#0bc6db','#04a1e8'],
            xAxis : [
                {
                    type : 'category',
                    axisLabel: {
                        textStyle:{
                            color:simple?'#808080':'#00c7e2'
                        }
                    },
                    axisLine:{
                        lineStyle:{
                            color:simple?'#d9d9d9':'#62e2dd'
                        }
                    },
                    data : xAxis
                }
            ],
            yAxis : [
                {
                    min: 0,
                    type : 'value',
                    name: '',
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
            series : seriesData
        };
        myChart.setOption(option);
        myChart.on('click',function(param){
            //localStorage.setItem('code',searchCode(param.name));
            //localStorage.setItem('name',param.name);
            var pm = '?type=21'+'&time=&name='+param.name+'&code='+searchCode(param.name);
            window.location.href = './p_type_ays.html'+pm;
        });
    }
});
