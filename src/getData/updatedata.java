package getData;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.sql.Statement;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONException;
import org.json.JSONObject;

/**
 * Servlet implementation class updatedata
 */
@WebServlet("/updatedata")
public class updatedata extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public updatedata() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		String query=request.getParameter("query");
	   	try {
            // registers Oracle JDBC driver - though this is no longer required
            // since JDBC 4.0, but added here for backward compatibility
            Class.forName("oracle.jdbc.OracleDriver");
 
            // METHOD #1
            String username="system";
            String password="oracle";
            String dbURL="jdbc:oracle:thin:@(DESCRIPTION =(ADDRESS_LIST =(ADDRESS =(PROTOCOL=TCP)(HOST=localhost)(PORT=49161)))(CONNECT_DATA=(SID=xe)(SERVER=DEDICATED)))";


            Connection conn = DriverManager.getConnection(dbURL,username,password);
            Statement statement = conn.createStatement();
            System.out.println(query);
			statement.execute(query);

		} catch (ClassNotFoundException ex) {ex.printStackTrace();
        } catch (SQLException ex) {ex.printStackTrace();
        } finally {}

	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub

		//doGet(request, response);
	     		response.setContentType("application/json");       
	            StringBuilder sb = new StringBuilder();
	            String s;
	            while ((s = request.getReader().readLine()) != null) {
	                sb.append(s);
	                System.out.println(s);
	            }
	            System.out.println(sb.toString());
	            /*
	            try {
					JSONObject jObject = new JSONObject(sb.toString());
					String tablename=jObject.getString("tablename");
					String column=jObject.getString("column");
					String newval=jObject.getString("val");
					String rowid=jObject.getString("rowid");
					String query="Update  "+tablename+" set "+column+"='"+newval+"' where rowid='"+rowid+"'";
					System.out.println(query);
					
				   	try {
			            // registers Oracle JDBC driver - though this is no longer required
			            // since JDBC 4.0, but added here for backward compatibility
			            Class.forName("oracle.jdbc.OracleDriver");
			 
			            // METHOD #1
			            String username="system";
			            String password="oracle";
			            String dbURL="jdbc:oracle:thin:@(DESCRIPTION =(ADDRESS_LIST =(ADDRESS =(PROTOCOL=TCP)(HOST=localhost)(PORT=49161)))(CONNECT_DATA=(SID=xe)(SERVER=DEDICATED)))";


			            Connection conn = DriverManager.getConnection(dbURL,username,password);
			            Statement statement = conn.createStatement();
			            System.out.println(query);
						statement.execute(query);

					} catch (ClassNotFoundException ex) {ex.printStackTrace();
			        } catch (SQLException ex) {ex.printStackTrace();
			        } finally {}

				} catch (JSONException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
*/
}
}