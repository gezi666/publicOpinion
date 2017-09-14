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
    //var code = localStorage.getItem('code');
    //var name = localStorage.getItem('name');
    var code = getUrlObj().code;
    var name = getUrlObj().name;
    $('.title_chart').text(name+$('.title_chart').text());
    initData = function(){
        updateChart();
    }
    initData();
    function updateChart() {
        var data = {
            "status": 200,
            "data": {
                "statisticsDates": ["2017-02-17", "2017-02-18"],
                "showData": [
                    {
                        "opinionCount": 1956,
                        "opinionTypeCode": "ot01",
                        "opinionTypeName": "咨询"
                    },
                    {
                        "opinionCount": 2956,
                        "opinionTypeCode": "ot01",
                        "opinionTypeName": "投诉举报"
                    },
                    {
                        "opinionCount": 56,
                        "opinionTypeCode": "ot01",
                        "opinionTypeName": "求助"
                    },
                    {
                        "opinionCount": 956,
                        "opinionTypeCode": "ot01",
                        "opinionTypeName": "建议"
                    },
                    {
                        "opinionCount": 3956,
                        "opinionTypeCode": "ot01",
                        "opinionTypeName": "表扬"
                    }
                ]
            }
        };
        var paramData = {
            id: 'chartId',
            color: ['#00c0fe', '#0082d2', '#fbc802', '#fe5600', '#ff9200'],
            legendGrid: {left: '10%', top: '28%',},
            center: ['50%', '40%'],
            radius: ['30%', '50%'],
            data: []
        };
        for (var i = 0; i < data.data.showData.length; i++) {
            paramData.data.push({
                value: data.data.showData[i].opinionCount,
                code: data.data.showData[i].opinionTypeCode,
                name: data.data.showData[i].opinionTypeName
            })
        }
        resetOpt();//重置默认配置
        waterPoloOpt.isRose = true;//使用玫瑰图
        waterPoloOpt.labelLine = true;//使用标线
        waterPoloOpt.legend = true;//使用图例
        var myChart = initPie(paramData)
        myChart.on('click',function(param){
            //localStorage.setItem('code',code+'-'+param.data.code);
            //localStorage.setItem('name',name+'-'+param.data.name);
            var pm = '?type=2&time=&name='+name+'-'+param.data.name+'&code='+code+'-'+param.data.code;
            window.location.href = "./classes_theme.html"+pm;
        });
    }
});
