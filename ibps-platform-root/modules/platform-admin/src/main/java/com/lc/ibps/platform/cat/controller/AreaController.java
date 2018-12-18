

package com.lc.ibps.platform.cat.controller;

import java.util.ArrayList;
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
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.core.util.string.StringValidator;
import com.lc.ibps.base.db.model.DefaultQueryFilter;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.common.cat.domain.Area;
import com.lc.ibps.common.cat.helper.AreaBuilder;
import com.lc.ibps.common.cat.persistence.entity.AreaPo;
import com.lc.ibps.common.cat.persistence.model.AreaVo;
import com.lc.ibps.common.cat.repository.AreaRepository;


/**
 * 地理区域 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2017-02-25 10:36:32
 *</pre>
 */
@Controller
@RequestMapping("/platform/cat/area/")
public class AreaController extends GenericController{
	@Resource
	private AreaRepository areaRepository;
	
	/**
	 * 获取地理区域
	 */
	@RequestMapping("getPickerData")
	@ResponseBody
	public Map<String, Object> getPickerData(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		DefaultQueryFilter queryFilter = new DefaultQueryFilter();
		queryFilter.setPage(null);
		List<AreaPo> areaPoList = areaRepository.query(queryFilter);
		
		Map<String, Object> pickerData = new HashMap<String, Object>();
		if(BeanUtils.isNotEmpty(areaPoList)){
			pickerData = AreaBuilder.buildPickerData(areaPoList);
		}
		
		return pickerData;
	}
	
	/**
	 * 获取地理区域
	 */
	@RequestMapping("getTreeData")
	@ResponseBody
	public List<AreaVo> getTreeData(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		DefaultQueryFilter queryFilter = new DefaultQueryFilter();
		queryFilter.setPage(null);
		List<AreaPo> areaPoList = areaRepository.query(queryFilter);
		
		List<AreaVo> areaVoList = new ArrayList<AreaVo>();
		areaVoList.add(AreaBuilder.buildRoot());
		if(BeanUtils.isNotEmpty(areaPoList)){
			areaVoList.addAll(AreaBuilder.buildTree(areaPoList));
		}
		
		return areaVoList;
	}
	
	/**
	 * 【地理区域】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		QueryFilter queryFilter=getQuerFilter(request);
		PageList<AreaPo> areaList=(PageList<AreaPo>)areaRepository.query(queryFilter);
		return new PageJson(areaList);
	}
	
	/**
	 * 编辑【地理区域】信息页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("edit")
	public ModelAndView edit(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		int isAdd = RequestUtil.getInt(request, "isAdd", 0);
		String id=RequestUtil.getString(request, "id");
		String key=RequestUtil.getString(request, "key");
		String pid=RequestUtil.getString(request, "parentId");
		String pname=null;
		AreaPo area=null;
		
		switch (isAdd) {
		case 0:
			pid = key;
			break;
		case 1:
			area=areaRepository.get(id);
			break;
		default:
			break;
		}
		
		if(StringValidator.isZeroEmpty(pid)){
			pname = "地理区域";
		}else{
			pname = areaRepository.getByAKey(pid).getName();
		}
		
		return getAutoView()
				.addObject("area", area)
				.addObject("parentId", pid)
				.addObject("parentName", pname)
				.addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【地理区域】明细页面
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
		String pname=null;
		AreaPo area=null;
		if(StringUtil.isNotEmpty(id)){
			area=areaRepository.get(id);
			if(StringValidator.isZeroEmpty(area.getParentId())){
				pname = "地理区域";
			}else{
				pname = areaRepository.getByAKey(area.getParentId()).getName();
			}
		}
		
		return getAutoView()
				.addObject("area", area)
				.addObject("parentName", pname)
				.addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【地理区域】信息
	 *
	 * @param request
	 * @param response
	 * @param  area
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response,AreaPo areaPo) throws Exception{
		ResultMessage message=null;
		try {
			String id = areaPo.getId();
			boolean isKeyExist = areaRepository.isKeyExist(id, areaPo.getKey());
			if (isKeyExist) {
				writeResultMessage(response.getWriter(),"输入的key中已存在!",ResultMessage.FAIL);
			}else{
				//构造领域对象和保存数据
				Area area =areaRepository.newInstance(areaPo);
				area.save();
				message=new ResultMessage(ResultMessage.SUCCESS, "保存地理区域成功");
			}
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对地理区域操作失败",e.getMessage());
			logger.error("对地理区域操作失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/**
	 *  批量删除【地理区域】记录
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
			Area area =areaRepository.newInstance();
			area.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除地理区域成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除地理区域失败");
			logger.error("删除地理区域失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
}
