package com.lc.ibps.demo.codegen.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.transaction.annotation.Transactional;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.core.util.json.JsonUtil;

import com.lc.ibps.demo.codegen.domain.Cgxq1;
import com.lc.ibps.demo.codegen.repository.Cgxq1Repository;
import com.lc.ibps.demo.codegen.service.Cgxq1Service;
import com.lc.ibps.demo.codegen.persistence.entity.Cgxq1Po;
import com.lc.ibps.demo.codegen.persistence.entity.Cgqd1Po;

import net.sf.json.JSONObject;
import java.util.Map;

/**
 * t_cgxq 服务的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-09 08:59:24
 *</pre>
 */
@Transactional
public class Cgxq1ServiceImpl implements Cgxq1Service{
	  
	@Resource
	private Cgxq1Repository cgxq1Repository;


	@Override
	public void save(String jsonData) {
		Cgxq1 cgxq1 = getDomain(jsonData, null);
		if(BeanUtils.isEmpty(cgxq1)){
			return;
		}
		cgxq1.save();
	}
	
	@Override
	public void deleteByIds(String[] ids) {
		Cgxq1 cgxq1 = cgxq1Repository.newInstance();
		cgxq1.deleteByIds(ids);
	}

	@Override
	public void saveCascade(String jsonData) {
		Cgxq1 cgxq1 = getDomain(jsonData, null);
		if(BeanUtils.isEmpty(cgxq1)){
			return;
		}
		cgxq1.saveCascade();
	}
	
	@Override
	public void deleteByIdsCascade(String[] ids){
		Cgxq1 cgxq1 = cgxq1Repository.newInstance();
		cgxq1.deleteByIdsCascade(ids);
	}

	/*######################### private ###########################*/

	/**
	 * 获取领域对象
	 *
	 * @param cmd
	 * @return 
	 */
	private Cgxq1 getDomain(String busData, String key){
		if(BeanUtils.isEmpty(busData)){
			return null;
		}
		
		Cgxq1Po po = Cgxq1Po.fromJsonString(busData);
		if(StringUtil.isNotEmpty(key)){
			po.setId(key);
		}
		Cgxq1 cgxq1 = cgxq1Repository.newInstance(po);
		
		return cgxq1;
	}
	
}