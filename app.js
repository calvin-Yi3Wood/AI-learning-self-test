// ================================================================================
// 嵩说AI | AI学习自测表 - 核心逻辑
// ================================================================================

// ==================== 题库数据 ====================
const QUESTIONS = {
  // 8个维度，每维度3题
  TB: {
    name: "技术基础 (Tech Base)",
    code: "TB",
    questions: [
      { id: "TB1", text: "我能快速理解并使用新的技术工具或编程概念" },
      { id: "TB2", text: "我对计算机基础知识（如文件系统、网络、命令行）感到熟悉" },
      { id: "TB3", text: "我能够独立解决遇到的技术问题或通过搜索找到解决方案" }
    ]
  },
  LS: {
    name: "学习策略 (Learning Strategy)",
    code: "LS",
    questions: [
      { id: "LS1", text: "我习惯在学习新知识时制定明确的学习计划和目标" },
      { id: "LS2", text: "我会定期复习和总结学过的内容，确保知识留存" },
      { id: "LS3", text: "我善于从实践中学习，通过动手项目巩固理论知识" }
    ]
  },
  TI: {
    name: "时间投入 (Time Investment)",
    code: "TI",
    questions: [
      { id: "TI1", text: "我每周能持续投入固定时间用于AI相关学习" },
      { id: "TI2", text: "我愿意为了深入学习AI而调整其他日常安排" },
      { id: "TI3", text: "我能够保持长期（6个月以上）的学习节奏而不轻易放弃" }
    ]
  },
  GO: {
    name: "目标明确度 (Goal Orientation)",
    code: "GO",
    questions: [
      { id: "GO1", text: "我清楚知道自己学习AI是为了达成什么具体目标" },
      { id: "GO2", text: "我的学习目标与我的职业规划或个人发展方向一致" },
      { id: "GO3", text: "我能够将大目标拆解成可执行的小目标和里程碑" }
    ]
  },
  AI: {
    name: "AI认知水平 (AI Awareness)",
    code: "AI",
    questions: [
      { id: "AI1", text: "我了解AI的基本概念（如机器学习、深度学习、大模型）" },
      { id: "AI2", text: "我知道如何使用AI工具（如ChatGPT、Midjourney）解决实际问题" },
      { id: "AI3", text: "我关注AI领域的最新动态和技术趋势" }
    ]
  },
  DM: {
    name: "数据思维 (Data Mindset)",
    code: "DM",
    questions: [
      { id: "DM1", text: "我习惯用数据和事实来支持我的观点和决策" },
      { id: "DM2", text: "我对数据分析、统计学基础概念（如平均值、相关性）有一定了解" },
      { id: "DM3", text: "我能够识别和质疑数据中的异常或偏差" }
    ]
  },
  CC: {
    name: "内容创作能力 (Content Creation)",
    code: "CC",
    questions: [
      { id: "CC1", text: "我擅长通过文字、图片或视频清晰表达想法" },
      { id: "CC2", text: "我乐于分享知识和经验，并能让他人易于理解" },
      { id: "CC3", text: "我有持续创作和输出内容的习惯（如写博客、做视频）" }
    ]
  },
  CR: {
    name: "批判性思维 (Critical Reasoning)",
    code: "CR",
    questions: [
      { id: "CR1", text: "我在接受新观点前会主动思考其合理性和局限性" },
      { id: "CR2", text: "我能够识别信息中的逻辑漏洞或潜在偏见" },
      { id: "CR3", text: "我习惯从多个角度分析问题，而不是只看表面" }
    ]
  }
};

// 分岔题
const BRANCH_QUESTIONS = {
  B1: {
    id: "B1",
    text: "在学习AI时，你更希望：",
    options: [
      { value: "A", text: "马上能交付结果、快速见效（如做出一个能用的AI应用）" },
      { value: "B", text: "深入理解原理、打好基础（如弄懂算法底层逻辑）" }
    ],
    position: "after_LS" // 放在LS维度后
  },
  B2: {
    id: "B2",
    text: "你更倾向于：",
    options: [
      { value: "A", text: "想把重复工作自动化、提升效率（工具型）" },
      { value: "B", text: "更想做内容创作、表达观点、扩大影响力（内容型）" }
    ],
    position: "after_CC" // 放在CC维度后
  }
};

