const { namespaceWrapper } = require('../_koiiNode/koiiNode');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//  prompt the user for input
function getUserInput() {
  return new Promise((resolve) => {
    rl.question('Enter your input: ', (input) => {
      resolve(input);
    });
  });
}

class Submission {
  async task(round) {
    try {
      console.log('ROUND', round);

      const userInput = await getUserInput();

      // window.localStorage.setItem('userFeedback', userInput);

      // Store user input in levelDB
      await namespaceWrapper.storeSet('userFeedback', userInput);

      return userInput;
    } catch (err) {
      console.log('ERROR IN EXECUTING TASK', err);
      return 'ERROR IN EXECUTING TASK' + err;
    }
  }

  async submitTask(roundNumber) {
    console.log('submitTask called with round', roundNumber);
    try {
      console.log('inside try');
      console.log(await namespaceWrapper.getSlot(), 'current slot while calling submit');
      const submission = await this.fetchSubmission(roundNumber);
      console.log('SUBMISSION', submission);
      await namespaceWrapper.checkSubmissionAndUpdateRound(submission, roundNumber);
      console.log('after the submission call');
      return submission;
    } catch (error) {
      console.log('error in submission', error);
    }
  }

  async fetchSubmission(round) {
    console.log('IN FETCH SUBMISSION');

    //user feedback from levelDB
    const userFeedback = await namespaceWrapper.storeGet('userFeedback');
    console.log('USER FEEDBACK', userFeedback);

    return userFeedback;
  }
}

const submission = new Submission();
module.exports = { submission };

async function main() {
  await submission.task();

  rl.close();
}

main();