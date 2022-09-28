<!DOCTYPE html>
<html>
<head>
    <meta charset="ISO-8859-1">
    <title>Insert title here</title>
    <SCRIPT LANGUAGE="JavaScript">
        function cl()
        {
            window.location.href = "/test1/AddData.jsp";
        }
    </SCRIPT>
</head>
<body>
<%@ page import="java.sql.*" %>
<%
  Connection con_create= DriverManager.getConnection("jdbc:mysql://localhost:3306/a1", "root", "1234");
  String sq_create = " create table emp (eid int,ename varchar(10),doj date,yoe int,designation varchar);";
  Statement stmt_create = con_create.createStatement();
  try{
      stmt_create.executeQuery(sq_create);
      con_create.commit();
      }
  catch(Exception ex){ }
  con_create.close();
%>
<%
  Connection connection= DriverManager.getConnection("jdbc:mysql://localhost:3306/a1", "root", "1234");
  String sq = "select count(EID) from emp;";
  try{
      Statement statement = connection.createStatement();
      ResultSet result = statement.executeQuery(sq);
      int n1=0;
      result.next();
      n1 = result.getInt(1);

      if(n1<=0){
        Connection conn1= DriverManager.getConnection("jdbc:mysql://localhost:3306/a1", "root", "1234");
        String insert1 = "insert into emp values(1,'X','2010-8-22',6,'SE'),"+
                "(2,'Y','2011-8-02',6,'SE'),(3,'XY','2010-8-22',6,'SE');";
        Statement stmt = conn1.createStatement();
        try{
            stmt.executeQuery(insert1);
        }
        catch(Exception ex){
            out.println(ex.getMessage());
        }
        conn1.close();
      }else{}
  }catch(Exception ex){
      out.println(ex.getMessage());
  }
  connection.close();
%>
<center>
    <div>
    <form action = "homePage.jsp" method = "GET">
             <input type = "text" name = "search_" placeholder='Search by ID'>
             <input type = "submit" value = "Search" style='height:20px;width:50px' />
             <Button class='but' id='b1' type='button' style='height:20px;width:50px' onclick='cl()'> ADD</Button>
    </form>

    <table border = "1" >
        <tr>
           <th>Employee ID</th>
           <th>Employee Name</th>
           <th>Date of Joining</th>
           <th>Year of Experience</th>
           <th>Designation</th>
        </tr>
<%!
public String fd(String q) {
    return q;
    }
%>
<%!
    public String fetchData(String q) {
    String table_sq;
        StringBuilder sr=new StringBuilder();
        if(q==null || q==""){
          table_sq = "select * from emp order by eid;";
        }else{
            table_sq = "select * from emp where eid like "+q+" order by eid ;";
        }
        try{
            Connection table_con= DriverManager.getConnection("jdbc:mysql://localhost:3306/a1", "root", "1234");
            Statement table_smt = table_con.createStatement();
            ResultSet result_t = table_smt.executeQuery(table_sq);
            while(result_t.next()){
                sr.append("<tr>");
                sr.append("<td>"+result_t.getInt("eid")+"</td>");
                sr.append("<td>"+result_t.getString("ename")+"</td>");
                sr.append("<td>"+result_t.getString("doj")+"</td>");
                sr.append("<td>"+result_t.getInt("yoe")+"</td>");
                sr.append("<td>"+result_t.getString("designation")+"</td>");
                sr.append("</tr>");
            }
            table_con.close();
        }catch(Exception ex){
        System.out.print(ex.getMessage());
        }
        return sr.toString();
    }
%>
<%
out.println(fetchData(request.getParameter("search_")));
%>
</table>
</div>
<center>
</body>
</html>