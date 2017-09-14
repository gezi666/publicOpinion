/**
 * Created by 魏阁 on 2017-2-28.
 */
$(function(){
    //changeMenuTo("大数据预警");

    laydate({elem: '#date01', format: 'YYYY-MM-DD',fixed: false,
        choose: function(datas){ //选择日期完毕的回调
            //alert('得到：'+datas);
        }
    });

    initDepertTheme();
});

//初始化预警部门主题占比环图
function initDepertTheme(){
    var data={
        "status": 200,
        "data": {
            "dayTime": [
                "2017-02-20"
            ],
            "showData": [
                {
                    "topicCode": "top01",
                    "topicName": "公路建设养护",
                    "opinionCount": randomData()
                },
                {
                    "topicCode": "top02",
                    "topicName": "交通路网规划",
                    "opinionCount": randomData()
                },
                {
                    "topicCode": "top03",
                    "topicName": "出租车管理",
                    "opinionCount": randomData()
                },
                {
                    "topicCode": "top04",
                    "topicName": "航道管理",
                    "opinionCount": randomData()
                },
                {
                    "topicCode": "top05",
                    "topicName": "其他",
                    "opinionCount": randomData()
                }
            ]
        }
    };

    var dataColor =['#5ea8fd','#6ac73b','#ff9900','#f85812','#8e72fa'],
        chartTitle ='交通局预警主题占比';
    var dataName = [],seriesData=[];
    data.data.showData.forEach(function(p){
        dataName.push(p.topicName);
        seriesData.push({
            value:p.opinionCount,
            name:p.topicName
        })
    });
    var myChart = echarts.init(document.getElementById('deparPie'));
    var option = {
        title: {
            text: chartTitle,
            left:'center',
            top:'5%',
            textStyle: {
                color:simple?'#7989b0':'#00c7e2',
                fontSize: 18
            }
        },
        legend: {
            orient: 'vertical',
            itemHeight: 12,
            align: 'left',
            top: 'middle',
            left: '10%',
            icon:"circle",
            textStyle: {
                //color: '#a3a6af'
                color: simple?'#333':'#00c7e2'
            },
            data:dataName
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b} {c}',
            backgroundColor: 'transparent',
            position: ['45%', '10%'],
            padding: 10,
            textStyle: {
                fontSize: '14',
                color: '#5ea8fd'
            }
        },
        color: dataColor,
        series : [
            {
                name:'',
                type:'pie',
                radius : ['50%', '70%'],
                center : ['50%', '55%'],
                avoidLabelOverlap: false,
                labelLine:{
                    normal:{
                        show: false
                    }
                },
                label: {
                    normal: {
                        show: false
                    }
                },
                itemStyle:{
                    normal:{
                        borderColor:simple?'#fff':'#001218',
                        borderWidth:2
                    }
                },
                data:seriesData
            }
        ]
    };
    myChart.setOption(option);
    myChart.on('click',function(params){
        //$('#content').load("../html/war-weekTrend.html");    //联调时要带参数
        window.location.href = "../html/war-weekTrend.html";   //点击跳转的页面(联调时要带参数)
    });
    waterPolo('deparPie',myChart);
}