package com.lc.ibps.loans.files.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.loans.files.persistence.dao.FileDao;
import com.lc.ibps.loans.files.persistence.dao.FileQueryDao;
import com.lc.ibps.loans.files.persistence.entity.FilePo;

/**
 * t_file 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-08-26 11:50:51
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class File extends AbstractDomain<String, FilePo>{
	 
	private FileDao fileDao = null;
	private FileQueryDao fileQueryDao = null;


	protected void init(){
		fileDao = AppUtil.getBean(FileDao.class);
		fileQueryDao = AppUtil.getBean(FileQueryDao.class);
		this.setDao(fileDao);
	}
	
	@Override
	protected void onSave() {
		setNewFlag(BeanUtils.isEmpty(fileQueryDao.get(getId())));
	}
	
}
