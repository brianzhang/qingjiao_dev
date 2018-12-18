package com.lc.ibps.demo.codegen.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.transaction.annotation.Transactional;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.core.util.json.JsonUtil;

import com.lc.ibps.demo.codegen.domain.Cgqd1;
import com.lc.ibps.demo.codegen.repository.Cgqd1Repository;
import com.lc.ibps.demo.codegen.service.Cgqd1Service;
import com.lc.ibps.demo.codegen.persistence.entity.Cgqd1Po;

import net.sf.json.JSONObject;
import java.util.Map;

/**
 * 采购需求表示：1，采购清单：2；1对多关系 服务的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-09 08:59:25
 *</pre>
 */
@Transactional
public class Cgqd1ServiceImpl implements Cgqd1Service{
	  
	@Resource
	private Cgqd1Repository cgqd1Repository;


	@Override
	public void save(String jsonData) {
		Cgqd1 cgqd1 = getDomain(jsonData, null);
		if(BeanUtils.isEmpty(cgqd1)){
			return;
		}
		cgqd1.save();
	}
	
	@Override
	public void deleteByIds(String[] ids) {
		Cgqd1 cgqd1 = cgqd1Repository.newInstance();
		cgqd1.deleteByIds(ids);
	}


	/*######################### private ###########################*/

	/**
	 * 获取领域对象
	 *
	 * @param cmd
	 * @return 
	 */
	private Cgqd1 getDomain(String busData, String key){
		if(BeanUtils.isEmpty(busData)){
			return null;
		}
		
		Cgqd1Po po = Cgqd1Po.fromJsonString(busData);
		if(StringUtil.isNotEmpty(key)){
			po.setId(key);
		}
		Cgqd1 cgqd1 = cgqd1Repository.newInstance(po);
		
		return cgqd1;
	}
	
}