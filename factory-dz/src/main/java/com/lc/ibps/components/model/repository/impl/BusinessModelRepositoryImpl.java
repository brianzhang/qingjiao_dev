package com.lc.ibps.components.model.repository.impl;


import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.components.model.domain.BusinessModel;
import com.lc.ibps.components.model.persistence.dao.BusinessModelQueryDao;
import com.lc.ibps.components.model.persistence.dao.PropModelQueryDao;
import com.lc.ibps.components.model.persistence.entity.BusinessModelPo;
import com.lc.ibps.components.model.persistence.entity.PropModelParam;
import com.lc.ibps.components.model.persistence.entity.PropModelPo;
import com.lc.ibps.components.model.repository.BusinessModelRepository;
import com.utils.Json2Po;

import net.sf.json.JSONArray;

/**
 * 业务模板 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：guanxinyu
 * 邮箱地址：0@qq.com
 * 创建时间：2017-09-13 13:54:21
 *</pre>
 */
@Repository
public class BusinessModelRepositoryImpl extends AbstractRepository<String, BusinessModelPo,BusinessModel> implements BusinessModelRepository{
	  
	@Resource
	private  BusinessModelQueryDao businessModelQueryDao;
	@Resource
	private  PropModelQueryDao propModelQueryDao;
	@Override
	public BusinessModel newInstance() {
		BusinessModelPo po = new BusinessModelPo();
		BusinessModel businessModel = AppUtil.getBean(BusinessModel.class);
		businessModel.setData(po);
		return businessModel;
	}

	@Override
	public BusinessModel newInstance(BusinessModelPo po) {
		BusinessModel businessModel = AppUtil.getBean(BusinessModel.class);
		businessModel.setData(po);
		return businessModel;
	} 
	
	@Override
	protected IQueryDao<String, BusinessModelPo> getQueryDao() {
		return businessModelQueryDao;
	}
	@Override
	public List parsePropModelId(String propModelId) {
		PropModelPo mpp = propModelQueryDao.get(propModelId);
		JSONArray ja = JSONArray.fromObject(mpp.getParam());
		return Json2Po.parse(ja, PropModelParam.class);
	}
}

