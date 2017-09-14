/**
 * Created by 魏阁 on 2017-3-1.
 */
$(function(){
    //changeMenuTo("大数据预警");
    initWeekTrend();
});

//初始化预警部门主题本周变化趋势图
function initWeekTrend(){
    var data ={
        "status": 200,
        "data": {
            "statisticsDates": [
                "2017-01-17",
                "2017-02-18"
            ],
            "dates": [
                "2017-02-01",
                "2017-02-02",
                "2017-02-03",
                "2017-02-04",
                "2017-02-05",
                "2017-02-06",
                "2017-02-07"
            ],
            "opinionType": {
                "opinionTypeCode": "opinion01",
                "opinionTypeName": "投诉举报",
                "opinionCount": [randomData(),randomData(),randomData(),randomData(),randomData(),randomData(),randomData()]
            }
        }
    };
    var chartTitle ='交通局 - 出租车管理投诉举报本周变化',
        xAxisData = data.data.dates,
        yAxisData = data.data.opinionType.opinionCount;
    var myChart = echarts.init(document.getElementById('weekTrend'));
    var option = {
        title: {
            text:chartTitle,
            left:'center',
            top:'5%',
            textStyle: {
                color:simple?'#7989b0':'#00c7e2',
                fontSize: 18
            }
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            show:false
        },
        color:['#88a2f9'],
        xAxis:  {
            type: 'category',
            name:'时间',
            nameTextStyle: {
                color: simple?'#000':'#00c7e2'
            },
            boundaryGap: false,
            axisLine: {
                lineStyle: {
                    color: simple?'#d9d9d9':'#62e2dd'
                }
            },
            axisLabel: {
                textStyle: {
                    color: simple?'#333':'#00c7e2'
                }
            },
            axisTick:{
                show:false
            },
            data: xAxisData
        },
        yAxis: {
            type: 'value',
            name:'投诉举报数量',
            nameTextStyle: {
                color: simple?'#000':'#00c7e2'
            },
            nameGap: 20,
            axisLine: {
                lineStyle: {
                    color: simple?'#d9d9d9':'#62e2dd'
                }
            },
            axisLabel: {
                formatter: '{value}',
                textStyle: {
                    color: simple?'#333':'#00c7e2'
                }
            },
            splitLine: {
                show:false
            },
            axisTick:{
                show:false
            }
        },
        series: [
            {
                name:'数量',
                type:'line',
                smooth: true,
                smoothMonotone: 'x',
                showSymbol: false,
                symbolSize:12,
                data:yAxisData
            }
        ]
    };
    myChart.setOption(option);
    myChart.on('click',function(params){
        //$('#content').load("../html/person_search.html");    //联调时要带参数
        window.location.href = "../html/person_gov_search.html";   //点击跳转的页面(联调时要带参数)
    });
}