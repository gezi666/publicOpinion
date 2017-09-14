/**
 * Created by 魏阁 on 2017-3-2.
 */
$(function(){
    //changeMenuTo("民意监测");
    initMonitorList();

    $("button.addMonitor,span.editRecord").click(function(){
        //$('#content').load('../html/addMonitorEvent.html');    //点击跳转的页面
        window.location.href = "../html/addMonitorEvent.html";   //点击跳转的页面(联调时要带参数)
    });
});

//初始化监测列表
function initMonitorList() {
    var monitorData = [
        {"event": "下雨天交通拥堵", "keyWords": "交通、车祸、古槐树、拥堵、交通管理","count":1000,"govCount":260,"netCount":220},
        {"event": "房价", "keyWords": "交通、车祸、古槐树、拥堵、交通管理","count":1000,"govCount":260,"netCount":220},
        {"event": "下雨天交通拥堵", "keyWords": "交通、车祸、古槐树、拥堵、交通管理","count":1000,"govCount":260,"netCount":220},
        {"event": "房价", "keyWords": "交通、车祸、古槐树、拥堵、交通管理","count":1000,"govCount":260,"netCount":220},
        {"event": "下雨天交通拥堵", "keyWords": "交通、车祸、古槐树、拥堵、交通管理","count":1000,"govCount":260,"netCount":220},
        {"event": "房价", "keyWords": "交通、车祸、古槐树、拥堵、交通管理","count":1000,"govCount":260,"netCount":220},
        {"event": "下雨天交通拥堵", "keyWords": "交通、车祸、古槐树、拥堵、交通管理","count":1000,"govCount":260,"netCount":220}
    ];
    loadTempDate($("#tmonitorList"), $("#monitorList"), monitorData );
}

