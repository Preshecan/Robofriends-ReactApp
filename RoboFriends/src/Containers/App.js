import React, { Component } from 'react';
import {connect} from 'react-redux';
import CardList from '../Components/CardList.js';
//import {robots} from './robots.js';
import SearchBox from '../Components/SearchBox.js';
import Scroll from '../Components/Scroll.js';
import ErrorBoundary from '../Components/ErrorBoundary.js';
import './App.css';

import {setSearchField, requestRobots} from '../actions.js';

const mapStateToProps = state =>{
  return {
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    onSearchChange: (event) => dispatch(setSearchField(event.target.value)),
    onRequestRobots: () => dispatch(requestRobots())
  }
}

class App extends Component {
  componentDidMount(){
    this.props.onRequestRobots();
  }

  // onSearchChange = (event) => {
  //   this.setState({ searchfield: event.target.value })
  // }

  render(){
    const {searchField, onSearchChange, robots, isPending } = this.props;
    const filteredBots = robots.filter(robot => {
      return robot.name.toLowerCase().includes(searchField.toLowerCase());
    })
    return isPending ?
      <h1>Loading</h1> :
      (
        <div className='tc'>
          <h1 className='f1'>RoboFriends</h1>
          <SearchBox searchChange = {onSearchChange}/>
          <Scroll>
            <ErrorBoundary>
              <CardList robots={filteredBots}/>
            </ErrorBoundary>
          </Scroll>
        </div>
      );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
