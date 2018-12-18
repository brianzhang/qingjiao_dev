
package com.lc.ibps.bishes.audit.persistence.dao.impl;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisQueryDaoImpl;
import com.lc.ibps.bishes.audit.persistence.dao.LabelDefQueryDao;
import com.lc.ibps.bishes.audit.persistence.entity.LabelDefPo;
import com.lc.ibps.bishes.audit.persistence.entity.TchLabelPo;

/**
 *t_label_def 查询Dao的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-22 19:19:56
 *</pre>
 */
 @SuppressWarnings("serial")
@Repository
public class LabelDefQueryDaoImpl extends MyBatisQueryDaoImpl<String, LabelDefPo> implements LabelDefQueryDao{

    @Override
    public String getNamespace() {
        return LabelDefPo.class.getName();
    }
    
	@Override
	public List<LabelDefPo> getBySql(String whereSql) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("whereSql", whereSql);
		return this.findByKey("getBySql", params);
	}
}
