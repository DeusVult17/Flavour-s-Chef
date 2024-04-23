package com.example.javaflavours.api;

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

    @PostMapping("/prenota")
    public Map<String,String> woo(@RequestBody Map<String,String> f){
        //String a=f.get("stringa");
        Map<String,String> response=new HashMap<>();
        response.put("email",f.get("email"));
        response.put("posti",f.get("posti"));
        response.put("data",f.get("data"));
        return response;
    }


}
