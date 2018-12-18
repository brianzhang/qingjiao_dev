package com.lc.ibps.test.demo.repository;

import java.util.List;
import com.lc.ibps.base.framework.repository.IRepository;
import com.lc.ibps.test.demo.domain.UrlFormSub2;
import com.lc.ibps.test.demo.persistence.entity.UrlFormSub2Po;

/**
 * 子表例子 仓库接口
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-04-06 19:31:27
 *</pre>
 */
public interface UrlFormSub2Repository extends IRepository<String, UrlFormSub2Po,UrlFormSub2>{
	 /**
	 * 根据主表ID查询 子表例子 列表
	 * @param mainId
	 * @return 
	 * List<UrlFormSub2Po>
	 */
	public List<UrlFormSub2Po> findByMainId(String mainId);

}
