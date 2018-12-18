package com.lc.ibps.components.im.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.ModelAndView;

import com.lc.ibps.api.base.constants.UserInfoConstants;
import com.lc.ibps.base.core.constants.StringPool;
import com.lc.ibps.base.core.entity.ResultMessage;
import com.lc.ibps.base.core.util.BeanUtils;
import com.lc.ibps.base.core.util.json.JsonUtil;
import com.lc.ibps.base.core.util.string.StringUtil;
import com.lc.ibps.base.db.mybatis.domain.DefaultPage;
import com.lc.ibps.base.web.context.ContextUtil;
import com.lc.ibps.base.web.controller.GenericController;
import com.lc.ibps.base.web.json.PageJson;
import com.lc.ibps.base.web.util.RequestUtil;
import com.lc.ibps.common.im.persistence.entity.ImGroupPo;
import com.lc.ibps.common.im.persistence.entity.ImMessagePo;
import com.lc.ibps.common.im.persistence.entity.ImUserPo;
import com.lc.ibps.components.im.builder.ImBuilder;
import com.lc.ibps.components.im.constants.Message;
import com.lc.ibps.components.im.entity.FileData;
import com.lc.ibps.components.im.entity.UploadFile;
import com.lc.ibps.components.im.model.IImGroup;
import com.lc.ibps.components.im.model.IImMessage;
import com.lc.ibps.components.im.model.IImUser;
import com.lc.ibps.components.im.service.IImPersistenceService;
import com.lc.ibps.components.im.service.IImService;
import com.lc.ibps.components.upload.UploadStrategySelector;
import com.lc.ibps.components.upload.model.FileInfo;
import com.lc.ibps.components.upload.service.IUploadService;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/**
 * 聊天室控制器
 *
 * <pre>
 *  
 * 构建组：ibps-platform-admin
 * 作者：eddy
 * 邮箱：1546077710@qq.com
 * 日期：2016年10月29日-下午1:35:09
 * 版权：广州流辰信息技术有限公司版权所有
 * </pre>
 */
@Controller
@RequestMapping("/components/im/")
public class ImController extends GenericController {

	@Resource
	private IImService imService;
	@Resource
	private IImPersistenceService imPersistenceService;

	@Resource
	private UploadStrategySelector uploadStrategySelector;

	private IUploadService uploadService;

	public IUploadService getUploadService() {
		if (uploadService == null) {
			uploadService = uploadStrategySelector.getIUploadService();
		}
		return uploadService;
	}

