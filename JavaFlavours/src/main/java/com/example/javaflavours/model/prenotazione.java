package com.example.javaflavours.model;

import java.sql.*;
import java.util.*;
import javax.mail.*;
import javax.mail.internet.*;
import java.text.SimpleDateFormat;
import javax.xml.transform.Result;
import java.util.Date;

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
                    setId(codice);
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

    /*public boolean comanda(int id){
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
    }*/

    public List<Map<String, Object>> prendiPren() {
        List<Map<String, Object>> response = new ArrayList<>();
        Connection cn = null;

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            cn = DriverManager.getConnection("jdbc:mysql://localhost/flavourschef", "root", "");
            Statement stmt = cn.createStatement();
            String sql = "SELECT mail,prenotazione.data,nPersone,tavolo.numTav FROM prenotazione INNER JOIN assegnato ON prenotazione.codPre=assegnato.codPre INNER JOIN tavolo ON assegnato.numTav=tavolo.numTav ORDER BY data";
            ResultSet rs = stmt.executeQuery(sql);

            while (rs.next()) {
                String mail = rs.getString("mail");
                Date datesql = rs.getDate("data");
                SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
                String data = dateFormat.format(datesql);
                int persone=rs.getInt("nPersone");
                int tavolo=rs.getInt("numTav");

                Map<String, Object> row = new HashMap<>();
                row.put("email", mail);
                row.put("data", data);
                row.put("persone", persone);
                row.put("tavolo", tavolo);
                response.add(row);
            }

            cn.close();
        } catch (Exception e) {
            System.out.println(e);
        }
        return response;
    }

    public List<Map<String, Object>> prendiOrd(String mail) {
        List<Map<String, Object>> response = new ArrayList<>();
        Connection cn = null;

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            cn = DriverManager.getConnection("jdbc:mysql://localhost/flavourschef", "root", "");
            Statement stmt = cn.createStatement();
            String sql = "SELECT DISTINCT piatto.nome,quantita FROM piatto INNER JOIN contiene ON piatto.codPia=contiene.codPia INNER JOIN prenotazione ON contiene.codPre=prenotazione.codPre WHERE mail='"+mail+"'";
            ResultSet rs = stmt.executeQuery(sql);

            while (rs.next()) {
                String piatto=rs.getString("nome");
                int quantita=rs.getInt("quantita");

                Map<String, Object> row = new HashMap<>();
                row.put("piatto", piatto);
                row.put("quantita", quantita);
                response.add(row);
            }

            cn.close();
        } catch (Exception e) {
            System.out.println(e);
        }
        return response;
    }


    public List<Map<String, Object>> prendiAsp() {
        List<Map<String, Object>> response = new ArrayList<>();
        Connection cn = null;

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            cn = DriverManager.getConnection("jdbc:mysql://localhost/flavourschef", "root", "");
            Statement stmt = cn.createStatement();
            String sql = "SELECT mail,prenotazione.data FROM prenotazione WHERE tipo=1 ORDER BY data";
            ResultSet rs = stmt.executeQuery(sql);

            while (rs.next()) {
                String mail = rs.getString("mail");
                Date datesql = rs.getDate("data");
                SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
                String data = dateFormat.format(datesql);
                int persone=0;
                int tavolo=0;

                Map<String, Object> row = new HashMap<>();
                row.put("email", mail);
                row.put("data", data);
                row.put("persone", persone);
                row.put("tavolo", tavolo);
                response.add(row);
            }

            cn.close();
        } catch (Exception e) {
            System.out.println(e);
        }
        return response;
    }




    public boolean asporto(){

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
