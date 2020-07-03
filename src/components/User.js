import React from "react";
import { connect } from "react-redux";

const User = props => {
    return (
        <div className="user-data">
            {props.userData.map(user => {
                return <div key={user.id} className="full-user-details" username={user.username}>
                    <a href={user.url}><img src={user.avatar} alt="Profile pic" className="pic"></img></a>
                    <div className="">
                        <div>Username: {user.username}</div>
                        <div>ID: {user.id}</div>
                        <div>Followers: {user.followers}</div>
                        <div>Public repos: {user.repos}</div>
                    </div>
                </div>
            })}
            <br />
            <a href="/">New search</a>
        </div>
    );
};

const mapStateToProps = state => {
    return {
        searchTerm: state.searchTerm,
        dataList: state.dataList,
        userData: state.userData,
        dataRetrieved: state.dataRetrieved,
        userClicked: state.userClicked,
        error: state.error
    };
};

export default connect(
    mapStateToProps,
    null
)(User);