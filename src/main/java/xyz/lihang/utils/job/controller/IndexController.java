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
import xyz.lihang.utils.job.dto.JobDetailedInfo;
import xyz.lihang.utils.job.dto.JobInfo;
import xyz.lihang.utils.job.service.ApiConverterUtil;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.*;
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

    /**
     * 数据
     * @param map
     * @param pageno
     * @return
     */
    @RequestMapping(value="/list")
    @ResponseBody
    public List<JobInfo> list(@RequestParam Map<String,Object> map, Integer pageno) {
        return apiConverterUtil.getByPage(map,pageno,defaultPageSize);
    }

    @RequestMapping(value="/get")
    @ResponseBody
    public Map list(Long jobid) {
        return Collections.singletonMap("key",apiConverterUtil.getJobInfo(jobid));
    }


    /**
     * 根据过滤表单查询接口分页数据
     * @param map
     * @return
     */
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




    /**
     * 装b专用
     * @return
     * @throws IOException
     */
    @RequestMapping(value="/banner")
    @ResponseBody
    public Map banner ()throws IOException{
        return Collections.singletonMap("key",IOUtils.toString(getClass().getClassLoader().getResourceAsStream("banner.txt"), "UTF-8"));
    }

    /**
     * 区域信息
     * @param code
     * @return
     */
    @RequestMapping(value="/areaJson")
    @ResponseBody
    public String areaJson(String code){
        return apiConverterUtil.areaJson(code);
    }

    /**
     * fix bug
     * 由于在tomcat中post的value过大将不会解析并传递到Parameter中,所以只能通过流方式读取并自己截断字符串
     * @param httpServletRequest
     * @param httpServletResponse
     */
    @RequestMapping(value="/import")
    public void importData (HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse)  {
        OutputStream os = null;
        try {

            httpServletRequest.setCharacterEncoding("UTF-8");
            String data = URLDecoder.decode(IOUtils.toString(httpServletRequest.getInputStream() ,"UTF-8"),"utf-8");
            data = data.substring(data.indexOf("=")+1,data.length());
            httpServletResponse.setHeader("Content-Disposition", "attachment;filename=" + new String("51job.json".getBytes(), "ISO-8859-1"));
            httpServletResponse.setContentType("application/txt");
            httpServletResponse.setCharacterEncoding("UTF-8");
            os = httpServletResponse.getOutputStream();
            IOUtils.write(data,os,"UTF-8");
        }catch (IOException e){
            e.printStackTrace();
        }finally {
            if (os != null)
                try {
                    os.flush();
                    os.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
        }
    }


}
