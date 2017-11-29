package xyz.lihang.utils.job.dto;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlRootElement;
import javax.xml.bind.annotation.XmlType;
import java.io.Serializable;

@XmlAccessorType(XmlAccessType.FIELD)
@XmlRootElement(name = "responsemessage")
@XmlType
public class BaseDto implements Serializable{

   private  Integer result;

   private Resultbody resultbody;

    public Integer getResult() {
        return result;
    }

    public void setResult(Integer result) {
        this.result = result;
    }

    public Resultbody getResultbody() {
        return resultbody;
    }

    public void setResultbody(Resultbody resultbody) {
        this.resultbody = resultbody;
    }

    @Override
    public String toString() {
        return "BaseDto{" +
                "result=" + result +
                ", resultbody=" + resultbody +
                '}';
    }
}
