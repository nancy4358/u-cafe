package com.ucafe.controller;

import com.ucafe.data.DataStore;
import com.ucafe.exception.ResourceNotFoundException;
import com.ucafe.model.Store;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class StoreController {

    @GetMapping("/stores")
    public List<Store> listStores() {
        return DataStore.STORES;
    }

    @GetMapping("/stores/{slug}")
    public Store getStore(@PathVariable String slug) {
        return DataStore.STORES.stream()
            .filter(s -> s.slug().equals(slug))
            .findFirst()
            .orElseThrow(() -> new ResourceNotFoundException("Store not found"));
    }
}
