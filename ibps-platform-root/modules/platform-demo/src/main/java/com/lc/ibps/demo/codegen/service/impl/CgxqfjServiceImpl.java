package com.lc.ibps.demo.codegen.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.transaction.annotation.Transactional;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.core.util.json.JsonUtil;

import com.lc.ibps.demo.codegen.domain.Cgxqfj;
import com.lc.ibps.demo.codegen.repository.CgxqfjRepository;
import com.lc.ibps.demo.codegen.service.CgxqfjService;
import com.lc.ibps.demo.codegen.persistence.entity.CgxqfjPo;

import net.sf.json.JSONObject;
import java.util.Map;

/**
 * 采购需求附件 服务的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-01 14:26:07
 *</pre>
 */
@Transactional
public class CgxqfjServiceImpl implements CgxqfjService{
	  
	@Resource
	private CgxqfjRepository cgxqfjRepository;


	@Override
	public void save(String jsonData) {
		Cgxqfj cgxqfj = getDomain(jsonData, null);
		if(BeanUtils.isEmpty(cgxqfj)){
			return;
		}
		cgxqfj.save();
	}
	
	@Override
	public void deleteByIds(String[] ids) {
		Cgxqfj cgxqfj = cgxqfjRepository.newInstance();
		cgxqfj.deleteByIds(ids);
	}


	/*######################### private ###########################*/

	/**
	 * 获取领域对象
	 *
	 * @param cmd
	 * @return 
	 */
	private Cgxqfj getDomain(String busData, String key){
		if(BeanUtils.isEmpty(busData)){
			return null;
		}
		
		CgxqfjPo po = CgxqfjPo.fromJsonString(busData);
		if(StringUtil.isNotEmpty(key)){
			po.setId(key);
		}
		Cgxqfj cgxqfj = cgxqfjRepository.newInstance(po);
		
		return cgxqfj;
	}
	
}