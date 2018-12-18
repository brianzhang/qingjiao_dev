
package com.lc.ibps.loans.zhiyaRInfo.persistence.dao.impl;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisQueryDaoImpl;
import com.lc.ibps.loans.zhiyaRInfo.persistence.dao.ZhiYaPersonQueryDao;
import com.lc.ibps.loans.zhiyaRInfo.persistence.entity.ZhiYaPersonPo;

/**
 *t_zyr 查询Dao的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：limin
 * 邮箱地址：limin19961996@163.com
 * 创建时间：2017-07-24 03:02:25
 *</pre>
 */
 @SuppressWarnings("serial")
@Repository
public class ZhiYaPersonQueryDaoImpl extends MyBatisQueryDaoImpl<String, ZhiYaPersonPo> implements ZhiYaPersonQueryDao{

    @Override
    public String getNamespace() {
        return ZhiYaPersonPo.class.getName();
    }

    @Override
	public List<ZhiYaPersonPo> getByJdId(String jdxxID) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("jdxxID", jdxxID);
		return this.findByKey("getByJdId", params);
	}

	@Override
	public List<ZhiYaPersonPo> getByJdIdAndshengfenId(String jdxxID, String zjhm) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("jdxxID", jdxxID);
		params.put("zjhm", zjhm);
		return this.findByKey("getByJdIdAndshengfenId", params);
	}


}
