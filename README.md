# 🤖 嵩说AI | AI学习自测表

**GitHub Actions数据收集版本 v3.0**

---

## 📂 项目结构

```
AI自测表/
├── AI自测表.html              # 主页面（入口）
├── app.js                     # 核心逻辑
├── styles.css                 # 样式表
├── consent-modal.js           # 用户同意弹窗
├── github-data-collector.js   # GitHub数据收集模块
├── .github/workflows/         # GitHub Actions自动化
├── scripts/                   # Python数据处理脚本
├── docs/                      # 完整文档
├── data/                      # 数据存储（部署后自动生成）
├── assets/                    # 静态资源
└── archive/                   # 旧文件归档
```

---

## 🚀 快速开始

### 方法1：查看完整文档
- **快速开始**：[docs/QUICK_START.md](docs/QUICK_START.md) - 5分钟部署
- **详细指南**：[docs/GITHUB_ACTIONS_SETUP.md](docs/GITHUB_ACTIONS_SETUP.md) - 完整教程
- **项目说明**：[docs/README.md](docs/README.md) - 完整介绍

### 方法2：本地测试
```bash
# 启动本地服务器
python -m http.server 8000

# 访问
http://localhost:8000/AI自测表.html
```

---

## 📊 系统特性

- ✅ **无第三方依赖** - 完全在GitHub生态内
- ✅ **数据完全私有** - 私有仓库存储
- ✅ **自动化报表** - 每日生成Excel和图表
- ✅ **完全匿名** - 不收集个人信息
- ✅ **用户同意机制** - GDPR合规

---

## 📚 文档导航

| 文档 | 说明 |
|------|------|
| [QUICK_START.md](docs/QUICK_START.md) | 5分钟快速部署指南 |
| [GITHUB_ACTIONS_SETUP.md](docs/GITHUB_ACTIONS_SETUP.md) | 详细配置教程 |
| [README.md](docs/README.md) | 完整项目说明 |
| [privacy-policy.html](docs/privacy-policy.html) | 隐私政策 |

---

## 🔧 下一步

1. 阅读 [docs/QUICK_START.md](docs/QUICK_START.md)
2. 创建GitHub Token
3. 配置 `github-data-collector.js`
4. 部署到GitHub Pages

---

**版本**: v3.0.0
**更新**: 2025-01-13
**作者**: 嵩说AI Team
