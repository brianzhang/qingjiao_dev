package com.lc.ibps.repair.repair.repository.impl;


import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.db.model.DefaultQueryFilter;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.common.cat.persistence.entity.DictionaryPo;
import com.lc.ibps.common.cat.repository.DictionaryRepository;
import com.lc.ibps.repair.repair.domain.Bxd;
import com.lc.ibps.repair.repair.repository.BxdRepository;
import com.lc.ibps.repair.repair.persistence.dao.BxdQueryDao;
import com.lc.ibps.repair.repair.persistence.entity.BxdPo;

/**
 * t_bxd 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-24 10:25:05
 *</pre>
 */
@Repository
public class BxdRepositoryImpl extends AbstractRepository<String, BxdPo,Bxd> implements BxdRepository{
	  
	@Resource
	private  BxdQueryDao bxdQueryDao;
	
	@Resource
	private DictionaryRepository dictionaryRepository;

	public Bxd newInstance() {
		BxdPo po = new BxdPo();
		Bxd bxd = AppUtil.getBean(Bxd.class);
		bxd.setData(po);
		return bxd;
	}

	public Bxd newInstance(BxdPo po) {
		Bxd bxd = AppUtil.getBean(Bxd.class);
		bxd.setData(po);
		return bxd;
	} 
	
	@Override
	protected IQueryDao<String, BxdPo> getQueryDao() {
		return bxdQueryDao;
	}

	@Override
	public List<BxdPo> getByGdzt(String gdzt) {
		return bxdQueryDao.getByGdzt(gdzt);
	}

	@Override
	public String getItemValue(String item) {
		DefaultQueryFilter paramQueryFilter = new DefaultQueryFilter();
		List<DictionaryPo> dicList;
		String bxqyResult = "";
		String[] bxqyStr = item.split("_");
		int len = bxqyStr.length;
		
		for(int i=0;i<len;i++) {
			String bxqyName ="";
			String searchStr = "";
			for(int j=0;j<=i;j++) {
				searchStr += bxqyStr[j];
				if(j+1<=i) {
					searchStr += "_";
				}
			}
			String whereSql = " KEY_="+"\'"+searchStr+"\'";
			paramQueryFilter.addParamsFilter("whereSql", whereSql);
			dicList = dictionaryRepository.query(paramQueryFilter);
			if(dicList.size() !=0) {
				bxqyName = dicList.get(0).getName();
			}
			bxqyResult += bxqyName;
			if(i+1<len) {
				bxqyResult += "-";
			}
			System.out.println(bxqyStr[i]);
			
		}
		return bxqyResult;
	}

	@Override
	public List<BxdPo> getBySubBxdIdAndGdlx(String subid, String gdlx) {
		// TODO Auto-generated method stub
		
		return bxdQueryDao.getBySubBxdIdAndGdlx(subid, gdlx);
	}
	

	
}
