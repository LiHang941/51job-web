package xyz.lihang.utils.job.service;

import okhttp3.RequestBody;
import okhttp3.ResponseBody;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import retrofit2.Call;
import retrofit2.Response;
import xyz.lihang.utils.job.dto.BaseDto;
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
            Call<BaseDto> call = jobApiService.jobApiXml(query, 0, 1);
            Response<BaseDto> execute = call.execute();
            BaseDto body = execute.body();
            logger.info("url:" + call.request().url());
            logger.info("code:" + execute.code());
            return body.getResultbody().getTotalcount();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

    public List<JobInfo> getByPage(Map<String, Object> query, Integer pageno, Integer pageSize) {
        try {
            Call<BaseDto> call = jobApiService.jobApiXml(query, pageno, pageSize);
            Response<BaseDto> execute = call.execute();
            BaseDto body = execute.body();
            logger.info("url:" + call.request().url());
            logger.info("code:" + execute.code());
            return body.getResultbody().getItem();
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
