
package com.lc.ibps.bishes.labelType.persistence.dao.impl;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisQueryDaoImpl;
import com.lc.ibps.bishes.labelType.persistence.dao.LabelTypeQueryDao;
import com.lc.ibps.bishes.labelType.persistence.entity.LabelTypePo;

/**
 *t_label_type 查询Dao的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-22 16:57:08
 *</pre>
 */
 @SuppressWarnings("serial")
@Repository
public class LabelTypeQueryDaoImpl extends MyBatisQueryDaoImpl<String, LabelTypePo> implements LabelTypeQueryDao{

    @Override
    public String getNamespace() {
        return LabelTypePo.class.getName();
    }

	@Override
	public List<LabelTypePo> findBySql(String whereSql) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("whereSql", whereSql);
		return this.findByKey("findBySql", params);
	}
}
