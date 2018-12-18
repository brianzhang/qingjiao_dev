package com.lc.ibps.loans.zhiyarenAll.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.loans.zhiyarenAll.persistence.dao.ZhiYaRenAllDao;
import com.lc.ibps.loans.zhiyarenAll.persistence.dao.ZhiYaRenAllQueryDao;
import com.lc.ibps.loans.zhiyarenAll.persistence.entity.ZhiYaRenAllPo;

/**
 * t_zyr_all 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-21 05:17:35
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class ZhiYaRenAll extends AbstractDomain<String, ZhiYaRenAllPo>{
	 
	private ZhiYaRenAllDao zhiYaRenAllDao = null;
	private ZhiYaRenAllQueryDao zhiYaRenAllQueryDao = null;


	protected void init(){
		zhiYaRenAllDao = AppUtil.getBean(ZhiYaRenAllDao.class);
		zhiYaRenAllQueryDao = AppUtil.getBean(ZhiYaRenAllQueryDao.class);
		this.setDao(zhiYaRenAllDao);
	}
	
	@Override
	protected void onSave() {
		setNewFlag(BeanUtils.isEmpty(zhiYaRenAllQueryDao.get(getId())));
	}
	
}
