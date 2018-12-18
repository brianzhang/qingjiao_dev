package com.lc.ibps.bishes.oldFile.repository;

import com.lc.ibps.base.framework.repository.IRepository;
import com.lc.ibps.bishes.oldFile.domain.OldFile;
import com.lc.ibps.bishes.oldFile.persistence.entity.OldFilePo;

import java.util.List;

/**
 * t_oldfile 仓库接口
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-11-29 16:49:23
 *</pre>
 */
public interface OldFileRepository extends IRepository<String, OldFilePo,OldFile>{
    List<OldFilePo> getBySql(String whereSql);
}
