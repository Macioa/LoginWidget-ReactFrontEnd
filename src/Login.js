import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import Button from '@material-ui/core/Button';
import { parse } from 'path';
require('./env/index')

class Login extends Component {
  state={expanded:false, username:null, password:null}

  toggleExpanded=(e)=>{this.setState({expanded:!this.state.expanded})}
  
  onFormChange=(e)=>{
    if (e.target.name==='username') 
       var validated = e.target.value.replace(/[^a-z0-9]/gi,''); 
    else { var validated = e.target.value; }
    this.setState({[e.target.name]:validated})
  }

  register=async(e)=>{
    e.preventDefault();
    const response = await fetch(`http://localhost:9000/register`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(this.state),
        headers: { 'content-type':'application/json' }
    })
    const parsedresponse = await response.json();
    console.log(parsedresponse)
  }

  login=async(e)=>{
    const response = await fetch(`http://localhost:9000/login`, {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(this.state),
        headers: { 'content-type':'application/json' }
    }).catch((err)=>{console.error('err')})
    const parsedresponse = await response.json();
    console.log(parsedresponse)
  }

  render() {
    return (
      <div className="Login" style={{borderStyle:'solid', borderRadius:'15px', borderWidth:"1px", width:150, textAlign:'center'}}>
        <Button onClick={this.toggleExpanded} style={{borderRadius:"15px"}}>Login</Button>
        <ExpansionPanel expanded={this.state.expanded} style={{width:"125px", margin:"10px auto 10px", textAlign:'center', borderRadius:'10px'}}>
            <form style={{margin:'5px'}} onSubmit={this.handleSubmit}>
              <input type="text" name="username" placeholder="Username" onChange={this.onFormChange} value={this.state.username}/><br/>
              <input type="password" name="password" placeholder="Password" onChange={this.onFormChange} value={this.state.password}/><br/>
              <button onClick={this.register} type="button">Register</button>
              <button onClick={this.login} type="button">Login</button>
            </form>
        </ExpansionPanel>
      </div>
    );
  }
}

export default Login;
