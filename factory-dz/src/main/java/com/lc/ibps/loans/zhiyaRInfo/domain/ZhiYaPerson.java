package com.lc.ibps.loans.zhiyaRInfo.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.loans.zhiyaRInfo.persistence.dao.ZhiYaPersonDao;
import com.lc.ibps.loans.zhiyaRInfo.persistence.dao.ZhiYaPersonQueryDao;
import com.lc.ibps.loans.zhiyaRInfo.persistence.entity.ZhiYaPersonPo;

/**
 * t_zyr 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：limin
 * 邮箱地址：limin19961996@163.com
 * 创建时间：2017-07-24 03:02:25
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class ZhiYaPerson extends AbstractDomain<String, ZhiYaPersonPo>{
	 
	private ZhiYaPersonDao zhiYaPersonDao = null;
	private ZhiYaPersonQueryDao zhiYaPersonQueryDao = null;


	protected void init(){
		zhiYaPersonDao = AppUtil.getBean(ZhiYaPersonDao.class);
		zhiYaPersonQueryDao = AppUtil.getBean(ZhiYaPersonQueryDao.class);
		this.setDao(zhiYaPersonDao);
	}
	
	@Override
	protected void onSave() {
		setNewFlag(BeanUtils.isEmpty(zhiYaPersonQueryDao.get(getId())));
	}
	
}
