package com.lc.ibps.loans.demo.repository.impl;


import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import javax.annotation.Resource;

import org.springframework.stereotype.Repository;

import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.base.framework.repository.AbstractRepository;
import com.lc.ibps.components.model.ParamParser;
import com.lc.ibps.components.model.persistence.dao.BusinessModelQueryDao;
import com.lc.ibps.components.model.repository.BusinessModelRepository;
import com.lc.ibps.loans.demo.domain.DemoFile;
import com.lc.ibps.loans.demo.domain.DemoLoan;
import com.lc.ibps.loans.demo.persistence.dao.DemoLoanQueryDao;
import com.lc.ibps.loans.demo.persistence.entity.DemoLoanPo;
import com.lc.ibps.loans.demo.repository.DemoLoanRepository;
import com.lc.ibps.loans.files.persistence.dao.FileDao;
import com.lc.ibps.loans.files.persistence.dao.FileQueryDao;
import com.lc.ibps.loans.files.persistence.entity.FileParam;
import com.lc.ibps.loans.files.persistence.entity.FilePo;
import com.lc.ibps.loans.files.repository.FileRepository;


import com.utils.Json2Po;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/**
 * t_demo_loan_ 仓库的实现类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：guanxinyu
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-07-24 17:00:46
 *</pre>
 */
@Repository
public class DemoLoanRepositoryImpl extends AbstractRepository<String, DemoLoanPo,DemoLoan> implements DemoLoanRepository{
	  
	@Resource
	private  DemoLoanQueryDao demoLoanQueryDao;

	@Resource
	private  BusinessModelQueryDao businessModelQueryDao;
	@Resource
	private FileRepository fileRepository;
	
	@Resource
	private BusinessModelRepository businessModelRepository;
	@Resource
	private FileDao fileDao;
	@Resource
	private FileQueryDao  fileQueryDao;
	
	public DemoLoan newInstance() {
		DemoLoanPo po = new DemoLoanPo();
		DemoLoan demoLoan = AppUtil.getBean(DemoLoan.class);
		demoLoan.setData(po);
		return demoLoan;
	}

	public DemoLoan newInstance(DemoLoanPo po) {
		DemoLoan demoLoan = AppUtil.getBean(DemoLoan.class);
		demoLoan.setData(po);
		return demoLoan;
	} 
	
	@Override
	protected IQueryDao<String, DemoLoanPo> getQueryDao() {
		return demoLoanQueryDao;
	}

	/**
	 * 
	 * 根据配置批量生成主方法
	 */
	public void updateByParam(String modelId, String id) {
		// 判断是否有作业存在，如果有，则清空
		Map arg = new HashMap<String,String>();
		arg.put("column", "loanId");
		arg.put("arg", id);
		List<FilePo> dfps = fileQueryDao.findByKey("getByMap", arg);
		String[] ids = new String[dfps.size()];
		int i = 0;
		for (FilePo dfp : dfps) {
			ids[i] = "";
			ids[i] = dfp.getId();
			++i;
		}
		fileDao.deleteByIds(ids);
		
		if (!modelId.equals("-1")) {// -1:请选择
			//1.通过模板id获取模板参数
			JSONArray paramJson = JSONArray.fromObject(businessModelQueryDao.get(modelId).getParam());
			//2.写param实现类中需要的参数Map，各种Dao层对象
			arg.put("businessModelRepository", businessModelRepository);
			arg.put("fileRepository", fileRepository);
			arg.put("loanId", id);
			//3.固定格式
			ParamParser.parse(paramJson,FileParam.class,arg);
		}

	}
	

	
}
