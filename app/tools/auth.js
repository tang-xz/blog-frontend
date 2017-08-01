const auth = {
  isLogin() {
    return localStorage.getItem('login') === 'true'
  },
  login(cb) {
    localStorage.setItem('login', true)
    cb && cb();
  },
  logout(cb) {
    localStorage.setItem('login', false)
    cb && cb();
  }
}

export default auth;