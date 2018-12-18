package com.lc.ibps.loans.files.persistence.entity;

import java.util.Map;

import com.lc.ibps.components.model.interfaces.AbstractParam;
import com.lc.ibps.components.model.persistence.entity.BusinessModelPo;
import com.lc.ibps.components.model.repository.BusinessModelRepository;
import com.lc.ibps.loans.files.domain.File;
import com.lc.ibps.loans.files.repository.FileRepository;



import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

public class FileParam implements AbstractParam {

	private String files;
	private String viewer;
	private String uploader;
	
	public String getViewer() {
		return viewer;
	}

	public void setViewer(String viewer) {
		this.viewer = viewer;
	}

	public String getUploader() {
		return uploader;
	}

	public void setUploader(String uploader) {
		this.uploader = uploader;
	}

	public String getFiles() {
		return files;
	}

	public void setFiles(String files) {
		this.files = files;
	}



	@Override
	public void translate(Map args) {
		try{
			BusinessModelRepository businessModelRepository = (BusinessModelRepository) args.get("businessModelRepository");
			FileRepository fileRepository = (FileRepository) args.get("fileRepository");
			String loanId = (String) args.get("loanId");
					
			BusinessModelPo bmp = businessModelRepository.get(files);
			String fileBaseName = bmp.getName();
			JSONArray filesJa = JSONArray.fromObject(bmp.getParam());
			String viewersStr = businessModelRepository.get(viewer).getParam();
			String uploadersStr = businessModelRepository.get(uploader).getParam();
			for(int i = 0 ; i < filesJa.size() ; ++i ){
				JSONObject jo  = filesJa.getJSONObject(i);
				String fileName = fileBaseName +"-"+ jo.getString("fileName");
				FilePo fp = new FilePo();
				fp.setName(fileName);
				fp.setJdid(loanId);
				fp.setViewer(parse(viewersStr));
				fp.setUploader(parse(uploadersStr));
				File f = fileRepository.newInstance(fp);
				f.save();
			}
		}catch(Exception e){
			e.getStackTrace();
		}
	}

	private String parse(String str) {
		JSONArray ja = JSONArray.fromObject(str);
		String res = "";
		for(int i = 0 ; i < ja.size() ; ++i)
			res += ja.getJSONObject(i).get("role_id")+".";
		return res;
	}


}
