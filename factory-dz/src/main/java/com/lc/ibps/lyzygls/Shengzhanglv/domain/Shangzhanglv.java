package com.lc.ibps.lyzygls.Shengzhanglv.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.lyzygls.Shengzhanglv.persistence.dao.ShangzhanglvDao;
import com.lc.ibps.lyzygls.Shengzhanglv.persistence.dao.ShangzhanglvQueryDao;
import com.lc.ibps.lyzygls.Shengzhanglv.persistence.entity.ShangzhanglvPo;


/**
 * 该表用于生长率的设置 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-17 14:14:02
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class Shangzhanglv extends AbstractDomain<String, ShangzhanglvPo>{
	 
	private ShangzhanglvDao shangzhanglvDao = null;
	private ShangzhanglvQueryDao shangzhanglvQueryDao = null;

	

	protected void init(){
		shangzhanglvDao = AppUtil.getBean(ShangzhanglvDao.class);
		shangzhanglvQueryDao = AppUtil.getBean(ShangzhanglvQueryDao.class);
		this.setDao(shangzhanglvDao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(shangzhanglvQueryDao.get(getId())));
	}
	
	
}
