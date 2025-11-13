// ================================================================================
// 用户数据收集同意模块
// ================================================================================

/**
 * 检查用户是否已同意数据收集
 */
function hasUserConsent() {
  return localStorage.getItem('data_collection_consent') === 'true';
}

/**
 * 保存用户同意状态
 */
function saveUserConsent(agreed) {
  localStorage.setItem('data_collection_consent', agreed ? 'true' : 'false');
  localStorage.setItem('consent_timestamp', new Date().toISOString());
}

/**
 * 显示同意弹窗
 */
function showConsentModal() {
  // 如果已同意，不再显示
  if (hasUserConsent()) {
    return;
  }

  // 创建模态框HTML
  const modalHTML = `
    <div id="consentModal" class="consent-modal">
      <div class="consent-content">
        <div class="consent-header">
          <h2>🔒 数据收集说明</h2>
        </div>

        <div class="consent-body">
          <p class="consent-intro">
            为了改进「嵩说AI | AI学习自测表」的准确性和用户体验，我们希望收集您的测评数据。
          </p>

          <div class="consent-section">
            <h3>📊 我们会收集哪些数据？</h3>
            <ul>
              <li>✅ 您的答题选择（1-5分评分及分岔题）</li>
              <li>✅ 测评结果（维度得分和推荐路线）</li>
              <li>✅ 答题时间戳</li>
              <li>✅ 设备类型和浏览器信息（用于优化显示）</li>
            </ul>
          </div>

          <div class="consent-section">
            <h3>❌ 我们不会收集：</h3>
            <ul>
              <li>❌ 姓名、邮箱、手机号等个人身份信息</li>
              <li>❌ IP地址或精确地理位置</li>
              <li>❌ 任何可直接识别您身份的信息</li>
            </ul>
          </div>

          <div class="consent-section highlight-box">
            <h3>🎯 数据用途</h3>
            <p>收集的数据将<strong>仅用于</strong>：</p>
            <ul>
              <li>📈 优化测评算法和路线推荐</li>
              <li>📊 统计分析（匿名聚合数据）</li>
              <li>🔧 改进产品体验</li>
            </ul>
            <p class="promise">
              <strong>我们承诺：</strong>不会将您的数据出售给任何第三方，不会用于广告投放。
            </p>
          </div>

          <div class="consent-privacy">
            <p>
              查看完整的
              <a href="privacy-policy.html" target="_blank" class="privacy-link">隐私政策 ↗</a>
            </p>
          </div>
        </div>

        <div class="consent-footer">
          <button id="consentAgree" class="btn btn-primary">
            ✅ 我同意收集数据
          </button>
          <button id="consentDecline" class="btn btn-secondary">
            ❌ 不同意（将无法收集数据）
          </button>
        </div>

        <p class="consent-note">
          您可以随时在页面底部找到隐私政策链接，并要求删除您的数据。
        </p>
      </div>
    </div>
  `;

  // 添加到页面
  document.body.insertAdjacentHTML('beforeend', modalHTML);

  // 绑定按钮事件
  document.getElementById('consentAgree').addEventListener('click', () => {
    saveUserConsent(true);
    closeConsentModal();
    console.log('✅ 用户已同意数据收集');
  });

  document.getElementById('consentDecline').addEventListener('click', () => {
    saveUserConsent(false);
    closeConsentModal();
    console.log('❌ 用户拒绝数据收集');
  });

  // 添加样式
  addConsentStyles();
}

/**
 * 关闭同意弹窗
 */
function closeConsentModal() {
  const modal = document.getElementById('consentModal');
  if (modal) {
    modal.style.opacity = '0';
    setTimeout(() => modal.remove(), 300);
  }
}

/**
 * 添加模态框样式
 */
function addConsentStyles() {
  if (document.getElementById('consentStyles')) return;

  const styles = `
    <style id="consentStyles">
      .consent-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(7, 22, 40, 0.95);
        backdrop-filter: blur(10px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        animation: fadeIn 0.3s ease-out;
        padding: 20px;
        overflow-y: auto;
      }

      .consent-content {
        background: linear-gradient(135deg, rgba(11, 27, 43, 0.95), rgba(7, 22, 40, 0.95));
        border: 2px solid rgba(124, 58, 237, 0.5);
        border-radius: 20px;
        padding: 40px;
        max-width: 600px;
        width: 100%;
        box-shadow: 0 8px 32px rgba(124, 58, 237, 0.35);
        animation: slideUp 0.4s ease-out;
        max-height: 90vh;
        overflow-y: auto;
      }

      .consent-header h2 {
        text-align: center;
        background: linear-gradient(135deg, #7C3AED, #FF6FBF);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        font-size: 1.8rem;
        margin-bottom: 25px;
      }

      .consent-intro {
        color: #B8C1CC;
        line-height: 1.8;
        margin-bottom: 25px;
        font-size: 1.05rem;
        text-align: center;
      }

      .consent-section {
        background: rgba(11, 27, 43, 0.6);
        border-radius: 12px;
        padding: 20px;
        margin-bottom: 20px;
        border-left: 4px solid #7C3AED;
      }

      .consent-section h3 {
        color: #FF6FBF;
        font-size: 1.2rem;
        margin-bottom: 15px;
      }

      .consent-section ul {
        margin: 0;
        padding-left: 20px;
      }

      .consent-section li {
        color: #B8C1CC;
        line-height: 1.8;
        margin-bottom: 8px;
      }

      .highlight-box {
        border-left-color: #00D1FF;
        background: linear-gradient(135deg, rgba(0, 209, 255, 0.1), rgba(124, 58, 237, 0.1));
      }

      .promise {
        color: #00D1FF;
        margin-top: 15px;
        padding: 15px;
        background: rgba(0, 209, 255, 0.1);
        border-radius: 8px;
        text-align: center;
      }

      .consent-privacy {
        text-align: center;
        margin: 25px 0;
      }

      .consent-privacy p {
        color: #B8C1CC;
      }

      .privacy-link {
        color: #00D1FF;
        text-decoration: none;
        font-weight: 600;
        transition: all 0.3s ease;
      }

      .privacy-link:hover {
        color: #FF6FBF;
        text-shadow: 0 0 10px rgba(255, 111, 191, 0.6);
      }

      .consent-footer {
        display: flex;
        gap: 15px;
        margin-top: 30px;
      }

      .consent-footer .btn {
        flex: 1;
        padding: 15px 20px;
        font-size: 1rem;
      }

      .consent-note {
        text-align: center;
        color: #B8C1CC;
        font-size: 0.85rem;
        margin-top: 20px;
        opacity: 0.7;
      }

      @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
      }

      @keyframes slideUp {
        from {
          opacity: 0;
          transform: translateY(30px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      /* 移动端适配 */
      @media (max-width: 768px) {
        .consent-content {
          padding: 30px 20px;
          max-height: 95vh;
        }

        .consent-header h2 {
          font-size: 1.5rem;
        }

        .consent-footer {
          flex-direction: column;
        }

        .consent-footer .btn {
          width: 100%;
        }
      }
    </style>
  `;

  document.head.insertAdjacentHTML('beforeend', styles);
}

/**
 * 页面加载时显示同意弹窗（已禁用）
 */
// document.addEventListener('DOMContentLoaded', () => {
//   // 延迟1秒显示，避免打断用户首次浏览体验
//   setTimeout(() => {
//     showConsentModal();
//   }, 1000);
// });

// 导出函数供其他模块使用
window.ConsentManager = {
  hasUserConsent,
  showConsentModal,
  saveUserConsent
};
