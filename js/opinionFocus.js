/**
 * Created by 魏阁 on 2017-3-3.
 */
$(document).ready(function(){
    //changeMenuTo("民意聚焦");
    $(".min_menu span").click(function(){
        $(this).addClass("active").siblings().removeClass("active");
    });
});