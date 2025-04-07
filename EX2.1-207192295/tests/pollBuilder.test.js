import { PollBuilder } from '../src/pollBuilder.js';

describe('PollBuilder', () => {
  let pollBuilder;

  // Initialize a new PollBuilder instance before each test
  beforeEach(() => {
    pollBuilder = new PollBuilder();
  });


  test('should create a poll successfully', () => {
    const question = 'What is your favorite color?';
    const options = ['Red', 'Blue', 'Green'];
    pollBuilder.createPoll(question, options);

    const results = pollBuilder.getPollResults(question);
    expect(results).toEqual({
      question: question,
      totalVotes: 0,
      results: options.map(option => ({ option, votes: 0 })),
    });
  });
  test('should throw an error when creating a poll with an empty question', () => {
    expect(() => pollBuilder.createPoll('', ['Option 1', 'Option 2'])).toThrow('Invalid question');
  });

  test('should throw an error when creating a poll with invalid options', () => {
    expect(() => pollBuilder.createPoll('Question?', [])).toThrow('Invalid options');
  });

  test('should throw an error when creating a poll with duplicate question', () => {
    pollBuilder.createPoll('Question?', ['Option 1', 'Option 2']);
    expect(() => pollBuilder.createPoll('Question?', ['Option 3', 'Option 4'])).toThrow('Poll with this question already exists');
  });

  // Test case: Successfully voting on an existing poll
  test('should vote on an existing poll successfully', () => {
    const question = 'What is your favorite fruit?';
    const options = ['Apple', 'Banana', 'Cherry'];
    pollBuilder.createPoll(question, options);
    pollBuilder.vote(question, 'Apple');

    const results = pollBuilder.getPollResults(question);
    expect(results.results.find(result => result.option === 'Apple').votes).toBe(1);
  });

  test('should throw an error when voting on a non-existent poll', () => {
    expect(() => pollBuilder.vote('Non-existent poll', 'Option')).toThrow('Poll does not exist');
  });

  test('should throw an error when voting for a non-existent option', () => {
    const question = 'What is your favorite animal?';
    const options = ['Dog', 'Cat'];
    pollBuilder.createPoll(question, options);
    expect(() => pollBuilder.vote(question, 'Fish')).toThrow('Option does not exist');
  });

  test('should retrieve results for an existing poll', () => {
    const question = 'Best programming language?';
    const options = ['JavaScript', 'Python', 'Java'];
    pollBuilder.createPoll(question, options);
    pollBuilder.vote(question, 'JavaScript');
    pollBuilder.vote(question, 'Python');

    const results = pollBuilder.getPollResults(question);
    expect(results.totalVotes).toBe(2);
    expect(results.results.find(result => result.option === 'JavaScript').votes).toBe(1);
    expect(results.results.find(result => result.option === 'Python').votes).toBe(1);

  });

  test('should throw an error when retrieving results for a non-existent poll', () => {
    expect(() => pollBuilder.getPollResults('Non-existent poll')).toThrow('Poll does not exist');
  });

  test('should throw an error when creating a poll with only one option', () => {
    const question = 'Do you like programming?';
    const options = ['Yes'];
    expect(() => pollBuilder.createPoll(question, options)).toThrow('Invalid options');
  });
  test('should handle multiple votes correctly', () => {
    const question = 'Favorite season?';
    const options = ['Spring', 'Summer', 'Fall', 'Winter'];
    pollBuilder.createPoll(question, options);
    pollBuilder.vote(question, 'Summer');
    pollBuilder.vote(question, 'Summer');
    pollBuilder.vote(question, 'Winter');

    const results = pollBuilder.getPollResults(question);
    expect(results.results.find(result => result.option === 'Summer').votes).toBe(2);
    expect(results.results.find(result => result.option === 'Winter').votes).toBe(1);
  });
  test('should retrieve results for a poll with no votes', () => {
    const question = 'What is your favorite movie genre?';
    const options = ['Action', 'Comedy', 'Drama'];
    pollBuilder.createPoll(question, options);
  
    const results = pollBuilder.getPollResults(question);
    expect(results.totalVotes).toBe(0);
    options.forEach(option => {
      expect(results.results.find(result => result.option === option).votes).toBe(0);
    });
  });
  test('should throw an error when creating a poll with duplicate options (case-insensitive)', () => {
    const question = 'What is your favorite fruit?';
    const options = ['Apple', 'apple', 'Banana'];
    expect(() => pollBuilder.createPoll(question, options)).toThrow('Duplicate options are not allowed');
  });
});