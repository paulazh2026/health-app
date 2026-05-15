/**
 * 首页仪表盘模块
 */

const Dashboard = {
    charts: {},

    // 渲染页面
    async render() {
        const container = document.getElementById('page-container');
        
        // 获取数据
        const profile = await DB.getProfile();
        const todayWeight = await DB.getWeightByDate(DB.getTodayString());
        const todayDiet = await DB.getTodayDietSummary();
        const dailyCalories = DB.calculateDailyCalories(profile);

        container.innerHTML = `
            <div class="page">
                <div class="page-header">
                    <h1 class="page-title">健康管家</h1>
                    <p class="page-subtitle">${this.getGreeting()}</p>
                </div>

                <!-- 今日概览 -->
                <div class="card">
                    <div class="card-header">
                        <span class="card-title">今日概览</span>
                        <span class="card-subtitle">${DB.formatDate(DB.getTodayString())}</span>
                    </div>
                    
                    <div class="stats-grid">
                        <div class="stat-card">
                            <div class="stat-value">${todayWeight ? todayWeight.weight : '--'}</div>
                            <div class="stat-label">体重 (kg)</div>
                            ${todayWeight ? await this.getWeightChange(todayWeight) : ''}
                        </div>
                        <div class="stat-card">
                            <div class="stat-value">${todayDiet.calories}</div>
                            <div class="stat-label">热量 (kcal)</div>
                            <div class="stat-change ${todayDiet.calories > dailyCalories ? 'up' : 'down'}">
                                ${Math.round(todayDiet.calories / dailyCalories * 100)}%
                            </div>
                        </div>
                    </div>

                    <!-- 热量进度 -->
                    <div style="margin-top: 16px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                            <span style="font-size: 14px; color: var(--text-secondary);">今日热量</span>
                            <span style="font-size: 14px; color: var(--text-primary);">${todayDiet.calories} / ${dailyCalories} kcal</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-bar-fill ${todayDiet.calories > dailyCalories ? 'danger' : 'primary'}" 
                                 style="width: ${Math.min(todayDiet.calories / dailyCalories * 100, 100)}%"></div>
                        </div>
                    </div>
                </div>

                <!-- 营养素摄入 -->
                <div class="card">
                    <div class="card-header">
                        <span class="card-title">营养素摄入</span>
                    </div>
                    
                    <div class="stats-grid stats-grid-3">
                        ${this.renderNutrientCard('碳水', todayDiet.carbs, this.getDailyCarbs(dailyCalories), 'g', 'var(--warning)')}
                        ${this.renderNutrientCard('蛋白质', todayDiet.protein, this.getDailyProtein(dailyCalories), 'g', 'var(--danger)')}
                        ${this.renderNutrientCard('脂肪', todayDiet.fat, this.getDailyFat(dailyCalories), 'g', 'var(--info)')}
                    </div>
                </div>

                <!-- 体重趋势 -->
                <div class="card">
                    <div class="card-header">
                        <span class="card-title">体重趋势</span>
                        <a href="#/weight" class="btn btn-secondary" style="font-size: 12px; padding: 4px 12px;">查看详情</a>
                    </div>
                    <div class="chart-container" id="weight-trend-chart"></div>
                </div>

                <!-- 今日饮食 -->
                <div class="card">
                    <div class="card-header">
                        <span class="card-title">今日饮食</span>
                        <a href="#/diet" class="btn btn-secondary" style="font-size: 12px; padding: 4px 12px;">记录饮食</a>
                    </div>
                    <div id="today-meals">
                        ${await this.renderTodayMeals()}
                    </div>
                </div>

                <!-- 快捷操作 -->
                <div class="card">
                    <div class="card-header">
                        <span class="card-title">快捷操作</span>
                    </div>
                    <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px;">
                        <button class="btn btn-outline btn-full" onclick="Router.navigate('/weight')">
                            📊 记录体重
                        </button>
                        <button class="btn btn-outline btn-full" onclick="Router.navigate('/diet')">
                            🍽️ 记录饮食
                        </button>
                        <button class="btn btn-outline btn-full" onclick="Router.navigate('/nutrition')">
                            📈 营养分析
                        </button>
                        <button class="btn btn-outline btn-full" onclick="Camera.open()">
                            📷 拍照识别
                        </button>
                    </div>
                </div>
            </div>
        `;

        // 初始化图表
        await this.initCharts();
    },

    // 获取问候语
    getGreeting() {
        const hour = new Date().getHours();
        if (hour < 6) return '夜深了，注意休息';
        if (hour < 9) return '早上好，新的一天开始了';
        if (hour < 12) return '上午好，记得吃早餐';
        if (hour < 14) return '中午好，午餐吃得健康吗？';
        if (hour < 18) return '下午好，保持活力';
        if (hour < 22) return '晚上好，今天过得怎么样？';
        return '夜深了，早点休息';
    },

    // 获取体重变化
    async getWeightChange(todayWeight) {
        const yesterday = DB.getDateStringBefore(1);
        const yesterdayWeight = await DB.getWeightByDate(yesterday);
        
        if (!yesterdayWeight) return '';
        
        const change = (todayWeight.weight - yesterdayWeight.weight).toFixed(1);
        const isUp = change > 0;
        
        return `<div class="stat-change ${isUp ? 'up' : 'down'}">
            ${isUp ? '↑' : '↓'} ${Math.abs(change)} kg
        </div>`;
    },

    // 渲染营养素卡片
    renderNutrientCard(name, current, target, unit, color) {
        const percent = Math.min(current / target * 100, 100);
        return `
            <div class="stat-card" style="padding: 12px;">
                <div style="font-size: 14px; color: var(--text-secondary); margin-bottom: 8px;">${name}</div>
                <div style="font-size: 20px; font-weight: 700; color: ${color};">${current}${unit}</div>
                <div class="progress-bar" style="margin-top: 8px; height: 4px;">
                    <div class="progress-bar-fill" style="width: ${percent}%; background: ${color};"></div>
                </div>
                <div style="font-size: 12px; color: var(--text-tertiary); margin-top: 4px;">目标 ${target}${unit}</div>
            </div>
        `;
    },

    // 获取每日推荐营养素
    getDailyCarbs(calories) {
        return Math.round(calories * 0.5 / 4); // 50% 碳水，每克 4 kcal
    },

    getDailyProtein(calories) {
        return Math.round(calories * 0.2 / 4); // 20% 蛋白质
    },

    getDailyFat(calories) {
        return Math.round(calories * 0.3 / 9); // 30% 脂肪，每克 9 kcal
    },

    // 渲染今日饮食
    async renderTodayMeals() {
        const meals = await DB.getTodayDietByMeal();
        const mealNames = {
            breakfast: '早餐',
            lunch: '午餐',
            dinner: '晚餐',
            snack: '加餐'
        };

        let html = '';
        let hasFood = false;

        for (const [key, name] of Object.entries(mealNames)) {
            const foods = meals[key];
            if (foods.length > 0) {
                hasFood = true;
                const calories = foods.reduce((sum, f) => sum + f.calories, 0);
                html += `
                    <div class="list-item" style="padding: 12px 0; border-bottom: 1px solid var(--border-color);">
                        <div class="list-item-icon" style="background: var(--bg-tertiary); font-size: 20px;">
                            ${key === 'breakfast' ? '🌅' : key === 'lunch' ? '☀️' : key === 'dinner' ? '🌙' : '🍪'}
                        </div>
                        <div class="list-item-content">
                            <div class="list-item-title">${name}</div>
                            <div class="list-item-subtitle">${foods.length} 种食物</div>
                        </div>
                        <div class="list-item-value" style="color: var(--primary);">${calories} kcal</div>
                    </div>
                `;
            }
        }

        if (!hasFood) {
            html = `
                <div class="empty-state" style="padding: 24px;">
                    <div style="font-size: 40px; margin-bottom: 12px;">🍽️</div>
                    <div class="empty-state-text">今天还没有记录饮食</div>
                    <button class="btn btn-primary" onclick="Router.navigate('/diet')">开始记录</button>
                </div>
            `;
        }

        return html;
    },

    // 初始化图表
    async initCharts() {
        await this.initWeightTrendChart();
    },

    // 体重趋势图
    async initWeightTrendChart() {
        const weights = await DB.getRecentWeights(14);
        const ctx = document.getElementById('weight-trend-chart');
        
        if (!ctx) return;

        // 销毁旧图表
        if (this.charts.weightTrend) {
            this.charts.weightTrend.destroy();
        }

        const labels = weights.map(w => DB.formatDateShort(w.date));
        const data = weights.map(w => w.weight);

        this.charts.weightTrend = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: '体重 (kg)',
                    data: data,
                    borderColor: '#4F46E5',
                    backgroundColor: 'rgba(79, 70, 229, 0.1)',
                    borderWidth: 2,
                    fill: true,
                    tension: 0.3,
                    pointRadius: 4,
                    pointBackgroundColor: '#4F46E5'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    x: {
                        grid: {
                            display: false
                        },
                        ticks: {
                            font: {
                                size: 10
                            }
                        }
                    },
                    y: {
                        grid: {
                            color: 'rgba(0, 0, 0, 0.05)'
                        },
                        ticks: {
                            font: {
                                size: 10
                            }
                        }
                    }
                }
            }
        });
    },

    // 清理
    destroy() {
        if (this.charts.weightTrend) {
            this.charts.weightTrend.destroy();
        }
    }
};

// 导出
window.Dashboard = Dashboard;
