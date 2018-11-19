/**
 *  筛选常量数据
 */
var JOB_CONSTANT = {};
JOB_CONSTANT.degree = [{"code":"01","value":"初中及以下"},{"code":"02","value":"高中/中技/中专"},{"code":"03","value":"大专"},{"code":"04","value":"本科"},{"code":"05","value":"硕士"},{"code":"06","value":"博士"}];
JOB_CONSTANT.cosize = [{"code":"01","value":"少于50人"},{"code":"02","value":"50-150人"},{"code":"03","value":"150-500人"},{"code":"04","value":"500-1000人"},{"code":"05","value":"1000-5000人"},{"code":"06","value":"5000-10000人"},{"code":"07","value":"10000人以上"}];
JOB_CONSTANT.issuedate = [{"code":"0","value":"24小时内"},{"code":"1","value":"近三天"},{"code":"2","value":"近一周"},{"code":"3","value":"近一月"}];
JOB_CONSTANT.saltype = [{"code":"01","value":"2千以下"},{"code":"02","value":"2-3千"},{"code":"03","value":"3-4.5千"},{"code":"04","value":"4.5-6千"},{"code":"05","value":"6-8千"},{"code":"06","value":"0.8-1万"},{"code":"07","value":"1-1.5万"},{"code":"08","value":"1.5-2万"},{"code":"09","value":"2-3万"},{"code":"10","value":"3-4万"},{"code":"11","value":"4-5万"},{"code":"12","value":"5万以上"}];
JOB_CONSTANT.workyear = [{"code":"01","value":"无经验"},{"code":"02","value":"1-3年"},{"code":"03","value":"3-5年"},{"code":"04","value":"5-10年"},{"code":"05","value":"10年以上"}];
JOB_CONSTANT.area = [{"code":"000000","value":"热门城市"},{"code":"000001","value":"A B C"},{"code":"000002","value":"D E F G"},{"code":"000003","value":"H I"},{"code":"000004","value":"J K"},{"code":"000005","value":"L M N"},{"code":"000006","value":"O P Q R"},{"code":"000007","value":"S T U"},{"code":"000008","value":"V W X"},{"code":"000009","value":"Y Z"},{"code":"000010","value":"所有省份(含港澳台)"},{"code":"000011","value":"国外"},{"code":"000012","value":"全国"}];
JOB_CONSTANT.jobterm = [{"code":"01","value":"全职"},{"code":"02","value":"兼职"}];
JOB_CONSTANT.cotype = [{"code":"01","value":"外资（欧美"},{"code":"02","value":"外资（非欧美"},{"code":"03","value":"合资"},{"code":"04","value":"国企 "},{"code":"05","value":"民营公司"},{"code":"06","value":"外企代表处"},{"code":"07","value":"政府机关"},{"code":"08","value":"事业单位"},{"code":"09","value":"非营利机构"},{"code":"10","value":"上市公司"},{"code":"11","value":"创业公司"}];



JOB_CONSTANT.convert = {
    "cddr": "地址",
    "coname": "公司名",
    "cotype": "公司类型",
    "jobarea": "工作区域",
    "jobinfo": "工作信息",
    "jobname": "职位名",
    "degree": "学历",
    "workyear": "经验要求",
    "providesalary": "工资",
};