// 路线模板数据
const ROUTE_TEMPLATES = {
  T1: {
    name: "基础夯实路线",
    description: "适合技术基础薄弱、时间有限但想入门AI的学习者",
    checklist: [
      "Day 1: 注册ChatGPT并完成10次对话练习，记录使用场景",
      "Day 2: 学习提示词工程基础，掌握5个提示词模板",
      "Day 3: 用AI工具完成一个实际任务（如写邮件、总结文章）",
      "Day 4: 学习一个AI工具的进阶功能（如GPT的插件或自定义指令）",
      "Day 5: 整理本周AI学习笔记，建立知识库",
      "Day 6: 加入一个AI学习社群，与他人交流经验",
      "Day 7: 制定下周学习计划，设定一个小目标"
    ],
    commands: [
      "从使用AI工具开始，而不是学理论",
      "每天至少用AI解决一个真实问题",
      "保持耐心，学习是长期过程"
    ]
  },
  T2: {
    name: "技术突破路线",
    description: "适合有一定技术基础、想深入AI技术的开发者",
    checklist: [
      "Day 1: 搭建本地Python环境，安装必要的AI库",
      "Day 2: 学习Transformer模型基础原理",
      "Day 3: 完成第一个机器学习项目（如MNIST手写数字识别）",
      "Day 4: 学习使用Hugging Face模型库",
      "Day 5: 微调一个小型预训练模型",
      "Day 6: 阅读3篇AI领域经典论文",
      "Day 7: 将本周项目发布到GitHub，写技术博客"
    ],
    commands: [
      "代码是最好的学习方式",
      "每天写代码，每周做项目",
      "从复现经典模型开始，逐步创新"
    ]
  },
  T3: {
    name: "数据驱动路线",
    description: "适合想从数据分析切入AI的分析师或商业人士",
    checklist: [
      "Day 1: 学习pandas和numpy基础，完成数据清洗练习",
      "Day 2: 用Python做一次数据可视化分析",
      "Day 3: 学习基础统计学概念（假设检验、置信区间）",
      "Day 4: 完成一个回归分析项目",
      "Day 5: 学习数据特征工程基础",
      "Day 6: 用scikit-learn完成分类任务",
      "Day 7: 用AI工具辅助数据分析，对比效果"
    ],
    commands: [
      "数据是AI的基础，先学会处理数据",
      "用数据讲故事，而不只是算数字",
      "从业务问题出发，用AI解决实际需求"
    ]
  },
  T4: {
    name: "内容创作路线",
    description: "适合想用AI增强创作能力、打造个人品牌的创作者",
    checklist: [
      "Day 1: 用AI生成10篇不同风格的文章草稿",
      "Day 2: 学习AI绘画工具（Midjourney/Stable Diffusion），生成10张图",
      "Day 3: 用AI辅助视频脚本创作，完成一个5分钟视频大纲",
      "Day 4: 建立AI辅助创作工作流（从灵感-大纲-成稿-优化）",
      "Day 5: 发布一篇AI辅助创作的高质量内容",
      "Day 6: 分析内容数据，优化创作方向",
      "Day 7: 规划内容矩阵，用AI批量生成素材库"
    ],
    commands: [
      "AI是创作助手，不是替代品",
      "保持个人风格，AI只是放大器",
      "持续输出，用数据优化内容策略"
    ]
  },
  T5: {
    name: "战略领航路线",
    description: "适合有明确目标、想用AI实现重大突破的行动者",
    checklist: [
      "Day 1: 明确AI学习的终极目标，写下3年规划",
      "Day 2: 拆解目标为6个月里程碑和月度OKR",
      "Day 3: 识别核心能力缺口，制定针对性学习计划",
      "Day 4: 启动一个高价值AI项目（可变现或可晋升）",
      "Day 5: 组建学习小组或找到mentor，建立支持系统",
      "Day 6: 每天投入2小时深度学习+实践",
      "Day 7: 建立周复盘机制，调整策略确保目标达成"
    ],
    commands: [
      "目标驱动学习，不做无效努力",
      "聚焦高价值技能，快速实现ROI",
      "保持极度专注，拒绝一切干扰"
    ]
  }
};

