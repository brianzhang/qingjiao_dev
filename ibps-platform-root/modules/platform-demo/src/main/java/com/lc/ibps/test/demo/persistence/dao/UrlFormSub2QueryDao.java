package com.lc.ibps.test.demo.persistence.dao;

import java.util.List;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.test.demo.persistence.entity.UrlFormSub2Po;

/**
 * 子表例子 查询Dao接口
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-04-06 19:31:27
 *</pre>
 */
public interface UrlFormSub2QueryDao extends IQueryDao<String, UrlFormSub2Po> {
	/**
	 * 根据主表ID查询 子表例子 列表
	 * @param mainId
	 * @return 
	 * List<UrlFormSub2Po>
	 */
	public List<UrlFormSub2Po> findByMainId(String mainId);
}
