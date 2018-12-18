package com.lc.ibps.bishes.kaitiGroup.repository;

import java.util.List;

import com.lc.ibps.base.framework.repository.IRepository;
import com.lc.ibps.bishes.kaitiGroup.domain.KaitiGroup;
import com.lc.ibps.bishes.kaitiGroup.persistence.entity.KaitiGroupPo;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.persistence.entity.UrlZhiYuanPo;

/**
 * t_ktxz 仓库接口
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-14 17:32:50
 *</pre>
 */
public interface KaitiGroupRepository extends IRepository<String, KaitiGroupPo,KaitiGroup>{
	
	KaitiGroupPo getBydbgroup(String groupid);
}
