package com.utils;

import java.util.List;

public class List2SqlList {

	public static String parse (List<String> list) {
		if (list == null || list.size() == 0) {
			return "null";
		}
		StringBuffer sBuffer = new StringBuffer(); 
		sBuffer.append("(");
		for (String e : list) {
			sBuffer.append("'");
			sBuffer.append(e);
			sBuffer.append("'");
			sBuffer.append(",");
		}
		sBuffer.deleteCharAt(sBuffer.length() - 1);
		sBuffer.append(")");
		return sBuffer.toString();
	}
	
}
