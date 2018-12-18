package com.lc.ibps.pgs.PGData.repository.impl;


import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.pgs.PGData.domain.TargetConfRecord;
import com.lc.ibps.pgs.PGData.repository.TargetConfRecordRepository;
import com.lc.ibps.pgs.PGData.persistence.dao.TargetConfRecordQueryDao;
import com.lc.ibps.pgs.PGData.persistence.entity.TargetConfRecordPo;

/**
 * t_p_xyjxyzxwyhtlqkjl 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-15 11:10:51
 *</pre>
 */
@Repository
public class TargetConfRecordRepositoryImpl extends AbstractRepository<String, TargetConfRecordPo,TargetConfRecord> implements TargetConfRecordRepository{
	  
	@Resource
	private  TargetConfRecordQueryDao targetConfRecordQueryDao;

	public TargetConfRecord newInstance() {
		TargetConfRecordPo po = new TargetConfRecordPo();
		TargetConfRecord targetConfRecord = AppUtil.getBean(TargetConfRecord.class);
		targetConfRecord.setData(po);
		return targetConfRecord;
	}

	public TargetConfRecord newInstance(TargetConfRecordPo po) {
		TargetConfRecord targetConfRecord = AppUtil.getBean(TargetConfRecord.class);
		targetConfRecord.setData(po);
		return targetConfRecord;
	} 
	
	@Override
	protected IQueryDao<String, TargetConfRecordPo> getQueryDao() {
		return targetConfRecordQueryDao;
	}
	

	
}
