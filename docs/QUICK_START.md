# ⚡ GitHub Actions数据收集系统 - 快速开始

## 🎯 5分钟快速部署

### 步骤1: 创建GitHub Token（2分钟）

1. 访问 https://github.com/settings/tokens
2. 点击 **Generate new token (classic)**
3. 勾选权限：
   - ✅ `repo`
   - ✅ `workflow`
4. 点击 **Generate token**
5. 📋 复制token（ghp_xxxxxxxxxxxx）

### 步骤2: 配置代码（1分钟）

编辑 `github-data-collector.js`（第8-12行）：

```javascript
this.config = {
  owner: 'YOUR_GITHUB_USERNAME',  // ← 您的GitHub用户名
  repo: 'YOUR_REPO_NAME',         // ← 仓库名
  token: 'ghp_xxxxxxxxxxxx'       // ← 粘贴刚才的token
};
```

### 步骤3: 上传到GitHub（2分钟）

```bash
git add .
git commit -m "🚀 启用GitHub Actions数据收集"
git push
```

### 步骤4: 启用GitHub Pages

1. 仓库 Settings → Pages
2. Source: `main` 分支
3. 等待几分钟网站上线

---

## ✅ 验证系统工作

### 1. 测试数据提交

1. 访问网站完成一次测试
2. 打开浏览器控制台（F12）
3. 看到 `✅ 数据已成功提交到GitHub` → 成功！

### 2. 检查数据

5分钟后访问仓库：
- `data/raw/` 目录应该有新的JSON文件
- 文件名格式：`test_20250113_120530_abc123.json`

### 3. 查看Actions日志

1. 仓库 → Actions 标签
2. 点击最新的工作流运行
3. 所有步骤都是绿色✅ → 完美！

---

## 📊 每日报表

系统每天凌晨2点自动运行，生成：
- 📄 `data/reports/完整数据报表_YYYYMMDD.xlsx`
- 📊 `data/reports/charts/routes_YYYYMMDD.png`
- 📈 `data/reports/charts/daily_trend_YYYYMMDD.png`

### 手动生成报表

```bash
cd scripts
python export_to_excel.py
```

---

## 🔒 私有仓库设置

**推荐配置：私有仓库 + 公开网站**

1. 仓库 Settings → General
2. Danger Zone → Change visibility → **Make private**
3. 数据私有，网站依然公开！✅

---

## 🧪 测试系统

运行验证脚本：

```bash
python scripts/test_system.py
```

成功输出：
```
📊 测试报告
============================================================
✅ 通过: 25
❌ 失败: 0
📈 成功率: 100.0%

🎉 系统验证通过！可以部署到GitHub了！
```

---

## ❓ 常见问题

### Q: 数据提交失败？
**A**: 检查token权限是否包含 `repo` 和 `workflow`

### Q: GitHub Actions没有运行？
**A**: 访问仓库 Actions 标签，点击 "I understand my workflows, go ahead and enable them"

### Q: 私有仓库别人能访问网站吗？
**A**: 能！仓库私有≠网站私有。GitHub Pages是公开的。

### Q: 如何查看数据？
**A**: 访问 `data/reports/` 目录下载Excel文件

---

## 📚 详细文档

- **完整部署指南**: [GITHUB_ACTIONS_SETUP.md](GITHUB_ACTIONS_SETUP.md)
- **项目说明**: [README.md](README.md)
- **隐私政策**: [privacy-policy.html](privacy-policy.html)

---

## 🎉 完成！

您的GitHub Actions数据收集系统已经成功部署！

**接下来**：
- 分享网站链接给用户
- 每天查看自动生成的Excel报表
- 分析用户学习路线偏好

有问题？查看 [GITHUB_ACTIONS_SETUP.md](GITHUB_ACTIONS_SETUP.md) 的详细说明。

---

**最后更新**: 2025-01-13
