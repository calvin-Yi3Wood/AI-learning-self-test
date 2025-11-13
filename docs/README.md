# 🤖 嵩说AI | AI学习自测表

一个帮助用户找到最适合自己的AI学习路线的测评工具。通过科学的8维度评估和智能算法，为每位学习者推荐个性化的学习路线。

## 🌟 特性

### 核心功能
- ✅ **8维度科学评估**：技术基础、学习策略、时间投入、目标明确度、AI认知、数据思维、内容创作、批判性思维
- ✅ **5条学习路线**：基础夯实、技术突破、数据驱动、内容创作、战略领航
- ✅ **智能推荐算法**：关口分岔机制 + 加权模型计算
- ✅ **7日行动清单**：为每条路线提供可执行的行动计划
- ✅ **可视化结果**：雷达图展示8维能力，清晰直观
- ✅ **多格式导出**：PNG、PDF、JSON格式导出测评结果

### 设计亮点
- 🎨 **科技朋克风格UI**：渐变色、霓虹效果、流光动画
- 📱 **完全响应式**：完美适配桌面端、平板、手机
- ⚡ **流畅交互**：波纹点击效果、平滑过渡动画
- 💾 **进度保存**：浏览器本地存储，刷新不丢失

### 🆕 数据收集系统（2025-01-13更新 - V3.0）
- 🔒 **完全匿名**：不收集任何个人身份信息
- ✅ **用户同意机制**：符合GDPR、CCPA等隐私法规
- 🚀 **GitHub Actions集成**：无第三方依赖，数据完全私有
- 📊 **自动化报表**：每日自动生成Excel和可视化图表
- 💾 **本地备份**：网络故障时自动保存到浏览器
- ⚙️ **灵活控制**：用户可随时更改数据收集设置
- 🔐 **数据隐私**：私有仓库存储，只有您能访问

---

## 📂 项目结构

```
AI自测表/
├── .github/workflows/         # GitHub Actions工作流
│   ├── collect-data.yml      # 数据收集自动化
│   └── daily-report.yml      # 每日报表生成
├── data/                      # 数据存储目录
│   ├── raw/                  # 原始测试数据（JSON）
│   ├── reports/              # 每日报表和Excel
│   └── summary.json          # 汇总统计
├── scripts/                   # Python数据处理脚本
│   ├── update_summary.py     # 更新汇总统计
│   ├── generate_daily_report.py  # 生成每日报表
│   ├── export_to_excel.py    # 导出Excel
│   ├── cleanup_old_data.py   # 清理旧数据
│   └── test_system.py        # 系统测试验证
├── AI自测表.html             # 主页面
├── app.js                     # 核心逻辑（题库、算法、UI交互）
├── styles.css                 # 样式表（科技朋克风格）
├── consent-modal.js           # 用户同意弹窗
├── github-data-collector.js   # GitHub数据收集模块
├── privacy-policy.html        # 隐私政策页面
├── GITHUB_ACTIONS_SETUP.md    # 部署指南
└── README.md                  # 本文件
```

---

## 🚀 快速开始

### 方法1：本地运行（无数据收集）
1. 克隆仓库：
   ```bash
   git clone https://github.com/yourusername/ai-test.git
   cd ai-test
   ```

2. 启动本地服务器：
   ```bash
   # 使用Python 3
   python -m http.server 8000

   # 或使用Node.js
   npx http-server -p 8000
   ```

3. 浏览器访问 `http://localhost:8000/AI自测表.html`

### 方法2：GitHub Pages部署（含数据收集）
1. Fork本仓库到您的GitHub账号
2. 配置GitHub Actions（参考 [GITHUB_ACTIONS_SETUP.md](GITHUB_ACTIONS_SETUP.md)）
3. 在仓库设置中启用GitHub Pages
4. 访问 `https://yourusername.github.io/ai-test/AI自测表.html`

---

## 🔧 配置数据收集（GitHub Actions方案）

### 前置条件
- GitHub账号
- GitHub Personal Access Token
- 约10分钟配置时间

### 配置步骤
详细步骤请参考 **[GITHUB_ACTIONS_SETUP.md](GITHUB_ACTIONS_SETUP.md)**，简要流程：

1. **创建Personal Access Token**
   - 访问 GitHub Settings → Developer settings
   - 创建新token（需要repo和workflow权限）

2. **配置前端**
   - 编辑 `github-data-collector.js`
   - 填入GitHub用户名、仓库名、token

3. **上传代码**
   - 推送到GitHub仓库
   - GitHub Actions自动激活

