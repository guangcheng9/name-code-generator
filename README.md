# Name Code Generator

一个 VS Code 插件，可以根据文件名和方法名快速生成埋点代码模板。

## 功能特性

- 根据当前文件名和选中的方法名快速生成代码
- 支持选择不同的事件类别（click、view、submit、custom）
- 自动生成包含文件信息和方法信息的代码片段
- 快捷键支持，提高开发效率

## 安装

1. 在 VS Code 扩展市场中搜索 "Name Code Generator"
2. 点击安装按钮进行安装
3. 安装完成后重启 VS Code

或者手动安装：

1. 下载 `.vsix` 文件
2. 在 VS Code 中按 `Ctrl+Shift+P` 打开命令面板
3. 输入 `Extensions: Install from VSIX` 并选择该选项
4. 选择下载的 `.vsix` 文件进行安装

## 使用方法

### 命令方式

1. 打开任意文件
2. 选中需要生成代码的方法名
3. 按 `Ctrl+Shift+P` 打开命令面板
4. 输入 `Generate Name Code` 并执行命令

### 快捷键方式

1. 打开任意文件
2. 选中需要生成代码的方法名
3. 使用快捷键：
   - Windows/Linux: `Ctrl+Alt+N`
   - macOS: `Cmd+Alt+N`

### 操作步骤

1. 插件会自动获取当前文件名（不含扩展名）
2. 弹出选择框让你选择事件类别（click/view/submit/custom）
3. 自动生成类似以下格式的代码：
