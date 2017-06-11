import React, { Component } from 'react';

import JoinGroup from './Components/JoinGroup/component';
import CopyToClipboard from 'react-copy-to-clipboard';

class GroupManager extends Component {
    state = {
        joinVisible: false,
        groupToJoin: "",
        joinToggleText: "Join a group",
        linkCopied: false
    }

    onLinkCopy = () => {
        this.setState({linkCopied: true});
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
        this.onGroupChange("");
    }

    onGroupChange = (newGroup) => {
        this.setState({groupToJoin: "", joinVisible: false, linkCopied: false});
        this.props.onGroupChange(newGroup);
    }

// join events
    joinButtonOnClick = () => {
        this.onGroupChange(this.state.groupToJoin);
    }

    joinTextboxOnChange = (e) => {
        this.setState({groupToJoin: e.target.value});
    }

    joinTextboxOnKeyPress = (e) => {
        const ENTER_KEY = 13;
        if(e.charCode===ENTER_KEY){
            this.joinButtonOnClick();
        }
    }

    componentWillReceiveProps(nextProps) {
        let joinToggleText;
        let textToCopy = "";
        if (nextProps.groupName) {
            joinToggleText = "Change";
            textToCopy = "http://bababaworthy.com/?group=" + encodeURIComponent(nextProps.groupName);
        }
        else {
            joinToggleText = "Join a group";
        }

        this.setState({joinToggleText: joinToggleText, textToCopy: textToCopy});
    }

    render() {
        return (
            <div>
                <h1>{this.props.groupName}</h1>
                <div style={{marginBottom: "10px"}}>
                    <a style={{cursor: "pointer"}} onClick={this.toggleJoinVisibility}>{this.state.joinToggleText}</a>
                    <a style={{cursor: "pointer", marginLeft: "10px"}} onClick={this.leaveGroup} className={this.props.groupName ? "" : "hidden"}>Leave</a>
                    <span style={{marginLeft: "10px"}} className={this.props.groupName ? "" : "hidden"}>
                        <CopyToClipboard text={this.state.textToCopy} onCopy={this.onLinkCopy}>
                            <a style={{cursor: "pointer"}}>Copy Link</a>
                        </CopyToClipboard>
                        <span>
                            {this.state.linkCopied ? <span style={{marginLeft: "10px"}}>Copied!</span> : null}
                        </span>
                    </span>
                </div>
                <div className={this.state.joinVisible ? "" : "hidden"} >
                    <JoinGroup 
                        textboxOnChange={this.joinTextboxOnChange}
                        textboxOnKeyPress={this.joinTextboxOnKeyPress}
                        buttonOnClick={this.joinButtonOnClick}
                        textboxValue={this.state.groupToJoin}
                    />
                </div>
            </div>
        )
    }
}

export default GroupManager;