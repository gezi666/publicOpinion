/**
 * Created by yyg on 2017/2/21.
 */
$(document).ready(function(){
    $('.min_menu span').on('click',function(){
        localStorage.setItem('type',$(this).attr('value'));
        $('.min_menu .active').removeClass('active');
        $(this).addClass('active');
        if($(this).attr('chref')){
            $('.mainBody').load($(this).attr('chref'));
        }else {
            var html = '<div style="text-align: center;font-size:16px;color:red;margin-top: 20%;">菜单没有链接</div>'
            $('.mainBody').html(html);
        }
    });
    $('.left_menu li').on('click',function(){
         $(this).addClass('active');
    });
    $('.min_menu span').eq(localStorage.getItem('type')).trigger('click');
});