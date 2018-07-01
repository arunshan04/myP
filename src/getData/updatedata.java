package getData;

import java.io.BufferedReader;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Iterator;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.HTTP;
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
		 StringBuffer jb = new StringBuffer();
		  String line = null;
		  try {
		    BufferedReader reader = request.getReader();
		    while ((line = reader.readLine()) != null)
		      jb.append(line.trim());
		  } catch (Exception e) { /*report an error*/ }
		  System.out.println(jb.toString());
		  String query=request.getParameter("data");
		  System.out.println("********************"+query);
		try {
			JSONObject jObject 	= new JSONObject (jb.toString());
			JSONObject data 	= (JSONObject) jObject.get("data");
			JSONObject rows 	= (JSONObject) data.get("rows");
			String		tablename = (String) data.get("table");

			Class.forName("oracle.jdbc.OracleDriver");
            String username="system";
            String password="oracle";
            String dbURL="jdbc:oracle:thin:@(DESCRIPTION =(ADDRESS_LIST =(ADDRESS =(PROTOCOL=TCP)(HOST=localhost)(PORT=49161)))(CONNECT_DATA=(SID=xe)(SERVER=DEDICATED)))";

            
            Connection conn = DriverManager.getConnection(dbURL,username,password);
            



			System.out.println(rows);
			System.out.println(tablename);
			
			Iterator<?> keys = rows.keys();
			while(keys.hasNext() ) {
				String rowid = (String)keys.next();
				System.out.println(rowid);
				if ( rows.get(rowid) instanceof JSONObject ) {
					JSONObject columns = (JSONObject) rows.get(rowid);
					Iterator<?> keys1 = columns.keys();
					while(keys1.hasNext() ) {
						String columnName=(String)keys1.next();
						String columnValue=(String)columns.get(columnName);
						String updateTableSQL = "UPDATE "+tablename+" SET "+columnName+" = ? WHERE rowid = ?";
						PreparedStatement preparedStatement = conn.prepareStatement(updateTableSQL);
						preparedStatement.setString(1, columnValue);
						preparedStatement.setString(2, rowid);
						System.out.println(updateTableSQL);
						preparedStatement.executeUpdate();
						System.out.println(rowid+columnName+columnValue+preparedStatement.getUpdateCount());
						
					}
					

				}

			}
			
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (ClassNotFoundException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		

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