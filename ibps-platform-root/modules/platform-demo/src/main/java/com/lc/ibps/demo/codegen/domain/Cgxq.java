package com.lc.ibps.demo.codegen.domain;

import org.springframework.context.annotation.Scope;
import org.springframework.transaction.annotation.Transactional;

import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.domain.AbstractDomain;
import com.lc.ibps.demo.codegen.persistence.dao.CgxqDao;
import com.lc.ibps.demo.codegen.persistence.dao.CgxqQueryDao;
import com.lc.ibps.demo.codegen.persistence.entity.CgxqPo;
import com.lc.ibps.demo.codegen.persistence.dao.CgqdDao;
import com.lc.ibps.demo.codegen.persistence.entity.CgqdPo;
import com.lc.ibps.demo.codegen.persistence.dao.CgxqfjDao;
import com.lc.ibps.demo.codegen.persistence.entity.CgxqfjPo;

import com.lc.ibps.demo.codegen.repository.CgxqRepository;
import javax.annotation.Resource;

/**
 * 采购需求 领域对象实体
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-01 14:26:03
 *</pre>
 */
@SuppressWarnings("serial")
@Transactional
@Scope("prototype")
public class Cgxq extends AbstractDomain<String, CgxqPo>{
	 
	private CgxqDao cgxqDao = null;
	private CgxqQueryDao cgxqQueryDao = null;

	private CgqdDao cgqdDao = null;
	private CgxqfjDao cgxqfjDao = null;

	protected void init(){
		cgxqDao = AppUtil.getBean(CgxqDao.class);
		cgxqQueryDao = AppUtil.getBean(CgxqQueryDao.class);
		cgqdDao = AppUtil.getBean(CgqdDao.class);
		cgxqfjDao = AppUtil.getBean(CgxqfjDao.class);
		this.setDao(cgxqDao);
	}
	
	@Override
	protected void onSave() {
		if(BeanUtils.isNotEmpty(getId()))
			setNewFlag(BeanUtils.isEmpty(cgxqQueryDao.get(getId())));
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
			cgqdDao.deleteByMainId(getData().getId());
			cgxqfjDao.deleteByMainId(getData().getId());
		}
		
		if(BeanUtils.isNotEmpty(getData().getCgqdPoList())){
			for(CgqdPo cgqdPo:getData().getCgqdPoList()){
				//设置外键
				cgqdPo.setParentId(getData().getId());
				cgqdDao.create(cgqdPo);
			}
		}
		if(BeanUtils.isNotEmpty(getData().getCgxqfjPoList())){
			for(CgxqfjPo cgxqfjPo:getData().getCgxqfjPoList()){
				//设置外键
				cgxqfjPo.setParentId(getData().getId());
				cgxqfjDao.create(cgxqfjPo);
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
			CgxqPo po = cgxqQueryDao.get(id);
			if(BeanUtils.isNotEmpty(po) && BeanUtils.isNotEmpty(po.getId())){
				cgqdDao.deleteByMainId(po.getId());
			}	
			if(BeanUtils.isNotEmpty(po) && BeanUtils.isNotEmpty(po.getId())){
				cgxqfjDao.deleteByMainId(po.getId());
			}	
		}
		deleteByIds(ids);
	}
	
}