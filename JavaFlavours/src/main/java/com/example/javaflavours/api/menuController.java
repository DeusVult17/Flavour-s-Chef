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
public class menuController {

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
}
