/**
 * Created by yyg on 2017/3/1.
 */
(function(){
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
        $('.menu li').eq(4).trigger('click');//相当于点击民意查询
    });
    initData = function(){
        chartMediaLine();//各媒体民意走势
        chartMediaPie();//各媒体民意占比
        chartFeelLine();//各情感民意走势
        chartMediaTop();//媒体民意来源Top10
        chartPieFeel();//情感分布
        chartPieFeelSource();//情感分布-负面信息来源媒体
        chartMapCity();//市
        $.get('../js/shandong.json', function(mapJson) {
            chartMapProvince(mapJson);//省地图
        });
        $.get('../js/china.json', function(mapJson) {
            chartMapChina(mapJson);//中国地图
        });
        newPerson();//最新民意
    }
    initData();
    function chartMediaPie(){
        var data = {
            "status": 200,
            "data": {
                "statisticsDates": ["2017-02-17", "2017-02-18"],
                "showData": [
                    {
                        "mediaTypeCode": "mt01",
                        "mediaTypeName": "微信",
                        "opinionCount": 2132
                    },
                    {
                        "mediaTypeCode": "mt02",
                        "mediaTypeName": "微博",
                        "opinionCount": 2132
                    },
                    {
                        "mediaTypeCode": "mt03",
                        "mediaTypeName": "新闻",
                        "opinionCount": 2132
                    },
                    {
                        "mediaTypeCode": "mt02",
                        "mediaTypeName": "贴吧",
                        "opinionCount": 2132
                    }
                ]
            }
        };
        var paramData = {
            id:'chart02',
            color:['#ff9500','#5dacfe','#609dfc','#68c63b','#7b6cf8','#fe6136'],
            legendGrid:{ right: '20%', bottom: '10%'},
            radius: ['50%', '80%'],
            center: ['40%', '50%'],
            data:[]
        };
        for(var i=0;i<data.data.showData.length;i++){
            paramData.data.push({
                value:data.data.showData[i].opinionCount,
                code:data.data.showData[i].mediaTypeCode,
                name:data.data.showData[i].mediaTypeName
            })
        }
        resetOpt();//重置默认配置
        initPie(paramData);
    }
    function chartMediaLine(){
        var data  = {
            "status": 200,
            "data": {
                "statisticsDates": ["2016-01","2016-02"],
                "dates": ["2016-01","2016-02","2016-03","2016-04","2016-05","2016-06","2016-07","2016-08","2016-09","2016-10","2016-11","2016-12"],
                "allData": [3,7,4],
                "mediaData": [
                    {"name": "全部", "value": [4,9,7,10,35,20,22,24,28,20,18,16]},
                    {"name": "新闻", "value": [4,9,7,10,35,20,22,24,28,20,18,16]},
                    {"name": "论坛", "value": [14,12,7,16,10,35,20,22,24,20,28,12]},
                    {"name": "博客", "value": [4,12,7,16,10,25,20,22,24,20,28,12]},
                    {"name": "微博", "value": [6,12,7,16,30,38,30,22,24,20,38,22]},
                    {"name": "微信", "value": [16,12,7,16,10,35,26,22,34,20,28,32]},
                    {"name": "贴吧", "value": [4,12,17,16,19,25,20,28,24,26,28,12]}
                ]
            }
        };
        var legend = [],seriesData=[];
        for(var i=0;i<data.data.mediaData.length;i++){
            var item = data.data.mediaData[i];
            legend.push(item.name);
            seriesData.push({
                name:item.name,
                type:'line',
                smooth:true,
                symbolSize:'none',
                data:item.value
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
                    color:simple?'#333':'#70c1df',
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
    function chartFeelLine(){
        var data  = {
            "status": 200,
            "data": {
                "statisticsDates": ["2016-01","2016-02"],
                "dates": ["2016-01","2016-02","2016-03","2016-04","2016-05","2016-06","2016-07","2016-08","2016-09","2016-10","2016-11","2016-12"],
                "showData": [
                    {
                        name:'网络渠道',
                        code:'',
                        data:[
                            {
                                "name": "正面",
                                "code": "codd01",
                                "opinionCount": [4,9,7,10,35,20,22,24,28,20,18,26]
                            },
                            {
                                "name": "中立",
                                "code": "codd02",
                                "opinionCount": [14,19,10,20,35,20,22,24,28,20,13,16]
                            },
                            {
                                "name": "负面",
                                "code": "codd03",
                                "opinionCount": [14,12,7,16,10,35,20,22,24,10,28,12]
                            }
                        ]
                    }
                ]
            }
        };
        var legend = [],seriesData=[];
        for(var i=0;i<data.data.showData[0].data.length;i++){
            var item = data.data.showData[0].data[i];
            legend.push(item.name);
            seriesData.push({
                name:item.name,
                code:item.code,
                type:'line',
                smooth:true,
                symbol:'circle',
                symbolSize:'8',
                data:item.opinionCount
            });
        }
        var myChart = echarts.init(document.getElementById('chart04'));
        var option = {
            tooltip: {
                trigger: 'axis'
            },
            legend:{
                icon:'circle',
                y:'0',
                right:'10%',
                textStyle:{
                    color:simple?'#333':'#70c1df',
                },
                data:legend
            },
            grid: {x: '50', x2: '30', y: '20', y2: '40'},
            color:['#7aafff','#fc8f2d','#66c53d'],
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
    function chartMediaTop(){
        var data = {
            "status": 200,
            "data": {
                "statisticsDates": ["2017-02-17","2017-02-18"],
                "showData":[
                    {
                        "mediaOriginCode": "media01",
                        "mediaOriginName": "新浪网",
                        "opinionCount": 500
                    },
                    {
                        "mediaOriginCode": "media02",
                        "mediaOriginName": "新浪微博",
                        "opinionCount": 480
                    },
                    {
                        "mediaOriginCode": "media03",
                        "mediaOriginName": "百度",
                        "opinionCount": 420
                    },
                    {
                        "mediaOriginCode": "media04",
                        "mediaOriginName": "大众网",
                        "opinionCount": 410
                    },
                    {
                        "mediaOriginCode": "media05",
                        "mediaOriginName": "汽车之家",
                        "opinionCount": 400
                    },
                    {
                        "mediaOriginCode": "media06",
                        "mediaOriginName": "百度地图",
                        "opinionCount": 380
                    },
                    {
                        "mediaOriginCode": "media07",
                        "mediaOriginName": "腾讯新闻",
                        "opinionCount": 370
                    },
                    {
                        "mediaOriginCode": "media08",
                        "mediaOriginName": "网易",
                        "opinionCount": 320
                    },
                    {
                        "mediaOriginCode": "media09",
                        "mediaOriginName": "美团网",
                        "opinionCount": 300
                    },
                    {
                        "mediaOriginCode": "media10",
                        "mediaOriginName": "ofo",
                        "opinionCount": 280
                    }
                ]
            }
        }
        var xAxis=[],seriesData=[];
        for(var i=0;i<data.data.showData.length;i++){
            var item = data.data.showData[i];
            xAxis.push(item.mediaOriginName);
            seriesData.push({
                value:item.opinionCount,
                code:item.mediaOriginCode
            });
        }
        var myChart = echarts.init(document.getElementById('chart03'));
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
            }],
            grid: {x: '50', x2: '30', y: '20', y2: '40'},
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
            alert(d.name+':'+d.data.code);
            console.log(d.name+':'+d.data.code);
        });
    }
    function chartMapCity(){
        var data = {
            id:'chart07',
            titleColor:simple?'#7989b0':'#00c7e2',
            color:simple?['#51a3ff','#d7e9fa']:['#0cc4f9','#004ea4'],
            mapJson:jijing,
            data:[
                {name: '嘉祥县',value: randomData()},
                {name: '金乡县',value: randomData()},
                {name: '梁山县',value: randomData()},
                {name: '曲阜市',value: randomData()},
                {name: '任城区',value: randomData()},
                {name: '微山县',value: randomData()},
                {name: '鱼台县',value: randomData()},
                {name: '邹城市',value: randomData()},
                {name: '兖州区',value: randomData()},
                {name: '汶上县',value: randomData()},
                {name: '泗水县',value: randomData()},
                {name: '高新区',value: randomData()},
                {name: '太白湖区',value: randomData()},
                {name: '经济技术开发区',value: randomData()}
            ]
        };
        initMap(data);
    }
    function chartMapChina(mapJson){
        var data = {
            id:'chart09',
            titleColor:simple?'#7989b0':'#00c7e2',
            color:simple?['#51a3ff','#d7e9fa']:['#0cc4f9','#004ea4'],
            mapJson:mapJson,
            visualMap:false,
            data:[
                {name: '北京',value: randomData() },
                {name: '天津',value: randomData() },
                {name: '上海',value: randomData() },
                {name: '重庆',value: randomData() },
                {name: '河北',value: randomData() },
                {name: '河南',value: randomData() },
                {name: '云南',value: randomData() },
                {name: '辽宁',value: randomData() },
                {name: '黑龙江',value: randomData() },
                {name: '湖南',value: randomData() },
                {name: '安徽',value: randomData() },
                {name: '山东',value: randomData() },
                {name: '新疆',value: randomData() },
                {name: '江苏',value: randomData() },
                {name: '浙江',value: randomData() },
                {name: '江西',value: randomData() },
                {name: '湖北',value: randomData() },
                {name: '广西',value: randomData() },
                {name: '甘肃',value: randomData() },
                {name: '山西',value: randomData() },
                {name: '内蒙古',value: randomData() },
                {name: '陕西',value: randomData() },
                {name: '吉林',value: randomData() },
                {name: '福建',value: randomData() },
                {name: '贵州',value: randomData() },
                {name: '广东',value: randomData() },
                {name: '青海',value: randomData() },
                {name: '西藏',value: randomData() },
                {name: '四川',value: randomData() },
                {name: '宁夏',value: randomData() },
                {name: '海南',value: randomData() },
                {name: '台湾',value: randomData() },
                {name: '香港',value: randomData() },
                {name: '澳门',value: randomData() }
            ]
        };
        initMap(data);
    }
    function chartMapProvince(mapJson){
        var data = {
            id:'chart08',
            titleColor:simple?'#7989b0':'#00c7e2',
            color:simple?['#51a3ff','#d7e9fa']:['#0cc4f9','#004ea4'],
            mapJson:mapJson,
            visualMap:false,
            data:[
                {name: '济南市',value: randomData() },
                {name: '青岛市',value: randomData() },
                {name: '淄博市',value: randomData() },
                {name: '枣庄市',value: randomData() },
                {name: '东营市',value: randomData() },
                {name: '烟台市',value: randomData() },
                {name: '潍坊市',value: randomData() },
                {name: '济宁市',value: randomData() },
                {name: '泰安市',value: randomData() },
                {name: '威海市',value: randomData() },
                {name: '日照市',value: randomData() },
                {name: '滨州市',value: randomData() },
                {name: '德州市',value: randomData() },
                {name: '聊城市',value: randomData() },
                {name: '临沂市',value: randomData() },
                {name: '菏泽市',value: randomData() },
                {name: '莱芜市',value: randomData() }
            ]
        };
        initMap(data);
    }
    function chartPieFeel(){
        var data = {
            "status": 200,
            "data": {
                "statisticsDates": ["2017-02-17", "2017-02-18"],
                "showData": [
                    {"name": "正面",code:'01', "opinionCount": 1125},
                    {"name": "中立",code:'02', "opinionCount": 2132},
                    {"name": "负面",code:'03', "opinionCount": 2132}
                ]
            }
        };
        var legendData = [],seriesData = [];
        for(var i=0;i<data.data.showData.length;i++){
            var item = data.data.showData[i];
            legendData.push(item.name);
            seriesData.push({
                value:item.opinionCount,
                code:item.code,
                name:item.name
            });
        }
        var myChart = echarts.init(document.getElementById('chart05'));
        var option = {
            color: ['#ff9500','#6191fa','#27b551'],
            tooltip : {
                show: true,
                backgroundColor:'none',
                formatter: function(cParam){
                    return '<div style="position: relative;width: 110px;height: 110px;border-radius: 60px;background-color:#eee">' +
                        '<div style="text-align: center;position: absolute;top: 5px;left: 5px;width: 100px;height: 100px;line-height: 100px;border-radius: 50px;background-color: '+cParam.color+';">' +
                        cParam.name+
                        '</div></div>';
                },
                position:['34%', '30.4%']
            },
            legend:{
                icon:'circle',
                right:'0',
                bottom:'20',
                orient:'vertical',
                textStyle:{
                    color:simple?'#333':'#70c1df',
                },
                data:legendData
            },
            calculable: true,
            series: [{
                type: 'pie',
                center: ['46%', '50%'],
                radius: [80, 120],
                labelLine: {
                    normal: {
                        textStyle: {
                            fontSize: 10
                        },
                        length: 30,
                        length2: 30
                    }
                },
                label:{
                    normal:{
                        formatter:'{b}\n\n{d}%'
                    }
                },
                data:seriesData
            }]
        };
        myChart.setOption(option);
    }
    function chartPieFeelSource(){
        var data = {
            "status": 200,
            "data": {
                "statisticsDates": ["2017-02-17","2017-02-18"],
                "showData": [
                    {
                        "mediaOriginCode": "media01",
                        "mediaOriginName": "新浪",
                        "opinionCount": 2132
                    },
                    {
                        "mediaOriginCode": "media02",
                        "mediaOriginName": "网易",
                        "opinionCount": 532
                    },
                    {
                        "mediaOriginCode": "media03",
                        "mediaOriginName": "百度",
                        "opinionCount": 1132
                    },
                    {"mediaOriginCode": "media04", "mediaOriginName": "大众", "opinionCount": 132},
                    {"mediaOriginCode": "media04", "mediaOriginName": "大众1", "opinionCount": 332},
                    {"mediaOriginCode": "media04", "mediaOriginName": "大众2", "opinionCount": 832},
                    {"mediaOriginCode": "media04", "mediaOriginName": "大众3", "opinionCount": 332},
                    {"mediaOriginCode": "media04", "mediaOriginName": "大众4", "opinionCount": 632},
                    {"mediaOriginCode": "media04", "mediaOriginName": "大众5", "opinionCount": 712},
                    {"mediaOriginCode": "media04", "mediaOriginName": "大众5", "opinionCount": 512}
                ]
            }
        }
        var legendData = [],seriesData = [];
        for(var i=0;i<data.data.showData.length;i++){
            var item = data.data.showData[i];
            legendData.push(item.mediaOriginName);
            seriesData.push({
                value:item.opinionCount,
                code:item.mediaOriginCode,
                name:item.mediaOriginName
            });
        }
        var myChart = echarts.init(document.getElementById('chart06'));
        var option = {
            color: ['#ff1211','#fc5f09','#fc7c0a','#6385f7','#6199fb','#839ef8','#60bbfb','#3cd0d1','#74d141'],
            tooltip : {
                show: true,
                backgroundColor:'none',
                formatter: function(cParam){
                    return '<div style="position: relative;width: 110px;height: 110px;border-radius: 60px;background-color:#eee">' +
                        '<div style="text-align: center;position: absolute;top: 5px;left: 5px;width: 100px;height: 100px;line-height: 100px;border-radius: 50px;background-color: '+cParam.color+';">' +
                        cParam.name+
                        '</div></div>';
                },
                position:['34%', '30.4%']
            },
            legend:{
                icon:'circle',
                bottom:'20',
                right:'0',
                orient:'vertical',
                textStyle:{
                    color:simple?'#333':'#70c1df',
                },
                data:legendData
            },
            calculable: true,
            series: [{
                name: '民意类型数量',
                type: 'pie',
                center: ['46%', '50%'],
                radius: [80, 120],
                labelLine: {
                    normal: {
                        textStyle: {
                            fontSize: 10
                        },
                        length: 30,
                        length2: 30
                    }
                },
                label:{
                    normal:{
                        formatter:'{d}%'
                    }
                },
                data: seriesData
            }]
        };
        myChart.setOption(option);
    }
    function newPerson(){
        var data ={
            "status": 200,
            "data": {
                "showData": [
                    {
                        "opinionTitle": "甲沟炎的病发原因及如何治疗",
                        "emotionType": "0",//0负面，1中性，2正面
                        "originMedia": "新浪网",
                        "eventTime": "2016-10-28",
                        "articleLink": "www.baidu.com",
                        "opinionContent": "甲沟炎的病发原因及如何治疗？唐山青华专家解答甲沟炎的病发原因及如何治疗?唐山青华专家表示：甲沟炎常发生在一侧甲沟皮下，表现为患侧皮肤红肿，疼痛，一般多无全身感染症状。若病变发展，病灶内成脓，红肿区内有波动感，出现白点，但不易破溃出脓。甲沟炎的发生绝大多数发生于足拇指，尤其以足拇指甲的外侧甲沟为多见，约为内侧甲沟的3倍，也有部分患者足拇指双侧嵌甲或双拇指双侧嵌甲。 　　甲沟炎的症状及病发原因是哪些? . . ."
                    },
                    {
                        "opinionTitle": "甲沟炎的病发原因及如何治疗",
                        "emotionType": "1",
                        "originMedia": "新浪网",
                        "eventTime": "2016-10-28",
                        "articleLink": "www.baidu.com",
                        "opinionContent": "甲沟炎的病发原因及如何治疗？唐山青华专家解答甲沟炎的病发原因及如何治疗?唐山青华专家表示：甲沟炎常发生在一侧甲沟皮下，表现为患侧皮肤红肿，疼痛，一般多无全身感染症状。若病变发展，病灶内成脓，红肿区内有波动感，出现白点，但不易破溃出脓。甲沟炎的发生绝大多数发生于足拇指，尤其以足拇指甲的外侧甲沟为多见，约为内侧甲沟的3倍，也有部分患者足拇指双侧嵌甲或双拇指双侧嵌甲。 　　甲沟炎的症状及病发原因是哪些? . . ."
                    },
                    {
                        "opinionTitle": "甲沟炎的病发原因及如何治疗",
                        "emotionType": "2",
                        "originMedia": "新浪网",
                        "eventTime": "2016-10-28",
                        "articleLink": "www.baidu.com",
                        "opinionContent": "甲沟炎的病发原因及如何治疗？唐山青华专家解答甲沟炎的病发原因及如何治疗?唐山青华专家表示：甲沟炎常发生在一侧甲沟皮下，表现为患侧皮肤红肿，疼痛，一般多无全身感染症状。若病变发展，病灶内成脓，红肿区内有波动感，出现白点，但不易破溃出脓。甲沟炎的发生绝大多数发生于足拇指，尤其以足拇指甲的外侧甲沟为多见，约为内侧甲沟的3倍，也有部分患者足拇指双侧嵌甲或双拇指双侧嵌甲。 　　甲沟炎的症状及病发原因是哪些? . . ."
                    }
                ]
            }
        };
        var html = template('personListId', data.data);
        $('#searchId').html(html);
        $('.net_search li').on('click',function(){
            window.open($(this).attr('chref'));
        });

    }
})();