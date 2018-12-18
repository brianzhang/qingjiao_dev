package com.lc.ibps.demo.codegen.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.transaction.annotation.Transactional;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.core.util.json.JsonUtil;

import com.lc.ibps.demo.codegen.domain.Cgqd;
import com.lc.ibps.demo.codegen.repository.CgqdRepository;
import com.lc.ibps.demo.codegen.service.CgqdService;
import com.lc.ibps.demo.codegen.persistence.entity.CgqdPo;

import net.sf.json.JSONObject;
import java.util.Map;

/**
 * t_purchasedetaillist 服务的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-01 14:26:06
 *</pre>
 */
@Transactional
public class CgqdServiceImpl implements CgqdService{
	  
	@Resource
	private CgqdRepository cgqdRepository;


	@Override
	public void save(String jsonData) {
		Cgqd cgqd = getDomain(jsonData, null);
		if(BeanUtils.isEmpty(cgqd)){
			return;
		}
		cgqd.save();
	}
	
	@Override
	public void deleteByIds(String[] ids) {
		Cgqd cgqd = cgqdRepository.newInstance();
		cgqd.deleteByIds(ids);
	}


	/*######################### private ###########################*/

	/**
	 * 获取领域对象
	 *
	 * @param cmd
	 * @return 
	 */
	private Cgqd getDomain(String busData, String key){
		if(BeanUtils.isEmpty(busData)){
			return null;
		}
		
		CgqdPo po = CgqdPo.fromJsonString(busData);
		if(StringUtil.isNotEmpty(key)){
			po.setId(key);
		}
		Cgqd cgqd = cgqdRepository.newInstance(po);
		
		return cgqd;
	}
	
}