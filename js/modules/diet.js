/**
 * 饮食记录模块
 */

const Diet = {
    currentDate: null,
    currentMeal: 'breakfast',

    // 渲染页面
    async render() {
        const container = document.getElementById('page-container');
        this.currentDate = DB.getTodayString();

        const meals = await DB.getTodayDietByMeal();
        const summary = await DB.getTodayDietSummary();
        const profile = await DB.getProfile();
        const dailyCalories = DB.calculateDailyCalories(profile);

        container.innerHTML = `
            <div class="page">
                <div class="page-header">
                    <h1 class="page-title">饮食记录</h1>
                    <p class="page-subtitle">记录每日饮食，了解营养摄入</p>
                </div>

                <!-- 日期选择 -->
                <div class="date-selector">
                    <button class="date-selector-btn" onclick="Diet.changeDate(-1)">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                    </button>
                    <span class="date-selector-value" id="current-date">${DB.formatDate(this.currentDate)}</span>
                    <button class="date-selector-btn" onclick="Diet.changeDate(1)">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </button>
                </div>

                <!-- 今日热量 -->
                <div class="card">
                    <div class="card-header">
                        <span class="card-title">今日热量</span>
                        <span class="card-subtitle">目标 ${dailyCalories} kcal</span>
                    </div>
                    <div style="text-align: center; padding: 16px 0;">
                        <div style="font-size: 36px; font-weight: 700; color: var(--primary);">${summary.calories}</div>
                        <div style="font-size: 14px; color: var(--text-secondary);">千卡</div>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-bar-fill ${summary.calories > dailyCalories ? 'danger' : 'primary'}" 
                             style="width: ${Math.min(summary.calories / dailyCalories * 100, 100)}%"></div>
                    </div>
                </div>

                <!-- 餐次选择 -->
                <div class="meal-tabs">
                    <button class="meal-tab ${this.currentMeal === 'breakfast' ? 'active' : ''}" 
                            onclick="Diet.selectMeal('breakfast')">🌅 早餐</button>
                    <button class="meal-tab ${this.currentMeal === 'lunch' ? 'active' : ''}" 
                            onclick="Diet.selectMeal('lunch')">☀️ 午餐</button>
                    <button class="meal-tab ${this.currentMeal === 'dinner' ? 'active' : ''}" 
                            onclick="Diet.selectMeal('dinner')">🌙 晚餐</button>
                    <button class="meal-tab ${this.currentMeal === 'snack' ? 'active' : ''}" 
                            onclick="Diet.selectMeal('snack')">🍪 加餐</button>
                </div>

                <!-- 当前餐次食物 -->
                <div class="card">
                    <div class="card-header">
                        <span class="card-title">${this.getMealName(this.currentMeal)}</span>
                        <button class="btn btn-primary" onclick="Diet.openAddFoodModal()">+ 添加食物</button>
                    </div>
                    <div id="meal-foods">
                        ${this.renderMealFoods(meals[this.currentMeal])}
                    </div>
                </div>

                <!-- 常用食物 -->
                <div class="card">
                    <div class="card-header">
                        <span class="card-title">常用食物</span>
                    </div>
                    <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                        ${this.renderCommonFoods()}
                    </div>
                </div>

                <!-- 拍照识别按钮 -->
                <button class="camera-btn" onclick="Camera.open()">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                        <circle cx="12" cy="13" r="4"></circle>
                    </svg>
                </button>
            </div>
        `;
    },

    // 获取餐次名称
    getMealName(meal) {
        const names = {
            breakfast: '早餐',
            lunch: '午餐',
            dinner: '晚餐',
            snack: '加餐'
        };
        return names[meal] || meal;
    },

    // 渲染餐次食物
    renderMealFoods(foods) {
        if (foods.length === 0) {
            return `
                <div class="empty-state" style="padding: 24px;">
                    <div style="font-size: 40px; margin-bottom: 12px;">🍽️</div>
                    <div class="empty-state-text">还没有记录${this.getMealName(this.currentMeal)}</div>
                    <button class="btn btn-primary" onclick="Diet.openAddFoodModal()">添加食物</button>
                </div>
            `;
        }

        return foods.map(food => `
            <div class="food-item">
                <div class="food-item-icon">${food.foodIcon}</div>
                <div class="food-item-info">
                    <div class="food-item-name">${food.foodName}</div>
                    <div class="food-item-amount">${food.grams}g</div>
                </div>
                <div class="food-item-calories">${food.calories} kcal</div>
                <button class="btn btn-icon" onclick="Diet.deleteFood(${food.id})" style="margin-left: 8px;">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <polyline points="3 6 5 6 21 6"></polyline>
                        <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                </button>
            </div>
        `).join('');
    },

    // 渲染常用食物
    renderCommonFoods() {
        const commonFoods = FoodDatabase.getCommonFoods();
        return commonFoods.map(food => `
            <button class="btn btn-secondary" onclick="Diet.quickAddFood(${food.id})" 
                    style="font-size: 12px; padding: 6px 12px;">
                ${food.icon} ${food.name}
            </button>
        `).join('');
    },

    // 选择餐次
    async selectMeal(meal) {
        this.currentMeal = meal;
        const meals = await DB.getDietByDate(this.currentDate);
        const mealFoods = meals.filter(r => r.meal === meal);
        
        // 更新标签状态
        document.querySelectorAll('.meal-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        event.target.classList.add('active');
        
        // 更新食物列表
        document.getElementById('meal-foods').innerHTML = this.renderMealFoods(mealFoods);
    },

    // 改变日期
    async changeDate(delta) {
        const date = new Date(this.currentDate);
        date.setDate(date.getDate() + delta);
        this.currentDate = date.toISOString().split('T')[0];
        
        document.getElementById('current-date').textContent = DB.formatDate(this.currentDate);
        await this.render();
    },

    // 打开添加食物模态框
    openAddFoodModal() {
        const categories = FoodDatabase.getCategories();
        
        const modalHtml = `
            <div class="modal-overlay" id="add-food-modal">
                <div class="modal">
                    <div class="modal-header">
                        <span class="modal-title">添加食物</span>
                        <button class="modal-close" onclick="Diet.closeAddFoodModal()">✕</button>
                    </div>
                    <div class="modal-body">
                        <!-- 搜索框 -->
                        <div class="search-box">
                            <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="M21 21l-4.35-4.35"></path>
                            </svg>
                            <input type="text" id="food-search" placeholder="搜索食物..." oninput="Diet.searchFoods(this.value)">
                        </div>
                        
                        <!-- 分类标签 -->
                        <div class="meal-tabs" style="margin-bottom: 12px;">
                            ${categories.filter(c => c.id !== 'custom').map(cat => `
                                <button class="meal-tab ${cat.id === 'staple' ? 'active' : ''}" 
                                        onclick="Diet.selectCategory('${cat.id}')">${cat.icon} ${cat.name}</button>
                            `).join('')}
                        </div>
                        
                        <!-- 食物列表 -->
                        <div id="food-list" style="max-height: 300px; overflow-y: auto;">
                            ${this.renderFoodList(FoodDatabase.getFoodsByCategory('staple'))}
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.getElementById('modal-container').innerHTML = modalHtml;
        setTimeout(() => {
            document.getElementById('add-food-modal').classList.add('show');
        }, 10);
    },

    // 关闭添加食物模态框
    closeAddFoodModal() {
        const modal = document.getElementById('add-food-modal');
        if (modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.remove();
            }, 250);
        }
    },

    // 选择分类
    selectCategory(categoryId) {
        document.querySelectorAll('.modal .meal-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        event.target.classList.add('active');
        
        const foods = FoodDatabase.getFoodsByCategory(categoryId);
        document.getElementById('food-list').innerHTML = this.renderFoodList(foods);
    },

    // 搜索食物
    searchFoods(keyword) {
        if (!keyword.trim()) {
            document.getElementById('food-list').innerHTML = this.renderFoodList(FoodDatabase.getFoodsByCategory('staple'));
            return;
        }
        
        const foods = FoodDatabase.searchFoods(keyword);
        document.getElementById('food-list').innerHTML = this.renderFoodList(foods);
    },

    // 渲染食物列表
    renderFoodList(foods) {
        return foods.map(food => `
            <div class="food-item" onclick="Diet.selectFood(${food.id})">
                <div class="food-item-icon">${food.icon}</div>
                <div class="food-item-info">
                    <div class="food-item-name">${food.name}</div>
                    <div class="food-item-amount">${food.calories} kcal / 100g</div>
                </div>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
            </div>
        `).join('');
    },

    // 选择食物
    selectFood(foodId) {
        const food = FoodDatabase.getFoodById(foodId);
        if (!food) return;
        
        const portionPresets = FoodDatabase.portionPresets;
        
        const modalHtml = `
            <div class="modal-overlay" id="portion-modal">
                <div class="modal">
                    <div class="modal-header">
                        <span class="modal-title">${food.icon} ${food.name}</span>
                        <button class="modal-close" onclick="Diet.closePortionModal()">✕</button>
                    </div>
                    <div class="modal-body">
                        <div style="text-align: center; margin-bottom: 16px;">
                            <div style="font-size: 14px; color: var(--text-secondary);">每 100g 含</div>
                            <div style="font-size: 24px; font-weight: 700; color: var(--primary); margin: 8px 0;">${food.calories} kcal</div>
                            <div style="font-size: 12px; color: var(--text-tertiary);">
                                蛋白质 ${food.protein}g · 碳水 ${food.carbs}g · 脂肪 ${food.fat}g
                            </div>
                        </div>
                        
                        <!-- 份量预设 -->
                        <div style="margin-bottom: 16px;">
                            <label class="form-label">选择份量</label>
                            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                                ${portionPresets.map((preset, index) => {
                                    const grams = Math.round(food.unitGrams * preset.multiplier);
                                    const calories = Math.round(food.calories * grams / 100);
                                    return `
                                        <button class="btn ${index === 1 ? 'btn-primary' : 'btn-secondary'}" 
                                                onclick="Diet.selectPortion(${grams})"
                                                style="flex: 1; min-width: 70px;">
                                            <div>${preset.label}</div>
                                            <div style="font-size: 12px; opacity: 0.8;">${calories} kcal</div>
                                        </button>
                                    `;
                                }).join('')}
                            </div>
                        </div>
                        
                        <!-- 自定义克数 -->
                        <div class="form-group">
                            <label class="form-label">或输入克数</label>
                            <div style="display: flex; gap: 8px; align-items: center;">
                                <input type="number" id="custom-grams" class="form-input" 
                                       placeholder="输入克数" value="${food.unitGrams}" min="1" max="2000">
                                <span style="color: var(--text-secondary);">g</span>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button class="btn btn-secondary" onclick="Diet.closePortionModal()">取消</button>
                        <button class="btn btn-primary" onclick="Diet.confirmAddFood(${foodId})">确认添加</button>
                    </div>
                </div>
            </div>
        `;
        
        document.getElementById('modal-container').innerHTML = modalHtml;
        setTimeout(() => {
            document.getElementById('portion-modal').classList.add('show');
        }, 10);
    },

    // 选择预设份量
    selectPortion(grams) {
        document.getElementById('custom-grams').value = grams;
    },

    // 关闭份量模态框
    closePortionModal() {
        const modal = document.getElementById('portion-modal');
        if (modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.remove();
            }, 250);
        }
    },

    // 确认添加食物
    async confirmAddFood(foodId) {
        const food = FoodDatabase.getFoodById(foodId);
        const grams = parseInt(document.getElementById('custom-grams').value);
        
        if (!grams || grams < 1) {
            App.showToast('请输入有效的克数');
            return;
        }
        
        const nutrition = FoodDatabase.calculateNutrition(foodId, grams);
        
        try {
            await DB.addDietRecord({
                date: this.currentDate,
                meal: this.currentMeal,
                foodId: foodId,
                foodName: food.name,
                foodIcon: food.icon,
                grams: grams,
                calories: nutrition.calories,
                protein: nutrition.protein,
                carbs: nutrition.carbs,
                fat: nutrition.fat
            });
            
            this.closePortionModal();
            this.closeAddFoodModal();
            App.showToast(`已添加 ${food.name}`);
            await this.render();
        } catch (error) {
            console.error('添加失败:', error);
            App.showToast('添加失败，请重试');
        }
    },

    // 快速添加食物
    async quickAddFood(foodId) {
        const food = FoodDatabase.getFoodById(foodId);
        const nutrition = FoodDatabase.calculateNutrition(foodId, food.unitGrams);
        
        try {
            await DB.addDietRecord({
                date: this.currentDate,
                meal: this.currentMeal,
                foodId: foodId,
                foodName: food.name,
                foodIcon: food.icon,
                grams: food.unitGrams,
                calories: nutrition.calories,
                protein: nutrition.protein,
                carbs: nutrition.carbs,
                fat: nutrition.fat
            });
            
            App.showToast(`已添加 ${food.name}`);
            await this.render();
        } catch (error) {
            console.error('添加失败:', error);
            App.showToast('添加失败，请重试');
        }
    },

    // 删除食物
    async deleteFood(id) {
        if (!confirm('确定要删除这条记录吗？')) return;
        
        try {
            await DB.deleteDietRecord(id);
            App.showToast('已删除');
            await this.render();
        } catch (error) {
            console.error('删除失败:', error);
            App.showToast('删除失败，请重试');
        }
    }
};

// 导出
window.Diet = Diet;
