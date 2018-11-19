package xyz.lihang.utils.job.tool;

import okhttp3.Call;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

import java.io.IOException;

/**
 * @author : lihang1329@gmail.com
 * @since : 2018/9/18
 */
public class HttpTool {


    private OkHttpClient okHttpClient;


    public HttpTool(OkHttpClient okHttpClient) {
        this.okHttpClient = okHttpClient;
    }


    public <T> T execute(Request request, ResponseHandle<T> handle, ResponseFilter... filter) throws IOException {
        return handle.handle(okHttpClient.newCall(request), filter);
    }

    public OkHttpClient getOkHttpClient() {
        return okHttpClient;
    }


    public interface ResponseFilter {
        void filter(Response response) throws IOException;
    }


    /**
     * @author : lihang1329@gmail.com
     * @since : 2018/8/9
     */
    public interface ResponseHandle<T> {

        default T handle(Call call, ResponseFilter[] filters) throws IOException {
            Response response = null;
            try {
                response = call.execute();
                if (filters.length > 0) {
                    for (ResponseFilter filter : filters) {
                        filter.filter(response);
                    }
                }
                return convert(response);
            } finally {
                if (response != null)
                    response.close();
            }
        }

        T convert(Response response) throws IOException;

    }



}
