/**
 * Created by yyg on 2017/2/28.
 */
(function(){
    $('.min_menu span').on('click',function(){
        window.location.href = $(this).attr('chref');
    });
    $("#Pagination").pagination(56, {
        num_edge_entries: 2,
        num_display_entries: 4,
        prev_text:'<<',
        next_text:'>>',
        callback: function(){

        },
        items_per_page:1
    });
})()