package com.lc.ibps.test.demo.repository;

import com.lc.ibps.base.framework.repository.IRepository;
import com.lc.ibps.test.demo.domain.UrlForm;
import com.lc.ibps.test.demo.persistence.entity.UrlFormPo;

/**
 * url表单例子 仓库接口
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-04-06 19:31:27
 *</pre>
 */
public interface UrlFormRepository extends IRepository<String, UrlFormPo,UrlForm>{

	/**
	 * 查询全部子表的数据，并设置到主表Po中 
	 * void
	 */
	public UrlFormPo loadCascade(String id);
}
