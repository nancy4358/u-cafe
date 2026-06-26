package com.ucafe.controller;

import com.ucafe.data.DataStore;
import com.ucafe.exception.ResourceNotFoundException;
import com.ucafe.model.Product;
import com.ucafe.model.ProductCategory;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ProductController {

    @GetMapping("/products")
    public List<Product> listProducts(@RequestParam(name = "category_slug", required = false) String categorySlug) {
        if (categorySlug == null) {
            return DataStore.PRODUCTS;
        }

        ProductCategory category = DataStore.PRODUCT_CATEGORIES.stream()
            .filter(c -> c.slug().equals(categorySlug))
            .findFirst()
            .orElseThrow(() -> new ResourceNotFoundException("Product category not found"));

        return DataStore.PRODUCTS.stream()
            .filter(p -> p.categoryId() == category.id())
            .toList();
    }

    @GetMapping("/products/detail/{slug}")
    public Product getProduct(@PathVariable String slug) {
        return DataStore.PRODUCTS.stream()
            .filter(p -> p.slug().equals(slug))
            .findFirst()
            .orElseThrow(() -> new ResourceNotFoundException("Product not found"));
    }
}
