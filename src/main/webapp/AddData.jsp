<!DOCTYPE html>
<html>
<style>
* {
  box-sizing: border-box;
}
.column {
  float: left;
  width: 25%;
  padding: 10px;
}
.row:after {
  content: "";
  display: table;
  clear: both;
}
</style>
<SCRIPT LANGUAGE="JavaScript">
        function call(){
            if(required()==true){
            alert("Update Done");
            }
            else{
            alert("Please fill all values");
            }
        }
        function required()
        {
            var empt = document.getElementById("name1").value;
            var empt2 = document.getElementById("yoe").value;
            var empt3 = document.getElementById("d").value;
            if (empt == "" || empt2 == "" || empt3 == "" ){

                return false;
            }
            else{
                return true;
            }
        }
        function Cancel_b()
        {
            window.location.href = "/test1/";
        }
        function onlyNumberKey(evt) {
            var ASCIICode = (evt.which) ? evt.which : evt.keyCode
            if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
                return false;
            return true;
        }
        function ChangeTheName()
        {
            var x = document.getElementById("eid_").value;
            if(x=='null'){
                document.getElementById("name1").value = '';
            }
            else{
                const myArray = x.split("_");
                document.getElementById("name1").value = myArray[1];
            }
        }
    </SCRIPT>
<head>
    <meta charset="ISO-8859-1">
    <title>Insert title here</title>
</head>
<body>
<%@ page import="java.sql.*" %>
<div style="float: center; border: black ";>
<center>
<form onsubmit="return call()" action = "data.jsp" method = "POST">
<div class="row">
  <div class="column" >
    <p>ADD Employee</p>
  </div>
</div>

<div class="row">
  <div class="column" >
    <p>Employee ID:</p>
  </div>
  <div class="column" >
    <select id="eid_" name="eid_" onchange="ChangeTheName()" style='width: 25%;'>
        <option value='null'></option>
          <% out.println(getIDList());%>
    </select>
  </div>
</div>

<div class="row">
  <div class="column" >
    <p>Employee Name:</p>
  </div>
  <div class="column" >
    <input type="text" id="name1" readonly />
  </div>
</div>

<div class="row">
  <div class="column" >
    <p>Year Of Experience:</p>
  </div>
  <div class="column" >
    <input type="number" id="yoe" name="yoe" onkeypress="return onlyNumberKey(event)" />
  </div>
</div>

<div class="row">
  <div class="column" >
    <p>Designation:</p>
  </div>
  <div class="column" >
    <input type="text" id="d" name="d" />
  </div>
</div>

<div class="row">
  <div class="column" >
  </div>
  <div class="column" >
    <Button type="submit" id="submitB">Save</Button>
    <Button id="CancelB" onclick='Cancel_b()'>Cancel</Button>
  </div>
</div>

</div>
</form>
<%!
  public String getIDList(){
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

</center>
</body>
</html>