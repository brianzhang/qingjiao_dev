package com.lc.ibps.demo.codegen.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.transaction.annotation.Transactional;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.core.util.json.JsonUtil;

import com.lc.ibps.demo.codegen.domain.Cgxq;
import com.lc.ibps.demo.codegen.repository.CgxqRepository;
import com.lc.ibps.demo.codegen.service.CgxqService;
import com.lc.ibps.demo.codegen.persistence.entity.CgxqPo;
import com.lc.ibps.demo.codegen.persistence.entity.CgqdPo;
import com.lc.ibps.demo.codegen.persistence.entity.CgxqfjPo;

import net.sf.json.JSONObject;
import java.util.Map;

/**
 * 采购需求 服务的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-01 14:26:04
 *</pre>
 */
@Transactional
public class CgxqServiceImpl implements CgxqService{
	  
	@Resource
	private CgxqRepository cgxqRepository;


	@Override
	public void save(String jsonData) {
		Cgxq cgxq = getDomain(jsonData, null);
		if(BeanUtils.isEmpty(cgxq)){
			return;
		}
		cgxq.save();
	}
	
	@Override
	public void deleteByIds(String[] ids) {
		Cgxq cgxq = cgxqRepository.newInstance();
		cgxq.deleteByIds(ids);
	}

	@Override
	public void saveCascade(String jsonData) {
		Cgxq cgxq = getDomain(jsonData, null);
		if(BeanUtils.isEmpty(cgxq)){
			return;
		}
		cgxq.saveCascade();
	}
	
	@Override
	public void deleteByIdsCascade(String[] ids){
		Cgxq cgxq = cgxqRepository.newInstance();
		cgxq.deleteByIdsCascade(ids);
	}

	/*######################### private ###########################*/

	/**
	 * 获取领域对象
	 *
	 * @param cmd
	 * @return 
	 */
	private Cgxq getDomain(String busData, String key){
		if(BeanUtils.isEmpty(busData)){
			return null;
		}
		
		CgxqPo po = CgxqPo.fromJsonString(busData);
		if(StringUtil.isNotEmpty(key)){
			po.setId(key);
		}
		Cgxq cgxq = cgxqRepository.newInstance(po);
		
		return cgxq;
	}
	
}