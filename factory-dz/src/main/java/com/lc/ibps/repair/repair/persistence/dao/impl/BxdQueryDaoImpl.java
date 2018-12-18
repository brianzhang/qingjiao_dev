
package com.lc.ibps.repair.repair.persistence.dao.impl;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisQueryDaoImpl;
import com.lc.ibps.repair.repair.persistence.dao.BxdQueryDao;
import com.lc.ibps.repair.repair.persistence.entity.BxdPo;

/**
 *t_bxd 查询Dao的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-24 10:25:04
 *</pre>
 */
 @SuppressWarnings("serial")
@Repository
public class BxdQueryDaoImpl extends MyBatisQueryDaoImpl<String, BxdPo> implements BxdQueryDao{

    @Override
    public String getNamespace() {
        return BxdPo.class.getName();
    }

	@Override
	public List<BxdPo> getByGdzt(String gdzt) {
		// TODO Auto-generated method stub
		return findByKey("getByGdzt",gdzt);
	}

	@Override
	public List<BxdPo> getBySubBxdIdAndGdlx(String subid, String gdlx) {
		// TODO Auto-generated method stub
		Map<String,Object> paramMap = new HashMap<String,Object>();
		paramMap.put("subid", subid);
		paramMap.put("gdlx", gdlx);
		return findByKey("getBySubBxdIdAndGdlx",paramMap);
	}
}
