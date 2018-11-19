/**
 * ajax 二次封装
 */
(function ($) {
    $.job_bast_post = function ($url, $data, $successFn, $errorFn) {
        $.ajax(
            {
                url: $url,
                type: "POST",
                dataType: "JSON",
                data: $data,
                success: function (result) {
                    if ($successFn != null)
                        $successFn(result);
                },
                error: function () {
                    if ($errorFn != null)
                        $errorFn();
                }
            }
        );
    }
})(jQuery);

(function (window) {
    var dataChangeVersion = 1;

    window.data_change = function () {
        dataChangeVersion += 1;
    }

    window.get_data_change_version = function () {
        return dataChangeVersion;
    }

})(window);

/**
 * 修改选择的select
 * @param id
 */
(function (window) {
    var select_main_id = "main-1";
    window.change_main = function (id, callFn) {
        var _index = layer.load(2);
        $("html,body").scrollTop(0);
        $("#nav_" + select_main_id).removeClass("layui-this");
        $("#" + select_main_id).hide("slow");
        $("#nav_" + id).addClass("layui-this");
        $("#" + id).show("slow");
        select_main_id = id;
        layui.element.render();
        setTimeout(function () {
            if (callFn != null) {
                callFn();
            }
            layer.close(_index);
        }, 0);
    }
    change_main(select_main_id);
})(window);


/**
 * 生成代码
 */
(function (window, layui, layer) {
    var page = 1;
    const pageSize = 10;
    var create_node = function (list) {
        var node = $("<pre></pre>").attr("class", "layui-code")
            .attr("lay-encode", "layui-code")
            .attr("lay-title", "JavaScript")
            .attr("about", "true")
            .attr("style", "width: 100%;");
        node.html(JSON.stringify(list, json_filter, 4));
        return node;
    }

    window.code_next_page = function () {
        var offSet = (page - 1) * pageSize + 1;
        var $data = FIlTER_JOB_DATA().order("lastupdate desc,coname desc");
        var count = $data.count();
        if ((offSet >= count && count != 0) || (page > 1 && count == 0)) {
            $("#main-4 p button").hide();
            layer.msg('没有更多的数据可供显示!!!', {icon: 2});
            return;
        }
        $data = FIlTER_JOB_DATA().order("lastupdate desc,coname desc").start(offSet).limit(pageSize);
        var list = [];
        $data.each(function (r) {
            list.push(r);
        });
        page = page + 1;
        var node = create_node(list);
        var id = "code_" + new Date().getTime();
        node.attr("id", id);
        $("#main-4 p").before(node);
        layui.code({elem: "#" + id});
    }

    var dataVersion = null;

    window.code_clear = function () {
        if (dataVersion == null || dataVersion < get_data_change_version()) {
            $("#main-4 pre").remove();
            $("#main-4 p button").show();
            page = 1;
            code_next_page();
        }
        dataVersion = get_data_change_version();
    }

    window.create_code = function () {
        change_main("main-4", function () {
            code_clear();
        });
    }

})(window, layui, layer);


/**
 * 创建统计图
 */
