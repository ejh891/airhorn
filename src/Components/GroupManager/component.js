import React, { Component } from 'react';

import JoinGroup from './Components/JoinGroup/component';

class GroupManager extends Component {
    state = {
        joinVisible: false,
        groupToJoin: ""
    }

    toggleJoinVisibility = () => {
        this.setState((prevState) => { return {joinVisible: !prevState.joinVisible}});
    }

    hideJoin = () => {
        this.setState({joinVisible: false});
    }

// join events
    joinButtonOnClick = () => {
        this.props.onGroupChange(this.state.groupToJoin);
        this.setState({groupToJoin: ""});
        this.hideJoin();
    }

    joinTextboxOnChange = (e) => {
        this.setState({groupToJoin: e.target.value});
    }

    render() {
        return (
            <div>
                <h1>{this.props.groupName}</h1>
                <a style={{cursor: "pointer"}} onClick={this.toggleJoinVisibility}>{this.props.groupName ? "Change" : "Join a group"}</a>
                <div className={this.state.joinVisible ? "" : "hidden"} >
                    <JoinGroup 
                        textboxOnChange={this.joinTextboxOnChange}
                        buttonOnClick={this.joinButtonOnClick}
                    />
                </div>
            </div>
        )
    }
}

export default GroupManager;