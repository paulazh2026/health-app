/**
 * 食物识别模块 - 基于 TensorFlow.js MobileNet
 * 在浏览器本地运行，无需联网
 */

const FoodRecognizer = {
    model: null,
    isLoaded: false,
    isLoading: false,

    // 加载模型
    async loadModel() {
        if (this.isLoaded) return true;
        if (this.isLoading) return false;

        this.isLoading = true;
        console.log('正在加载 AI 模型...');

        try {
            this.model = await mobilenet.load({
                version: 2,
                alpha: 1.0
            });
            this.isLoaded = true;
            console.log('AI 模型加载完成');
            return true;
        } catch (error) {
            console.error('模型加载失败:', error);
            this.isLoading = false;
            return false;
        }
    },

    // 识别图片
    async recognize(imageElement) {
        if (!this.isLoaded) {
            const loaded = await this.loadModel();
            if (!loaded) {
                throw new Error('模型未加载');
            }
        }

        try {
            const predictions = await this.model.classify(imageElement, 5);
            return this.processPredictions(predictions);
        } catch (error) {
            console.error('识别失败:', error);
            throw error;
        }
    },

    // 处理预测结果
    processPredictions(predictions) {
        const results = [];
        
        for (const prediction of predictions) {
            const food = FoodDatabase.getFoodByAIResult(prediction.className);
            if (food) {
                results.push({
                    food: food,
                    confidence: prediction.probability,
                    originalClass: prediction.className
                });
            }
        }

        // 去重（按食物 ID）
        const uniqueResults = [];
        const seenIds = new Set();
        for (const result of results) {
            if (!seenIds.has(result.food.id)) {
                seenIds.add(result.food.id);
                uniqueResults.push(result);
            }
        }

        return uniqueResults;
    },

    // 从文件创建图片元素
    async createImageFromFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => resolve(img);
                img.onerror = reject;
                img.src = e.target.result;
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    },

    // 从 Canvas 创建图片元素
    async createImageFromCanvas(canvas) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.src = canvas.toDataURL('image/jpeg', 0.8);
        });
    },

    // 压缩图片
    async compressImage(file, maxWidth = 640, maxHeight = 640) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    let width = img.width;
                    let height = img.height;

                    // 计算缩放比例
                    if (width > maxWidth || height > maxHeight) {
                        const ratio = Math.min(maxWidth / width, maxHeight / height);
                        width = Math.round(width * ratio);
                        height = Math.round(height * ratio);
                    }

                    canvas.width = width;
                    canvas.height = height;

                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);

                    canvas.toBlob(resolve, 'image/jpeg', 0.8);
                };
                img.onerror = reject;
                img.src = e.target.result;
            };
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    },

    // 获取模型状态
    getStatus() {
        return {
            isLoaded: this.isLoaded,
            isLoading: this.isLoading
        };
    }
};

// 导出
window.FoodRecognizer = FoodRecognizer;
