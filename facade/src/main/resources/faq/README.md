# 51job接口说明


### 请求招聘数据
```
 Get: http://api.51job.com/api/job/search_job_list.php?postchannel=0000&&keyword=Java&keywordtype=2&jobarea=090200&saltype=02,04,03,05,06&workyear=01&issuedate=0&degree=02,04,06,01,03&cotype=01,03,05,08,06&cosize=02,04,06,07,05&jobterm=02&pageno=1&pagesize=20&productname=51job
```

### 返回
```xml
    <?xml version="1.0" encoding="utf-8"?>
    <responsemessage>
        <result>1</result>
        <jobInfoItems>
            <keywordsuggest>
                <![CDATA[
                    Java 开发,Java 高级,Java 实习,Java 初级,Java 中级,Java Web,Java 后台,Java 架构,J2EE,Javascript
                ]]>
            </keywordsuggest>
            <uselandmarkstatus>1</uselandmarkstatus>
            <currentcitycode>090200</currentcitycode>
            <currentcityvalue>
                <![CDATA[ 成都 ]]>
            </currentcityvalue>
            <totalcount>1</totalcount>
            <maxapplynum>30</maxapplynum>
            <enablelandmarks>1</enablelandmarks>
            <item>
                <jobid>96784703</jobid>
                <jobname>
                    <![CDATA[ 安卓开发工程师实习生 ]]>
                </jobname>
                <coid>2580846</coid>
                <cddr>
                    <![CDATA[ 成都银泰中心 1199号 2栋21楼 纽昂司有限公司 ]]>
                </cddr>
                <coname>
                    <![CDATA[ Nuance纽昂司软件技术（北京）有限公司 ]]>
                </coname>
                <issuedate>
                    <![CDATA[ 2017-12-11 ]]>
                </issuedate>
                <jobarea>
                    <![CDATA[ 成都-高新区 ]]>
                </jobarea>
                <degree>
                    <![CDATA[ 本科 ]]>
                </degree>
                <workyear>
                    <![CDATA[ 无工作经验 ]]>
                </workyear>
                <cotype>
                    <![CDATA[ 外资（欧美） ]]>
                </cotype>
                <jobinfo>
                    <![CDATA[
                        岗位职责(Android应用开发)：
                         1. 根据产品需求，完成Android平台上客户端软件设计，开发与调试等工作
                         2. 根据项目任务计划独
                     ]]>
                </jobinfo>
                <isintern>0</isintern>
                <providesalary>
                    <![CDATA[ 150元/天 ]]>
                </providesalary>
                <lon>104.075849</lon>
                <lat>30.591366</lat>
                <lastupdate>1512699222</lastupdate>
                <iscommunicate>0</iscommunicate>
                <isurgency>0</isurgency>
                <istop>0</istop>
                <jobtype>0100</jobtype>
            </item>
        </jobInfoItems>
    </responsemessage>

```
### 获取详细数据
```
http://api.51job.com/api/job/get_job_info.php?jobid=80482563
```

