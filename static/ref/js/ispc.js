(function  (window,layer) {
    window.isPc = function () {
        var sUserAgent = navigator.userAgent.toLowerCase();
        var bIsIpad = sUserAgent.match(/ipad/i) == "ipad";
        var bIsIphoneOs = sUserAgent.match(/iphone os/i) == "iphone os";
        var bIsMidp = sUserAgent.match(/midp/i) == "midp";
        var bIsUc7 = sUserAgent.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
        var bIsUc = sUserAgent.match(/ucweb/i) == "ucweb";
        var bIsAndroid = sUserAgent.match(/android/i) == "android";
        var bIsCE = sUserAgent.match(/windows ce/i) == "windows ce";
        var bIsWM = sUserAgent.match(/windows mobile/i) == "windows mobile";
        if ((bIsIpad || bIsIphoneOs || bIsMidp || bIsUc7 || bIsUc || bIsAndroid || bIsCE || bIsWM) ){
            $(function () {
                var _index = layer.open({
                    type: 1
                    ,title: false //不显示标题栏
                    ,closeBtn: false
                    ,area: '300px;'
                    ,shade: 0.8
                    ,id: 'LAY_layuipro' //设定一个id，防止重复弹出
                    ,btn: ['确定']
                    ,btnAlign: 'c'
                    ,moveType: 1
                    ,content:
                        '<div style="padding: 50px; line-height: 22px; background-color: #393D49; color: #fff; font-weight: 300;">' +
                        '检测到您使用的手机浏览器.' +
                        '<br>建议您使用Pc进行浏览' +
                        '<br><br>因为:' +
                        '<br>&nbsp;&nbsp;涉及到数据运算、分析' +
                        '<br>&nbsp;&nbsp;传统手机浏览器解析慢' +
                        '<br>&nbsp;&nbsp;容易导致浏览器崩溃' +
                        '<br>&nbsp;&nbsp;为了良好体验,请使用PC操作' +
                        '</div>'
                    ,success: function(layero){
                        layer.close(_index);
                    }
                });
            });
        }else{
            console.log("当前设备为pc ::::: 无需提示");
        }
    }
    window.isPc();
})(window,layer)


