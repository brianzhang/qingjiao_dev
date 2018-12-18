package com.lc.ibps.test.demo.persistence.dao;

import com.lc.ibps.base.framework.persistence.dao.IDao;
import com.lc.ibps.test.demo.persistence.entity.UrlFormSub2Po;

/**
 * 子表例子 Dao接口
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-04-06 19:31:27
 *</pre>
 */
public interface UrlFormSub2Dao extends IDao<String, UrlFormSub2Po> {
	/**
	 * 根据主表id删除 子表例子 记录
	 * @param mainId 
	 * void
	 */
	public void deleteByMainId(String mainId);
}