// ==================== 全局状态 ====================
let currentPage = 0;
let answers = {};
let dimensionScores = {};
let finalResult = null;

// ==================== 核心评分算法 ====================

/**
 * 计算维度分数
 * 规则：每维度3题的平均值 × 25 = 0-100分
 */
function calculateDimensionScores() {
  const dimensions = Object.keys(QUESTIONS);

  dimensions.forEach(dim => {
    const dimAnswers = answers[dim] || [];
    if (dimAnswers.length === 3) {
      const avg = dimAnswers.reduce((sum, val) => sum + val, 0) / 3;
      dimensionScores[dim] = +(avg * 25).toFixed(1); // 保留一位小数
    }
  });

  // 处理B1分岔：影响LS维度
  if (answers.B1 === 'A') {
    dimensionScores.LS = Math.min(100, dimensionScores.LS + 10);
  } else if (answers.B1 === 'B') {
    dimensionScores.LS = Math.max(0, dimensionScores.LS - 10);
  }

  // 处理B2分岔：影响AI或CC维度
  if (answers.B2 === 'A') {
    dimensionScores.AI = Math.min(100, dimensionScores.AI + 10);
  } else if (answers.B2 === 'B') {
    dimensionScores.CC = Math.min(100, dimensionScores.CC + 10);
  }

  // TI时间映射（如果用户填了hours_per_week）
  if (answers.hours_per_week !== undefined) {
    const hours = answers.hours_per_week;
    if (hours <= 2) dimensionScores.TI = 10;
    else if (hours <= 5) dimensionScores.TI = 30;
    else if (hours <= 8) dimensionScores.TI = 60;
    else if (hours <= 12) dimensionScores.TI = 80;
    else dimensionScores.TI = 100;
  }

  return dimensionScores;
}

/**
 * 检查关口分岔（优先级检测）
 * 返回：{ hit: boolean, route: string, priority: number }
 */
function checkGate() {
  const gates = [
    {
      route: 'T5',
      priority: 5,
      condition: () => dimensionScores.GO >= 75 && dimensionScores.TI >= 8
    },
    {
      route: 'T2',
      priority: 4,
      condition: () => dimensionScores.AI >= 70 && dimensionScores.TB >= 50
    },
    {
      route: 'T3',
      priority: 3,
      condition: () => dimensionScores.DM >= 70 && dimensionScores.TI >= 6
    },
    {
      route: 'T4',
      priority: 2,
      condition: () => dimensionScores.CC >= 70
    },
    {
      route: 'T1',
      priority: 1,
      condition: () => dimensionScores.TB < 40 && dimensionScores.TI <= 6 &&
                       dimensionScores.GO <= 50 && dimensionScores.AI <= 50
    }
  ];

  // 检查所有命中的关口
  const hitGates = gates.filter(gate => gate.condition()).sort((a, b) => b.priority - a.priority);

  if (hitGates.length > 0) {
    return {
      hit: true,
      mainRoute: hitGates[0].route,
      subRoute: hitGates.length > 1 ? hitGates[1].route : null,
      isDirect: true
    };
  }

  return { hit: false };
}

/**
 * 加权模型计算
 * 权重矩阵（列顺序：TB, LS, TI, GO, AI, DM, CC, CR）
 */
