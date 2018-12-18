package com.lc.ibps.urlZhiYuan.urlZhiYuant.persistence.dao.impl;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.db.ddd.dao.MyBatisDaoImpl;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.persistence.dao.UrlZhiYuanDao;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.persistence.entity.UrlZhiYuanPo;

/**
 * t_zyurl Dao接口的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-04 23:52:06
 *</pre>
 */
@SuppressWarnings("serial")
@Repository
public class UrlZhiYuanDaoImpl extends MyBatisDaoImpl<String, UrlZhiYuanPo> implements UrlZhiYuanDao{

    @Override
    public String getNamespace() {
        return UrlZhiYuanPo.class.getName();
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
