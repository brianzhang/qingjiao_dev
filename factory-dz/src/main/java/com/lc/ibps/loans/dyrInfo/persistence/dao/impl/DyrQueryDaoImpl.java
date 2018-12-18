
package com.lc.ibps.loans.dyrInfo.persistence.dao.impl;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisQueryDaoImpl;
import com.lc.ibps.loans.dyrInfo.persistence.dao.DyrQueryDao;
import com.lc.ibps.loans.dyrInfo.persistence.entity.DyrPo;

/**
 *t_dyr 查询Dao的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-24 00:16:31
 *</pre>
 */
 @SuppressWarnings("serial")
@Repository
public class DyrQueryDaoImpl extends MyBatisQueryDaoImpl<String, DyrPo> implements DyrQueryDao{

    @Override
    public String getNamespace() {
        return DyrPo.class.getName();
    }
    @Override
	public List<DyrPo> getByJdId(String jdid) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("jdid", jdid);
		return this.findByKey("getByJdId", params);
	}

	@Override
	public List<DyrPo> getByJdIdAndshengfenId(String jdid, String zjhm) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("jdid", jdid);
		params.put("zjhm", zjhm);
		return this.findByKey("getByJdIdAndshengfenId", params);
	}


}
