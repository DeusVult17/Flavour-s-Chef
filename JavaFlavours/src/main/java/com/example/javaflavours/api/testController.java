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

    @GetMapping("/saluto")
    public String ciao(){
        return "ciao";
    }

    @GetMapping("/test")
    public String hey(){
        return "shoutouts to simpleflips :D";
    }

    @GetMapping("/prova")
    public int bho(){
        return 2;
    }

    @PostMapping("/prenota")
    public Map<String,String> prenotazione(@RequestBody Map<String,String> form){
        //String a=f.get("stringa");
        Map<String,String> response=new HashMap<>();
        response.put("message","ciao");
        int posti=Integer.parseInt(form.get("posti"));
        prenotazione pr=new prenotazione(form.get("email"),form.get("data"),posti);
        pr.inserisci();
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
