package com.lc.ibps.loans.zhiyaRInfo.repository;

import com.lc.ibps.base.framework.repository.IRepository;
import com.lc.ibps.loans.zhiyaRInfo.domain.ZhiYaPerson;
import com.lc.ibps.loans.zhiyaRInfo.persistence.entity.ZhiYaPersonPo;

/**
 * t_zyr 仓库接口
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：limin
 * 邮箱地址：limin19961996@163.com
 * 创建时间：2017-07-24 03:02:25
 *</pre>
 */
public interface ZhiYaPersonRepository extends IRepository<String, ZhiYaPersonPo,ZhiYaPerson>{


	ZhiYaPersonPo getByJdId(String jdxxID);

	ZhiYaPersonPo getByJdIdAndshengfenId(String jdxxID, String zjhm);


}
