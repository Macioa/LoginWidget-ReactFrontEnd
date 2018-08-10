import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import Button from '@material-ui/core/Button';


class Login extends Component {
  constructor(props){
    super(props);
    this.state = { expanded:false, registerExpand:false, loginExpand:true, selected:'login',
                   username:null, user: null, password:null, city:null, state:null, country:null, zip:null, 
                   loginserver: props.server||process.env.REACT_APP_LOGINSERVER||'http://localhost:9000',
                   statusMessage: null
                 };
    this.formRef = React.createRef()
  }

  toggleExpanded=(e)=>{this.setState({expanded:!this.state.expanded})}
  
  onFormChange=(e)=>{
    if (e.target.name==='username') { var validated = e.target.value.replace(/[^a-z0-9]/gi,''); }
    else { var validated = e.target.value; }
    this.setState({[e.target.name]:validated});
  }

  post=async(path)=>{
    const response = await fetch(`${this.state.loginserver}${path}`, {
      method: 'POST',
      credentials: 'include',
      body: "mySTringasdfasf"="asasdfasfdasdfs",
      data: "asdfsadf",
      headers: { 'content-type':'application/x-www-form-urlencoded; charset=UTF-8',  }
    })

    try {
      const parsedresponse = await response.json();

      if ((parsedresponse.status==200)||(parsedresponse.status==201)){
          if (parsedresponse.user){
            let user = parsedresponse.user; user.user = user.username;
            this.setState(user)
          }
        this.setState({expanded:false, statusMessage:null})
        //console.log(parsedresponse)
      } else { if (parsedresponse.data) this.setState({statusMessage:parsedresponse.data}); }
      console.log(`Response status: ${parsedresponse.status}`)
    } catch(err){ alert(`Could not connect to ${this.state.loginserver}\n${err}`) }
  }
  
  toggleSelected=(e)=>{
    let selected = (e.target.name)? e.target.name:ReactDOM.findDOMNode(e.target).parentNode.name
    if (selected==='login') this.setState({loginExpand:true, registerExpand:false, selected:selected, statusMessage:null})
    if (selected==='register') this.setState({loginExpand:false, registerExpand:true, selected:selected, statusMessage:null})
  }

  handleClick=(e)=>{
    if (e.target.name==='login') this.login();
    if (e.target.name==='register') this.register();
  }

  register=(e)=>{ if (this.state.username) this.post('/register'); }

  login=(e)=>{ if (this.state.username) this.post('/login'); }

  guest=(e)=>{ this.post('/guest'); }

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
     super.setState(newState,()=>{
        if (this.lift){ this.lift({user:this.state.user, zip:this.state.zip, city:this.state.city, state:this.state.state, country:this.state.country}) }
        }); 
  }

  componentDidMount=()=>{this.setState(this.readCookie())}

  createForm=()=>{
    let inputStyle={width:'70px', borderRadius:'3px'}
    return (
      <form style={{margin:'5px'}} ref={this.formRef} name="form">
              <input type="text" name="username" placeholder="Username" onChange={this.onFormChange} value={this.state.username} style={inputStyle}/>
              <br/>
              <input type="password" name="password" placeholder="Password" onChange={this.onFormChange} value={this.state.password} style={inputStyle}/>
              <br/>
              <button onClick={this.handleClick} name={this.state.selected} type="button" style={{borderRadius:'5px'}}>Confirm</button>
              {(this.state.statusMessage)?
                  <div><br/><h5 style={{color:'#960009'}}>{this.state.statusMessage}</h5></div> : ''
              }
      </form>
    )
  }

  render() {
    return (
      <div className="Login" style={{borderStyle:'solid', borderRadius:'15px', borderWidth:"1px", width:100, textAlign:'center'}}>
        <Button onClick={this.toggleExpanded} style={{borderRadius:"15px"}}>{this.state.user?this.state.user:'Login'}</Button>
        <ExpansionPanel expanded={this.state.expanded} style={{width:"90px", margin:"10px auto 10px", textAlign:'center', borderRadius:'10px'}}>
              <Button size='small' onClick={this.toggleSelected} type="button" name="register">Register</Button>
              <br/>
              <ExpansionPanel expanded={this.state.registerExpand}>
                  {(this.state.selected==='register')? this.createForm():''}
              </ExpansionPanel>

              <Button size='small' onClick={this.toggleSelected} type="button" name="login">Login</Button>
              <br/>
              <ExpansionPanel expanded={this.state.loginExpand}>
                  {(this.state.selected==='login')? this.createForm():''}
              </ExpansionPanel>

              <Button size='small' onClick={this.guest} type="button">Guest</Button>
        </ExpansionPanel>
      </div>
    );
  }
}

export default Login;
