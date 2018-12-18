package com.lc.ibps.bishes.audit.persistence.dao;

import java.util.List;

import com.lc.ibps.base.framework.persistence.dao.IDao;
import com.lc.ibps.bishes.audit.persistence.entity.TchLabelPo;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.persistence.entity.UrlZhiYuanPo;

/**
 * 教师标签表 Dao接口
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-09 12:50:31
 *</pre>
 */
public interface TchLabelDao extends IDao<String, TchLabelPo> {
	
	void compoundLabel(String oldId, String newId, String orgId);
	
}
