<!DOCTYPE html>
<html>
<head>
    <meta charset="ISO-8859-1">
    <title>Insert title here</title>
</head>
<body>
<%@ page import="java.sql.*" %>

<%!
  public String AddData(){
    String sq_s = "select distinct(EID),ENAME from emp;";
    StringBuilder sr1=new StringBuilder();
    try{
        Connection conn1= DriverManager.getConnection("jdbc:mysql://localhost:3306/a1", "root", "1234");
        Statement statement = conn1.createStatement();
        ResultSet result1 = statement.executeQuery(sq_s);
        while(result1.next()){
          int n1 = result1.getInt("EID");
          String name1 = result1.getString("ENAME");
          sr1.append("<option value='"+n1+"_"+name1+"'>"+n1+"</option>");
        }
        conn1.close();
    }catch(Exception ex){
        System.out.println(ex.getMessage());
    }
    return sr1.toString();
  }
%>
<%
out.println(request.getParameter("yoe"));
%>
</center>
</body>
</html>