(function (window) {

    var create_chart_fn = {
        interval_code: {
            chart_area: null,
            chart_workyear: null
        },
        fn: {
            //区域统计
            area: function () {
                var myChart = echarts.init(document.getElementById('chart_area'));
                // 指定图表的配置项和数据
                var $data = FIlTER_JOB_DATA().distinct("jobarea");
                var $dataAll = [];
                $.each($data, function (i, n) {
                    var _temp = {};
                    _temp.value = FIlTER_JOB_DATA().filter({"jobarea": {"is": n}}).count();
                    _temp.name = n;
                    $dataAll.push(_temp);
                });
                var option = {
                    tooltip: {
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
                    series: [
                        {
                            name: '职位个数',
                            type: 'pie',
                            radius: '50%',
                            center: ['50%', '45%'],
                            data: $dataAll
                        }
                    ]
                };
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
                var currentIndex = -1;
                if (create_chart_fn.interval_code.chart_area != null) {
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
                return myChart;
            },
            //公司职位发布统计
            company: function () {
                var myChart = echarts.init(document.getElementById('chart_company'));
                // 指定图表的配置项和数据
                var $coid = [];
                var $x = [];
                var $y = [];
                $.each(FIlTER_JOB_DATA().distinct("coid"), function (i, n) {
                    var _temp = FIlTER_JOB_DATA().filter({"coid": {"is": n}});
                    $coid.push(n);
                    $x.push(_temp.first().coname);
                    $y.push(_temp.count());
                });
                var option = {
                    tooltip: {
                        trigger: 'axis',
                        enterable: true,
                        triggerOn: "click",
                        position: [0, 0],
                        formatter: function (params, ticket, callback) {
                            setTimeout(function () {
                                var coname = $x[params[0].dataIndex];
                                var ccount = $y[params[0].dataIndex];
                                var coid = $coid[params[0].dataIndex];
                                var str = coname + "<br/>共发布了 <b style='color: #007DDB'>" + ccount + "</b>个职位<br/>";
                                str = str + "<a class='layui-btn layui-btn-primary layui-btn-xs' href='http://jobs.51job.com/all/co" + coid + ".html' target='_blank'>查看公司</a>";
                                str = str + "<a class='layui-btn layui-btn-danger layui-btn-xs' href='javascript:;' onclick='$(this).parent().hide();'>关闭</a><hr/>";
                                var i = 1;
                                FIlTER_JOB_DATA().filter({"coid": {"is": coid}}).each(function (obj) {
                                    str = str + i + ":" + obj.jobname + "<br/>"
                                    i++;
                                });
                                if (i >= 20) {
                                    str = str + "<div style='margin-top: 100px;'></div>";
                                }
                                callback(ticket, str);
                            }, 0);
                            return "loading...";
                        }
                    },
                    toolbox: {
                        feature: {
                            magicType: {type: ['line', 'bar']},
                            saveAsImage: {}
                        }
                    },
                    dataZoom: [{
                        type: 'inside',
                        start: 0,
                        end: 1000 / $x.length
                    }, {
                        start: 0,
                        end: 1000 / $x.length,
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
                        name: "公司名",
                        data: $x,
                        axisLabel: {
                            show: false,
                        },
                    },
                    yAxis: {
                        name: "职位发布个数"
                    },
                    series: {
                        name: '公司名称',
                        type: 'line',
                        data: $y,
                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值'}
                            ]
                        },
                    }
                };
                myChart.setOption(option);
                return myChart;
            },
            //薪资情况chart_sal
            sal: function () {
                var myChart = echarts.init(document.getElementById('chart_sal'));
                // 指定图表的配置项和数据
                var $data = [];
                var $x = [];
                var $salMax = [];
                var $salMin = [];
                $.each(FIlTER_JOB_DATA().distinct("jobid"), function (i, n) {
                    var $job = FIlTER_JOB_DATA().filter({"jobid": {"is": n}}).first();
                    if (isFinite($job.startSalary) && isFinite($job.endSalary)) {
                        $data.push($job);
                        $x.push($job.jobname);
                        $salMin.push($job.startSalary);
                        $salMax.push($job.endSalary);
                    }
                });

                var option = {
                    tooltip: {
                        trigger: 'axis',
                        enterable: true,
                        triggerOn: "click",
                        position: [0, 0],
                        formatter: function (params, ticket, callback) {
                            var $job = $data[params[0].dataIndex];
                            $.job_bast_post("get", {jobid: $job.jobid}, function (result) {
                                var job = jobinfo_Parse(result.key);
                                var str = "";
                                for (var key in JOB_CONSTANT.convert) {
                                    if (job[key] !== undefined) {
                                        str = str + "<span style='color: #01AAED;font-weight:bold;'>"
                                            + JOB_CONSTANT.convert[key] + ":</span>"
                                            + "&nbsp;&nbsp;&nbsp;" + job[key].replace(/\n/g, "<br/>");
                                    }
                                    str = str + " <br/>";
                                }
                                str = str + " <br/>";
                                str = str + "<a class='layui-btn layui-btn-warm layui-btn-xs' href='http://jobs.51job.com/overseas/" + $job.jobid + ".html' target='_blank'>查看职位</a>";
                                str = str + "<a class='layui-btn layui-btn-primary layui-btn-xs' href='http://jobs.51job.com/all/co" + $job.coid + ".html' target='_blank'>查看公司</a>";
                                str = str + "<a class='layui-btn layui-btn-danger layui-btn-xs' href='javascript:;' onclick='$(this).parent().hide();'>关闭</a>";
                                //todo 关不掉
                                callback(ticket, str);
                            });
                            return "loading...";
                        },

                    },
                    legend: {
                        data: ['最高薪资', '最低薪资']
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            magicType: {type: ['line', 'bar']},
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        axisLabel: {
                            show: false,
                        },
                        data: $x
                    },
                    yAxis: {
                        type: 'value',
                    },
                    series: [
                        {
                            name: '最高薪资',
                            type: 'line',
                            data: $salMax,
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'}
                                ]
                            },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'}
                                ]
                            }
                        },
                        {
                            name: '最低薪资',
                            type: 'line',
                            data: $salMin,
                            markPoint: {
                                data: [
                                    {type: 'min', name: '最大值'}
                                ]
                            },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'}
                                ]
                            }
                        }
                    ],
                    dataZoom: [{
                        type: 'inside',
                        start: 0,
                        end: 1000 / $x.length
                    }, {
                        start: 0,
                        end: 1000 / $x.length,
                        handleSize: '80%',
                        handleStyle: {
                            color: '#fff',
                            shadowBlur: 3,
                            shadowColor: 'rgba(0, 0, 0, 0.6)',
                            shadowOffsetX: 2,
                            shadowOffsetY: 2
                        }
                    }],
                };
                myChart.setOption(option);
                return myChart;
            },
            //经验要求chart_workyear
            workyear: function () {
                var myChart = echarts.init(document.getElementById('chart_workyear'));
                // 指定图表的配置项和数据
                var $data = FIlTER_JOB_DATA().distinct("workyear");
                var $dataAll = [];
                $.each($data, function (i, n) {
                    var _temp = {};
                    _temp.value = FIlTER_JOB_DATA().filter({"workyear": {"is": n}}).count();
                    _temp.name = n;
                    $dataAll.push(_temp);
                });
                var option = {
                    tooltip: {
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
                    series: [
                        {
                            name: '工作经验用人分布',
                            type: 'pie',
                            radius: '50%',
                            center: ['50%', '45%'],
                            data: $dataAll
                        }
                    ]
                };
                // 使用刚指定的配置项和数据显示图表。
                myChart.setOption(option);
                var currentIndex = -1;
                if (create_chart_fn.interval_code.chart_area != null) {
                    clearInterval(create_chart_fn.interval_code.chart_workyear);
                    currentIndex = -1;
                }
                create_chart_fn.interval_code.chart_workyear = setInterval(function () {
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
                return myChart;
            }
        }
    };

    window.charts_fn = function (name, call) {
        var mychart = charts_ids[name];
        if (mychart != null) {
            call(mychart);
        }
    };

    window.charts_ids = {area: null, company: null, workyear: null, sal: null};

    var dataVersion = null;

    window.create_chart = function () {
        change_main("main-2", function () {
            if (dataVersion == null || dataVersion < get_data_change_version()) {
                charts_ids ['area'] = create_chart_fn.fn.area();
                charts_ids ['company'] = create_chart_fn.fn.company();
                charts_ids ['workyear'] = create_chart_fn.fn.workyear();
                charts_ids ['sal'] = create_chart_fn.fn.sal();
            }
            dataVersion = get_data_change_version();
        });
    }

})(window)


