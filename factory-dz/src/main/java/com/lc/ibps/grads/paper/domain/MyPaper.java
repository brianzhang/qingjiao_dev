package com.lc.ibps.grads.paper.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.grads.paper.persistence.dao.MyPaperDao;
import com.lc.ibps.grads.paper.persistence.dao.MyPaperQueryDao;
import com.lc.ibps.grads.paper.persistence.entity.MyPaperPo;

/**
 * 我的论文表单 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：xubaocheng
 * 邮箱地址：100000000000@qq.com
 * 创建时间：2017-05-19 12:27:00
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class MyPaper extends AbstractDomain<String, MyPaperPo>{
	 
	private MyPaperDao myPaperDao = null;
	private MyPaperQueryDao myPaperQueryDao = null;
	

	@Override
	protected void init(){
		myPaperDao = AppUtil.getBean(MyPaperDao.class);
		myPaperQueryDao = AppUtil.getBean(MyPaperQueryDao.class);
		this.setDao(myPaperDao);
	}
	
	@Override
	protected void onSave() {
		setNewFlag(BeanUtils.isEmpty(myPaperQueryDao.get(getId())));
	}
	
}