4. **启用GitHub Pages**
   - Settings → Pages → 选择main分支
   - 几分钟后网站上线

5. **验证系统**
   - 访问网站完成一次测试
   - 检查data/raw/目录是否有新数据

---

## 📊 可收集的数据

### ✅ 收集的数据（完全匿名）
- 答题选择（8维度 × 3题 + 2道分岔题）
- 维度得分（0-100分）
- 推荐路线结果
- 答题时间戳
- 设备信息（浏览器、屏幕分辨率、操作系统）
- 来源渠道（referrer）

### ❌ 不收集的数据
- ❌ 姓名、邮箱、手机号
- ❌ IP地址
- ❌ 精确地理位置
- ❌ Cookie跟踪
- ❌ 任何个人身份信息（PII）

### 🎯 数据用途
- 优化测评算法和路线推荐
- 统计分析（匿名聚合数据）
- 改进产品体验
- 学术研究（仅在获得明确同意后）

**承诺**：
- ✅ 不出售数据给第三方
- ✅ 不用于广告定向
- ✅ 用户可随时要求删除数据

---

## 🔒 隐私和安全

### 隐私保护措施
1. **用户明确同意**：首次访问时显示同意弹窗
2. **完整隐私政策**：清晰说明数据收集和使用
3. **匿名化处理**：使用随机UUID，无法关联身份
4. **安全传输**：HTTPS加密
5. **访问控制**：Firestore安全规则保护

### 符合法规
- ✅ GDPR（欧盟通用数据保护条例）
- ✅ CCPA（加州消费者隐私法）
- ✅ 中国《个人信息保护法》

### 用户权利
- **访问权**：查看存储的数据
- **更正权**：修正不准确的数据
- **删除权**：要求删除数据（"被遗忘权"）
- **反对权**：反对数据处理
- **数据可携权**：导出数据

联系方式：privacy@songshuoai.com

---

## 💰 成本估算

### GitHub Actions免费额度
- **存储**：500 MB
- **执行时间**：2000 分钟/月
- **并发任务**：20 个

### 实际使用量估算
**每天100个用户**：
- 执行时间：50 分钟/月（<< 2000限额）
- 存储：6 MB/月（<< 500MB限额）
- 并发请求：<< 20个

**结论**：免费额度完全够用，即使每天1000+用户也不会超额！

**优势**：
- ✅ 完全免费（GitHub Actions免费额度）
- ✅ 无第三方依赖
- ✅ 数据完全私有
- ✅ 自动化程度高

---

## 📈 数据查看和分析

### 在GitHub仓库查看数据
1. 访问仓库 `data/raw/` 目录 → 查看原始JSON数据
2. 访问 `data/summary.json` → 查看汇总统计
3. 访问 `data/reports/` 目录 → 下载Excel报表

### 自动生成Excel报表
系统每天凌晨2点自动运行，生成包含以下内容的Excel文件：
- **所有测试数据** - 每条测试的详细记录
- **路线分布汇总** - 各路线统计和占比
- **维度得分汇总** - 8维度平均分、最高分、最低分
- **每日统计** - 每天的测试数量和趋势

### 手动生成报表
```bash
# 进入项目目录
cd "e:\多平台自媒体\AI自测表"

# 生成Excel报表
python scripts/export_to_excel.py

# 生成每日报表
python scripts/generate_daily_report.py

# 更新汇总统计
python scripts/update_summary.py
```

### Python数据分析示例
```python
import pandas as pd

# 读取Excel报表
df = pd.read_excel('data/reports/完整数据报表_20250113.xlsx', sheet_name='所有测试数据')

# 分析路线分布
route_distribution = df['主路线'].value_counts()
print("路线分布：\n", route_distribution)

# 分析维度得分
dimension_cols = [col for col in df.columns if col.startswith('维度_')]
print("\n各维度平均分：\n", df[dimension_cols].mean())

# 设备类型分布
device_distribution = df['设备类型'].value_counts()
print("\n设备类型分布：\n", device_distribution)
```

---

## 🛠️ 技术栈

### 前端
- 纯原生 JavaScript（无框架依赖）
- HTML5 + CSS3
- Chart.js（雷达图可视化）
- html2canvas + jsPDF（导出功能）
- Feather Icons（SVG图标）

### 后端/数据收集
- GitHub Actions（CI/CD自动化）
- Python 3.11（数据处理脚本）
- pandas + openpyxl（Excel生成）
- matplotlib + seaborn（数据可视化，可选）