function calculateWeightedScores() {
  const weights = {
    T1: [15, 20, 15, 15, 10, 5, 10, 10],
    T2: [25, 20, 20, 15, 30, 10, 0, 20],
    T3: [20, 10, 15, 20, 10, 30, 0, 5],
    T4: [10, 20, 10, 15, 5, 0, 35, 5],
    T5: [15, 0, 20, 35, 10, 10, 0, 10]
  };

  const dimOrder = ['TB', 'LS', 'TI', 'GO', 'AI', 'DM', 'CC', 'CR'];
  const scores = {};

  Object.keys(weights).forEach(route => {
    let score = 0;
    weights[route].forEach((weight, idx) => {
      const dim = dimOrder[idx];
      score += (dimensionScores[dim] || 0) * (weight / 100);
    });
    scores[route] = +score.toFixed(1);
  });

  // 确定主副路线
  const sorted = Object.entries(scores).sort((a, b) => b[1] - a[1]);
  const mainRoute = sorted[0][0];
  const subRoute = sorted[1] && (sorted[0][1] - sorted[1][1] < 8) ? sorted[1][0] : null;

  return {
    scores,
    mainRoute,
    subRoute,
    isDirect: false
  };
}

/**
 * 生成个性化说明
 */
function generateExplanation(result) {
  const { mainRoute, subRoute, isDirect, scores } = result;
  const mainScore = scores[mainRoute];

  let explanation = `根据你的测试结果，你最适合 <strong>${ROUTE_TEMPLATES[mainRoute].name}</strong>`;

  if (isDirect) {
    explanation += `（直落路线，满足关口条件）。`;
  } else {
    explanation += `（加权得分 ${mainScore} 分）。`;
  }

  if (subRoute) {
    explanation += ` 同时，<strong>${ROUTE_TEMPLATES[subRoute].name}</strong> 也很适合你作为辅助方向。`;
  }

  // 根据维度分数添加个性化建议
  const weakDims = Object.entries(dimensionScores)
    .filter(([_, score]) => score < 40)
    .map(([dim, _]) => QUESTIONS[dim]?.name);

  if (weakDims.length > 0) {
    explanation += ` <br><br>建议重点提升：${weakDims.join('、')}。`;
  }

  return explanation;
}

/**
 * 生成分享文案
 */
function generateShareText(result) {
  const { mainRoute } = result;
  const template = ROUTE_TEMPLATES[mainRoute];

  return `🤖 我完成了「嵩说AI | AI学习自测表」！

✨ 我的学习路线：${template.name}
${template.description}

📋 7日行动计划：
${template.checklist.slice(0, 3).map((item, idx) => `${idx + 1}. ${item}`).join('\n')}
...

💡 赶快来测测你的AI学习路线吧！`;
}

// ==================== UI 交互 ====================

/**
 * 初始化页面
 */
function init() {
  loadFromLocalStorage();
  renderPage();
  updateProgress();

  // 初始化波纹点击效果
  initRippleEffect();

  // 初始化Feather Icons
  if (typeof feather !== 'undefined') {
    feather.replace();
  }
}

/**
 * 渲染当前页
 */
