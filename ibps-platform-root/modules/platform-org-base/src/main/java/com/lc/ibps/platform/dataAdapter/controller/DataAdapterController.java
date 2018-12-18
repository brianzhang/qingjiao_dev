package com.lc.ibps.platform.dataAdapter.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.json.JsonUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.datasource.dynamic.DbContextHolder;
import com.lc.ibps.base.db.table.base.BaseTableMeta;
import com.lc.ibps.base.db.util.TableMetaUtil;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.framework.table.ITableMeta;
import com.lc.ibps.base.framework.table.model.Column;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.common.dataadaptor.domain.DataAdapter;
import com.lc.ibps.common.dataadaptor.persistence.entity.DataAdapterDetailPo;
import com.lc.ibps.common.dataadaptor.persistence.entity.DataAdapterPo;
import com.lc.ibps.common.dataadaptor.repository.DataAdapterRepository;
import com.lc.ibps.common.ds.persistence.entity.DataSourcePo;
import com.lc.ibps.common.ds.persistence.service.DataSourceSetService;

import net.sf.json.JSONObject;

/**
 * 数据适配器明细表 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：simon cai
 * 邮箱地址：48847557@qq.com
 * 创建时间：2017-06-06 15:52:34
 *</pre>
 */
@Controller
@RequestMapping("/platform/dataAdapter/dataAdapter/")
public class DataAdapterController extends GenericController{
	@Resource
	private DataAdapterRepository dataAdapterRepository;
	@Resource
	private DataSourceSetService dataSourceSetService;
	@Resource
	private ITableMeta tableMeta;
	
	/**
	 * 【数据适配器明细表】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<DataAdapterPo> dataAdapterList=(PageList<DataAdapterPo>)dataAdapterRepository.query(queryFilter);
		return new PageJson(dataAdapterList);
	}
	
	/**
	 * 编辑【数据适配器明细表】信息页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("edit")
	public ModelAndView edit(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		String id=RequestUtil.getString(request, "id");
		DataAdapterPo dataAdapter=null;
		if(StringUtil.isNotEmpty(id)){
			dataAdapter=dataAdapterRepository.loadCascade(id);
		}
		return getAutoView().addObject("dataAdapter", dataAdapter).addObject("returnUrl", preUrl)
				.addObject("dbRes", dataSourceSetService.getAllAlias()).addObject("id", id);
	}
	
	/**
	 * 【数据适配器明细表】明细页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("get")
	public ModelAndView get(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		String id=RequestUtil.getString(request, "id");
		DataAdapterPo dataAdapter=null;
		if(StringUtil.isNotEmpty(id)){
			dataAdapter=dataAdapterRepository.loadCascade(id);
		}
		return getAutoView().addObject("dataAdapter", dataAdapter).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【数据适配器明细表】信息
	 *
	 * @param request
	 * @param response
	 * @param  dataAdapter
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			DataAdapterPo dataAdapterPo = getFromRequest(request);
			//构造领域对象和保存数据
			DataAdapter dataAdapter =dataAdapterRepository.newInstance(dataAdapterPo);
			dataAdapter.saveCascade();
			message=new ResultMessage(ResultMessage.SUCCESS, "保存数据适配器成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对数据适配器操作失败，"+e.getMessage());
			logger.error("对数据适配器操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private DataAdapterPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		List<DataAdapterDetailPo> dataAdapterDetailPoList = getDataAdapterDetailPoList(jsonObj);
		DataAdapterPo dataAdapterPo = getDataAdapterPo(jsonObj);
		dataAdapterPo.setDataAdapterDetailPoList(dataAdapterDetailPoList);

		return dataAdapterPo;
	}
	
	/** 
	 * 获取数据适配器明细表数据
	 *
	 * @param jsonObj
	 */
	private DataAdapterPo getDataAdapterPo(JSONObject jsonObj){
		DataAdapterPo dataAdapterPo = (DataAdapterPo) JsonUtil.getDTO(jsonObj.toString(), DataAdapterPo.class);
		return dataAdapterPo;
	}
	
	/** 
	 * 获取ibps_data_adapter_detail数据
	 *
	 * @param jsonObj
	 */
	@SuppressWarnings("unchecked")
	private List<DataAdapterDetailPo> getDataAdapterDetailPoList(JSONObject jsonObj){
		if(!jsonObj.containsKey("dataAdapterDetailPoList")){
			return null;
		}
		
		List<DataAdapterDetailPo> rs = JsonUtil.getDTOList(
													jsonObj.getJSONArray("dataAdapterDetailPoList").toString(), 
													DataAdapterDetailPo.class);
		jsonObj.discard("dataAdapterDetailPoList");
		return rs;
	}
	
