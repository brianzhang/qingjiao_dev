package com.lc.ibps.patrols.control.persistence.entity;

import java.io.Serializable;

public class CourseEntity implements Serializable {
    String index;
    String[] days;
    public CourseEntity(String index,int size){
        setIndex(index);
        days = new String[size];
    }
    public void setIndex(String index){
        this.index = index;
    }
    public String getIndex(){
        return index;
    }
    public void setDays(String[] days){
        this.days = days;
    }
    public String[] getDays(){
        return days;
    }
    public void setDays(int i , String data){
        days[i - 1] = data;
    }
}
