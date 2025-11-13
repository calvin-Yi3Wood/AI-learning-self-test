#!/usr/bin/env python3
"""
清理旧数据
保留最近N天的数据，删除更早的数据
"""

import argparse
import json
import os
from datetime import datetime, timedelta
from pathlib import Path

def cleanup_old_data(days=90, dry_run=False):
    """
    清理旧数据

    Args:
        days: 保留最近N天的数据
        dry_run: 只预览不实际删除
    """
    data_dir = Path('data/raw')
    if not data_dir.exists():
        print('⚠️ 数据目录不存在')
        return

    cutoff_date = datetime.now() - timedelta(days=days)
    print(f'📅 清理日期: {cutoff_date.strftime("%Y-%m-%d")}之前的数据')

    old_files = []
    total_size = 0

    for json_file in data_dir.glob('test_*.json'):
        try:
            with open(json_file, 'r', encoding='utf-8') as f:
                data = json.load(f)
                test_time = datetime.fromisoformat(data['timestamp'].replace('Z', '+00:00'))

                if test_time < cutoff_date:
                    file_size = json_file.stat().st_size
                    old_files.append((json_file, test_time, file_size))
                    total_size += file_size

        except Exception as e:
            print(f"⚠️ 处理文件失败 {json_file}: {e}")

    if not old_files:
        print('✅ 没有需要清理的旧数据')
        return

    # 排序（最旧的在前）
    old_files.sort(key=lambda x: x[1])

    print(f'\n📋 发现 {len(old_files)} 个旧文件（共 {total_size / 1024:.1f} KB）:')
    for file_path, test_time, file_size in old_files[:10]:  # 只显示前10个
        print(f'  - {file_path.name} ({test_time.strftime("%Y-%m-%d")})')

    if len(old_files) > 10:
        print(f'  ... 还有 {len(old_files) - 10} 个文件')

    if dry_run:
        print('\n🔍 预览模式，不会实际删除文件')
        return

    # 确认删除
    print(f'\n⚠️ 即将删除 {len(old_files)} 个文件')

    # 执行删除
    deleted_count = 0
    for file_path, _, _ in old_files:
        try:
            file_path.unlink()
            deleted_count += 1
        except Exception as e:
            print(f"❌ 删除失败 {file_path}: {e}")

    print(f'\n✅ 已删除 {deleted_count} 个旧文件（释放 {total_size / 1024:.1f} KB）')

def main():
    """主函数"""
    parser = argparse.ArgumentParser(description='清理旧数据')
    parser.add_argument('--days', type=int, default=90, help='保留最近N天的数据（默认90天）')
    parser.add_argument('--dry-run', action='store_true', help='只预览不实际删除')

    args = parser.parse_args()

    print(f'🧹 开始清理数据（保留最近 {args.days} 天）...')
    cleanup_old_data(days=args.days, dry_run=args.dry_run)

if __name__ == '__main__':
    main()