	/**
	 *  批量删除【数据适配器明细表】记录
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("remove")
	public void remove(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		try {
			//获得待删除的id
			String[] ids=RequestUtil.getStringAryByStr(request, "id");
			//构造领域对象和保存数据
			DataAdapter dataAdapter =dataAdapterRepository.newInstance();
			dataAdapter.deleteByIdsCascade(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除数据适配器明细表成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除数据适配器明细表失败，" + e.getMessage());
			logger.error("删除数据适配器明细表失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/**
	 *  目标表读取数据
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("targetRead")
	@ResponseBody
	public Map<String,Object> targetRead(HttpServletRequest request,HttpServletResponse response) throws Exception{
		Map<String,Object> rs = new HashMap<String,Object>();
		rs.put("success", true);
		rs.put("msg", "目标表读取成功");
		try {
			String targetDbRes = RequestUtil.getString(request, "targetDbRes");
			String targetTable = RequestUtil.getString(request, "targetTable");
			List<Column> cols = getCols(targetDbRes,targetTable);
			if(BeanUtils.isNotEmpty(cols)){
				rs.put("cols", cols);
			}else{
				rs.put("success", false);
				rs.put("msg", "目标表读取失败");
			}
		} catch (Exception e) {
			rs.put("success", false);
			rs.put("msg", "目标表读取失败");
			logger.error("目标表读取失败，" + e.getMessage(),e);
		}
		return rs;
	}
	
	/**
	 *  来源表读取数据
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("sourceRead")
	@ResponseBody
	public Map<String,Object> sourceRead(HttpServletRequest request,HttpServletResponse response,DataSourcePo dataSource) throws Exception{
		Map<String,Object> rs = new HashMap<String,Object>();
		rs.put("success", true);
		rs.put("msg", "同步源表读取成功");
		try {
			String sourceDbRes = RequestUtil.getString(request, "sourceDbRes");
			String sourceTable = RequestUtil.getString(request, "sourceTable");
			List<Column> cols = getCols(sourceDbRes,sourceTable);
			if(BeanUtils.isNotEmpty(cols)){
				rs.put("cols", cols);
			}else{
				rs.put("success", false);
				rs.put("msg", "同步表读取失败");
			}
		} catch (Exception e) {
			rs.put("success", false);
			rs.put("msg", "同步源表读取失败");
			logger.error("同步源表读取失败，" + e.getMessage(),e);
		}
		return rs;
	}
	
	private List<Column> getCols(String dbRes,String table) throws Exception{
		ITableMeta meta = tableMeta;
		if (StringUtil.isNotEmpty(dbRes)) {
			meta = TableMetaUtil.getTableMetaByDsAlias(dbRes);
		}
		List<Column> cols = meta.getColumnsByTableName(table);
		DbContextHolder.clearDataSource();
		return cols;
	}
	
	/**
	 *  来源表读取数据
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("sync")
	@ResponseBody
	public Map<String,Object> sync(HttpServletRequest request,HttpServletResponse response,DataSourcePo dataSource) throws Exception{
		Map<String,Object> rs = new HashMap<String,Object>();
		rs.put("success", true);
		rs.put("msg", "同步数据成功");
		try {
			String id = RequestUtil.getString(request, "id");
			DataAdapterPo dataAdapterPo=null;
			if(StringUtil.isNotEmpty(id)){
				dataAdapterPo=dataAdapterRepository.loadCascade(id);
			}
			DataAdapter dataAdapter =dataAdapterRepository.newInstance(dataAdapterPo);
			dataAdapter.sync();
		} catch (Exception e) {
			rs.put("success", false);
			rs.put("msg", "同步数据失败");
			logger.error("同步数据失败，" + e.getMessage(),e);
		}
		return rs;
	}
	
	/**
	 *  来源表读取数据
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("initTargetFields")
	@ResponseBody
	public Map<String,Object> initTargetFields(HttpServletRequest request,HttpServletResponse response,DataSourcePo dataSource) {
		
		Map<String,Object> rs = new HashMap<String,Object>();
		rs.put("success", true);
		
		String id=RequestUtil.getString(request, "id");
		DataAdapterPo dataAdapter=null;
		if(StringUtil.isNotEmpty(id)){
			dataAdapter=dataAdapterRepository.loadCascade(id);
			rs.put("details", dataAdapter.getDataAdapterDetailPoList());
		}
		
		return rs;
		
	}
	
	
}
