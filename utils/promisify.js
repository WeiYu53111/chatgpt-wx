const requestPromise = (options) =>
  new Promise((resolve, reject) => {
    wx.request({
      ...options,
      success: resolve,
      fail: reject,
    });
  });

const promisifyAll = (obj, suffix = 'Promise') =>
  Object.keys(obj).reduce((acc, key) => {
    if (typeof obj[key] === 'function') {
      acc[key + suffix] = obj[key].bind(obj);
    }
    return acc;
  }, {});

module.exports = {
  requestPromise,
  promisifyAll,
};
