package com.ucafe.controller;

import com.ucafe.data.DataStore;
import com.ucafe.model.Category;
import com.ucafe.model.ProductCategory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CategoryController {

    @GetMapping("/categories")
    public List<Category> listCategories() {
        return DataStore.CATEGORIES;
    }

    @GetMapping("/product-categories")
    public List<ProductCategory> listProductCategories() {
        return DataStore.PRODUCT_CATEGORIES;
    }
}
