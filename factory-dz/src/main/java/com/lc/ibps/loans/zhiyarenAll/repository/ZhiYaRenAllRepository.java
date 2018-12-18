package com.lc.ibps.loans.zhiyarenAll.repository;

import com.lc.ibps.base.framework.repository.IRepository;
import com.lc.ibps.loans.zhiyarenAll.domain.ZhiYaRenAll;
import com.lc.ibps.loans.zhiyarenAll.persistence.entity.ZhiYaRenAllPo;

/**
 * t_zyr_all 仓库接口
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-21 05:17:35
 *</pre>
 */
public interface ZhiYaRenAllRepository extends IRepository<String, ZhiYaRenAllPo,ZhiYaRenAll>{

	ZhiYaRenAllPo getByJdId(String jdid);

}
