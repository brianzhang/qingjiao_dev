
package com.lc.ibps.repairp.repair.controller;

import java.net.URLDecoder;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.db.model.DefaultQueryFilter;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.framework.page.PageList;
import com.lc.ibps.api.base.context.CurrentContext;
import com.lc.ibps.api.base.model.User;
import com.lc.ibps.api.base.query.QueryFilter;
import com.lc.ibps.api.base.query.QueryOP;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.org.party.persistence.entity.PartyRolePo;
import com.lc.ibps.org.party.persistence.entity.PartyUserRolePo;
import com.lc.ibps.org.party.repository.PartyRoleRepository;
import com.lc.ibps.org.party.repository.PartyUserRoleRepository;
import com.lc.ibps.repair.repair.repository.BxdRepository;
import com.lc.ibps.repair.repair.persistence.entity.BxdPo;
import com.lc.ibps.repair.bxzt.domain.Bxzt;
import com.lc.ibps.repair.bxzt.persistence.entity.BxztPo;
import com.lc.ibps.repair.bxzt.repository.BxztRepository;
import com.lc.ibps.repair.repair.domain.Bxd;

import com.lc.ibps.base.core.util.json.JsonUtil;

import net.sf.json.JSONObject;


/**
 * t_bxd 控制类
 *
 *<pre> 
 * 开发公司：广州流辰信息技术有限公司
 * 开发人员：eddy
 * 邮箱地址：1546077710@qq.com
 * 创建时间：2018-03-24 10:25:05
 *</pre>
 */
@Controller
@RequestMapping("/repairp/repair/bxd/")
public class BxdController extends GenericController{
	@Resource
	private BxdRepository bxdRepository;
	
	@Resource
	CurrentContext  currentContext;
	
	@Resource
	PartyUserRoleRepository partyUserRoleRepository;
	
	@Resource
	PartyRoleRepository partyRoleRepository;
	
	@Resource
	BxztRepository bxztRepository;
	
	
	/**
	 * 【t_bxd】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("listJson")
	public @ResponseBody PageJson listJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		PageList<BxdPo> bxdList= null;
		String whereSql = null;
		String gdzt = request.getParameter("gdzt");
		
		User sysUser = currentContext.getCurrentUser();
  		String fullName = sysUser.getFullname();
		String userId = sysUser.getUserId();	
		String roleName = getRoleName(userId);
		
		DefaultQueryFilter paramQueryFilter = new DefaultQueryFilter();
		
		if(roleName.equals("报修学生")) {
			String account = sysUser.getAccount();
			
			if(StringUtil.isNotEmpty(gdzt)) {
				whereSql = " bao_xiu_ren_="  +"\'"+account+"\'" +"and GDZT="  +"\'"+gdzt+"\'";
			}else {
				whereSql = " bao_xiu_ren_="  +"\'"+account+"\'";
			}
			
			
			
			paramQueryFilter.addParamsFilter("whereSql", whereSql);
			
			bxdList=(PageList<BxdPo>)bxdRepository.query(paramQueryFilter);
		}else if(roleName.equals("报修审核员")) {
			
		
			if(StringUtil.isNotEmpty(gdzt)) {
				
				
				whereSql = " GDZT="  +"\'"+gdzt+"\'"+"AND gong_dan_lei_xing_= 0";
				
				
			}else {
				whereSql = " gong_dan_lei_xing_= 0";
				
			}
			
			paramQueryFilter.addParamsFilter("whereSql", whereSql);
			
			bxdList=(PageList<BxdPo>)bxdRepository.query(paramQueryFilter);
		}else if(roleName.equals("报修维修工")) {
			whereSql = " wei_xiu_gong_="+"\'"+fullName+"\'";
			
			paramQueryFilter.addParamsFilter("whereSql", whereSql);
			
			bxdList=(PageList<BxdPo>)bxdRepository.query(paramQueryFilter);
			
			/*String whereSql2 = " wei_xiu_gong_="+"\'"+fullName+"\'" + "and SUBID IS NOT NULL";
			paramQueryFilter.addParamsFilter("whereSql", whereSql2);
			PageList<BxdPo> bxdList2=(PageList<BxdPo>)bxdRepository.query(paramQueryFilter);*/
			
