package HttpClient;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.http.Consts;
import org.apache.http.HttpEntity;
import org.apache.http.NameValuePair;
import org.apache.http.client.entity.UrlEncodedFormEntity;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.message.BasicNameValuePair;
import org.apache.http.util.EntityUtils;

import com.lc.ibps.components.httpclient.model.HttpStatus;

import net.sf.json.JSONObject;

public class TestHttpClient {
	
	public static void main(String[] args) throws IOException {
		String getToken = "https://qyapi.weixin.qq.com/cgi-bin/gettoken";
		String corpid = "wxfb97c28ad4dcd17f";
		String corpsecret = "yZqBRWlwRoi4y9KA2nlA2WCRzRlixVxjy2cI-b36Otm1Td1iC0QcYlimqyVCs4H6";
		CloseableHttpResponse resp = null;

		CloseableHttpClient client = HttpClients.createDefault();
		try {
			List<NameValuePair> params = new ArrayList<NameValuePair>();
			params.add(new BasicNameValuePair("corpid", corpid));
			params.add(new BasicNameValuePair("corpsecret", corpsecret));
			HttpGet get = new HttpGet(getToken+"?"+
					EntityUtils.toString(new UrlEncodedFormEntity(params, Consts.UTF_8)));
//			StringEntity stringentity = new StringEntity(jsonObject.toString(),
//					ContentType.create("text/json", "UTF-8"));
			resp = client.execute(get);
			HttpEntity entity = resp.getEntity();
			JSONObject res = JSONObject.fromObject(EntityUtils.toString(entity, "utf-8"));
			String access_token = res.has("access_token") ? res.get("access_token").toString() : "";
			
			String getUserInfo = "https://qyapi.weixin.qq.com/cgi-bin/user/getuserinfo?access_token=" + access_token
					+ "&code=123";
			HttpPost post = new HttpPost(getUserInfo);
			resp = client.execute(post);
			if (resp.getStatusLine().getStatusCode() == HttpStatus.OK.value()) {
				entity = resp.getEntity();
				res = JSONObject.fromObject(EntityUtils.toString(resp.getEntity(), "utf-8"));
				String userId = res.has("UserId") ? res.get("UserId").toString() : "";
				System.out.println(userId);
			}else {
				System.out.println(resp.getStatusLine().getStatusCode());
			}
			
			
			System.out.println(resp.getStatusLine().getStatusCode());
		} catch (Exception e) {
			
		}finally {
			if (client != null) {
				client.close();
			}
			if (resp != null) {
				resp.close();
			}
		}
	}

}
