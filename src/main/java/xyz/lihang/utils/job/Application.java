package xyz.lihang.utils.job;


import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;

@SpringBootApplication
public class Application extends SpringBootServletInitializer {

    /**
     * 使用Tomcat
     * 请将pom中修改成war
     * <packaging>war</packaging>
     * @param builder
     * @return
     */
    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        return builder.sources(this.getClass());
    }

    /**
     * 使用SpringBoot内嵌Servlet容器启动
     * 请将pom中修改成jar
     * <packaging>jar</packaging>
     * @param args
     */
    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }



}
