/**
 * 营养分析模块
 */

const Nutrition = {
    charts: {},

    // 渲染页面
    async render() {
        const container = document.getElementById('page-container');

        const todayDiet = await DB.getTodayDietSummary();
        const profile = await DB.getProfile();
        const dailyCalories = DB.calculateDailyCalories(profile);
        const weeklyData = await this.getWeeklyData();

        container.innerHTML = `
            <div class="page">
                <div class="page-header">
                    <h1 class="page-title">营养分析</h1>
                    <p class="page-subtitle">了解你的营养摄入情况</p>
                </div>

                <!-- 今日营养概览 -->
                <div class="card">
                    <div class="card-header">
                        <span class="card-title">今日营养</span>
                        <span class="card-subtitle">${DB.formatDate(DB.getTodayString())}</span>
                    </div>
                    
                    <!-- 热量环形图 -->
                    <div style="display: flex; justify-content: center; margin: 16px 0;">
                        <div class="nutrient-ring">
                            <svg width="120" height="120" viewBox="0 0 120 120">
                                <circle class="nutrient-ring-bg" cx="60" cy="60" r="50"></circle>
                                <circle class="nutrient-ring-fill" cx="60" cy="60" r="50"
                                        stroke="var(--primary)"
                                        stroke-dasharray="${Math.min(todayDiet.calories / dailyCalories, 1) * 314} 314">
                                </circle>
                            </svg>
                            <div class="nutrient-ring-value">
                                <div class="nutrient-ring-number">${Math.round(todayDiet.calories / dailyCalories * 100)}%</div>
                                <div class="nutrient-ring-label">热量目标</div>
                            </div>
                        </div>
                    </div>
                    
                    <div style="text-align: center; margin-bottom: 16px;">
                        <span style="font-size: 28px; font-weight: 700; color: var(--primary);">${todayDiet.calories}</span>
                        <span style="font-size: 14px; color: var(--text-secondary);"> / ${dailyCalories} kcal</span>
                    </div>
                </div>

                <!-- 三大营养素 -->
                <div class="card">
                    <div class="card-header">
                        <span class="card-title">三大营养素</span>
                    </div>
                    
                    ${this.renderNutrientBar('碳水化合物', todayDiet.carbs, this.getDailyCarbs(dailyCalories), 'g', 'var(--warning)')}
                    ${this.renderNutrientBar('蛋白质', todayDiet.protein, this.getDailyProtein(dailyCalories), 'g', 'var(--danger)')}
                    ${this.renderNutrientBar('脂肪', todayDiet.fat, this.getDailyFat(dailyCalories), 'g', 'var(--info)')}
                    
                    <!-- 营养素比例图 -->
                    <div style="margin-top: 24px;">
                        <div style="font-size: 14px; color: var(--text-secondary); margin-bottom: 12px;">营养素比例</div>
                        <div class="chart-container" id="nutrient-ratio-chart"></div>
                    </div>
                </div>

                <!-- 营养评分 -->
                <div class="card">
                    <div class="card-header">
                        <span class="card-title">营养评分</span>
                    </div>
                    <div style="text-align: center; padding: 16px 0;">
                        <div style="font-size: 48px; font-weight: 700; color: var(--primary);">
                            ${this.calculateScore(todayDiet, dailyCalories)}
                        </div>
                        <div style="font-size: 14px; color: var(--text-secondary);">综合评分</div>
                        <div style="margin-top: 16px; font-size: 14px; color: var(--text-secondary);">
                            ${this.getScoreAdvice(todayDiet, dailyCalories)}
                        </div>
                    </div>
                </div>

                <!-- 本周趋势 -->
                <div class="card">
                    <div class="card-header">
                        <span class="card-title">本周热量趋势</span>
                    </div>
                    <div class="chart-container chart-container-lg" id="weekly-chart"></div>
                </div>

                <!-- 饮食建议 -->
                <div class="card">
                    <div class="card-header">
                        <span class="card-title">饮食建议</span>
                    </div>
                    <div class="list">
                        ${this.renderSuggestions(todayDiet, dailyCalories)}
                    </div>
                </div>
            </div>
        `;

        // 初始化图表
        await this.initCharts(todayDiet, weeklyData, dailyCalories);
    },

    // 渲染营养素进度条
    renderNutrientBar(name, current, target, unit, color) {
        const percent = Math.min(current / target * 100, 150);
        return `
            <div style="margin-bottom: 16px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                    <span style="font-size: 14px; color: var(--text-primary);">${name}</span>
                    <span style="font-size: 14px; color: var(--text-secondary);">${current} / ${target} ${unit}</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-bar-fill" style="width: ${Math.min(percent, 100)}%; background: ${percent > 100 ? 'var(--danger)' : color};"></div>
                </div>
            </div>
        `;
    },

    // 获取每日推荐营养素
    getDailyCarbs(calories) {
        return Math.round(calories * 0.5 / 4);
    },

    getDailyProtein(calories) {
        return Math.round(calories * 0.2 / 4);
    },

    getDailyFat(calories) {
        return Math.round(calories * 0.3 / 9);
    },

    // 计算营养评分
    calculateScore(todayDiet, dailyCalories) {
        if (todayDiet.calories === 0) return '--';
        
        let score = 100;
        
        // 热量偏差扣分
        const calorieRatio = todayDiet.calories / dailyCalories;
        if (calorieRatio < 0.8 || calorieRatio > 1.2) {
            score -= Math.abs(calorieRatio - 1) * 30;
        }
        
        // 营养素均衡度
        const total = todayDiet.carbs + todayDiet.protein + todayDiet.fat;
        if (total > 0) {
            const carbsRatio = todayDiet.carbs * 4 / (todayDiet.calories || 1);
            const proteinRatio = todayDiet.protein * 4 / (todayDiet.calories || 1);
            const fatRatio = todayDiet.fat * 9 / (todayDiet.calories || 1);
            
            // 理想比例：碳水50%，蛋白质20%，脂肪30%
            score -= Math.abs(carbsRatio - 0.5) * 20;
            score -= Math.abs(proteinRatio - 0.2) * 20;
            score -= Math.abs(fatRatio - 0.3) * 20;
        }
        
        return Math.max(0, Math.min(100, Math.round(score)));
    },

    // 获取评分建议
    getScoreAdvice(todayDiet, dailyCalories) {
        const score = this.calculateScore(todayDiet, dailyCalories);
        if (score === '--') return '还没有记录饮食数据';
        if (score >= 90) return '非常好！继续保持均衡饮食';
        if (score >= 70) return '还不错，可以适当调整营养搭配';
        if (score >= 50) return '需要注意饮食均衡，多吃蔬菜水果';
        return '饮食结构需要改善，建议咨询营养师';
    },

    // 渲染建议列表
    renderSuggestions(todayDiet, dailyCalories) {
        const suggestions = [];
        
        const calorieRatio = todayDiet.calories / dailyCalories;
        if (calorieRatio < 0.8) {
            suggestions.push({ icon: '⚠️', text: '热量摄入不足，可以适当增加一些健康零食', type: 'warning' });
        } else if (calorieRatio > 1.2) {
            suggestions.push({ icon: '⚠️', text: '热量摄入偏高，建议控制份量', type: 'warning' });
        }
        
        const proteinRatio = todayDiet.protein * 4 / (todayDiet.calories || 1);
        if (proteinRatio < 0.15) {
            suggestions.push({ icon: '🥩', text: '蛋白质摄入不足，可以多吃鸡蛋、鱼肉、豆制品', type: 'info' });
        }
        
        const carbsRatio = todayDiet.carbs * 4 / (todayDiet.calories || 1);
        if (carbsRatio > 0.6) {
            suggestions.push({ icon: '🍚', text: '碳水比例偏高，可以减少主食，增加蔬菜', type: 'info' });
        }
        
        if (suggestions.length === 0) {
            suggestions.push({ icon: '✅', text: '饮食结构良好，继续保持', type: 'success' });
        }
        
        return suggestions.map(s => `
            <div class="list-item">
                <div class="list-item-icon" style="font-size: 24px;">${s.icon}</div>
                <div class="list-item-content">
                    <div class="list-item-subtitle">${s.text}</div>
                </div>
            </div>
        `).join('');
    },

    // 获取本周数据
    async getWeeklyData() {
        const data = [];
        for (let i = 6; i >= 0; i--) {
            const date = DB.getDateStringBefore(i);
            const records = await DB.getDietByDate(date);
            const summary = DB.calculateDietSummary(records);
            data.push({
                date: date,
                ...summary
            });
        }
        return data;
    },

    // 初始化图表
    async initCharts(todayDiet, weeklyData, dailyCalories) {
        this.initNutrientRatioChart(todayDiet);
        this.initWeeklyChart(weeklyData, dailyCalories);
    },

    // 营养素比例图
    initNutrientRatioChart(todayDiet) {
        const ctx = document.getElementById('nutrient-ratio-chart');
        if (!ctx) return;

        if (this.charts.nutrientRatio) {
            this.charts.nutrientRatio.destroy();
        }

        const total = todayDiet.carbs + todayDiet.protein + todayDiet.fat;
        if (total === 0) {
            ctx.parentElement.innerHTML = '<div style="text-align: center; color: var(--text-tertiary); padding: 40px;">暂无数据</div>';
            return;
        }

        this.charts.nutrientRatio = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['碳水化合物', '蛋白质', '脂肪'],
                datasets: [{
                    data: [todayDiet.carbs, todayDiet.protein, todayDiet.fat],
                    backgroundColor: ['#F59E0B', '#EF4444', '#3B82F6'],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 16,
                            usePointStyle: true
                        }
                    }
                },
                cutout: '60%'
            }
        });
    },

    // 本周趋势图
    initWeeklyChart(weeklyData, dailyCalories) {
        const ctx = document.getElementById('weekly-chart');
        if (!ctx) return;

        if (this.charts.weekly) {
            this.charts.weekly.destroy();
        }

        this.charts.weekly = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: weeklyData.map(d => DB.formatDateShort(d.date)),
                datasets: [{
                    label: '热量 (kcal)',
                    data: weeklyData.map(d => d.calories),
                    backgroundColor: weeklyData.map(d => 
                        d.calories > dailyCalories ? 'rgba(239, 68, 68, 0.8)' : 'rgba(79, 70, 229, 0.8)'
                    ),
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    annotation: {
                        annotations: {
                            line1: {
                                type: 'line',
                                yMin: dailyCalories,
                                yMax: dailyCalories,
                                borderColor: 'rgba(239, 68, 68, 0.5)',
                                borderWidth: 2,
                                borderDash: [5, 5]
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        grid: { display: false }
                    },
                    y: {
                        grid: { color: 'rgba(0, 0, 0, 0.05)' },
                        beginAtZero: true
                    }
                }
            }
        });
    },

    // 清理
    destroy() {
        if (this.charts.nutrientRatio) {
            this.charts.nutrientRatio.destroy();
        }
        if (this.charts.weekly) {
            this.charts.weekly.destroy();
        }
    }
};

// 导出
window.Nutrition = Nutrition;
