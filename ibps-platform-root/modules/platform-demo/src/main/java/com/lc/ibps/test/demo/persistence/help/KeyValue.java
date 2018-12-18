package com.lc.ibps.test.demo.persistence.help;

/**
 * 存放值的Bean。
 *
 * <pre> 
 * 构建组：ibps-org-biz
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2015-10-27-上午10:04:48
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
public class KeyValue {

	private String key;
	private String value;
	/**
	 * 
	 */
	public KeyValue() {
	}
	/**
	 * @param key
	 * @param value
	 */
	public KeyValue(String key, String value) {
		super();
		this.key = key;
		this.value = value;
	}
	/**
	 * key 
	 * @return the key
	 */
	public String getKey() {
		return key;
	}
	/**
	 * @param key the key to set
	 */
	public void setKey(String key) {
		this.key = key;
	}
	/**
	 * value 
	 * @return the value
	 */
	public String getValue() {
		return value;
	}
	/**
	 * @param value the value to set
	 */
	public void setValue(String value) {
		this.value = value;
	}
	
}
