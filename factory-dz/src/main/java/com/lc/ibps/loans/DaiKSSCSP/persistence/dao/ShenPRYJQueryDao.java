package com.lc.ibps.loans.DaiKSSCSP.persistence.dao;

import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.loans.DaiKSSCSP.persistence.entity.ShenPRYJPo;
import java.util.List;

/**
 * t_spryj 查询Dao接口
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：limin
 * 邮箱地址：limin19961996@163.com
 * 创建时间：2017-07-31 22:35:04
 *</pre>
 */
public interface ShenPRYJQueryDao extends IQueryDao<String, ShenPRYJPo> {

	List<ShenPRYJPo> getByJdid(String jdid);
}
