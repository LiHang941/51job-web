package xyz.lihang.utils.job.dto;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;
import java.io.Serializable;

/**
 * 职位详细信息
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlRootElement(name = "resultbody")
@XmlType
public class JobDetailedInfo implements Serializable {

    private Long jobid;
    private String jobname;
    private Long coid;
    private String coname;
    private String issuedate;
    private String jobarea;
    private Integer jobnum;
    private String workyear;
    private String degree;
    private String address;
    private Double joblon;
    private Double joblat;
    private String welfare;
    private String jobtag;
    private String providesalary;
    private String cotype;
    private String cosize;
    private String indtype1;
    private String caddr;
    private String jobinfo;

    public Long getJobid() {
        return jobid;
    }

    public void setJobid(Long jobid) {
        this.jobid = jobid;
    }

    public String getJobname() {
        return jobname;
    }

    public void setJobname(String jobname) {
        this.jobname = jobname;
    }

    public Long getCoid() {
        return coid;
    }

    public void setCoid(Long coid) {
        this.coid = coid;
    }

    public String getConame() {
        return coname;
    }

    public void setConame(String coname) {
        this.coname = coname;
    }

    public String getIssuedate() {
        return issuedate;
    }

    public void setIssuedate(String issuedate) {
        this.issuedate = issuedate;
    }

    public String getJobarea() {
        return jobarea;
    }

    public void setJobarea(String jobarea) {
        this.jobarea = jobarea;
    }

    public Integer getJobnum() {
        return jobnum;
    }

    public void setJobnum(Integer jobnum) {
        this.jobnum = jobnum;
    }

    public String getWorkyear() {
        return workyear;
    }

    public void setWorkyear(String workyear) {
        this.workyear = workyear;
    }

    public String getDegree() {
        return degree;
    }

    public void setDegree(String degree) {
        this.degree = degree;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Double getJoblon() {
        return joblon;
    }

    public void setJoblon(Double joblon) {
        this.joblon = joblon;
    }

    public Double getJoblat() {
        return joblat;
    }

    public void setJoblat(Double joblat) {
        this.joblat = joblat;
    }

    public String getWelfare() {
        return welfare;
    }

    public void setWelfare(String welfare) {
        this.welfare = welfare;
    }

    public String getJobtag() {
        return jobtag;
    }

    public void setJobtag(String jobtag) {
        this.jobtag = jobtag;
    }

    public String getProvidesalary() {
        return providesalary;
    }

    public void setProvidesalary(String providesalary) {
        this.providesalary = providesalary;
    }

    public String getCotype() {
        return cotype;
    }

    public void setCotype(String cotype) {
        this.cotype = cotype;
    }

    public String getCosize() {
        return cosize;
    }

    public void setCosize(String cosize) {
        this.cosize = cosize;
    }

    public String getIndtype1() {
        return indtype1;
    }

    public void setIndtype1(String indtype1) {
        this.indtype1 = indtype1;
    }

    public String getCaddr() {
        return caddr;
    }

    public void setCaddr(String caddr) {
        this.caddr = caddr;
    }

    public String getJobinfo() {
        return jobinfo;
    }

    public void setJobinfo(String jobinfo) {
        this.jobinfo = jobinfo;
    }

}
