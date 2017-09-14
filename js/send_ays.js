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
    initData = function(){
        chartSend();
    }
    initData();
    function chartSend(){
        var data = {
            "status": 200,
            "data": {
                "statisticsDates": ["2017-02-17", "2017-02-18"],
                "source": [{"originCode": "origin01", "originName": "市长热线\n12345"}],
                "links": [
                    {"source": "origin01", "targetDepartCode": "depart01","targetDepartName": "工商局", "opinionCount": 233},
                    {"source": "origin01", "targetDepartCode": "depart02", "targetDepartName": "教育局", "opinionCount": 233},
                    {"source": "origin01", "targetDepartCode": "depart03", "targetDepartName": "环保局", "opinionCount": 233},
                    {"source": "origin01", "targetDepartCode": "depart04", "targetDepartName": "卫生局", "opinionCount": 233},
                    {"source": "origin01", "targetDepartCode": "depart05", "targetDepartName": "司法局", "opinionCount": 233},
                    {"source": "origin01", "targetDepartCode": "depart06", "targetDepartName": "城管局", "opinionCount": 233},
                    {"source": "origin01", "targetDepartCode": "depart07", "targetDepartName": "交通\n运输局", "opinionCount": 233},
                    {"source": "origin01", "targetDepartCode": "depart08", "targetDepartName": "计划生育\n保障局", "opinionCount": 233}
                ]
            }
        };
        var series = [{
                name: data.data.source[0].originName,
                value:"",
                x: 480,y: 60,
                symbolSize: 120,
                itemStyle:{normal:{color:'#608bfc'}}
            }];
        var links=[];
        for(var i=0;i<data.data.links.length;i++){
            series.push({
                name: data.data.links[i].targetDepartName,
                value: data.data.links[i].opinionCount,
                code: data.data.links[i].targetDepartCode,
                x: 380,y: 50,
                symbolSize: 80,
                itemStyle:{normal:{color:'#f69600'}}
            });
            links.push({
                source: data.data.links[i].targetDepartName,
                target: data.data.source[0].originName
            });
        };
        var myEchart = echarts.init(document.getElementById('chartId'));
        var option = {
            tooltip: {
                trigger: 'item',
                formatter: function(d){
                    if(d.dataIndex===0|| d.dataType==="edge"){return;}
                    return d.data.name+'：'+d.data.value;
                }
            },
            series : [
                {
                    type: 'graph',
                    layout:'force',
                    edgeSymbol:['arrow',''],
                    edgeSymbolSize:12,
                    force:{
                        gravity:0.08,
                        initLayout:'circular',
                        edgeLength:8,
                        repulsion:80
                    },
                    grid: {
                        top:'10%',
                        left: '10%',
                        right: '10%',
                        bottom: '10%',
                        containLabel: true
                    },
                    symbolSize: 10,
                    label: {
                        normal: {
                            show: true,
                            textStyle:{
                                fontSize:14,
                                color:'#fff',
                            }
                        }
                    },
                    lineStyle: {
                        normal: {
                            color:'source',
                            curveness: 0.2,
                            width:2
                        }
                    },
                    data: series,
                    links: links
                }]
        };
        myEchart.setOption(option);
        myEchart.on('click',function(param){
            //localStorage.setItem('type',2);//type=2 派发分析--类型分析
            //localStorage.setItem('code',param.data.code);
            //localStorage.setItem('name',param.data.name);
            var pm = '?type=2&time=&name='+param.data.name+'&code='+param.data.code;
            window.open('./classes_ays.html'+pm);
        });
    }
});
