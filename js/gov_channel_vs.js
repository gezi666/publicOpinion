/**
 * Created by yyg on 2017/3/2.
 */
(function(){
    $('.button_add').on('click',function(){
        $('canvas').parent().remove();
        $('div[name="waterChart"]').remove();
        $('td svg').parent().parent().css({'width':'100%'});
        $('td svg').parent().remove();
        if($(this).text()=='+'){
            $(this).text('-');
            $('td[name="vs"]').show();
            $('th[name="vs"]').show();
            $('td[name="vs_s"]').css({'width':'30%'});
            $('th[name="vs_s"]').css({'width':'30%'});
            updateThree();
        }else{
            $(this).text('+');
            $('td[name="vs"]').hide();
            $('th[name="vs"]').hide();
            $('td[name="vs_s"]').css({'width':'45%'});
            $('th[name="vs_s"]').css({'width':'45%'});
            updateOne();
            updateTwo();
            updateThree();
        }
        updateOne();
        updateTwo();

    });
    $('.list_menu').on("click",function(){
        $(this).find('.select_list').toggle();
    });
    $('.list_menu span').on('click',function(event){
        event.stopPropagation();
        $(this).parent().hide();
        $(this).parent().parent().parent().find('span:first').text($(this).text());
        var val = $(this).parent().attr('value');
        if(val==0){
            updateOne();
        }else if(val==1) {
            updateTwo();
        }else{
            updateThree();
        }
    });
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
        chartLineChange();//变化趋势
        chartPieFeel();//民意情感占比
        chartMapArea();//来源区域分布
        chartHotKey();//热点关键词
    };
    initData();
    //更新第一列
    function updateOne(){
        chartLineChange('chart01');
        chartPieFeel('chart04');
        chartMapArea('chart07');
        chartHotKey('chart10');
    }
    //更新第二列
    function updateTwo(){
        chartLineChange('chart02');
        chartPieFeel('chart05');
        chartMapArea('chart08');
        chartHotKey('chart11');
    }
    //更新第三列
    function updateThree(){
        chartLineChange('chart03');
        chartPieFeel('chart06');
        chartMapArea('chart09');
        chartHotKey('chart12');
    }

    function chartLineChange(id){
        var data ={
            "status": 200,
            "data": {
                "statisticsDates": ["2016-01","2016-02"],
                "dates": ["2017-02-16", "2017-02-17", "2017-02-18", "2017-02-19", "2017-02-20"],
                "showData": [
                    {
                        "name": "市长热线12345",
                        "opinionCount": [213,12,125,231,100]
                    },
                    {
                        "name": "信访局",
                        "opinionCount": [113,122,225,251,160]
                    }
                ]
            }};
        var seriesData=[];
        for(var i=0;i<data.data.showData.length;i++){
            var item = data.data.showData[i];
            seriesData.push({
                name:item.name,
                type:'line',
                smooth:true,
                symbol:'circle',
                symbolSize:'6',
                data:item.opinionCount
            });
        }
        if(!id){
            createLine({
                id:'chart01',
                xAxis:data.data.dates,
                data:[seriesData[0]]
            });
            createLine({
                id:'chart02',
                xAxis:data.data.dates,
                data:[seriesData[1]]
            });
        }else{
            createLine({
                id:id,
                xAxis:data.data.dates,
                data:[seriesData[0]]
            });
        }
    }
    function chartPieFeel(id){
        var data = {
            "status": 200,
            "data": {
                "statisticsDates": ["2017-02-17", "2017-02-18"],
                "showData": [
                    {
                        "name":"市长热线",
                        "emotion": ["正面","中立","负面"],
                        "opinionCount": [1125,2132,2132]
                    },
                    {
                        "name": "政府",
                        "emotion": ["正面","中立","负面"],
                        "opinionCount": [1125,2132,2132]
                    }
                ]
            }
        };
        var paramData = {
            id:'',
            color:['#00c0fe','#0082d2','#fbc802','#fe5600','#ff9200'],
            legendGrid:{ right:'20', bottom:'20%'},
            center: ['40%', '50%'],
            radius: ['50%', '65%'],
            data:[]
        };
        var datas = [];
        for(var i=0;i<data.data.showData.length;i++){
            var itemData = [];
            for(var j=0;j<data.data.showData[i].emotion.length;j++){
                itemData.push({
                    name:data.data.showData[i].emotion[j],
                    value:data.data.showData[i].opinionCount[j]
                });
            }
            datas.push(itemData);
        }
        resetOpt();//重置默认配置
        waterPoloOpt.legend = true;//使用图例
        if(!id){//多列更新
            paramData.id = 'chart04';
            paramData.data = datas[0];
            initPie(paramData);//第一列
            paramData.id = 'chart05';
            paramData.data = datas[1];
            initPie(paramData);//第二列
        }else{//单列更新
            paramData.id = id;
            paramData.data = datas[0];
            initPie(paramData);
        }
    }
    function chartMapArea(id){
        var data ={
            "status": 200,
            "data": {
                "statisticsDates": ["2017-02-17", "2017-02-18"],
                showData:[
                    {
                        name:'政府渠道',
                        data:[
                            {areaName: '嘉祥县',"areaCode": "0001",opinionCount: randomData()},
                            {areaName: '金乡县',"areaCode": "0002",opinionCount: randomData()},
                            {areaName: '梁山县',"areaCode": "0003",opinionCount: randomData()},
                            {areaName: '曲阜市',"areaCode": "0004",opinionCount: randomData()},
                            {areaName: '任城区',"areaCode": "0005",opinionCount: randomData()},
                            {areaName: '微山县',"areaCode": "0006",opinionCount: randomData()},
                            {areaName: '鱼台县',"areaCode": "0007",opinionCount: randomData()},
                            {areaName: '邹城市',"areaCode": "0008",opinionCount: randomData()},
                            {areaName: '兖州区',"areaCode": "0009",opinionCount: randomData()},
                            {areaName: '汶上县',"areaCode": "0010",opinionCount: randomData()},
                            {areaName: '泗水县',"areaCode": "0001",opinionCount: randomData()},
                            {areaName: '高新区',"areaCode": "0001",opinionCount: randomData()},
                            {areaName: '太白湖区',"areaCode": "0001",opinionCount: randomData()},
                            {areaName: '经济技术开发区',"areaCode": "0001",opinionCount: randomData()}
                        ]
                    },
                    {
                        name:'网络渠道',
                        data:[
                            {areaName: '嘉祥县',"areaCode": "0001",opinionCount: randomData()},
                            {areaName: '金乡县',"areaCode": "0002",opinionCount: randomData()},
                            {areaName: '梁山县',"areaCode": "0003",opinionCount: randomData()},
                            {areaName: '曲阜市',"areaCode": "0004",opinionCount: randomData()},
                            {areaName: '任城区',"areaCode": "0005",opinionCount: randomData()},
                            {areaName: '微山县',"areaCode": "0006",opinionCount: randomData()},
                            {areaName: '鱼台县',"areaCode": "0007",opinionCount: randomData()},
                            {areaName: '邹城市',"areaCode": "0008",opinionCount: randomData()},
                            {areaName: '兖州区',"areaCode": "0009",opinionCount: randomData()},
                            {areaName: '汶上县',"areaCode": "0010",opinionCount: randomData()},
                            {areaName: '泗水县',"areaCode": "0001",opinionCount: randomData()},
                            {areaName: '高新区',"areaCode": "0001",opinionCount: randomData()},
                            {areaName: '太白湖区',"areaCode": "0001",opinionCount: randomData()},
                            {areaName: '经济技术开发区',"areaCode": "0001",opinionCount: randomData()}
                        ]
                    }
                ]
            }};
        var sData = [];
        for(var i=0;i<data.data.showData.length;i++){
            var item = data.data.showData[i];
            var dt = [];
            for(var j=0;j<item.data.length;j++){
                dt.push({
                    name:item.data[j].areaName,
                    code:item.data[j].areaCode,
                    value:item.data[j].opinionCount
                });
            }
            sData.push(dt);
        }
        if(!id){
            var dataGov = {
                id:'chart07',
                titleColor:simple?'#7989b0':'#00c7e2',
                color:simple?['#51a3ff','#d7e9fa']:['#0cc4f9','#004ea4'],
                mapJson:jijing,
                data:sData[0]
            };
            var dataNet = {
                id:'chart08',
                titleColor:simple?'#7989b0':'#00c7e2',
                color:simple?['#51a3ff','#d7e9fa']:['#0cc4f9','#004ea4'],
                mapJson:jijing,
                data:sData[1]
            };
            initMap(dataGov);
            initMap(dataNet);
        }else{
            initMap({
                id:id,
                titleColor:simple?'#7989b0':'#00c7e2',
                color:simple?['#51a3ff','#d7e9fa']:['#0cc4f9','#004ea4'],
                mapJson:jijing,
                data:sData[0]
            });
        }
    }
    function chartHotKey(id){
        var data = {
            "status": 200,
            "data": {
                "statisticsDates": ["2017-06-01", "2017-09-01"],
                showData:[
                    {
                        name:'政府渠道民意',
                        code:'',
                        data:[
                            {"opinionCount":randomData(), "keyword":"大数据"},
                            {"opinionCount":randomData(), "keyword":"空气污染"},
                            {"opinionCount":randomData(), "keyword":"小学教育"},
                            {"opinionCount":randomData(), "keyword":"创业"},
                            {"opinionCount":randomData(), "keyword":"医疗"},
                            {"opinionCount":randomData(), "keyword":"环境恶化"},
                            {"opinionCount":randomData(), "keyword":"雾霾"},
                            {"opinionCount":randomData(), "keyword":"废弃物"},
                            {"opinionCount":randomData(), "keyword":"互联网"},
                            {"opinionCount":randomData(), "keyword":"智慧城市"}
                        ]
                    },
                    {
                        name:'政府渠道民意',
                        code:'',
                        data:[
                            {"opinionCount":randomData(), "keyword":"大数据"},
                            {"opinionCount":randomData(), "keyword":"空气污染"},
                            {"opinionCount":randomData(), "keyword":"小学教育"},
                            {"opinionCount":randomData(), "keyword":"创业"},
                            {"opinionCount":randomData(), "keyword":"医疗"},
                            {"opinionCount":randomData(), "keyword":"环境恶化"},
                            {"opinionCount":randomData(), "keyword":"雾霾"},
                            {"opinionCount":randomData(), "keyword":"废弃物"},
                            {"opinionCount":randomData(), "keyword":"互联网"},
                            {"opinionCount":randomData(), "keyword":"智慧城市"}
                        ]
                    }
                ]
            }
        };
        //初始化政府渠道民意热点关键词
        var seriesData=[];
        for(var i=0;i<data.data.showData.length;i++){
            var item = data.data.showData[i];
            var itemData=[],arry=[];
            item.data.forEach(function(itm){
                arry.push(itm.opinionCount);
            });
            arry.sort(function(a,b){return b-a});        //降序排列数组
            for(var j=0;j<item.data.length;j++){
                itemData.push({
                    value:item.data[j].opinionCount,
                    name:item.data[j].keyword,
                    itemStyle : {
                        normal : {
                            color :AutoConfigureColor(arry,item.data[j].opinionCount)
                        }
                    }
                });
            }
            seriesData.push(itemData);
        }
        if(!id){
            createBubble({
                id:'chart10',
                data:seriesData[0]
            });
            createBubble({
                id:'chart11',
                data:seriesData[1]
            });
        }else{
            createBubble({
                id:id,
                data:seriesData[0]
            });
        }
    }
    function createBubble(param){
        var myChart = echarts.init(document.getElementById(param.id));
        var option = {
            series: [{
                type: 'graph',
                layout: 'force',
                roam: true,
                symbol: 'circle',
                force: {
                    repulsion: 150
                },
                symbolSize: function (val) {
                    return (50+val/30);
                },
                animation: false,
                label: {
                    normal: {
                        show: true,
                        position: 'inside',
                        formatter: '{b}',
                        textStyle:{
                            color:'#fff',
                            fontSize:10
                        }
                    }
                },
                draggable: true,
                data:param.data
            }]
        };
        myChart.setOption(option);
        return myChart;
    }
    function createLine(param){
        var myChart = echarts.init(document.getElementById(param.id));
        var option = {
            tooltip: {
                trigger: 'axis'
            },
            grid: {x: '50', x2: '30', y: '20', y2: '40'},
            color:['#7aafff','#fc8f2d','#66c53d'],
            xAxis:  {
                type: 'category',
                data: param.xAxis,
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
                    show: false
                }
            },
            series: param.data
        };
        myChart.setOption(option);
    }
})();