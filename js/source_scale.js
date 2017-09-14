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
    var code,name,type,time;
    function updateChart(){
        //type = localStorage.getItem('type');//type=0派发分析进入，type=1类型分析进入
        //code = localStorage.getItem('code');
        //name = localStorage.getItem('name');
        type = getUrlObj().type;
        code = getUrlObj().code;
        name = getUrlObj().name;
        time = getUrlObj().time;
        $('.title_chart').eq(0).text(name+'民意来源占比');
        $('.title_chart').eq(1).text(name+'民意来源数量分布');
        var data = {
            "status": 200,
            "data": {
                "statisticsDates": ["2017-02-17","2017-02-18"],
                "showData":[
                    {"topicCode":"top01", "topicName":"语音留言", "opinionCount":1600},
                    {"topicCode":"top02", "topicName":"手工录入", "opinionCount":560},
                    {"topicCode":"top03", "topicName":"手机短信", "opinionCount":530},
                    {"topicCode":"top04", "topicName":"电子邮箱", "opinionCount":430},
                    {"topicCode":"top05", "topicName":"网页", "opinionCount":110},
                    {"topicCode":"top06", "topicName":"电话", "opinionCount":360}
                ]
            }
        }
        chartPie(data);//来源占比
        chartBar(data);//来源数量分布
    }
    function chartPie(data) {
        var paramData = {
            id: 'chart01',
            color: ['#3e99ff', '#3e99ff', '#65b8ff', '#80d2ff', '#22cba1',
                '#2dd78d', '#3be47a', '#4bf25b', '#61ff23', '#8cff03',
                '#b5ff04', '#ffef07', '#ffc002', '#ffdd00', '#ffb100',
                '#ffb100', '#ff8004', '#f4632e', '#4f90ec'],
            legendGrid: {right: '20', bottom: '10%',},
            center: ['50%', '50%'],
            radius: ['30%', '50%'],
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
            //localStorage.setItem('name',name+'-'+param.name);
            //type=0首页民意变化趋势,type=01民意来源占比
            //type==='23'&&code.split('-').length<=2 来源分析--民意来源占比
            //type=24 来源分析--民意来源对比
            //type=25同比分析--民意数量同比分析
            //type=27同比分析--民意来源同比分析
            //type=28环比分析--民意来源环比分析
            var pm = '?type='+type+'&time='+time+'&name='+name+'-'+param.name+'&code='+code+'-'+param.data.code;
            if((type==='23'&&code.split('-').length<=2)){
                //updateChart();
                window.location.href = './source_scale.html'+pm;
            }else if(type==='01'||type==='27'||type==='28'){
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
                x: '60',
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
            //type=0首页民意变化趋势,type=01民意来源占比
            //type==='23'&&code.split('-').length<=2 来源分析--民意来源占比
            //type=24 来源分析--民意来源对比
            //type=25同比分析--民意数量同比分析
            //type=27同比分析--民意来源同比分析
            //type=28环比分析--民意来源环比分析
            var pm = '?type='+type+'&time='+time+'&name='+name+'-'+param.name+'&code='+code+'-'+param.data.code;
            if((type==='23'&&code.split('-').length<=2)){
                //updateChart();
                window.location.href = './source_scale.html'+pm;
            }else if(type==='01'||type==='27'||type==='28'){
                window.location.href = './classes_theme.html'+pm;
            }else{
                window.location.href = './person_gov_search.html'+pm;
            }
        });
    }
});
