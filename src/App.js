import React, { Component } from 'react';
import './App.css';
import { connect } from 'react-redux';
import {increase, decrease, fetchUser } from './actions';

class App extends Component {

  constructor(props){
    super(props);
    this.searcUser = this.searcUser.bind(this);
  }

  searcUser(event) {
    this.props.fetchUser(event.target.value)
  }

  render() {
    return (
      <div className="App">
       <button onClick={this.props.increase}>Increase</button>
       <button onClick={this.props.decrease}>Decrease</button>
       <p>
         Number: {this.props.number}
       </p>
       <p>
         <input placeholder='Username' onChange={this.searcUser}/>
       </p>
       <p>
         <img src={this.props.image} alt='Avatar' width={100}/>
       </p>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  number: state.counter.number,
  image: state.user.avatar_url
})

const mapDispatchToProps = {
  increase,
  decrease,
  fetchUser
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