### 特点
- ✅ 无需构建工具
- ✅ 无需Node.js依赖
- ✅ 可直接部署到静态服务器
- ✅ CDN加载第三方库，速度快
- ✅ 无第三方数据服务依赖
- ✅ 完全在GitHub生态内

---

## 📱 浏览器兼容性

| 浏览器 | 版本 | 支持度 |
|--------|------|--------|
| Chrome | 90+ | ✅ 完全支持 |
| Firefox | 88+ | ✅ 完全支持 |
| Safari | 14+ | ✅ 完全支持 |
| Edge | 90+ | ✅ 完全支持 |
| IE 11 | - | ❌ 不支持 |

---

## 🎨 UI优化日志

### 2025-11-13更新
1. **雷达图优化**
   - 左右内边距：40px → 120px（增加200%）
   - 图表宽度：500px → 700px
   - 图表高度：450px → 500px
   - 完全解决文字遮挡问题

2. **翻页体验优化**
   - 添加自动回到顶部功能
   - 平滑滚动动画（smooth scroll）

3. **数据收集系统**
   - 完整的用户同意机制
   - Firebase集成
   - 隐私政策页面
   - 本地备份降级方案

---

## 🤝 贡献指南

欢迎贡献！请遵循以下步骤：

1. Fork本仓库
2. 创建功能分支：`git checkout -b feature/AmazingFeature`
3. 提交更改：`git commit -m 'Add some AmazingFeature'`
4. 推送到分支：`git push origin feature/AmazingFeature`
5. 提交Pull Request

### 贡献建议
- 🐛 修复Bug
- ✨ 添加新功能（如新的学习路线）
- 📝 改进文档
- 🎨 优化UI设计
- 🌍 添加多语言支持

---

## 📄 许可证

本项目采用 **MIT License**，详情请参见 [LICENSE](LICENSE) 文件。

### 简单说明
- ✅ 可自由使用、复制、修改
- ✅ 可用于商业项目
- ✅ 需保留版权声明
- ⚠️ 不提供任何担保

---

## 📧 联系方式

- **作者**：嵩说AI Team
- **邮箱**：privacy@songshuoai.com
- **GitHub**：[https://github.com/yourusername/ai-test](https://github.com/yourusername/ai-test)
- **Issues**：[提交问题或建议](https://github.com/yourusername/ai-test/issues)

---

## 🙏 致谢

感谢以下开源项目和服务：
- [Chart.js](https://www.chartjs.org/) - 雷达图可视化
- [html2canvas](https://html2canvas.hertzen.com/) - 页面截图
- [jsPDF](https://github.com/parallax/jsPDF) - PDF导出
- [Feather Icons](https://feathericons.com/) - SVG图标库
- [GitHub Actions](https://github.com/features/actions) - CI/CD自动化
- [pandas](https://pandas.pydata.org/) - 数据处理
- [Google Fonts](https://fonts.google.com/) - 字体服务

---

## 📝 更新日志

### v3.0.0 (2025-01-13) 🔥 重大更新
- 🚀 完全重构数据收集系统（GitHub Actions替代Firebase）
- ✅ 无第三方依赖，数据完全私有
- 📊 自动生成Excel报表和可视化图表
- 🔧 新增Python数据处理脚本（4个核心脚本）
- 📁 完整的数据目录结构
- 🧪 新增系统测试和验证工具
- 📖 详细的部署指南（GITHUB_ACTIONS_SETUP.md）

### v2.0.0 (2025-11-13)
- 🆕 新增数据收集系统（Firebase集成）- 已废弃
- 🆕 新增用户同意机制（GDPR合规）
- 🆕 新增隐私政策页面
- 🎨 优化雷达图显示（加宽200%）
- ✨ 优化翻页体验（自动回到顶部）
- 📝 新增完整配置文档

### v1.0.0 (2025-11-07)
- 🎉 初始版本发布
- ✅ 8维度测评系统
- ✅ 5条学习路线推荐
- ✅ 雷达图可视化
- ✅ PNG/PDF/JSON导出
- ✅ 响应式设计

---

## 🎯 路线图

### 近期计划
- [ ] 添加英文版本
- [ ] 优化移动端体验
- [ ] 添加更多学习路线
- [ ] 集成AI助手（ChatGPT API）

### 长期计划
- [ ] 用户账号系统
- [ ] 学习进度跟踪
- [ ] 社区分享功能
- [ ] 付费高级功能

---

**开始你的AI学习之旅吧！** 🚀

访问测评：[https://yourusername.github.io/ai-test/AI自测表.html](https://yourusername.github.io/ai-test/AI自测表.html)
