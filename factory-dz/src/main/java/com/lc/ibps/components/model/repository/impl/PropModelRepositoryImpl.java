package com.lc.ibps.components.model.repository.impl;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.components.model.domain.PropModel;
import com.lc.ibps.components.model.persistence.dao.PropModelQueryDao;
import com.lc.ibps.components.model.persistence.entity.PropModelPo;
import com.lc.ibps.components.model.repository.PropModelRepository;

/**
 * 属性模板 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-09-13 13:54:37
 *</pre>
 */
@Repository
public class PropModelRepositoryImpl extends AbstractRepository<String, PropModelPo,PropModel> implements PropModelRepository{
	  
	@Resource
	private  PropModelQueryDao propModelQueryDao;

	@Override
	public  PropModel newInstance() {
		PropModelPo po = new PropModelPo();
		PropModel modelProp = AppUtil.getBean( PropModel.class);
		modelProp.setData(po);
		return modelProp;
	}

	@Override
	public PropModel newInstance(PropModelPo po) {
		PropModel modelProp = AppUtil.getBean(PropModel.class);
		modelProp.setData(po);
		return modelProp;
	} 
	
	@Override
	protected IQueryDao<String,PropModelPo> getQueryDao() {
		return propModelQueryDao;
	}


	@Override
	public PropModelPo getByCols(Map arg, String mode) {
		return propModelQueryDao.getByKey("getByCols", makeParam(arg, mode));
	}

	@Override
	public List<PropModelPo> findByCols(Map arg, String mode) {
		return propModelQueryDao.findByKey("getByCols", makeParam(arg, mode));
	}
	private Map makeParam(Map arg, String mode){
		Map res = new HashMap<String,Map>();
		res.put("relationMap", arg);
		if(!StringUtils.isEmpty(mode))
			res.put("_mode", mode);
		return res;
	}

	@Override
	public Map<String, String> getPropModelByName(String propModelName) {
		List<PropModelPo> mpps = null;
		if(StringUtils.isEmpty(propModelName)){
			mpps = queryAll();
		}else{
			Map<String, String> arg = new HashMap<String,String>();
			arg.put("name_", propModelName);
			mpps = findByCols(arg,"like");
		}
		Map res = new HashMap<String,String>();
		for(PropModelPo mpp:mpps)
			res.put(mpp.getId(),mpp.getName());
		return res;
	}
}
