# Coding Quiz

This repository contains a coding quiz implemented using HTML, CSS, and JavaScript. The quiz presents code-related questions to the user and calculates their score based on correct answers within a given time limit. Wrong answers result in a time penalty. Users can view and submit highscores.

## Usage

To use the coding quiz, follow these steps:

1. Open the `index.html` file in a web browser.
2. Read the instructions and click the "Start Quiz" button to begin.
3. Answer the questions by selecting the appropriate option.
4. Each wrong answer deducts 10 seconds from the timer.
5. The quiz ends when all questions are answered or when the timer reaches 0.
6. After the quiz ends, enter your name and click "Submit" to store your score.
7. Click "View Highscores" to see the list of highscores.
8. Use the "Go Back" button to return to the main menu.
9. Use the "Clear Highscores" button to remove all highscores.

## File Structure

The repository has the following file structure:
├── index.html
└── Assets/
├── reset.css
├── styles.css
└── java.js

- `index.html`: The main HTML file containing the quiz structure and elements.
- `Assets/`: A directory containing the CSS and JavaScript files.
  - `reset.css`: CSS file to reset default browser styles.
  - `styles.css`: CSS file containing styling for the quiz interface.
  - `java.js`: JavaScript file with the quiz logic and event handlers.

## Customization

You can customize the quiz by modifying the following files:

- `index.html`: Update the quiz questions and answers in the `questionObj` variable.
- `Assets/styles.css`: Modify the CSS styles to change the appearance of the quiz.
- `Assets/java.js`: Adjust the JavaScript code to modify the quiz behavior.

Please note that modifying the JavaScript code requires understanding of JavaScript programming concepts.

## Dependencies

This quiz has the following dependencies:

- None

## Compatibility

The quiz should be compatible with modern web browsers that support HTML5, CSS3, and JavaScript.

## Contributing

Contributions to the coding quiz are welcome! If you find any issues or have improvements to suggest, please feel free to submit a pull request.

## License

The coding quiz is released under the [MIT License](LICENSE).

## Credits

This coding quiz was created by [your name]. If you have any questions or suggestions, please contact [your contact information].

Enjoy the quiz and have fun challenging yourself!
