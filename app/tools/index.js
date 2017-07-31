/**
 * [timeout promise 形式]
 * @param  {[type]} ms [settimeout 毫秒数]
 * @return {[type]}    [promise]
 */
const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));

export {
  timeout,
};