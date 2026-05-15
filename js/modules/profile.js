/**
 * 个人设置模块
 */

const Profile = {
    // 渲染页面
    async render() {
        const container = document.getElementById('page-container');
        const profile = await DB.getProfile();
        const theme = await DB.getSetting('theme', 'light');

        container.innerHTML = `
            <div class="page">
                <div class="page-header">
                    <h1 class="page-title">我的</h1>
                    <p class="page-subtitle">个人设置与数据管理</p>
                </div>

                <!-- 用户信息 -->
                <div class="card">
                    <div class="card-header">
                        <span class="card-title">个人信息</span>
                    </div>
                    ${profile ? this.renderProfileSummary(profile) : this.renderProfileEmpty()}
                </div>

                <!-- 应用设置 -->
                <div class="settings-section">
                    <div class="settings-section-title">应用设置</div>
                    <div class="settings-item" onclick="Profile.toggleTheme()">
                        <div class="settings-item-left">
                            <div class="settings-item-icon">🌙</div>
                            <span class="settings-item-label">深色模式</span>
                        </div>
                        <div class="toggle ${theme === 'dark' ? 'active' : ''}" id="theme-toggle"></div>
                    </div>
                </div>

                <!-- 健康管理（后期功能预留） -->
                <div class="settings-section">
                    <div class="settings-section-title">健康管理</div>
                    <div class="settings-item future-feature">
                        <div class="settings-item-left">
                            <div class="settings-item-icon">🏥</div>
                            <span class="settings-item-label">疾病记录</span>
                        </div>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </div>
                    <div class="settings-item future-feature">
                        <div class="settings-item-left">
                            <div class="settings-item-icon">💊</div>
                            <span class="settings-item-label">用药管理</span>
                        </div>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </div>
                    <div class="settings-item future-feature">
                        <div class="settings-item-left">
                            <div class="settings-item-icon">📋</div>
                            <span class="settings-item-label">随访管理</span>
                        </div>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </div>
                </div>

                <!-- 数据管理 -->
                <div class="settings-section">
                    <div class="settings-section-title">数据管理</div>
                    <div class="settings-item" onclick="Profile.exportData()">
                        <div class="settings-item-left">
                            <div class="settings-item-icon">📤</div>
                            <span class="settings-item-label">导出数据</span>
                        </div>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </div>
                    <div class="settings-item" onclick="Profile.importData()">
                        <div class="settings-item-left">
                            <div class="settings-item-icon">📥</div>
                            <span class="settings-item-label">导入数据</span>
                        </div>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </div>
                    <div class="settings-item" onclick="Profile.clearData()">
                        <div class="settings-item-left">
                            <div class="settings-item-icon" style="color: var(--danger);">🗑️</div>
                            <span class="settings-item-label" style="color: var(--danger);">清除所有数据</span>
                        </div>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--danger)" stroke-width="2">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </div>
                </div>

                <!-- 关于 -->
                <div class="settings-section">
                    <div class="settings-section-title">关于</div>
                    <div class="settings-item">
                        <div class="settings-item-left">
                            <div class="settings-item-icon">ℹ️</div>
                            <span class="settings-item-label">版本</span>
                        </div>
                        <span style="color: var(--text-secondary);">1.0.0</span>
                    </div>
                </div>
            </div>
        `;
    },

    // 渲染档案摘要
    renderProfileSummary(profile) {
        const bmi = DB.calculateBMI(profile.weight, profile.height);
        const status = DB.getBMIStatus(bmi);
        
        return `
            <div style="display: flex; align-items: center; padding: 8px 0;">
                <div style="width: 64px; height: 64px; border-radius: 50%; background: var(--primary); 
                            display: flex; align-items: center; justify-content: center; font-size: 28px; margin-right: 16px;">
                    ${profile.gender === 'male' ? '👨' : '👩'}
                </div>
                <div style="flex: 1;">
                    <div style="font-size: 18px; font-weight: 600; margin-bottom: 4px;">
                        ${profile.name || '未设置姓名'}
                    </div>
                    <div style="font-size: 14px; color: var(--text-secondary);">
                        ${profile.age || '--'}岁 · ${profile.height || '--'}cm · ${profile.weight || '--'}kg
                    </div>
                    <div style="margin-top: 8px;">
                        <span class="tag" style="background: ${status.color}20; color: ${status.color};">
                            BMI ${bmi || '--'} ${status.label}
                        </span>
                    </div>
                </div>
                <button class="btn btn-secondary" onclick="Profile.openEditProfile()">编辑</button>
            </div>
        `;
    },

    // 渲染空档案
    renderProfileEmpty() {
        return `
            <div class="empty-state" style="padding: 24px;">
                <div style="font-size: 40px; margin-bottom: 12px;">👤</div>
                <div class="empty-state-text">还没有设置个人信息</div>
                <button class="btn btn-primary" onclick="Profile.openEditProfile()" style="margin-top: 12px;">
                    设置个人信息
                </button>
            </div>
        `;
    },

    // 打开编辑档案
    openEditProfile() {
        DB.getProfile().then(profile => {
            const modalHtml = `
                <div class="modal-overlay" id="edit-profile-modal">
                    <div class="modal">
                        <div class="modal-header">
                            <span class="modal-title">个人信息</span>
                            <button class="modal-close" onclick="Profile.closeEditProfile()">✕</button>
                        </div>
                        <div class="modal-body">
                            <div class="form-group">
                                <label class="form-label">姓名</label>
                                <input type="text" id="profile-name" class="form-input" 
                                       placeholder="请输入姓名" value="${profile?.name || ''}">
                            </div>
                            <div class="form-group">
                                <label class="form-label">性别</label>
                                <select id="profile-gender" class="form-input form-select">
                                    <option value="">请选择</option>
                                    <option value="male" ${profile?.gender === 'male' ? 'selected' : ''}>男</option>
                                    <option value="female" ${profile?.gender === 'female' ? 'selected' : ''}>女</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">年龄</label>
                                <input type="number" id="profile-age" class="form-input" 
                                       placeholder="请输入年龄" min="1" max="120" value="${profile?.age || ''}">
                            </div>
                            <div class="form-group">
                                <label class="form-label">身高 (cm)</label>
                                <input type="number" id="profile-height" class="form-input" 
                                       placeholder="请输入身高" min="50" max="250" value="${profile?.height || ''}">
                            </div>
                            <div class="form-group">
                                <label class="form-label">体重 (kg)</label>
                                <input type="number" id="profile-weight" class="form-input" 
                                       placeholder="请输入体重" min="20" max="300" step="0.1" value="${profile?.weight || ''}">
                            </div>
                            <div class="form-group">
                                <label class="form-label">活动水平</label>
                                <select id="profile-activity" class="form-input form-select">
                                    <option value="sedentary" ${profile?.activityLevel === 'sedentary' ? 'selected' : ''}>久坐（很少运动）</option>
                                    <option value="light" ${profile?.activityLevel === 'light' ? 'selected' : ''}>轻度活动（每周1-3次）</option>
                                    <option value="moderate" ${profile?.activityLevel === 'moderate' ? 'selected' : ''}>中度活动（每周3-5次）</option>
                                    <option value="active" ${profile?.activityLevel === 'active' ? 'selected' : ''}>高度活动（每周6-7次）</option>
                                    <option value="veryActive" ${profile?.activityLevel === 'veryActive' ? 'selected' : ''}>非常活跃（体力劳动/训练）</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label class="form-label">目标</label>
                                <select id="profile-goal" class="form-input form-select">
                                    <option value="maintain" ${profile?.goal === 'maintain' ? 'selected' : ''}>保持体重</option>
                                    <option value="lose" ${profile?.goal === 'lose' ? 'selected' : ''}>减脂</option>
                                    <option value="gain" ${profile?.goal === 'gain' ? 'selected' : ''}>增肌</option>
                                </select>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <button class="btn btn-secondary" onclick="Profile.closeEditProfile()">取消</button>
                            <button class="btn btn-primary" onclick="Profile.saveProfile()">保存</button>
                        </div>
                    </div>
                </div>
            `;
            
            document.getElementById('modal-container').innerHTML = modalHtml;
            setTimeout(() => {
                document.getElementById('edit-profile-modal').classList.add('show');
            }, 10);
        });
    },

    // 关闭编辑档案
    closeEditProfile() {
        const modal = document.getElementById('edit-profile-modal');
        if (modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.remove();
            }, 250);
        }
    },

    // 保存档案
    async saveProfile() {
        const profile = {
            name: document.getElementById('profile-name').value.trim(),
            gender: document.getElementById('profile-gender').value,
            age: parseInt(document.getElementById('profile-age').value) || null,
            height: parseInt(document.getElementById('profile-height').value) || null,
            weight: parseFloat(document.getElementById('profile-weight').value) || null,
            activityLevel: document.getElementById('profile-activity').value,
            goal: document.getElementById('profile-goal').value
        };

        try {
            await DB.saveProfile(profile);
            this.closeEditProfile();
            App.showToast('保存成功');
            await this.render();
        } catch (error) {
            console.error('保存失败:', error);
            App.showToast('保存失败，请重试');
        }
    },

    // 切换主题
    async toggleTheme() {
        const currentTheme = await DB.getSetting('theme', 'light');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        await DB.saveSetting('theme', newTheme);
        document.documentElement.setAttribute('data-theme', newTheme);
        
        // 更新开关状态
        const toggle = document.getElementById('theme-toggle');
        if (toggle) {
            toggle.classList.toggle('active');
        }
        
        App.showToast(`已切换到${newTheme === 'dark' ? '深色' : '浅色'}模式`);
    },

    // 导出数据
    async exportData() {
        try {
            await DB.exportToFile();
            App.showToast('数据导出成功');
        } catch (error) {
            console.error('导出失败:', error);
            App.showToast('导出失败，请重试');
        }
    },

    // 导入数据
    importData() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = async (e) => {
            const file = e.target.files[0];
            if (!file) return;
            
            try {
                const text = await file.text();
                const data = JSON.parse(text);
                
                if (!data.version || !data.exportDate) {
                    throw new Error('无效的数据文件');
                }
                
                if (!confirm('导入数据将覆盖现有数据，确定继续吗？')) {
                    return;
                }
                
                await DB.importData(data);
                App.showToast('数据导入成功');
                await this.render();
            } catch (error) {
                console.error('导入失败:', error);
                App.showToast('导入失败，请检查文件格式');
            }
        };
        input.click();
    },

    // 清除数据
    async clearData() {
        if (!confirm('确定要清除所有数据吗？此操作不可恢复！')) {
            return;
        }
        
        if (!confirm('再次确认：所有体重、饮食记录将被永久删除！')) {
            return;
        }
        
        try {
            await DB.clear(DB.stores.weight);
            await DB.clear(DB.stores.diet);
            await DB.clear(DB.stores.profile);
            App.showToast('数据已清除');
            await this.render();
        } catch (error) {
            console.error('清除失败:', error);
            App.showToast('清除失败，请重试');
        }
    }
};

// 导出
window.Profile = Profile;
