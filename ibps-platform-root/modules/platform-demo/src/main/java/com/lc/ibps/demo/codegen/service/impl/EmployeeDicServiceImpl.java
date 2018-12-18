package com.lc.ibps.demo.codegen.service.impl;


import java.util.List;

import javax.annotation.Resource;

import org.springframework.transaction.annotation.Transactional;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.demo.codegen.domain.EmployeeDic;
import com.lc.ibps.demo.codegen.persistence.entity.EmployeeDicPo;
import com.lc.ibps.demo.codegen.repository.EmployeeDicRepository;
import com.lc.ibps.demo.codegen.service.EmployeeDicService;

/**
 * t_employee_dic 服务的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-26 15:42:27
 *</pre>
 */
@Transactional
public class EmployeeDicServiceImpl implements EmployeeDicService{
	  
	@Resource
	private EmployeeDicRepository employeeDicRepository;


	@Override
	public void save(String jsonData,String userIds) {
		List<EmployeeDicPo> pos = EmployeeDicPo.fromJsonArrayString(jsonData);
		if(BeanUtils.isNotEmpty(pos)){
			List<EmployeeDicPo> ps = employeeDicRepository.getByUserId(userIds);
			String[] ids = new String[ps.size()];
			int idx=0;
			for(EmployeeDicPo p:ps){
				ids[idx]=p.getId();
				idx++;
			}
			this.deleteByIds(ids);
			for(EmployeeDicPo po:pos){
				po.setUserId(userIds);
				EmployeeDic employeeDic2 = employeeDicRepository.newInstance(po);
				employeeDic2.create();
			}
		}
	}
	
	@Override
	public void deleteByIds(String[] ids) {
		EmployeeDic employeeDic = employeeDicRepository.newInstance();
		employeeDic.deleteByIds(ids);
	}


	/*######################### private ###########################*/

	/**
	 * 获取领域对象
	 *
	 * @param cmd
	 * @return 
	 */
	private EmployeeDic getDomain(String busData, String key){
		if(BeanUtils.isEmpty(busData)){
			return null;
		}
		
		EmployeeDicPo po = EmployeeDicPo.fromJsonString(busData);
		if(StringUtil.isNotEmpty(key)){
			po.setId(key);
		}
		EmployeeDic employeeDic = employeeDicRepository.newInstance(po);
		
		return employeeDic;
	}
	
}