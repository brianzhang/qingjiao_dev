package com.lc.ibps.urlZhiYuan.urlZhiYuant.persistence.dao;

import com.lc.ibps.base.framework.persistence.dao.IDao;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.persistence.entity.UrlZhiYuanPo;

/**
 * t_zyurl Dao接口
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-04 23:52:06
 *</pre>
 */
public interface UrlZhiYuanDao extends IDao<String, UrlZhiYuanPo> {
	void compoundLabel(String oldId, String newId, String orgId);
}
