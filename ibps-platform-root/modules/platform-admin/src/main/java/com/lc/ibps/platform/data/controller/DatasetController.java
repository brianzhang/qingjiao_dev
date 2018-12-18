package com.lc.ibps.platform.data.controller;

import java.io.PrintWriter;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;
import org.springframework.jdbc.support.rowset.SqlRowSetMetaData;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.base.core.constants.StringPool;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.datasource.config.IDataSource;
import com.lc.ibps.base.datasource.config.entity.DataSourceVo;
import com.lc.ibps.base.datasource.constants.DbConstant;
import com.lc.ibps.base.datasource.dynamic.DataSourceUtil;
import com.lc.ibps.base.datasource.dynamic.DbContextHolder;
import com.lc.ibps.base.db.mybatis.Dialect;
import com.lc.ibps.base.db.table.base.BaseTableMeta;
import com.lc.ibps.base.db.table.factory.DatabaseFactory;
import com.lc.ibps.base.db.util.TableMetaUtil;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.framework.table.ITableMeta;
import com.lc.ibps.base.framework.table.IViewOperator;
import com.lc.ibps.base.framework.table.model.Column;
import com.lc.ibps.base.framework.table.model.Table;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.common.ds.persistence.entity.DataSourcePo;
import com.lc.ibps.common.ds.persistence.service.DataSourceSetService;
import com.lc.ibps.form.data.constants.DatasetType;
import com.lc.ibps.form.data.domain.Dataset;
import com.lc.ibps.form.data.helper.DatasetBuilder;
import com.lc.ibps.form.data.persistence.entity.DataTemplatePo;
import com.lc.ibps.form.data.persistence.entity.DatasetPo;
import com.lc.ibps.form.data.persistence.vo.DatasetTreeVo;
import com.lc.ibps.form.data.repository.DataTemplateRepository;
import com.lc.ibps.form.data.repository.DatasetRepository;
import com.lc.ibps.form.data.strategy.DatasetBuilderStrategyFactory;
import com.lc.ibps.form.data.strategy.IDatasetBuilderStrategy;
import com.lc.ibps.platform.codegen.builder.TableDataBuilder;

/**
 * 数据集 控制类
 *
 * <pre>
 *  
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：hugh zhuang
 * 邮箱地址：zhuangxh@bpmhome.cn
 * 创建时间：2017-09-30 14:52:21
 * </pre>
 */
@Controller
@RequestMapping("/platform/data/dataset/")
public class DatasetController extends GenericController {
	@Resource
	private DatasetRepository datasetRepository;
	@Resource
	private DataTemplateRepository dataTemplateRepository;
	@Resource
	private IDataSource idataSource;
	@Resource
	private DataSourceSetService dataSourceSetService;
	@Resource
	private JdbcTemplate jdbcTemplate;
	@Resource
	private ITableMeta tableMeta;

