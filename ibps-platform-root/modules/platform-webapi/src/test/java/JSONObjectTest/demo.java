package JSONObjectTest;

import java.util.Date;

public class demo{
	private Date aTime;
	private Date bTime;
	public Date getaTime() {
		return aTime;
	}
	public void setaTime(Date aTime) {
		this.aTime = aTime;
	}
	public Date getbTime() {
		return bTime;
	}
	public void setbTime(Date bTime) {
		this.bTime = bTime;
	}
	@Override
	public String toString() {
		return "demo [aTime=" + aTime + ", bTime=" + bTime + "]";
	}

	
}