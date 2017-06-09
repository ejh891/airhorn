import React, { Component } from 'react';

import JoinGroup from './Components/JoinGroup/component';

class GroupManager extends Component {
    state = {
        joinVisible: false,
        groupToJoin: "",
        joinToggleText: "Join a group"
    }

    toggleJoinVisibility = () => {
        this.setState((prevState) => { 
            return {
                joinVisible: !prevState.joinVisible,
            }
        });
    }

    hideJoin = () => {
        this.setState({joinVisible: false});
    }

    leaveGroup = () => {
        this.props.onGroupChange("");
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

    componentWillReceiveProps(nextProps) {
        let joinToggleText;
        if (nextProps.groupName) {
            joinToggleText = "Change";
        }
        else {
            joinToggleText = "Join a group";
        }

        this.setState({joinToggleText: joinToggleText});
    }

    render() {
        return (
            <div>
                <h1>{this.props.groupName}</h1>
                <a style={{cursor: "pointer"}} onClick={this.toggleJoinVisibility}>{this.state.joinToggleText}</a>
                <a style={{cursor: "pointer", marginLeft: "10px"}} onClick={this.leaveGroup} className={this.props.groupName ? "" : "hidden"}>Leave</a>
                <div className={this.state.joinVisible ? "" : "hidden"} >
                    <JoinGroup 
                        textboxOnChange={this.joinTextboxOnChange}
                        buttonOnClick={this.joinButtonOnClick}
                        textboxValue={this.state.groupToJoin}
                    />
                </div>
            </div>
        )
    }
}

export default GroupManager;