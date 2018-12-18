package com.lc.ibps.bishes.audit.persistence.dao.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.bishes.audit.persistence.dao.TchLabelDao;
import com.lc.ibps.bishes.audit.persistence.entity.TchLabelPo;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.persistence.entity.UrlZhiYuanPo;

/**
 * 教师标签表 Dao接口的实现类
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
public class TchLabelDaoImpl extends MyBatisDaoImpl<String, TchLabelPo> implements TchLabelDao{

    @Override
    public String getNamespace() {
        return TchLabelPo.class.getName();
    }

	@Override
	public void compoundLabel(String oldId, String newId, String orgId) {
	   	Map<String, Object> params = new HashMap<String, Object>();
	   	params.put("oldLabelId", oldId);
	   	params.put("newLabelId", newId);
	   	params.put("orgId", orgId);
		sqlSessionTemplate.update((new StringBuilder()).append(getNamespace()).append(".").append("compoundLabel").toString(), params);
	}
}
