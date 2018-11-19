package xyz.lihang.utils.job.service;

import okhttp3.HttpUrl;
import okhttp3.Request;

import java.util.Map;

public interface JobApiFactory {

    String API_URL = "http://api.51job.com/";
    String APP_URL = "http://appapi.51job.com/";


    static Request jobApiXml(Map<String, String> map
            , Integer pageno
            , Integer pagesize
    ) {
        HttpUrl.Builder httpUrlBuilder =
                HttpUrl.parse(API_URL).newBuilder().addPathSegments("/api/job/search_job_list.php")
                        .addQueryParameter("pageno", String.valueOf(pageno))
                        .addQueryParameter("pagesize", String.valueOf(pagesize));

        if (map != null) {
            map.forEach((k, v) -> httpUrlBuilder.addQueryParameter(k, v));
        }
        return new Request
                .Builder()
                .url(httpUrlBuilder.build())
                .get()
                .build();
    }


    static Request jobInfoXml(Long jobId
    ) {
        return new Request
                .Builder()
                .url(HttpUrl.parse(API_URL).newBuilder().addPathSegments("/api/job/search_job_list.php")
                        .addQueryParameter("jobid", String.valueOf(jobId)).build())
                .get()
                .build();
    }


    static Request areaJson(String code
    ) {
        return new Request
                .Builder()
                .url(HttpUrl.parse(APP_URL).newBuilder().addPathSegments("/api/datadict/get_dd_area.php")
                        .query("http://appapi.51job.com/api/datadict/get_dd_area.php")
                        .addQueryParameter("code", code).build())
                .get()
                .build();
    }


}
