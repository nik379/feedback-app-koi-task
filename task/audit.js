const { namespaceWrapper } = require('../_koiiNode/koiiNode');

class Audit {
  async validateNode(submission_value, round) {
    let vote;
    console.log('SUBMISSION VALUE', submission_value, round);
    try {
      const isValidFeedback = validateFeedback(submission_value);

      if (isValidFeedback) {
        vote = true;
      } else {
        vote = false;
      }
    } catch (e) {
      console.error(e);
      vote = false;
    }
    return vote;
  }

  async auditTask(roundNumber) {
    console.log('auditTask called with round', roundNumber);
    console.log(await namespaceWrapper.getSlot(), 'current slot while calling auditTask');
    await namespaceWrapper.validateAndVoteOnNodes(this.validateNode, roundNumber);
  }

  validateFeedback(feedback){
    if(feedback.length < 0) return false;
    else return true;
  }
}

const audit = new Audit();
module.exports = { audit };