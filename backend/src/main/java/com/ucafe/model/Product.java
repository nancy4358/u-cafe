package com.ucafe.model;

public record Product(
        int id,
        int categoryId,
        String category,
        String name,
        String slug,
        String description,
        String content,
        int price,
        String imageUrl) {}
