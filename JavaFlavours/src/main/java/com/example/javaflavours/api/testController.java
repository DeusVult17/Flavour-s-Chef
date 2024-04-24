package com.example.javaflavours.api;


import com.example.javaflavours.model.prenotazione;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;


@RestController
public class testController {

    @GetMapping("/test")
    public String hey(){
        return "shoutouts to simpleflips :D";
    }

    @PostMapping("/prenota")
    public Map<String,String> prenotazione(@RequestBody Map<String,String> form){
        //String a=f.get("stringa");
        Map<String,String> response=new HashMap<>();

        int posti=Integer.parseInt(form.get("posti"));
        prenotazione pr=new prenotazione(form.get("email"),form.get("data"),posti);
        String risposta=pr.inserisci();
        response.put("message",risposta);
        return response;
    }

    @PostMapping("/ordina")
    public Map<String,String> ordinazione(@RequestBody Map<String,String> form){
        Map<String,String> response=new HashMap<>();
        response.put("email",form.get("email"));

        prenotazione pr=new prenotazione();
        pr.valida(form.get("email"));

        return response;
    }


}
