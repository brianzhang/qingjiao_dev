package com.utils;

import java.io.UnsupportedEncodingException;
import java.util.Random;

import javax.servlet.http.HttpServletRequest;

import com.lc.ibps.base.web.util.RequestUtil;

public class StringUtil {
	public static String getRandomString(int length) { //length表示生成字符串的长度
	    String base = "abcdefghijklmnopqrstuvwxyz0123456789";   
	    Random random = new Random();   
	    StringBuffer sb = new StringBuffer();   
	    for (int i = 0; i < length; i++) {   
	        int number = random.nextInt(base.length());   
	        sb.append(base.charAt(number));   
	    }   
	    return sb.toString();   
	 }   

	public static String getFromRequest(HttpServletRequest request , String arg){
		try {
			return new String(RequestUtil.getString(request, arg).getBytes("iso-8859-1"), "UTF-8");
		} catch (UnsupportedEncodingException e) {
			return "";
		}
	}

	public static String getStr(HttpServletRequest request , String arg){
		String empName= getFromRequest(request, arg);
		try {
			if(empName.equals(new String(empName.getBytes("GB2312"), "GB2312"))){
				empName = new String(empName.getBytes("GB2312"),"utf-8");
			}else if(empName.equals(new String(empName.getBytes("iso-8859-1"), "iso-8859-1"))){
				empName = new String(empName.getBytes("iso-8859-1"),"utf-8");
			}else if(empName.equals(new String(empName.getBytes("UTF-8"), "UTF-8"))){
				empName = new String(empName.getBytes("UTF-8"),"utf-8");
			}else if(empName.equals(new String(empName.getBytes("GBK"), "GBK"))){
				empName = new String(empName.getBytes("GBK"),"utf-8");
			}
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		}
		return empName;
	}
}
