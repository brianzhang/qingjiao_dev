package com.lc.ibps.platform.form.controller;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.base.core.constants.StringPool;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.datasource.config.IDataSource;
import com.lc.ibps.base.datasource.config.entity.DataSourceVo;
import com.lc.ibps.base.datasource.dynamic.DataSourceUtil;
import com.lc.ibps.base.datasource.dynamic.DbContextHolder;
import com.lc.ibps.base.db.mybatis.Dialect;
import com.lc.ibps.base.db.table.base.BaseTableMeta;
import com.lc.ibps.base.db.table.factory.DatabaseFactory;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.framework.table.IViewOperator;
import com.lc.ibps.base.framework.table.model.Table;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.form.form.domain.CustomQuery;
import com.lc.ibps.form.form.persistence.entity.CustomQueryPo;
import com.lc.ibps.form.form.repository.CustomQueryRepository;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/**
 * 自定义查询 控制类
 *
 * <pre>
 *  
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：hugh zhuang
 * 邮箱地址：3378340995@qq.com
 * 创建时间：2016-11-07 10:34:27
 * </pre>
 */
@Controller
@RequestMapping("/platform/form/customQuery/")
public class CustomQueryController extends GenericController {
	@Resource
	private CustomQueryRepository customQueryRepository;
	@Resource
	private IDataSource idataSource;
	@Resource
	private JdbcTemplate jdbcTemplate;

	/**
	 * 【自定义查询】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request, HttpServletResponse reponse) throws Exception {
		QueryFilter queryFilter = getQuerFilter(request);
		PageList<CustomQueryPo> customQueryList = (PageList<CustomQueryPo>) customQueryRepository.query(queryFilter);
		return new PageJson(customQueryList);
	}

	/**
	 * 编辑【自定义查询】信息页面
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
		CustomQueryPo customQuery = null;
		if (StringUtil.isNotEmpty(id)) {
			customQuery = customQueryRepository.get(id);
		}
		// 获取全部数据源
		List<DataSourceVo> dsList = idataSource.getAllDataSourceVo();
		return getAutoView().addObject("customQuery", customQuery)
				.addObject("dsList", dsList)
				.addObject("returnUrl",preUrl)
				.addObject("dataSource_default",DataSourceUtil.getDefaultDsAlias());
	}

	/**
	 * 【自定义查询】明细页面
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
		CustomQueryPo customQuery = null;
		if (StringUtil.isNotEmpty(id)) {
			customQuery = customQueryRepository.get(id);
		}
		return getAutoView().addObject("customQuery", customQuery).addObject("returnUrl", preUrl);
	}

	/**
	 * 保存【自定义查询】信息
	 *
	 * @param request
	 * @param response
	 * @param customQuery
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request, HttpServletResponse response, CustomQueryPo po) throws Exception {
		ResultMessage message = null;
		try {
			boolean isExists = customQueryRepository.isExists(po.getAlias(), po.getId());
			if (isExists)
				message = new ResultMessage(ResultMessage.ERROR, "别名【" + po.getAlias() + "】已经存在");
			else {
				// 构造领域对象和保存数据
				CustomQuery customQuery = customQueryRepository.newInstance(po);
				customQuery.save();
				message = new ResultMessage(ResultMessage.SUCCESS, "保存自定义查询成功");
			}
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			message = new ResultMessage(ResultMessage.FAIL, "对自定义查询操作失败", e.getMessage());
		}
		writeResultMessage(response.getWriter(), message);
	}

	/**
	 * 批量删除【自定义查询】记录
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
			CustomQuery customQuery = customQueryRepository.newInstance();
			customQuery.deleteByIds(ids);
			message = new ResultMessage(ResultMessage.SUCCESS, "删除自定义查询成功");
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			message = new ResultMessage(ResultMessage.FAIL, "删除自定义查询失败");
		}
		writeResultMessage(response.getWriter(), message);
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
			/**
			 * 配置文件中的对象
			 * 
			 * @Resource JdbcTemplate jdbcTemplate;
			 */
			baseTableMeta.setJdbcTemplate(jdbcTemplate);

