package xyz.lihang.utils.job.controller;


import org.apache.commons.io.IOUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.CustomDateEditor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.ServletRequestDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import xyz.lihang.utils.job.dto.JobInfo;
import xyz.lihang.utils.job.service.ApiConverterUtil;

import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

@Controller
@RequestMapping(value="/")
public class IndexController {

    private Logger logger = Logger.getLogger(getClass().getName());

    private final Integer defaultPageSize = 30;

    @Autowired
    private ApiConverterUtil apiConverterUtil;


    @InitBinder
    public void initBinder(ServletRequestDataBinder binder) {
        // 自动转换日期类型的字段格式
        binder.registerCustomEditor(Date.class, new CustomDateEditor(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"), true));
    }


    @RequestMapping(value="/list")
    @ResponseBody
    public List<JobInfo> list(@RequestParam Map<String,Object> map, Integer pageno) {
        return apiConverterUtil.getByPage(map,pageno,defaultPageSize);
    }

    @RequestMapping(value="/totalcount")
    @ResponseBody
    public Map totalcount(@RequestParam Map<String,Object> map){
        Integer totalcount = apiConverterUtil.getTotalcount(map);
        Integer pageSize = totalcount % defaultPageSize ==0 ? totalcount / defaultPageSize : (totalcount/defaultPageSize)+1;
        Map m = new HashMap(2);
        m.put("totalcount",totalcount);
        m.put("pageSize",pageSize);
        return m;
    }

    @RequestMapping(value="/banner")
    @ResponseBody
    public String banner ()throws IOException{
        return IOUtils.toString(getClass().getClassLoader().getResourceAsStream("banner.txt"), "UTF-8");
    }


    @RequestMapping(value="/areaJson")
    @ResponseBody
    public String areaJson(String code){
        return apiConverterUtil.areaJson(code);
    }


}
