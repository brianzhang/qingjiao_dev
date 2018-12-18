package com.lc.ibps.grads.course.thread;

import com.utils.FileUtil;

public class MoveFile implements Runnable {
	private String pathFrom;
	private String pathTo;
	
	public MoveFile(String pathFrom , String pathTo) {
		this.pathFrom = pathFrom;
		this.pathTo = pathTo;
	}
	@Override
	public void run()  {
		FileUtil.copyFile(pathFrom, pathTo);
	}

}
