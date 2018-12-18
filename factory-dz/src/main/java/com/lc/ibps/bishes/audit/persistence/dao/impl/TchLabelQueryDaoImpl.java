
package com.lc.ibps.bishes.audit.persistence.dao.impl;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisQueryDaoImpl;
import com.lc.ibps.bishes.audit.persistence.dao.TchLabelQueryDao;
import com.lc.ibps.bishes.audit.persistence.entity.TchLabelPo;

/**
 *教师标签表 查询Dao的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-09 12:50:31
 *</pre>
 */
 @SuppressWarnings("serial")
@Repository
public class TchLabelQueryDaoImpl extends MyBatisQueryDaoImpl<String, TchLabelPo> implements TchLabelQueryDao{

    @Override
    public String getNamespace() {
        return TchLabelPo.class.getName();
    }

	@Override
	public List<TchLabelPo> getBySql(String whereSql) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("whereSql", whereSql);
		return this.findByKey("getBySql", params);
	}

	@Override
	public int getNumByLabel(String labelId) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("labelId", labelId);
		return this.countByKey("getNumByLabel", params);
	}
}
