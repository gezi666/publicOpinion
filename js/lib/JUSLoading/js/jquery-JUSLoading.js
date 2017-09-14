/**
 * Created by yyg on 2016/12/21.
 */
(function ($) {
    var methods = {
        init: function (options) {
            var settings = $.extend({
                type:0,//类型0或者1，如果为type=1且isBg=false时loadTxt失效
                isBg: false,//文字是否需要背景
                loadTxt:null,//加载文字
                bgColor:null,//遮罩背景色
                fontColor:null,//加载文字颜色
                imageURL:null,//自定义图片路径
                isCircle:true,//是否使用CSS3旋转动画
                innerHtml:null//自定义html内容
            },options);
            var bgEle = this;
            if(bgEle.css('position')=='static'){
                bgEle.css('position','relative');
            }
            if(this.children('.y_loading_container').length>0){//如果已经创建，移除
                this.children('.y_loading_container').remove();
            }
            var yc = $('<div class="y_loading_container"></div>');
            if(bgEle[0].tagName=='BODY'){
                yc.css('position','fixed');
            }
            if(settings.bgColor){
                if(methods.isIe()&&methods.isIe()<=8&&settings.bgColor.toLowerCase().indexOf('rgba')!=-1){
                    //处理ie8浏览器使用rgba色
                    var colors = settings.bgColor.substring(5,settings.bgColor.length);
                    colors = colors.substring(0,colors.length-1).split(',');
                    settings.bgColor = 'rgb('+colors.slice(0,colors.length-1).toString()+')';
                    yc.get(0).style.filter = "Alpha(opacity="+colors[3].split('.')[1]*10+")";
                }
                yc.get(0).style.backgroundColor=settings.bgColor;
            }
            yc.get(0).style.transition = 'opacity .5s ease';
            if(settings.innerHtml){
                var html = $(settings.innerHtml);
                html.addClass('absolute_mid');//设置绝对居中
                yc.append(html);
                this.append(yc);
                return;
            }else{
                var yMain = $('<div class="y_loading_main"></div>');
                yc.append(yMain);
                var yImg;
                if(settings.imageURL){//如果传递图片路径
                    yImg = $('<img src="'+settings.imageURL+'">');
                    yImg.get(0).onload = function(){
                        if(yImg.height()>34){
                            bgEle.find('.y_loading_container img').height(34);
                            bgEle.find('.y_loading_container img').width(yImg.width() * (34/yImg.height()));
                        }
                    };
                    if(settings.imageURL.toLowerCase().indexOf('gif')==-1){//不是gif图片
                        yImg.addClass('circleAnimation');
                    }
                }else{//使用默认
                    yImg = $('<span class="jsf_img"></span>');
                    if(methods.isIe()&&methods.isIe()<=9){//IE8及其以下浏览器
                        yImg.addClass('ie8_img');
                    }
                    if(settings.bgColor){
                        yImg.addClass('img_'+settings.type);
                    }else{
                        yImg.addClass('img_0'+settings.type);
                    }
                    if(settings.isCircle&&settings.type!=1){//使用旋转动画
                        yImg.addClass('circleAnimation');
                    }
                    if(settings.type==1&&!settings.loadTxt){//只使用type=1时，loading不居中问题
                       yMain.css('padding','6px 4px 2px 4px');
                    }
                }
                yMain.append(yImg);
                yc.append(yMain);

                if(settings.isBg) {//如果需要背景
                    yMain.addClass('text_bg');
                }else{
                    yMain.addClass('lineBox');
                }
                if((settings.type==1&&settings.isBg)||settings.type!=1){
                    if(settings.loadTxt&&settings.loadTxt!=''){//如果需要文字
                        yMain.append('<span class="jsf_img_text">'+settings.loadTxt+'</span>');
                    }
                }
                if(settings.fontColor&&yMain.find('.jsf_img_text').length>0){//文字颜色
                    yMain.find('.jsf_img_text').get(0).style.color = settings.fontColor;
                }
            }
            this.append(yc);
        },
        isIe: function() {//ie浏览器判断
            if(navigator.appName=="Microsoft Internet Explorer" )
            {
                var version=navigator.appVersion.split(";");
                var trim_Version = version[1].replace(/[ ]/g,"").replace('MSIE','');
                trim_Version = parseInt(trim_Version);
                return trim_Version;
            }
            return false;
        }
    };
    $.fn.JUSLoading = function (options) {
        // 方法调用
        if (typeof options === 'object' || !options) {
             methods.init.apply(this, arguments);
        }else {
            $.error('Method' + options + 'does not exist on jQuery.JUSLoading');
        }
        this.hide = function(){
            var obj = this.children('.y_loading_container');
            obj.get(0).style.opacity = 0;
            setTimeout(function(){obj.hide();},500);
        }
        this.show = function(){
            this.children('.y_loading_container').show();
            this.children('.y_loading_container').get(0).style.opacity = 1;
        }
        this.destroy = function(){
            var obj = this.children('.y_loading_container');
            obj.get(0).style.opacity = 0;
            setTimeout(function(){obj.remove();},500);
        }
        return this;
    };
    initCSS(); //js动态添加css
    function initCSS(){
        var js=document.scripts;
        js=js[js.length-1].src.substring(0,js[js.length-1].src.lastIndexOf("/")+1);
        js= js+'../css/jquery-JUSLoading.css'
        var link = document.createElement("link");
        link.type = "text/css";
        link.rel = "stylesheet";
        link.href = js;
        document.getElementsByTagName("head")[0].appendChild(link);
    }
})(jQuery);