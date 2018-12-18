package com.utils;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.apache.avalon.framework.activity.Startable;

import com.lc.ibps.base.core.util.time.DateFormatUtil;

public class DateUtil implements Constants{
	public static final int BEFORE = -1;
	public static final int BETWEEN = 0;
	public static final int EQUAL = 0;
	public static final int AFTER = 1;

	public static int compareTo(String paramString1, String paramString2) {
		try {
			Date dt1 = DateFormatUtil.parse(paramString1);
			Date dt2 = DateFormatUtil.parse(paramString2);
			int r = dt1.compareTo(dt2);
			return r==EQUAL?EQUAL:r/Math.abs(r);
		} catch (Exception localException) {
		}
		return -2;
	}

	/**
	 * 比较当前时间yyyy-MM-dd hh:mm与参数区间的比较，在区间左中右分别为-1,0,1
	 * 
	 * @return
	 */
	public static int currentCompareByRange(String arg0, String arg1) {
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd hh:mm");
		int r = BEFORE;
		try {
			Date d1 = df.parse(arg0);
			Date d2 = df.parse(arg1);
			Date cd = new Date();
			r = cd.compareTo(d1) + cd.compareTo(d2);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return r / 2;
	}

	public static String getCurTerm() {
		String term = "";
		DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
		Date now = new Date();
		Calendar a=Calendar.getInstance();
		int year = a.get(Calendar.YEAR);
		long time = now.getTime();
		
		try {
			long summer = df.parse(year+"-" + SUMMER).getTime();
			long winter = df.parse(year+"-" + WINTER).getTime();
			if(time < winter)
				term = (year - 1) +"-"+year+"-1";
			else if(time > winter && time < summer)
				term = (year - 1) +"-"+year+"-2";
			else if(time > summer)
				term = year +"-"+(year + 1)+"-1";
		} catch (ParseException e) {
			e.printStackTrace();
		}
		
		
		return term;
	}
	public static char dayForWeek(String date){
		char[] res = {'日','一','二','三','四','五','六'};
		SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
		  Calendar c = Calendar.getInstance();
		  try {
			c.setTime(format.parse(date));
		} catch (ParseException e) {
			e.printStackTrace();
		}
		  int dayForWeek = 0;
		  if(c.get(Calendar.DAY_OF_WEEK) == 1){
		   dayForWeek = 7;
		  }else{
		   dayForWeek = c.get(Calendar.DAY_OF_WEEK) - 1;
		  }
		  return res[dayForWeek%7];
	}
	public static List<String> getTermList(){
		List<String> res = new ArrayList();
		String from = "2017-2018-1";
		res.add(from);
		String curTerm = getCurTerm();
		String [] _t = {"1","寒假","2","暑假"};
		List t = Arrays.asList(_t);
		String t2 = curTerm.substring(10) , y1 =from.substring(0 ,  4), y2 = curTerm.substring(0,4);
		int d = Integer.parseInt(y2) - Integer.parseInt(y1);
		
		String elem;
		
		for(int i = d ,index ; i >= 0 ; --i ){
			if( i == 0 ){
					elem = y1 + "-"  + ( Integer.parseInt(y1)+1) + "-"  + t.get(3);
					res.add(elem);
			}else if( i == d  ){
				for( index = t.indexOf(t2) ; index >= 0 ; --index ){
					elem = y2 +"-"  +  ( Integer.parseInt(y2)+1) +"-" + t.get(index);
					res.add(elem);
				}
			}else{
				for( index = 3 ; index >= 0 ; --index ){
					elem = (( Integer.parseInt(y1) + i )) +"-" +  (Integer.parseInt(y1) + i +1) +"-"+ t.get(index);
					res.add(elem);
				}
			}
		}
		return res;
	}
	
	private static List<String> getBetween(String from, String curTerm) {
		
		
		String [] _t = {"1","寒假","2","暑假"};
		List t = Arrays.asList(_t);
		List<String> res = new ArrayList();
		String t2 = curTerm.substring(10) , y1 =from.substring(0 ,  4), y2 = curTerm.substring(0,4);
		int d = Integer.parseInt(y2) - Integer.parseInt(y1);
		
		String elem;
		
		for(int i = d ,index ; i >= 0 ; --i ){
			if( i == 0 ){
					elem = y1 + "-"  + ( Integer.parseInt(y1)+1) + "-"  + t.get(3);
					res.add(elem);
			}else if( i == d  ){
				for( index = t.indexOf(t2) ; index >= 0 ; --index ){
					elem = y2 +"-"  +  ( Integer.parseInt(y2)+1) +"-" + t.get(index);
					res.add(elem);
				}
			}else{
				for( index = 3 ; index >= 0 ; --index ){
					elem = (( Integer.parseInt(y1) + i )) +"-" +  (Integer.parseInt(y1) + i +1) +"-"+ t.get(index);
					res.add(elem);
				}
			}
		}
		return res;
	}
}
