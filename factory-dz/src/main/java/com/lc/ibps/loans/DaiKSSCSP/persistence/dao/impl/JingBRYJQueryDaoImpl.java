
package com.lc.ibps.loans.DaiKSSCSP.persistence.dao.impl;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisQueryDaoImpl;
import com.lc.ibps.loans.DaiKSSCSP.persistence.dao.JingBRYJQueryDao;
import com.lc.ibps.loans.DaiKSSCSP.persistence.entity.JingBRYJPo;

/**
 *t_jbdcryj 查询Dao的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：limin
 * 邮箱地址：limin1996@163.com
 * 创建时间：2017-07-31 22:34:51
 *</pre>
 */
 @SuppressWarnings("serial")
@Repository
public class JingBRYJQueryDaoImpl extends MyBatisQueryDaoImpl<String, JingBRYJPo> implements JingBRYJQueryDao{

    @Override
    public String getNamespace() {
        return JingBRYJPo.class.getName();
    }

	@Override
	public List<JingBRYJPo> getByJdid(String jdid) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("jdid", jdid);
		return this.findByKey("getByJdid", params);
	}
}
