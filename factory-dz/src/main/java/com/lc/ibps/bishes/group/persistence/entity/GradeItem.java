package com.lc.ibps.bishes.group.persistence.entity;

public class GradeItem {

	private String itemName;
	private int aNum;
	private int bNum;
	private int cNum;
	private int dNum;
	private int problemNum;
	private String aMean;
	private String bMean;
	private String cMean;
	private String dMean;
	public String getItemName() {
		return itemName;
	}
	public void setItemName(String itemName) {
		this.itemName = itemName;
	}
	public int getaNum() {
		return aNum;
	}
	public void setaNum(int aNum) {
		this.aNum = aNum;
	}
	public int getbNum() {
		return bNum;
	}
	public void setbNum(int bNum) {
		this.bNum = bNum;
	}
	public int getcNum() {
		return cNum;
	}
	public void setcNum(int cNum) {
		this.cNum = cNum;
	}
	public int getdNum() {
		return dNum;
	}
	public void setdNum(int dNum) {
		this.dNum = dNum;
	}
	public int getProblemNum() {
		return problemNum;
	}
	public void setProblemNum(int problemNum) {
		this.problemNum = problemNum;
	}
	public String getaMean() {
		return aMean;
	}
	public void setaMean(String aMean) {
		this.aMean = aMean;
	}
	public String getbMean() {
		return bMean;
	}
	public void setbMean(String bMean) {
		this.bMean = bMean;
	}
	public String getcMean() {
		return cMean;
	}
	public void setcMean(String cMean) {
		this.cMean = cMean;
	}
	public String getdMean() {
		return dMean;
	}
	public void setdMean(String dMean) {
		this.dMean = dMean;
	}
	public GradeItem(String itemName, int aNum, int bNum, int cNum, int dNum, int problemNum, String aMean,
			String bMean, String cMean, String dMean) {
		super();
		this.itemName = itemName;
		this.aNum = aNum;
		this.bNum = bNum;
		this.cNum = cNum;
		this.dNum = dNum;
		this.problemNum = problemNum;
		this.aMean = aMean;
		this.bMean = bMean;
		this.cMean = cMean;
		this.dMean = dMean;
	}

	
	
}
