package com.lc.ibps.platform.script.script;

import java.util.Date;

import javax.annotation.Resource;

import com.lc.ibps.api.base.context.CurrentContext;
import com.lc.ibps.api.base.model.User;
import com.lc.ibps.base.core.constants.StringPool;
import com.lc.ibps.base.core.engine.script.IScript;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.core.util.time.DateFormatUtil;
import com.lc.ibps.base.core.util.time.TimeUtil;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/** 常用脚本，可直接在Groovy脚本中调用。
 *
 * <pre> 
 * 构建组：ibps-platform-admin
 * 作者：Xu Qiang
 * 邮箱：819842974@qq.com
 * 日期：2015年12月18日-下午3:07:58
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
public class CommonScript implements IScript{
	
	/* TODO 人员脚本 */
	
	@Resource
	private CurrentContext  currentContext;
	
	/**
	 * 获取当前登录用户名 。<br>
	 * <pre>
	 * 脚本中使用方法:
	 * cscript.getAccount();
	 * </pre>
	 * @return
	 */
	public String getAccount(){
		User sysUser = currentContext.getCurrentUser();
		if(sysUser == null) {
			return "";
		}
		return sysUser.getAccount();
	}
	
	/**
	 * 获取当前登录用户ID。<br>
	 * 
	 * <pre>
	 * 脚本中使用方法:
	 * cscript.getCurrentUserId();
	 * </pre>
	 * 
	 * @return
	 */
	public String getCurrentUserId() {
		return currentContext.getCurrentUserId();
	}
	
	/**
	 * 获取当前登录用户组织名称 。<br>
	 * 
	 * <pre>
	 * 脚本中使用方法:
	 * cscript.getCurrentName();
	 * </pre>
	 * 
	 * @return
	 */
	public String getCurrentName() {
		User sysUser = currentContext.getCurrentUser();
		if(sysUser == null) {
			return "";
		}
		return sysUser.getFullname();
	}
	
	/**
	 * 获取当前系统的用户。
	 * 
	 * <pre>
	 * 脚本中使用方法: 
	 * cscript.getCurrentUser();
	 * </pre>
	 * 
	 * @return 用户对象。
	 */
	public User getCurrentUser() {
		return currentContext.getCurrentUser();
	}
	
	/**
	 * 获取当前用户选择器的值
	 * <pre>
	 * 脚本中使用方法: 
	 * cscript.getCurrentUserInfo();
	 * </pre>
	 * @return
	 */
	public String getCurrentUserInfo() {
		User user =currentContext.getCurrentUser();
		JSONArray jsonArray =  new JSONArray();
		jsonArray.add(setSelector(user.getUserId(), user.getFullname()));
		return  jsonArray.toString();
	}

	/**
	 * 获取当前用户所在的组织名
	 * <pre>
	 * 脚本中使用方法: 
	 * cscript.getCurrentOrgName();
	 * </pre>
	 * @return
	 */
	public String getCurrentOrgName(){
		String name = " ";
		if(BeanUtils.isEmpty(currentContext.getCurrentOrg()))return name;
		name = 	currentContext.getCurrentOrg().getName();
		return name;
	}
	
	/**
	 * 获取当前组织ID
	 * <pre>
	 * 脚本中使用方法: 
	 * cscript.getCurrentOrgId();
	 * </pre>
	 * @return
	 */
	public String getCurrentOrgId(){
		String orgId = " ";
		if(BeanUtils.isEmpty(currentContext.getCurrentOrg()))return orgId;
		orgId = currentContext.getCurrentOrg().getId();
		return orgId;
	}
	
	/**
	 * 获取当前用户所在的主岗位名称
	 * <pre>
	 * 脚本中使用方法: 
	 * cscript.getCurrentPositionName();
	 * </pre>
	 * @return
	 */
	public String getCurrentPositionName(){
		String name = " ";
		if(BeanUtils.isEmpty(currentContext.getCurrentPosition())){return name;}
		name = currentContext.getCurrentPosition().getName();
		return name;
	}
	
	/**
	 * 获取当前用户所在的主岗位ID
	 * <pre>
	 * 脚本中使用方法: 
	 * cscript.getCurrentPositionId();
	 * </pre>
	 * @return
	 */
	public String getCurrentPositionId(){
		String posId = " ";
		if(BeanUtils.isEmpty(currentContext.getCurrentPosition())){return posId;}
		posId = currentContext.getCurrentPosition().getId();
		return posId;
	}
	
	/**
	 * 设置一个选择器的值
	 *
	 * @param id
	 * @param name
	 * @return
	 */
	private JSONObject	setSelector(String id,String name){
		JSONObject jsonObject = new JSONObject();
		jsonObject.accumulate("id", id);
		jsonObject.accumulate("name", name);
		return jsonObject; 
	}
	
	/* TODO 系统脚本 */
	
	/**
	 * 获取系统当前日期，默认格式2015-12-21
	 *
	 * @return 
	 */
	public String getCurDate() {
		try {
			return TimeUtil.formatDate(System.currentTimeMillis());
		} catch (Exception ignore) {
		}
		return "";
	}
	
	/**
	 * 获取当前日期时间，按format格式输出
	 *
	 * @param format
	 * @return 
	 */
	public String getCurDate(String format) {
		return TimeUtil.getFormatString(System.currentTimeMillis(), format);
	}
	
	/**
	 * 获取当前日期时间，按format格式输出
	 *
	 * @param format
	 * @return 
	 */
	public String getCurDateTime() {
		return getCurDate(StringPool.DATE_FORMAT_DATETIME);
	}
	
	/* TODO 工具脚本 */
	
	/**
	 * 比较两个字符串是否相等，不区分大小写，如果两个均为空则也认为相等。
	 * 
	 * @param str1
	 * @param str2
	 * @return
	 */
	public boolean equalsIgnoreCase(String str1, String str2) {
		return StringUtil.equalsIgnoreCase(str1, str2);
	}

	/**
	 * 比较两个字符串是否相等，如果两个均为空则也认为相等。
	 * @param str1
	 * @param str2
	 * @return
	 */
	public boolean equals(String str1, String str2) {
		return StringUtil.equals(str1, str2);
	}
	
	/**
	 * 将字符串转化为short类型（默认值0）
	 * 
	 * @param str
	 *            字符串值
	 * @return
	 */
	public short parseShort(String str) {
		return parseShort(str, (short) 0);
	}

	/**
	 * 将字符串转化为short类型
	 * 
	 * @param str
	 *            字符串值
	 * @param defaultValue
	 *            自定义默认
	 * @return 返回转化的值
	 */
	public short parseShort(String str, short defaultValue) {
		if (StringUtil.isEmpty(str))
			return defaultValue;
		return Short.parseShort(str);
	}	
	
	/**
	 * 将字符串转化为int类型（默认值0）
	 * 
	 * @param str
	 *            字符串值
	 * @return
	 */
	public int parseInt(String str) {
		return parseInt(str, 0);
	}

	/**
	 * 将字符串转化为int类型
	 * 
	 * @param str
	 *            字符串值
	 * @param defaultValue
	 *            自定义默认
	 * @return 返回转化的值
	 */
	public int parseInt(String str, int defaultValue) {
		if (StringUtil.isEmpty(str))
			return defaultValue;
		return Integer.parseInt(str);
	}

	/**
	 * 将字符串转化为long类型
	 * 
	 * @param str
	 *            字符串值
	 * @return 返回转化的值
	 */
	public long parseLong(String str) {
		return parseLong(str, 0L);
	}

	/**
	 * 将字符串转化为long类型
	 * 
	 * @param str
	 *            字符串值
	 * @param defaultValue
	 *            自定义默认
	 * @return 返回转化的值
	 */
	public long parseLong(String str, long defaultValue) {
		if (StringUtil.isEmpty(str))
			return defaultValue;
		return Long.parseLong(str);
	}
	
	/**
	 * 将字符串转化为float类型
	 * 
	 * @param str
	 *            字符串值
	 * @return 返回转化的值
	 */
	public float parseFloat(String str) {
		return parseFloat(str, 0f);
	}

	/**
	 * 将字符串转化为float类型
	 * 
	 * @param str
	 *            字符串值
	 * @param defaultValue
	 *            自定义默认
	 * @return 返回转化的值
	 */
	public float parseFloat(String str, float defaultValue) {
		if (StringUtil.isEmpty(str))
			return defaultValue;
		return Float.parseFloat(str);
	}	
	
	/**
	 * 将字符串转化为double类型
	 * 
	 * @param str
	 *            字符串值
	 * @return 返回转化的值
	 */
	public double parseDouble(String str) {
		return parseDouble(str, 0d);
	}

	/**
	 * 将字符串转化为double类型
	 * 
	 * @param str
	 *            字符串值
	 * @param defaultValue
	 *            自定义默认
	 * @return 返回转化的值
	 */
	public double parseDouble(String str, double defaultValue) {
		if (StringUtil.isEmpty(str))
			return defaultValue;
		return Double.parseDouble(str);
	}
	
	/**
	 * 将字符串转化为boolean类型（默认值false）
	 * 
	 * @param str
	 *            字符串值（如无值则返回缺省值, 如值为数字1，则返回true,不是数字1的）
	 * @return 返回转化的值
	 */
	public boolean parseBoolean(String str) {
		return parseBoolean(str, false);
	}

	/**
	 * 将字符串转化为long类型
	 * 
	 * @param str
	 *            字符串值 （如无值则返回缺省值, 如值为数字1，则返回true,不是数字1的）
	 * @param defaultValue
	 *            自定义默认
	 * @return 返回转化的值
	 */
	public Boolean parseBoolean(String str, Boolean defaultValue) {
		if (StringUtil.isEmpty(str))
			return defaultValue;
		if (StringUtil.isNumeric(str))
			return (Integer.parseInt(str) == 1 ? true : false);
		return Boolean.parseBoolean(str);
	}
	
	/**
	 * 将obj类型转换为string
	 * @param obj 如果是null返回空字符串
	 * @return
	 */
	public String parseString(Object obj) {
		if(obj == null)
			return "";
		return obj.toString();
	}
	
	/**
	 * 将obj类型转换为string
	 * @param obj 如果是null返回空字符串
	 * @return
	 */
	public String parseString(Object obj, String style) {
		if(obj == null)
			return "";
		if(obj instanceof java.util.Date)
			return DateFormatUtil.format((java.util.Date) obj, style);
		return obj.toString();
	}

	/**
	 * 转化日期格式 ，
	 *  如无值则返回缺省值,如有值则返回 yyyy-MM-dd HH:mm:ss 格式的日期,或者自定义格式的日期
	 * @param str
	 * @param style
	 * @return
	 * @throws Exception
	 */
	public Date parseDate(String str, String style) throws Exception {
		if (StringUtil.isEmpty(str))
			return null;
		if (StringUtil.isEmpty(style))
			style = "yyyy-MM-dd HH:mm:ss";
		return (Date) DateFormatUtil.parse(str, style);
	}
	
	/**
	 * 转化日期格式 ，
	 *  如无值则返回缺省值,如有值则返回 yyyy-MM-dd HH:mm:ss 格式的日期,或者自定义格式的日期
	 * @param str
	 * @param style
	 * @return
	 * @throws Exception
	 */
	public Date parseDate(String str,Date defaultValue, String style) throws Exception {
		if (StringUtil.isEmpty(str))
			return defaultValue;
		if (StringUtil.isEmpty(style))
			style = "yyyy-MM-dd HH:mm:ss";
		return (Date) DateFormatUtil.parse(str, style);
	}

	/**
	 * 2个日期比较
	 * @param date1 日期1
	 * @param date2 日期2
	 * @return
	 * 	返回 0 表示时间日期相同
	 * 	返回 1 表示日期1>日期2
	 *  返回 -1 表示日期1<日期2
	 *  返回-10 表示日期1为null 
	 *  返回 10 表示日期2为null
	 */
	public int compareTo(Date date1,Date date2){
		if(date1 == null && date2 == null)
			return 0;	
		if(date1 == null)
			return 10;
		if(date2 == null)
			return -10;
		return date1.compareTo(date2);
	}

	/**
	 * 2个字符串比较
	 * @param str1
	 * @param str2
	 * @return
	 * 	返回 0 表示字符串相同
	 * 	返回 1 表示字符串1>字符串2
	 *  返回 -1 表示字符串1<字符串2
	 *  返回-10 表示字符串1为"" 或null
	 *  返回 10 表示字符串2为""或null
	 */
	public int compareTo(String str1,String str2){
		if(str1 == null && str2 == null)
			return 0;
		if(str1 == null)
			return 10;
		if(str2 == null)
			return -10;
		return str1.compareTo(str2);	
	}
	
	/**
	 * 判断字符串是否为空
	 * @param str
	 * @return
	 */
	public boolean isEmpty(String str){
		return StringUtil.isEmpty(str);
	}
	
	/**
	 * 判断对象是否为空(Map,Collection,String,Array,Long是否为空)
	 * @param obj
	 * @return
	 */
	public boolean isEmpty(Object obj){
		return BeanUtils.isEmpty(obj);
	}
	
}
