package com.ucafe.model;

import java.util.List;

public record CoffeeArticle(
        int id,
        String title,
        String slug,
        String summary,
        String content,
        String imageUrl,
        List<String> tags,
        String createdAt) {}
