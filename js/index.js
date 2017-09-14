/**
 * Created by yyg on 2017/2/23.
 */
$(document).ready(function(){
    laydate({elem: '#date01', format: 'YYYY/MM/DD',
        choose: function(datas){ //选择日期完毕的回调
            $(this.elem).next().trigger('click');//调用第二个日历控件
            //alert('得到：'+datas);
        }
    });
    laydate({elem: '#date02', format: 'YYYY/MM/DD',
        choose: function(datas){ //选择日期完毕的回调
            //alert('得到：'+datas);
        }
    });
    laydate({elem: '#date03', format: 'YYYY/MM/DD',
        choose: function(datas){ //选择日期完毕的回调
            $(this.elem).next().trigger('click');//调用第二个日历控件
            //alert('得到：'+datas);
        }
    });
    laydate({elem: '#date04', format: 'YYYY/MM/DD',
        choose: function(datas){ //选择日期完毕的回调
            //alert('得到：'+datas);
        }
    });
    //点击民意预警情况
    $('#warningId').on('click',function(){
        //$('.menu li').eq(3).trigger('click');//相当于点击了"大数据预警"
        window.open('./war-index.html');
    });
    //点击我的监测
    $('#myCheckId').on('click',function(){
        //$('.menu li').eq(5).trigger('click');
        window.open('./opinionMonitoring.html')
    });

    var tit="政府渠道民意";
    $('.v_menu span').on('click',function(){
        $(this).addClass('active').siblings().removeClass('active');
        tit = $(this).text();
        chartMap();
        chartSoure();//民意来源占比
        chartTop();//top10
        chartChange();//民意变化趋势
        if($(this).index()==1){//网络民意
            $('.y_bottom').hide();
        }else{
            $('.y_bottom').show();
            chartDegree();//满意度
            chartDealWith();//一次办结力，多次转办，超时承办
        }
    });
    initData = function(){
        chartFeel();//政府渠道民意情感占比
        chartMap();
        chartSoure();//民意来源占比
        chartTop();//top10
        chartChange();//民意变化趋势
        chartDegree();//满意度
        chartDealWith();//一次办结力，多次转办，超时承办
    }
    initData();
    function chartFeel(){
        var data = {
            "status": 200,
            "data": {
                "statisticsDates": ["2017-02-17", "2017-02-18"],
                "showData":[
                    {
                        name:'政府渠道民意情感占比',
                        data:[
                            {"name": "正面", "opinionCount": 1125},
                            {"name": "中立", "opinionCount": 2132},
                            {"name": "负面", "opinionCount": 2132}
                        ]
                    },
                    {
                        name:'网络民意情感占比',
                        data:[
                            {"name": "正面", "opinionCount": 2125},
                            {"name": "中立", "opinionCount": 2832},
                            {"name": "负面", "opinionCount": 1132}
                        ]
                    }
                ]
            }
        };
        var seriesDatas = [];
        for(var i=0;i<data.data.showData.length;i++){
            var item = data.data.showData[i];
            var paramData = {
                id:'',
                color:['#ff9500','#6191fa','#27b551'],
                titleColor:simple?'#7989b0':'#00c7e2',
                title:item.name,
                titleGrid:{top:'85%',left:'18%'},
                legendGrid:{ bottom: '10%', right: '10%'},
                radius: ['50%', '70%'],
                center: ['30%', '45%'],
                data:[]
            };
            for(var j=0;j<item.data.length;j++){
                paramData.data.push({
                    value:item.data[j].opinionCount,
                    name:item.data[j].name
                })
            }
            seriesDatas.push(paramData);
        }
        resetOpt();
        seriesDatas[0].id = 'chart01';
        initPie(seriesDatas[0]);
        seriesDatas[1].id = 'chart02';
        seriesDatas[1].titleGrid={top:'85%',left:'20%'};
        resetOpt();
        initPie(seriesDatas[1]);
    }
    function chartMap(){
        var data = {
            id:'chart03',
            title:tit+'区域分布',
            titleColor:simple?'#7989b0':'#00c7e2',
            color:simple?['#51a3ff','#d7e9fa']:['#0cc4f9','#004ea4'],
            mapJson:jijing,
            data:[
              {name: '嘉祥县',code:'001',value: randomData()},
              {name: '金乡县',code:'001',value: randomData()},
              {name: '梁山县',code:'001',value: randomData()},
              {name: '曲阜市',code:'001',value: randomData()},
              {name: '任城区',code:'001',value: randomData()},
              {name: '微山县',code:'001',value: randomData()},
              {name: '鱼台县',code:'001',value: randomData()},
              {name: '邹城市',code:'001',value: randomData()},
              {name: '兖州区',code:'001',value: randomData()},
              {name: '汶上县',code:'001',value: randomData()},
              {name: '泗水县',code:'001',value: randomData()},
              {name: '高新区',code:'001',value: randomData()},
              {name: '太白湖区',code:'001',value: randomData()},
              {name: '经济技术开发区',code:'001',value: randomData()}
           ]
        };
        var myChart = initMap(data);
        myChart.on('click',function(p){
            //localStorage.setItem('type', 0);
            //localStorage.setItem('code', p.data.code);
            //localStorage.setItem('name', p.data.name);
            var pm = '?type=0&code='+p.data.code+'&name='+p.data.name;
            window.open('./p_type_ays.html'+pm);
        });
    }
    function chartTop(){
        var data = {
            "status": 200,
            "data": {
                "statisticsDates": ["2017-02-17","2017-02-18"],
                "showData":[
                    {
                        "topicCode":"top01",
                        "topicName":"城建管理",
                        "opinionCount":600
                    },
                    {
                        "topicCode":"top02",
                        "topicName":"人事劳动",
                        "opinionCount":560
                    },
                    {
                        "topicCode":"top03",
                        "topicName":"交通管理",
                        "opinionCount":530
                    },
                    {
                        "topicCode":"top04",
                        "topicName":"社会治安",
                        "opinionCount":430
                    },
                    {
                        "topicCode":"top05",
                        "topicName":"资源环境",
                        "opinionCount":410
                    },
                    {
                        "topicCode":"top06",
                        "topicName":"民生问题",
                        "opinionCount":360
                    },
                    {
                        "topicCode":"top07",
                        "topicName":"劳动保障",
                        "opinionCount":310
                    },
                    {
                        "topicCode":"top08",
                        "topicName":"民政",
                        "opinionCount":305
                    },
                    {
                        "topicCode":"top09",
                        "topicName":"公安",
                        "opinionCount":300
                    },
                    {
                        "topicCode":"top10",
                        "topicName":"环境",
                        "opinionCount":280
                    }
                ]
            }
        }
        var xAxis=[],seriesData=[];
        for(var i=0;i<data.data.showData.length;i++){
            var item = data.data.showData[i];
            xAxis.push(item.topicName);
            seriesData.push({
                value:item.opinionCount,
                code:item.topicCode
            });
        }
        var myChart = echarts.init(document.getElementById('chart04'));
        var option = {
            title: {
                text:tit+ '热点主题top10',
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
                y2: '40'
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
        myChart.on('click',function(d){
            var pm = '?code='+d.data.code+'&name='+d.name;
            window.open('./person_gov_search.html'+pm);
        });
    }
    function chartChange(){
        var data = {
            "status": 200,
            "data": {
                "statisticsDates": ["2017-02-17","2017-02-18"],
                "dates":["2017-02-16", "2017-02-17", "2017-02-18", "2017-02-19","2017-02-20"],
                "showData":[213,12,125,231,100]
            }
        };
        var myChart = echarts.init(document.getElementById('chart05'));
        var option = {
            title: {
                text: tit+'变化趋势',
                left:'center',
                top:'10',
                textStyle: {
                    color:simple?'#7989b0':'#00c7e2',
                    fontSize: 14
                }
            },
            tooltip: {
                trigger: 'axis'
            },
            grid: {
                x: '50',
                x2: '30',
                y: '40',
                y2: '50'
            },
            xAxis:  {
                type: 'category',
                axisLabel:{
                    textStyle:{
                        color:simple?'#333':'#2bc4fd'
                    }
                },
                axisLine:{
                    lineStyle:{
                        color:simple?'#d9d9d9':'#62e2dd'
                    }
                },
                data: data.data.dates
            },
            yAxis: {
                type: 'value',
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
                    show:false
                }
            },
            color:simple?['#5d97fc']:['#ffd200'],
            series: [
                {
                    name:'全部',
                    type:'line',
                    data:data.data.showData,
                    symbol:'pin',
                    smooth:true,
                    symbolSize:14
                }
            ]
        };
        myChart.setOption(option);
        myChart.on('click',function(d){
            var pm = '?type=0&time='+d.name+'&name=&code=';
            window.open('./p_source_ays.html'+pm);
        });
    }
    function chartSoure(){
        var data = {
            "status": 200,
            "data": {
                "statisticsDates": ["2017-02-17", "2017-02-18"],
                "showData": [
                    {
                        "originCode": "origin01",
                        "originName": "市长热线12345",
                        "opinionCount": 2132
                    },
                    {
                        "originCode": "origin02",
                        "originName": "公安局",
                        "opinionCount": 2192
                    },
                    {
                        "originCode": "origin03",
                        "originName": "信访局",
                        "opinionCount": 2192
                    },
                    {
                        "originCode": "origin04",
                        "originName": "督查室",
                        "opinionCount": 2192
                    },
                    {
                        "originCode": "origin05",
                        "originName": "城管局",
                        "opinionCount": 2192
                    },
                    {
                        "originCode": "origin06",
                        "originName": "民生通",
                        "opinionCount": 2192
                    }
                ]
            }
        };
        var paramData = {
            id:'chart06',
            title:tit+'来源占比',
            color:['#ff9500','#5dacfe','#609dfc','#68c63b','#7b6cf8','#fe6136'],
            titleColor:simple?'#7989b0':'#00c7e2',
            titleGrid:{top:'10',left:'center'},
            legendGrid:{ bottom: '10%', left: '10%'},
            radius: ['50%', '70%'],
            center: ['60%', '55%'],
            data:[]
        };
        for(var i=0;i<data.data.showData.length;i++){
            paramData.data.push({
                value:data.data.showData[i].opinionCount,
                code:data.data.showData[i].originCode,
                name:data.data.showData[i].originName
            })
        }
        waterPoloOpt = {legend:true,isMouse:true,defaultParam:{percent: '0', color: simple?'#3373e6':'#00fffc'}};
        var myChart = initPie(paramData);
        myChart.on('click',function(d){
            //localStorage.setItem('time', '');
            //localStorage.setItem('code', d.data.code);
            //localStorage.setItem('name', d.data.name);
            //localStorage.setItem('type', '01');
            var pm = '?type=01&time=&name='+d.data.name+'&code='+d.data.code;
            window.open('./source_scale.html'+pm);
        });
    }
    function chartDegree(){
        var data ={
            "status": 200,
             "data": {
                "statisticsDates": ["2017-02-17", "2017-02-18"],
                "satisfiedCount": 56,
                "status": "0"
            }
        };
        var paramData = {
            id:'chart07',
            color:['#e8e8e8','#fc8f2f'],
            radius: ['50%', '70%'],
            center: ['60%', '50%'],
            data:[
                {value:(100-data.data.satisfiedCount)},
                {value:data.data.satisfiedCount}
            ]
        };
        waterPoloOpt.isMouse = false;//进入鼠标滑过更新
        waterPoloOpt.defaultParam.percent = data.data.satisfiedCount;//初始化百分比
        waterPoloOpt.defaultParam.color = '#fc8f2f';//初始化颜色
        waterPoloOpt.legend = false;//隐藏图例
        initPie(paramData);
    }
    function chartDealWith(){
        //一次办结率
        var oneData = {
            "status": 200,
            "data": {
                "statisticsDates": ["2017-02-17", "2017-02-18"],
                "onceRate": 79.59
            }
        };
        waterPoloOpt.defaultParam.percent = oneData.data.onceRate;//初始化百分比
        waterPoloOpt.defaultParam.color = '#fc8f2f';//初始化颜色
        initPie({
            id:'chart08',
            title:'一次办结率',
            titleColor:simple?'#7989b0':'#00c7e2',
            titleGrid:{top:'82%',left:'center'},
            color:['#e8e8e8','#ff9507'],
            radius: ['60%', '70%'],
            center:['50%', '45%'],
            data:[
                {value:(100-oneData.data.onceRate)},
                {value:oneData.data.onceRate}
            ]
        });

        //多次转办率
        var twoData = {
            "status": 200,
            "data": {
                "statisticsDates": ["2017-02-17", "2017-02-18"],
                "onceRate": 30
            }
        };
        waterPoloOpt.defaultParam.percent = twoData.data.onceRate;//初始化百分比
        waterPoloOpt.defaultParam.color = '#02b04f';//初始化颜色
        initPie({
            id:'chart09',
            title:'多次转办率',
            titleColor:simple?'#7989b0':'#00c7e2',
            titleGrid:{top:'82%',left:'center'},
            color:['#e8e8e8','#02b04f'],
            radius: ['60%', '70%'],
            center:['50%', '45%'],
            data:[
                {value:(100-twoData.data.onceRate)},
                {value:twoData.data.onceRate}
            ]
        });

        //超时承办率
        var threeData = {
            "status": 200,
            "data": {
                "statisticsDates": ["2017-02-17", "2017-02-18"],
                "onceRate": 11
            }
        };
        waterPoloOpt.defaultParam.percent = threeData.data.onceRate;//初始化百分比
        waterPoloOpt.defaultParam.color = '#f15018';//初始化颜色
        initPie({
            id:'chart10',
            title:'超时承办率',
            titleColor:simple?'#7989b0':'#00c7e2',
            titleGrid:{top:'82%',left:'center'},
            color:['#e8e8e8','#f15018'],
            radius: ['60%', '70%'],
            center:['50%', '45%'],
            data:[
                {value:(100-threeData.data.onceRate)},
                {value:threeData.data.onceRate}
            ]
        });

    }
});
