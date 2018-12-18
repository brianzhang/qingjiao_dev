package com.lc.ibps.lyzygls.ZhuYaoTuRang.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.lyzygls.ZhuYaoTuRang.persistence.dao.ZhuYaoTuRangDao;
import com.lc.ibps.lyzygls.ZhuYaoTuRang.persistence.dao.ZhuYaoTuRangQueryDao;
import com.lc.ibps.lyzygls.ZhuYaoTuRang.persistence.entity.ZhuYaoTuRangPo;


/**
 * t_zytr 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-22 12:55:08
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class ZhuYaoTuRang extends AbstractDomain<String, ZhuYaoTuRangPo>{
	 
	private ZhuYaoTuRangDao zhuYaoTuRangDao = null;
	private ZhuYaoTuRangQueryDao zhuYaoTuRangQueryDao = null;

	

	protected void init(){
		zhuYaoTuRangDao = AppUtil.getBean(ZhuYaoTuRangDao.class);
		zhuYaoTuRangQueryDao = AppUtil.getBean(ZhuYaoTuRangQueryDao.class);
		this.setDao(zhuYaoTuRangDao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(zhuYaoTuRangQueryDao.get(getId())));
	}
	
	
}
