package com.lc.ibps.base.core.util.json;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.lc.ibps.base.core.constants.StringPool;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.string.StringUtil;

import net.sf.json.JSONArray;
import net.sf.json.JSONNull;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;
import net.sf.json.util.JSONUtils;

/**
 * JSON处理。
 *
 * <pre>
 *  
 * 构建组：ibps-base-core
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2016年1月28日-下午5:39:22
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
public class JsonUtil {
	
	private JsonUtil(){}

	private static final Logger logger = LoggerFactory.getLogger(JsonUtil.class);

	/**
	 * 判断JSON是否为空<br>
	 * 传入的对象为 JSONObject 或者JSONArray的对象
	 * 
	 * @param obj
	 * @return
	 */
	public static boolean isEmpty(Object o) {
		if (BeanUtils.isEmpty(o))
			return true;
		if (o instanceof JSONObject)
			return ((JSONObject) o).isNullObject();
		if (o instanceof JSONArray) {
			return ((JSONArray) o).isEmpty();
		}
		if (o instanceof JSONNull) {
			return true;
		}
		if (JSONUtils.isNull(o)) {
			return true;
		}
		return JSONNull.getInstance().equals(o);
	}

	/**
	 * 判断JSON 是否为空<br>
	 * 传入的对象为 JSONObject 或者JSONArray的对象
	 * 
	 * @param obj
	 * @return
	 */
	public static boolean isNotEmpty(Object o) {
		return !isEmpty(o);
	}
	
	/**
	 * 字符串是否为json格式【包含JSONArray和jsonObject的对象】
	 * 
	 * @param jsonStr
	 * @return
	 */
	public static boolean isJson(String jsonStr) {
		return isJsonObject(jsonStr) || isJsonArray(jsonStr);
	}

	/**
	 * 字符串不是json格式【包含JSONArray和jsonObject的对象】
	 * 
	 * @param jsonStr
	 * @return
	 */
	public static boolean isNotJson(String jsonStr) {
		return !isJson(jsonStr);
	}
	
	/**
	 * 字符串是否为json对象格式（区别JSONArray格式）
	 * 
	 * @param jsonStr
	 * @return
	 */
	public static boolean isJsonObject(Object jsonStr) {
		if(isEmpty(jsonStr))
			return false;
		try {
			JSONObject.fromObject(jsonStr);
		} catch (Exception e) {
			return false;
		}
		return true;
	}
	
	/**
	 * 字符串是否为json对象格式（区别JSONArray格式）
	 * 
	 * @param jsonStr
	 * @return
	 */
	public static boolean isNotJsonObject(Object jsonStr) {
		return !isJsonObject(jsonStr);
	}

	/**
	 * 字符串是否为jsonArray格式
	 * 
	 * @param jsonStr
	 * @return
	 */
	public static boolean isJsonArray(Object jsonStr) {
		if(isEmpty(jsonStr))
			return false;
		try {
			JSONArray.fromObject(jsonStr);
		} catch (Exception ee) {
			return false;
		}
		return true;
	}
	
	/**
	 * 字符串是否为jsonArray格式
	 * 
	 * @param jsonString
	 * @return
	 */
	public static boolean isNotJsonArray(Object jsonStr) {
		return !isJsonArray(jsonStr);
	}

	/**
	 * 从一个JSON 对象字符格式中得到一个java对象.<br/>
	 * 形如： {"id" : idValue, "name" : nameValue,"aBean" : {"aBeanId" :
	 * aBeanIdValue, ...}}
	 * 
	 * @param jsonStr
	 * @param clazz
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public static Object getDTO(String jsonStr, Class clazz) {
		return getDTO(jsonStr, clazz, "");
	}
	
	/**
	 * 
	 * 从一个JSON 对象字符格式中得到一个java对象.<br/>
	 * 形如： {"id" : idValue, "name" : nameValue, "aBean" : {"aBeanId" :
	 * aBeanIdValue, ...}}
	 *
	 * @param jsonStr
	 * @param clazz
	 * @param dateFormat
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public static Object getDTO(String jsonStr, Class clazz, String dateFormat) {
		JSONObject jsonObject = null;
		try {
			if (StringUtil.isEmpty(dateFormat))
				setDataFormat2JAVA();
			else
				setDataFormat2JAVA(dateFormat);
			jsonObject = JSONObject.fromObject(jsonStr);
		} catch (Exception e) {
			logger.warn(e.getMessage(), e);
		}
		return JSONObject.toBean(jsonObject, clazz);
	}
	
	/**
	 * 从一个JSON 对象字符格式中得到一个java对象.<br/>
	 * 形如： {"id" : idValue, "name" : nameValue,"aBean" : {"aBeanId" :
	 * aBeanIdValue, ...}}
	 * 
	 * @param jsonStr
	 * @param clazz
	 * @return
	 */
	public static <T> T getDTO2(String jsonStr, Class<T> clazz) {
		return getDTO2(jsonStr, clazz, "");
	}
	
	/**
	 * 
	 * 从一个JSON 对象字符格式中得到一个java对象.<br/>
	 * 形如： {"id" : idValue, "name" : nameValue, "aBean" : {"aBeanId" :
	 * aBeanIdValue, ...}}
	 *
	 * @param jsonStr
	 * @param clazz
	 * @param dateFormat
	 * @return
	 */
	@SuppressWarnings({ "unchecked" })
	public static <T> T getDTO2(String jsonStr, Class<T> clazz, String dateFormat) {
		JSONObject jsonObject = null;
		try {
			if (StringUtil.isEmpty(dateFormat))
				setDataFormat2JAVA();
			else
				setDataFormat2JAVA(dateFormat);
			jsonObject = JSONObject.fromObject(jsonStr);
		} catch (Exception e) {
			logger.warn(e.getMessage(), e);
		}
		return (T) JSONObject.toBean(jsonObject, clazz);
	}

	/**
	 * 从一个JSON 对象字符格式中得到一个java对象，其中beansList是一类的集合，形如： {"id" : idValue, "name" :
	 * nameValue, "aBean" : {"aBeanId" : aBeanIdValue, ...}, beansList:[{}, {},
	 * ...]}
	 * 
	 * @param jsonString
	 * @param clazz
	 * @param map
	 *            集合属性的类型 (key : 集合属性名, value : 集合属性类型class) eg: ("beansList" :
	 *            Bean.class)
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public static Object getDTO(String jsonString, Class clazz, Map map) {
		JSONObject jsonObject = null;
		try {
			setDataFormat2JAVA();
			jsonObject = JSONObject.fromObject(jsonString);
		} catch (Exception e) {
			logger.warn(e.getMessage(), e);
		}
		return JSONObject.toBean(jsonObject, clazz, map);
	}
	
	/**
	 * 从一个JSON 对象字符格式中得到一个java对象，其中beansList是一类的集合，形如： {"id" : idValue, "name" :
	 * nameValue, "aBean" : {"aBeanId" : aBeanIdValue, ...}, beansList:[{}, {},
	 * ...]}
	 * 
	 * @param jsonString
	 * @param clazz
	 * @param map
	 *            集合属性的类型 (key : 集合属性名, value : 集合属性类型class) eg: ("beansList" :
	 *            Bean.class)
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static <T> T getDTO2(String jsonString, Class<T> clazz, Map map) {
		JSONObject jsonObject = null;
		try {
			setDataFormat2JAVA();
			jsonObject = JSONObject.fromObject(jsonString);
		} catch (Exception e) {
			logger.warn(e.getMessage(), e);
		}
		return (T)JSONObject.toBean(jsonObject, clazz, map);
	}

	/**
	 * 从一个JSON数组得到一个java对象数组，形如： [{"id" : idValue, "name" : nameValue}, {"id" :
	 * idValue, "name" : nameValue}, ...]
	 * 
	 * @param object
	 * @param clazz
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public static Object[] getDTOArray(String jsonString, Class clazz) {
		setDataFormat2JAVA();
		JSONArray array = JSONArray.fromObject(jsonString);
		Object[] obj = new Object[array.size()];
		for (int i = 0; i < array.size(); i++) {
			JSONObject jsonObject = array.getJSONObject(i);
			obj[i] = JSONObject.toBean(jsonObject, clazz);
		}
		return obj;
	}

	/**
	 * 从一个JSON数组得到一个java对象数组，形如： [{"id" : idValue, "name" : nameValue}, {"id" :
	 * idValue, "name" : nameValue}, ...]
	 * 
	 * @param object
	 * @param clazz
	 * @param map
	 * @return
	 */
	@SuppressWarnings("rawtypes")
	public static Object[] getDTOArray(String jsonString, Class clazz, Map map) {
		setDataFormat2JAVA();
		JSONArray array = JSONArray.fromObject(jsonString);
		Object[] obj = new Object[array.size()];
		for (int i = 0; i < array.size(); i++) {
			JSONObject jsonObject = array.getJSONObject(i);
			obj[i] = JSONObject.toBean(jsonObject, clazz, map);
		}
		return obj;
	}
	
	/**
	 * 从一个JSON数组得到一个java对象集合
	 * 
	 * @param object
	 * @param clazz
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static List getDTOList(String jsonString) {
		List list = new ArrayList();
		if (isEmpty(jsonString))
			return list;
		setDataFormat2JAVA();
		JSONArray array = JSONArray.fromObject(jsonString);
		for (Iterator iter = array.iterator(); iter.hasNext();) {
			JSONObject jsonObject = (JSONObject) iter.next();
			list.add(getMapFromJson(jsonObject.toString()));
		}
		return list;
	}

	/**
	 * 从一个JSON数组得到一个java对象集合
	 * 
	 * @param object
	 * @param clazz
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static List getDTOList(String jsonString, Class clazz) {
		List list = new ArrayList();
		if (isEmpty(jsonString))
			return list;
		setDataFormat2JAVA();
		JSONArray array = JSONArray.fromObject(jsonString);
		for (Iterator iter = array.iterator(); iter.hasNext();) {
			JSONObject jsonObject = (JSONObject) iter.next();
			list.add(JSONObject.toBean(jsonObject, clazz));
		}
		return list;
	}

	/**
	 * 从一个JSON数组得到一个java对象集合，其中对象中包含有集合属性
	 * 
	 * @param object
	 * @param clazz
	 * @param map
	 *            集合属性的类型
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static List getDTOList(String jsonString, Class clazz, Map map) {
		setDataFormat2JAVA();
		JSONArray array = JSONArray.fromObject(jsonString);
		List list = new ArrayList();
		for (Iterator iter = array.iterator(); iter.hasNext();) {
			JSONObject jsonObject = (JSONObject) iter.next();
			list.add(JSONObject.toBean(jsonObject, clazz, map));
		}
		return list;
	}
	
	/**
	 * 从一个JSON数组得到一个java对象集合，其中对象中包含有集合属性
	 * 
	 * @param object
	 * @param clazz
	 * @param map
	 *            集合属性的类型
	 * @return
	 */
	@SuppressWarnings({ "rawtypes" })
	public static <T> List<T> getDTOList2(String jsonString, Class<T> clazz, Map map) {
		setDataFormat2JAVA();
		JSONArray array = JSONArray.fromObject(jsonString);
		List<T> list = new ArrayList<T>();
		for (Iterator iter = array.iterator(); iter.hasNext();) {
			JSONObject jsonObject = (JSONObject) iter.next();
			list.add(getDTO2(jsonObject.toString(), clazz, map));
		}
		return list;
	}

	/**
	 * 从json HASH表达式中获取一个map，该map支持嵌套功能 形如：{"id" : "johncon", "name" : "小强"}
	 * 注意commons-collections版本，必须包含org.apache.commons.collections.map.
	 * MultiKeyMap
	 * 
	 * @param object
	 * @return
	 */
	public static Map<String, Object> getMapFromJson(String jsonString) {
		Map<String, Object> map = new HashMap<String, Object>();
		if (isEmpty(jsonString))
			return map;
		setDataFormat2JAVA();
		JSONObject jsonObject = JSONObject.fromObject(jsonString);
		for (Iterator<?> iter = jsonObject.keys(); iter.hasNext();) {
			String key = (String) iter.next();
			map.put(key, jsonObject.get(key));
		}
		return map;
	}

	/**
	 * map<String,list<Class>>
	 * 
	 * @param jsonString
	 * @param clazz
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public static Map getMapFromJson(String jsonString, Class clazz) {
		Map map = new HashMap();
		if (isEmpty(jsonString))
			return map;
		setDataFormat2JAVA();
		JSONObject jsonObject = JSONObject.fromObject(jsonString);
		for (Iterator iter = jsonObject.keys(); iter.hasNext();) {
			String key = (String) iter.next();
			if (jsonObject.get(key) != null) {
				List list = getDTOList(jsonObject.get(key).toString(), clazz);
				map.put(key, list);
			}
		}
		return map;
	}

	/**
	 * 从json数组中得到相应java数组 json形如：["123", "456"]
	 * 
	 * @param jsonString
	 * @return
	 */
	public static Object[] getObjectArrayFromJson(String jsonString) {
		JSONArray jsonArray = JSONArray.fromObject(jsonString);
		return jsonArray.toArray();
	}

	/**
	 * 
	 * 把数据对象转换成json字符串,需要传默认值<br>
	 * <p>
	 * DTO对象形如：{"id" : idValue, "name" : nameValue, ...}
	 * </p>
	 * <p>
	 * 数组对象形如：[{}, {}, {},...]
	 * </p>
	 * <p>
	 * map对象形如：{key1 : {"id" : idValue, "name" : nameValue, ...}, key2 : {},
	 * ...}
	 * </p>
	 *
	 * @param o
	 * @param dateFormat
	 * @param defaultVal
	 * @return
	 */
	public static String getJSONString(Object o, String dateFormat, String defaultVal) {
		String jsonString = null;
		// 日期值处理器
		JsonConfig jsonConfig = new JsonConfig();
		JsonDateValueProcessor jsonDateValueProcessor = StringUtil.isNotEmpty(dateFormat)
				? new JsonDateValueProcessor(dateFormat) : new JsonDateValueProcessor();
		jsonConfig.registerJsonValueProcessor(java.util.Date.class, jsonDateValueProcessor);
		if (isEmpty(o))
			return defaultVal;
		if (o instanceof Collection || o instanceof Object[]) {
			jsonString = JSONArray.fromObject(o, jsonConfig).toString();
		} else {
			jsonString = JSONObject.fromObject(o, jsonConfig).toString();
		}
		return jsonString == null ? defaultVal : jsonString;
	}

	public static String getJSONString(Object o, String defaultVal) {
		return getJSONString(o, null, defaultVal);
	}

	public static String getJSONStringByDateFormat(Object o, String dateFormat) {
		return getJSONString(o, dateFormat, "{}");
	}

	/**
	 * 把数据对象转换成json字符串,需要传默认值<br>
	 * <p>
	 * DTO对象形如：{"id" : idValue, "name" : nameValue, ...}
	 * </p>
	 * <p>
	 * 数组对象形如：[{}, {}, {},...]
	 * </p>
	 * <p>
	 * map对象形如：{key1 : {"id" : idValue, "name" : nameValue, ...}, key2 : {},
	 * ...}
	 * </p>
	 * 
	 * @param object
	 * @return
	 */
	public static String getJSONString(Object jsonObj) {
		return getJSONString(jsonObj, null, "{}");
	}

	/**
	 * 设定日期转换格式
	 *
	 * @param dateFormat
	 */
	public static void setDataFormat2JAVA(String[] dateFormat) {
		JSONUtils.getMorpherRegistry().registerMorpher(new DateMorpherExt(dateFormat, (Date) null));
	}

	/**
	 * 设定指定的日期转换格式
	 *
	 * @param dateFormat
	 */
	private static void setDataFormat2JAVA(String dateFormat) {
		setDataFormat2JAVA(new String[] { dateFormat });
	}

	/**
	 * 设定默认格式日期转换格式
	 *
	 * @param dateFormat
	 */
	private static void setDataFormat2JAVA() {
		setDataFormat2JAVA(new String[] { StringPool.DATE_FORMAT_DATETIME, StringPool.DATE_FORMAT_DATE });
	}

	/**
	 * 根据键获取值。
	 * 
	 * @param obj
	 * @param key
	 * @param defaultValue
	 * @return String
	 */
	public static String getString(JSONObject obj, String key, String defaultValue) {
		if(BeanUtils.isEmpty(obj))
			return null;
		if (!obj.containsKey(key))
			return defaultValue;
		if (isEmpty(obj.get(key)))
			return defaultValue;
		return obj.getString(key);
	}

	/**
	 * 根据键获取值。
	 * 
	 * @param obj
	 * @param key
	 * @return String
	 */
	public static String getString(JSONObject obj, String key) {
		return getString(obj, key, "");
	}

	/**
	 * 根据键获取long值。
	 * 
	 * @param obj
	 * @param key
	 * @return int
	 */
	public static long getLong(JSONObject obj, String key) {
		return getLong(obj, key, 0L);
	}

	/**
	 * 根据键获取long值。
	 * 
	 * @param obj
	 * @param key
	 * @param defaultValue
	 * @return int
	 */
	public static long getLong(JSONObject obj, String key, long defaultValue) {
		if (!obj.containsKey(key))
			return defaultValue;
		if (isEmpty(obj.get(key)))
			return defaultValue;
		try {
			return obj.getLong(key);
		} catch (Exception e) {
			logger.warn(e.getMessage(), e);
		}
		return defaultValue;
	}

	/**
	 * 根据键获取int值。
	 * 
	 * @param obj
	 * @param key
	 * @return int
	 */
	public static int getInt(JSONObject obj, String key) {
		return getInt(obj, key, 0);
	}

	/**
	 * 根据键获取int值。
	 * 
	 * @param obj
	 * @param key
	 * @param defaultValue
	 * @return int
	 */
	public static int getInt(JSONObject obj, String key, int defaultValue) {
		if (!obj.containsKey(key))
			return defaultValue;
		if (isEmpty(obj.get(key)))
			return defaultValue;
		try {
			return obj.getInt(key);
		} catch (Exception e) {
			logger.warn(e.getMessage(), e);
		}
		return defaultValue;
	}

	public static boolean getBool(JSONObject o, String key) {
		return getBool(o, key, false);
	}

	public static boolean getBool(JSONObject o, String key, boolean defaultValue) {
		if (!o.containsKey(key))
			return defaultValue;
		if (isEmpty(o.get(key)))
			return defaultValue;
		try {
			Object obj = o.get(key);
			if (obj != null) {
				if (obj.equals(Boolean.FALSE)
						|| (obj instanceof String && ((String) obj).equalsIgnoreCase(StringPool.N))
						|| (obj instanceof Integer && (Integer) obj == 0)) {
					return false;
				} else if (obj.equals(Boolean.TRUE)
						|| (obj instanceof String && ((String) obj).equalsIgnoreCase(StringPool.Y))
						|| (obj instanceof Integer && (Integer) obj == 1)) {
					return true;
				}
			}
		} catch (Exception e) {
			logger.warn(e.getMessage(), e);
		}
		return defaultValue;
	}

	/**
	 * 根据键获取boolean值，默认值为false。
	 * 
	 * @param obj
	 * @param key
	 * @return boolean
	 */
	public static boolean getBoolean(JSONObject o, String key) {
		return getBoolean(o, key, false);
	}

	/**
	 * 根据键获取boolean值。
	 * 
	 * @param obj
	 * @param key
	 * @param defaultValue
	 * @return boolean
	 */
	public static boolean getBoolean(JSONObject o, String key, boolean defaultValue) {
		if (!o.containsKey(key))
			return defaultValue;
		if (isEmpty(o.get(key)))
			return defaultValue;
		try {
			return o.getBoolean(key);
		} catch (Exception e) {
			logger.warn(e.getMessage(), e);
		}
		return defaultValue;
	}

	/**
	 * 根据键获取char值，默认值为'Y'。
	 * 
	 * @param obj
	 * @param key
	 * @return char
	 */
	public static char getChar(JSONObject obj, String key) {
		return getChar(obj, key, 'Y');
	}

	/**
	 * 根据键获取char值。
	 * 
	 * @param obj
	 * @param key
	 * @param defaultValue
	 * @return char
	 */
	public static char getChar(JSONObject obj, String key, char defaultValue) {
		if (!obj.containsKey(key))
			return defaultValue;
		if (isEmpty(obj.get(key)))
			return defaultValue;
		String v = obj.getString(key);
		char[] c = v.toCharArray();
		if (c.length == 0)
			return defaultValue;
		return v.toCharArray()[0];
	}

	/**
	 * 根据键获取float值
	 * 
	 * @param obj
	 * @param key
	 * @return
	 */
	public static float getFloat(JSONObject obj, String key) {
		return getFloat(obj, key, 0);
	}

	/**
	 * 根据键获取float值,如无值则返回缺省值
	 * 
	 * @param obj
	 * @param key
	 * @param defaultValue
	 * @return
	 * @throws Exception
	 */
	public static float getFloat(JSONObject obj, String key, float defaultValue) {
		if (!obj.containsKey(key))
			return defaultValue;
		if (isEmpty(obj.get(key)))
			return defaultValue;
		Object v = obj.get(key);
		return	Float.valueOf(v.toString());
	}
	
	/**
	 * 根据键获取double值
	 * 
	 * @param obj
	 * @param key
	 * @return
	 */
	public static double getDouble(JSONObject obj, String key) {
		return getDouble(obj, key, 0);
	}

	/**
	 * 根据键获取double值,如无值则返回缺省值
	 * 
	 * @param obj
	 * @param key
	 * @param defaultValue
	 * @return
	 */
	public static double getDouble(JSONObject obj, String key, double defaultValue) {
		if (!obj.containsKey(key))
			return defaultValue;
		if (isEmpty(obj.get(key)))
			return defaultValue;
		Object v = obj.get(key);
		return Double.valueOf(v.toString());
	}
	
	

	/**
	 * 根据键获取JSONArray值。
	 * 
	 * @param obj
	 * @param key
	 * @return
	 */
	public static JSONArray getJSONArray(JSONObject obj, String key) {
		Object json = obj.get(key);
		if (isEmpty(json))
			return null;
		return (JSONArray) json;
	}

	/**
	 * 根据键获取JSONobject值。
	 * 
	 * @param obj
	 * @param key
	 * @return
	 */
	public static JSONObject getJSONobject(JSONObject obj, String key) {
		Object json = obj.get(key);
		if (isEmpty(json))
			return null;
		return (JSONObject) json;
	}

}