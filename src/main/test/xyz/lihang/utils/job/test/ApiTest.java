package xyz.lihang.utils.job.test;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.json.JSONObject;
import org.json.JSONString;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import xyz.lihang.utils.job.Application;
import xyz.lihang.utils.job.config.BeanConfig;
import xyz.lihang.utils.job.dto.JobDetailedInfo;
import xyz.lihang.utils.job.service.ApiConverterUtil;
import xyz.lihang.utils.job.service.JobApiService;

import java.util.HashMap;
import java.util.logging.Logger;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringBootTest(classes=Application.class)
public class ApiTest {

    @Autowired
    private ApiConverterUtil apiConverterUtil;

    private Logger logger = Logger.getLogger(getClass().getName());

    @Test
    public void test() throws JsonProcessingException {
        Integer totalcount = apiConverterUtil.getTotalcount(new HashMap<>());
        logger.info(totalcount.toString());


        JobDetailedInfo jobInfo = apiConverterUtil.getJobInfo(96499041L);
        logger.info(jobInfo.getConame());
    }

}
