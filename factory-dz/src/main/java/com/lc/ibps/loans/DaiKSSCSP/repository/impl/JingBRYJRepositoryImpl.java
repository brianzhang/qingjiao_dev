package com.lc.ibps.loans.DaiKSSCSP.repository.impl;


import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.loans.DaiKSSCSP.domain.JingBRYJ;
import com.lc.ibps.loans.DaiKSSCSP.repository.JingBRYJRepository;
import com.lc.ibps.loans.DaiKSSCSP.persistence.dao.JingBRYJQueryDao;
import com.lc.ibps.loans.DaiKSSCSP.persistence.entity.JingBRYJPo;
import com.lc.ibps.loans.DaiKSSCSP.persistence.entity.ZhuDCRYJPo;

/**
 * t_jbdcryj 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：limin
 * 邮箱地址：limin1996@163.com
 * 创建时间：2017-07-31 22:34:51
 *</pre>
 */
@Repository
public class JingBRYJRepositoryImpl extends AbstractRepository<String, JingBRYJPo,JingBRYJ> implements JingBRYJRepository{
	  
	@Resource
	private  JingBRYJQueryDao jingBRYJQueryDao;

	public JingBRYJ newInstance() {
		JingBRYJPo po = new JingBRYJPo();
		JingBRYJ jingBRYJ = AppUtil.getBean(JingBRYJ.class);
		jingBRYJ.setData(po);
		return jingBRYJ;
	}

	public JingBRYJ newInstance(JingBRYJPo po) {
		JingBRYJ jingBRYJ = AppUtil.getBean(JingBRYJ.class);
		jingBRYJ.setData(po);
		return jingBRYJ;
	} 
	
	@Override
	protected IQueryDao<String, JingBRYJPo> getQueryDao() {
		return jingBRYJQueryDao;
	}

	@Override
	public JingBRYJPo getByJdid(String jdid) {
		List<JingBRYJPo> jingBRYJList = jingBRYJQueryDao.getByJdid(jdid);
		if(jingBRYJList.size()>0){
			JingBRYJPo jingBRYJ = jingBRYJList.get(0);
			return jingBRYJ;
		}else{
			return null;
		}
	}
	

	
}