			baseTableMeta.setDialect(dialect);
		} catch (Exception e) {
		}
		return baseTableMeta;
	}

	/**
	 * 获取一个IViewOperator（视图），已经设置好方言和jdbcTemplate
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
			/**
			 * 配置文件中的对象
			 * 
			 * @Resource JdbcTemplate jdbcTemplate;
			 */
			iViewOperator.setJdbcTemplate(jdbcTemplate);
			iViewOperator.setDialect(dialect);
		} catch (Exception e) {
		}
		return iViewOperator;
	}

	/**
	 * 设置字段
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("setting")
	public ModelAndView setting(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String id = RequestUtil.getString(request, "id");
		String dsName = "";// 名称
		String objectName = "";// 表名
		String istable = StringPool.Y;// 是否是视图或表1=表，0=视图
		ModelAndView mv = this.getAutoView();
		if ("0".equals(id)) {
			dsName = RequestUtil.getString(request, "dsName");
			istable = RequestUtil.getString(request, "istable");
			objectName = RequestUtil.getString(request, "objectName");
		} else {
			CustomQueryPo customQuery = customQueryRepository.get(id);
			istable = customQuery.getIsTable();
			dsName = customQuery.getDsalias();
			objectName = customQuery.getObjName();
			mv.addObject("customQuery", customQuery);
		}

		Table tableModel = null;
		String dbType = idataSource.getDbType(dsName);
		DbContextHolder.setDataSource(dsName, dbType);
		// 表
		if (StringPool.Y.equals(istable)) {
			BaseTableMeta meta = getBaseTableMetaAfterSetDT(dbType);
			tableModel = meta.getTableByName(objectName);
		}
		// 视图处理
		else {
			IViewOperator dbView = getIViewOperatorAfterSetDT(dbType);
			tableModel = dbView.getModelByViewName(objectName);
		}
		mv.addObject("tableModel", tableModel);
		return mv;
	}

	/**
	 * 
	 * 查询自定义查询信息
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("doQuery")
	@ResponseBody
	public PageJson doQuery(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String id = RequestUtil.getString(request, "id");
		String alias = RequestUtil.getString(request, "alias");
		CustomQueryPo customQuery = null;
		if (StringUtil.isNotEmpty(id)) {
			customQuery = customQueryRepository.get(id);
		} else if (StringUtil.isNotEmpty(alias)) {
			customQuery = customQueryRepository.getByAlias(alias);
		}

		if (customQuery == null) {
			return null;
		}
		String dsalias = customQuery.getDsalias();
		// 获取数据库类型
		String dbType = idataSource.getDbType(dsalias);

		QueryFilter queryFilter = getQuerFilter(request);
		DbContextHolder.setDataSource(customQuery.getDsalias(), dbType);// 转换这次进程的数据源
		List<?> pageList = customQueryRepository.getData(customQuery, queryFilter, dbType);
		return new PageJson(pageList);
	}

	/**
	 * 通过别名获取自定义查询信息
	 * 
	 * @param request
	 * @param reponse
	 * @return
	 */
	@RequestMapping("getByAlias")
	@ResponseBody
	public CustomQueryPo getByAlias(HttpServletRequest request, HttpServletResponse reponse) {
		String alias = RequestUtil.getString(request, "alias");
		return customQueryRepository.getByAlias(alias);
	}

	/**
	 * 根据请求的别名获取对应的表信息
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("getTable")
	@ResponseBody
	public JSONObject getTable(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String id = RequestUtil.getString(request, "id");
		String dsalias = "";
		String objectName = "";
		String isTable = "";
		JSONObject result = new JSONObject();
		if (StringUtil.isEmpty(id)) {
			dsalias = RequestUtil.getString(request, "dsalias");
			isTable = RequestUtil.getString(request, "isTable");
			objectName = RequestUtil.getString(request, "objName");
		}
		// 获取数据库类型
		String dbType = idataSource.getDbType(dsalias);
		DbContextHolder.setDataSource(dsalias, dbType);// 转换这次进程的数据源
		Table table = null;
		// 表
		if (isTable.equals("1")) {
			BaseTableMeta baseTableMeta = getBaseTableMetaAfterSetDT(dbType);// 获取表操作元
			table = baseTableMeta.getTableByName(objectName);
		} else {
			IViewOperator iViewOperator = getIViewOperatorAfterSetDT(dbType);
			table = iViewOperator.getModelByViewName(objectName);
		}
		DbContextHolder.clearDataSource();
		result.accumulate("table", table);
		return result;
	}

	/**
	 * 根据表信息获取某个表字段信息
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("getByDsObjectName")
	@ResponseBody
	public JSONArray getByDsObjectName(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String dsalias = RequestUtil.getString(request, "dsalias");// 数据源别名
		String isTable = RequestUtil.getString(request, "isTable");
		String objName = RequestUtil.getString(request, "objName");
		// 获取数据库类型
		String dbType = idataSource.getDbType(dsalias);
		DbContextHolder.setDataSource(dsalias, dbType);// 转换这次进程的数据源
		if ("1".equals(isTable)) {
			BaseTableMeta baseTableMeta = getBaseTableMetaAfterSetDT(dbType);// 获取表操作元

			Map<String, String> map = baseTableMeta.getTablesByName(objName);

			JSONArray jsonArray = new JSONArray();
			for (String key : map.keySet()) {
				JSONObject jsonObject = new JSONObject();
				jsonObject.accumulate("name", key.toString());
				jsonObject.accumulate("comment", map.get(key).toString());
				jsonArray.add(jsonObject);
			}
			DbContextHolder.clearDataSource();
			return jsonArray;
		} else {
			IViewOperator iViewOperator = getIViewOperatorAfterSetDT(dbType);

			List<String> viewNames = iViewOperator.getViews(objName);
			JSONArray jsonArray = new JSONArray();
			for (String name : viewNames) {
				JSONObject jsonObject = new JSONObject();
				jsonObject.accumulate("name", name);
				jsonObject.accumulate("comment", name);
				jsonArray.add(jsonObject);
			}
			DbContextHolder.clearDataSource();
			return jsonArray;
		}
	}

	/**
	 * 按照id返回对象
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 *             BpmDefExtProperties
	 */
	@RequestMapping("getById")
	@ResponseBody
	public CustomQueryPo getById(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String id = RequestUtil.getString(request, "id");
		CustomQueryPo customQuery = null;
		if (StringUtil.isNotEmpty(id)) {
			customQuery = customQueryRepository.get(id);
		}
		return customQuery;
	}

	@RequestMapping("getAll")
	@ResponseBody
	public PageJson getAll() {
		List<CustomQueryPo> list = customQueryRepository.findAll();
		return new PageJson(list);
	}
}
