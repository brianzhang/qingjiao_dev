package com.lc.ibps.demo.codegen.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.transaction.annotation.Transactional;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.demo.codegen.persistence.dao.Cgxq1Dao;
import com.lc.ibps.demo.codegen.persistence.dao.Cgxq1QueryDao;
import com.lc.ibps.demo.codegen.persistence.entity.Cgxq1Po;
import com.lc.ibps.demo.codegen.persistence.dao.Cgqd1Dao;
import com.lc.ibps.demo.codegen.persistence.entity.Cgqd1Po;

import com.lc.ibps.demo.codegen.repository.Cgxq1Repository;
import javax.annotation.Resource;

/**
 * t_cgxq 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-09 08:59:23
 *</pre>
 */
@SuppressWarnings("serial")
@Transactional
@Scope("prototype")
public class Cgxq1 extends AbstractDomain<String, Cgxq1Po>{
	 
	private Cgxq1Dao cgxq1Dao = null;
	private Cgxq1QueryDao cgxq1QueryDao = null;

	private Cgqd1Dao cgqd1Dao = null;

	protected void init(){
		cgxq1Dao = AppUtil.getBean(Cgxq1Dao.class);
		cgxq1QueryDao = AppUtil.getBean(Cgxq1QueryDao.class);
		cgqd1Dao = AppUtil.getBean(Cgqd1Dao.class);
		this.setDao(cgxq1Dao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(cgxq1QueryDao.get(getId())));
	}
	
	/**
	 * 主从表一并保存 
	 * void
	 * @exception 
	 * @since  1.0.0
	 */
	public void saveCascade(){
		save();
		if(getData().isDelBeforeSave()){
			cgqd1Dao.deleteByMainId(getData().getId());
		}
		
		if(BeanUtils.isNotEmpty(getData().getCgqd1PoList())){
			for(Cgqd1Po cgqd1Po:getData().getCgqd1PoList()){
				//设置外键
				cgqd1Po.setParentId(getData().getId());
				cgqd1Dao.create(cgqd1Po);
			}
		}
	}	
	
	/**
	 * 主从表一并删除 
	 * void
	 * @exception 
	 * @since  1.0.0
	 */
	public void deleteByIdsCascade(String[] ids){
		for(String id : ids){
			Cgxq1Po po = cgxq1QueryDao.get(id);
			if(BeanUtils.isNotEmpty(po) && BeanUtils.isNotEmpty(po.getId())){
				cgqd1Dao.deleteByMainId(po.getId());
			}	
		}
		deleteByIds(ids);
	}
	
}