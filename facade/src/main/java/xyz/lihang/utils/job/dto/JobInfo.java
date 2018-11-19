package xyz.lihang.utils.job.dto;

import xyz.lihang.utils.job.tool.XMLUtil;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;
import javax.xml.bind.annotation.adapters.XmlJavaTypeAdapter;
import java.io.Serializable;
import java.util.Date;


@XmlAccessorType(XmlAccessType.FIELD)
@XmlRootElement(name = "item")
@XmlType
public class JobInfo implements Serializable {

    private Long coid;
    private String cddr;
    private String coname;
    private String cotype;


    private Long jobid;
    private String jobarea;
    private String jobinfo;
    private String jobname;
    private String jobtype;


    private String degree;
    private String workyear;
    private String providesalary;

    @XmlJavaTypeAdapter(value = XMLUtil.PhpDateAdapter.class)
    private Date lastupdate;
    private Date issuedate;


    private Integer isintern;
    private Integer iscommunicate;
    private Integer isurgency;
    private Integer istop;


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

    public String getCddr() {
        return cddr;
    }

    public void setCddr(String cddr) {
        this.cddr = cddr;
    }

    public String getConame() {
        return coname;
    }

    public void setConame(String coname) {
        this.coname = coname;
    }

    public Date getIssuedate() {
        return issuedate;
    }

    public void setIssuedate(Date issuedate) {
        this.issuedate = issuedate;
    }

    public String getJobarea() {
        return jobarea;
    }

    public void setJobarea(String jobarea) {
        this.jobarea = jobarea;
    }

    public String getDegree() {
        return degree;
    }

    public void setDegree(String degree) {
        this.degree = degree;
    }

    public String getWorkyear() {
        return workyear;
    }

    public void setWorkyear(String workyear) {
        this.workyear = workyear;
    }

    public String getCotype() {
        return cotype;
    }

    public void setCotype(String cotype) {
        this.cotype = cotype;
    }

    public String getJobinfo() {
        return jobinfo;
    }

    public void setJobinfo(String jobinfo) {
        this.jobinfo = jobinfo;
    }

    public Integer getIsintern() {
        return isintern;
    }

    public void setIsintern(Integer isintern) {
        this.isintern = isintern;
    }

    public String getProvidesalary() {
        return providesalary;
    }

    public void setProvidesalary(String providesalary) {
        this.providesalary = providesalary;
    }

    public Date getLastupdate() {
        return lastupdate;
    }

    public void setLastupdate(Date lastupdate) {
        this.lastupdate = lastupdate;
    }

    public Integer getIscommunicate() {
        return iscommunicate;
    }

    public void setIscommunicate(Integer iscommunicate) {
        this.iscommunicate = iscommunicate;
    }

    public Integer getIsurgency() {
        return isurgency;
    }

    public void setIsurgency(Integer isurgency) {
        this.isurgency = isurgency;
    }

    public Integer getIstop() {
        return istop;
    }

    public void setIstop(Integer istop) {
        this.istop = istop;
    }

    public String getJobtype() {
        return jobtype;
    }

    public void setJobtype(String jobtype) {
        this.jobtype = jobtype;
    }

}
