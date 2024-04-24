package com.example.javaflavours.model;

import java.sql.*;
import java.util.*;
import javax.mail.*;
import javax.mail.internet.*;

public class prenotazione {
    String email;
    String data;
    int posti;

    public prenotazione(){

    }

    public prenotazione(String email, String data, int posti) {
        this.email = email;
        this.data = data;
        this.posti = posti;
    }


    public void inserisci(){
        Connection cn=null;
        try{
            Class.forName("com.mysql.cj.jdbc.Driver");
            cn=DriverManager.getConnection("jdbc:mysql://localhost/flavourschef","root","");
            Statement stmt=cn.createStatement();
            mail();

            /*String sql="";
            sql="INSERT INTO prenotazione (mail,persone,data) VALUES ('"+this.email+"',"+this.posti+",'"+this.data+"')";
            //ResultSet rs=stmt.executeQuery(sql);
            stmt.executeUpdate(sql);*/

        }catch(Exception e){
            System.out.println("errore");
        }
    }

    public void valida(String email){

    }








    public void mail(){
        String host = "smtp.gmail.com";
        String port = "587";
        String username = "hxhprd05t15e507v@iisbadoni.edu.it";  //STA ROBA VA CAMBIATA CON LA FAKE MAIL DEL PROGRAMMA
        String password = "ilbadoninonmipaga"; // THE SAME


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
