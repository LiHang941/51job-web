
var JOB_CONSTANT = {};
JOB_CONSTANT.degree = [{"code":"01","value":"初中及以下"},{"code":"02","value":"高中/中技/中专"},{"code":"03","value":"大专"},{"code":"04","value":"本科"},{"code":"05","value":"硕士"},{"code":"06","value":"博士"}];
JOB_CONSTANT.cosize = [{"code":"01","value":"少于50人"},{"code":"02","value":"50-150人"},{"code":"03","value":"150-500人"},{"code":"04","value":"500-1000人"},{"code":"05","value":"1000-5000人"},{"code":"06","value":"5000-10000人"},{"code":"07","value":"10000人以上"}];
JOB_CONSTANT.issuedate = [{"code":"0","value":"24小时内"},{"code":"1","value":"近三天"},{"code":"2","value":"近一周"},{"code":"3","value":"近一月"}];
JOB_CONSTANT.saltype = [{"code":"01","value":"2千以下"},{"code":"02","value":"2-3千"},{"code":"03","value":"3-4.5千"},{"code":"04","value":"4.5-6千"},{"code":"05","value":"6-8千"},{"code":"06","value":"0.8-1万"},{"code":"07","value":"1-1.5万"},{"code":"08","value":"1.5-2万"},{"code":"09","value":"2-3万"},{"code":"10","value":"3-4万"},{"code":"11","value":"4-5万"},{"code":"12","value":"5万以上"}];
JOB_CONSTANT.workyear = [{"code":"01","value":"无经验"},{"code":"02","value":"1-3年"},{"code":"03","value":"3-5年"},{"code":"04","value":"5-10年"},{"code":"05","value":"10年以上"}];
JOB_CONSTANT.area = [{"code":"000000","value":"热门城市"},{"code":"000001","value":"A B C"},{"code":"000002","value":"D E F G"},{"code":"000003","value":"H I"},{"code":"000004","value":"J K"},{"code":"000005","value":"L M N"},{"code":"000006","value":"O P Q R"},{"code":"000007","value":"S T U"},{"code":"000008","value":"V W X"},{"code":"000009","value":"Y Z"},{"code":"000010","value":"所有省份(含港澳台)"},{"code":"000011","value":"国外"},{"code":"000012","value":"全国"}];
JOB_CONSTANT.jobterm = [{"code":"01","value":"全职"},{"code":"02","value":"兼职"}];
JOB_CONSTANT.cotype = [{"code":"01","value":"\n                 外资（欧美） \n            "},{"code":"02","value":"\n                 外资（非欧美） \n            "},{"code":"03","value":"\n                 合资 \n            "},{"code":"04","value":"\n                 国企 \n            "},{"code":"05","value":"\n                 民营公司 \n            "},{"code":"06","value":"\n                 外企代表处 \n            "},{"code":"07","value":"\n                 政府机关 \n            "},{"code":"08","value":"\n                 事业单位 \n            "},{"code":"09","value":"\n                 非营利机构 \n            "},{"code":"10","value":"\n                 上市公司 \n            "},{"code":"11","value":"\n                 创业公司 \n            "}];
(function($,layer) {
    if($==null || $===undefined ){
        console.log("Jquery不存在");
        return ;
    }
    if(layer==null || layer===undefined ){
        console.log("Layer不存在");
        return ;
    }
   $.job_bast_post = function ($url,$data,$successFn,$errorFn) {
           $.ajax(
               {
                   url:$url,
                   type:"POST",
                   dataType:"JSON",
                   data:$data,
                   success: function(result){
                       if($successFn!=null)
                           $successFn(result);

                   },
                   error:function () {
                       if($errorFn!=null)
                           $errorFn();
                   }
               }
           );
   }
})(jQuery,layer);


/**
 * 修改选择的select
 * @param id
 */
function change_main(id) {
    $("#nav_" + select_main_id ).removeClass("layui-this");
    $("#" + select_main_id).hide("slow");
    $("#nav_" + id ).addClass("layui-this");
    $("#" + id).show("slow");
    select_main_id = id;
    layui.element.render();
}

/**
 * 生成代码
 */
function create_code() {
    change_main("main-4");
    var $dom = $("#job_code");
    $dom.html("[");
    var $data = JOB_DATA().order("lastupdate desc,coname desc");
    var count =$data.count();
    var index = 0;
    $data.each(function (r) {
        $dom.append( JSON.stringify(r, null, 4));
        if(index < count){
            $dom.append(",");
        }
        index ++ ;
    });
    $dom.append("]");
}

