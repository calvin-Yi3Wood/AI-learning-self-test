#!/usr/bin/env python3
"""
导出数据到Excel
生成完整的Excel报表，包含多个工作表
"""

import json
import os
from datetime import datetime
from pathlib import Path
from collections import defaultdict

try:
    import pandas as pd
    HAS_PANDAS = True
except ImportError:
    HAS_PANDAS = False
    print('❌ 未安装pandas，无法生成Excel')
    import sys
    sys.exit(1)

def load_all_data():
    """加载所有测试数据"""
    data_dir = Path('data/raw')
    all_data = []

    if not data_dir.exists():
        return all_data

    for json_file in sorted(data_dir.glob('test_*.json')):
        try:
            with open(json_file, 'r', encoding='utf-8') as f:
                data = json.load(f)
                all_data.append(data)
        except Exception as e:
            print(f"⚠️ 读取文件失败 {json_file}: {e}")

    return all_data

def create_main_sheet(all_data):
    """创建主数据表"""
    rows = []

    for data in all_data:
        row = {
            '提交时间': data.get('timestamp', ''),
            '匿名ID': data.get('anonymousId', '')[:8] + '...',  # 只显示前8位
            '主路线': data.get('result', {}).get('mainRoute', ''),
            '副路线': data.get('result', {}).get('subRoute', ''),
            '是否直达': '是' if data.get('result', {}).get('isDirect', False) else '否',
            '设备类型': data.get('metadata', {}).get('deviceType', ''),
            '浏览器': data.get('metadata', {}).get('userAgent', '')[:50] + '...',
            '完成时长(分钟)': round(data.get('usageStats', {}).get('completionTime', 0) / 1000 / 60, 2)
        }

        # 添加维度得分
        if 'dimensionScores' in data:
            for dim, score in data['dimensionScores'].items():
                row[f'维度_{dim}'] = score

        rows.append(row)

    return pd.DataFrame(rows)

def create_route_summary(all_data):
    """创建路线汇总表"""
    route_counts = defaultdict(int)
    route_details = defaultdict(lambda: {
        'count': 0,
        'devices': defaultdict(int)
    })

    for data in all_data:
        main_route = data.get('result', {}).get('mainRoute', 'Unknown')
        device = data.get('metadata', {}).get('deviceType', 'Unknown')

        route_counts[main_route] += 1
        route_details[main_route]['count'] += 1
        route_details[main_route]['devices'][device] += 1

    rows = []
    for route, details in route_details.items():
        row = {
            '学习路线': route,
            '总数': details['count'],
            '占比': f"{details['count'] / len(all_data) * 100:.1f}%",
            '桌面端': details['devices'].get('desktop', 0),
            '移动端': details['devices'].get('mobile', 0),
            '平板': details['devices'].get('tablet', 0)
        }
        rows.append(row)

    df = pd.DataFrame(rows)
    return df.sort_values('总数', ascending=False)

def create_dimension_summary(all_data):
    """创建维度得分汇总表"""
    dimension_scores = defaultdict(list)

    for data in all_data:
        if 'dimensionScores' in data:
            for dim, score in data['dimensionScores'].items():
                dimension_scores[dim].append(score)

    rows = []
    for dim, scores in dimension_scores.items():
        row = {
            '维度': dim,
            '平均分': round(sum(scores) / len(scores), 2),
            '最高分': max(scores),
            '最低分': min(scores),
            '中位数': sorted(scores)[len(scores) // 2],
            '样本数': len(scores)
        }
        rows.append(row)

    return pd.DataFrame(rows).sort_values('平均分', ascending=False)

def create_daily_summary(all_data):
    """创建每日汇总表"""
    daily_data = defaultdict(lambda: {
        'count': 0,
        'routes': defaultdict(int),
        'devices': defaultdict(int)
    })

    for data in all_data:
        date = data['timestamp'][:10]  # YYYY-MM-DD
        main_route = data.get('result', {}).get('mainRoute', 'Unknown')
        device = data.get('metadata', {}).get('deviceType', 'Unknown')

        daily_data[date]['count'] += 1
        daily_data[date]['routes'][main_route] += 1
        daily_data[date]['devices'][device] += 1

    rows = []
    for date, stats in sorted(daily_data.items()):
        row = {
            '日期': date,
            '测试总数': stats['count'],
            '最热路线': max(stats['routes'], key=stats['routes'].get) if stats['routes'] else 'N/A',
            '桌面端': stats['devices'].get('desktop', 0),
            '移动端': stats['devices'].get('mobile', 0),
            '平板': stats['devices'].get('tablet', 0)
        }
        rows.append(row)

    return pd.DataFrame(rows)

def export_to_excel(all_data):
    """导出到Excel"""
    if not all_data:
        print('⚠️ 没有数据可导出')
        return

    # 创建Excel写入器
    output_dir = Path('data/reports')
    output_dir.mkdir(parents=True, exist_ok=True)
    output_file = output_dir / f'完整数据报表_{datetime.now().strftime("%Y%m%d_%H%M%S")}.xlsx'

    with pd.ExcelWriter(output_file, engine='openpyxl') as writer:
        # 工作表1: 主数据
        df_main = create_main_sheet(all_data)
        df_main.to_excel(writer, sheet_name='所有测试数据', index=False)

        # 工作表2: 路线汇总
        df_routes = create_route_summary(all_data)
        df_routes.to_excel(writer, sheet_name='路线分布汇总', index=False)

        # 工作表3: 维度汇总
        df_dimensions = create_dimension_summary(all_data)
        df_dimensions.to_excel(writer, sheet_name='维度得分汇总', index=False)

        # 工作表4: 每日汇总
        df_daily = create_daily_summary(all_data)
        df_daily.to_excel(writer, sheet_name='每日统计', index=False)

    print(f'✅ Excel报表已生成: {output_file}')
    print(f'   - 总测试数: {len(all_data)}')
    print(f'   - 工作表数: 4 个')
    print(f'   - 文件大小: {output_file.stat().st_size / 1024:.1f} KB')

    return output_file

def main():
    """主函数"""
    print('📊 开始导出Excel报表...')

    # 加载所有数据
    all_data = load_all_data()
    print(f'📁 已加载 {len(all_data)} 条数据')

    if not all_data:
        print('⚠️ 没有数据，退出')
        return

    # 导出Excel
    export_to_excel(all_data)

if __name__ == '__main__':
    main()
