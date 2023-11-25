const vscode = require('vscode');
const assert = require('assert');

suite('Extension Test Suite', () => {
  vscode.window.showInformationMessage('Start all tests.');

  test('performRefactoring', async () => {
    // Prepare a test document and selection
    const document = await vscode.workspace.openTextDocument({
      content: `const ex2 = (arr) => {
		for (let index = 0; index < arr.length; index++) {
		   const element = arr[index];
			element += "hi"
		}
		 return arr;
	   }`,
      language: 'javascript'
    });
    const editor = await vscode.window.showTextDocument(document);
    editor.selection = new vscode.Selection(0, 0, 0, 0); // Select the entire document

    // Run the command
    await vscode.commands.executeCommand('refactorme.refactor');

    // Check the result
    const refactoredCode = editor.document.getText();
    assert.strictEqual(refactoredCode, 'const ex2 = (arr) => arr.map(element => `${element}hi`)');
  });
});