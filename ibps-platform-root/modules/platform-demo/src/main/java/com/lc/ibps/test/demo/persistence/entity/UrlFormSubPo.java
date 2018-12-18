package com.lc.ibps.test.demo.persistence.entity;

/**
 * 子表例子 实体对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-03-17 17:44:29
 *</pre>
 */
 @SuppressWarnings("serial")
public class UrlFormSubPo extends UrlFormSubTbl{
	protected String defId;/*流程定义id*/
	protected String proInstId;/*流程流程实例id*/
	protected String taskId;/*流程任务id*/
	protected String actionName;/*流程动作*/
	public String getDefId() {
		return defId;
	}
	public void setDefId(String defId) {
		this.defId = defId;
	}
	public String getProInstId() {
		return proInstId;
	}
	public void setProInstId(String proInstId) {
		this.proInstId = proInstId;
	}
	public String getTaskId() {
		return taskId;
	}
	public void setTaskId(String taskId) {
		this.taskId = taskId;
	}
	public String getActionName() {
		return actionName;
	}
	public void setActionName(String actionName) {
		this.actionName = actionName;
	}
}
