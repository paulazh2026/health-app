/**
 * 体重管理模块
 */

const Weight = {
    charts: {},
    currentDate: null,

    // 渲染页面
    async render() {
        const container = document.getElementById('page-container');
        this.currentDate = DB.getTodayString();

        const profile = await DB.getProfile();
        const todayWeight = await DB.getWeightByDate(this.currentDate);
        const weights = await DB.getRecentWeights(30);

        container.innerHTML = `
            <div class="page">
                <div class="page-header">
                    <h1 class="page-title">体重管理</h1>
                    <p class="page-subtitle">记录体重，追踪健康变化</p>
                </div>

                <!-- 当前体重 -->
                <div class="card">
                    <div class="weight-display">
                        <div class="weight-value">
                            ${todayWeight ? todayWeight.weight : '--'}
                            <span class="weight-unit">kg</span>
                        </div>
                        ${profile ? this.renderBMI(profile, todayWeight) : ''}
                    </div>
                </div>

                <!-- 记录体重 -->
                <div class="card">
                    <div class="card-header">
                        <span class="card-title">记录体重</span>
                    </div>
                    <div class="form-group">
                        <div style="display: flex; gap: 12px; align-items: flex-end;">
                            <div style="flex: 1;">
                                <label class="form-label">体重 (kg)</label>
                                <input type="number" id="weight-input" class="form-input" 
                                       placeholder="输入体重" step="0.1" min="20" max="300"
                                       value="${todayWeight ? todayWeight.weight : ''}">
                            </div>
                            <button class="btn btn-primary btn-lg" onclick="Weight.saveWeight()">保存</button>
                        </div>
                    </div>
                </div>

                <!-- 体重趋势 -->
                <div class="card">
                    <div class="card-header">
                        <span class="card-title">体重趋势</span>
                        <div class="btn-group">
                            <button class="btn btn-secondary ${this.chartRange === 7 ? 'active' : ''}" 
                                    onclick="Weight.changeChartRange(7)" style="font-size: 12px; padding: 4px 8px;">7天</button>
                            <button class="btn btn-secondary ${this.chartRange === 30 ? 'active' : ''}" 
                                    onclick="Weight.changeChartRange(30)" style="font-size: 12px; padding: 4px 8px;">30天</button>
                        </div>
                    </div>
                    <div class="chart-container chart-container-lg" id="weight-chart"></div>
                </div>

                <!-- 统计信息 -->
                <div class="card">
                    <div class="card-header">
                        <span class="card-title">统计信息</span>
                    </div>
                    <div class="stats-grid">
                        <div class="stat-card">
                            <div class="stat-value">${this.calculateAvg(weights)}</div>
                            <div class="stat-label">平均体重 (kg)</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-value">${this.calculateMax(weights)}</div>
                            <div class="stat-label">最高体重 (kg)</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-value">${this.calculateMin(weights)}</div>
                            <div class="stat-label">最低体重 (kg)</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-value">${this.calculateChange(weights)}</div>
                            <div class="stat-label">本周变化 (kg)</div>
                        </div>
                    </div>
                </div>

                <!-- 历史记录 -->
                <div class="card">
                    <div class="card-header">
                        <span class="card-title">历史记录</span>
                    </div>
                    <div class="list" id="weight-history">
                        ${this.renderHistory(weights.slice(-10).reverse())}
                    </div>
                </div>
            </div>
        `;

        // 初始化图表
        await this.initChart(weights);
    },

    // 渲染 BMI
    renderBMI(profile, todayWeight) {
        if (!todayWeight || !profile.height) return '';
        
        const bmi = DB.calculateBMI(todayWeight.weight, profile.height);
        const status = DB.getBMIStatus(bmi);
        
        // 计算 BMI 在条上的位置 (15-35 范围)
        const position = Math.max(0, Math.min(100, (bmi - 15) / 20 * 100));
        
        return `
            <div class="bmi-indicator">
                <div style="display: flex; justify-content: center; align-items: baseline; gap: 8px; margin-bottom: 12px;">
                    <span style="font-size: 24px; font-weight: 600; color: ${status.color};">BMI ${bmi}</span>
                    <span class="tag" style="background: ${status.color}20; color: ${status.color};">${status.label}</span>
                </div>
                <div class="bmi-bar">
                    <div class="bmi-marker" style="left: ${position}%;"></div>
                </div>
                <div class="bmi-labels">
                    <span>偏瘦</span>
                    <span>正常</span>
                    <span>超重</span>
                    <span>肥胖</span>
                </div>
            </div>
        `;
    },

    // 保存体重
    async saveWeight() {
        const input = document.getElementById('weight-input');
        const weight = parseFloat(input.value);
        
        if (!weight || weight < 20 || weight > 300) {
            App.showToast('请输入有效的体重 (20-300 kg)');
            return;
        }

        try {
            await DB.addWeight(weight);
            App.showToast('体重记录成功');
            await this.render();
        } catch (error) {
            console.error('保存失败:', error);
            App.showToast('保存失败，请重试');
        }
    },

    // 初始化图表
    async initChart(weights) {
        const ctx = document.getElementById('weight-chart');
        if (!ctx) return;

        if (this.charts.weight) {
            this.charts.weight.destroy();
        }

        const range = this.chartRange || 30;
        const data = weights.slice(-range);

        this.charts.weight = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.map(w => DB.formatDateShort(w.date)),
                datasets: [{
                    label: '体重 (kg)',
                    data: data.map(w => w.weight),
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
                    legend: { display: false }
                },
                scales: {
                    x: {
                        grid: { display: false }
                    },
                    y: {
                        grid: { color: 'rgba(0, 0, 0, 0.05)' }
                    }
                }
            }
        });
    },

    // 改变图表范围
    async changeChartRange(days) {
        this.chartRange = days;
        const weights = await DB.getRecentWeights(days);
        await this.initChart(weights);
        
        // 更新按钮状态
        document.querySelectorAll('.btn-group .btn').forEach(btn => {
            btn.classList.remove('active');
        });
        event.target.classList.add('active');
    },

    // 渲染历史记录
    renderHistory(weights) {
        if (weights.length === 0) {
            return `
                <div class="empty-state" style="padding: 24px;">
                    <div style="font-size: 40px; margin-bottom: 12px;">📊</div>
                    <div class="empty-state-text">暂无体重记录</div>
                </div>
            `;
        }

        return weights.map(w => `
            <div class="list-item">
                <div class="list-item-icon" style="background: var(--primary); color: white;">
                    ⚖️
                </div>
                <div class="list-item-content">
                    <div class="list-item-title">${DB.formatDate(w.date)}</div>
                </div>
                <div class="list-item-value">${w.weight} kg</div>
            </div>
        `).join('');
    },

    // 计算平均值
    calculateAvg(weights) {
        if (weights.length === 0) return '--';
        const sum = weights.reduce((a, b) => a + b.weight, 0);
        return (sum / weights.length).toFixed(1);
    },

    // 计算最大值
    calculateMax(weights) {
        if (weights.length === 0) return '--';
        return Math.max(...weights.map(w => w.weight)).toFixed(1);
    },

    // 计算最小值
    calculateMin(weights) {
        if (weights.length === 0) return '--';
        return Math.min(...weights.map(w => w.weight)).toFixed(1);
    },

    // 计算变化
    calculateChange(weights) {
        if (weights.length < 2) return '--';
        const recent = weights.slice(-7);
        if (recent.length < 2) return '--';
        const change = recent[recent.length - 1].weight - recent[0].weight;
        return (change >= 0 ? '+' : '') + change.toFixed(1);
    },

    // 清理
    destroy() {
        if (this.charts.weight) {
            this.charts.weight.destroy();
        }
    }
};

// 导出
window.Weight = Weight;
