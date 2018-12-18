package com.lc.ibps.demo.codegen.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.string.StringUtil;

import com.lc.ibps.demo.codegen.repository.CgxqRepository;
import com.lc.ibps.demo.codegen.service.CgxqQueryService;
import com.lc.ibps.demo.codegen.persistence.entity.CgxqPo;
import com.lc.ibps.demo.codegen.persistence.entity.CgqdPo;
import com.lc.ibps.demo.codegen.persistence.entity.CgxqfjPo;

/**
 * 采购需求 查询服务的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-01 14:26:04
 *</pre>
 */
@Service("cgxqQueryService")
public class CgxqQueryServiceImpl implements CgxqQueryService{
	  
	@Resource
	private CgxqRepository cgxqRepository;

	@Override
	public String get(String id) {
		CgxqPo po = cgxqRepository.get(id);
		
		return BeanUtils.isEmpty(po) ? null : po.toString();
	}
	
	@Override
	public String loadCascade(String id) {
		CgxqPo po = cgxqRepository.loadCascade(id);
		
		return BeanUtils.isEmpty(po) ? null : po.toString();
	}

	@Override
	public String query(QueryFilter filter) {
		List<CgxqPo> pos = cgxqRepository.query(filter);
		
		return BeanUtils.isEmpty(pos) ? null : pos.toString();
	}
	
	@Override
	public String findAll() {
		List<CgxqPo> pos = cgxqRepository.findAll();
		
		return BeanUtils.isEmpty(pos) ? null : pos.toString();
	}
	
}