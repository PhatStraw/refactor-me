# VS CODE GPT-4 Code Refactor

This Visual Studio Code extension leverages OpenAI's GPT-4 model to refactor your code. It provides an easy and quick way to improve and optimize your code with the power of AI.

## Features

- Refactor code using OpenAI's GPT-4 model.
- Easy to use within VSCode.
- Supports a wide range of programming languages (as supported by GPT-4).

## Installation

1. Install the Extension: Search for "airefactor" in the VSCode Extensions Marketplace and install it.
2. Set API Key: 

    - After installing the extension, open the Command Palette in VS Code by pressing `Ctrl+Shift+P` (or `Cmd+Shift+P` on macOS).
    - Type [Preferences: Open User Settings](file:///Users/kevinsims/Code/airefactor/README.md#27%2C9-27%2C9) and select it. This will open the settings.json file.
    - In the search bar at the top, type `airefactor.openaiApiKey` to find the setting contributed by your extension.
    - Enter your OpenAI API key in the input box for the `airefactor.openaiApiKey` setting.
    - Save the settings.json file and restart VS Code.

## Usage

1. Open the file you want to refactor in VSCode.
2. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac) to open the Command Palette.
3. Type "Refactor me" and select the command.
4. The extension will send your selected code (or current file if nothing is selected) to OpenAI's GPT-4 model and replace your current code with the refactored version.

## Configuration

- **API Key**: The extension requires an OpenAI API key to function. This key must be set in your system's environment variables as `OPENAI_API_KEY`.
- **Model Configuration**: The extension uses the [gpt-4](file:///Users/kevinsims/Code/airefactor/README.md#48%2C52-48%2C52) model by default. You can modify the model used by editing the `extension.js` file if necessary.

## Troubleshooting

If you encounter any issues:

- Ensure your OpenAI API key is correctly set in your environment variables.
- Check if the OpenAI API service is operational.
- Restart VSCode if the extension does not appear or work correctly.

## Support & Contributions

For support, please open an issue in the GitHub repository. Contributions are welcome! Feel free to fork the repository and submit pull requests.

## License

MIT

## Acknowledgments

This extension was built using OpenAI's GPT-4 API.
