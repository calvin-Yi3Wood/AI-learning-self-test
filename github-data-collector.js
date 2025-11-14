/**
 * GitHub Actions数据收集模块
 * 替代Firebase，使用GitHub API提交数据
 */

class GitHubDataCollector {
  constructor() {
    // 后端API配置（通过Vercel代理提交到私有仓库）
    this.config = {
      apiUrl: 'https://ai-test-backend.vercel.app/api/submit'  // Vercel后端API
    };

    this.isInitialized = false;
    this.localBackup = [];
  }

  /**
   * 初始化收集器
   */
  async init() {
    if (this.isInitialized) return true;

    try {
      // 检查后端API配置
      if (!this.config.apiUrl) {
        console.warn('⚠️ 后端API未配置，数据将只保存到本地');
        return false;
      }

      this.isInitialized = true;
      console.log('✅ 数据收集系统已启动（通过后端API）');
      return true;
    } catch (error) {
      console.error('❌ 数据收集器初始化失败:', error);
      return false;
    }
  }

  /**
   * 提交测试数据
   * @param {Object} answers - 用户答题数据
   * @param {Object} dimensionScores - 维度得分
   * @param {Object} result - 测试结果
   * @returns {Promise<Object>} 提交结果
   */
  async submitTestData(answers, dimensionScores, result) {
    try {
      // 生成匿名ID
      const anonymousId = this.generateAnonymousId();

      // 收集完整数据
      const dataPackage = {
        // 时间戳（ISO格式）
        timestamp: new Date().toISOString(),

        // 匿名标识
        anonymousId: anonymousId,

        // 测试数据
        answers: answers,
        dimensionScores: dimensionScores,
        result: result,

        // 设备和环境信息
        metadata: this.collectMetadata(),

        // 使用统计
        usageStats: this.collectUsageStats()
      };

      // 尝试提交到后端API
      if (this.isInitialized) {
        const submitResult = await this.submitToBackend(dataPackage);
        if (submitResult.success) {
          console.log('✅ 数据已成功提交');
          return { success: true, method: 'api' };
        }
      }

      // 如果API提交失败，保存到本地
      this.saveToLocalBackup(dataPackage);
      console.log('💾 数据已保存到本地备份');
      return { success: true, method: 'local' };

    } catch (error) {
      console.error('❌ 数据提交失败:', error);
      // 确保数据不丢失
      this.saveToLocalBackup({ answers, dimensionScores, result });
      return { success: false, error: error.message };
    }
  }

  /**
   * 通过后端API提交数据
   */
  async submitToBackend(dataPackage) {
    try {
      const response = await fetch(this.config.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dataPackage)
      });

      const result = await response.json();

      if (result.success) {
        return { success: true };
      } else {
        console.error('后端API错误:', result.error);
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('网络请求失败:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * 生成匿名ID（UUID v4）
   */
  generateAnonymousId() {
    // 检查是否已有ID
    let id = localStorage.getItem('ai_test_anonymous_id');
    if (id) return id;

    // 生成新ID
    id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });

    localStorage.setItem('ai_test_anonymous_id', id);
    return id;
  }

  /**
   * 收集设备和环境元数据
   */
  collectMetadata() {
    return {
      // 设备类型
      deviceType: this.getDeviceType(),

      // 屏幕分辨率
      screenResolution: `${window.screen.width}x${window.screen.height}`,

      // 视口大小
      viewportSize: `${window.innerWidth}x${window.innerHeight}`,

      // 浏览器信息
      userAgent: navigator.userAgent,
      language: navigator.language,

      // 时区
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,

      // 来源页面
      referrer: document.referrer || 'direct',

      // 页面URL
      pageUrl: window.location.href
    };
  }

  /**
   * 收集使用统计数据
   */
  collectUsageStats() {
    const stats = {
      // 完成时间（从页面加载到提交）
      completionTime: Date.now() - performance.timing.navigationStart,

      // 页面性能
      pageLoadTime: performance.timing.loadEventEnd - performance.timing.navigationStart,

      // 翻页次数（估算）
      estimatedPageViews: Math.max(1, Math.floor(performance.navigation.type === 0 ? 5 : 1))
    };

    // 从localStorage获取更多统计
    try {
      const savedStats = JSON.parse(localStorage.getItem('ai_test_usage_stats') || '{}');
      return { ...stats, ...savedStats };
    } catch (e) {
      return stats;
    }
  }

  /**
   * 获取设备类型
   */
  getDeviceType() {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return 'tablet';
    }
    if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
      return 'mobile';
    }
    return 'desktop';
  }

  /**
   * 保存到本地备份
   */
  saveToLocalBackup(dataPackage) {
    try {
      // 读取现有备份
      const existing = JSON.parse(localStorage.getItem('ai_test_backup') || '[]');

      // 添加新数据
      existing.push({
        ...dataPackage,
        backupTime: new Date().toISOString()
      });

      // 只保留最近10条
      const recent = existing.slice(-10);
      localStorage.setItem('ai_test_backup', JSON.stringify(recent));

      console.log('💾 数据已备份到本地，共', recent.length, '条');
    } catch (error) {
      console.error('本地备份失败:', error);
    }
  }

  /**
   * 导出本地备份数据（供用户下载）
   */
  exportLocalBackup() {
    try {
      const backup = localStorage.getItem('ai_test_backup') || '[]';
      const blob = new Blob([backup], { type: 'application/json' });
      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = `ai-test-backup-${new Date().toISOString().split('T')[0]}.json`;
      a.click();

      URL.revokeObjectURL(url);
      console.log('✅ 本地备份已导出');
    } catch (error) {
      console.error('导出失败:', error);
    }
  }
}

// 创建全局实例
window.GitHubDataCollector = new GitHubDataCollector();

// 页面加载时自动初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.GitHubDataCollector.init();
  });
} else {
  window.GitHubDataCollector.init();
}
