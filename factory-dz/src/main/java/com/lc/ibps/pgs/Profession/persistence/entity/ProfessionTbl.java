package com.lc.ibps.pgs.Profession.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * t_zyb 表对象
 *
 * <pre>
 *  
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-11 13:44:23
 * </pre>
 */
@SuppressWarnings("serial")
public class ProfessionTbl extends AbstractPo<String> {
	protected String id; /* 主键 */
	protected Date createTime; /* 创建时间 */
	protected String xueXiao; /* 学校 */
	protected String xueYuan; /* 学院 */
	protected String zhuanYe; /* 专业 */
	protected String orgId;// 组织id，区分学院

	public String getOrgId() {
		return orgId;
	}

	public void setOrgId(String orgId) {
		this.orgId = orgId;
	}


	public void setId(String id) {
		this.id = id;
	}

	/**
	 * 返回 主键
	 * 
	 * @return
	 */
	public String getId() {
		return this.id;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	/**
	 * 返回 创建时间
	 * 
	 * @return
	 */
	public Date getCreateTime() {
		return this.createTime;
	}

	public void setXueXiao(String xueXiao) {
		this.xueXiao = xueXiao;
	}

	/**
	 * 返回 学校
	 * 
	 * @return
	 */
	public String getXueXiao() {
		return this.xueXiao;
	}

	public void setXueYuan(String xueYuan) {
		this.xueYuan = xueYuan;
	}

	/**
	 * 返回 学院
	 * 
	 * @return
	 */
	public String getXueYuan() {
		return this.xueYuan;
	}

	public void setZhuanYe(String zhuanYe) {
		this.zhuanYe = zhuanYe;
	}

	/**
	 * 返回 专业
	 * 
	 * @return
	 */
	public String getZhuanYe() {
		return this.zhuanYe;
	}

	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() {
		return new ToStringBuilder(this).append("id", this.id).append("createTime", this.createTime)
				.append("xueXiao", this.xueXiao).append("xueYuan", this.xueYuan).append("zhuanYe", this.zhuanYe)
				.toString();
	}
}
