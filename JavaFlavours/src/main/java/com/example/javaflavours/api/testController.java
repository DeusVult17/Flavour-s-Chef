package com.example.javaflavours.api;


import com.example.javaflavours.model.piatto;
import com.example.javaflavours.model.prenotazione;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.*;

@RestController
public class testController {

    @GetMapping("/test")
    public String hey(){
        return "shoutouts to simpleflips :D";
    }

    @PostMapping("/prenota")
    public Map<String,String> prenotazione(@RequestBody Map<String,String> body){
        //String a=f.get("stringa");
        Map<String,String> response=new HashMap<>();

        int posti=Integer.parseInt(body.get("posti"));
        prenotazione pr=new prenotazione(body.get("email"),body.get("data"),posti);
        String risposta=pr.inserisci();
        response.put("message",risposta);
        return response;
    }

    @PostMapping("/ordina")
    public Map<String,Object> ordinazione(@RequestBody Map<String,String> body){
        Map<String,Object> response=new HashMap<>();
        prenotazione pr=new prenotazione();
        boolean validation=pr.valida(body.get("email"));
        response.put("validation",validation);
        response.put("id",pr.getId());
        return response;
    }


    @GetMapping("/menu")
    public List<Map<String, String>> ottieniMenu() {
        piatto piatto = new piatto();
        return piatto.prendi();
    }

    @PostMapping("/comanda")
    public Map<String,Object> comanda(@RequestBody Map<String,Object> body){
        Map<String,Object> response=new HashMap<>();
        prenotazione pr=new prenotazione();
        int id=(int) body.get("id");
        boolean manda=pr.comanda(id);
        response.put("validation",manda);
        return response;
    }

    @PostMapping("/asporto")
    public Map<String,Object> asporto(@RequestBody Map<String,Object> body){
        Map<String,Object> response=new HashMap<>();
        prenotazione pr=new prenotazione();


        
        return response;
    }



    @PostMapping("/ordAsporto")
    public Map<String,Object> ordAsporto(@RequestBody Map<String,Object> body){
        Map<String,Object> response=new HashMap<>();
        prenotazione pr=new prenotazione();
        pr.setEmail((String)body.get("email"));
        pr.setData((String)body.get("data"));
        boolean validation=pr.ordAsporto();
        response.put("validation",validation);
        response.put("id",pr.getId());

        return response;
    }



}
