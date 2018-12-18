package com.lc.ibps.demo.codegen.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.base.core.util.BeanUtils;

import com.lc.ibps.demo.codegen.repository.Cgqd1Repository;
import com.lc.ibps.demo.codegen.service.Cgqd1QueryService;
import com.lc.ibps.demo.codegen.persistence.entity.Cgqd1Po;

/**
 * 采购需求表示：1，采购清单：2；1对多关系 查询服务的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-09 08:59:25
 *</pre>
 */
@Service("cgqd1QueryService")
public class Cgqd1QueryServiceImpl implements Cgqd1QueryService{
	  
	@Resource
	private Cgqd1Repository cgqd1Repository;

	@Override
	public String get(String id) {
		Cgqd1Po po = cgqd1Repository.get(id);
		
		return BeanUtils.isEmpty(po) ? null : po.toString();
	}
	

	@Override
	public String query(QueryFilter filter) {
		List<Cgqd1Po> pos = cgqd1Repository.query(filter);
		
		return BeanUtils.isEmpty(pos) ? null : pos.toString();
	}
	
	@Override
	public String findAll() {
		List<Cgqd1Po> pos = cgqd1Repository.findAll();
		
		return BeanUtils.isEmpty(pos) ? null : pos.toString();
	}
	
}