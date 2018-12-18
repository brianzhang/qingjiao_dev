package com.lc.ibps.pgs.PGData.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Service;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.pgs.PGData.persistence.dao.AllCourseDao;
import com.lc.ibps.pgs.PGData.persistence.dao.AllCourseQueryDao;
import com.lc.ibps.pgs.PGData.persistence.entity.AllCoursePo;


/**
 * t_qbkc 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-15 15:56:41
 *</pre>
 */
@SuppressWarnings("serial")
@Service
@Scope("prototype")
public class AllCourse extends AbstractDomain<String, AllCoursePo>{
	 
	private AllCourseDao allCourseDao = null;
	private AllCourseQueryDao allCourseQueryDao = null;

	

	protected void init(){
		allCourseDao = AppUtil.getBean(AllCourseDao.class);
		allCourseQueryDao = AppUtil.getBean(AllCourseQueryDao.class);
		this.setDao(allCourseDao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(allCourseQueryDao.get(getId())));
	}
	
	
}
