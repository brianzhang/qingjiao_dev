package com.lc.ibps.pgs.XiuDing.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.pgs.XiuDing.persistence.dao.AimXiuDingDao;
import com.lc.ibps.pgs.XiuDing.persistence.dao.AimXiuDingQueryDao;
import com.lc.ibps.pgs.XiuDing.persistence.entity.AimXiuDingPo;


/**
 * t_pymbxd 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-11 16:22:10
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class AimXiuDing extends AbstractDomain<String, AimXiuDingPo>{
	 
	private AimXiuDingDao aimXiuDingDao = null;
	private AimXiuDingQueryDao aimXiuDingQueryDao = null;

	

	protected void init(){
		aimXiuDingDao = AppUtil.getBean(AimXiuDingDao.class);
		aimXiuDingQueryDao = AppUtil.getBean(AimXiuDingQueryDao.class);
		this.setDao(aimXiuDingDao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(aimXiuDingQueryDao.get(getId())));
	}
	
	
}
