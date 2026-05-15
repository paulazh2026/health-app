/**
 * 拍照识别模块
 */

const Camera = {
    stream: null,
    videoElement: null,

    // 打开相机
    async open() {
        const modalHtml = `
            <div class="modal-overlay" id="camera-modal">
                <div class="modal" style="max-height: 95vh;">
                    <div class="modal-header">
                        <span class="modal-title">📷 拍照识别</span>
                        <button class="modal-close" onclick="Camera.close()">✕</button>
                    </div>
                    <div class="modal-body" style="padding: 0;">
                        <!-- 相机预览 -->
                        <div id="camera-preview" style="position: relative; background: #000; aspect-ratio: 4/3;">
                            <video id="camera-video" autoplay playsinline style="width: 100%; height: 100%; object-fit: cover;"></video>
                            <canvas id="camera-canvas" style="display: none;"></canvas>
                            
                            <!-- 拍照按钮 -->
                            <div style="position: absolute; bottom: 20px; left: 0; right: 0; display: flex; justify-content: center; gap: 16px;">
                                <button class="btn btn-secondary btn-icon" onclick="Camera.openGallery()" style="width: 50px; height: 50px; background: rgba(255,255,255,0.9);">
                                    🖼️
                                </button>
                                <button class="btn btn-primary btn-icon" onclick="Camera.takePhoto()" style="width: 70px; height: 70px; border-radius: 50%; border: 4px solid white;">
                                    📷
                                </button>
                            </div>
                        </div>
                        
                        <!-- 识别结果 -->
                        <div id="recognition-result" style="display: none; padding: 16px;"></div>
                    </div>
                </div>
            </div>
        `;
        
        document.getElementById('modal-container').innerHTML = modalHtml;
        
        setTimeout(async () => {
            document.getElementById('camera-modal').classList.add('show');
            await this.startCamera();
        }, 10);
    },

    // 启动相机
    async startCamera() {
        try {
            this.stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: 'environment', // 后置摄像头
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                }
            });
            
            this.videoElement = document.getElementById('camera-video');
            this.videoElement.srcObject = this.stream;
        } catch (error) {
            console.error('无法访问相机:', error);
            App.showToast('无法访问相机，请检查权限设置');
            this.close();
        }
    },

    // 停止相机
    stopCamera() {
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
            this.stream = null;
        }
    },

    // 拍照
    async takePhoto() {
        const video = document.getElementById('camera-video');
        const canvas = document.getElementById('camera-canvas');
        
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0);
        
        // 停止相机
        this.stopCamera();
        
        // 隐藏视频，显示图片
        video.style.display = 'none';
        
        // 转换为图片
        const img = await FoodRecognizer.createImageFromCanvas(canvas);
        
        // 识别
        await this.recognizeImage(img);
    },

    // 打开相册
    openGallery() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = async (e) => {
            const file = e.target.files[0];
            if (!file) return;
            
            // 停止相机
            this.stopCamera();
            
            // 隐藏视频
            document.getElementById('camera-video').style.display = 'none';
            
            // 显示加载状态
            document.getElementById('recognition-result').style.display = 'block';
            document.getElementById('recognition-result').innerHTML = `
                <div style="text-align: center; padding: 32px;">
                    <div class="loading-spinner" style="margin: 0 auto;"></div>
                    <p style="margin-top: 16px; color: var(--text-secondary);">正在识别...</p>
                </div>
            `;
            
            try {
                const img = await FoodRecognizer.createImageFromFile(file);
                await this.recognizeImage(img);
            } catch (error) {
                console.error('识别失败:', error);
                App.showToast('识别失败，请重试');
            }
        };
        input.click();
    },

    // 识别图片
    async recognizeImage(img) {
        // 显示加载状态
        document.getElementById('recognition-result').style.display = 'block';
        document.getElementById('recognition-result').innerHTML = `
            <div style="text-align: center; padding: 32px;">
                <div class="loading-spinner" style="margin: 0 auto;"></div>
                <p style="margin-top: 16px; color: var(--text-secondary);">正在识别食物...</p>
            </div>
        `;

        try {
            // 确保模型已加载
            if (!FoodRecognizer.isLoaded) {
                document.getElementById('recognition-result').innerHTML = `
                    <div style="text-align: center; padding: 32px;">
                        <div class="loading-spinner" style="margin: 0 auto;"></div>
                        <p style="margin-top: 16px; color: var(--text-secondary);">首次使用需要加载AI模型...</p>
                    </div>
                `;
            }

            const results = await FoodRecognizer.recognize(img);
            
            if (results.length === 0) {
                this.showNoResult();
            } else {
                this.showResults(results);
            }
        } catch (error) {
            console.error('识别失败:', error);
            this.showError();
        }
    },

    // 显示识别结果
    showResults(results) {
        const html = `
            <div style="padding: 16px;">
                <h3 style="margin-bottom: 16px;">识别结果</h3>
                <div style="margin-bottom: 16px;">
                    ${results.map((result, index) => `
                        <div class="food-item" onclick="Camera.selectResult(${index})" style="cursor: pointer;">
                            <div class="food-item-icon">${result.food.icon}</div>
                            <div class="food-item-info">
                                <div class="food-item-name">${result.food.name}</div>
                                <div class="food-item-amount">
                                    匹配度 ${Math.round(result.confidence * 100)}%
                                </div>
                            </div>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="9 18 15 12 9 6"></polyline>
                            </svg>
                        </div>
                    `).join('')}
                </div>
                
                <div style="text-align: center; color: var(--text-tertiary); font-size: 12px;">
                    识别结果仅供参考，请根据实际情况选择
                </div>
            </div>
        `;
        
        document.getElementById('recognition-result').innerHTML = html;
        
        // 保存结果供后续使用
        this.recognitionResults = results;
    },

    // 选择识别结果
    selectResult(index) {
        const result = this.recognitionResults[index];
        if (!result) return;
        
        this.close();
        
        // 打开份量选择
        Diet.selectFood(result.food.id);
    },

    // 显示无结果
    showNoResult() {
        document.getElementById('recognition-result').innerHTML = `
            <div class="empty-state" style="padding: 32px;">
                <div style="font-size: 48px; margin-bottom: 16px;">🤔</div>
                <div class="empty-state-title">未能识别出食物</div>
                <div class="empty-state-text">请尝试拍摄更清晰的照片，或手动添加食物</div>
                <div style="margin-top: 16px; display: flex; gap: 12px; justify-content: center;">
                    <button class="btn btn-secondary" onclick="Camera.open()">重新拍照</button>
                    <button class="btn btn-primary" onclick="Camera.close(); Diet.openAddFoodModal();">手动添加</button>
                </div>
            </div>
        `;
    },

    // 显示错误
    showError() {
        document.getElementById('recognition-result').innerHTML = `
            <div class="empty-state" style="padding: 32px;">
                <div style="font-size: 48px; margin-bottom: 16px;">❌</div>
                <div class="empty-state-title">识别失败</div>
                <div class="empty-state-text">请检查网络连接后重试</div>
                <div style="margin-top: 16px;">
                    <button class="btn btn-primary" onclick="Camera.open()">重试</button>
                </div>
            </div>
        `;
    },

    // 关闭相机
    close() {
        this.stopCamera();
        
        const modal = document.getElementById('camera-modal');
        if (modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.remove();
            }, 250);
        }
    }
};

// 导出
window.Camera = Camera;
