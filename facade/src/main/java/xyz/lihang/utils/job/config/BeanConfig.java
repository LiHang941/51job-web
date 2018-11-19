package xyz.lihang.utils.job.config;

import okhttp3.OkHttpClient;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.context.annotation.Bean;
import xyz.lihang.utils.job.tool.OkHttpFactory;

@SpringBootConfiguration
public class BeanConfig {

    public static final String BEAN_NAME_HTTP_CLIENT = "serviceHttpClient";

    @Bean(name = BEAN_NAME_HTTP_CLIENT)
    public OkHttpClient okHttp() {
        try {
            return OkHttpFactory.getUnsafeOkHttpClient();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}
