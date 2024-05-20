package com.example.javaflavours.model;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.Map;
import java.util.HashMap;
import java.util.*;
public class piatto {
    private int id;
    private String nome;
    private double prezzo;

    public piatto() {
    }

    public piatto(int id, String nome, double prezzo) {
        this.id = id;
        this.nome = nome;
        this.prezzo = prezzo;
    }

    public void ordina(int pren){

        Connection cn = null;

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            cn = DriverManager.getConnection("jdbc:mysql://localhost/flavourschef", "root", "Password12");
            Statement stmt = cn.createStatement();
            String sql = "SELECT * FROM contiene WHERE codpre="+pren+" AND codPia="+this.id+"";

            ResultSet rs = stmt.executeQuery(sql);

            if(rs.next()){
                int q=rs.getInt("quantita");
                q++;
                sql="UPDATE contiene SET quantita="+q+" WHERE codpre="+pren+" AND codPia="+this.id+"";
                Statement stmt2 = cn.createStatement();
                stmt2.executeUpdate(sql);
            }else{
                sql="INSERT INTO contiene (codPia,codPre,quantita) VALUES ("+this.id+","+pren+",1)";
                Statement stmt2 = cn.createStatement();
                stmt2.executeUpdate(sql);
            }

            cn.close();
        } catch (Exception e) {
            System.out.println(e);
        }

    }

    public List<Map<String, String>> prendi() {
        List<Map<String, String>> response = new ArrayList<>();
        Connection cn = null;

        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
            cn = DriverManager.getConnection("jdbc:mysql://localhost/flavourschef", "root", "Password12");
            Statement stmt = cn.createStatement();
            String sql = "SELECT * FROM piatto";
            ResultSet rs = stmt.executeQuery(sql);
            while (rs.next()) {
                int id = rs.getInt("codPia");
                String nome = rs.getString("nome");
                double prezzo = rs.getDouble("prezzo");
                Map<String, String> row = new HashMap<>();
                row.put("id", Integer.toString(id));
                row.put("nome", nome);
                row.put("prezzo", String.valueOf(prezzo));
                response.add(row);
            }
            cn.close();
        } catch (Exception e) {
            System.out.println(e);
        }
        return response;
    }






    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public double getPrezzo() {
        return prezzo;
    }

    public void setPrezzo(double prezzo) {
        this.prezzo = prezzo;
    }
}
