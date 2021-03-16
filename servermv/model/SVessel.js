class SVessel {

  constructor() {
    this.messages = []
    this.nbMessage = 0
    this.timeLength = 0
    this.firstAppearance = 0;
  }

  addMessage(newMessage) {
    this.messages.push(newMessage)
    this.calculateTimeLength()

    if (this.nbMessage === 0) {
      this.firstAppearance = newMessage.timestamp
    } else {
      this.cleanMessage()
    }

    this.nbMessage++
  }

  removeFirstMessage() {
    this.messages.shift()
    this.firstAppearance = this.messages[0]
  }

  calculateTimeLength(timestamp) {
    this.timeLength = this.firstAppearance - timestamp
  }

  cleanMessage() {
    if (this.timeLength > 86400 || this.nbMessage > 100) {
      this.removeFirstMessage()
    }
  }

}
module.exports = SVessel
