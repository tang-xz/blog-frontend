import React from 'react'

import css from './login.css'

export default class Login extends React.Component {
  constructor(props) {
    super(props)
  
    this.state = {
      username: 'admin',
      password: '123456',
    }
  }
  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value.trim(),
    })
  }
  onSubmit(e) {
    e.preventDefault()

    if (this.state.username && this.state.password) {
      // todo
      fetch('http://127.0.0.1:3000/auth/login', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        // 默认每个请求携带本地cookie
        credentials: 'include',
        body: JSON.stringify(this.state),
      }).then(response=>{
        console.log('response: ', response);
      }).catch(error=>{
        console.log('error is: ');
        console.error(error)
      }) 
    } else {
      alert('Username and password should not be empty!');
    }
  }
  onRegister() {
    this.props.history.push('/register');
  }
  render() {
    return (
      <div className={css.container}>
        <form>
          <label htmlFor="username">username:</label>
          <input type="text" name="username" placeholder="username" value={this.state.username} onChange={this.onChange.bind(this)}/>
          <br/>
          <label htmlFor="password">password:</label>
          <input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.onChange.bind(this)}/>
          <br/>
          <button type="submit" onClick={this.onSubmit.bind(this)}>submit</button>
          <button type="button" onClick={this.onRegister.bind(this)}>go to register</button>
        </form>
      </div>
    )
  }
}