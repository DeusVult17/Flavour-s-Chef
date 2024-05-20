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
public class adminController {

    @PostMapping("/elimina")
    public Map<String,Object> elimina(@RequestBody Map<String,Object> body){
        Map<String,Object> response=new HashMap<>();
        prenotazione pr=new prenotazione();
        pr.setEmail((String)body.get("email"));
        pr.setData((String)body.get("data"));
        int tavolo=(int) body.get("tavolo");

        boolean validation=pr.elimina(tavolo);
        response.put("validation",validation);
        return response;
    }


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
