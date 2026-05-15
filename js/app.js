/**
 * 应用入口
 */

const App = {
    // 初始化应用
    async init() {
        console.log('健康管家启动中...');
        
        // 显示加载状态
        this.showLoading('正在初始化...');
        
        try {
            // 初始化数据库
            await DB.init();
            
            // 加载主题设置
            const theme = await DB.getSetting('theme', 'light');
            document.documentElement.setAttribute('data-theme', theme);
            
            // 注册路由
            Router.register('/dashboard', () => Dashboard.render());
            Router.register('/weight', () => Weight.render());
            Router.register('/diet', () => Diet.render());
            Router.register('/nutrition', () => Nutrition.render());
            Router.register('/profile', () => Profile.render());
            
            // 初始化路由
            Router.init();
            
            // 预加载 AI 模型（后台加载）
            this.preloadAIModel();
            
            console.log('健康管家启动完成');
        } catch (error) {
            console.error('初始化失败:', error);
            this.showToast('初始化失败，请刷新页面重试');
        } finally {
            this.hideLoading();
        }
    },

    // 预加载 AI 模型
    async preloadAIModel() {
        // 延迟加载，不阻塞主流程
        setTimeout(async () => {
            try {
                console.log('后台加载 AI 模型...');
                await FoodRecognizer.loadModel();
            } catch (error) {
                console.warn('AI 模型加载失败:', error);
            }
        }, 3000);
    },

    // 显示 Toast 提示
    showToast(message, duration = 2000) {
        const toast = document.getElementById('toast');
        toast.textContent = message;
        toast.classList.add('show');
        
        setTimeout(() => {
            toast.classList.remove('show');
        }, duration);
    },

    // 显示加载状态
    showLoading(text = '加载中...') {
        const loading = document.getElementById('loading');
        const loadingText = loading.querySelector('.loading-text');
        if (loadingText) {
            loadingText.textContent = text;
        }
        loading.classList.remove('hidden');
    },

    // 隐藏加载状态
    hideLoading() {
        const loading = document.getElementById('loading');
        loading.classList.add('hidden');
    },

    // 显示模态框
    showModal(options) {
        const { title, content, onConfirm, onCancel } = options;
        
        const modalHtml = `
            <div class="modal-overlay" id="app-modal">
                <div class="modal">
                    <div class="modal-header">
                        <span class="modal-title">${title}</span>
                        <button class="modal-close" onclick="App.closeModal()">✕</button>
                    </div>
                    <div class="modal-body">
                        ${content}
                    </div>
                </div>
            </div>
        `;
        
        document.getElementById('modal-container').innerHTML = modalHtml;
        setTimeout(() => {
            document.getElementById('app-modal').classList.add('show');
        }, 10);
    },

    // 关闭模态框
    closeModal() {
        const modal = document.getElementById('app-modal');
        if (modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.remove();
            }, 250);
        }
    },

    // 格式化数字
    formatNumber(num, decimals = 1) {
        if (num === null || num === undefined) return '--';
        return Number(num).toFixed(decimals);
    },

    // 格式化日期
    formatDate(date) {
        if (!date) return '--';
        return DB.formatDate(date);
    },

    // 获取今天的日期字符串
    getToday() {
        return DB.getTodayString();
    }
};

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

// 导出
window.App = App;
