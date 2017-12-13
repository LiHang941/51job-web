package xyz.lihang.utils.job.service;

import okhttp3.ResponseBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import retrofit2.Call;
import retrofit2.Response;
import xyz.lihang.utils.job.dto.JobBaseDetailedInfo;
import xyz.lihang.utils.job.dto.JobBaseListDto;
import xyz.lihang.utils.job.dto.JobDetailedInfo;
import xyz.lihang.utils.job.dto.JobInfo;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.logging.Logger;

@Component
public final class ApiConverterUtil {

    private Logger logger = Logger.getLogger(getClass().getName());

    @Autowired
    private JobApiService jobApiService;

    @Autowired
    private JobAreaService jobAreaService;

    public Integer getTotalcount(Map<String, Object> query) {
        try {
            Call<JobBaseListDto> call = jobApiService.jobApiXml(query, 0, 1);
            Response<JobBaseListDto> execute = call.execute();
            JobBaseListDto body = execute.body();
            logger.info("url:" + call.request().url());
            logger.info("code:" + execute.code());
            return body.getResultbody().getTotalcount();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }



    public List<JobInfo> getByPage(Map<String, Object> query, Integer pageno, Integer pageSize) {
        try {
            Call<JobBaseListDto> call = jobApiService.jobApiXml(query, pageno, pageSize);
            Response<JobBaseListDto> execute = call.execute();
            JobBaseListDto body = execute.body();
            logger.info("url:" + call.request().url());
            logger.info("code:" + execute.code());
            return body.getResultbody().getItem();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public JobDetailedInfo getJobInfo(Long jobId) {
        try {
            Call<JobBaseDetailedInfo> call = jobApiService.jobInfoXml(jobId);
            Response<JobBaseDetailedInfo> execute = call.execute();
            JobBaseDetailedInfo body = execute.body();
            logger.info("url:" + call.request().url());
            logger.info("code:" + execute.code());
            return body.getResultbody();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public String areaJson(String code){
        try {
            Call<ResponseBody> call = jobAreaService.areaJson(code);
            Response<ResponseBody> execute = call.execute();
            logger.info("url:" + call.request().url());
            logger.info("code:" + execute.code());
            return execute.body().string();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

}
