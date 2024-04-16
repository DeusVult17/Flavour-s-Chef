package com.example.flavourschef.api;

import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.HashMap;
import java.util.Map;

@RestController
public class testController {

    @GetMapping("/ciao")         // Getmapping fa la get di qualcosa, lo / e per la chiamata alle API
    public Map<String,String> banana(){
        Map<String,String> response=new HashMap<>();
        response.put("message","lamaddiratti");                                        //chiamerà sempre il metodo sotto di lui facendo quello che dice
        return response;
    }

    @PostMapping("/bye")    // postmapping fa la post e con ?qualcosa posso mandare i valori che voglio
    public int mela(@RequestParam int n){
        return n+1;
    }



    @PostMapping("/prenota")
    public String invia(){

        return "a";
    }




    @GetMapping("/abc/{n}")             //così facendo /abc/5 il valore di n sarà di 5 ma devo mettere pathvariable
    public int barbabietola(@PathVariable int n){
        return n+1;
    }
    // posso sempre fare delle classi a parte con la logica delle cose: metodi,altre classi ecc...
}
