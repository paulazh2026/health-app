/**
 * 食物数据库
 * 包含常见中国食物的营养数据
 * 数据来源：中国食物成分表、小荷健康等（参考值）
 */

const FoodDatabase = {
    // 食物分类
    categories: [
        { id: 'staple', name: '主食', icon: '🍚' },
        { id: 'meat', name: '肉蛋类', icon: '🥩' },
        { id: 'vegetable', name: '蔬菜', icon: '🥬' },
        { id: 'fruit', name: '水果', icon: '🍎' },
        { id: 'dairy', name: '奶制品', icon: '🥛' },
        { id: 'seafood', name: '海鲜', icon: '🦐' },
        { id: 'dish', name: '中式菜肴', icon: '🥘' },
        { id: 'cafe', name: '咖啡店早餐', icon: '☕' },
        { id: 'snack', name: '零食饮品', icon: '🍪' },
        { id: 'custom', name: '自定义', icon: '➕' }
    ],

    // 食物列表（每100g的营养成分）
    foods: [
        // ==================== 主食类 ====================
        { id: 1, name: '米饭', category: 'staple', icon: '🍚', calories: 116, protein: 2.6, carbs: 25.9, fat: 0.3, unit: '碗(小)', unitGrams: 150 },
        { id: 2, name: '馒头', category: 'staple', icon: '🥟', calories: 223, protein: 7.0, carbs: 47.0, fat: 1.1, unit: '个', unitGrams: 100 },
        { id: 3, name: '面条', category: 'staple', icon: '🍜', calories: 109, protein: 2.7, carbs: 24.2, fat: 0.2, unit: '碗', unitGrams: 200 },
        { id: 4, name: '饺子', category: 'staple', icon: '🥟', calories: 198, protein: 7.0, carbs: 26.0, fat: 7.0, unit: '个', unitGrams: 25 },
        { id: 5, name: '包子', category: 'staple', icon: '🥟', calories: 227, protein: 6.4, carbs: 38.0, fat: 6.0, unit: '个', unitGrams: 80 },
        { id: 6, name: '粥', category: 'staple', icon: '🥣', calories: 46, protein: 1.1, carbs: 9.9, fat: 0.3, unit: '碗', unitGrams: 250 },
        { id: 7, name: '油条', category: 'staple', icon: '🥖', calories: 386, protein: 6.9, carbs: 51.0, fat: 17.6, unit: '根', unitGrams: 80 },
        { id: 8, name: '面包', category: 'staple', icon: '🍞', calories: 265, protein: 8.3, carbs: 50.0, fat: 3.3, unit: '片', unitGrams: 30 },
        { id: 9, name: '炒饭', category: 'staple', icon: '🍚', calories: 188, protein: 4.5, carbs: 30.0, fat: 6.0, unit: '碗', unitGrams: 200 },
        { id: 10, name: '炒面', category: 'staple', icon: '🍜', calories: 163, protein: 5.0, carbs: 25.0, fat: 5.0, unit: '份', unitGrams: 300 },
        { id: 11, name: '红薯', category: 'staple', icon: '🍠', calories: 90, protein: 0.7, carbs: 24.7, fat: 0.2, unit: '个', unitGrams: 200 },
        { id: 12, name: '紫薯', category: 'staple', icon: '🍠', calories: 82, protein: 1.0, carbs: 20.0, fat: 0.2, unit: '个', unitGrams: 150 },
        { id: 13, name: '玉米', category: 'staple', icon: '🌽', calories: 112, protein: 4.0, carbs: 22.8, fat: 1.2, unit: '根', unitGrams: 200 },
        { id: 14, name: '小米粥', category: 'staple', icon: '🥣', calories: 46, protein: 1.4, carbs: 9.7, fat: 0.3, unit: '碗', unitGrams: 250 },
        { id: 15, name: '燕麦片', category: 'staple', icon: '🥣', calories: 367, protein: 15.0, carbs: 66.0, fat: 6.7, unit: '份', unitGrams: 40 },
        { id: 16, name: '年糕', category: 'staple', icon: '🍡', calories: 154, protein: 3.3, carbs: 34.7, fat: 0.6, unit: '片', unitGrams: 50 },
        { id: 17, name: '汤圆', category: 'staple', icon: '🍡', calories: 311, protein: 5.0, carbs: 50.0, fat: 10.0, unit: '个', unitGrams: 20 },
        { id: 18, name: '烧饼', category: 'staple', icon: '🥯', calories: 293, protein: 7.5, carbs: 51.0, fat: 6.5, unit: '个', unitGrams: 80 },
        { id: 19, name: '花卷', category: 'staple', icon: '🥟', calories: 217, protein: 6.4, carbs: 45.0, fat: 1.0, unit: '个', unitGrams: 80 },
        { id: 20, name: '煎饼', category: 'staple', icon: '🥞', calories: 236, protein: 6.9, carbs: 41.0, fat: 5.0, unit: '份', unitGrams: 100 },

        // ==================== 肉蛋类 ====================
        { id: 21, name: '鸡蛋', category: 'meat', icon: '🥚', calories: 144, protein: 13.3, carbs: 2.8, fat: 8.8, unit: '个', unitGrams: 50 },
        { id: 22, name: '鸭蛋', category: 'meat', icon: '🥚', calories: 180, protein: 12.6, carbs: 3.1, fat: 13.0, unit: '个', unitGrams: 60 },
        { id: 23, name: '咸鸭蛋', category: 'meat', icon: '🥚', calories: 190, protein: 12.7, carbs: 4.7, fat: 12.7, unit: '个', unitGrams: 60 },
        { id: 24, name: '猪肉(瘦)', category: 'meat', icon: '🥩', calories: 143, protein: 20.3, carbs: 0.2, fat: 6.2, unit: '份', unitGrams: 100 },
        { id: 25, name: '猪肉(肥瘦)', category: 'meat', icon: '🥩', calories: 395, protein: 13.2, carbs: 0.2, fat: 37.0, unit: '份', unitGrams: 100 },
        { id: 26, name: '牛肉', category: 'meat', icon: '🥩', calories: 106, protein: 23.3, carbs: 1.2, fat: 2.3, unit: '份', unitGrams: 100 },
        { id: 27, name: '羊肉', category: 'meat', icon: '🍖', calories: 203, protein: 19.0, carbs: 0.1, fat: 14.1, unit: '份', unitGrams: 100 },
        { id: 28, name: '鸡肉', category: 'meat', icon: '🍗', calories: 167, protein: 19.3, carbs: 1.3, fat: 9.4, unit: '份', unitGrams: 100 },
        { id: 29, name: '鸡胸肉', category: 'meat', icon: '🍗', calories: 133, protein: 22.2, carbs: 2.5, fat: 2.0, unit: '份', unitGrams: 100 },
        { id: 30, name: '鸡腿肉', category: 'meat', icon: '🍗', calories: 181, protein: 16.0, carbs: 0.0, fat: 13.0, unit: '份', unitGrams: 100 },
        { id: 31, name: '鸭肉', category: 'meat', icon: '🦆', calories: 240, protein: 15.5, carbs: 0.2, fat: 19.7, unit: '份', unitGrams: 100 },
        { id: 32, name: '排骨', category: 'meat', icon: '🍖', calories: 278, protein: 16.7, carbs: 0.5, fat: 23.1, unit: '份', unitGrams: 100 },
        { id: 33, name: '猪蹄', category: 'meat', icon: '🍖', calories: 260, protein: 23.6, carbs: 0.0, fat: 17.0, unit: '份', unitGrams: 100 },
        { id: 34, name: '猪肝', category: 'meat', icon: '🥩', calories: 129, protein: 19.3, carbs: 5.0, fat: 3.5, unit: '份', unitGrams: 100 },
        { id: 35, name: '香肠', category: 'meat', icon: '🌭', calories: 508, protein: 24.1, carbs: 11.2, fat: 40.7, unit: '根', unitGrams: 50 },
        { id: 36, name: '培根', category: 'meat', icon: '🥓', calories: 541, protein: 8.8, carbs: 1.4, fat: 57.1, unit: '片', unitGrams: 20 },
        { id: 37, name: '午餐肉', category: 'meat', icon: '🥫', calories: 229, protein: 12.5, carbs: 5.0, fat: 17.0, unit: '片', unitGrams: 30 },
        { id: 38, name: '肉丸', category: 'meat', icon: '🍢', calories: 165, protein: 12.0, carbs: 8.0, fat: 9.0, unit: '个', unitGrams: 30 },
        { id: 39, name: '腊肉', category: 'meat', icon: '🥩', calories: 692, protein: 11.8, carbs: 2.9, fat: 68.0, unit: '片', unitGrams: 30 },
        { id: 40, name: '火腿', category: 'meat', icon: '🍖', calories: 330, protein: 14.0, carbs: 4.0, fat: 30.0, unit: '片', unitGrams: 30 },

        // ==================== 蔬菜类 ====================
        { id: 41, name: '白菜', category: 'vegetable', icon: '🥬', calories: 17, protein: 1.5, carbs: 3.2, fat: 0.2, unit: '份', unitGrams: 200 },
        { id: 42, name: '西红柿', category: 'vegetable', icon: '🍅', calories: 18, protein: 0.9, carbs: 3.3, fat: 0.2, unit: '个', unitGrams: 150 },
        { id: 43, name: '黄瓜', category: 'vegetable', icon: '🥒', calories: 16, protein: 0.8, carbs: 2.9, fat: 0.2, unit: '根', unitGrams: 150 },
        { id: 44, name: '土豆', category: 'vegetable', icon: '🥔', calories: 77, protein: 2.0, carbs: 17.0, fat: 0.1, unit: '个', unitGrams: 150 },
        { id: 45, name: '茄子', category: 'vegetable', icon: '🍆', calories: 23, protein: 1.0, carbs: 5.0, fat: 0.2, unit: '份', unitGrams: 200 },
        { id: 46, name: '青椒', category: 'vegetable', icon: '🫑', calories: 23, protein: 1.0, carbs: 5.0, fat: 0.2, unit: '个', unitGrams: 80 },
        { id: 47, name: '西兰花', category: 'vegetable', icon: '🥦', calories: 34, protein: 2.1, carbs: 4.3, fat: 0.6, unit: '份', unitGrams: 150 },
        { id: 48, name: '菠菜', category: 'vegetable', icon: '🥬', calories: 23, protein: 2.6, carbs: 3.6, fat: 0.3, unit: '份', unitGrams: 200 },
        { id: 49, name: '豆角', category: 'vegetable', icon: '🫛', calories: 31, protein: 2.7, carbs: 5.7, fat: 0.2, unit: '份', unitGrams: 200 },
        { id: 50, name: '豆腐', category: 'vegetable', icon: '🧈', calories: 81, protein: 8.1, carbs: 4.2, fat: 3.7, unit: '块', unitGrams: 100 },
        { id: 51, name: '胡萝卜', category: 'vegetable', icon: '🥕', calories: 39, protein: 1.0, carbs: 8.8, fat: 0.2, unit: '根', unitGrams: 100 },
        { id: 52, name: '白萝卜', category: 'vegetable', icon: '🥕', calories: 21, protein: 0.9, carbs: 4.0, fat: 0.1, unit: '份', unitGrams: 200 },
        { id: 53, name: '莲藕', category: 'vegetable', icon: '🪷', calories: 73, protein: 2.0, carbs: 16.0, fat: 0.2, unit: '份', unitGrams: 150 },
        { id: 54, name: '冬瓜', category: 'vegetable', icon: '🥒', calories: 11, protein: 0.4, carbs: 2.6, fat: 0.1, unit: '份', unitGrams: 200 },
        { id: 55, name: '南瓜', category: 'vegetable', icon: '🎃', calories: 26, protein: 0.7, carbs: 6.0, fat: 0.1, unit: '份', unitGrams: 200 },
        { id: 56, name: '苦瓜', category: 'vegetable', icon: '🥒', calories: 19, protein: 1.0, carbs: 4.0, fat: 0.1, unit: '份', unitGrams: 150 },
        { id: 57, name: '丝瓜', category: 'vegetable', icon: '🥒', calories: 20, protein: 1.0, carbs: 4.0, fat: 0.2, unit: '份', unitGrams: 200 },
        { id: 58, name: '空心菜', category: 'vegetable', icon: '🥬', calories: 20, protein: 2.0, carbs: 3.0, fat: 0.3, unit: '份', unitGrams: 200 },
        { id: 59, name: '生菜', category: 'vegetable', icon: '🥬', calories: 15, protein: 1.3, carbs: 2.0, fat: 0.3, unit: '份', unitGrams: 150 },
        { id: 60, name: '油菜', category: 'vegetable', icon: '🥬', calories: 15, protein: 1.8, carbs: 2.0, fat: 0.5, unit: '份', unitGrams: 150 },
        { id: 61, name: '芹菜', category: 'vegetable', icon: '🥬', calories: 14, protein: 0.7, carbs: 3.0, fat: 0.1, unit: '份', unitGrams: 150 },
        { id: 62, name: '韭菜', category: 'vegetable', icon: '🥬', calories: 26, protein: 2.4, carbs: 4.0, fat: 0.4, unit: '份', unitGrams: 100 },
        { id: 63, name: '洋葱', category: 'vegetable', icon: '🧅', calories: 40, protein: 1.1, carbs: 9.0, fat: 0.1, unit: '个', unitGrams: 100 },
        { id: 64, name: '蒜苗', category: 'vegetable', icon: '🧄', calories: 37, protein: 2.0, carbs: 7.0, fat: 0.1, unit: '份', unitGrams: 100 },
        { id: 65, name: '豆芽', category: 'vegetable', icon: '🌱', calories: 18, protein: 2.0, carbs: 2.0, fat: 0.1, unit: '份', unitGrams: 150 },
        { id: 66, name: '蘑菇', category: 'vegetable', icon: '🍄', calories: 20, protein: 2.9, carbs: 3.0, fat: 0.3, unit: '份', unitGrams: 100 },
        { id: 67, name: '香菇', category: 'vegetable', icon: '🍄', calories: 26, protein: 2.2, carbs: 5.0, fat: 0.3, unit: '份', unitGrams: 100 },
        { id: 68, name: '金针菇', category: 'vegetable', icon: '🍄', calories: 26, protein: 2.4, carbs: 5.0, fat: 0.2, unit: '份', unitGrams: 100 },
        { id: 69, name: '木耳', category: 'vegetable', icon: '🍄', calories: 27, protein: 1.5, carbs: 6.0, fat: 0.2, unit: '份', unitGrams: 50 },
        { id: 70, name: '海带', category: 'vegetable', icon: '🌊', calories: 12, protein: 1.2, carbs: 2.0, fat: 0.1, unit: '份', unitGrams: 100 },

        // ==================== 水果类 ====================
        { id: 71, name: '苹果', category: 'fruit', icon: '🍎', calories: 52, protein: 0.3, carbs: 13.8, fat: 0.2, unit: '个', unitGrams: 150 },
        { id: 72, name: '香蕉', category: 'fruit', icon: '🍌', calories: 93, protein: 1.4, carbs: 22.0, fat: 0.2, unit: '根', unitGrams: 100 },
        { id: 73, name: '橙子', category: 'fruit', icon: '🍊', calories: 48, protein: 0.8, carbs: 11.8, fat: 0.2, unit: '个', unitGrams: 150 },
        { id: 74, name: '西瓜', category: 'fruit', icon: '🍉', calories: 26, protein: 0.6, carbs: 5.8, fat: 0.1, unit: '份', unitGrams: 300 },
        { id: 75, name: '葡萄', category: 'fruit', icon: '🍇', calories: 43, protein: 0.4, carbs: 10.3, fat: 0.2, unit: '份', unitGrams: 150 },
        { id: 76, name: '草莓', category: 'fruit', icon: '🍓', calories: 32, protein: 1.0, carbs: 7.0, fat: 0.3, unit: '份', unitGrams: 150 },
        { id: 77, name: '梨', category: 'fruit', icon: '🍐', calories: 44, protein: 0.4, carbs: 10.0, fat: 0.2, unit: '个', unitGrams: 200 },
        { id: 78, name: '桃子', category: 'fruit', icon: '🍑', calories: 42, protein: 0.9, carbs: 10.0, fat: 0.1, unit: '个', unitGrams: 150 },
        { id: 79, name: '芒果', category: 'fruit', icon: '🥭', calories: 60, protein: 0.8, carbs: 15.0, fat: 0.4, unit: '个', unitGrams: 200 },
        { id: 80, name: '猕猴桃', category: 'fruit', icon: '🥝', calories: 56, protein: 1.0, carbs: 12.0, fat: 0.6, unit: '个', unitGrams: 80 },
        { id: 81, name: '柚子', category: 'fruit', icon: '🍊', calories: 41, protein: 0.8, carbs: 9.5, fat: 0.2, unit: '瓣', unitGrams: 100 },
        { id: 82, name: '柠檬', category: 'fruit', icon: '🍋', calories: 35, protein: 1.1, carbs: 9.0, fat: 0.3, unit: '个', unitGrams: 50 },
        { id: 83, name: '樱桃', category: 'fruit', icon: '🍒', calories: 46, protein: 1.0, carbs: 10.0, fat: 0.3, unit: '份', unitGrams: 100 },
        { id: 84, name: '荔枝', category: 'fruit', icon: '🍒', calories: 66, protein: 0.9, carbs: 16.0, fat: 0.2, unit: '份', unitGrams: 100 },
        { id: 85, name: '龙眼', category: 'fruit', icon: '🍒', calories: 71, protein: 1.2, carbs: 16.0, fat: 0.1, unit: '份', unitGrams: 100 },
        { id: 86, name: '榴莲', category: 'fruit', icon: '🥭', calories: 147, protein: 2.6, carbs: 27.0, fat: 5.0, unit: '份', unitGrams: 100 },
        { id: 87, name: '山竹', category: 'fruit', icon: '🟣', calories: 69, protein: 0.4, carbs: 18.0, fat: 0.6, unit: '个', unitGrams: 50 },
        { id: 88, name: '菠萝', category: 'fruit', icon: '🍍', calories: 44, protein: 0.5, carbs: 10.0, fat: 0.1, unit: '份', unitGrams: 150 },
        { id: 89, name: '哈密瓜', category: 'fruit', icon: '🍈', calories: 34, protein: 0.5, carbs: 8.0, fat: 0.1, unit: '份', unitGrams: 200 },
        { id: 90, name: '火龙果', category: 'fruit', icon: '🐉', calories: 51, protein: 1.1, carbs: 13.0, fat: 0.2, unit: '个', unitGrams: 300 },

        // ==================== 奶制品 ====================
        { id: 91, name: '牛奶', category: 'dairy', icon: '🥛', calories: 54, protein: 3.0, carbs: 4.9, fat: 3.2, unit: '杯', unitGrams: 250 },
        { id: 92, name: '酸奶', category: 'dairy', icon: '🥛', calories: 72, protein: 2.5, carbs: 9.3, fat: 2.7, unit: '盒', unitGrams: 100 },
        { id: 93, name: '奶酪', category: 'dairy', icon: '🧀', calories: 328, protein: 25.7, carbs: 3.5, fat: 23.5, unit: '片', unitGrams: 20 },
        { id: 94, name: '豆浆', category: 'dairy', icon: '🥛', calories: 31, protein: 1.8, carbs: 3.0, fat: 1.2, unit: '杯', unitGrams: 250 },
        { id: 95, name: '全脂奶粉', category: 'dairy', icon: '🥛', calories: 478, protein: 20.0, carbs: 52.0, fat: 21.0, unit: '勺', unitGrams: 20 },
        { id: 96, name: '脱脂牛奶', category: 'dairy', icon: '🥛', calories: 35, protein: 3.4, carbs: 5.0, fat: 0.1, unit: '杯', unitGrams: 250 },
        { id: 97, name: '奶油', category: 'dairy', icon: '🧈', calories: 309, protein: 2.1, carbs: 3.8, fat: 33.0, unit: '勺', unitGrams: 15 },
        { id: 98, name: '黄油', category: 'dairy', icon: '🧈', calories: 717, protein: 1.4, carbs: 0.1, fat: 81.0, unit: '片', unitGrams: 10 },

        // ==================== 海鲜类 ====================
        { id: 101, name: '草鱼', category: 'seafood', icon: '🐟', calories: 113, protein: 16.6, carbs: 0.0, fat: 5.2, unit: '份', unitGrams: 150 },
        { id: 102, name: '鲫鱼', category: 'seafood', icon: '🐟', calories: 108, protein: 17.1, carbs: 0.0, fat: 4.1, unit: '份', unitGrams: 150 },
        { id: 103, name: '鲤鱼', category: 'seafood', icon: '🐟', calories: 109, protein: 17.6, carbs: 0.0, fat: 4.1, unit: '份', unitGrams: 150 },
        { id: 104, name: '带鱼', category: 'seafood', icon: '🐟', calories: 127, protein: 17.7, carbs: 0.0, fat: 4.9, unit: '份', unitGrams: 150 },
        { id: 105, name: '黄鱼', category: 'seafood', icon: '🐟', calories: 99, protein: 17.9, carbs: 0.0, fat: 3.0, unit: '份', unitGrams: 150 },
        { id: 106, name: '三文鱼', category: 'seafood', icon: '🍣', calories: 139, protein: 20.0, carbs: 0.0, fat: 6.3, unit: '份', unitGrams: 100 },
        { id: 107, name: '虾', category: 'seafood', icon: '🦐', calories: 87, protein: 18.6, carbs: 2.8, fat: 0.8, unit: '份', unitGrams: 100 },
        { id: 108, name: '大闸蟹', category: 'seafood', icon: '🦀', calories: 95, protein: 17.5, carbs: 2.3, fat: 2.6, unit: '只', unitGrams: 150 },
        { id: 109, name: '鱿鱼', category: 'seafood', icon: '🦑', calories: 75, protein: 15.2, carbs: 3.8, fat: 0.8, unit: '份', unitGrams: 100 },
        { id: 110, name: '章鱼', category: 'seafood', icon: '🐙', calories: 52, protein: 10.6, carbs: 1.4, fat: 0.8, unit: '份', unitGrams: 100 },
        { id: 111, name: '扇贝', category: 'seafood', icon: '🦪', calories: 60, protein: 11.1, carbs: 2.6, fat: 0.6, unit: '份', unitGrams: 100 },
        { id: 112, name: '生蚝', category: 'seafood', icon: '🦪', calories: 57, protein: 9.0, carbs: 4.3, fat: 1.0, unit: '份', unitGrams: 100 },
        { id: 113, name: '蛤蜊', category: 'seafood', icon: '🦪', calories: 62, protein: 10.1, carbs: 2.8, fat: 1.1, unit: '份', unitGrams: 100 },
        { id: 114, name: '鲍鱼', category: 'seafood', icon: '🦪', calories: 84, protein: 12.6, carbs: 6.6, fat: 0.8, unit: '个', unitGrams: 50 },
        { id: 115, name: '海参', category: 'seafood', icon: '🥒', calories: 78, protein: 16.5, carbs: 2.5, fat: 0.2, unit: '个', unitGrams: 50 },

        // ==================== 中式菜肴 ====================
        { id: 121, name: '红烧肉', category: 'dish', icon: '🥩', calories: 275, protein: 12.0, carbs: 6.0, fat: 22.0, unit: '份', unitGrams: 150 },
        { id: 122, name: '宫保鸡丁', category: 'dish', icon: '🍗', calories: 170, protein: 15.0, carbs: 8.0, fat: 9.0, unit: '份', unitGrams: 150 },
        { id: 123, name: '麻婆豆腐', category: 'dish', icon: '🧈', calories: 90, protein: 7.4, carbs: 5.9, fat: 4.2, unit: '份', unitGrams: 200 },
        { id: 124, name: '糖醋排骨', category: 'dish', icon: '🍖', calories: 295, protein: 15.0, carbs: 12.0, fat: 21.0, unit: '份', unitGrams: 150 },
        { id: 125, name: '鱼香肉丝', category: 'dish', icon: '🥩', calories: 165, protein: 12.0, carbs: 8.0, fat: 10.0, unit: '份', unitGrams: 150 },
        { id: 126, name: '回锅肉', category: 'dish', icon: '🥩', calories: 210, protein: 11.0, carbs: 5.0, fat: 17.0, unit: '份', unitGrams: 150 },
        { id: 127, name: '番茄炒蛋', category: 'dish', icon: '🍳', calories: 98, protein: 7.0, carbs: 4.0, fat: 6.0, unit: '份', unitGrams: 150 },
        { id: 128, name: '青椒肉丝', category: 'dish', icon: '🫑', calories: 135, protein: 10.0, carbs: 6.0, fat: 8.0, unit: '份', unitGrams: 150 },
        { id: 129, name: '红烧茄子', category: 'dish', icon: '🍆', calories: 85, protein: 2.0, carbs: 8.0, fat: 5.0, unit: '份', unitGrams: 150 },
        { id: 130, name: '地三鲜', category: 'dish', icon: '🥔', calories: 120, protein: 3.0, carbs: 12.0, fat: 7.0, unit: '份', unitGrams: 150 },
        { id: 131, name: '酸辣土豆丝', category: 'dish', icon: '🥔', calories: 95, protein: 2.0, carbs: 15.0, fat: 4.0, unit: '份', unitGrams: 150 },
        { id: 132, name: '干煸豆角', category: 'dish', icon: '🫛', calories: 110, protein: 3.0, carbs: 8.0, fat: 8.0, unit: '份', unitGrams: 150 },
        { id: 133, name: '蒜蓉西兰花', category: 'dish', icon: '🥦', calories: 55, protein: 3.0, carbs: 5.0, fat: 3.0, unit: '份', unitGrams: 150 },
        { id: 134, name: '清炒时蔬', category: 'dish', icon: '🥬', calories: 45, protein: 2.0, carbs: 4.0, fat: 3.0, unit: '份', unitGrams: 150 },
        { id: 135, name: '红烧鱼', category: 'dish', icon: '🐟', calories: 135, protein: 15.0, carbs: 5.0, fat: 6.0, unit: '份', unitGrams: 150 },
        { id: 136, name: '清蒸鱼', category: 'dish', icon: '🐟', calories: 105, protein: 18.0, carbs: 2.0, fat: 3.0, unit: '份', unitGrams: 150 },
        { id: 137, name: '水煮鱼', category: 'dish', icon: '🐟', calories: 165, protein: 16.0, carbs: 4.0, fat: 9.0, unit: '份', unitGrams: 150 },
        { id: 138, name: '酸菜鱼', category: 'dish', icon: '🐟', calories: 125, protein: 17.0, carbs: 5.0, fat: 5.0, unit: '份', unitGrams: 150 },
        { id: 139, name: '油焖大虾', category: 'dish', icon: '🦐', calories: 145, protein: 16.0, carbs: 6.0, fat: 6.0, unit: '份', unitGrams: 150 },
        { id: 140, name: '白灼虾', category: 'dish', icon: '🦐', calories: 95, protein: 18.0, carbs: 2.0, fat: 1.0, unit: '份', unitGrams: 150 },
        { id: 141, name: '东坡肉', category: 'dish', icon: '🥩', calories: 350, protein: 13.0, carbs: 5.0, fat: 31.0, unit: '份', unitGrams: 150 },
        { id: 142, name: '梅菜扣肉', category: 'dish', icon: '🥩', calories: 380, protein: 12.0, carbs: 8.0, fat: 34.0, unit: '份', unitGrams: 150 },
        { id: 143, name: '京酱肉丝', category: 'dish', icon: '🥩', calories: 180, protein: 14.0, carbs: 7.0, fat: 11.0, unit: '份', unitGrams: 150 },
        { id: 144, name: '锅包肉', category: 'dish', icon: '🥩', calories: 245, protein: 12.0, carbs: 18.0, fat: 14.0, unit: '份', unitGrams: 150 },
        { id: 145, name: '口水鸡', category: 'dish', icon: '🍗', calories: 195, protein: 18.0, carbs: 5.0, fat: 11.0, unit: '份', unitGrams: 150 },
        { id: 146, name: '辣子鸡', category: 'dish', icon: '🍗', calories: 215, protein: 16.0, carbs: 8.0, fat: 14.0, unit: '份', unitGrams: 150 },
        { id: 147, name: '可乐鸡翅', category: 'dish', icon: '🍗', calories: 235, protein: 15.0, carbs: 12.0, fat: 14.0, unit: '份', unitGrams: 150 },
        { id: 148, name: '红烧牛肉', category: 'dish', icon: '🥩', calories: 175, protein: 18.0, carbs: 6.0, fat: 8.0, unit: '份', unitGrams: 150 },
        { id: 149, name: '葱爆羊肉', category: 'dish', icon: '🍖', calories: 195, protein: 17.0, carbs: 5.0, fat: 12.0, unit: '份', unitGrams: 150 },
        { id: 150, name: '蚂蚁上树', category: 'dish', icon: '🍜', calories: 145, protein: 8.0, carbs: 15.0, fat: 6.0, unit: '份', unitGrams: 150 },

        // ==================== 零食饮品 ====================
        { id: 161, name: '薯片', category: 'snack', icon: '🥔', calories: 536, protein: 7.0, carbs: 50.0, fat: 35.0, unit: '袋', unitGrams: 75 },
        { id: 162, name: '巧克力', category: 'snack', icon: '🍫', calories: 589, protein: 5.0, carbs: 52.0, fat: 40.0, unit: '块', unitGrams: 40 },
        { id: 163, name: '冰淇淋', category: 'snack', icon: '🍦', calories: 207, protein: 3.5, carbs: 24.0, fat: 11.0, unit: '份', unitGrams: 100 },
        { id: 164, name: '可乐', category: 'snack', icon: '🥤', calories: 43, protein: 0.0, carbs: 10.6, fat: 0.0, unit: '罐', unitGrams: 330 },
        { id: 165, name: '奶茶', category: 'snack', icon: '🧋', calories: 65, protein: 1.0, carbs: 12.0, fat: 2.0, unit: '杯', unitGrams: 500 },
        { id: 166, name: '咖啡(黑)', category: 'snack', icon: '☕', calories: 2, protein: 0.3, carbs: 0.3, fat: 0.0, unit: '杯', unitGrams: 240 },
        { id: 167, name: '拿铁', category: 'snack', icon: '☕', calories: 67, protein: 4.0, carbs: 6.0, fat: 3.5, unit: '杯', unitGrams: 240 },
        { id: 168, name: '蛋糕', category: 'snack', icon: '🍰', calories: 348, protein: 5.0, carbs: 52.0, fat: 14.0, unit: '块', unitGrams: 100 },
        { id: 169, name: '饼干', category: 'snack', icon: '🍪', calories: 433, protein: 6.0, carbs: 70.0, fat: 16.0, unit: '片', unitGrams: 10 },
        { id: 170, name: '腰果', category: 'snack', icon: '🥜', calories: 559, protein: 17.3, carbs: 30.1, fat: 36.7, unit: '份', unitGrams: 30 },
        { id: 171, name: '杏仁', category: 'snack', icon: '🥜', calories: 562, protein: 22.5, carbs: 23.9, fat: 45.4, unit: '份', unitGrams: 30 },
        { id: 172, name: '核桃', category: 'snack', icon: '🥜', calories: 627, protein: 14.9, carbs: 19.1, fat: 58.8, unit: '份', unitGrams: 30 },
        { id: 173, name: '花生', category: 'snack', icon: '🥜', calories: 574, protein: 24.8, carbs: 21.7, fat: 48.0, unit: '份', unitGrams: 30 },
        { id: 174, name: '瓜子', category: 'snack', icon: '🌻', calories: 606, protein: 23.9, carbs: 13.1, fat: 53.4, unit: '份', unitGrams: 30 },
        { id: 175, name: '开心果', category: 'snack', icon: '🥜', calories: 614, protein: 20.0, carbs: 28.0, fat: 53.0, unit: '份', unitGrams: 30 },
        { id: 176, name: '啤酒', category: 'snack', icon: '🍺', calories: 32, protein: 0.4, carbs: 0.0, fat: 0.0, unit: '罐', unitGrams: 330 },
        { id: 177, name: '红酒', category: 'snack', icon: '🍷', calories: 85, protein: 0.1, carbs: 2.6, fat: 0.0, unit: '杯', unitGrams: 150 },
        { id: 178, name: '白酒', category: 'snack', icon: '🍶', calories: 298, protein: 0.0, carbs: 0.0, fat: 0.0, unit: '杯', unitGrams: 50 },
        { id: 179, name: '方便面', category: 'snack', icon: '🍜', calories: 473, protein: 9.5, carbs: 61.0, fat: 21.0, unit: '包', unitGrams: 100 },
        { id: 180, name: '辣条', category: 'snack', icon: '🌶️', calories: 415, protein: 7.0, carbs: 45.0, fat: 23.0, unit: '包', unitGrams: 50 },
        { id: 181, name: '果冻', category: 'snack', icon: '🍮', calories: 70, protein: 1.5, carbs: 15.0, fat: 0.0, unit: '个', unitGrams: 30 },
        { id: 182, name: '爆米花', category: 'snack', icon: '🍿', calories: 387, protein: 12.6, carbs: 78.0, fat: 4.5, unit: '份', unitGrams: 50 },
        { id: 183, name: '甜甜圈', category: 'snack', icon: '🍩', calories: 452, protein: 5.0, carbs: 51.0, fat: 25.0, unit: '个', unitGrams: 60 },
        { id: 184, name: '蛋挞', category: 'snack', icon: '🥧', calories: 300, protein: 4.0, carbs: 32.0, fat: 17.0, unit: '个', unitGrams: 50 },
        { id: 185, name: '绿豆汤', category: 'snack', icon: '🥣', calories: 45, protein: 2.0, carbs: 9.0, fat: 0.1, unit: '碗', unitGrams: 250 },

        // ==================== 咖啡店早餐（星巴克/Wagas/皮爷） ====================
        // --- 烘焙面包 ---
        { id: 201, name: '可颂(牛角包)', category: 'cafe', icon: '🥐', calories: 419, protein: 6.5, carbs: 43.5, fat: 24.2, unit: '个', unitGrams: 62 },
        { id: 202, name: '巧克力可颂', category: 'cafe', icon: '🥐', calories: 440, protein: 7.0, carbs: 46.0, fat: 25.0, unit: '个', unitGrams: 70 },
        { id: 203, name: '原味贝果', category: 'cafe', icon: '🥯', calories: 288, protein: 10.6, carbs: 55.3, fat: 1.8, unit: '个', unitGrams: 85 },
        { id: 204, name: '全麦贝果', category: 'cafe', icon: '🥯', calories: 250, protein: 10.0, carbs: 48.0, fat: 1.5, unit: '个', unitGrams: 85 },
        { id: 205, name: '芝士贝果', category: 'cafe', icon: '🥯', calories: 359, protein: 11.8, carbs: 50.0, fat: 12.0, unit: '个', unitGrams: 95 },
        { id: 206, name: '蓝莓松饼', category: 'cafe', icon: '🧁', calories: 383, protein: 5.0, carbs: 50.8, fat: 17.5, unit: '个', unitGrams: 80 },
        { id: 207, name: '英式松饼', category: 'cafe', icon: '🧇', calories: 295, protein: 8.0, carbs: 48.0, fat: 8.0, unit: '个', unitGrams: 57 },
        { id: 208, name: '肉桂卷', category: 'cafe', icon: '🍥', calories: 397, protein: 5.0, carbs: 56.0, fat: 16.0, unit: '个', unitGrams: 100 },
        { id: 209, name: '海盐奶油卷', category: 'cafe', icon: '🥖', calories: 335, protein: 4.6, carbs: 23.4, fat: 24.0, unit: '个', unitGrams: 50 },
        { id: 210, name: '经典菠萝包', category: 'cafe', icon: '🍞', calories: 318, protein: 6.7, carbs: 39.5, fat: 14.0, unit: '个', unitGrams: 80 },
        { id: 211, name: '软法面包', category: 'cafe', icon: '🥖', calories: 273, protein: 9.4, carbs: 47.6, fat: 4.9, unit: '个', unitGrams: 70 },

        // --- 三明治/卷饼 ---
        { id: 212, name: '牛肉芝士三明治', category: 'cafe', icon: '🥪', calories: 280, protein: 18.0, carbs: 24.0, fat: 12.0, unit: '份', unitGrams: 160 },
        { id: 213, name: '牛油果鸡蛋三明治', category: 'cafe', icon: '🥪', calories: 350, protein: 14.0, carbs: 30.0, fat: 20.0, unit: '份', unitGrams: 180 },
        { id: 214, name: '鸡蛋培根英式松饼', category: 'cafe', icon: '🧇', calories: 400, protein: 18.0, carbs: 35.0, fat: 21.0, unit: '份', unitGrams: 170 },
        { id: 215, name: '鸡肉凯撒卷', category: 'cafe', icon: '🌯', calories: 420, protein: 22.0, carbs: 38.0, fat: 19.0, unit: '份', unitGrams: 200 },
        { id: 216, name: '蜜汁牛肉彩蔬卷', category: 'cafe', icon: '🌯', calories: 540, protein: 24.0, carbs: 52.0, fat: 28.0, unit: '份', unitGrams: 220 },
        { id: 217, name: '火腿芝士可颂三明治', category: 'cafe', icon: '🥪', calories: 450, protein: 16.0, carbs: 38.0, fat: 27.0, unit: '份', unitGrams: 150 },
        { id: 218, name: '烟熏三文鱼贝果', category: 'cafe', icon: '🥯', calories: 380, protein: 20.0, carbs: 42.0, fat: 15.0, unit: '份', unitGrams: 160 },

        // --- 早餐轻食 ---
        { id: 219, name: '燕麦水果碗', category: 'cafe', icon: '🥣', calories: 280, protein: 8.0, carbs: 48.0, fat: 7.0, unit: '碗', unitGrams: 250 },
        { id: 220, name: '希腊酸奶碗', category: 'cafe', icon: '🥣', calories: 220, protein: 12.0, carbs: 30.0, fat: 6.0, unit: '碗', unitGrams: 200 },
        { id: 221, name: '牛油果吐司', category: 'cafe', icon: '🥑', calories: 310, protein: 7.0, carbs: 28.0, fat: 19.0, unit: '份', unitGrams: 140 },
        { id: 222, name: '花生酱香蕉吐司', category: 'cafe', icon: '🍌', calories: 340, protein: 10.0, carbs: 42.0, fat: 16.0, unit: '份', unitGrams: 140 },
        { id: 223, name: '鸡蛋蔬菜沙拉', category: 'cafe', icon: '🥗', calories: 180, protein: 12.0, carbs: 10.0, fat: 11.0, unit: '份', unitGrams: 250 },
        { id: 224, name: '凯撒沙拉(含鸡肉)', category: 'cafe', icon: '🥗', calories: 320, protein: 22.0, carbs: 14.0, fat: 20.0, unit: '份', unitGrams: 300 },

        // --- Wagas 能量碗 ---
        { id: 225, name: '煎牛肉能量碗', category: 'cafe', icon: '🥙', calories: 520, protein: 32.0, carbs: 52.0, fat: 18.0, unit: '碗', unitGrams: 400 },
        { id: 226, name: '鸡胸肉能量碗', category: 'cafe', icon: '🥙', calories: 420, protein: 35.0, carbs: 45.0, fat: 12.0, unit: '碗', unitGrams: 380 },
        { id: 227, name: '三文鱼能量碗', category: 'cafe', icon: '🥙', calories: 480, protein: 28.0, carbs: 48.0, fat: 16.0, unit: '碗', unitGrams: 380 },
        { id: 228, name: '虾仁牛油果能量碗', category: 'cafe', icon: '🥙', calories: 450, protein: 25.0, carbs: 42.0, fat: 20.0, unit: '碗', unitGrams: 370 },
        { id: 229, name: '藜麦蔬菜能量碗', category: 'cafe', icon: '🥙', calories: 380, protein: 14.0, carbs: 55.0, fat: 12.0, unit: '碗', unitGrams: 350 },

        // --- 咖啡饮品（中杯/Grande 约355ml） ---
        { id: 231, name: '美式咖啡', category: 'cafe', icon: '☕', calories: 15, protein: 0.5, carbs: 2.0, fat: 0.1, unit: '杯', unitGrams: 355 },
        { id: 232, name: '拿铁', category: 'cafe', icon: '☕', calories: 190, protein: 10.0, carbs: 18.0, fat: 7.0, unit: '杯', unitGrams: 355 },
        { id: 233, name: '卡布奇诺', category: 'cafe', icon: '☕', calories: 120, protein: 6.0, carbs: 10.0, fat: 5.0, unit: '杯', unitGrams: 240 },
        { id: 234, name: '焦糖玛奇朵', category: 'cafe', icon: '☕', calories: 250, protein: 7.0, carbs: 34.0, fat: 9.0, unit: '杯', unitGrams: 355 },
        { id: 235, name: '摩卡', category: 'cafe', icon: '☕', calories: 370, protein: 10.0, carbs: 48.0, fat: 15.0, unit: '杯', unitGrams: 355 },
        { id: 236, name: '香草拿铁', category: 'cafe', icon: '☕', calories: 240, protein: 9.0, carbs: 35.0, fat: 7.0, unit: '杯', unitGrams: 355 },
        { id: 237, name: '抹茶拿铁', category: 'cafe', icon: '🍵', calories: 280, protein: 9.0, carbs: 42.0, fat: 9.0, unit: '杯', unitGrams: 355 },
        { id: 238, name: '燕麦拿铁', category: 'cafe', icon: '🥛', calories: 220, protein: 5.0, carbs: 30.0, fat: 8.0, unit: '杯', unitGrams: 355 },
        { id: 239, name: '馥列白(Flat White)', category: 'cafe', icon: '☕', calories: 170, protein: 9.0, carbs: 14.0, fat: 8.0, unit: '杯', unitGrams: 240 },
        { id: 240, name: '冰摇柠檬茶', category: 'cafe', icon: '🍋', calories: 130, protein: 0.0, carbs: 30.0, fat: 0.0, unit: '杯', unitGrams: 355 },
        { id: 241, name: '冷萃咖啡', category: 'cafe', icon: '🧊', calories: 15, protein: 0.5, carbs: 2.0, fat: 0.1, unit: '杯', unitGrams: 355 },
        { id: 242, name: '燕麦可可玛奇朵', category: 'cafe', icon: '☕', calories: 320, protein: 7.0, carbs: 48.0, fat: 11.0, unit: '杯', unitGrams: 355 },
        { id: 243, name: '浓缩咖啡(单份)', category: 'cafe', icon: '☕', calories: 5, protein: 0.3, carbs: 0.5, fat: 0.0, unit: '份', unitGrams: 30 },
        { id: 244, name: '热巧克力', category: 'cafe', icon: '🍫', calories: 320, protein: 8.0, carbs: 45.0, fat: 12.0, unit: '杯', unitGrams: 355 },
        { id: 245, name: '皮爷拿铁', category: 'cafe', icon: '☕', calories: 200, protein: 10.0, carbs: 18.0, fat: 8.5, unit: '杯', unitGrams: 355 },
        { id: 246, name: '手冲咖啡', category: 'cafe', icon: '☕', calories: 5, protein: 0.3, carbs: 0.5, fat: 0.0, unit: '杯', unitGrams: 240 },
    ],

    // 份量预设选项
    portionPresets: [
        { label: '少量', multiplier: 0.5 },
        { label: '标准', multiplier: 1.0 },
        { label: '较多', multiplier: 1.5 },
        { label: '大量', multiplier: 2.0 }
    ],

    // 获取所有分类
    getCategories() {
        return this.categories;
    },

    // 按分类获取食物
    getFoodsByCategory(categoryId) {
        return this.foods.filter(food => food.category === categoryId);
    },

    // 搜索食物
    searchFoods(keyword) {
        const lowerKeyword = keyword.toLowerCase();
        return this.foods.filter(food => 
            food.name.toLowerCase().includes(lowerKeyword)
        );
    },

    // 根据 ID 获取食物
    getFoodById(id) {
        return this.foods.find(food => food.id === id);
    },

    // 计算食物营养（根据克数）
    calculateNutrition(foodId, grams) {
        const food = this.getFoodById(foodId);
        if (!food) return null;
        
        const ratio = grams / 100;
        return {
            calories: Math.round(food.calories * ratio),
            protein: Math.round(food.protein * ratio * 10) / 10,
            carbs: Math.round(food.carbs * ratio * 10) / 10,
            fat: Math.round(food.fat * ratio * 10) / 10
        };
    },

    // 获取常用食物（用于快捷添加）
    getCommonFoods() {
        const commonIds = [1, 21, 24, 28, 41, 42, 71, 72, 91, 101];
        return commonIds.map(id => this.getFoodById(id)).filter(Boolean);
    },

    // 添加自定义食物
    addCustomFood(foodData) {
        const newId = Math.max(...this.foods.map(f => f.id)) + 1;
        const newFood = {
            id: newId,
            name: foodData.name,
            category: 'custom',
            icon: foodData.icon || '🍽️',
            calories: foodData.calories,
            protein: foodData.protein || 0,
            carbs: foodData.carbs || 0,
            fat: foodData.fat || 0,
            unit: foodData.unit || '份',
            unitGrams: foodData.unitGrams || 100,
            isCustom: true
        };
        this.foods.push(newFood);
        return newFood;
    },

    // AI 识别映射表
    aiMapping: {
        'consomme': 6, 'hotdog': 35, 'hamburger': 5, 'pizza': 168, 'burrito': 4,
        'ice_cream': 163, 'cheeseburger': 5, 'French loaf': 2, 'bagel': 2, 'pretzel': 2,
        'carbonara': 3, 'spaghetti squash': 3, 'eggnog': 92, 'banana': 72, 'orange': 73,
        'Granny Smith': 71, 'strawberry': 76, 'lemon': 82, 'fig': 75, 'pineapple': 88,
        'cucumber': 43, 'head cabbage': 41, 'broccoli': 47, 'cauliflower': 47, 'zucchini': 45,
        'mushroom': 66, 'corn': 13, 'bell pepper': 46, 'hen': 28, 'cock': 28, 'turkey': 28,
        'goose': 31, 'meat loaf': 121, 'french fries': 161, 'guacamole': 50, 'hot pot': 137,
        'sushi': 106, 'fish': 101, 'crab': 108, 'lobster': 108, 'shrimp': 107, 'squid': 109,
        'oyster': 112, 'snail': 109, 'chicken': 28, 'pork': 24, 'beef': 26, 'lamb': 27,
        'duck': 31, 'egg': 21, 'tofu': 50, 'rice': 1, 'noodle': 3, 'bread': 8, 'dumpling': 4,
        'steak': 26, 'salad': 59, 'soup': 6, 'porridge': 6, 'milk': 91, 'yogurt': 92,
        'coffee': 166, 'tea': 166, 'beer': 176, 'wine': 177, 'cocktail': 177, 'chocolate': 162,
        'cookie': 169, 'cake': 168, 'ice cream': 163, 'popcorn': 182, 'chip': 161, 'nut': 170,
        'peanut': 173, 'apple': 71, 'grape': 75, 'watermelon': 74, 'mango': 79, 'peach': 78,
        'pear': 77, 'kiwi': 80, 'carrot': 51, 'potato': 44, 'tomato': 42
    },

    // 根据 AI 识别结果获取食物
    getFoodByAIResult(className) {
        if (this.aiMapping[className]) {
            return this.getFoodById(this.aiMapping[className]);
        }
        const lowerClass = className.toLowerCase();
        for (const [key, foodId] of Object.entries(this.aiMapping)) {
            if (key.toLowerCase().includes(lowerClass) || lowerClass.includes(key.toLowerCase())) {
                return this.getFoodById(foodId);
            }
        }
        return null;
    }
};

// 导出
window.FoodDatabase = FoodDatabase;