			/*for(int i=0;i<bxdList2.size();i++) {
				String subid =  bxdList2.get(i).getSubid();
				if(StringUtil.isNotEmpty(subid)) {
					BxdPo bxdPo = bxdRepository.get(subid);
					bxdList.add(bxdPo);
				}
				
			}*/
		}
		
		
		
		return new PageJson(bxdList);
	}
	
	
	/**
	 * 【t_bxd】列表(分页条件查询)数据
	 *
	 * @param request
	 * @param reponse
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("subListJson")
	public @ResponseBody PageJson subListJson(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		String subId = request.getParameter("id");
		
		DefaultQueryFilter paramQueryFilter = new DefaultQueryFilter();
		String whereSql = " SUBID=" +subId;
		
		paramQueryFilter.addParamsFilter("whereSql", whereSql);
		
		//QueryFilter queryFilter=getQuerFilter(request);
		//queryFilter.addFilter("subid", subId,QueryOP.EQUAL);
		PageList<BxdPo> bxdList =(PageList<BxdPo>)bxdRepository.query(paramQueryFilter);
		
		return new PageJson(bxdList);
	}
	
	@RequestMapping("findall")
	public ModelAndView findall(HttpServletRequest request,HttpServletResponse reponse) throws Exception{
		return getAutoView();
	}
	
	
	
	/**
	 * 编辑【t_bxd】信息页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("edit")
	public ModelAndView edit(HttpServletRequest request,HttpServletResponse response) throws Exception{
		User sysUser = currentContext.getCurrentUser();
		
		//String 	wxg = new String (request.getParameter("wxg").getBytes( "ISO8859-1" ), "utf-8" ).trim();
		String wxgParam = request.getParameter("wxg");		
		List<BxztPo> bxztList = null;
		
		String wxg = null;
		if(StringUtil.isNotEmpty(wxgParam)) {
			wxg = new String(wxgParam.getBytes("ISO8859-1"), "utf-8" ).trim();
		}
		
		String userId = sysUser.getUserId();	
		String roleName = getRoleName(userId);
		
		String gdztParam = request.getParameter("gdzt");
		String gdzt = null;
		if(StringUtil.isNotEmpty(gdztParam)) {
			gdzt = new String (gdztParam.getBytes( "ISO8859-1" ), "utf-8" ).trim();
		}
		
		String preUrl= RequestUtil.getPrePage(request);
		String id=RequestUtil.getString(request, "id");
		BxdPo bxd=null;
		if(StringUtil.isNotEmpty(id)){
			bxd=bxdRepository.get(id);
		}
		
		boolean isFinish = true;
		
		
		if(bxd !=null) { 
			String gdlx = bxd.getGdlx();
			if(gdlx.equals("0")) {
				List<BxdPo> subBxdList = bxdRepository.getBySubBxdIdAndGdlx(id, "1");
				int subBxdSize = subBxdList.size();
				if(subBxdSize !=0) {
					for(int i=0;i<subBxdSize;i++) {
						String subGdzt = subBxdList.get(i).getGdzt();
						if(!subGdzt.equals("完工申请")) {
							isFinish = false;
						}
					}
				}
			}
			
			
			
			bxztList = bxztRepository.getByBxdId(id);
			if(bxztList.size() ==0) {				 
				String subId = bxd.getSubid();				
				bxztList = bxztRepository.getByBxdId(subId);
				for(BxztPo bxztPo :bxztList) {
					String bxdState = bxztPo.getBxdState();
				
					if(bxdState.equals("已派工")) {
						bxztPo.setPgdx(wxg);
					}else if(bxdState.equals("已完工")) {
						bxztPo.setClr(wxg);
						bxztPo.setPgdx(wxg);
					}
				}
				
			}
		}
		
		
		return getAutoView().addObject("bxd", bxd).addObject("returnUrl", preUrl).addObject("gdzt",gdzt).addObject("roleName",roleName).addObject("bxztList",bxztList).addObject("isFinish", isFinish);
	
	}
	/**
	 * 编辑【t_bxd】信息页面
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("flowEdit")
	public ModelAndView flowEdit(HttpServletRequest request,HttpServletResponse response) throws Exception{
		String preUrl= RequestUtil.getPrePage(request);
		String id=RequestUtil.getString(request, "id");
		BxdPo bxd=null;
		if(StringUtil.isNotEmpty(id)){
			bxd=bxdRepository.get(id);
		}
		
		
		return getAutoView().addObject("bxd", bxd).addObject("returnUrl", preUrl);
	}
	
	/**
	 * 【t_bxd】明细页面
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
		BxdPo bxd=null;
		if(StringUtil.isNotEmpty(id)){
			bxd=bxdRepository.get(id);
		}
		return getAutoView().addObject("bxd", bxd).addObject("returnUrl", preUrl);
	}
	
	/** 
	 * 保存【t_bxd】信息
	 *
	 * @param request
	 * @param response
	 * @param  bxd
	 * @throws Exception
	 */
	@RequestMapping("save")
	public void save(HttpServletRequest request,HttpServletResponse response) throws Exception{
		ResultMessage message=null;
		
			
		String id =  RequestUtil.getString(request, "m:bxd:id",null);      //id
		String bxqy =  RequestUtil.getString(request, "m:bxd:bxqy",null);  //报修区域（数据字典）
		String xxdz = RequestUtil.getString(request, "m:bxd:xxdz",null);   //详细地址		
		String bxxm = RequestUtil.getString(request, "m:bxd:bxxm",null);   //报修项目（数据字典）
		String bxxx = RequestUtil.getString(request, "m:bxd:bxxx",null);   //报修详细
		String yysj = RequestUtil.getString(request, "m:bxd:yysj",null);   //报修时间（数据字典）
		String lxfs = RequestUtil.getString(request, "m:bxd:lxfs",null);   //联系方式
		String sctp = RequestUtil.getString(request, "m:bxd:sctp",null);   //上传图片
		String gdcz = RequestUtil.getString(request, "gdcz",null);         //工单操作
		
		
								
		String star = RequestUtil.getString(request, "star",null);
		String pj = RequestUtil.getString(request, "pj",null);
		
		
		
		
		try {
			//BxdPo bxdPo = getFromRequest(request);
			if(id == null) {
				BxdPo bxdPo = new BxdPo();
				User sysUser = currentContext.getCurrentUser();
				String account = sysUser.getAccount();
				bxdPo.setBxr(account);
				//报修时间
				Date date = new Date();
				DateFormat bf = new SimpleDateFormat("yyyy-MM-dd E a HH:mm:ss");
				String yysj2 = bf.format(date).toString();
				bxdPo.setYysj2(yysj2);
				
				//报修区域（代码转中文）
				String bxqy2 = null;
				if(StringUtil.isNotEmpty(bxqy)) {
					bxqy2 = bxdRepository.getItemValue(bxqy);   
				}
				bxdPo.setBxqy2(bxqy2);
				
				//详细地址（代码转中文）
				if(StringUtil.isNotEmpty(xxdz)) {
					String xxdz2= bxqy2+"-"+xxdz;
					bxdPo.setXxdz(xxdz2);
				}else {
					bxdPo.setXxdz(bxqy2);
				}
				
				//报修项目（代码转中文）
				String bxxm2 = null;						
				if(StringUtil.isNotEmpty(bxxm)) {
					bxxm2 = bxdRepository.getItemValue(bxxm);
				}
				bxdPo.setBxxm2(bxxm2);
				
				
				bxdPo.setId(id);				
				bxdPo.setBxqy(bxqy);
				bxdPo.setXxdz(bxqy2+"-"+xxdz);
				bxdPo.setBxxm(bxxm);								
				bxdPo.setBxxx(bxxx);
				bxdPo.setYysj(yysj);
				bxdPo.setLxfs(lxfs);
				bxdPo.setSctp(sctp);								
				bxdPo.setGdzt("未审核");
				bxdPo.setGdlx("0");
				
				
				String bxdId =bxdRepository.newInstance(bxdPo).getIdGenerator().getId();
				bxdPo.setId(bxdId);
				Bxd bxd =bxdRepository.newInstance(bxdPo);
				bxd.save();
				
				
				this.createBxztPo(bxdId, "未审核", null, null, null);
				
				
				
			}else {
				           
				String bz = RequestUtil.getString(request, "bz",null);   //备注
				
				BxdPo bxdPo = bxdRepository.get(id);
				User sysUser = currentContext.getCurrentUser();
				String fullName = sysUser.getFullname();
				
				
				
				if(StringUtil.isNotEmpty(gdcz)) {
					if(gdcz.equals("已受理") ) {
						
						if(StringUtil.isNotEmpty(fullName)){
							bxdPo.setSlr(fullName);
							bxdPo.setGdzt(gdcz);
						}
						
						
						
						
						
					
						
						this.createBxztPo(id, gdcz, fullName,null,null);
						
					}else if(gdcz.equals("已派工")|| gdcz.equals("多人派工")) {
						String wxg = RequestUtil.getString(request, "wxg",null); //维修工						
						if(StringUtil.isNotEmpty(wxg)) {
							wxg = new String (wxg.getBytes( "ISO8859-1" ), "utf-8" ).trim();
							String[] strs = wxg.split(" ");
							if(strs.length >=2) {
								bxdPo.setWxg(wxg);								
								if(StringUtil.isNotEmpty(bz)) {
									bxdPo.setBz(bz);
								}
								for(int i=0;i<strs.length;i++) {
									BxdPo bxdPoNew = new BxdPo(); 
									bxdPoNew.setBxqy(bxdPo.getBxqy());
									bxdPoNew.setBxqy2(bxdPo.getBxqy2());
									bxdPoNew.setXxdz(bxdPo.getXxdz());
									bxdPoNew.setBxxm(bxdPo.getBxxm());
									bxdPoNew.setBxxm2(bxdPo.getBxxm2());
									bxdPoNew.setBxxx(bxdPo.getBxxx());
									bxdPoNew.setYysj(bxdPo.getYysj());
									bxdPoNew.setYysj2(bxdPo.getYysj2());
									bxdPoNew.setLxfs(bxdPo.getLxfs());
									bxdPoNew.setSctp(bxdPo.getSctp());
									bxdPoNew.setBxr(bxdPo.getBxr());
									bxdPoNew.setSlr(bxdPo.getSlr());
									bxdPoNew.setGdlx("1");
									bxdPoNew.setWxg(strs[i]);
									bxdPoNew.setGdzt("已派工");
									bxdPoNew.setBz(bxdPo.getBz());
									bxdPoNew.setIsZd(bxdPo.getIsZd());
									bxdPoNew.setSubbh(bxdPo.getId()+"-"+(i+1));
									bxdPoNew.setSubid(bxdPo.getId());
									String bxdId =bxdRepository.newInstance(bxdPo).getIdGenerator().getId();							
									bxdPoNew.setId(bxdId);
									Bxd bxd =bxdRepository.newInstance(bxdPoNew);
									bxd.save();
								}
							}else {
								bxdPo.setWxg(wxg);
								if(StringUtil.isNotEmpty(bz)) {
									bxdPo.setBz(bz);
								}
							}
							
							bxdPo.setGdzt("已派工");
							
							
							this.createBxztPo(id, "已派工", fullName, wxg, null);
						}						
					}else if(gdcz.equals("已转单")) {
						String slr = RequestUtil.getString(request, "m:bxd:slr",null);     //受理人
						if(StringUtil.isNotEmpty(slr)) {
							bxdPo.setIsZd("1");
							bxdPo.setSlr(slr);
						}
					}else if(gdcz.equals("已接单")) {
						String gdlx = bxdPo.getGdlx();
						
						if(gdlx.equals("1")) {							
							changeGdzt("已接单",bxdPo,bz);
						}else {
							bxdPo.setGdzt("已接单");
							this.createBxztPo(id, gdcz, fullName, null, bz);
						}
						
						
												
						
						
					}else if(gdcz.equals("完工申请")) {
						if(bxdPo.getGdlx().equals("1")) {
							changeGdzt("完工申请", bxdPo,bz);
						}						
					}else if(gdcz.equals("完工确认")) {
						bxdPo.setGdzt("已完工");
						this.createBxztPo(id, "已完工", fullName, bxdPo.getWxg(), bz);
						
					}
				}else {
					if(StringUtil.isNotEmpty(bxqy) && !(bxqy.equals(bxdPo.getBxqy()))) {
						bxdPo.setBxqy(bxqy);
						String bxqy2 = null;
						bxqy2 = bxdRepository.getItemValue(bxqy); 
						bxdPo.setBxqy2(bxqy2);
						bxdPo.setXxdz(bxqy2+xxdz);
					}
					if(StringUtil.isNotEmpty(bxxm) && !(bxxm.equals(bxdPo.getBxxm()))) {
						bxdPo.setBxxm(bxxm);
						String bxxm2 = null;
						bxxm2 = bxdRepository.getItemValue(bxxm); 
						bxdPo.setBxqy2(bxxm2);
					}
					
					if(StringUtil.isNotEmpty(bxxx) && !(bxxx.equals(bxdPo.getBxxx()))) {
						bxdPo.setBxxx(bxxx);
					}
					if(StringUtil.isNotEmpty(lxfs) && !(lxfs.equals(bxdPo.getLxfs()))) {
						bxdPo.setLxfs(lxfs);
					}
					if(StringUtil.isNotEmpty(sctp) && !(sctp.equals(bxdPo.getSctp()))) {
						bxdPo.setSctp(sctp);
					}
					if(StringUtil.isNotEmpty(yysj) && !(yysj.equals(bxdPo.getYysj()))) {
						bxdPo.setYysj(yysj);
					}
					
				}
																																																			
												
				Bxd bxd = bxdRepository.newInstance(bxdPo);
				bxd.update();
			}
			
			
			//构造领域对象和保存数据
			//Bxd bxd =bxdRepository.newInstance(bxdPo);
			//bxd.save();
			
			//message=new ResultMessage(ResultMessage.SUCCESS, "保存t_bxd成功");
			
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "对t_bxd操作失败,"+e.getMessage());
			logger.error("对t_bxd操作失败，" + e.getMessage(),e);
		}
		response.getWriter().print("success");
		//writeResultMessage(response.getWriter(), message);
	}
	
	/** 
	 * 获取表单数据
	 *
	 * @param request
	 */
	private BxdPo getFromRequest(HttpServletRequest request){
		String json = RequestUtil.getString(request, "json");
		JSONObject jsonObj = JSONObject.fromObject(json);
		
		BxdPo bxdPo = getBxdPo(jsonObj);

		return bxdPo;
	}
	
	/** 
	 * 获取t_bxd数据
	 *
	 * @param jsonObj
	 */
	private BxdPo getBxdPo(JSONObject jsonObj){
		BxdPo bxdPo = (BxdPo) JsonUtil.getDTO(jsonObj.toString(), BxdPo.class);
		return bxdPo;
	}
	
	
	/**
	 *  批量删除【t_bxd】记录
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
			Bxd bxd =bxdRepository.newInstance();
			bxd.deleteByIds(ids);
			message=new ResultMessage(ResultMessage.SUCCESS, "删除t_bxd成功");
		} catch (Exception e) {
			message=new ResultMessage(ResultMessage.FAIL, "删除t_bxd失败，" + e.getMessage());
			logger.error("删除t_bxd失败，" + e.getMessage(),e);
		}
		writeResultMessage(response.getWriter(), message);
	}
	
	/*public String getGdzt(String zt) {
		String gdzt = "0";
		if(zt.equals("已受理")) {
			gdzt="1";
		}else if(zt.equals("已派工")) {
			gdzt ="2";
		}else if(zt.equals("已转单")) {
			gdzt = "3";
		}else if(zt.equals("已暂停")) {
			gdzt = "4";
		}else if(zt.equals("完工确认")) {
			gdzt = "5";
		}
	}*/
	
	//取得当前登录用户的角色类型
	public  String getRoleName(String userId) {
		List<PartyUserRolePo> urList = new ArrayList<PartyUserRolePo>();
		DefaultQueryFilter paramQueryFilter = new DefaultQueryFilter();
		String whereSql = " USER_ID_="  +"\'"+userId+"\'";
		
		paramQueryFilter.addParamsFilter("whereSql", whereSql);
		
		urList=(PageList<PartyUserRolePo>)partyUserRoleRepository.query(paramQueryFilter);
		String roleName = null;
		if(urList.size()!=0) {
			String roleId = urList.get(0).getRoleID();
			PartyRolePo partyRolePo = partyRoleRepository.get(roleId);
			roleName = partyRolePo.getName();
		}		
		return roleName;
	}
	
	//多人派工情况下的接单、完工申请（工单状态修改）
	public void changeGdzt(String gdzt,BxdPo bxdPo,String bz) {
		boolean flag = true;
		bxdPo.setGdzt(gdzt);
		Bxd bxd = bxdRepository.newInstance(bxdPo);
		bxd.update();
		List<BxdPo> subBxdList = bxdRepository.getBySubBxdIdAndGdlx(bxdPo.getSubid(), "1");
		int subBxdSize = subBxdList.size();
		if(subBxdSize !=0) {
			for(int i=0;i<subBxdSize;i++) {
				String subGdzt = subBxdList.get(i).getGdzt();
				if(!subGdzt.equals(gdzt)) {
					flag = false;
				}
			}
			if(flag==true) {
				String subId = bxdPo.getSubid();
				if(StringUtil.isNotEmpty(subId)) {
					BxdPo bxdPoP = bxdRepository.get(subId);
					if(bxdPoP!=null && gdzt.equals("已接单")) {
						bxdPoP.setGdzt(gdzt);
						Bxd bxdnew =bxdRepository.newInstance(bxdPoP);
						bxdnew.save();												
						this.createBxztPo(subId, "已接单", bxdPoP.getWxg(), null, bz);																								
					}else if(bxdPoP!=null && gdzt.equals("完工申请")) {
						bxdPoP.setGdzt("完工申请");
						Bxd bxdnew =bxdRepository.newInstance(bxdPoP);
						bxdnew.save();												
						this.createBxztPo(subId, "完工申请", bxdPoP.getWxg(), null, bz);
					}
				}
				
				
			}
		}
	}
	
	//新增工单状态
	public void createBxztPo(String bxdId,String gdcz,String clr,String pgdx,String bz) {
		BxztPo bxztPo = new BxztPo();
		bxztPo.setBaoXiuID(bxdId);
		bxztPo.setBxdState(gdcz);	
		bxztPo.setClr(clr);
		bxztPo.setPgdx(pgdx);
		bxztPo.setBeiZhu(bz);
		Bxzt bxzt =bxztRepository.newInstance(bxztPo);
		bxzt.save();
	}
	
	
	
}