/**
 * 修改进度条
 * @param pageno
 * @param pageSize
 */
function change_progress(pageno, pageSize) {
    $("#from_progress").show();
    layui.element.progress('my_progress', parseInt(pageno / pageSize * 100) + "%");
    if (pageno / pageSize == 1) {
        setTimeout(function () {
            $("#from_progress").hide();
        }, 1000);
    }
}


(function (window) {
    var dataVersion = null;
    /**
     * 切换到表格界面并创建表格
     */
    window.create_table = function () {
        change_main("main-3", function () {
            if (dataVersion == null || dataVersion < get_data_change_version()) {
                create_table_data();
            }
            dataVersion = get_data_change_version();
        });
    }

    /**
     * 生成二次筛选条件
     */
    window.create_condition = function (db) {
        var $list = $("#job-table-form select");
        var _create_select = function ($select, list) {
            $select = $($select);
            $select.find("option:gt(0)").remove();
            list.sort();
            for (var i = 0; i < list.length; i++) {
                $select.append("<option value='" + list[i] + "'>" + list[i] + "</option>");
            }
        };
        _create_select($list[0], db().distinct("providesalary"));
        _create_select($list[1], db().distinct("workyear"));
        _create_select($list[2], db().distinct("degree"));
        layui.form.render();
    }

})(window);

