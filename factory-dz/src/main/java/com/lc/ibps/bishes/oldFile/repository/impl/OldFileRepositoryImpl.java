package com.lc.ibps.bishes.oldFile.repository.impl;


import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.bishes.oldFile.domain.OldFile;
import com.lc.ibps.bishes.oldFile.repository.OldFileRepository;
import com.lc.ibps.bishes.oldFile.persistence.dao.OldFileQueryDao;
import com.lc.ibps.bishes.oldFile.persistence.entity.OldFilePo;

import java.util.List;

/**
 * t_oldfile 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-11-29 16:49:23
 *</pre>
 */
@Repository
public class OldFileRepositoryImpl extends AbstractRepository<String, OldFilePo,OldFile> implements OldFileRepository{
	  
	@Resource
	private  OldFileQueryDao oldFileQueryDao;

	@Override
	public OldFile newInstance() {
		OldFilePo po = new OldFilePo();
		OldFile oldFile = AppUtil.getBean(OldFile.class);
		oldFile.setData(po);
		return oldFile;
	}

	@Override
	public OldFile newInstance(OldFilePo po) {
		OldFile oldFile = AppUtil.getBean(OldFile.class);
		oldFile.setData(po);
		return oldFile;
	} 
	
	@Override
	protected IQueryDao<String, OldFilePo> getQueryDao() {
		return oldFileQueryDao;
	}


	@Override
	public List<OldFilePo> getBySql(String whereSql) {
		return oldFileQueryDao.getBySql(whereSql);
	}
}
