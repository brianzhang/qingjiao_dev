package com.lc.ibps.bishes.oldFile.persistence.dao;

import com.lc.ibps.base.framework.persistence.dao.IQueryDao;
import com.lc.ibps.bishes.oldFile.persistence.entity.OldFilePo;

import java.util.List;

/**
 * t_oldfile 查询Dao接口
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-11-29 16:49:23
 *</pre>
 */
public interface OldFileQueryDao extends IQueryDao<String, OldFilePo> {
    List<OldFilePo> getBySql(String whereSql);
}
