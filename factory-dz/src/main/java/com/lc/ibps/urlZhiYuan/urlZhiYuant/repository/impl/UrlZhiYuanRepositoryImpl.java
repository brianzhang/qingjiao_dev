package com.lc.ibps.urlZhiYuan.urlZhiYuant.repository.impl;


import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.org.party.persistence.entity.PartyEmployeePo;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.domain.UrlZhiYuan;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.persistence.dao.UrlZhiYuanDao;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.persistence.dao.UrlZhiYuanQueryDao;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.persistence.entity.UrlZhiYuanPo;
import com.lc.ibps.urlZhiYuan.urlZhiYuant.repository.UrlZhiYuanRepository;

/**
 * t_zyurl 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-04 23:52:06
 *</pre>
 */
@Repository
public class UrlZhiYuanRepositoryImpl extends AbstractRepository<String, UrlZhiYuanPo,UrlZhiYuan> implements UrlZhiYuanRepository{
	  
	@Resource
	private  UrlZhiYuanQueryDao urlZhiYuanQueryDao;
	@Resource
	private UrlZhiYuanDao urlZhiYuanDao;

	@Override
	public UrlZhiYuan newInstance() {
		UrlZhiYuanPo po = new UrlZhiYuanPo();
		UrlZhiYuan urlZhiYuan = AppUtil.getBean(UrlZhiYuan.class);
		urlZhiYuan.setData(po);
		return urlZhiYuan;
	}

	@Override
	public UrlZhiYuan newInstance(UrlZhiYuanPo po) {
		UrlZhiYuan urlZhiYuan = AppUtil.getBean(UrlZhiYuan.class);
		urlZhiYuan.setData(po);
		return urlZhiYuan;
	} 
	
	@Override
	protected IQueryDao<String, UrlZhiYuanPo> getQueryDao() {
		return urlZhiYuanQueryDao;
	}

	@Override
	public UrlZhiYuanPo getByCol(String string, String arg) {
		return urlZhiYuanQueryDao.getByKey("getBy_"+string, arg);
	}
	@Override
	public List<UrlZhiYuanPo> findByCol(String string, String arg) {
		return urlZhiYuanQueryDao.findByKey("getBy_"+string, arg);
	}

	@Override
	public List<UrlZhiYuanPo> getByFinaltdId(String tdid) {
		return urlZhiYuanQueryDao.getByFinaltdId(tdid);
	}

	@Override
	public UrlZhiYuanPo getByBizKey(String bizkey) {
		// TODO Auto-generated method stub
		List<UrlZhiYuanPo> polist  =urlZhiYuanQueryDao.getByBizKey(bizkey);
		if(polist.size()==0){
			return null;
		}else{
			UrlZhiYuanPo po =polist.get(0);
			return po;
		}
	}

	@Override
	public List<UrlZhiYuanPo> getByFinalTchId(String tchId) {
		
		return urlZhiYuanQueryDao.getByFinalTchId(tchId);
	}
	
	@Override
	public void compoundLabel(String oldId, String newId, String orgId) {
		urlZhiYuanDao.compoundLabel(oldId, newId, orgId);
	}
//	@Override
//	public List<String> findAllMentor(String finalteacherId){
//		return urlZhiYuanQueryDao.findAllMentor(finalteacherId);
//	}
//
//	public List<Person> getOwnPeople(String groupId, String roleId) {
//		return urlZhiYuanQueryDao.getOwnPeople(groupId, roleId);
//	}

	@Override
	public List<UrlZhiYuanPo> getBySql(String whereSql) {
		return urlZhiYuanQueryDao.getBySql(whereSql);
	}

	@Override
	public int getNumByLabel(String labelId) {
		return urlZhiYuanQueryDao.getNumByLabel(labelId);
	}
	@Override
	public List<UrlZhiYuanPo> getByStuNum(String stunum) {
		return urlZhiYuanQueryDao.getByStuNum(stunum);
	}
	@Override
	public UrlZhiYuanPo getby_xh(String xh) {
		// TODO Auto-generated method stub
		return urlZhiYuanQueryDao.getby_xh(xh);
	}
	@Override
	public UrlZhiYuanPo getByxh(String xh) {
		return urlZhiYuanQueryDao.getByxh(xh);
	}

	@Override
	public List<String> getAllJudgeTchId(String orgId) {
		return urlZhiYuanQueryDao.getAllJudgeTchId(orgId);
	}

}
	
	

	

