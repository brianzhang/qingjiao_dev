package com.lc.ibps.loans.zhiyaRInfo.repository.impl;


import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.loans.zhiyaRInfo.domain.ZhiYaPerson;
import com.lc.ibps.loans.zhiyaRInfo.repository.ZhiYaPersonRepository;
import com.lc.ibps.loans.zhiyaRInfo.persistence.dao.ZhiYaPersonQueryDao;
import com.lc.ibps.loans.zhiyaRInfo.persistence.entity.ZhiYaPersonPo;

/**
 * t_zyr 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：limin
 * 邮箱地址：limin19961996@163.com
 * 创建时间：2017-07-24 03:02:25
 *</pre>
 */
@Repository
public class ZhiYaPersonRepositoryImpl extends AbstractRepository<String, ZhiYaPersonPo,ZhiYaPerson> implements ZhiYaPersonRepository{
	  
	@Resource
	private  ZhiYaPersonQueryDao zhiYaPersonQueryDao;

	public ZhiYaPerson newInstance() {
		ZhiYaPersonPo po = new ZhiYaPersonPo();
		ZhiYaPerson zhiYaPerson = AppUtil.getBean(ZhiYaPerson.class);
		zhiYaPerson.setData(po);
		return zhiYaPerson;
	}

	public ZhiYaPerson newInstance(ZhiYaPersonPo po) {
		ZhiYaPerson zhiYaPerson = AppUtil.getBean(ZhiYaPerson.class);
		zhiYaPerson.setData(po);
		return zhiYaPerson;
	} 
	
	@Override
	protected IQueryDao<String, ZhiYaPersonPo> getQueryDao() {
		return zhiYaPersonQueryDao;
	}
	

	
   @Override
	public ZhiYaPersonPo getByJdId(String jdxxID) {
		// TODO Auto-generated method stub
		List<ZhiYaPersonPo> zhiYaPersonPoList=zhiYaPersonQueryDao.getByJdId(jdxxID);
		
		if(zhiYaPersonPoList.isEmpty()){
			return null;
		}else{
			ZhiYaPersonPo zhiYaPersonPo=zhiYaPersonPoList.get(0);
			return zhiYaPersonPo;
		}
		
	}

	@Override
	public ZhiYaPersonPo getByJdIdAndshengfenId(String jdxxID, String zjhm) {
        List<ZhiYaPersonPo> zhiYaPersonPoList=zhiYaPersonQueryDao.getByJdIdAndshengfenId(jdxxID,zjhm);
		
		if(zhiYaPersonPoList.isEmpty()){
			return null;
		}else{
			ZhiYaPersonPo zhiYaPersonPo=zhiYaPersonPoList.get(0);
			return zhiYaPersonPo;
		}
	}


}
