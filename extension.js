const vscode = require("vscode");
const OpenAI = require("openai");

let config = vscode.workspace.getConfiguration("refactorme");
const openai = new OpenAI({
  apiKey: config.get("openaiApiKey"),
});

function getActiveFileContent() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      return null;
    }
  
    const selection = editor.selection;
    if (!selection.isEmpty) {
      // If there is a selection, return the selected text
      return editor.document.getText(selection);
    } else {
      // If there is no selection, return the entire document's text
      return editor.document.getText();
    }
  }

async function refactorWithIoenAI(code) {
  const response = await openai.chat.completions.create({
    model: "gpt-4-1106-preview",
    max_tokens: 4096,
    temperature: 0,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: `
            You are asenior code developer assistant bot that is fed files of code from an ide. You are to refactor this code but keep all functionality.

            Key Instructions:
            1. Preserve Functionality: The refactored code must maintain all original functionalities, scripts, and styling exactly as in the original snippet. Any change in functionality is unacceptable.
            2. Avoid Pseudocode: Deliver the refactored code in its complete and executable form. Do not include pseudocode, placeholders, theoretical suggestions or comments, write full code.
            3. No Abstractions or New Files: Refactor the code within the given snippet itself. Do not abstract parts of the code into separate functions or files that were not in the original snippet.
            4. Adherence to Best Practices: Ensure your refactoring aligns with best practices suitable for a top-tier tech environment. This includes clean code principles, proper commenting, and efficient use of resources.
            5. Test for Production: Confirm that the refactored code is production-ready, meaning it's tested, reliable, and won't introduce new issues or dependencies.
            6. Check syntax and make sure the code is usable.
            7. Never return unfinished code finish the code to the best of your ability.
            
            Please structure your response in the following JSON format:
            {
              "refactoredCode": "<Insert your fully refactored and functional code here>"
            }
            `,
      },
      {
        role: "user",
        content: `${code}`,
      },
    ],
  });

  const parsed = JSON.parse(response.choices[0].message.content);

  return parsed.refactoredCode;
}

function updateFileWithRefactoredCode(refactoredCode) {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
      vscode.window.showErrorMessage("No active text editor available.");
      return;
    }
  
    const document = editor.document;
    const selection = editor.selection;
  
    editor
      .edit((editBuilder) => {
        if (!selection.isEmpty) {
          // If there is a selection, replace only the selected text
          editBuilder.replace(selection, refactoredCode);
        } else {
          // If there is no selection, replace the entire document's text
          const entireRange = new vscode.Range(
            document.positionAt(0),
            document.positionAt(document.getText().length)
          );
          editBuilder.replace(entireRange, refactoredCode);
        }
      })
      .then((success) => {
        if (!success) {
          vscode.window.showErrorMessage("Failed to update the file.");
        }
      });
  }

async function performRefactoring() {
  const code = getActiveFileContent();
  if (!code) {
    vscode.window.showErrorMessage("No active file.");
    return;
  }

  try {
    const refactored = await refactorWithIoenAI(code);
    updateFileWithRefactoredCode(refactored);
  } catch (error) {
    vscode.window.showErrorMessage(`Refactoring failed: ${error.message}`);
  }
}

function activate(context) {
  let disposable = vscode.commands.registerCommand(
    "refactorme.refactor",
    function () {
      performRefactoring();
    }
  );

  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate,
};