	/**
	 * 【数据集】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request, HttpServletResponse reponse) throws Exception {
		QueryFilter queryFilter = getQuerFilter(request);     
		PageList<DatasetPo> datasetList = (PageList<DatasetPo>) datasetRepository.query(queryFilter);
		return new PageJson(datasetList);
	}

	/**
	 * 编辑【数据集】信息页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("edit")
	public ModelAndView edit(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String preUrl = RequestUtil.getPrePage(request);
		String id = RequestUtil.getString(request, "id");
		DatasetPo dataset = null;
		if (StringUtil.isNotEmpty(id)) {
			dataset = datasetRepository.get(id);
		}

		
		// 获取全部数据源
		List<DataSourceVo> dataSourceList = idataSource.getAllDataSourceVo();
		return getAutoView().addObject("dataset", dataset).addObject("dataSourceList", dataSourceList)
				.addObject("returnUrl", preUrl);
	}

	/**
	 * 【数据集】明细页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("get")
	public ModelAndView get(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String preUrl = RequestUtil.getPrePage(request);
		String id = RequestUtil.getString(request, "id");
		DatasetPo dataset = null;
		if (StringUtil.isNotEmpty(id)) {
			dataset = datasetRepository.get(id);
		}
		return getAutoView().addObject("dataset", dataset).addObject("returnUrl", preUrl);
	}

	/**
	 * 获取表列表
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("tableOrViewList")
	@ResponseBody
	public List<Map<String, String>> tableOrViewList(HttpServletRequest request, HttpServletResponse reponse)
			throws Exception {
		String external = RequestUtil.getString(request, "external", StringPool.N);
		String dsAlias = RequestUtil.getString(request, "dsAlias", "");
		String from = RequestUtil.getString(request, "from", "");
		String type = RequestUtil.getString(request, "type", DatasetType.TABLE.key());
		boolean isTable = DatasetType.TABLE.key().equals(type);
		Map<String, String> map = new HashMap<String, String>();
		List<Map<String, String>> rs = null;

		// 获取数据库类型
		String dbType = AppUtil.getProperty(DbConstant.PROPERTY_DBTYPE);
		
		if (StringPool.Y.equals(external)) {
			if (StringUtil.isEmpty(dsAlias)) {
				logger.error("校验失败，数据源为空！");
				return rs;
			}

			DataSourcePo dsPo = dataSourceSetService.getByAlias(dsAlias);
			if (BeanUtils.isEmpty(dsPo)) {
				logger.error("校验失败，数据源【" + dsAlias + "】不存在！");
				return rs;
			}
			dbType = dsPo.getDbType();
			DbContextHolder.setDataSource(dsAlias, dbType);
		}

		if (isTable) {
			
			ITableMeta meta = tableMeta;
			if (StringUtil.isNotEmpty(dsAlias)) {
				meta = TableMetaUtil.getTableMetaByDsAlias(dsAlias);
			}
			map = meta.getTablesByName(from);
			DbContextHolder.clearDataSource();
			
		} else {
			IViewOperator dbView = getIViewOperatorAfterSetDT(dbType);
			List<String> views = dbView.getViews(from);
			for (String view : views) {
				map.put(view, view);
			}
		}
		DbContextHolder.clearDataSource();

		rs = TableDataBuilder.buildTable(map);
		return rs;
	}

	/**
	 * 获取一个BaseTableMeta，已经设置好方言和jdbcTemplate
	 * 
	 * @param dbType
	 * @return BaseTableMeta
	 * @exception @since
	 *                1.0.0
	 */
	private BaseTableMeta getBaseTableMetaAfterSetDT(String dbType) {
		BaseTableMeta baseTableMeta = null;
		try {
			baseTableMeta = DatabaseFactory.getTableMetaByDbType(dbType);

			Dialect dialect = DatabaseFactory.getDialect(dbType);
			// 配置文件中的对象
			baseTableMeta.setJdbcTemplate(jdbcTemplate);

			baseTableMeta.setDialect(dialect);
		} catch (Exception e) {
		}
		return baseTableMeta;
	}

	/**
	 * 获取一个IViewOperator，已经设置好方言和jdbcTemplate
	 * 
	 * @param dbType
	 * @return IViewOperator
	 * @exception @since
	 *                1.0.0
	 */
	private IViewOperator getIViewOperatorAfterSetDT(String dbType) {
		IViewOperator iViewOperator = null;
		try {
			iViewOperator = DatabaseFactory.getViewOperator(dbType);

			Dialect dialect = DatabaseFactory.getDialect(dbType);
			// 配置文件中的对象
			iViewOperator.setJdbcTemplate(jdbcTemplate);

			iViewOperator.setDialect(dialect);
		} catch (Exception e) {
		}

		return iViewOperator;
	}

