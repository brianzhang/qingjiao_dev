package com.lc.ibps.loans.zhiyarenAll.repository.impl;


import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.loans.zhiyaRInfo.persistence.entity.ZhiYaPersonPo;
import com.lc.ibps.loans.zhiyarenAll.domain.ZhiYaRenAll;
import com.lc.ibps.loans.zhiyarenAll.repository.ZhiYaRenAllRepository;
import com.lc.ibps.loans.zhiyarenAll.persistence.dao.ZhiYaRenAllQueryDao;
import com.lc.ibps.loans.zhiyarenAll.persistence.entity.ZhiYaRenAllPo;

/**
 * t_zyr_all 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-21 05:17:35
 *</pre>
 */
@Repository
public class ZhiYaRenAllRepositoryImpl extends AbstractRepository<String, ZhiYaRenAllPo,ZhiYaRenAll> implements ZhiYaRenAllRepository{
	  
	@Resource
	private  ZhiYaRenAllQueryDao zhiYaRenAllQueryDao;

	public ZhiYaRenAll newInstance() {
		ZhiYaRenAllPo po = new ZhiYaRenAllPo();
		ZhiYaRenAll zhiYaRenAll = AppUtil.getBean(ZhiYaRenAll.class);
		zhiYaRenAll.setData(po);
		return zhiYaRenAll;
	}

	public ZhiYaRenAll newInstance(ZhiYaRenAllPo po) {
		ZhiYaRenAll zhiYaRenAll = AppUtil.getBean(ZhiYaRenAll.class);
		zhiYaRenAll.setData(po);
		return zhiYaRenAll;
	} 
	
	@Override
	protected IQueryDao<String, ZhiYaRenAllPo> getQueryDao() {
		return zhiYaRenAllQueryDao;
	}

	@Override
	public ZhiYaRenAllPo getByJdId(String jdid) {
		// TODO Auto-generated method stub
		List<ZhiYaRenAllPo> zhiYaRenAllPoList=zhiYaRenAllQueryDao.getByJdId(jdid);
		if(zhiYaRenAllPoList.isEmpty()){
			return null;
		}else{
			ZhiYaRenAllPo zhiYaRenAllPo=zhiYaRenAllPoList.get(0);
			return zhiYaRenAllPo;
		}
	}
	

	
}
