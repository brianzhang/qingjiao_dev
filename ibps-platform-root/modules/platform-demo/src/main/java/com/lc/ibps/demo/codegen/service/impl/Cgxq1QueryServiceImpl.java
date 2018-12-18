package com.lc.ibps.demo.codegen.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.string.StringUtil;

import com.lc.ibps.demo.codegen.repository.Cgxq1Repository;
import com.lc.ibps.demo.codegen.service.Cgxq1QueryService;
import com.lc.ibps.demo.codegen.persistence.entity.Cgxq1Po;
import com.lc.ibps.demo.codegen.persistence.entity.Cgqd1Po;

/**
 * t_cgxq 查询服务的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-09 08:59:23
 *</pre>
 */
@Service("cgxq1QueryService")
public class Cgxq1QueryServiceImpl implements Cgxq1QueryService{
	  
	@Resource
	private Cgxq1Repository cgxq1Repository;

	@Override
	public String get(String id) {
		Cgxq1Po po = cgxq1Repository.get(id);
		
		return BeanUtils.isEmpty(po) ? null : po.toString();
	}
	
	@Override
	public String loadCascade(String id) {
		Cgxq1Po po = cgxq1Repository.loadCascade(id);
		
		return BeanUtils.isEmpty(po) ? null : po.toString();
	}

	@Override
	public String query(QueryFilter filter) {
		List<Cgxq1Po> pos = cgxq1Repository.query(filter);
		
		return BeanUtils.isEmpty(pos) ? null : pos.toString();
	}
	
	@Override
	public String findAll() {
		List<Cgxq1Po> pos = cgxq1Repository.findAll();
		
		return BeanUtils.isEmpty(pos) ? null : pos.toString();
	}
	
}