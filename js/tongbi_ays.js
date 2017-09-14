/**
 * Created by yyg on 2017/2/28.
 */
$(document).ready(function(){
    laydate({elem: '#year01', format: 'YYYY',
        choose: function(datas){ //选择日期完毕的回调
            //alert('得到：'+datas);
        }
    });
    laydate({elem: '#year02', format: 'YYYY',
        choose: function(datas){ //选择日期完毕的回调
            //alert('得到：'+datas);
        }
    });
    initData = function(){
        pCount();
        chartType();//民意类型同比分析
    }
    initData();
    function pCount(){
        var param = {
            "status": 200,
            "data": {
                "statisticsDates": ["2017", "2016"],
                "month": ["1月","2月","3月","4月","5月","6月","7月"],
                "startYearData": [380,378,350,365,385,380,388],
                "endYearData": [365,369,360,370,368,365,370]
            }
        }
        var data = [param.data.startYearData,param.data.endYearData];
        var startBar=[],lineBar=[],max=0,min=data[0][0];
        var colors = ['#1db2f5','#f4663a'];
        for(var i=0; i<data[0].length; i++){
            max = max>data[0][i]?max:data[0][i];
            max = max>data[1][i]?max:data[1][i];
            min = min>data[0][i]?data[0][i]:min;
            min = min>data[1][i]?data[1][i]:min;
            if(data[0][i] >= data[1][i]) {// 上升
                startBar.push(data[1][i]);
                lineBar.push({
                    value:data[0][i]-data[1][i],
                    itemStyle:{ normal:{color:colors[0]}}
                });
            }else{//下降
                startBar.push(data[0][i]);
                lineBar.push({
                    value:data[1][i]-data[0][i],
                    itemStyle:{ normal:{color:colors[1]}}
                });
            }
        }
        var myChart = echarts.init(document.getElementById('chart01'));
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
                y:'0',
                right:'10%',
                textStyle:{
                    color:simple?'#333':'#70c1df',
                },
                data:param.data.statisticsDates
            },
            color:["#6fa1fb","#a0df3d"],
            xAxis:{
                type : 'category',
                data : param.data.month,
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
                min : min>10?(min-10):0,
                max : max+10,
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
            grid: {x: '50', x2: '30', y: '10', y2: '50'},
            series: [
                {
                    name:param.data.statisticsDates[0],
                    type:'line',
                    smooth: true,
                    symbolSize:14,
                    data:data[0]
                },
                {
                    name:param.data.statisticsDates[1],
                    type:'line',
                    smooth: true,
                    showSymbol: false,
                    symbolSize:'none',
                    itemStyle:{
                        normal:{
                            lineStyle: {
                                width:2
                            }
                        }
                    },
                    data:data[1]
                },
                {
                    name:param.data.statisticsDates[1],
                    type:'bar',
                    stack: '1',
                    barWidth: 6,
                    itemStyle:{
                        normal:{
                            color:'rgba(0,0,0,0)'
                        },
                        emphasis:{
                            color:'rgba(0,0,0,0)'
                        }
                    },
                    data:startBar
                },
                {
                    name:'变化',
                    type:'bar',
                    stack: '1',
                    data:lineBar
                }
            ]
        };
        myChart.setOption(option);
        myChart.on('click',function(pm){
            var year = pm.seriesName;
            var moth = pm.name;
            if(year==param.data.statisticsDates[0]){
                //localStorage.setItem('time',year+moth);
                //localStorage.setItem('type','25');//type=25同比分析--民意数量同比分析
                var p = '?type=25&time='+year+moth;
                window.open("./source_ays2.html"+p);
            }
        });
    }
    function chartType(){
        var data = {
            "status": 200,
            "data": {
                "statisticsDates": ["2017-02-17", "2017-02-18"],
                "showData": [
                    {
                        "opinionCount": [257, 329],
                        "opinionTypeCode": "ot01",
                        "opinionTypeName": "投诉举报"
                    },
                    {
                        "opinionCount": [316, 219],
                        "opinionTypeCode": "ot02",
                        "opinionTypeName": "建议"
                    },
                    {
                        "opinionCount": [316, 219],
                        "opinionTypeCode": "ot02",
                        "opinionTypeName": "求助"
                    },
                    {
                        "opinionCount": [316, 219],
                        "opinionTypeCode": "ot02",
                        "opinionTypeName": "咨询"
                    },
                    {
                        "opinionCount": [316, 219],
                        "opinionTypeCode": "ot02",
                        "opinionTypeName": "表扬"
                    }
                ]
            }
        }

        var xAxis=[],seriesData=[{name:'',data:[]},{name:'',data:[]}];
        for(var i=0;i<data.data.showData.length;i++){
            var item = data.data.showData[i];
            xAxis.push(item.opinionTypeName);
            seriesData[0].name = data.data.statisticsDates[0];
            seriesData[0].data.push({
                value:item.opinionCount[0],
                code:item.opinionTypeCode
            });
            seriesData[1].name = data.data.statisticsDates[1];
            seriesData[1].data.push({
                value:item.opinionCount[1],
                code:item.opinionTypeCode
            })
        }
        var myChart = echarts.init(document.getElementById('chart02'));
        var option = {
            tooltip: {
                trigger: 'axis',
                axisPointer : {
                    type : 'shadow'
                }
            },
            //calculable: true,
            legend: {
                y:'0',
                right:'10%',
                textStyle:{
                    color:simple?'#333':'#70c1df',
                },
                data:data.data.statisticsDates
            },
            xAxis: [{
                type: 'category',
                data: xAxis,
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
            }],
            color:simple?["#6199fb",'#ffa200']:["#00123d",'#ffa200'],
            yAxis: [{
                type: 'value',
                name: '',
                axisLabel: {
                    formatter: '{value}'
                    ,textStyle:{
                        color:simple?'#808080':'#2bc4fd'
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
            }],
            grid: {
                x: '50',
                x2: '30',
                y: '40',
                y2: '40'
            },
            series: [{
                name: seriesData[0].name,
                type: 'bar',
                barWidth:'20%',
                itemStyle:{
                    normal:{
                        borderWidth:1,
                        borderColor:simple?'rgba(0,0,0,0)':'#018afe',
                        barBorderRadius:[5, 5, 0, 0]
                    }
                },
                data:seriesData[0].data
            },{
                name: seriesData[1].name,
                type: 'bar',
                barWidth:'20%',
                itemStyle:{
                    normal:{
                        borderWidth:1,
                        borderColor:simple?'rgba(0,0,0,0)':'#018afe',
                        barBorderRadius:[5, 5, 0, 0]
                    }
                },
                data:seriesData[1].data
            }
            ]
        };
        myChart.setOption(option);
        myChart.on('click',function(param){
            //localStorage.setItem('type','26');//type=26同比分析--民意类型同比分析
            //localStorage.setItem('code',param.data.code);
            //localStorage.setItem('name',param.name);
            var pm = '?type=26&name='+param.name+'&code='+param.data.code;
            window.open("./classes_theme.html"+pm);
        });
    }

});
