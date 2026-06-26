package com.ucafe.data;

import com.ucafe.model.*;

import java.util.List;

public class DataStore {

    public static final List<ProductCategory> PRODUCT_CATEGORIES = List.of(
        new ProductCategory(1, "蛋糕", "cakes"),
        new ProductCategory(2, "餅乾", "cookies"),
        new ProductCategory(3, "濾掛咖啡", "drip-bags"),
        new ProductCategory(4, "咖啡豆", "beans")
    );

    public static final List<Category> CATEGORIES = List.of(
        new Category(1, "蛋糕", "cakes", "/categories/cake.png"),
        new Category(2, "餅乾", "cookies", "/categories/cookie.png"),
        new Category(3, "濾掛咖啡", "drip-bags", "/categories/a-cup-caffee.png"),
        new Category(4, "咖啡豆", "beans", "/categories/coffee-bean.png")
    );

    public static final List<Banner> BANNERS = List.of(
        new Banner(1, "/banners/cafe1.png"),
        new Banner(2, "/banners/cafe2.png"),
        new Banner(3, "/banners/banner03.png"),
        new Banner(4, "/banners/banner05.png")
    );

    public static final List<CategoryBanner> CATEGORY_BANNERS = List.of(
        new CategoryBanner(1, "/promo.jpg", "本週推薦", "精選甜點與咖啡豆，搭配你的日常咖啡時光。", "/products/cakes"),
        new CategoryBanner(2, "/coffeebook.png", "咖啡知識", "從風味、烘焙到沖煮，慢慢認識咖啡。", "/coffee-knowledge")
    );

    public static final List<Product> PRODUCTS = List.of(
        new Product(1, 2, "cookies", "燕麥餅乾", "oatmeal-cookie",
            "酥脆燕麥香氣，適合搭配美式咖啡。",
            "<p>使用燕麥與奶油製作，口感清爽不膩。</p>",
            120, "/products/oatmeal-cookie.png"),
        new Product(2, 2, "cookies", "巧克力餅乾", "chocolate-cookie",
            "濃郁可可風味，甜度溫和。",
            "<p>適合搭配拿鐵或卡布奇諾。</p>",
            130, "/products/chocolate-cookie.png"),
        new Product(3, 1, "cakes", "抹茶蛋糕", "matcha-cake",
            "抹茶清香與細緻蛋糕體。",
            "<p>茶香明顯，口感柔軟濕潤。</p>",
            160, "/products/matcha-cake.png"),
        new Product(4, 1, "cakes", "經典乳酪蛋糕", "cheesecake",
            "濃郁乳酪香，酸甜平衡。",
            "<p>冷藏後風味更細緻。</p>",
            180, "/products/cheesecake.png"),
        new Product(5, 3, "drip-bags", "經典濾掛咖啡", "classic-drip-bag",
            "方便沖煮，日常穩定風味。",
            "<p>適合辦公室與旅行攜帶。</p>",
            280, "/products/hand-drip-coffee-bag-.png"),
        new Product(6, 4, "beans", "哥倫比亞咖啡豆", "colombia-beans",
            "堅果、焦糖與柔和果酸。",
            "<p>中焙，適合手沖與義式。</p>",
            420, "/products/k01.png"),
        new Product(7, 4, "beans", "衣索比亞咖啡豆", "ethiopia-beans",
            "花香、柑橘與明亮酸質。",
            "<p>淺中焙，推薦手沖。</p>",
            460, "/products/k02.png")
    );

    public static final List<Store> STORES = List.of(
        new Store(1, "U CAFE 台北信義店", "taipei-xinyi", "台北市信義區咖啡路 1 號", "/stores/store1.png"),
        new Store(2, "U CAFE 台中勤美店", "taichung-calligraphy", "台中市西區綠園道 20 號", "/stores/store2.png"),
        new Store(3, "U CAFE 台南赤崁店", "tainan-chihkan", "台南市中西區赤崁街 8 號", "/stores/store3.png"),
        new Store(4, "U CAFE 高雄駁二店", "kaohsiung-pier2", "高雄市鹽埕區港邊路 12 號", "/stores/store4.png"),
        new Store(5, "U CAFE 花蓮海岸店", "hualien-coast", "花蓮縣花蓮市海岸路 66 號", "/stores/store5.png")
    );

    public static final List<CoffeeArticle> COFFEE_KNOWLEDGE_ARTICLES = List.of(
        new CoffeeArticle(1, "咖啡豆種類入門", "coffee-bean-types",
            "認識阿拉比卡與羅布斯塔，以及常見產區風味。",
            "<h2>從品種開始</h2><p>咖啡風味受到品種、產區、處理法與烘焙影響。初學者可以先從酸質、甜感、厚度三個方向品嘗。</p>",
            "/coffee-knowledge/coffee-type.png",
            List.of("咖啡豆", "產區", "風味"),
            "2026-05-01T00:00:00+08:00"),
        new CoffeeArticle(2, "咖啡與心情", "coffee-and-mood",
            "一杯咖啡如何成為日常節奏的一部分。",
            "<h2>日常儀式感</h2><p>咖啡因帶來精神感，也讓短暫休息變得有邊界。找到適合自己的飲用時間很重要。</p>",
            "/coffee-knowledge/coffee-mood.png",
            List.of("生活", "心情"),
            "2026-04-28T00:00:00+08:00"),
        new CoffeeArticle(3, "咖啡與睡眠", "coffee-and-sleep",
            "咖啡因代謝時間因人而異，晚間飲用要留意。",
            "<h2>飲用時間</h2><p>如果容易受咖啡因影響，可以把最後一杯咖啡安排在下午以前。</p>",
            "/coffee-knowledge/coffee-sleep.png",
            List.of("咖啡因", "睡眠"),
            "2026-04-20T00:00:00+08:00")
    );
}
