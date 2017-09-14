/**
 * Created by 魏阁 on 2017-3-8.
 */
$(function(){
    laydate({elem: '#date01', format: 'YYYY/MM/DD',
        choose: function(datas){ //选择日期完毕的回调
            //alert('得到：'+datas);
        }
    });
    laydate({elem: '#date02', format: 'YYYY/MM/DD',
        choose: function(datas){ //选择日期完毕的回调
            //alert('得到：'+datas);
        }
    });
    $('.more').on('click',function(){
        window.location.href = "person_gov_search.html";     //网络民意查询
    });

    $('.search_list tr').on('click',function(){
        $('#content').load('./person_gov_detail.html');
    });

    initData = function(){
        chartMediaLine1();//网络民意变化趋势
        chartMediaPie1();//网络民意情感占比
        chartMapCity1();//网络民意区域分析
        //newPerson1();//网络民意跟踪
    };
    initData();
});

function chartMediaLine1(){
    var data  = {
        "status": 200,
        "data": {
            "statisticsDates": ["2016-01","2016-02"],
            "dates": ["2016-01","2016-02","2016-03","2016-04","2016-05","2016-06","2016-07","2016-08","2016-09","2016-10","2016-11","2016-12"],
            "showData": [
                {"code": "origin01","name": "全部", "opinionCount": [4,9,7,10,35,20,22,24,28,20,18,16]},
                {"code": "origin02","name": "新闻", "opinionCount": [24,29,27,10,45,60,42,34,38,10,48,26]},
                {"code": "origin03","name": "微博", "opinionCount": [14,12,7,16,10,35,20,22,24,20,28,12]},
                {"code": "origin04","name": "贴吧", "opinionCount": [4,12,7,16,10,25,20,22,24,20,28,12]},
                {"code": "origin05","name": "微信", "opinionCount": [6,12,7,16,30,38,30,22,24,20,38,22]},
                {"code": "origin06","name": "论坛", "opinionCount": [16,12,7,16,10,35,26,22,34,20,28,32]}
            ]
        }
    };
    var legend = [],seriesData=[];
    for(var i=0;i<data.data.showData.length;i++){
        var item = data.data.showData[i];
        legend.push(item.name);
        seriesData.push({
            name:item.name,
            type:'line',
            smooth:false,
            symbolSize:10,
            data:item.opinionCount
        });
    }
    var myChart = echarts.init(document.getElementById('chart01'));
    var option = {
        tooltip: {
            trigger: 'axis'
        },
        legend:{
            icon:'circle',
            y:'0',
            right:'10%',
            textStyle:{
                color:simple?'#333':'#70c1df'
            },
            data:legend
        },
        grid: {x: '50', x2: '30', y: '20', y2: '40'},
        color:['#ff9500','#ff285c','#704b17','#3dd1d3','#f7dc2d','#66c53d','#6386f8','#5eaefe','#fbc306','#ff892b','#ff4642'],
        xAxis:  {
            type: 'category',
            data: data.data.dates,
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
            type: 'value',
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
        series: seriesData
    };
    myChart.setOption(option);
}
function chartMediaPie1(){
    var data = {
        "status": 200,
        "data": {
            "statisticsDates": ["2017-02-17", "2017-02-18"],
            "showData": [
                {
                    "opinionTypeCode": "mt01",
                    "opinionTypeName": "负面",
                    "opinionCount": 2132
                },
                {
                    "opinionTypeCode": "mt02",
                    "opinionTypeName": "正面",
                    "opinionCount": 2132
                },
                {
                    "opinionTypeCode": "mt03",
                    "opinionTypeName": "中性",
                    "opinionCount": 2132
                }
            ]
        }
    };
    var paramData = {
        id:'chart02',
        color:['#ff9500','#5dacfe','#609dfc','#68c63b','#7b6cf8','#fe6136'],
        legendGrid:{ left: '5%', bottom: '10%'},
        radius: ['50%', '80%'],
        center: ['50%', '50%'],
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
    initPie(paramData);
}
function chartMapCity1(){
    var data ={
        "status": 200,
        "data": {
            "statisticsDates": [
                "2017-02-17",
                "2017-02-18"
            ],
            "areaData": [
                {"areaCode": "370850","areaName": "高新区","opinionCount": randomData()},
                {"areaCode": "370828","areaName": "金乡县","opinionCount": randomData()},
                {"areaCode": "370812","areaName": "兖州区","opinionCount": randomData()},
                {"areaCode": "370850","areaName": "嘉祥县","opinionCount": randomData()},
                {"areaCode": "370828","areaName": "梁山县","opinionCount": randomData()},
                {"areaCode": "370812","areaName": "曲阜市","opinionCount": randomData()},
                {"areaCode": "370850","areaName": "任城区","opinionCount": randomData()},
                {"areaCode": "370828","areaName": "微山县","opinionCount": randomData()},
                {"areaCode": "370812","areaName": "鱼台县","opinionCount": randomData()},
                {"areaCode": "370850","areaName": "邹城市","opinionCount": randomData()},
                {"areaCode": "370828","areaName": "汶上县","opinionCount": randomData()},
                {"areaCode": "370812","areaName": "泗水县","opinionCount": randomData()},
                {"areaCode": "370850","areaName": "太白湖区","opinionCount": randomData()},
                {"areaCode": "370828","areaName": "经济技术开发区","opinionCount": randomData()}
            ]
        }
    };

    var mapData =[];
    data.data.areaData.forEach(function(p){
        mapData.push({
            name: p.areaName,
            value: p.opinionCount
        })
    });

    var mapParam = {
        id:'chart03',
        titleColor:simple?'#7989b0':'#00c7e2',
        color:simple?['#51a3ff','#d7e9fa']:['#0cc4f9','#004ea4'],
        mapJson:jijing,
        data:mapData
    };
    initMap(mapParam);
}
function newPerson1(){
    var data ={
        "status": 200,
        "data": {
            "statisticsDates": [
                "2017-02-17",
                "2017-02-18"
            ],
            "showData": [
                {
                    "opinionId": "民意id",
                    "userName": "姓名",
                    "opinionTypeCode": "诉求类型代码",
                    "opinionTypeName": "诉求类型名称",
                    "originCode": "来源代码",
                    "originName": "来源名称",
                    "opinionTitle": "标题",
                    "opinioContent": "内容",
                    "eventTime": "时间"
                },
                {
                    "opinionId": "民意id",
                    "userName": "姓名",
                    "opinionTypeCode": "诉求类型代码",
                    "opinionTypeName": "诉求类型名称",
                    "originCode": "来源代码",
                    "originName": "来源名称",
                    "opinionTitle": "标题",
                    "opinioContent": "内容",
                    "eventTime": "时间"
                }
            ]
        }
    };

    var listData = template('searchListId', data.data);
    $('.search_list').html(listData);

    $('.net_search li').on('click',function(){
        window.open($(this).attr('chref'));
    });

}