package com.example.javaflavours.model;

import java.sql.*;
import java.util.*;

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
            String sql="INSERT INTO prenotazione (mail,persone,data) VALUES ('"+this.email+"',"+this.posti+",'"+this.data+"')";
            //ResultSet rs=stmt.executeQuery(sql);
            stmt.executeUpdate(sql);
        }catch(Exception e){
            System.out.println("errore");
        }
    }

    public void valida(String email){

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
