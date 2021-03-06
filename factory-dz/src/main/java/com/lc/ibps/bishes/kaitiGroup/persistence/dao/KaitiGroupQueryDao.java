package com.lc.ibps.bishes.kaitiGroup.persistence.dao;

import java.util.List;

import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.bishes.kaitiGroup.persistence.entity.KaitiGroupPo;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.persistence.entity.UrlZhiYuanPo;

/**
 * t_ktxz 查询Dao接口
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-14 17:32:50
 *</pre>
 */
public interface KaitiGroupQueryDao extends IQueryDao<String, KaitiGroupPo> {
	List<KaitiGroupPo> getByktGroupId(String groupid);
}