/**
 * 创建表格数据
 */
function create_table_data() {
    var $data = [];
    FIlTER_JOB_DATA().order("lastupdate desc,coname desc").each(function (r) {
        $data.push(r);
    });
    layui.table.render({
        elem: '#job_data_table'
        , height: 'full'
        , cellMinWidth: 80
        , cols: [[
            {type: 'checkbox', fixed: 'left'}
            , {type: 'numbers'}
            , {field: 'jobname', width: 250, title: '工作名称'}
            , {field: 'degree', width: 80, title: '学历'}
            , {field: 'workyear', width: 100, title: '工作经验'}
            , {field: 'providesalary', width: 120, title: '工资'}
            , {field: 'jobarea', width: 160, title: '地区'}
            , {field: 'cddr', width: 200, title: '工作地点'}
            , {field: 'coname', width: 250, title: '公司名称'}
            , {field: 'cotype', width: 120, title: '公司类型'}
            , {field: 'lastupdate', width: 160, title: '发布时间'}
            , {field: 'issuedate', width: 160, title: '最后更新'}
            , {fixed: 'right', title: '操作', align: 'center', width: 160, toolbar: '#job_table_bar'}
        ]]
        , data: $data
        , skin: 'line'
        , limit: 12
        , limits: [12, 20, 30]
        , page: true
        , even: true
    });
}

(function (window) {
    var condition = null;

    window.FIlTER_JOB_DATA = function () {
        if (condition == null) {
            return JOB_DATA();
        } else {
            var jd = JOB_DATA();
            for (var i = 0; i < condition.length; i++) {
                jd = jd.filter(condition[i]);
            }
            return jd;
        }
    };

    window.clear_Condition = function () {
        condition = null;
        data_change();
    };

    window.get_Condition = function () {
        var conditionJsonList = $("#job-table-form").serializeArray();
        var conArr = [];
        var clearFlag = true;
        $.each(conditionJsonList, function (i, obj) {
            obj.value = $.trim(obj.value);
            if (obj.value != "") {
                var tempArr = obj.name.split("_");
                if (tempArr[1] == "startSalary" || tempArr[1] == "endSalary") {
                    obj.value = parseFloat(obj.value);
                }
                var tempCon = {};
                var where = {};
                where[tempArr[0]] = obj.value;
                tempCon[tempArr[1]] = where;
                conArr.push(tempCon);
                clearFlag = false;
            }
        });
        if (conArr.length > 0) {
            condition = conArr;
            data_change();
        }
        console.log("二次筛选:::" + JSON.stringify(condition));
        if (clearFlag) {
            clear_Condition();
        }

    }

})(window);

