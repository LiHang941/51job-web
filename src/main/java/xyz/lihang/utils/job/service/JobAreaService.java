package xyz.lihang.utils.job.service;

import okhttp3.ResponseBody;
import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Query;
import retrofit2.http.QueryMap;

import java.util.Map;

public interface JobAreaService {
    @GET("/api/datadict/get_dd_area.php")
    Call<ResponseBody> areaJson(@Query("code") String code );
}
