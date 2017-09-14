/**
 * Created by yyg on 2017/3/6.
 */
$(document).ready(function(){
    $('.min_menu span').on('click',function(){
         window.location.href = $(this).attr('chref');
    });
});