### 返回
```xml
<responsemessage>
    <result>1</result>
    <status>1</status>
    <jobInfoItems>
        <jobid>80482563</jobid>
        <jobname>java开发工程师</jobname>
        <coid>2894203</coid>
        <coname>银联商务股份有限公司四川分公司</coname>
        <issuedate>2017-12-11</issuedate>
        <jobarea>成都-锦江区</jobarea>
        <jobnum>5</jobnum>
        <workyear>2年</workyear>
        <degree>本科</degree>
        <address>红照壁街27号百川大厦13-15楼、17楼</address>
        <joblon>104.071112</joblon>
        <joblat>30.658424</joblat>
        <welfare>五险一金,补充医疗保险,员工旅游,交通补贴,餐饮补贴,通讯补贴,绩效奖金,年终奖金,定期体检</welfare>
        <jobtag>技术开发</jobtag>
        <providesalary>4.5-6千/月</providesalary>
        <language1/>
        <language2/>
        <cotype>国企</cotype>
        <cosize>150-500人</cosize>
        <indtype1>金融/投资/证券</indtype1>
        <indtype2>金融/投资/证券</indtype2>
        <caddr>成都市红照壁街27号百川大厦A座15楼</caddr>
        <jobinfo>招聘岗位：java开发工程师2名；
岗位职责：
 1、java相关后台程序和web前端页面开发。
 2、后台服务器日常维护

岗位要求：
1、两年及以上java开发经验。
2、熟练掌握SSH、SpringMVC等主流的java框架
3、熟悉javascript、css等前端页面语言。
4、一年以上oracle、mysql等数据库的操作经验，熟练编写sql语句和存储过程。
5、熟悉linux系统，能够熟练使用常用的linux系统命令，了解sh脚本语言。
6、有良好的逻辑思维能力、学习能力、沟通能力。
岗位要求：
1、计算机相关专业背景，本科及以上学历，二年以上Android平台开发经验；
2、熟悉Android系统体系结构、应用开发框架、底层库及Android SDK，能独立开发Android应用；
3、熟悉Android开发技术，包括UI、布局、通信机制、多线程、JSON、XML等；
4、具备良好的Java技术功底，良好的编程习惯，有较强独立解决问题的能力；
5、熟悉http、TCP/IP等网络通信协议；</jobinfo>
        <isapply>0</isapply>
        <weibosharetxt>我在前程无忧上发现个不错的职位，java开发工程师，银联商务股份有限公司四川分公司。http://u.51job.com/jobinfo?jobid=80482563</weibosharetxt>
        <smssharetxt>发现个不错的职位，推荐给你：java开发工程师，http://u.51job.com/jobinfo?jobid=80482563</smssharetxt>
        <emailsharesubject>发现个不错的职位推荐给你</emailsharesubject>
        <emailsharetxt>Hi，

            我在前程无忧上发现一个不错的职位，推荐给你：
            java开发工程师
            招聘岗位：java开发工程师2名；
            岗位职责：
             1、java相关后台程序和web前端页面开发。
             2、后台服务器日常维护
            
            岗位要求：
            1、两年及以上java开发经验。
            2、熟练掌握SSH、SpringMVC等主流的java框架
            3、熟悉javascript、css等前端页面语言。
            4、一年以上oracle、mysql等数据库的操作经验，熟练编写sql语句和存储过程。
            5、熟悉linux系统，能够熟练使用常用的linux系统命令，了解sh脚本语言。
            6、有良好的逻辑思维能力、学习能力、沟通能力。
            岗位要求：
            1、计算机相关专业背景，本科及以上学历，二年以上Android平台开发经验；
            2、熟悉Android系统体系结构、应用开发框架、底层库及Android SDK，能独立开发Android应用；
            3、熟悉Android开发技术，包括UI、布局、通信机制、多线程、JSON、XML等；
            4、具备良好的Java技术功底，良好的编程习惯，有较强独立解决问题的能力；
            5、熟悉http、TCP/IP等网络通信协议；

            申请地址：http://u.51job.com/jobinfo?jobid=80482563</emailsharetxt>
        <weixinsharesubject>职位推荐：java开发工程师</weixinsharesubject>
        <weixinsharetxt>银联商务股份有限公司四川分公司，国企，150-500人</weixinsharetxt>
        <pengyousharesubject>职位推荐：java开发工程师</pengyousharesubject>
        <pengyousharetxt>银联商务股份有限公司四川分公司，国企，150-500人</pengyousharetxt>
        <qqsharesubject>职位推荐：java开发工程师</qqsharesubject>
        <qqsharetxt>银联商务股份有限公司四川分公司，国企，150-500人</qqsharetxt>
        <share_url>http://u.51job.com/jobinfo?jobid=80482563</share_url>
        <jobjumptype>0</jobjumptype>
        <jobjumpurl/>
        <logo/>
        <showwarning>0</showwarning>
    </jobInfoItems>
</responsemessage>
```