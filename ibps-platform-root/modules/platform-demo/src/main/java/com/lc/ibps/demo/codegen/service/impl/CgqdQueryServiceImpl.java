package com.lc.ibps.demo.codegen.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.base.core.util.BeanUtils;

import com.lc.ibps.demo.codegen.repository.CgqdRepository;
import com.lc.ibps.demo.codegen.service.CgqdQueryService;
import com.lc.ibps.demo.codegen.persistence.entity.CgqdPo;

/**
 * t_purchasedetaillist 查询服务的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-01 14:26:06
 *</pre>
 */
@Service("cgqdQueryService")
public class CgqdQueryServiceImpl implements CgqdQueryService{
	  
	@Resource
	private CgqdRepository cgqdRepository;

	@Override
	public String get(String id) {
		CgqdPo po = cgqdRepository.get(id);
		
		return BeanUtils.isEmpty(po) ? null : po.toString();
	}
	

	@Override
	public String query(QueryFilter filter) {
		List<CgqdPo> pos = cgqdRepository.query(filter);
		
		return BeanUtils.isEmpty(pos) ? null : pos.toString();
	}
	
	@Override
	public String findAll() {
		List<CgqdPo> pos = cgqdRepository.findAll();
		
		return BeanUtils.isEmpty(pos) ? null : pos.toString();
	}
	
}