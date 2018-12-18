
package com.lc.ibps.loans.DaiKSSCSP.persistence.dao.impl;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisQueryDaoImpl;
import com.lc.ibps.loans.DaiKSSCSP.persistence.dao.ShenCRYJQueryDao;
import com.lc.ibps.loans.DaiKSSCSP.persistence.entity.ShenCRYJPo;

/**
 *t_scryj 查询Dao的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：limin
 * 邮箱地址：limin19961996@163.com
 * 创建时间：2017-07-31 22:34:57
 *</pre>
 */
 @SuppressWarnings("serial")
@Repository
public class ShenCRYJQueryDaoImpl extends MyBatisQueryDaoImpl<String, ShenCRYJPo> implements ShenCRYJQueryDao{

    @Override
    public String getNamespace() {
        return ShenCRYJPo.class.getName();
    }

	@Override
	public List<ShenCRYJPo> getByJdid(String jdid) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("jdid", jdid);
		return this.findByKey("getByJdid", params);
	}
}
