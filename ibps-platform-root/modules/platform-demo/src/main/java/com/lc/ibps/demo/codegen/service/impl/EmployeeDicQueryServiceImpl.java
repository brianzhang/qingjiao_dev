package com.lc.ibps.demo.codegen.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;
import org.springframework.stereotype.Service;

import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.common.cat.persistence.entity.TypePo;
import com.lc.ibps.common.cat.repository.TypeRepository;
import com.lc.ibps.demo.codegen.persistence.entity.EmployeeDicPo;
import com.lc.ibps.demo.codegen.repository.EmployeeDicRepository;
import com.lc.ibps.demo.codegen.service.EmployeeDicQueryService;

/**
 * t_employee_dic 查询服务的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-26 15:42:27
 *</pre>
 */
@Service("employeeDicQueryService")
public class EmployeeDicQueryServiceImpl implements EmployeeDicQueryService{
	  
	@Resource
	private EmployeeDicRepository employeeDicRepository;
	@Resource
	private TypeRepository typeRepository;

	@Override
	public String get(String id) {
		EmployeeDicPo po = employeeDicRepository.get(id);
		
		return BeanUtils.isEmpty(po) ? null : po.toString();
	}
	

	@Override
	public String query(QueryFilter filter) {
		List<EmployeeDicPo> pos = employeeDicRepository.query(filter);
		
		return BeanUtils.isEmpty(pos) ? null : pos.toString();
	}
	
	@Override
	public String findAll() {
		List<EmployeeDicPo> pos = employeeDicRepository.findAll();
		
		return BeanUtils.isEmpty(pos) ? null : pos.toString();
	}


	@Override
	public String dicTree(String userId , List<TypePo> types ) {

//		List<TypePo> types = typeRepository.getDicTree();
		List<EmployeeDicPo> pos = null;
		if(StringUtils.isNotEmpty(userId)){
			pos = employeeDicRepository.getByUserId(userId);
		}
		if(BeanUtils.isNotEmpty(types)&&BeanUtils.isNotEmpty(pos)){
			for(TypePo t:types){
				for(EmployeeDicPo e:pos){
					if(t.getId().equals(e.getDicId())){
						//t.setChecked(true);

					}
				}
			}
		}
		
		return BeanUtils.isEmpty(types) ? null : types.toString();
	}


	@Override
	public String getByUserId(String userId) {
		List<EmployeeDicPo> pos = employeeDicRepository.getByUserId(userId);
		return BeanUtils.isEmpty(pos) ? null : pos.toString();
	}
	
}