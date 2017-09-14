/**
 * Created by yyg on 2017/2/20.
 */

//添加皮肤
$('html').addClass(localStorage.getItem('theme'));
var initData,simple=!localStorage.getItem('theme');
$(document).ready(function(){
    $('.change_theme').on('click',function(){
        if($(this).text()==='深色版'){
            $(this).text('浅色版');
        }else{
            $(this).text('深色版');
        }
        if($('html').attr("class")){
            simple = true;
            $('html').removeAttr('class');
            localStorage.setItem('theme','');
        }else{
            simple = false;
            $('html').addClass('black_theme');
            localStorage.setItem('theme','black_theme');
        }
        if(initData){
            initData();
        }
        $('iframe').attr('src', $('iframe').attr('src'));
    });
    $('.menu li').on('click',function(){
        //$(this).addClass('active').siblings().removeClass('active');
        //$('#content').load($(this).attr('chref'));
        window.location.href = $(this).attr('chref');
    });

    $("span.out").click(function(){              //退出系统
        window.location.href ="login.html";
    });
    $('.min_menu span').on('click',function(){
        localStorage.setItem('type',$(this).attr('value'));
        $('.min_menu .active').removeClass('active');
        $(this).addClass('active');
        window.location.href = $(this).attr('chref');
    });
    $('.left_menu li').on('click',function(){
        $(this).addClass('active');
    });

    $('.time_tool .radio').on('click',function(){
        if($(this).find('label').text()=='自定义时间'){
            $(this).next().find('input').eq(0).trigger('click');
        }
    });

});


//加载模板数据
function loadTempDate($tContainer, $container, data) {
    var handlerTemp = Handlebars.compile($tContainer.html());
    $container.html(handlerTemp(data));
}

//切换头部菜单选中状态
function changeMenuTo(menuName){
    $(".menu li").each(function(){
        if($(this).text()=== menuName){
            $(this).addClass('active').siblings().removeClass('active');
        }
    });
}

//自动配置气泡颜色
function AutoConfigureColor(arr,item){
    var itemIndex=arr.indexOf(item);
    if(itemIndex<2){
        iColor='#fa7f49';    //红
    }
    else if(itemIndex>1 && itemIndex<5){
        iColor='#ffbd00';   //橙
    }
    else if(itemIndex>4 && itemIndex<8){
        iColor='#5daeff';  //蓝
    }
    else{
        iColor='#6cd139'; //绿
    }
    return iColor;
}

//随机数值
function randomData(str) {
    return Math.round(Math.random()*(str?str:1000));
}
/**
 * 获取url中参数，并封装为对象
 * @returns {Object}
 * @constructor
 */
function getUrlObj(){
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=decodeURIComponent(decodeURIComponent(strs[i].split("=")[1]));
        }
    }
    return theRequest;
}