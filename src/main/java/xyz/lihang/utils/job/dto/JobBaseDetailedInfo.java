package xyz.lihang.utils.job.dto;


import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlRootElement(name = "responsemessage")
@XmlType
public class JobBaseDetailedInfo {

    private Integer result;

    private Integer status;

    private JobDetailedInfo resultbody;

    public Integer getResult() {
        return result;
    }

    public void setResult(Integer result) {
        this.result = result;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public JobDetailedInfo getResultbody() {
        return resultbody;
    }

    public void setResultbody(JobDetailedInfo resultbody) {
        this.resultbody = resultbody;
    }
}
