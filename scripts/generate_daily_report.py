#!/usr/bin/env python3
"""
生成每日数据报表
包含详细的统计分析和可视化图表
"""

import json
import os
from datetime import datetime, timedelta
from pathlib import Path
from collections import Counter, defaultdict
import sys

# 尝试导入可视化库（如果可用）
try:
    import matplotlib
    matplotlib.use('Agg')  # 无GUI后端
    import matplotlib.pyplot as plt
    import seaborn as sns
    HAS_VIZ = True
except ImportError:
    HAS_VIZ = False
    print('⚠️ 未安装matplotlib/seaborn，将跳过图表生成')

def load_recent_data(days=7):
    """加载最近N天的数据"""
    data_dir = Path('data/raw')
    cutoff_date = datetime.now() - timedelta(days=days)
    recent_data = []

    if not data_dir.exists():
        return recent_data

    for json_file in data_dir.glob('test_*.json'):
        try:
            with open(json_file, 'r', encoding='utf-8') as f:
                data = json.load(f)
                test_time = datetime.fromisoformat(data['timestamp'].replace('Z', '+00:00'))
                if test_time >= cutoff_date:
                    recent_data.append(data)
        except Exception as e:
            print(f"⚠️ 读取文件失败 {json_file}: {e}")

    return recent_data

def generate_report_data(recent_data):
    """生成报表数据"""
    report = {
        'generated_at': datetime.now().isoformat(),
        'period': f'最近7天',
        'total_tests': len(recent_data)
    }

    if not recent_data:
        return report

    # 每日测试数量
    daily_counts = defaultdict(int)
    for data in recent_data:
        date_str = data['timestamp'][:10]
        daily_counts[date_str] += 1
    report['daily_counts'] = dict(sorted(daily_counts.items()))

    # 路线分布
    routes = [d['result']['mainRoute'] for d in recent_data if 'result' in d]
    report['route_distribution'] = dict(Counter(routes))

    # 维度得分分析
    dimension_scores = defaultdict(list)
    for data in recent_data:
        if 'dimensionScores' in data:
            for dim, score in data['dimensionScores'].items():
                dimension_scores[dim].append(score)

    report['dimension_stats'] = {
        dim: {
            'average': round(sum(scores) / len(scores), 2),
            'min': min(scores),
            'max': max(scores),
            'count': len(scores)
        }
        for dim, scores in dimension_scores.items()
    }

    # 设备统计
    devices = [d['metadata']['deviceType'] for d in recent_data if 'metadata' in d]
    report['device_distribution'] = dict(Counter(devices))

    # 完成时间分析
    completion_times = [d['usageStats']['completionTime'] / 1000 / 60
                       for d in recent_data if 'usageStats' in d]
    if completion_times:
        report['completion_time_stats'] = {
            'average_minutes': round(sum(completion_times) / len(completion_times), 2),
            'min_minutes': round(min(completion_times), 2),
            'max_minutes': round(max(completion_times), 2)
        }

    return report

def save_report(report):
    """保存报表为JSON"""
    report_file = Path(f'data/reports/daily_report_{datetime.now().strftime("%Y%m%d")}.json')
    report_file.parent.mkdir(parents=True, exist_ok=True)

    with open(report_file, 'w', encoding='utf-8') as f:
        json.dump(report, f, ensure_ascii=False, indent=2)

    print(f'✅ 报表已保存: {report_file}')
    return report_file

def generate_charts(report):
    """生成可视化图表"""
    if not HAS_VIZ:
        return

    try:
        charts_dir = Path('data/reports/charts')
        charts_dir.mkdir(parents=True, exist_ok=True)

        # 设置中文字体
        plt.rcParams['font.sans-serif'] = ['SimHei', 'Arial Unicode MS']
        plt.rcParams['axes.unicode_minus'] = False

        # 1. 路线分布饼图
        if 'route_distribution' in report and report['route_distribution']:
            plt.figure(figsize=(10, 6))
            routes = list(report['route_distribution'].keys())
            counts = list(report['route_distribution'].values())
            plt.pie(counts, labels=routes, autopct='%1.1f%%', startangle=90)
            plt.title('学习路线分布')
            plt.savefig(charts_dir / f'routes_{datetime.now().strftime("%Y%m%d")}.png', dpi=150, bbox_inches='tight')
            plt.close()

        # 2. 每日测试趋势图
        if 'daily_counts' in report and report['daily_counts']:
            plt.figure(figsize=(12, 6))
            dates = list(report['daily_counts'].keys())
            counts = list(report['daily_counts'].values())
            plt.plot(dates, counts, marker='o', linewidth=2, markersize=8)
            plt.title('每日测试数量趋势')
            plt.xlabel('日期')
            plt.ylabel('测试数量')
            plt.xticks(rotation=45)
            plt.grid(True, alpha=0.3)
            plt.tight_layout()
            plt.savefig(charts_dir / f'daily_trend_{datetime.now().strftime("%Y%m%d")}.png', dpi=150, bbox_inches='tight')
            plt.close()

        print(f'📊 图表已生成: {charts_dir}')

    except Exception as e:
        print(f'⚠️ 图表生成失败: {e}')

def main():
    """主函数"""
    print('📈 开始生成每日报表...')

    # 加载最近7天数据
    recent_data = load_recent_data(days=7)
    print(f'📁 已加载 {len(recent_data)} 条最近数据')

    # 生成报表
    report = generate_report_data(recent_data)

    # 保存报表
    save_report(report)

    # 生成图表
    if HAS_VIZ and report['total_tests'] > 0:
        generate_charts(report)

    # 打印摘要
    print('\n📊 报表摘要:')
    print(f'  - 最近7天测试数: {report["total_tests"]}')
    if 'daily_counts' in report:
        print(f'  - 日期范围: {min(report["daily_counts"].keys())} ~ {max(report["daily_counts"].keys())}')
    if 'route_distribution' in report:
        print(f'  - 最热门路线: {max(report["route_distribution"], key=report["route_distribution"].get)}')

if __name__ == '__main__':
    main()
