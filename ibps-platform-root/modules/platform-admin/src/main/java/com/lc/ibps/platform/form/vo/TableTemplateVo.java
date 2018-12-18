package com.lc.ibps.platform.form.vo;

/**
 * 表模版。
 *
 * <pre>
 *  
 * 构建组：ibps-platform-admin
 * 作者：hugh zhuang
 * 邮箱：3378340995@qq.com
 * 日期：2017年4月19日-上午10:36:03
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
public class TableTemplateVo {
	// 模版名称
	private String name;
	// 模版别名
	private String alias;

	public TableTemplateVo(String name, String alias) {
		super();
		this.name = name;
		this.alias = alias;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getAlias() {
		return alias;
	}

	public void setAlias(String alias) {
		this.alias = alias;
	}

}
