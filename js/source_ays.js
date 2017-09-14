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
        updateChart();//民意来源占比
        chartSourceVs();//民意来源对比
    }
    initData();
    function updateChart(){
        var data = {
            "status": 200,
            "data": {
                "statisticsDates": ["2017-02-17", "2017-02-18"],
                "showData": [
                    {
                        "originCode": "origin01",
                        "originName": "市长热线12345",
                        "opinionCount": 1132
                    },
                    {
                        "originCode": "origin02",
                        "originName": "公安局",
                        "opinionCount": 3192
                    },
                    {
                        "originCode": "origin03",
                        "originName": "信访局",
                        "opinionCount": 292
                    },
                    {
                        "originCode": "origin04",
                        "originName": "公安局",
                        "opinionCount": 192
                    },
                    {
                        "originCode": "origin05",
                        "originName": "督查室",
                        "opinionCount": 2192
                    },
                    {
                        "originCode": "origin06",
                        "originName": "城管局",
                        "opinionCount": 4192
                    },
                    {
                        "originCode": "origin02",
                        "originName": "民生通",
                        "opinionCount": 3800
                    }
                ]
            }
        };
        var paramData = {
            id:'chart01',
            color:['#00c0fe','#0082d2','#fbc802','#fe5600','#ff9200'],
            legendGrid:{ left:'10%', top:'28%',},
            center: ['50%', '40%'],
            radius: ['30%', '50%'],
            data:[]
        };
        for(var i=0;i<data.data.showData.length;i++){
            paramData.data.push({
                value:data.data.showData[i].opinionCount,
                code:data.data.showData[i].originCode,
                name:data.data.showData[i].originName
            })
        }
        resetOpt();//重置默认配置
        waterPoloOpt.isRose = true;//使用玫瑰图
        waterPoloOpt.labelLine = true;//使用标线
        waterPoloOpt.legend = true;//使用图例
        var myChart = initPie(paramData);
        myChart.on('click',function(param){
            //localStorage.setItem('type','23');//type=23 来源分析--民意来源占比
            //localStorage.setItem('code',param.data.code);
            //localStorage.setItem('name',param.data.name);
            var pm = '?type=23'+'&time=&name='+param.data.name+'&code='+param.data.code;
            window.open('./source_scale.html'+pm) ;
        });
    }
    function chartSourceVs(){
        var data = {
            "data": {
                "statisticsDates": ["2017-02-17", "2017-02-18"],
                "dates": ["2016-11-01", "2016-11-02", "2016-11-03", "2016-11-04", "2016-11-05", "2016-11-06"],
                "showData":[
                    {"originCode":"370828",originName:"市长热线12345",opinionCount: [randomData(100),randomData(100),randomData(100),randomData(100),randomData(100),randomData(100)]},
                    {"originCode":"370828",originName:"公安局",opinionCount: [randomData(100),randomData(100),randomData(100),randomData(100),randomData(100),randomData(100)]},
                    {"originCode":"370828",originName:"信访局",opinionCount: [randomData(100),randomData(100),randomData(100),randomData(100),randomData(100),randomData(100)]},
                    {"originCode":"370828",originName:"督查室",opinionCount: [randomData(100),randomData(100),randomData(100),randomData(100),randomData(100),randomData(100)]},
                    {"originCode":"370828",originName:"城管局",opinionCount: [randomData(100),randomData(100),randomData(100),randomData(100),randomData(100),randomData(100)]},
                    {"originCode":"370828",originName:"民生通",opinionCount: [randomData(100),randomData(100),randomData(100),randomData(100),randomData(100),randomData(100)]}
                ]
            }
        };
        function searchCode(name){
            for(var i=0;i<data.data.showData.length;i++){
                if(data.data.showData[i].originName==name){
                    return data.data.showData[i].originCode;
                }
            }
        }
        var legend = [],lineDatas=[];
        for(var i=0;i<data.data.showData.length;i++){
            var item = data.data.showData[i];
            legend.push(item.originName);
            lineDatas.push({
                name:item.originName,
                code:item.originCode,
                type:'line',
                data:item.opinionCount,
                symbol:simple?'emptyCircle':'circle',
                symbolSize:10
            });
        }
        var myLine = echarts.init(document.getElementById('chart02'));
        var option = {
            tooltip : {
                trigger: 'axis',
                formatter: function (params){
                    var s = '';
                    for(var i=0;i<params.length;i++){
                        s += params[i].seriesName+'：'+params[i].value+'<br/>';
                    }
                    return s;
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
            series: lineDatas
        };
        myLine.setOption(option);
        myLine.on('click',function(param){
            //localStorage.setItem('type','24');//type=24 来源分析--民意来源对比
            //localStorage.setItem('time',param.name);
            //localStorage.setItem('code',searchCode(param.seriesName));
            //localStorage.setItem('name',param.seriesName);
            var pm = '?type=24'+'&time='+param.name+'&name='+param.seriesName+'&code='+searchCode(param.seriesName);
            window.open('./source_scale.html'+pm) ;
        });
    }

});