function renderPage() {
  const container = document.getElementById('questionContainer');
  const dimensions = Object.keys(QUESTIONS);
  const questionsPerPage = 6;

  // 计算当前页应该显示哪些题
  const allQuestions = [];
  dimensions.forEach(dim => {
    QUESTIONS[dim].questions.forEach(q => {
      allQuestions.push({ ...q, dimension: dim });
    });

    // 在LS后插入B1
    if (dim === 'LS') {
      allQuestions.push({ ...BRANCH_QUESTIONS.B1, isBranch: true });
    }
    // 在CC后插入B2
    if (dim === 'CC') {
      allQuestions.push({ ...BRANCH_QUESTIONS.B2, isBranch: true });
    }
  });

  const totalPages = Math.ceil(allQuestions.length / questionsPerPage);
  const startIdx = currentPage * questionsPerPage;
  const endIdx = Math.min(startIdx + questionsPerPage, allQuestions.length);
  const pageQuestions = allQuestions.slice(startIdx, endIdx);

  // 清空容器
  container.innerHTML = '';

  // 渲染题目
  pageQuestions.forEach((q, idx) => {
    const questionDiv = document.createElement('div');
    questionDiv.className = 'question-card';

    if (q.isBranch) {
      // 分岔题
      questionDiv.innerHTML = `
        <h3 class="question-title">🔀 分岔题 ${q.id}</h3>
        <p class="question-text">${q.text}</p>
        <div class="branch-options">
          ${q.options.map(opt => `
            <label class="branch-option">
              <input type="radio" name="${q.id}" value="${opt.value}"
                ${answers[q.id] === opt.value ? 'checked' : ''}>
              <span>${opt.text}</span>
            </label>
          `).join('')}
        </div>
      `;

      // 添加事件监听
      questionDiv.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
          answers[q.id] = e.target.value;
          saveToLocalStorage();
        });
      });
    } else {
      // 普通题目
      questionDiv.innerHTML = `
        <h3 class="question-title">${q.id}</h3>
        <p class="question-text">${q.text}</p>
        <div class="rating-scale">
          ${[1, 2, 3, 4, 5].map(val => `
            <label class="rating-option">
              <input type="radio" name="${q.id}" value="${val}"
                ${answers[q.dimension] && answers[q.dimension][parseInt(q.id.slice(-1)) - 1] === val ? 'checked' : ''}>
              <span class="rating-label">${val}</span>
            </label>
          `).join('')}
        </div>
        <div class="rating-hint">
          <span>1 = 非常不同意</span>
          <span>5 = 非常同意</span>
        </div>
      `;

      // 添加事件监听
      questionDiv.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
          if (!answers[q.dimension]) answers[q.dimension] = [];
          const questionIdx = parseInt(q.id.slice(-1)) - 1;
          answers[q.dimension][questionIdx] = parseInt(e.target.value);
          saveToLocalStorage();
        });
      });
    }

    container.appendChild(questionDiv);
  });

  // 更新导航按钮状态
  document.getElementById('prevBtn').disabled = currentPage === 0;
  document.getElementById('nextBtn').style.display = currentPage === totalPages - 1 ? 'none' : 'inline-block';
  document.getElementById('submitBtn').style.display = currentPage === totalPages - 1 ? 'inline-block' : 'none';

  // 更新页码指示器
  const pageIndicator = document.getElementById('pageIndicator');
  pageIndicator.textContent = `第 ${currentPage + 1} 页 / 共 ${totalPages} 页`;
}

/**
 * 更新进度条
 */
function updateProgress() {
  const dimensions = Object.keys(QUESTIONS);
  const totalQuestions = dimensions.length * 3 + 2; // 24 + 2分岔题

  let answeredCount = 0;
  dimensions.forEach(dim => {
    if (answers[dim]) answeredCount += answers[dim].filter(a => a !== undefined).length;
  });
  if (answers.B1) answeredCount++;
  if (answers.B2) answeredCount++;

  const progress = (answeredCount / totalQuestions) * 100;
  document.getElementById('progressBar').style.width = `${progress}%`;
  document.getElementById('progressText').textContent = `${answeredCount} / ${totalQuestions} 题已完成`;
}

/**
 * 上一页
 */
