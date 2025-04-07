export class PollBuilder {
  constructor() {
    this.polls = new Map(); // Store polls with the question as the key
  }

  // Helper function: Validate question
  validateQuestion(question) {
    if (!question || typeof question !== 'string') {
      throw new Error('Invalid question');
    }
    if (this.polls.has(question.toLowerCase())) {
      throw new Error('Poll with this question already exists');
    }
  }

  // Helper function: Validate options
  validateOptions(options) {
    if (!Array.isArray(options) || options.length < 2 || options.some(opt => !opt || typeof opt !== 'string')) {
      throw new Error('Invalid options');
    }
    const lowerCaseOptions = options.map(opt => opt.toLowerCase());
    const uniqueOptions = new Set(lowerCaseOptions);
    if (uniqueOptions.size !== options.length) {
      throw new Error('Duplicate options are not allowed');
    }
  }

  createPoll(question, options) {
    this.validateQuestion(question);
    this.validateOptions(options);

    this.polls.set(question.toLowerCase(), {
      question,
      options: options.reduce((acc, option) => {
        acc[option] = 0; // Initialize votes for each option
        return acc;
      }, {}),
    });
  }

  vote(question, option) {
    const poll = this.polls.get(question.toLowerCase());
    if (!poll) {
      throw new Error('Poll does not exist');
    }
    if (!poll.options.hasOwnProperty(option)) {
      throw new Error('Option does not exist');
    }

    poll.options[option] += 1; // Increment the vote count for the option
  }

  getPollResults(question) {
    const poll = this.polls.get(question.toLowerCase());
    if (!poll) {
      throw new Error('Poll does not exist');
    }

    const totalVotes = Object.values(poll.options).reduce((sum, votes) => sum + votes, 0);
    const results = Object.entries(poll.options).map(([option, votes]) => ({
      option,
      votes,
    }));

    return {
      question: poll.question,
      totalVotes,
      results,
    };
  }
}