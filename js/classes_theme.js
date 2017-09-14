/**
 * Created by yyg on 2017/3/4.
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
        updateChart();
    }
    initData();
    var code,name,type;
    function updateChart(){
        //type=0派发分析，type=1类型分析，3区域分析，4同比分析，5环比分析
        //type = localStorage.getItem('type');
        //code = localStorage.getItem('code');
        //name = localStorage.getItem('name');
        type = getUrlObj().type;
        code = getUrlObj().code;
        name = getUrlObj().name;
        $('.title_chart').eq(0).text(name+'民意主题占比');
        $('.title_chart').eq(1).text(name+'民意主题数量分布');
        var data = {
            "status": 200,
            "data": {
                "statisticsDates": ["2017-02-17","2017-02-18"],
                "showData":[
                    {"topicCode":"top01", "topicName":"城建管理", "opinionCount":1600},
                    {"topicCode":"top02", "topicName":"人事劳动", "opinionCount":560},
                    {"topicCode":"top03", "topicName":"交通管理", "opinionCount":530},
                    {"topicCode":"top04", "topicName":"社会治安", "opinionCount":430},
                    {"topicCode":"top05", "topicName":"资源环境", "opinionCount":110},
                    {"topicCode":"top06", "topicName":"民生问题", "opinionCount":360},
                    {"topicCode":"top07", "topicName":"劳动保障", "opinionCount":310},
                    {"topicCode":"top08", "topicName":"民政", "opinionCount":305},
                    {"topicCode":"top09", "topicName":"公安", "opinionCount":300},
                    {"topicCode":"top10", "topicName":"环境", "opinionCount":280}
                ]
            }
        }
        chartPie(data);//主题占比
        chartBar(data);//主题数量分布
    }
    function chartPie(data) {
        var paramData = {
            id: 'chart01',
            color: ['#3e99ff', '#3e99ff', '#65b8ff', '#80d2ff', '#22cba1',
                '#2dd78d', '#3be47a', '#4bf25b', '#61ff23', '#8cff03',
                '#b5ff04', '#ffef07', '#ffc002', '#ffdd00', '#ffb100',
                '#ffb100', '#ff8004', '#f4632e', '#4f90ec'],
            legendGrid: {right: '15', bottom: '10%'},
            center: ['45%', '50%'],
            radius: ['30%', '45%'],
            data: []
        };
        for (var i = 0; i < data.data.showData.length; i++) {
            paramData.data.push({
                value: data.data.showData[i].opinionCount,
                code: data.data.showData[i].topicCode,
                name: data.data.showData[i].topicName
            })
        }
        resetOpt();//重置默认配置
        waterPoloOpt.labelLine = true;//使用标线
        waterPoloOpt.legend = true;//使用图例
        var myChart = initPie(paramData);
        myChart.on('click',function(param){
            //localStorage.setItem('code',code+'-'+param.data.code);
            //localStorage.setItem('name',name+'-'+param.data.name);
            /*
              1,code.split('-').length<=2&&type==0首页地图进入
              2,code.split('-').length<=2&&type==2派发分析--类型分析
              3,code.split('-').length<=1&&type==='20'类型分析--民意类型占比--民意主题占比
              4,code.split('-').length<=1&&type=21 类型分析--各类型民意指向部门top10
              5,code.split('-').length<=1&&type=22 区域分析--民意区域占比
              6,code.split('-').length<=2&&type==='26' 同比分析--民意类型同比分析
              7,code.split('-').length<=2&&type==='27' 同比分析--民意来源同比分析
              8,code.split('-').length<=2&&type==='28' 环比分析--民意来源环比分析
              9,code.split('-').length<=2&&type==='29' 环比分析--民意类型环比分析
            */
            var pm = '?type='+type+'&code='+code+'-'+param.data.code+'&name='+name+'-'+param.data.name;
            if((code.split('-').length<=2&&type==0)||
                (code.split('-').length<=2&&type==2)||
                (code.split('-').length<=1&&type==='20')||
                (code.split('-').length<=2&&type==='21')||
                (code.split('-').length<=2&&type==='22')||
                (code.split('-').length<=1&&type==='26')||
                (code.split('-').length<=2&&type==='27')||
                (code.split('-').length<=2&&type==='28')||
                (code.split('-').length<=1&&type==='29')||
                (code.split('-').length<=2&&type==='01')){
                window.location.href = './classes_theme.html'+pm;
            }else{
                window.location.href = './person_gov_search.html'+pm;
            }
        });
    }
    function chartBar(data){
        var xAxis=[],seriesData=[];
        for(var i=0;i<data.data.showData.length;i++){
            var item = data.data.showData[i];
            xAxis.push(item.topicName);
            seriesData.push({
                value:item.opinionCount,
                code:item.topicCode
            });
        }
        var myChart = echarts.init(document.getElementById('chart02'));
        var option = {
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
                        color:simple?'#333':'#2bc4fd'
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
                axisLabel:{
                    formatter: '{value}',
                    textStyle:{
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
                y2: '100'
            },
            series: [{
                name: '2016年8月',
                type: 'bar',
                barWidth:'40%',
                itemStyle:{
                    normal:{
                        borderWidth:1,
                        borderColor:simple?'rgba(0,0,0,0)':'#018afe',
                        barBorderRadius:[5, 5, 0, 0]
                    },
                    emphasis:{
                        color:'#ffb800'
                    }
                },
                data:seriesData
            }]
        };
        myChart.setOption(option);
        myChart.on('click',function(param){
            //localStorage.setItem('code',code+'-'+param.data.code);
            //localStorage.setItem('name',name+'-'+param.name);
            /*
             1,code.split('-').length<=2&&type==0首页地图进入
             2,code.split('-').length<=2&&type==2派发分析--类型分析
             3,code.split('-').length<=1&&type==='20'类型分析--民意类型占比--民意主题占比
             4,code.split('-').length<=1&&type=21 类型分析--各类型民意指向部门top10
             5,code.split('-').length<=1&&type=22 区域分析--民意区域占比
             6,code.split('-').length<=2&&type==='26' 同比分析--民意类型同比分析
             7,code.split('-').length<=2&&type==='27' 同比分析--民意来源同比分析
             8,code.split('-').length<=2&&type==='28' 环比分析--民意来源环比分析
             9,code.split('-').length<=2&&type==='29' 环比分析--民意类型环比分析
             10,code.split('-').length<=2&&type==='01'首页--民意来源占比
             */
            var pm = '?type='+type+'&code='+code+'-'+param.data.code+'&name='+name+'-'+param.data.name;
            if((code.split('-').length<=2&&type==0)||
                (code.split('-').length<=2&&type==2)||
                (code.split('-').length<=1&&type==='20')||
                (code.split('-').length<=2&&type==='21')||
                (code.split('-').length<=2&&type==='22')||
                (code.split('-').length<=1&&type==='26')||
                (code.split('-').length<=2&&type==='27')||
                (code.split('-').length<=2&&type==='28')||
                (code.split('-').length<=1&&type==='29')||
                (code.split('-').length<=2&&type==='01')){
                window.location.href = './classes_theme.html'+pm;
            }else{
                window.location.href = './person_gov_search.html'+pm;
            }
        });
    }
});
