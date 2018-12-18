package com.lc.ibps.bishes.kaitiGroup.repository.impl;


import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.bishes.kaitiGroup.domain.KaitiGroup;
import com.lc.ibps.bishes.kaitiGroup.repository.KaitiGroupRepository;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.persistence.entity.UrlZhiYuanPo;
import com.lc.ibps.bishes.kaitiGroup.persistence.dao.KaitiGroupQueryDao;
import com.lc.ibps.bishes.kaitiGroup.persistence.entity.KaitiGroupPo;

/**
 * t_ktxz 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-14 17:32:50
 *</pre>
 */
@Repository
public class KaitiGroupRepositoryImpl extends AbstractRepository<String, KaitiGroupPo,KaitiGroup> implements KaitiGroupRepository{
	  
	@Resource
	private  KaitiGroupQueryDao kaitiGroupQueryDao;

	public KaitiGroup newInstance() {
		KaitiGroupPo po = new KaitiGroupPo();
		KaitiGroup kaitiGroup = AppUtil.getBean(KaitiGroup.class);
		kaitiGroup.setData(po);
		return kaitiGroup;
	}

	public KaitiGroup newInstance(KaitiGroupPo po) {
		KaitiGroup kaitiGroup = AppUtil.getBean(KaitiGroup.class);
		kaitiGroup.setData(po);
		return kaitiGroup;
	} 
	
	@Override
	protected IQueryDao<String, KaitiGroupPo> getQueryDao() {
		return kaitiGroupQueryDao;
	}

	@Override
	public KaitiGroupPo getBydbgroup(String groupid) {
		// TODO Auto-generated method stub
		List<KaitiGroupPo> polist  =kaitiGroupQueryDao.getByktGroupId(groupid);
		if(polist.size()==0){
			return null;
		}else{
			KaitiGroupPo po =polist.get(0);
			return po;
		}
	}

}
