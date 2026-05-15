/**
 * 数据库模块 - IndexedDB 封装
 * 用于存储体重记录、饮食记录、用户设置等
 */

const DB = {
    name: 'HealthAppDB',
    version: 1,
    db: null,

    // 存储仓定义
    stores: {
        weight: 'weight',       // 体重记录
        diet: 'diet',           // 饮食记录
        profile: 'profile',     // 用户档案
        settings: 'settings',   // 应用设置
        customFoods: 'customFoods' // 自定义食物
    },

    // 初始化数据库
    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.name, this.version);

            request.onerror = () => {
                console.error('数据库打开失败:', request.error);
                reject(request.error);
            };

            request.onsuccess = () => {
                this.db = request.result;
                console.log('数据库连接成功');
                resolve(this.db);
            };

            request.onupgradeneeded = (event) => {
                const db = event.target.result;

                // 体重记录存储
                if (!db.objectStoreNames.contains(this.stores.weight)) {
                    const weightStore = db.createObjectStore(this.stores.weight, {
                        keyPath: 'id',
                        autoIncrement: true
                    });
                    weightStore.createIndex('date', 'date', { unique: true });
                    weightStore.createIndex('timestamp', 'timestamp', { unique: false });
                }

                // 饮食记录存储
                if (!db.objectStoreNames.contains(this.stores.diet)) {
                    const dietStore = db.createObjectStore(this.stores.diet, {
                        keyPath: 'id',
                        autoIncrement: true
                    });
                    dietStore.createIndex('date', 'date', { unique: false });
                    dietStore.createIndex('meal', 'meal', { unique: false });
                    dietStore.createIndex('timestamp', 'timestamp', { unique: false });
                }

                // 用户档案存储
                if (!db.objectStoreNames.contains(this.stores.profile)) {
                    db.createObjectStore(this.stores.profile, {
                        keyPath: 'key'
                    });
                }

                // 应用设置存储
                if (!db.objectStoreNames.contains(this.stores.settings)) {
                    db.createObjectStore(this.stores.settings, {
                        keyPath: 'key'
                    });
                }

                // 自定义食物存储
                if (!db.objectStoreNames.contains(this.stores.customFoods)) {
                    db.createObjectStore(this.stores.customFoods, {
                        keyPath: 'id',
                        autoIncrement: true
                    });
                }

                console.log('数据库结构创建完成');
            };
        });
    },

    // 通用方法：添加数据
    async add(storeName, data) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.add({
                ...data,
                timestamp: Date.now()
            });

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    },

    // 通用方法：更新数据
    async put(storeName, data) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.put({
                ...data,
                timestamp: Date.now()
            });

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    },

    // 通用方法：获取单条数据
    async get(storeName, key) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readonly');
            const store = transaction.objectStore(storeName);
            const request = store.get(key);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    },

    // 通用方法：获取所有数据
    async getAll(storeName) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readonly');
            const store = transaction.objectStore(storeName);
            const request = store.getAll();

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    },

    // 通用方法：删除数据
    async delete(storeName, key) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.delete(key);

            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    },

    // 通用方法：清空存储
    async clear(storeName) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readwrite');
            const store = transaction.objectStore(storeName);
            const request = store.clear();

            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    },

    // 按索引范围查询
    async getByIndexRange(storeName, indexName, lower, upper) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([storeName], 'readonly');
            const store = transaction.objectStore(storeName);
            const index = store.index(indexName);
            const range = IDBKeyRange.bound(lower, upper);
            const request = index.getAll(range);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    },

    // ==================== 体重相关方法 ====================

    // 添加体重记录
    async addWeight(weight, date = null) {
        const recordDate = date || this.getTodayString();
        const existing = await this.getWeightByDate(recordDate);
        
        if (existing) {
            return this.put(this.stores.weight, {
                ...existing,
                weight: weight
            });
        }
        
        return this.add(this.stores.weight, {
            date: recordDate,
            weight: weight
        });
    },

    // 获取指定日期的体重
    async getWeightByDate(date) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.stores.weight], 'readonly');
            const store = transaction.objectStore(this.stores.weight);
            const index = store.index('date');
            const request = index.get(date);

            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    },

    // 获取体重记录（按日期范围）
    async getWeightRange(startDate, endDate) {
        return this.getByIndexRange(this.stores.weight, 'date', startDate, endDate);
    },

    // 获取最近 N 天的体重记录
    async getRecentWeights(days = 30) {
        const endDate = this.getTodayString();
        const startDate = this.getDateStringBefore(days);
        const records = await this.getWeightRange(startDate, endDate);
        return records.sort((a, b) => a.date.localeCompare(b.date));
    },

    // 获取所有体重记录
    async getAllWeights() {
        const records = await this.getAll(this.stores.weight);
        return records.sort((a, b) => a.date.localeCompare(b.date));
    },

    // ==================== 饮食相关方法 ====================

    // 添加饮食记录
    async addDietRecord(record) {
        return this.add(this.stores.diet, {
            date: record.date || this.getTodayString(),
            meal: record.meal, // breakfast, lunch, dinner, snack
            foodId: record.foodId,
            foodName: record.foodName,
            foodIcon: record.foodIcon,
            grams: record.grams,
            calories: record.calories,
            protein: record.protein,
            carbs: record.carbs,
            fat: record.fat
        });
    },

    // 获取指定日期的饮食记录
    async getDietByDate(date) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction([this.stores.diet], 'readonly');
            const store = transaction.objectStore(this.stores.diet);
            const index = store.index('date');
            const request = index.getAll(date);

            request.onsuccess = () => resolve(request.result || []);
            request.onerror = () => reject(request.error);
        });
    },

    // 获取饮食记录（按日期范围）
    async getDietRange(startDate, endDate) {
        return this.getByIndexRange(this.stores.diet, 'date', startDate, endDate);
    },

    // 删除饮食记录
    async deleteDietRecord(id) {
        return this.delete(this.stores.diet, id);
    },

    // 获取今日饮食汇总
    async getTodayDietSummary() {
        const records = await this.getDietByDate(this.getTodayString());
        return this.calculateDietSummary(records);
    },

    // 计算饮食汇总
    calculateDietSummary(records) {
        return records.reduce((summary, record) => {
            summary.calories += record.calories || 0;
            summary.protein += record.protein || 0;
            summary.carbs += record.carbs || 0;
            summary.fat += record.fat || 0;
            return summary;
        }, { calories: 0, protein: 0, carbs: 0, fat: 0 });
    },

    // 按餐次分组获取今日饮食
    async getTodayDietByMeal() {
        const records = await this.getDietByDate(this.getTodayString());
        return {
            breakfast: records.filter(r => r.meal === 'breakfast'),
            lunch: records.filter(r => r.meal === 'lunch'),
            dinner: records.filter(r => r.meal === 'dinner'),
            snack: records.filter(r => r.meal === 'snack')
        };
    },

    // ==================== 用户档案相关方法 ====================

    // 保存用户档案
    async saveProfile(profile) {
        return this.put(this.stores.profile, {
            key: 'userProfile',
            ...profile
        });
    },

    // 获取用户档案
    async getProfile() {
        return this.get(this.stores.profile, 'userProfile');
    },

    // 计算每日推荐热量
    calculateDailyCalories(profile) {
        if (!profile || !profile.height || !profile.weight || !profile.age || !profile.gender) {
            return 2000; // 默认值
        }

        // Mifflin-St Jeor 公式
        let bmr;
        if (profile.gender === 'male') {
            bmr = 10 * profile.weight + 6.25 * profile.height - 5 * profile.age + 5;
        } else {
            bmr = 10 * profile.weight + 6.25 * profile.height - 5 * profile.age - 161;
        }

        // 活动系数
        const activityFactors = {
            sedentary: 1.2,      // 久坐
            light: 1.375,        // 轻度活动
            moderate: 1.55,      // 中度活动
            active: 1.725,       // 高度活动
            veryActive: 1.9      // 非常活跃
        };

        const factor = activityFactors[profile.activityLevel] || 1.2;
        let tdee = bmr * factor;

        // 目标调整
        if (profile.goal === 'lose') {
            tdee -= 500; // 减脂
        } else if (profile.goal === 'gain') {
            tdee += 300; // 增肌
        }

        return Math.round(tdee);
    },

    // 计算 BMI
    calculateBMI(weight, height) {
        if (!weight || !height) return null;
        const heightM = height / 100;
        return (weight / (heightM * heightM)).toFixed(1);
    },

    // 获取 BMI 状态
    getBMIStatus(bmi) {
        if (!bmi) return { status: 'unknown', label: '未知', color: 'var(--text-tertiary)' };
        if (bmi < 18.5) return { status: 'underweight', label: '偏瘦', color: 'var(--info)' };
        if (bmi < 24) return { status: 'normal', label: '正常', color: 'var(--success)' };
        if (bmi < 28) return { status: 'overweight', label: '超重', color: 'var(--warning)' };
        return { status: 'obese', label: '肥胖', color: 'var(--danger)' };
    },

    // ==================== 设置相关方法 ====================

    // 保存设置
    async saveSetting(key, value) {
        return this.put(this.stores.settings, {
            key: key,
            value: value
        });
    },

    // 获取设置
    async getSetting(key, defaultValue = null) {
        const result = await this.get(this.stores.settings, key);
        return result ? result.value : defaultValue;
    },

    // ==================== 数据导出/导入 ====================

    // 导出所有数据
    async exportData() {
        const data = {
            version: this.version,
            exportDate: new Date().toISOString(),
            weight: await this.getAll(this.stores.weight),
            diet: await this.getAll(this.stores.diet),
            profile: await this.getProfile(),
            settings: await this.getAll(this.stores.settings),
            customFoods: await this.getAll(this.stores.customFoods)
        };
        return data;
    },

    // 导入数据
    async importData(data) {
        if (data.weight) {
            for (const record of data.weight) {
                await this.put(this.stores.weight, record);
            }
        }
        if (data.diet) {
            for (const record of data.diet) {
                await this.put(this.stores.diet, record);
            }
        }
        if (data.profile) {
            await this.saveProfile(data.profile);
        }
        if (data.settings) {
            for (const setting of data.settings) {
                await this.put(this.stores.settings, setting);
            }
        }
        if (data.customFoods) {
            for (const food of data.customFoods) {
                await this.put(this.stores.customFoods, food);
            }
        }
    },

    // 导出为 JSON 文件
    async exportToFile() {
        const data = await this.exportData();
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `健康管家数据_${this.getTodayString()}.json`;
        a.click();
        URL.revokeObjectURL(url);
    },

    // ==================== 工具方法 ====================

    // 获取今天的日期字符串 (YYYY-MM-DD)
    getTodayString() {
        return new Date().toISOString().split('T')[0];
    },

    // 获取 N 天前的日期字符串
    getDateStringBefore(days) {
        const date = new Date();
        date.setDate(date.getDate() - days);
        return date.toISOString().split('T')[0];
    },

    // 格式化日期显示
    formatDate(dateString) {
        const date = new Date(dateString);
        const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const weekday = weekdays[date.getDay()];
        return `${month}月${day}日 ${weekday}`;
    },

    // 格式化日期简短显示
    formatDateShort(dateString) {
        const date = new Date(dateString);
        return `${date.getMonth() + 1}/${date.getDate()}`;
    }
};

// 导出
window.DB = DB;
