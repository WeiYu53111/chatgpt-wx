const requestPromise = require('../../utils/promisify').requestPromise;
Page({
  data: {
    inputValue: '',
    messages: [],
    scrollId: '',
  },

  onInput(e) {
    this.setData({
      inputValue: e.detail.value,
    });
  },

  async onSend() {
    const inputText = this.data.inputValue.trim();
    if (!inputText) return;

    const userMessage = { text: inputText, type: 'user' };
    this.addMessage(userMessage);
    this.setData({ inputValue: '' });

    const gptResponse = await this.sendToBackend(inputText);
    if (gptResponse) {
      const gptMessage = { text: gptResponse, type: 'gpt' };
      this.addMessage(gptMessage);
    }
  },

  addMessage(message) {
    const messages = this.data.messages.concat(message);
    this.setData({
      messages,
      scrollId: `message${messages.length - 1}`,
    });
  },

  async sendToBackend(message) {
    try {
      const response = await requestPromise({
        url: 'http://localhost:3000/chat',
        method: 'POST',
        data: { message },
      });

      return response.data.response;
    } catch (error) {
      console.error('Error:', error);
      wx.showToast({
        title: '请求失败，请重试',
        icon: 'none',
      });
      return null;
    }
  },
});
