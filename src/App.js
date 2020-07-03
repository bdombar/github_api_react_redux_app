import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import * as actionCreator from './store/actions/action';
import User from './components/User';

const App = props => {

  const handleUsername = e => {
    props.changeUsername(e);
  }

  const handleSubmit = (e) => {
    let inputObj = document.getElementById("search-box");
    if (inputObj.value === "gcpglobal") {
      document.getElementById("error-message").innerHTML = "Invalid username";
      return null
    }
    if (!inputObj.checkValidity()) {
      document.getElementById("error-message").innerHTML = inputObj.validationMessage;
      return null
    } else {
      document.getElementById("error-message").innerHTML = "";
      props.getUserList(e, props.searchTerm)
    }
  }

  const handleClick = (e) => {
    props.getUserData(e);
  }

  if (props.userData.username !== undefined) {
    console.log(props.userData)
    return (
      <User />
    )
  }

  return (
    <div>
      <div className="title"><h2>GitHub users search</h2></div>
      <div className="search-section">
        <input
          id="search-box"
          type="text"
          placeholder="Enter GitHub username"
          onChange={handleUsername} minLength="4"></input>
        <button onClick={handleSubmit}>Search</button>
        <p id="error-message"></p>
      </div>
      {props.error && (<h3>User not found</h3>)}
      <div className="chart-section">
        <canvas id="myChart"></canvas>
      </div>
      {props.dataRetrieved && (
        <div className="list-retrieved">
          {!props.dataRetrieved && (<h3>Please, enter a username to start the search</h3>)}
          {props.dataRetrieved && (<h3>Users retrieved</h3>)}
          <div>
            {props.dataList.map(user => {
              return <div key={user.id} onClick={handleClick} className="list-item" username={user.username}>
                <img src={user.avatar} alt="Profile pic" className="pic"></img>
                <div className="item-info">
                  <div>Username: {user.username}</div>
                  <div>ID: {user.id}</div>
                </div>
              </div>
            })}
          </div>
        </div>
      )}
    </div>
  )
}

const mapStateToProps = state => {
  return {
    searchTerm: state.searchTerm,
    dataList: state.dataList,
    userData: state.userData,
    dataRetrieved: state.dataRetrieved,
    userClicked: state.userClicked,
    error: state.error
  }
};

const mapDispatchToProps = dispatch => {
  return {
    changeUsername: e => dispatch(actionCreator.changeUsername(e)),
    getUserList: (e, username) => dispatch(actionCreator.getUserList(e, username)),
    getUserData: (e) => dispatch(actionCreator.getUserData(e))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
