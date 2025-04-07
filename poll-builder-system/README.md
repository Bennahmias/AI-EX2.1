# PollBuilder System

## Author
- **Name**: [Your Name]
- **ID Number**: [Your ID Number]

## Summary
The PollBuilder System is an in-memory polling application that allows users to:
- Create polls with a question and multiple options.
- Vote on existing polls.
- Retrieve poll results in a structured format.

The system ensures data integrity by validating inputs and throwing exceptions for invalid operations. It is implemented in JavaScript using ES6 modules and tested with Jest.

## Design Decisions and Assumptions
- **Duplicate Questions**: Duplicate poll questions are not allowed. An exception is thrown if a duplicate question is detected.
- **Input Validation**: 
  - Polls must have a non-empty question and at least two valid options.
  - Empty strings or duplicate options are not allowed.
- **Poll Management**: Polls cannot be updated or deleted once created.
- **Error Handling**: Exceptions are thrown for invalid operations, such as voting on a non-existent poll or retrieving results for a non-existent poll.

## AI Tools Usage
I used **ChatGPT** to create a detailed prompt that I sent to **GitHub Copilot** in Visual Studio Code. Copilot was then used to generate the initial implementation of the code and tests. I also used Copilot to make iterative changes and improvements to the codebase.
