package com.lc.ibps.lyzygls.Xiuzheng.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.lyzygls.Xiuzheng.persistence.dao.XiuzhengDao;
import com.lc.ibps.lyzygls.Xiuzheng.persistence.dao.XiuzhengQueryDao;
import com.lc.ibps.lyzygls.Xiuzheng.persistence.entity.XiuzhengPo;


/**
 * 森林资源变化统计表（去年实有和修正值） 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：panzhonghuai
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-12-17 13:55:35
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class Xiuzheng extends AbstractDomain<String, XiuzhengPo>{
	 
	private XiuzhengDao xiuzhengDao = null;
	private XiuzhengQueryDao xiuzhengQueryDao = null;

	

	protected void init(){
		xiuzhengDao = AppUtil.getBean(XiuzhengDao.class);
		xiuzhengQueryDao = AppUtil.getBean(XiuzhengQueryDao.class);
		this.setDao(xiuzhengDao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(xiuzhengQueryDao.get(getId())));
	}
	
	
}
