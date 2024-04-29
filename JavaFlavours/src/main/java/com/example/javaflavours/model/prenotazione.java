package com.example.javaflavours.model;

import java.sql.*;
import java.util.*;
import javax.mail.*;
import javax.mail.internet.*;
import javax.xml.transform.Result;

public class prenotazione {
    String email;
    String data;
    int posti;

    int id;

    public prenotazione(){

    }

    public prenotazione(String email, String data, int posti) {
        this.email = email;
        this.data = data;
        this.posti = posti;
    }


    public String inserisci(){
        Connection cn=null;

        try{
            Class.forName("com.mysql.cj.jdbc.Driver");
            cn=DriverManager.getConnection("jdbc:mysql://localhost/flavourschef","root","");
            Statement stmt=cn.createStatement();
            //mail();   METODO PER LA MAIL,DA DECOMMETNARE POI

            String sql="SELECT * FROM tavolo WHERE capacita>="+this.posti+"";
            ResultSet rs=stmt.executeQuery(sql);
            while(rs.next()){
                int numTav=rs.getInt("numTav");
                sql="SELECT * FROM tavolo INNER JOIN assegnato ON tavolo.numTav=assegnato.numTav " +
                        "WHERE tavolo.numTav="+rs.getInt("numTav")+" AND assegnato.dataOccu='"+this.getData()+"'";

                Statement stmt1=cn.createStatement();
                ResultSet rs2=stmt1.executeQuery(sql);

                if(!rs2.next()){
                    sql="INSERT INTO prenotazione (mail,nPersone,data) VALUES ('"+this.email+"',"+this.posti+",'"+this.data+"');";
                    stmt1.executeUpdate(sql);

                    Statement stmt2=cn.createStatement();
                    sql="SELECT LAST_INSERT_ID();";
                    rs2=stmt2.executeQuery(sql);
                    rs2.next();

                    int codice=rs2.getInt("LAST_INSERT_ID()");
                    sql="INSERT INTO assegnato (codPre,numTav,dataOccu) VALUES ("+codice+","+numTav+",'"+this.data+"')";
                    stmt2.executeUpdate(sql);
                    cn.close();
                    return "si";

                }
            }
            cn.close();
            return "no";

        }catch(Exception e){
            System.out.println(e);
            return "errore";
        }
    }

    public boolean valida(String email){
        Connection cn=null;
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            cn = DriverManager.getConnection("jdbc:mysql://localhost/flavourschef", "root", "");
            Statement stmt = cn.createStatement();
            String sql = "SELECT * from prenotazione WHERE mail='"+email+"'";
            ResultSet rs = stmt.executeQuery(sql);
            if(rs.next()){
                setId(rs.getInt("codPre"));
                return true;
            }else{
                return false;
            }
        }catch (Exception e){
            return false;
        }
    }

    public boolean comanda(int id){
        Connection cn=null;
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            cn = DriverManager.getConnection("jdbc:mysql://localhost/flavourschef", "root", "");
            Statement stmt = cn.createStatement();

            String sql = "DELETE from prenotazione WHERE codPre="+id+"";
            stmt.executeQuery(sql);
            sql = "DELETE from assegnato WHERE codPre="+id+"";
            return true;
        }catch (Exception e){
            return false;
        }
    }

    public boolean asporto(int id){
        Connection cn=null;
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            cn = DriverManager.getConnection("jdbc:mysql://localhost/flavourschef", "root", "");
            Statement stmt = cn.createStatement();

            String sql = "DELETE from prenotazione WHERE codPre="+id+"";
            stmt.executeQuery(sql);
            sql = "DELETE from assegnato WHERE codPre="+id+"";
            return true;
        }catch (Exception e){
            return false;
        }
    }


    public boolean ordAsporto(){

        Connection cn=null;
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            cn = DriverManager.getConnection("jdbc:mysql://localhost/flavourschef", "root", "");
            Statement stmt = cn.createStatement();

            String sql = "INSERT INTO prenotazione (mail,tipo,data) VALUES ('"+this.email+"',"+1+",'"+this.data+"')";
            System.out.println(sql);
            stmt.executeUpdate(sql);
            sql="SELECT LAST_INSERT_ID();";
            Statement stmt2 = cn.createStatement();
            ResultSet rs=stmt2.executeQuery(sql);
            rs.next();
            int a=rs.getInt("LAST_INSERT_ID()");

            setId(a);

            return true;
        }catch (Exception e){
            System.out.println(e);
            return false;
        }


    }


    public void mail(){
        String host = "smtp.gmail.com";
        String port = "587";
        String username = "mail";  //STA ROBA VA CAMBIATA CON LA FAKE MAIL DEL PROGRAMMA
        String password = "ppassword"; // THE SAME


        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", host);
        props.put("mail.smtp.port", port);

        Session session = Session.getInstance(props, new Authenticator() {
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(username, password);
            }
        });

        try {

            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress("hxhprd05t15e507v@iisbadoni.edu.it"));
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse("paride.hoxha@gmail.com"));
            message.setSubject("Benvenuto su flavourschef");
            message.setText("Shoutouts to Simpleflips");
            Transport.send(message);

        } catch (MessagingException e) {
            e.printStackTrace();
        }
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getData() {
        return data;
    }

    public void setData(String data) {
        this.data = data;
    }

    public int getPosti() {
        return posti;
    }

    public void setPosti(int posti) {
        this.posti = posti;
    }
}
