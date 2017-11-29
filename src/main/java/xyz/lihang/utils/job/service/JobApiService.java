package xyz.lihang.utils.job.service;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Query;
import retrofit2.http.QueryMap;
import xyz.lihang.utils.job.dto.BaseDto;
import java.util.Map;

public interface JobApiService {

    /**
     *
     * @param map
     * @param pageno
     * @param pagesize 显示的记录数
     * @return
     */
    @GET("/api/job/search_job_list.php")
    Call<BaseDto> jobApiXml(@QueryMap Map<String, Object> map
            , @Query("pageno") Integer pageno
            , @Query("pagesize") Integer pagesize
    );




}
