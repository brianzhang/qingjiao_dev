package com.lc.ibps.test.demo.persistence.entity;

import java.util.Date;

import org.apache.commons.lang.builder.ToStringBuilder;

import com.lc.ibps.base.framework.persistence.entity.AbstractPo;

/**
 * url表单例子 表对象
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-04-06 19:31:27
 *</pre>
 */
 @SuppressWarnings("serial")
public class UrlFormTbl extends AbstractPo<String>{
	protected String  id; 		/*主键标识*/
	protected String  text; 		/*文本框*/
	protected String  textarea; 		/*文本域*/
	protected Long  number; 		/*数字*/
	protected String  hide; 		/*隐藏域*/
	protected Date  time; 		/*日期*/
	protected String  editor; 		/*富文本*/
	protected String  radio; 		/*单选*/
	protected String  checkBox; 		/*多选*/
	protected String  select; 		/*下拉*/
	protected String  dic; 		/*数据字典*/
	protected String  autoNum; 		/*自动编号*/
	protected String  att; 		/*附件*/
	protected String  selector; 		/*选择器*/
	protected String  customDialog; 		/*自定义对话框*/
	protected String  add; 		/*地址*/

	public void setId(String id) 
	{
		this.id = id;
	}
	/**
	 * 返回 主键标识
	 * @return
	 */
	public String getId() 
	{
		return this.id;
	}
	public void setText(String text) 
	{
		this.text = text;
	}
	/**
	 * 返回 文本框
	 * @return
	 */
	public String getText() 
	{
		return this.text;
	}
	public void setTextarea(String textarea) 
	{
		this.textarea = textarea;
	}
	/**
	 * 返回 文本域
	 * @return
	 */
	public String getTextarea() 
	{
		return this.textarea;
	}
	public void setNumber(Long number) 
	{
		this.number = number;
	}
	/**
	 * 返回 数字
	 * @return
	 */
	public Long getNumber() 
	{
		return this.number;
	}
	public void setHide(String hide) 
	{
		this.hide = hide;
	}
	/**
	 * 返回 隐藏域
	 * @return
	 */
	public String getHide() 
	{
		return this.hide;
	}
	public void setTime(Date time) 
	{
		this.time = time;
	}
	/**
	 * 返回 日期
	 * @return
	 */
	public Date getTime() 
	{
		return this.time;
	}
	public void setEditor(String editor) 
	{
		this.editor = editor;
	}
	/**
	 * 返回 富文本
	 * @return
	 */
	public String getEditor() 
	{
		return this.editor;
	}
	public void setRadio(String radio) 
	{
		this.radio = radio;
	}
	/**
	 * 返回 单选
	 * @return
	 */
	public String getRadio() 
	{
		return this.radio;
	}
	public void setCheckBox(String checkBox) 
	{
		this.checkBox = checkBox;
	}
	/**
	 * 返回 多选
	 * @return
	 */
	public String getCheckBox() 
	{
		return this.checkBox;
	}
	public void setSelect(String select) 
	{
		this.select = select;
	}
	/**
	 * 返回 下拉
	 * @return
	 */
	public String getSelect() 
	{
		return this.select;
	}
	public void setDic(String dic) 
	{
		this.dic = dic;
	}
	/**
	 * 返回 数据字典
	 * @return
	 */
	public String getDic() 
	{
		return this.dic;
	}
	public void setAutoNum(String autoNum) 
	{
		this.autoNum = autoNum;
	}
	/**
	 * 返回 自动编号
	 * @return
	 */
	public String getAutoNum() 
	{
		return this.autoNum;
	}
	public void setAtt(String att) 
	{
		this.att = att;
	}
	/**
	 * 返回 附件
	 * @return
	 */
	public String getAtt() 
	{
		return this.att;
	}
	public void setSelector(String selector) 
	{
		this.selector = selector;
	}
	/**
	 * 返回 选择器
	 * @return
	 */
	public String getSelector() 
	{
		return this.selector;
	}
	public void setCustomDialog(String customDialog) 
	{
		this.customDialog = customDialog;
	}
	/**
	 * 返回 自定义对话框
	 * @return
	 */
	public String getCustomDialog() 
	{
		return this.customDialog;
	}
	public void setAdd(String add) 
	{
		this.add = add;
	}
	/**
	 * 返回 地址
	 * @return
	 */
	public String getAdd() 
	{
		return this.add;
	}
	/**
	 * @see java.lang.Object#toString()
	 */
	public String toString() 
	{
		return new ToStringBuilder(this)
		.append("id", this.id) 
		.append("text", this.text) 
		.append("textarea", this.textarea) 
		.append("number", this.number) 
		.append("hide", this.hide) 
		.append("time", this.time) 
		.append("editor", this.editor) 
		.append("radio", this.radio) 
		.append("checkBox", this.checkBox) 
		.append("select", this.select) 
		.append("dic", this.dic) 
		.append("autoNum", this.autoNum) 
		.append("att", this.att) 
		.append("selector", this.selector) 
		.append("customDialog", this.customDialog) 
		.append("add", this.add) 
		.toString();
	}
}
