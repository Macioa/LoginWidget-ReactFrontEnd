import React, { Component } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import Button from '@material-ui/core/Button';
require('./env/index')

class Login extends Component {
  constructor(props){
    super(props);
    this.state = { expanded:false, 
                   username:null, user: null, password:null, city:null, zip:null, 
                   loginserver: props.server||process.env.LOGINSERVER||'http://localhost:9000'
                 };
  }

  toggleExpanded=(e)=>{this.setState({expanded:!this.state.expanded})}
  
  onFormChange=(e)=>{
    if (e.target.name==='username') { var validated = e.target.value.replace(/[^a-z0-9]/gi,''); }
    else { var validated = e.target.value; }
    this.setState({[e.target.name]:validated});
  }

  post=async(path)=>{
    const response = await fetch(`${this.state.loginserver}/register`, {
      method: 'POST',
      credentials: 'include',
      body: JSON.stringify(this.state),
      headers: { 'content-type':'application/json' }
    })

    try {
      const parsedresponse = await response.json();

      if (parsedresponse.status==201||201)
        this.setState({expanded:false})
    } catch(err){ alert(`Could not connect to ${this.state.loginserver}\n${err}`) }
  }

  register=(e)=>{ this.post('/register'); }

  login=(e)=>{ this.post('/login') }

  readCookie=()=>{
    let newState={};
    for (let cookie of document.cookie.split(';')){
      let data=cookie.split('=');
      newState[data[0]]=data[1]
    }
    if (newState.user)
      if (newState.user.length)
        return newState;
    else return {}
  }

  setState=(newState)=>{
    if (!newState) newState={};
    Object.assign(newState, this.readCookie());
    super.setState(newState,()=>{
    if (this.lift){ this.lift(this.state) }
    });
  }

  componentDidMount=()=>{this.setState()}

  render() {
    return (
      <div className="Login" style={{borderStyle:'solid', borderRadius:'15px', borderWidth:"1px", width:150, textAlign:'center'}}>
        <Button onClick={this.toggleExpanded} style={{borderRadius:"15px"}}>{this.state.user?this.state.user:'Login'}</Button>
        <ExpansionPanel expanded={this.state.expanded} style={{width:"125px", margin:"10px auto 10px", textAlign:'center', borderRadius:'10px'}}>
            <form style={{margin:'5px'}} onSubmit={this.handleSubmit}>
              <input type="text" name="username" placeholder="Username" onChange={this.onFormChange} value={this.state.username}/>
              <br/>
              <input type="password" name="password" placeholder="Password" onChange={this.onFormChange} value={this.state.password}/>
              <br/>
              <button onClick={this.register} type="button">Register</button>
              <button onClick={this.login} type="button">Login</button>
              <br/>
              <button>Guest</button>
            </form>
        </ExpansionPanel>
      </div>
    );
  }
}

export default Login;