var create_chart_fn = {
    interval_code : {
        chart_area:null
    },
    fn:{
        //区域统计
        area : function(){
            var myChart = echarts.init(document.getElementById('chart_area'));
            // 指定图表的配置项和数据
            var $data = JOB_DATA().distinct("jobarea");
            var $dataAll = [];
            $.each($data , function(i, n){
                var _temp = {};
                _temp.value = JOB_DATA({"jobarea":{"is":n}}).count();
                _temp.name = n;
                $dataAll.push(_temp);
            });
            var option  = {
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c}个"
                },
                toolbox: {
                    feature: {
                        saveAsImage: {},
                        restore: {},
                    }
                },
                legend: {
                    bottom: 10,
                    left: 'center',
                    data: $data
                },
                series : [
                    {
                        name: '职位个数',
                        type: 'pie',
                        radius : '50%',
                        center: ['50%', '45%'],
                        data:$dataAll
                    }
                ]
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
            var currentIndex = -1;
            if(create_chart_fn.interval_code.chart_area!=null){
                clearInterval(create_chart_fn.interval_code.chart_area);
                currentIndex = -1;
            }
            create_chart_fn.interval_code.chart_area = setInterval(function () {
                var dataLen = option.series[0].data.length;
                // 取消之前高亮的图形
                myChart.dispatchAction({
                    type: 'downplay',
                    seriesIndex: 0,
                    dataIndex: currentIndex
                });
                currentIndex = (currentIndex + 1) % dataLen;
                // 高亮当前图形
                myChart.dispatchAction({
                    type: 'highlight',
                    seriesIndex: 0,
                    dataIndex: currentIndex
                });
                // 显示 tooltip
                myChart.dispatchAction({
                    type: 'showTip',
                    seriesIndex: 0,
                    dataIndex: currentIndex
                });
            }, 1000);
        },
        //公司职位发布统计
        company:function () {
            var myChart = echarts.init(document.getElementById('chart_company'));
            // 指定图表的配置项和数据
            var $data = JOB_DATA().distinct("coname");
            var $dataAll = [];
            $.each($data , function(i, n){
                var _temp = {};
                _temp.value = JOB_DATA({"coname":{"is":n}}).count();
                _temp.name = n;
                $dataAll.push(_temp);
            });
            var option = {
                tooltip: {
                    trigger: 'axis',
                    formatter: "{b} 共 {c} 个职位"
                },
                toolbox: {
                    feature: {
                        restore: {},
                        saveAsImage: {}
                    }
                },
                dataZoom: [{
                    type: 'inside',
                    start: 0,
                    end: 10
                }, {
                    start: 0,
                    end: 10,
                    handleSize: '80%',
                    handleStyle: {
                        color: '#fff',
                        shadowBlur: 3,
                        shadowColor: 'rgba(0, 0, 0, 0.6)',
                        shadowOffsetX: 2,
                        shadowOffsetY: 2
                    }
                }],
                xAxis: {
                    name:"公司名",
                    data: $data,
                    axisLabel:{
                        show:false,
                    },
                },
                yAxis: {
                    name:"职位发布个数"
                },
                series: {
                    name: '公司名称',
                    type: 'line',
                    data: $dataAll,
                }
            };
            myChart.setOption(option);
        },
        //
    }
};
/**
 * 创建统计图
 */
function create_chart(){
    change_main("main-2");
    create_chart_fn.fn.area();
    create_chart_fn.fn.company();
}

/**
 * 修改进度条
 * @param pageno
 * @param pageSize
 */
function change_progress(pageno,pageSize) {
    $("#from_progress").show();
    layui.element.progress('my_progress', parseInt(pageno / pageSize * 100) + "%" );
    if(pageno / pageSize == 1){
        setTimeout(function () {
            $("#from_progress").hide();
        },1000);
    }
}

/**
 *
 */
function table_delete_select() {
    var checkStatus = layui.table.checkStatus('job_data_table')
    var data = checkStatus.data;
    layer.alert(JSON.stringify(data));
}

/**
 * 创建表格
 */
function create_table() {
    change_main("main-3");
    var $data = [];
    JOB_DATA().order("lastupdate desc,coname desc").each(function (r) {
        $data.push(r);
    });
    layui.table.render({
        elem: '#job_data_table'
        ,height: 'full'
        ,cellMinWidth: 80
        ,cols: [[
            {type:'checkbox', fixed: 'left'}
            ,{type:'numbers'}
            ,{field:'jobname', width:250, title: '工作名称'}
            ,{field:'degree', width:80, title: '学历'}
            ,{field:'workyear', width:100, title: '工作经验'}
            ,{field:'providesalary',width:100,  title: '工资'}
            ,{field:'jobarea',width:160, title: '地区'}
            ,{field:'cddr', width:200, title: '工作地点'}
            ,{field:'coname',width:250, title: '公司名称'}
            ,{field:'cotype', width:120,title: '公司类型'}
            ,{field:'lastupdate',width:160,  title: '发布时间'}
            ,{fixed: 'right', title:'操作',align:'center',width:160, toolbar: '#job_table_bar'}
        ]]
        ,data:$data
        ,skin:'line'
        ,limit:12
        ,limits:[12,20,30]
        ,page: true
        ,even: true
    });
}

