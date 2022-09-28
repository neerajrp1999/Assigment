package all;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Enumeration;

@WebServlet("/data1")
public class serv extends HttpServlet {
    private static final long serialVersionUID = 1L;

    public serv() {

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.getWriter().append("Served at: ").append(request.getContextPath());
    }

    protected void doPost(HttpServletRequest request, HttpServletResponse res) throws ServletException, IOException {

        Enumeration paramNames = request.getParameterNames();
        ArrayList<String>  arrayList=new ArrayList<>();
        while(paramNames.hasMoreElements()) {
            String paramName = (String) paramNames.nextElement();
            String[] paramValues = request.getParameterValues(paramName);
            arrayList.add(Arrays.toString(paramValues));
        }
        String[] aa=arrayList.get(0).split("_");
        int id=Integer.parseInt(aa[0].replace("[","").replace("]","").trim());
        int yoe_int=Integer.parseInt(arrayList.get(1).replace("[","").replace("]","").trim());
        String des=arrayList.get(2).replace("[","").replace("]","").trim();

       try{
           Connection conn= DriverManager.getConnection("jdbc:mysql://localhost:3306/a1", "root", "1234");

           String query = " update emp set yoe=? , designation=? where eid=?;";

           PreparedStatement preparedStmt = conn.prepareStatement(query);
           preparedStmt.setInt(1, yoe_int);
           preparedStmt.setString (2, des);
           preparedStmt.setInt  (3, id);

           preparedStmt.execute();

           conn.close();
       }catch (Exception e){
           System.out.println(e.toString());
       }
       finally {
           res.sendRedirect("http://localhost:8080/test1");
       }

    }

}
