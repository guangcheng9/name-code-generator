import * as vscode from "vscode";

// 插件激活时执行
export function activate(context: vscode.ExtensionContext) {
  // 注册命令：name-code-generator.generateNameCode
  const disposable = vscode.commands.registerCommand(
    "name-code-generator.generateNameCode",
    async () => {
      // 获取当前活动的编辑器
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showErrorMessage("请先打开一个文件！");
        return;
      }

      const document = editor.document;
      const selection = editor.selection;

      // 1. 获取文件名（不含路径和后缀）
      const fullFileName = document.fileName.split(/[\\/]/).pop() || ""; // 兼容 Windows 和 macOS 路径
      const fileName = fullFileName.split(".")[0]; // 去掉后缀（如 index.ts → index）

      const srcPath = document.fileName.replace(/^.*[\\/src][\\/]/, "/"); // 去掉 src 前的路径
      // 去掉srcPath文件名的后缀
      const srcPathFileName = srcPath.split("/").pop()?.split(".")[0] || "";

      // 2. 获取选中的文本（假设为方法名）
      const selectedText = document.getText(selection).trim();

      // 3. 检查是否已导入 sensorsTrack，如果没有则添加导入语句
      const documentText = document.getText();
      const hasSensorsTrackImport = documentText.includes(
        "import { sensorsTrack } from '@/hooks/useSensors'"
      );

      // 查找最后一个 import 语句的位置
      let importInsertPosition = new vscode.Position(0, 0);
      const lines = documentText.split("\n");

      for (let i = 0; i < lines.length; i++) {
        if (lines[i].trim().startsWith("import ")) {
          importInsertPosition = new vscode.Position(i + 1, 0);
        }
      }

      // 4. 根据选中内容生成代码
      let generatedCode = "";
      if (selectedText) {
        // 获取 category 类型
        const categoryOptions: vscode.QuickPickItem[] = [
          { label: "click", description: "点击事件" },
          { label: "view", description: "浏览事件" },
          { label: "submit", description: "提交事件" },
          { label: "custom", description: "自定义事件" },
        ];
        const selectedCategoryItem = await vscode.window.showQuickPick(
          categoryOptions,
          {
            placeHolder: "请选择事件类别",
          }
        );
        if (!selectedCategoryItem) {
          vscode.window.showErrorMessage("操作已取消");
          return;
        }
        const selectedCategory = selectedCategoryItem.label;
        generatedCode = ` sensorsTrack(
    '${fileName}_page_${selectedText}',
    {
      id: id.value,
      button_name: ${selectedText},
      src_path: ${srcPathFileName},
      // 其他参数根据需要添加
    },
    { category: '${selectedCategory}' },
  );\n`;
      } else {
        // 未选中内容：
        generatedCode = `// 请选择要生成的代码位置，并选中方法名（如：handleClick）\n`;
      }

      // 5. 将生成的代码插入到光标位置的下一行，并根据需要添加导入语句
      editor
        .edit((editBuilder) => {
          // 如果没有导入 sensorsTrack，则添加导入语句
          if (!hasSensorsTrackImport) {
            editBuilder.insert(
              importInsertPosition,
              "import { sensorsTrack } from '@/hooks/useSensors';\n"
            );
          }

          // 获取下一行的起始位置
          const nextLine = selection.active.line + 1;
          const newPosition = new vscode.Position(nextLine, 0);
          editBuilder.insert(newPosition, generatedCode);
        })
        .then((success) => {
          if (success) {
            vscode.window.showInformationMessage("代码生成成功！");
          } else {
            vscode.window.showErrorMessage("代码生成失败！");
          }
        });
    }
  );

  context.subscriptions.push(disposable);
}

// 插件禁用时执行（此处无需逻辑）
export function deactivate() {}