(function (window) {
    window.importJson = function (jsonData) {

        var _index =  layer.load(2);
        layer.msg("开始读取数据");
        setTimeout(function () {
            var jsonList = [];
            jsonData.each(function (r) {
                jsonList.push(r);
            });
            layer.msg("开始格式化数据");
            var json = JSON.stringify(jsonList, json_filter, 4);
            layer.msg("正在上传");
            var form = $("<form></form>").attr("action", "import").attr("method", "post").attr("target","_blank");
            form.append($("<input></input>").attr("type", "hidden").attr("name", "data").attr("value", json));
            form.appendTo('body').submit().remove();
            layer.close(_index);
        },0);
    }


    var filterArr = ["___id","___s","LAY_TABLE_INDEX"];

    window.json_filter = function (key, value) {
        for(var i=0;i<filterArr.length;i++){
            if (filterArr[i] == key){
                return undefined;//返回undefined表示属性忽略
            }
        }
        return value;
    }

})(window);


function jobinfo_Parse(job) {
    var parseMoney = function (yearStr) {
        return yearStr === "千" ? 1000 : yearStr === "万" ? 10000 : 1;
    }
    var parseDate = function (dateStr) {
        return (dateStr === "天" ? 30 : dateStr === "年" ? (1 / 12) : 1 );
    }
    //解析salary
    var parseSalary = function (providesalary) {
        var providesalaryStr = providesalary.providesalary;
        var defaultResult = [0, 0];
        if (providesalaryStr != null && providesalaryStr != "") {
            try {
                if (/(\d+.*)-(.*\d+)(.)\/(.)/.test(providesalaryStr)) {  //["1.2-2万/月", "1.2-2", "万/月"]
                    var salaryParseArr = providesalaryStr.match(/(\d+.*)-(.*\d+)(.)\/(.)/);
                    var qita = parseMoney(salaryParseArr[3]) * parseDate(salaryParseArr[4]);
                    //计算月薪公式  sal * （千、万/数量级） * （年1/12、月1、日30）
                    defaultResult[0] = salaryParseArr[1] * qita;
                    defaultResult[1] = salaryParseArr[2] * qita;
                } else if (/(.*\d)(.)以(.)\/(.)/.test(providesalaryStr)) { //  "1.5千以下/月", "10万以上/月"
                    var salaryParseArr = providesalaryStr.match(/(.*\d)(.)以(.)\/(.)/);//["1.5千以下/月", "1.5", "千", "下", "月"]
                    var qita = salaryParseArr[1] * parseMoney(salaryParseArr[2]) * parseDate(salaryParseArr[4]);
                    if (salaryParseArr[3] == "下") {
                        defaultResult[0] = 0;
                        defaultResult[1] = qita;
                    } else {
                        defaultResult[0] = qita;
                        defaultResult[1] = Number.POSITIVE_INFINITY;
                    }
                } else if (/(.*\d)元\/(.)/.test(providesalaryStr)) { //150元/天
                    var salaryParseArr = providesalaryStr.match(/(.*\d)元\/(.)/);//["150元/天", "150"]
                    var qita = salaryParseArr[1] * parseDate(salaryParseArr[2]);
                    defaultResult[0] = qita;
                    defaultResult[1] = qita;
                } else {
                    console.log("error providesalary :::" + providesalary.providesalary);
                    console.log("error providesalary :::" + JSON.stringify(providesalary));
                }
            } catch (e) {
                console.log("error providesalary :::" + providesalary.providesalary);
                console.log("error providesalary :::" + JSON.stringify(providesalary));
                defaultResult = [0, 0];
            }
        }
        defaultResult[0] = parseFloat(defaultResult[0]).toFixed(2);
        defaultResult[1] = parseFloat(defaultResult[1]).toFixed(2);
        return defaultResult;
    }
    if (job.workyear == "") {
        job.workyear = "无工作经验";
    }
    if (job.degree == "") {
        job.degree = "不限";
    }
    var salaryArr = parseSalary(job);
    //计算出月薪
    job.startSalary = salaryArr[0];
    job.endSalary = salaryArr[1];
    job.avgSalary = parseFloat((parseFloat(salaryArr[1]) + parseFloat(salaryArr[0])) / 2).toFixed(2);
    return job;
}

function job_insert(list, db) {
    //解析数据
    for (var i = 0; i < list.length; i++) {
        db.insert(jobinfo_Parse(list[i]));
    }
}

function log_banner() {
    $.job_bast_post("banner", null, function (res) {
        console.log(res.key);
    })
}
