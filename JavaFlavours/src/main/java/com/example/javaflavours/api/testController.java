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


    @PostMapping("/prenota")    //controller 1
    public Map<String,Object> prenotazione(@RequestBody Map<String,Object> body){
        //String a=f.get("stringa");
        Map<String,Object> response=new HashMap<>();

        int posti=(int) (body.get("posti"));
        prenotazione pr=new prenotazione((String)body.get("email"),(String)body.get("data"),posti);
        String risposta=pr.inserisci();
        response.put("message",risposta);
        response.put("id",pr.getId());

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


    @GetMapping("/menu")    //controller 3
    public List<Map<String, String>> ottieniMenu() {
        piatto piatto = new piatto();
        return piatto.prendi();
    }

    @PostMapping("/comanda")    //controller 3
    public Map<String,Object> comanda(@RequestBody Map<String,Object> body){

        Map<String,Object> response=new HashMap<>();

        int pren=(int) body.get("id");
        List<Map<String, Object>> piatti = (List<Map<String, Object>>) body.get("piatti");
        for(Map<String, Object> piatto:piatti){
            double prezzo = ((Number) piatto.get("prezzo")).doubleValue();
            piatto pt=new piatto((int) piatto.get("id"),(String) piatto.get("nome"),prezzo);
            pt.ordina(pren);
        }

        response.put("validation",true);
        return response;
    }

    @PostMapping("/asporto") //controller 3
    public Map<String,Object> asporto(@RequestBody Map<String,Object> body){
        Map<String,Object> response=new HashMap<>();
        prenotazione pr=new prenotazione();
        pr.setEmail((String)body.get("email"));
        pr.setData((String)body.get("data"));
        boolean validation=pr.asporto();
        response.put("validation",validation);
        response.put("id",pr.getId());

        return response;
    }



   /* @PostMapping("/comAsporto")    //controller 2,3 ?
    public Map<String,Object> comAsporto(@RequestBody Map<String,Object> body){
        Map<String,Object> response=new HashMap<>();
        prenotazione pr=new prenotazione();
        pr.asporto();
        response.put("validation",true);
        response.put("id",pr.getId());
        return response;
    }*/





    @GetMapping("/vispreno")
    public List<Map<String, Object>> ottieniPreno(){
        prenotazione pr=new prenotazione();

        return pr.prendiPren();

    }

    @PostMapping("/visord")
    public List<Map<String, Object>> ottieniordini(@RequestBody Map<String,Object> body){
        prenotazione pr=new prenotazione();
        String mail=(String)body.get("mail");
        return pr.prendiOrd(mail);

    }

    @GetMapping("/visasp")
    public List<Map<String, Object>> ottieniasporto(){
        prenotazione pr=new prenotazione();
        return pr.prendiAsp();

    }


}
