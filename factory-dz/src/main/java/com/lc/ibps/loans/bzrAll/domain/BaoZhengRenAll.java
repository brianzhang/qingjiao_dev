package com.lc.ibps.loans.bzrAll.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.loans.bzrAll.persistence.dao.BaoZhengRenAllDao;
import com.lc.ibps.loans.bzrAll.persistence.dao.BaoZhengRenAllQueryDao;
import com.lc.ibps.loans.bzrAll.persistence.entity.BaoZhengRenAllPo;

/**
 * t_bzr_all 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-21 18:49:52
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class BaoZhengRenAll extends AbstractDomain<String, BaoZhengRenAllPo>{
	 
	private BaoZhengRenAllDao baoZhengRenAllDao = null;
	private BaoZhengRenAllQueryDao baoZhengRenAllQueryDao = null;


	protected void init(){
		baoZhengRenAllDao = AppUtil.getBean(BaoZhengRenAllDao.class);
		baoZhengRenAllQueryDao = AppUtil.getBean(BaoZhengRenAllQueryDao.class);
		this.setDao(baoZhengRenAllDao);
	}
	
	@Override
	protected void onSave() {
		setNewFlag(BeanUtils.isEmpty(baoZhengRenAllQueryDao.get(getId())));
	}
	
}
