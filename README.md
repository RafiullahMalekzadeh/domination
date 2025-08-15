# JavaScript Fundamentals Quiz

A fun and interactive quiz application to test your knowledge of JavaScript basics! This project was built as a learning exercise to practice DOM manipulation, event handling, and creating a complete web application from scratch.

## What is this?

This is a simple but feature-rich quiz app that presents you with JavaScript-related questions. It's designed to be educational and user-friendly, with immediate feedback on your answers and a detailed review at the end.

## Features

- **Welcome Screen**: A clean start page that introduces the quiz
- **Randomized Questions**: Questions appear in a different order each time you take the quiz
- **Immediate Feedback**: See right away if your answer is correct (green) or wrong (red)
- **Progress Tracking**: Know which question you're on and how many are left
- **Score Display**: Get your final score with percentage and color-coded results
- **Answer Review**: See all your answers compared to the correct ones at the end
- **Mobile Friendly**: Works great on phones and tablets too
- **Restart Option**: Take the quiz again without refreshing the page

## How to Use

1. **Open the quiz**: Double-click on `quiz.html` to open it in your web browser
2. **Start the quiz**: Click the green "Start Quiz" button
3. **Answer questions**: Click on the answer you think is correct
4. **See feedback**: Your answer will turn green (correct) or red (wrong)
5. **Continue**: Click "Next Question" to move forward
6. **Submit**: On the last question, click "Submit Quiz" to see your results
7. **Review**: Scroll through your answers and see what you got right/wrong
8. **Try again**: Click "Restart Quiz" to take it again

## File Structure

The project consists of three main files:

- **`quiz.html`** - The main webpage structure
- **`quiz.css`** - All the styling and visual design
- **`quiz.js`** - The quiz logic and functionality

## How it Works

### The HTML Structure
The page has three main sections that show/hide as needed:
- **Start Screen**: Welcome message and start button
- **Quiz Interface**: Questions and answer buttons
- **Results Screen**: Score and answer review

### The Styling
The CSS makes everything look clean and professional:
- White cards on a light gray background
- Smooth hover effects on buttons
- Color-coded feedback (green for correct, red for wrong)
- Responsive design that works on mobile devices

### The JavaScript Logic
The quiz functionality includes:
- **Question Randomization**: Questions shuffle each time you start
- **State Management**: Tracks current question, user answers, and score
- **Event Handling**: Responds to button clicks and user interactions
- **Dynamic Content**: Creates question buttons and review cards on the fly
- **Score Calculation**: Figures out percentage and color-codes results

## Current Questions

The quiz currently includes 5 JavaScript fundamentals questions covering:
- Variable declaration
- Array methods
- Data types
- Function syntax
- Comparison operators

## Customization

Want to add your own questions? It's easy! Just edit the `quizData` array in `quiz.js`. Each question needs:
- `question`: The question text
- `options`: An array of 4 possible answers
- `answer`: The index (0-3) of the correct answer

## Browser Compatibility

This quiz works in all modern browsers:
- Chrome
- Firefox
- Safari
- Edge

## Learning Goals

This project demonstrates several important web development concepts:
- **DOM Manipulation**: Creating and modifying HTML elements with JavaScript
- **Event Handling**: Responding to user interactions
- **State Management**: Keeping track of quiz progress
- **CSS Styling**: Making things look good and responsive
- **User Experience**: Creating an intuitive and engaging interface

## Future Improvements

Some ideas for making this even better:
- Add more questions
- Include different difficulty levels
- Add a timer for each question
- Save high scores locally
- Add sound effects
- Include explanations for wrong answers

## Getting Started

1. Download all three files (`quiz.html`, `quiz.css`, `quiz.js`)
2. Make sure they're all in the same folder
3. Open `quiz.html` in your web browser
4. Start quizzing!

That's it! No server setup or complex installation needed. Just open the HTML file and you're ready to test your JavaScript knowledge.
