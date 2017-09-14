/**
 * Created by yyg on 2017/2/28.
 */
$(document).ready(function(){
    laydate({elem: '#year02', format: 'YYYY',
        choose: function(datas){ //选择日期完毕的回调
            //alert('得到：'+datas);
        }
    });
    initData = function(){
        chartType();
    }
    initData();
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
        };

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
                        color:simple?'#333':'#2bc4fd'
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
            //localStorage.setItem('type','29');//type=29环比分析--民意类型环比分析
            //localStorage.setItem('code',param.data.code);
            //localStorage.setItem('name',param.name);
            var pm = '?type=29&time=&name='+param.name+'&code='+param.data.code;
            window.open("./classes_theme.html"+pm);
        });
    }

});