	/**
	 * 
	 * 构建树
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("buildTree")
	@ResponseBody
	public List<DatasetTreeVo> buildTree(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String datasetKey = RequestUtil.getString(request, "datasetKey");
		DatasetPo po = datasetRepository.getByKey(datasetKey);
		IDatasetBuilderStrategy datasetBuilderStrategy = DatasetBuilderStrategyFactory.get(po.getType());
		datasetBuilderStrategy.setDatasetPo(po);
		return datasetBuilderStrategy.getTree();
	}

	/**
	 * 保存【数据集】信息
	 *
	 * @param request
	 * @param response
	 * @param dataset
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request, HttpServletResponse response, DatasetPo datasetPo) throws Exception {
		ResultMessage message = null;
		try {
			datasetRepository.isAliasExist(datasetPo.getId(), datasetPo.getKey());
			// 构造领域对象和保存数据
			Dataset dataset = datasetRepository.newInstance(datasetPo);
			dataset.save();
			message = new ResultMessage(ResultMessage.SUCCESS, "保存数据集成功");
		} catch (Exception e) {
			message = new ResultMessage(ResultMessage.FAIL, "对数据集操作失败，" + e.getMessage());
			logger.error("对数据集操作失败，" + e.getMessage(), e);
		}
		writeResultMessage(response.getWriter(), message);
	}

	/**
	 * 批量删除【数据集】记录
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("remove")
	public void remove(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ResultMessage message = null;
		try {
			// 获得待删除的id
			String[] ids = RequestUtil.getStringAryByStr(request, "id");
			// 构造领域对象和保存数据
			Dataset dataset = datasetRepository.newInstance();
			dataset.deleteByIds(ids);
			message = new ResultMessage(ResultMessage.SUCCESS, "删除数据集成功");
		} catch (Exception e) {
			message = new ResultMessage(ResultMessage.FAIL, "删除数据集失败，" + e.getMessage());
			logger.error("删除数据集失败，" + e.getMessage(), e);
		}
		writeResultMessage(response.getWriter(), message);
	}

	/**
	 * sql语句校验
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("validate")
	public void validate(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ResultMessage message = null;
		String msg = "";

		try {
			String external = RequestUtil.getString(request, "external", StringPool.N);
			String dsAlias = RequestUtil.getString(request, "dsAlias", "");
			String sql = RequestUtil.getString(request, "sql", "").trim();
			String params = RequestUtil.getString(request, "params", "[]");

			if (StringUtil.isEmpty(sql)) {
				msg = "校验失败，SQL语句为空！";
				logger.error(msg);
				message = new ResultMessage(ResultMessage.FAIL, msg);
				writeResultMessage(response.getWriter(), message);
				return;
			}

			if (!sql.toLowerCase().startsWith("select")) {
				msg = "校验失败，SQL不是查询语句！";
				logger.error(msg);
				message = new ResultMessage(ResultMessage.FAIL, msg);
				writeResultMessage(response.getWriter(), message);
				return;
			}

			if (StringPool.Y.equals(external)) {
				if (StringUtil.isEmpty(dsAlias)) {
					msg = "校验失败，数据源为空！";
					logger.error(msg);
					message = new ResultMessage(ResultMessage.FAIL, msg);
					writeResultMessage(response.getWriter(), message);
					return;
				}

				DataSourcePo dsPo = dataSourceSetService.getByAlias(dsAlias);
				if (BeanUtils.isEmpty(dsPo)) {
					msg = "校验失败，数据源【" + dsAlias + "】不存在！";
					logger.error(msg);
					message = new ResultMessage(ResultMessage.FAIL, msg);
					writeResultMessage(response.getWriter(), message);
					return;
				}
				jdbcTemplate = TableMetaUtil.getTempalteByDsAlias(dsAlias);
			}

			// 参数替换
			sql = DatasetBuilder.buildSql(sql, params);
			// SQL校验
			jdbcTemplate.queryForList(sql);
			jdbcTemplate = TableMetaUtil.getTempalteByDsAlias(DataSourceUtil.getDefaultDsAlias());
			
			message = new ResultMessage(ResultMessage.SUCCESS, "校验成功");
		} catch (Exception e) {
			msg = "校验失败，" + e.getMessage();
			message = new ResultMessage(ResultMessage.FAIL, msg);
			logger.error(msg, e);
		}
		writeResultMessage(response.getWriter(), message);
	}

	/**
	 * 获取字段列表
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("columnList")
	@ResponseBody
	public List<Map<String, String>> columnList(HttpServletRequest request, HttpServletResponse reponse)
			throws Exception {
		String columnName = RequestUtil.getString(request, "columnName", "");
		String from = RequestUtil.getString(request, "from", "");
		String type = RequestUtil.getString(request, "type", DatasetType.TABLE.key());
		String external = RequestUtil.getString(request, "external", StringPool.N);
		String dsAlias = RequestUtil.getString(request, "dsAlias", "");
		String sql = RequestUtil.getString(request, "sql", "").trim();
		String params = RequestUtil.getString(request, "params", "[]");

		return queryColumnList(new DatasetPo(type, external, dsAlias, from, sql, params), columnName);
	}

	/**
	 * 
	 * 获取字段
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("getColumnList")
	@ResponseBody
	public Map<String, Object> getColumnList(HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		Map<String,Object> map =  new HashMap<String,Object>();
		
		String datasetKey = RequestUtil.getString(request, "datasetKey");
		String templateKey = RequestUtil.getString(request, "templateKey");
		String queryName = RequestUtil.getString(request, "queryName");
		if(StringUtil.isEmpty(datasetKey) && StringUtil.isNotEmpty(templateKey) ){
			 DataTemplatePo  dataTemplate =  dataTemplateRepository.getByKey(templateKey);
			 if(BeanUtils.isNotEmpty(dataTemplate))
				 datasetKey =  dataTemplate.getDatasetKey();
		}
		
		if(StringUtil.isEmpty(datasetKey)){
			 map.put("result", false);
			 map.put("msg", "请选择！");
			return map;
		}
		try {
			DatasetPo po = datasetRepository.getByKey(datasetKey);
			 map.put("result", true);
			map.put("data",  this.queryColumnList(po, queryName));
		} catch (Exception e) {
		}
		
		return  map;
	}

	public List<Map<String, String>> queryColumnList(DatasetPo po, String queryName) {

		String msg = "";
		String dbType = AppUtil.getProperty(DbConstant.PROPERTY_DBTYPE);
		String dsAlias = po.getDsAlias();
		String type = po.getType();
		String from = po.getFrom();
		String sql = po.getSql();
		String params = po.getParams();

		List<Map<String, String>> rs = null;
		try {
			if (StringPool.Y.equals(po.getExternal())) {
				if (StringUtil.isEmpty(dsAlias)) {
					msg = "获取字段列表失败，数据源为空！";
					logger.error(msg);
					return rs;
				}

				DataSourcePo dsPo = dataSourceSetService.getByAlias(dsAlias);
				if (BeanUtils.isEmpty(dsPo)) {
					msg = "获取字段列表失败，数据源【" + dsAlias + "】不存在！";
					logger.error(msg);
					return rs;
				}
				jdbcTemplate = TableMetaUtil.getTempalteByDsAlias(dsAlias);
			}

			if ("table".equals(type)) {
				BaseTableMeta meta = getBaseTableMetaAfterSetDT(dbType);// 获取表操作元
				List<Column> fieldList = meta.getColumnsByTableName(from);
				rs = TableDataBuilder.buildColumnByComment(fieldList, queryName);
			} else if ("view".equals(type)) {
				IViewOperator dbView = getIViewOperatorAfterSetDT(dbType);
				Table table = dbView.getModelByViewName(from);
				List<Column> fieldList = table.getColumnList();
				rs = TableDataBuilder.buildColumnByComment(fieldList, queryName);
			} else {
				// 参数替换
				sql = DatasetBuilder.buildSql(sql, params);
				// SQL校验
				SqlRowSet rowSet = jdbcTemplate.queryForRowSet(sql);
				SqlRowSetMetaData rowSetMetaData = rowSet.getMetaData();
				rs = TableDataBuilder.buildColumnByComment(rowSetMetaData,queryName);
			}
			jdbcTemplate = TableMetaUtil.getTempalteByDsAlias(DataSourceUtil.getDefaultDsAlias());
		} catch (Exception e) {
			msg = "获取字段列表失败，" + e.getMessage();
			logger.error(msg, e);
		}
		return rs;
	}

	
	/**
	 * 新增的功能
	 * 设置分类
	 *liuyikuan
	 *940075558@qq.com
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("setCategory")
	public void setCategory(HttpServletRequest request, HttpServletResponse response) throws Exception {
		PrintWriter writer = response.getWriter();
		String typeId = RequestUtil.getString(request, "typeId");
		String[] defIds = RequestUtil.getStringAryByStr(request, "defIds");
		// 判断分类是否为空
		if (StringUtil.isEmpty(typeId)) {
			writeResultMessage(writer, new ResultMessage(ResultMessage.FAIL, "请选择需要设置的分类!"));
			return;
		}
		// 判断是否选择业务对象
		if (BeanUtils.isEmpty(defIds)) {
			writeResultMessage(writer, new ResultMessage(ResultMessage.FAIL, "请选择需要设置的业务对象"));
			return;
		}

		List<String> defIdList = Arrays.asList(defIds);
		try {
			Dataset dataSetDomain = datasetRepository.newInstance();
			dataSetDomain.updateDefineType(typeId, defIdList);
			writeResultMessage(writer, new ResultMessage(ResultMessage.SUCCESS, "设置分类成功!"));
		} catch (Exception ex) {
			writeResultMessage(writer, new ResultMessage(ResultMessage.FAIL, "设置分类失败，" + ex.getMessage()));
			logger.error("设置分类失败，" + ex.getMessage(), ex);
		}
	}
}
