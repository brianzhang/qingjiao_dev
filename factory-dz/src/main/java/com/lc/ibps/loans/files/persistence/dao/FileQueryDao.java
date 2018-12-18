package com.lc.ibps.loans.files.persistence.dao;

import java.util.List;

import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.loans.files.persistence.entity.FilePo;

/**
 * t_file 查询Dao接口
 *
 * <pre>
 *  
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：litao
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-08-26 11:50:51
 * </pre>
 */
public interface FileQueryDao extends IQueryDao<String, FilePo> {

	List<FilePo> getByJdid(String jdid);
	
}
