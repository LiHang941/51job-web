package xyz.lihang.utils.job.dto;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;
import java.io.Serializable;
import java.util.List;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlRootElement(name = "resultbody")
@XmlType
public class JobInfoItems implements Serializable {

    private Integer uselandmarkstatus;

    private String currentcitycode;

    private String currentcityvalue;

    private Integer totalcount;

    private List<JobInfo> item;

    public Integer getUselandmarkstatus() {
        return uselandmarkstatus;
    }

    public void setUselandmarkstatus(Integer uselandmarkstatus) {
        this.uselandmarkstatus = uselandmarkstatus;
    }

    public String getCurrentcitycode() {
        return currentcitycode;
    }

    public void setCurrentcitycode(String currentcitycode) {
        this.currentcitycode = currentcitycode;
    }

    public String getCurrentcityvalue() {
        return currentcityvalue;
    }

    public void setCurrentcityvalue(String currentcityvalue) {
        this.currentcityvalue = currentcityvalue;
    }

    public Integer getTotalcount() {
        return totalcount;
    }

    public void setTotalcount(Integer totalcount) {
        this.totalcount = totalcount;
    }

    public List<JobInfo> getItem() {
        return item;
    }

    public void setItem(List<JobInfo> item) {
        this.item = item;
    }

}
