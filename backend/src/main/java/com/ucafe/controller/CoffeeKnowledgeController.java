package com.ucafe.controller;

import com.ucafe.data.DataStore;
import com.ucafe.exception.ResourceNotFoundException;
import com.ucafe.model.CoffeeArticle;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CoffeeKnowledgeController {

    @GetMapping("/coffee-knowledge")
    public List<CoffeeArticle> listArticles() {
        return DataStore.COFFEE_KNOWLEDGE_ARTICLES;
    }

    @GetMapping("/coffee-knowledge/{slug}")
    public CoffeeArticle getArticle(@PathVariable String slug) {
        return DataStore.COFFEE_KNOWLEDGE_ARTICLES.stream()
            .filter(a -> a.slug().equals(slug))
            .findFirst()
            .orElseThrow(() -> new ResourceNotFoundException("Article not found"));
    }
}
