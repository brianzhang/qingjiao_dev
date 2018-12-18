package com.lc.ibps.platform.form.controller;

import java.util.ArrayList;
import java.util.HashMap;
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
import com.lc.ibps.api.base.query.QueryOP;
import com.lc.ibps.api.form.entity.TreeDisplayField;
import com.lc.ibps.base.core.engine.script.GroovyScriptEngine;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.AppUtil;
import com.lc.ibps.base.core.util.json.JsonUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.datasource.config.IDataSource;
import com.lc.ibps.base.datasource.config.entity.DataSourceVo;
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
import com.lc.ibps.form.form.domain.CustomDialog;
import com.lc.ibps.form.form.persistence.entity.CustomDialogPo;
import com.lc.ibps.form.form.repository.CustomDialogRepository;

/**
 * 自定义对话框 控制类
 *
 * <pre>
 *  
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：hugh zhuang
 * 邮箱地址：3378340995@qq.com
 * 创建时间：2016-11-07 10:33:15
 * </pre>
 */
@Controller
@RequestMapping("/platform/form/customDialog/")
public class CustomDialogController extends GenericController {
	@Resource
	private CustomDialogRepository customDialogRepository;

	@Resource
	private IDataSource idataSource;
	@Resource
	private JdbcTemplate jdbcTemplate;

