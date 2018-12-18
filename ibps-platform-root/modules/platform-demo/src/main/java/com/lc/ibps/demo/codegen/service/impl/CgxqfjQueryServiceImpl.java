package com.lc.ibps.demo.codegen.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.base.core.util.BeanUtils;

import com.lc.ibps.demo.codegen.repository.CgxqfjRepository;
import com.lc.ibps.demo.codegen.service.CgxqfjQueryService;
import com.lc.ibps.demo.codegen.persistence.entity.CgxqfjPo;

/**
 * 采购需求附件 查询服务的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-01 14:26:07
 *</pre>
 */
@Service("cgxqfjQueryService")
public class CgxqfjQueryServiceImpl implements CgxqfjQueryService{
	  
	@Resource
	private CgxqfjRepository cgxqfjRepository;

	@Override
	public String get(String id) {
		CgxqfjPo po = cgxqfjRepository.get(id);
		
		return BeanUtils.isEmpty(po) ? null : po.toString();
	}
	

	@Override
	public String query(QueryFilter filter) {
		List<CgxqfjPo> pos = cgxqfjRepository.query(filter);
		
		return BeanUtils.isEmpty(pos) ? null : pos.toString();
	}
	
	@Override
	public String findAll() {
		List<CgxqfjPo> pos = cgxqfjRepository.findAll();
		
		return BeanUtils.isEmpty(pos) ? null : pos.toString();
	}
	
}