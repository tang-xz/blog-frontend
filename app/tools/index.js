import request from './request'
import auth from './auth'
/**
 * [timeout promise 形式]
 * @param  {[type]} ms [settimeout 毫秒数]
 * @return {[type]}    [promise]
 */
const timeout = (ms, data) => new Promise(resolve => setTimeout(resolve.bind({}, data), ms));

export {
  timeout,
  request,
  auth,
};