package xyz.lihang.utils.job.service;

import okhttp3.OkHttpClient;
import okhttp3.Request;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;
import xyz.lihang.utils.job.config.BeanConfig;
import xyz.lihang.utils.job.dto.JobBaseDetailedInfo;
import xyz.lihang.utils.job.dto.JobBaseListDto;
import xyz.lihang.utils.job.dto.JobDetailedInfo;
import xyz.lihang.utils.job.dto.JobInfo;
import xyz.lihang.utils.job.tool.HttpTool;
import xyz.lihang.utils.job.tool.XMLUtil;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Component
public final class ApiConverterUtil {

    private HttpTool httpTool;

    public ApiConverterUtil(@Qualifier(BeanConfig.BEAN_NAME_HTTP_CLIENT) OkHttpClient okHttpClient) {
        this.httpTool = new HttpTool(okHttpClient);
    }

    public static <T> HttpTool.ResponseHandle<T> DEFAULT_HANDLE(Class<T> tClass) {
        return (response) -> XMLUtil.convertXmlStrToObject(tClass, response.body().string());
    }

    public static HttpTool.ResponseHandle<String> STRING_HANDLE() {
        return (response) -> response.body().string();
    }

    public Integer getTotalCount(Map<String, String> query) {
        try {
            Request request = JobApiFactory.jobApiXml(query, 0, 1);
            JobBaseListDto body = httpTool.execute(request, DEFAULT_HANDLE(JobBaseListDto.class));
            return body.getResultbody().getTotalcount();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }


    public List<JobInfo> getByPage(Map<String, String> query, Integer pageNo, Integer pageSize) {
        try {
            Request request = JobApiFactory.jobApiXml(query, pageNo, pageSize);
            JobBaseListDto body = httpTool.execute(request, DEFAULT_HANDLE(JobBaseListDto.class));
            return body.getResultbody().getItem();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public JobDetailedInfo getJobInfo(Long jobId) {
        try {
            Request request = JobApiFactory.jobInfoXml(jobId);
            return httpTool.execute(request, DEFAULT_HANDLE(JobBaseDetailedInfo.class)).getResultbody();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public String areaJson(String code) {
        try {
            return httpTool.execute(JobApiFactory.areaJson(code), STRING_HANDLE());
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

}
