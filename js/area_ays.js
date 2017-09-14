/**
 * Created by yyg on 2017/2/28.
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
    $('.area_city span').on('click',function(){
        if($('.area_city .active').length==5&&!$(this).hasClass('active')){
            layer.msg('最多选择5个区域');
            return;
        }
        if($(this).hasClass('active')){
            if($('.area_city .active').length==1)
            {
                layer.msg('至少选择1个区域');
                return;
            }
            $(this).removeClass('active');
            removeLine($(this).text());
        }else{
            $(this).addClass('active');
            addLine($(this).text());
        }
    });
    var myLine = null,lineDatas=[];
    initData = function(){
        chartMap();//民意区域分布
        chartAreaPercent();//民意区域占比
        chartAreaVs();//区域间民意对比
    }
    initData();
    function chartMap(){
        var data = {
            id:'chart01',
            title:'',
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
    function chartAreaPercent(){
        var data = {
            "status": 200,
            "data": {
                "statisticsDates": ["2017-02-17", "2017-02-18"],
                "areaData": [
                    {"areaCode": "370850",areaName: '嘉祥县',opinionCount: randomData()},
                    {"areaCode": "370850",areaName: '金乡县',opinionCount: randomData()},
                    {"areaCode": "370850",areaName: '梁山县',opinionCount: randomData()},
                    {"areaCode": "370850",areaName: '曲阜市',opinionCount: randomData()},
                    {"areaCode": "370850",areaName: '任城区',opinionCount: randomData()},
                    {"areaCode": "370850",areaName: '微山县',opinionCount: randomData()},
                    {"areaCode": "370850",areaName: '鱼台县',opinionCount: randomData()},
                    {"areaCode": "370850",areaName: '邹城市',opinionCount: randomData()},
                    {"areaCode": "370850",areaName: '兖州区',opinionCount: randomData()},
                    {"areaCode": "370850",areaName: '汶上县',opinionCount: randomData()},
                    {"areaCode": "370850",areaName: '泗水县',opinionCount: randomData()},
                    {"areaCode": "370850",areaName: '高新区',opinionCount: randomData()},
                    {"areaCode": "370850",areaName: '太白湖区',opinionCount: randomData()},
                    {"areaCode": "370850",areaName: '经济技术开发区',opinionCount: randomData()}
                ]
            }
        };
        var paramData = {
            id:'chart02',
            color:['#00c0fe','#0082d2','#fbc802','#fe5600','#ff9200'],
            legendGrid:{ left:'10%', top:'28%'},
            center: ['50%', '45%'],
            radius: ['45%', '65%'],
            data:[]
        };
        for(var i=0;i<data.data.areaData.length;i++){
            paramData.data.push({
                value:data.data.areaData[i].opinionCount,
                code:data.data.areaData[i].areaCode,
                name:data.data.areaData[i].areaName
            })
        }
        resetOpt();//重置默认配置
        waterPoloOpt.labelLine = true;//使用标线
        var myChart = initPie(paramData);
        myChart.on('click',function(param){
            //localStorage.setItem('type','22');//type=22 区域分析--民意区域占比
            //localStorage.setItem('code',param.data.code);
            //localStorage.setItem('name',param.data.name);
            var pm = '?type=22'+'&time=&name='+param.data.name+'&code='+param.data.code;
            window.open('./p_type_ays.html'+pm);
        });
    }
    function chartAreaVs(){
        var data = {
                "data": {
                    "statisticsDates": ["2017-02-17", "2017-02-18"],
                    "dates": ["2016-11-01", "2016-11-02", "2016-11-03", "2016-11-04", "2016-11-05", "2016-11-06"],
                    "areaData":[
                        {"areaCode":"370828",opinionCount: [randomData(100),randomData(100),randomData(100),randomData(100),randomData(100),randomData(100)], areaName: '任城区'},
                        {"areaCode":"370820",opinionCount: [randomData(100),randomData(100),randomData(100),randomData(100),randomData(100),randomData(100)], areaName: '兖州区'},
                        {"areaCode":"370821",opinionCount: [randomData(100),randomData(100),randomData(100),randomData(100),randomData(100),randomData(100)], areaName: '曲阜区'},
                        {"areaCode":"370822",opinionCount: [randomData(100),randomData(100),randomData(100),randomData(100),randomData(100),randomData(100)], areaName: '泗水区'},
                        {"areaCode":"370823",opinionCount: [randomData(100),randomData(100),randomData(100),randomData(100),randomData(100),randomData(100)], areaName: '邹城区'},
                        {"areaCode":"370824",opinionCount: [randomData(100),randomData(100),randomData(100),randomData(100),randomData(100),randomData(100)], areaName: '徽山县'},
                        {"areaCode":"370825",opinionCount: [randomData(100),randomData(100),randomData(100),randomData(100),randomData(100),randomData(100)], areaName: '鱼台县'},
                        {"areaCode":"370825",opinionCount: [randomData(100),randomData(100),randomData(100),randomData(100),randomData(100),randomData(100)], areaName: '金乡县'},
                        {"areaCode":"370826",opinionCount: [randomData(100),randomData(100),randomData(100),randomData(100),randomData(100),randomData(100)], areaName: '嘉祥县'},
                        {"areaCode":"370827",opinionCount: [randomData(100),randomData(100),randomData(100),randomData(100),randomData(100),randomData(100)], areaName: '汶上县'},
                        {"areaCode":"370828",opinionCount: [randomData(100),randomData(100),randomData(100),randomData(100),randomData(100),randomData(100)], areaName: '梁山县'},
                        {"areaCode":"370829",opinionCount: [randomData(100),randomData(100),randomData(100),randomData(100),randomData(100),randomData(100)], areaName: '高新区'},
                        {"areaCode":"370830",opinionCount: [randomData(100),randomData(100),randomData(100),randomData(100),randomData(100),randomData(100)], areaName: '太白湖'},
                        {"areaCode":"370831",opinionCount: [randomData(100),randomData(100),randomData(100),randomData(100),randomData(100),randomData(100)], areaName: '经济区'},
                        {"areaCode":"370832",opinionCount: [randomData(100),randomData(100),randomData(100),randomData(100),randomData(100),randomData(100)], areaName: '曲阜文化建设示范区'}
                    ]
                }
          };
        function searchCode(name){
            for(var i=0;i<data.data.areaData.length;i++){
                if(data.data.areaData[i].areaName==name){
                    return data.data.areaData[i].areaCode;
                }
            }
        }
        var legend = [];
        for(var i=0;i<data.data.areaData.length;i++){
            var item = data.data.areaData[i];
            legend.push(item.areaName);
            lineDatas.push({
                name:item.areaName,
                code:item.areaCode,
                type:'line',
                data:item.opinionCount,
                symbol:simple?'emptyCircle':'circle',
                symbolSize:10
            });
        }
        myLine = echarts.init(document.getElementById('chart03'));
        var option = {
            tooltip : {
                trigger: 'axis',
                formatter: function (params){
                    var s = '';
                    for(var i=0;i<params.length;i++){
                        s += params[i].seriesName+'：'+params[i].value+'<br/>';
                    }
                    return s;
                }
            },
            legend: {
                right:'30',
                top:'10',
                textStyle:{
                    color:simple?'#333':'#70c1df',
                },
                itemHeight:12,
                icon:'square',
                data:legend
            },
            xAxis:{
                type : 'category',
                data : data.data.dates,
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
            color:['#24df67', '#1788f1', '#f72f63','#2b821d', '#fdd030','#fa6822'],
            grid: {x: '50', x2: '30', y: '40', y2: '50'},
            series: lineDatas[0]
        };
        myLine.setOption(option);
        myLine.on('click',function(param){
            //localStorage.setItem('type','23');//type=23 区域分析--区域间民意对比
            //localStorage.setItem('code',searchCode(param.seriesName));
            //localStorage.setItem('name',param.seriesName);
            var pm = '?type=23'+'&time=&name='+param.seriesName+'&code='+searchCode(param.seriesName);
            window.open('./source_ays2.html'+pm);
        });
    }
    function removeLine(text){
        var opt = myLine.getOption();
        var series = myLine.getOption().series;
        var newSeries = [], legend=[];
        for(var i=0;i<series.length;i++){
            if(series[i].name != text){
                newSeries.push(series[i]);
                legend.push(series[i].name);
            }
        }
        opt.series = newSeries;
        opt.legend[0].data = legend;
        myLine.setOption(opt,true);
    }
    function addLine(text){
        var option = myLine.getOption();
        var newData = clone(option.series[0]);
        var legend = option.legend;
        newData.name = text;
        var ss = null;
        for(var j=0;j<lineDatas.length;j++){
            if(lineDatas[j].name==text) {
                ss = lineDatas[j].data;
                legend[0].data.push(text);
                break;
            }
        }
        newData.data = ss;
        option.series.push(newData);
        myLine.setOption(option);
    }
    function clone(obj){
        var o;
        switch(typeof obj){
            case 'undefined': break;
            case 'string'   : o = obj + '';break;
            case 'number'   : o = obj - 0;break;
            case 'boolean'  : o = obj;break;
            case 'object'   :
                if(obj === null){
                    o = null;
                }else{
                    if(obj instanceof Array){
                        o = [];
                        for(var i = 0, len = obj.length; i < len; i++){
                            o.push(clone(obj[i]));
                        }
                    }else{
                        o = {};
                        for(var k in obj){
                            o[k] = clone(obj[k]);
                        }
                    }
                }
                break;
            default:
                o = obj;break;
        }
        return o;
    }
});
