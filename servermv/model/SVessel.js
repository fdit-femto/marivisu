class SVessel {

  constructor() {
    this.data = {
      messages: [],
      label: {}
    }
    this.nbMessage = 0
    this.timeLength = 0
    this.firstAppearance = 0;
  }

  setLabel(label) {
    this.data.label = label
  }

  addMessage(newMessage) {
    this.data.messages.push(newMessage)
    this.calculateTimeLength()

    if (this.nbMessage === 0) {
      this.firstAppearance = newMessage.timestamp
    } else {
      this.cleanMessage()
    }

    this.nbMessage++
  }

  removeFirstMessage() {
    this.data.messages.shift()
    this.firstAppearance = this.data[0]
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
