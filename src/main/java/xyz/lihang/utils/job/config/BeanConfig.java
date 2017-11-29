package xyz.lihang.utils.job.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import okhttp3.ResponseBody;
import org.apache.commons.io.IOUtils;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.context.embedded.EmbeddedServletContainerFactory;
import org.springframework.boot.context.embedded.tomcat.TomcatEmbeddedServletContainerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.web.servlet.mvc.method.annotation.RequestMappingHandlerAdapter;
import retrofit2.Converter;
import retrofit2.Retrofit;
import xyz.lihang.utils.job.dto.BaseDto;
import xyz.lihang.utils.job.service.JobApiService;
import xyz.lihang.utils.job.service.JobAreaService;
import xyz.lihang.utils.job.tool.XMLUtil;

import java.io.IOException;
import java.lang.annotation.Annotation;
import java.lang.reflect.Type;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static java.nio.charset.StandardCharsets.UTF_8;

@SpringBootConfiguration
public class BeanConfig {

    @Bean
    public JobApiService apiService(Converter.Factory baseDtoConverterFactory) {
        return new Retrofit.Builder()
                .baseUrl("http://api.51job.com/")
                .addConverterFactory(baseDtoConverterFactory)
                .build()
                .create(JobApiService.class);
    }


    @Bean
    public JobAreaService areaService(Converter.Factory baseDtoConverterFactory) {
        return new Retrofit.Builder()
                .baseUrl("http://appapi.51job.com/")
                .build()
                .create(JobAreaService.class);
    }

    @Bean
    public Converter.Factory baseDtoConverterFactory() {
        return new Converter.Factory() {
            @Override
            public Converter<ResponseBody, ?> responseBodyConverter(Type type, Annotation[] annotations, Retrofit retrofit) {
                return new Converter<ResponseBody, Object>() {
                    @Override
                    public BaseDto convert(ResponseBody body) throws IOException {
                        String xmlString = IOUtils.toString(body.byteStream(), "utf-8");
                        BaseDto baseDto = XMLUtil.convertXmlStrToObject(BaseDto.class, xmlString);
                        return baseDto;
                    }
                };
            }
        };
    }


    //json
    @Bean(name = "httpMessageConverter")
    public HttpMessageConverter MappingJackson2HttpMessageConverter(){
        MappingJackson2HttpMessageConverter mappingJackson2HttpMessageConverter = new MappingJackson2HttpMessageConverter();
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.setDateFormat(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"));
        mappingJackson2HttpMessageConverter.setObjectMapper(objectMapper);
        return mappingJackson2HttpMessageConverter;
    }

    @Bean
    public RequestMappingHandlerAdapter requestMappingHandlerAdapter(HttpMessageConverter httpMessageConverter){
        RequestMappingHandlerAdapter requestMappingHandlerAdapter = new RequestMappingHandlerAdapter();
        requestMappingHandlerAdapter.setIgnoreDefaultModelOnRedirect(true);
        List<HttpMessageConverter<?>> messageConverters = new ArrayList<>(1);
        messageConverters.add(httpMessageConverter);
        requestMappingHandlerAdapter.setMessageConverters(messageConverters);
        return requestMappingHandlerAdapter;
    }


}
