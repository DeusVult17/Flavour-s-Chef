package com.example.javaflavours.api;


import com.example.javaflavours.model.piatto;
import com.example.javaflavours.model.prenotazione;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;
import java.util.*;

@RestController
public class ordinaController {


    @GetMapping("/start")
    public Map<String,Object> start(){
        Map<String,Object> response=new HashMap<>();
        LocalDate oggi = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        String data = oggi.format(formatter);
        prenotazione pr=new prenotazione();
        boolean validate=pr.start(data);

        return response;
    }

    @PostMapping("/prenota")
    public Map<String,Object> prenotazione(@RequestBody Map<String,Object> body){
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

}