function prevPage() {
  if (currentPage > 0) {
    currentPage--;
    renderPage();
    updateProgress();
    // 平滑滚动到页面顶部
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}

/**
 * 下一页
 */
function nextPage() {
  currentPage++;
  renderPage();
  updateProgress();
  // 平滑滚动到页面顶部
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

/**
 * 提交并显示结果
 */
function submitTest() {
  // 验证是否所有题目都已回答
  const dimensions = Object.keys(QUESTIONS);
  let allAnswered = true;

  dimensions.forEach(dim => {
    if (!answers[dim] || answers[dim].filter(a => a !== undefined).length < 3) {
      allAnswered = false;
    }
  });

  if (!answers.B1 || !answers.B2) {
    allAnswered = false;
  }

  if (!allAnswered) {
    alert('请回答所有题目后再提交！');
    return;
  }

  // 计算分数
  calculateDimensionScores();

  // 检查关口分岔
  const gateResult = checkGate();

  if (gateResult.hit) {
    finalResult = {
      mainRoute: gateResult.mainRoute,
      subRoute: gateResult.subRoute,
      isDirect: true,
      scores: {}
    };
  } else {
    const weightedResult = calculateWeightedScores();
    finalResult = weightedResult;
  }

  // 生成说明
  finalResult.explanation = generateExplanation(finalResult);
  finalResult.shareText = generateShareText(finalResult);

  // 保存结果
  saveResultToLocalStorage();

  // 提交数据到GitHub（异步，不阻塞用户查看结果）
  if (window.GitHubDataCollector) {
    window.GitHubDataCollector.submitTestData(answers, dimensionScores, finalResult)
      .then(response => {
        if (response.success) {
          if (response.method === 'github') {
            console.log('✅ 数据已成功提交到GitHub');
          } else {
            console.log('💾 数据已保存到本地备份');
          }
        } else {
          console.log('⚠️ 数据提交失败:', response.error);
        }
      })
      .catch(error => {
        console.error('❌ 数据提交异常:', error);
      });
  }

  // 显示结果页
  showResult();
}

/**
 * 显示结果页
 */
function showResult() {
  document.getElementById('questionnaire').style.display = 'none';
  document.getElementById('result').style.display = 'block';

  // 渲染主路线
  const mainTemplate = ROUTE_TEMPLATES[finalResult.mainRoute];
  document.getElementById('mainRoute').innerHTML = `
    <h2>${mainTemplate.name}</h2>
    <p>${mainTemplate.description}</p>
  `;

  // 渲染副路线
  if (finalResult.subRoute) {
    const subTemplate = ROUTE_TEMPLATES[finalResult.subRoute];
    document.getElementById('subRoute').innerHTML = `
      <h3>辅助路线：${subTemplate.name}</h3>
      <p>${subTemplate.description}</p>
    `;
  } else {
    document.getElementById('subRoute').innerHTML = '';
  }

  // 渲染个性化说明
  document.getElementById('explanation').innerHTML = finalResult.explanation;

  // 渲染7日清单
  const checklistHtml = mainTemplate.checklist.map((item, idx) => `
    <div class="checklist-item">
      <input type="checkbox" id="check${idx}">
      <label for="check${idx}">${item}</label>
    </div>
  `).join('');
  document.getElementById('checklist').innerHTML = checklistHtml;

  // 渲染口令卡
  const commandsHtml = mainTemplate.commands.map((cmd, idx) => `
    <div class="command-card">
      <span>${cmd}</span>
      <button onclick="copyCommand('${cmd}')">📋 复制</button>
    </div>
  `).join('');
  document.getElementById('commands').innerHTML = commandsHtml;

  // 渲染分享文案
  document.getElementById('shareText').textContent = finalResult.shareText;

  // 渲染图表
  renderChart();
}

/**
 * 渲染雷达图
 */
function renderChart() {
  const ctx = document.getElementById('radarChart').getContext('2d');

  const labels = Object.keys(QUESTIONS).map(dim => QUESTIONS[dim].name);
  const data = Object.keys(QUESTIONS).map(dim => dimensionScores[dim]);

  new Chart(ctx, {
    type: 'radar',
    data: {
      labels: labels,
      datasets: [{
        label: '维度得分',
        data: data,
        backgroundColor: 'rgba(124, 58, 237, 0.2)',
        borderColor: 'rgba(124, 58, 237, 1)',
        borderWidth: 2,
        pointBackgroundColor: 'rgba(255, 111, 191, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(255, 111, 191, 1)'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      layout: {
        padding: {
          top: 60,
          right: 120,
          bottom: 60,
          left: 120
        }
      },
      scales: {
        r: {
          beginAtZero: true,
          max: 100,
          ticks: {
            stepSize: 20,
            color: '#B8C1CC',
            backdropColor: 'transparent'
          },
          grid: {
            color: 'rgba(184, 193, 204, 0.2)'
          },
          pointLabels: {
            color: '#B8C1CC',
            font: {
              size: 11,
              weight: '500'
            },
            padding: 25
          }
        }
      },
      plugins: {
        legend: {
          display: false
        }
      }
    }
  });
}

/**
 * 导出PNG
 */
async function exportPNG() {
  const resultCard = document.getElementById('resultCard');
  const canvas = await html2canvas(resultCard, {
    backgroundColor: '#071628',
    scale: 2
  });

  const link = document.createElement('a');
  link.download = `AI学习自测结果_${Date.now()}.png`;
  link.href = canvas.toDataURL();
  link.click();
}

/**
 * 导出PDF
 */
async function exportPDF() {
  const resultCard = document.getElementById('resultCard');
  const canvas = await html2canvas(resultCard, {
    backgroundColor: '#071628',
    scale: 2
  });

  const imgData = canvas.toDataURL('image/png');
  const pdf = new jspdf.jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const imgWidth = 210;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
  pdf.save(`AI学习自测结果_${Date.now()}.pdf`);
}

/**
 * 导出JSON
 */
function exportJSON() {
  const exportData = {
    timestamp: new Date().toISOString(),
    answers: answers,
    dimensionScores: dimensionScores,
    finalResult: finalResult
  };

  const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
  const link = document.createElement('a');
  link.download = `AI学习自测结果_${Date.now()}.json`;
  link.href = URL.createObjectURL(blob);
  link.click();
}

/**
 * 复制分享文案
 */
function copyShareText() {
  navigator.clipboard.writeText(finalResult.shareText).then(() => {
    alert('分享文案已复制到剪贴板！');
  });
}

/**
 * 复制口令卡
 */
function copyCommand(text) {
  navigator.clipboard.writeText(text).then(() => {
    alert('已复制！');
  });
}

/**
 * 重新测试
 */
function restartTest() {
  if (confirm('确定要重新测试吗？当前结果将被清除。')) {
    currentPage = 0;
    answers = {};
    dimensionScores = {};
    finalResult = null;
    localStorage.removeItem('ai_test_answers');
    localStorage.removeItem('ai_test_result');

    document.getElementById('result').style.display = 'none';
    document.getElementById('questionnaire').style.display = 'block';

    renderPage();
    updateProgress();
  }
}

// ==================== 本地存储 ====================

function saveToLocalStorage() {
  localStorage.setItem('ai_test_answers', JSON.stringify(answers));
}

function loadFromLocalStorage() {
  const saved = localStorage.getItem('ai_test_answers');
  if (saved) {
    answers = JSON.parse(saved);
  }
}

function saveResultToLocalStorage() {
  localStorage.setItem('ai_test_result', JSON.stringify({
    dimensionScores,
    finalResult,
    timestamp: new Date().toISOString()
  }));
}

// ==================== 波纹点击效果 ====================
function createRipple(event, button) {
  const ripple = document.createElement('span');
  const rect = button.getBoundingClientRect();
  const size = Math.max(rect.width, rect.height);
  const x = event.clientX - rect.left - size / 2;
  const y = event.clientY - rect.top - size / 2;

  ripple.style.cssText = `
    position: absolute;
    width: ${size}px;
    height: ${size}px;
    left: ${x}px;
    top: ${y}px;
    background: rgba(255, 255, 255, 0.4);
    border-radius: 50%;
    transform: scale(0);
    animation: rippleEffect 0.6s ease-out;
    pointer-events: none;
    z-index: 1;
  `;

  button.style.position = 'relative';
  button.style.overflow = 'hidden';
  button.appendChild(ripple);

  setTimeout(() => ripple.remove(), 600);
}

// 为所有按钮添加波纹效果
function initRippleEffect() {
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      createRipple(e, this);
    });
  });
}

// ==================== 页面加载时初始化 ====================
document.addEventListener('DOMContentLoaded', init);
