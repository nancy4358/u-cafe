package com.ucafe.controller;

import com.ucafe.data.DataStore;
import com.ucafe.model.Banner;
import com.ucafe.model.CategoryBanner;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class BannerController {

    @GetMapping("/banners")
    public List<Banner> listBanners() {
        return DataStore.BANNERS;
    }

    @GetMapping("/category-banners")
    public List<CategoryBanner> listCategoryBanners() {
        return DataStore.CATEGORY_BANNERS;
    }
}
