package com.utils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

public class CollectionUtil {
	/**
	 * select2 类型转换工具
	 * @param tableMap
	 * @return
	 */
	public static List<Map<String, String>> buildData(Map<String, String> map){
		List<Map<String, String>> rs = new ArrayList<Map<String, String>>();
		
		Map<String, String> t = null;
		for(Entry<String, String> entry : map.entrySet()){
			t = new HashMap<String, String>();
			t.put("id", entry.getKey());
			t.put("text", entry.getValue());
			rs.add(t);
		}
		
		return rs;
	}
}
