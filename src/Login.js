import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import Button from '@material-ui/core/Button';

class Login extends Component {
  state={expanded:false}
  toggleExpanded=(e)=>{
    console.log(this.state.expanded)
    this.setState({expanded:!this.state.expanded})}
  render() {
    return (
      <div className="Login" style={{borderStyle:'solid', borderRadius:'15px', borderWidth:"1px", width:150, textAlign:'center'}}>
        <Button onClick={this.toggleExpanded} style={{borderRadius:"15px"}}>Login</Button>
        <ExpansionPanel expanded={this.state.expanded} style={{width:"125px", margin:"10px auto 10px", textAlign:'center', borderRadius:'10px'}}>
            <form style={{margin:'5px'}}>
              <input type="text" name="username" placeholder="Username"/><br/>
              <input type="password" name="password" placeholder="Password"/><br/>
              <input type="submit" value="Submit"/>
            </form>
        </ExpansionPanel>
      </div>
    );
  }
}

export default Login;
