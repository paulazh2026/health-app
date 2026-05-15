/**
 * 路由模块 - 简单的 Hash 路由实现
 */

const Router = {
    routes: {},
    currentPage: null,

    // 注册路由
    register(path, handler) {
        this.routes[path] = handler;
    },

    // 初始化路由
    init() {
        // 监听 hash 变化
        window.addEventListener('hashchange', () => this.handleRouteChange());
        
        // 初始加载
        this.handleRouteChange();
    },

    // 处理路由变化
    handleRouteChange() {
        const hash = window.location.hash || '#/dashboard';
        const path = hash.slice(1); // 移除 # 号
        
        // 更新导航状态
        this.updateNavState(path);
        
        // 执行路由处理器
        const handler = this.routes[path] || this.routes['/dashboard'];
        if (handler) {
            handler();
        }
        
        this.currentPage = path;
    },

    // 更新导航状态
    updateNavState(path) {
        const navItems = document.querySelectorAll('.nav-item');
        navItems.forEach(item => {
            const page = item.getAttribute('data-page');
            if (path === `/${page}`) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    },

    // 导航到指定页面
    navigate(path) {
        window.location.hash = path;
    },

    // 获取当前页面
    getCurrentPage() {
        return this.currentPage;
    }
};

// 导出
window.Router = Router;
