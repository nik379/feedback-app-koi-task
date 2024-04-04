// const { namespaceWrapper } = require('../_koiiNode/koiiNode');
// class Submission {
//   async task(round) {
//     // Write the logic to do the work required for submitting the values and optionally store the result in levelDB

//     // Below is just a sample of work that a task can do

//     try {
//       const value = 'Hello, World!';
//       console.log('ROUND', round);

//       if (value) {
//         // store value on NeDB
//         await namespaceWrapper.storeSet('value', value);
//       }
//       return value;
//     } catch (err) {
//       console.log('ERROR IN EXECUTING TASK', err);
//       return 'ERROR IN EXECUTING TASK' + err;
//     }
//   }

//   async submitTask(roundNumber) {
//     console.log('submitTask called with round', roundNumber);
//     try {
//       console.log('inside try');
//       console.log(
//         await namespaceWrapper.getSlot(),
//         'current slot while calling submit',
//       );
//       const submission = await this.fetchSubmission(roundNumber);
//       console.log('SUBMISSION', submission);
//       await namespaceWrapper.checkSubmissionAndUpdateRound(
//         submission,
//         roundNumber,
//       );
//       console.log('after the submission call');
//       return submission;
//     } catch (error) {
//       console.log('error in submission', error);
//     }
//   }

//   async fetchSubmission(round) {
//     // Write the logic to fetch the submission values here and return the cid string

//     // fetching round number to store work accordingly

//     console.log('IN FETCH SUBMISSION');

//     // The code below shows how you can fetch your stored value from level DB

//     const value = await namespaceWrapper.storeGet('value'); // retrieves the value
//     console.log('VALUE', value);
//     return value;
//   }
// }
// const submission = new Submission();
// module.exports = { submission };


// const { namespaceWrapper } = require('../_koiiNode/koiiNode');

// class Submission {
//   async task(round) {
//     try {
//       console.log('ROUND', round);

//       // Fetch user feedback from local storage

//       const userFeedback = window.localStorage.getItem('userFeedback');

//       // Store user feedback in levelDB
//       await namespaceWrapper.storeSet('userFeedback', userFeedback);

//       return userFeedback;
//     } catch (err) {
//       console.log('ERROR IN EXECUTING TASK', err);
//       return 'ERROR IN EXECUTING TASK' + err;
//     }
//   }

//   async submitTask(roundNumber) {
//     console.log('submitTask called with round', roundNumber);
//     try {
//       console.log('inside try');
//       console.log(await namespaceWrapper.getSlot(), 'current slot while calling submit');
//       const submission = await this.fetchSubmission(roundNumber);
//       console.log('SUBMISSION', submission);
//       await namespaceWrapper.checkSubmissionAndUpdateRound(submission, roundNumber);
//       console.log('after the submission call');
//       return submission;
//     } catch (error) {
//       console.log('error in submission', error);
//     }
//   }

//   async fetchSubmission(round) {
//     console.log('IN FETCH SUBMISSION');

//     // Retrieve user feedback from levelDB
//     const userFeedback = await namespaceWrapper.storeGet('userFeedback');
//     console.log('USER FEEDBACK', userFeedback);

//     return userFeedback;
//   }
// }

// const submission = new Submission();
// module.exports = { submission };

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