	/**
	 * 【自定义对话框】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request, HttpServletResponse reponse) throws Exception {
		QueryFilter queryFilter = getQuerFilter(request);
		PageList<CustomDialogPo> customDialogList = (PageList<CustomDialogPo>) customDialogRepository
				.query(queryFilter);
		return new PageJson(customDialogList);
	}

	/**
	 * 编辑【自定义对话框】信息页面
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
		CustomDialogPo customDialog = null;
		if (StringUtil.isNotEmpty(id)) {
			customDialog = customDialogRepository.get(id);
		}
		// 获取当前数据源
		List<DataSourceVo> dsList = idataSource.getAllDataSourceVo();
		return getAutoView().addObject("customDialog", customDialog).addObject("dsList", dsList).addObject("returnUrl",
				preUrl);
	}

	/**
	 * 【自定义对话框】明细页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("get")
	public ModelAndView get(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String preUrl = RequestUtil.getPrePage(request);
		return getAutoView().addObject("returnUrl", preUrl);
	}

	/**
	 * 帮助
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("help")
	public ModelAndView help(HttpServletRequest request, HttpServletResponse response) throws Exception {
		return getAutoView();
	}

	/**
	 * 保存【自定义对话框】信息
	 *
	 * @param request
	 * @param response
	 * @param customDialog
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request, HttpServletResponse response, CustomDialogPo po) throws Exception {
		ResultMessage message = null;
		try {
			boolean isExists = customDialogRepository.isExists(po.getAlias(), po.getId());
			if (isExists)
				message = new ResultMessage(ResultMessage.ERROR, "别名【" + po.getAlias() + "】已经存在");
			else {
				CustomDialog customDialog = customDialogRepository.newInstance(po);
				customDialog.save();
				message = new ResultMessage(ResultMessage.SUCCESS, "保存自定义对话框成功");
			}
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			message = new ResultMessage(ResultMessage.FAIL, "对自定义对话框操作失败");
		}
		writeResultMessage(response.getWriter(), message);
	}

	/**
	 * 批量删除【自定义对话框】记录
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
			CustomDialog customDialog = customDialogRepository.newInstance();
			customDialog.deleteByIds(ids);
			message = new ResultMessage(ResultMessage.SUCCESS, "删除自定义对话框成功");
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			message = new ResultMessage(ResultMessage.FAIL, "删除自定义对话框失败");
		}
		writeResultMessage(response.getWriter(), message);
	}

	@SuppressWarnings({ "rawtypes", "unchecked" })
	@RequestMapping("getByDsObjectName")
	@ResponseBody
	public Map getByDsObjectName(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String dsalias = RequestUtil.getString(request, "dsName");
		String objectName = RequestUtil.getString(request, "objectName");
		String tableName = RequestUtil.getString(request, "tableName");
		int istable = RequestUtil.getInt(request, "istable");
		Map map = new HashMap();
		try {
			// 获取数据库类型
			String dbType = idataSource.getDbType(dsalias);
			DbContextHolder.setDataSource(dsalias, dbType);
			if (istable == 1) {
				BaseTableMeta meta = getBaseTableMetaAfterSetDT(dbType);// 获取表操作元
				Map<String, String> tableMap = meta.getTablesByName(objectName);
				if (StringUtil.isNotEmpty(tableName)) {
					String value = tableMap.get(tableName);
					tableMap.clear();
					if (StringUtil.isNotEmpty(value))
						tableMap.put(tableName, value);
				}
				map.put("tables", tableMap);
			} else {
				IViewOperator dbView = getIViewOperatorAfterSetDT(dbType);
				List<String> views = dbView.getViews(objectName);
				map.put("views", views);
			}
			DbContextHolder.clearDataSource();
			map.put("success", "true");
		} catch (Exception ex) {
			logger.info("getByDsObjectName:" + ex.getMessage());
			ex.printStackTrace();
			map.put("success", "false");
		}
		return map;
	}

	/**
	 * 设置字段对话框。
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("setting")
	public ModelAndView setting(HttpServletRequest request, HttpServletResponse response) throws Exception {
		// String id = RequestUtil.getString(request, "id");
		String dsalias = RequestUtil.getString(request, "dsName");// 数据源别名
		String objectName = RequestUtil.getString(request, "objectName");// 设置列对象数据库表或视图
		int istable = RequestUtil.getInt(request, "istable", 1);// 是否是视图或表1=表，0=视图
		int style = RequestUtil.getInt(request, "style", 0);// 显示样式0=列表,1=树形
		Table tableModel = null;
		String dbType = idataSource.getDbType(dsalias);
		DbContextHolder.setDataSource(dsalias, dbType);
		// 表
		if (istable == 1) {
			BaseTableMeta meta = getBaseTableMetaAfterSetDT(dbType);
			tableModel = meta.getTableByName(objectName);
		} else {// 视图处理
			IViewOperator dbView = getIViewOperatorAfterSetDT(dbType);
			tableModel = dbView.getModelByViewName(objectName);
		}
		DbContextHolder.clearDataSource();
		return this.getAutoView().addObject("tableModel", tableModel).addObject("style", style);
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
	 * 选择自定义对话框
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("getAllDialogs")
	@ResponseBody
	public List<CustomDialogPo> getAllDialogs(HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		List<CustomDialogPo> list = customDialogRepository.findAll();
		return list;
	}

	/**
	 * 
	 * 根据别名获取自定义对话框信息
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("getByAlias")
	@ResponseBody
	public CustomDialogPo getByAlias(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String alias = RequestUtil.getString(request, "alias");
		CustomDialogPo customDialog = null;
		if (StringUtil.isNotEmpty(alias)) {
			customDialog = customDialogRepository.getByAlias(alias);
		}
		return customDialog;
	}

	/**
	 * 自定义对话框明细页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("show")
	public ModelAndView show(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String id = RequestUtil.getString(request, "id");
		CustomDialogPo po = customDialogRepository.get(id);

		return getAutoView().addObject("customDialog", po);
	}
	
	/**
	 * 
	 * 获取所有对话框信息
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("getSelectorData")
	@ResponseBody
	public Map<String, Object> getSelectorData(HttpServletRequest request, HttpServletResponse response) throws Exception {
		Map<String,Object> map =  new HashMap<String,Object>();
		QueryFilter queryFilter = this.getQuerFilter(request,null);
		String queryName = RequestUtil.getString(request, "queryName");
		if(StringUtil.isNotEmpty(queryName))
			queryFilter.addFilter("name_" ,"%"+queryName+"%",QueryOP.LIKE);
		List<CustomDialogPo> data = customDialogRepository.query(queryFilter);
		try {
			 map.put("result", true);
			map.put("data",  data);
		} catch (Exception e) {
			logger.error(e.getMessage(),e);
			 map.put("result", true);
			map.put("msg", e.getMessage());
		}
		
		return  map;
	}

	/**
	 * 
	 * 获取所有对话框信息
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("getAll")
	@ResponseBody
	public PageJson getAll(HttpServletRequest request, HttpServletResponse response) throws Exception {
		List<CustomDialogPo> customDialogs = customDialogRepository.findAll();
		return new PageJson(customDialogs);
	}

	/**
	 * 
	 * 根据主键id获取自定义对话框信息
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("getById")
	@ResponseBody
	public CustomDialogPo getById(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String id = RequestUtil.getString(request, "id");
		CustomDialogPo customDialog = null;
		if (StringUtil.isNotEmpty(id)) {
			customDialog = customDialogRepository.get(id);
		}
		return customDialog;
	}

	/**
	 * 根据自定义别名获取对应的表数据
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("rawtypes")
	@RequestMapping("doQuery")
	@ResponseBody
	public PageJson doQuery(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String id = RequestUtil.getString(request, "id");
		CustomDialogPo customDialog = customDialogRepository.get(id);
		if (customDialog == null) {
			return null;
		}
		// TODO 传入参数
		// String params = RequestUtil.getString(request, "params");
		// System.out.println(params);
		// 根据数据库查询数据库类型。如果不是本地数据源那么要找出他的数据类型
		String dsalias = customDialog.getDsalias();
		String dbType = idataSource.getDbType(dsalias);// 数据源类型，MYSQL,ORCALE,SQLSERVER
		QueryFilter queryFilter = getQuerFilter(request);
		// queryFilter.addFilter(name, objVal, queryOP);

		DbContextHolder.setDataSource(customDialog.getDsalias(), dbType);// 转换这次进程的数据源
		PageList pageList = (PageList) customDialogRepository.getData(customDialog, dbType, queryFilter);
		PageJson json = new PageJson(pageList);
		return json;
	}

	/**
	 * 取得树形数据。
	 * 
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("getTreeData")
	@ResponseBody
	public List<CustomDialogPo> getTreeData(HttpServletRequest request) throws Exception {
		List<CustomDialogPo> list = new ArrayList<CustomDialogPo>();

		// 先检查id，后检查alias
		String id = RequestUtil.getString(request, "id");
		CustomDialogPo customDialog = customDialogRepository.get(id);
		if (customDialog == null) {
			return null;
		}

		// 根据数据库查询数据库类型。如果不是本地数据源那么要找出他的数据类型
		String alias = customDialog.getDsalias();
		String dbType = idataSource.getDbType(alias);// 数据源类型，MYSQL,ORCALE,SQLSERVER
		// 改变当前数据源
		DbContextHolder.setDataSource(alias, dbType);// 转换这次进程的数据源

		QueryFilter queryFilter = getQuerFilter(request);
		String isRoot = RequestUtil.getString(request, "isRoot");
		String idKey = RequestUtil.getString(request, "idKey");
		String pid = getPid(customDialog.getDisplayfield(), isRoot, idKey);

		list = customDialogRepository.geTreetData(customDialog, queryFilter, pid, dbType);
		return list;
	}

	private String getPid(String displayfield, String isRoot, String idKey) {
		String pid = "";
		if ("1".equals(isRoot)) {
			TreeDisplayField treeDisplayField = (TreeDisplayField) JsonUtil.getDTO(displayfield,
					TreeDisplayField.class);
			String pvalue = treeDisplayField.getPvalue();

			boolean isScript = treeDisplayField.isScript();
			if (isScript) {// 是脚本，开始解释这段脚本
				GroovyScriptEngine groovyScriptEngine = (GroovyScriptEngine) AppUtil.getBean(GroovyScriptEngine.class);
				pid = groovyScriptEngine.executeObject(pvalue, null).toString();
			} else {
				pid = pvalue;
			}
		} else {
			pid = idKey;
		}
		return pid;
	}

	@RequestMapping("dialogObj")
	@ResponseBody
	public Map<String, Object> dialogObj(HttpServletRequest request) throws Exception {
		String alias = RequestUtil.getString(request, "alias");
		Map<String, Object> map = new HashMap<String, Object>();
		CustomDialogPo customDialog = customDialogRepository.getByAlias(alias);
		if (customDialog != null) {
			map.put("customDialog", customDialog);
			map.put("success", 1);
		} else {
			map.put("success", 0);
		}
		return map;
	}
}
