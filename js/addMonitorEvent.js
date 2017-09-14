/**
 * Created by 魏阁 on 2017-3-2.
 */
$(function(){
    //changeMenuTo("民意监测");
    $(".eventDetail button").click(function(){
        $(this).addClass("active").siblings().removeClass("active");
    });
    $("button.confirm").click(function(){                        //确认
        //$('#content').load('../html/opinionMonitoring.html');    //点击跳转的页面
        window.location.href = "../html/opinionMonitoring.html";   //点击跳转的页面(联调时要带参数)
    });
    $("button.reset").click(function(){                         //重置
        $('.eventName,.eventKey,.eventRegion').val("");
    });
});