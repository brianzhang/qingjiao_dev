package com.lc.ibps.loans.files.repository.impl;


import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.loans.dyrInfo.persistence.entity.DyrPo;
import com.lc.ibps.loans.files.domain.File;
import com.lc.ibps.loans.files.repository.FileRepository;
import com.lc.ibps.loans.files.persistence.dao.FileQueryDao;
import com.lc.ibps.loans.files.persistence.entity.FilePo;

/**
 * t_file 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-08-26 11:50:51
 *</pre>
 */
@Repository
public class FileRepositoryImpl extends AbstractRepository<String, FilePo,File> implements FileRepository{
	  
	@Resource
	private  FileQueryDao fileQueryDao;

	public File newInstance() {
		FilePo po = new FilePo();
		File file = AppUtil.getBean(File.class);
		file.setData(po);
		return file;
	}

	public File newInstance(FilePo po) {
		File file = AppUtil.getBean(File.class);
		file.setData(po);
		return file;
	} 
	
	@Override
	protected IQueryDao<String, FilePo> getQueryDao() {
		return fileQueryDao;
	}

	@Override
	public FilePo getByJdid(String jdid) {
		List<FilePo> filePoList=fileQueryDao.getByJdid(jdid);
		
		if(filePoList.isEmpty()){
			return null;
		}else{
			FilePo filePo=filePoList.get(0);
			return filePo;
		}
	}
	

	
}
