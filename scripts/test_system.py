#!/usr/bin/env python3
"""
测试和验证GitHub Actions数据收集系统
"""

import json
import sys
import os
from pathlib import Path
from datetime import datetime

class SystemTester:
    def __init__(self):
        self.tests_passed = 0
        self.tests_failed = 0
        self.warnings = []

    def test_directory_structure(self):
        """测试目录结构"""
        print('\n📁 测试目录结构...')

        required_dirs = [
            '.github/workflows',
            'scripts',
            'data/raw',
            'data/reports',
            'data/reports/charts'
        ]

        for dir_path in required_dirs:
            path = Path(dir_path)
            if path.exists():
                print(f'  ✅ {dir_path}')
                self.tests_passed += 1
            else:
                print(f'  ❌ {dir_path} - 不存在')
                self.tests_failed += 1

    def test_workflow_files(self):
        """测试工作流文件"""
        print('\n⚙️ 测试工作流文件...')

        required_files = [
            '.github/workflows/collect-data.yml',
            '.github/workflows/daily-report.yml'
        ]

        for file_path in required_files:
            path = Path(file_path)
            if path.exists():
                # 验证YAML语法
                try:
                    import yaml
                    with open(path, 'r', encoding='utf-8') as f:
                        yaml.safe_load(f)
                    print(f'  ✅ {file_path}')
                    self.tests_passed += 1
                except ImportError:
                    print(f'  ⚠️ {file_path} - 存在（未验证YAML，需要安装PyYAML）')
                    self.tests_passed += 1
                    self.warnings.append('建议安装PyYAML: pip install pyyaml')
                except Exception as e:
                    print(f'  ❌ {file_path} - YAML语法错误: {e}')
                    self.tests_failed += 1
            else:
                print(f'  ❌ {file_path} - 不存在')
                self.tests_failed += 1

    def test_python_scripts(self):
        """测试Python脚本"""
        print('\n🐍 测试Python脚本...')

        required_scripts = [
            'scripts/update_summary.py',
            'scripts/generate_daily_report.py',
            'scripts/export_to_excel.py',
            'scripts/cleanup_old_data.py'
        ]

        for script_path in required_scripts:
            path = Path(script_path)
            if path.exists():
                # 验证Python语法
                try:
                    import py_compile
                    py_compile.compile(str(path), doraise=True)
                    print(f'  ✅ {script_path}')
                    self.tests_passed += 1
                except SyntaxError as e:
                    print(f'  ❌ {script_path} - 语法错误: {e}')
                    self.tests_failed += 1
            else:
                print(f'  ❌ {script_path} - 不存在')
                self.tests_failed += 1

    def test_frontend_files(self):
        """测试前端文件"""
        print('\n🌐 测试前端文件...')

        required_files = [
            'AI自测表.html',
            'github-data-collector.js',
            'consent-modal.js',
            'app.js'
        ]

        for file_path in required_files:
            path = Path(file_path)
            if path.exists():
                print(f'  ✅ {file_path}')
                self.tests_passed += 1

                # 检查配置
                if file_path == 'github-data-collector.js':
                    with open(path, 'r', encoding='utf-8') as f:
                        content = f.read()
                        if 'YOUR_GITHUB_USERNAME' in content:
                            print(f'    ⚠️ 需要配置GitHub用户名')
                            self.warnings.append('github-data-collector.js需要配置GitHub信息')
                        if 'YOUR_REPO_NAME' in content:
                            print(f'    ⚠️ 需要配置仓库名')
                        if 'YOUR_GITHUB_TOKEN' in content:
                            print(f'    ⚠️ 需要配置GitHub Token')
            else:
                print(f'  ❌ {file_path} - 不存在')
                self.tests_failed += 1

    def test_python_dependencies(self):
        """测试Python依赖"""
        print('\n📦 测试Python依赖...')

        required_packages = {
            'pandas': '数据处理和Excel生成',
            'openpyxl': 'Excel文件读写',
            'pytz': '时区处理'
        }

        optional_packages = {
            'matplotlib': '数据可视化（可选）',
            'seaborn': '高级可视化（可选）',
            'pyyaml': 'YAML验证（可选）'
        }

        # 必需包
        for package, desc in required_packages.items():
            try:
                __import__(package)
                print(f'  ✅ {package} - {desc}')
                self.tests_passed += 1
            except ImportError:
                print(f'  ❌ {package} - 未安装 ({desc})')
                self.tests_failed += 1
                self.warnings.append(f'安装命令: pip install {package}')

        # 可选包
        for package, desc in optional_packages.items():
            try:
                __import__(package)
                print(f'  ✅ {package} - {desc}')
                self.tests_passed += 1
            except ImportError:
                print(f'  ⚠️ {package} - 未安装 ({desc})')
                self.warnings.append(f'可选安装: pip install {package}')

    def test_data_simulation(self):
        """模拟数据测试"""
        print('\n🧪 模拟数据处理...')

        # 创建测试数据
        test_data = {
            'timestamp': datetime.now().isoformat(),
            'anonymousId': 'test-user-12345',
            'answers': {
                'TB': [4, 5, 3],
                'LS': [3, 4, 4]
            },
            'dimensionScores': {
                'TB': 75,
                'LS': 68.75
            },
            'result': {
                'mainRoute': 'T4',
                'subRoute': 'T2',
                'isDirect': False
            },
            'metadata': {
                'deviceType': 'desktop',
                'screenResolution': '1920x1080'
            }
        }

        # 保存测试数据
        test_file = Path('data/raw/test_simulation.json')
        test_file.parent.mkdir(parents=True, exist_ok=True)

        try:
            with open(test_file, 'w', encoding='utf-8') as f:
                json.dump(test_data, f, ensure_ascii=False, indent=2)
            print(f'  ✅ 创建测试数据文件')
            self.tests_passed += 1

            # 读取验证
            with open(test_file, 'r', encoding='utf-8') as f:
                loaded_data = json.load(f)
                if loaded_data == test_data:
                    print(f'  ✅ 数据读写验证成功')
                    self.tests_passed += 1
                else:
                    print(f'  ❌ 数据不匹配')
                    self.tests_failed += 1

            # 清理测试文件
            test_file.unlink()
            print(f'  ✅ 清理测试文件')
            self.tests_passed += 1

        except Exception as e:
            print(f'  ❌ 模拟测试失败: {e}')
            self.tests_failed += 1

    def generate_report(self):
        """生成测试报告"""
        print('\n' + '=' * 60)
        print('📊 测试报告')
        print('=' * 60)

        total_tests = self.tests_passed + self.tests_failed
        success_rate = (self.tests_passed / total_tests * 100) if total_tests > 0 else 0

        print(f'\n✅ 通过: {self.tests_passed}')
        print(f'❌ 失败: {self.tests_failed}')
        print(f'📈 成功率: {success_rate:.1f}%')

        if self.warnings:
            print(f'\n⚠️ 警告 ({len(self.warnings)} 条):')
            for warning in self.warnings:
                print(f'  - {warning}')

        print('\n' + '=' * 60)

        if self.tests_failed == 0:
            print('🎉 系统验证通过！可以部署到GitHub了！')
            return 0
        else:
            print('⚠️ 存在问题，请先修复再部署')
            return 1

def main():
    """主函数"""
    print('🔍 GitHub Actions数据收集系统验证工具')
    print('=' * 60)

    tester = SystemTester()

    # 运行所有测试
    tester.test_directory_structure()
    tester.test_workflow_files()
    tester.test_python_scripts()
    tester.test_frontend_files()
    tester.test_python_dependencies()
    tester.test_data_simulation()

    # 生成报告
    exit_code = tester.generate_report()
    sys.exit(exit_code)

if __name__ == '__main__':
    main()