	/**
	 * 绑定数据
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("bind")
	public @ResponseBody void bind(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ResultMessage resultMessage = new ResultMessage();
		String clientId = RequestUtil.getString(request, "client_id");
		String msgstring = imService.findMsgByRecvIdJson(clientId, StringPool.N);
		List<ImMessagePo> msgs = ImMessagePo.fromJsonArrayString(msgstring);
		JSONArray jsonArray = new JSONArray();
		if (BeanUtils.isNotEmpty(msgs)) {
			for (IImMessage msg : msgs) {
				jsonArray.add(msg.getContent());
				imPersistenceService.updateMessage2Readed(msg.getId());
			}
		}
		resultMessage.setMessage(jsonArray.toString());

		writeResultMessage(response.getWriter(), resultMessage);
	}

	/**
	 * 发送消息，记录消息内容
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("sendMessage")
	public void sendMessage(HttpServletRequest request, HttpServletResponse response) throws Exception {
		ResultMessage resultMessage = new ResultMessage();
		String data = RequestUtil.getString(request, "data");
		Long timestamp = RequestUtil.getLong(request, "timestamp");

		logger.debug("com.lc.ibps.components.im.controller.ImController.sendMessage()-->timestamp=" + timestamp
				+ ",data=" + data);

		JSONObject dataJson = JSONObject.fromObject(data);
		JSONObject mineJson = dataJson.getJSONObject("mine");// 发信端信息
		JSONObject toJson = dataJson.getJSONObject("to");// 接收端信息
		String toType = toJson.getString("type");// 消息类型：friend（私信）、group（群聊）
		List<String> memberIds = new ArrayList<String>();

		JSONObject msgJson = new JSONObject();
		msgJson.element("timestamp", timestamp);
		mineJson.element("timestamp", timestamp);
		// 群消息保存方式：每个成员都要保存一条消息记录
		if ("group".equalsIgnoreCase(toType)) {
			JSONObject dataJsonNew = new JSONObject();
			String groupId = toJson.getString("id");
			String groupName = toJson.getString("groupname");
			String userName = mineJson.getString("username");
			String mineId = mineJson.getString("id");
			memberIds = memberIds(groupId);
			for (String memberId : memberIds) {
				mineJson.element("id", groupId);
				mineJson.element("from_id", mineId);
				mineJson.element("groupname", groupName);
				mineJson.element("username", userName);
				mineJson.element("name", groupName);
				dataJsonNew.element("mine", mineJson);

				toJson.element("id", memberId);
				dataJsonNew.element("to", toJson);
				msgJson.element("data", dataJsonNew);
				imPersistenceService.saveMessageJson(JsonUtil.getJSONString(msgJson));
			}
		} else {
			msgJson.element("data", dataJson);
			imPersistenceService.saveMessageJson(JsonUtil.getJSONString(msgJson));
		}

		resultMessage.addVariable("memberIds", JSONArray.fromObject(memberIds));

		writeResultMessage(response.getWriter(), resultMessage);
	}

	/**
	 * 消息记录
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("im/chatLog")
	public ModelAndView chatLog(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String id = RequestUtil.getString(request, "id");
		String type = RequestUtil.getString(request, "type");

		return super.getAutoView().addObject("id", id).addObject("type", type);
	}

	/**
	 * 消息记录
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("chatLogJson")
	@ResponseBody
	public PageJson chatLogJson(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String clientId = ContextUtil.getCurrentUserId();
		String rosId = RequestUtil.getString(request, "refId");
		String type = RequestUtil.getString(request, "type");

		int page = RequestUtil.getInt(request, "page", 1);
		int pageSize = RequestUtil.getInt(request, "pageSize", 20);
		DefaultPage defaultPage = new DefaultPage(page, pageSize);

		String listData = imService.queryChatLogJson(clientId, rosId, type, defaultPage);
		List<ImMessagePo> msgList = ImMessagePo.fromJsonArrayString(listData);
		int pageTotal = imService.chatLogPageTotal(clientId, rosId, type, pageSize);

		PageJson pageJson = new PageJson(msgList);
		pageJson.setPage(page);
		pageJson.setTotal(pageTotal);
		return pageJson;
	}

	/**
	 * 获取初始化数据
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("initJson")
	@ResponseBody
	public JSONObject initJson(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String defaultAvatar = request.getContextPath() + UserInfoConstants.DEFAULT_USER_IMAGE;
		String data = imService.getCurrUserJson();
		ImUserPo mine = ImUserPo.fromJsonString(data);
		if (BeanUtils.isEmpty(mine.getAvatar()))
			mine.setAvatar(defaultAvatar);
		else
			mine.setAvatar(request.getContextPath() + mine.getAvatar());

		String listData = imService.findGroupByOwnerIdJson(mine.getUserId(), Message.friend.key());
		List<ImGroupPo> friendGroups = ImGroupPo.fromJsonArrayString(listData);

		if (BeanUtils.isNotEmpty(friendGroups)) {
			for (IImGroup friendGroup : friendGroups) {
				List<IImUser> friends = friendGroup.getMembers();
				if (BeanUtils.isEmpty(friends))
					continue;
				for (IImUser friend : friends) {
					if (BeanUtils.isEmpty(friend.getAvatar()))
						friend.setAvatar(defaultAvatar);
					else
						friend.setAvatar(request.getContextPath() + friend.getAvatar());
				}
			}
		}

		listData = imService.findGroupByOwnerIdJson(mine.getUserId(), Message.group.key());
		List<ImGroupPo> groups = ImGroupPo.fromJsonArrayString(listData);

		if (BeanUtils.isNotEmpty(groups)) {
			for (IImGroup group : groups) {
				if (BeanUtils.isEmpty(group.getAvatar()))
					group.setAvatar(defaultAvatar);
				else
					group.setAvatar(request.getContextPath() + group.getAvatar());
			}
		}

		JSONObject initJson = 
				ImBuilder.buildInit(0, "", mine, ImGroupPo2IImGroup(friendGroups), ImGroupPo2IImGroup(groups));

		return initJson;
	}
	
	private List<IImGroup> ImGroupPo2IImGroup(List<ImGroupPo> list){
		List<IImGroup> iImGroup = new ArrayList<IImGroup>();
		for (ImGroupPo po : list) {
			iImGroup.add(po);
		}
		return iImGroup;
	}

	/**
	 * 获取群组成员数据
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("membersJson")
	@ResponseBody
	public JSONObject membersJson(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String groupId = RequestUtil.getString(request, "id");
		IImGroup group = ImGroupPo.fromJsonString(imService.getGroupJson(groupId));
		
		if (BeanUtils.isNotEmpty(group) && BeanUtils.isNotEmpty(group.getMembers())) {
			String defaultAvatar = request.getContextPath() + UserInfoConstants.DEFAULT_USER_IMAGE;
			List<IImUser> friends = group.getMembers();
			for (IImUser friend : friends) {
				if (BeanUtils.isEmpty(friend.getAvatar()))
					friend.setAvatar(defaultAvatar);
				else
					friend.setAvatar(request.getContextPath() + friend.getAvatar());
			}
		}

		JSONObject membersJson = ImBuilder.buildMembers(0, "", group);

		return membersJson;
	}

	/**
	 * 获取群成员ID集合，不含发信人ID
	 *
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("memberIdsJson")
	@ResponseBody
	public List<String> memberIdsJson(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String groupId = RequestUtil.getString(request, "groupId");
		List<String> memberIds = memberIds(groupId);

		return memberIds;
	}

	private List<String> memberIds(String groupId) {
		List<String> memberIds = new ArrayList<String>();

		if (StringUtil.isEmpty(groupId)) {
			return memberIds;
		}

		List<ImUserPo> members = ImUserPo.fromJsonArrayString(imService.findUserByGroupIdJson(groupId));
		if (BeanUtils.isEmpty(members)) {
			return memberIds;
		}

		for (IImUser member : members) {
			memberIds.add(member.getUserId());
		}

		return memberIds;
	}

	/**
	 * 文件上传
	 *
	 * @param file
	 * @param userId
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("upload")
	public @ResponseBody JSONObject upload(@RequestParam(value = "file", required = false) MultipartFile file,
			HttpServletRequest request, HttpServletResponse response) throws Exception {
		UploadFile uploadFileVo = new UploadFile();
		try {
			String fileName = file.getOriginalFilename();

			Map<String, Object> params = new HashMap<String, Object>();
			params.put("uploadType", "im");
			params.put("originalFilename", fileName);
			params.put("fileSize", file.getSize());
	
			this.getUploadService();
			FileInfo fileInfo = uploadService.uploadFile(file.getInputStream(), params);
			uploadFileVo.setCode(0);
			
			FileData data = new FileData();
			data.setName(fileName);
			data.setSrc(request.getContextPath()+"/components/upload/download.htm?downloadId="+fileInfo.getId());
			
			uploadFileVo.setData(data);
		} catch (Exception e) {
			logger.error(e.getMessage(),e);
			uploadFileVo.setCode(1);
		}

		return JSONObject.fromObject(uploadFileVo);
	}

	/**
	 * 
	 * 修改个性签名
	 *
	 * @param request
	 * @param response
	 * @throws Exception
	 */
	@RequestMapping("changeSign")
	public void changeSign(HttpServletRequest request, HttpServletResponse response) throws Exception {
		String sign = RequestUtil.getString(request, "sign");
		IImUser IImUser = ImUserPo.fromJsonString(imService.getCurrUserJson());
		IImUser.setSign(sign);
		imPersistenceService.saveUser(IImUser);

	}
}
