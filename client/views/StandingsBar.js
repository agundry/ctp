import React from 'react';
import Paper from 'material-ui/Paper';
import Divider from 'material-ui/Divider';
import Subheader from 'material-ui/Subheader';
import {List, ListItem, makeSelectable} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import {grey400, darkBlack, white} from 'material-ui/styles/colors';

const SelectableList = makeSelectable(List);

class StandingsBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: this.props.selectedUser._id
        };
    }

    handleRequestChange(event, index) {
        this.setState({
            selectedIndex: index,
        });
        this.props.onChange(index);
    };

    render() {
        return (
            <div className="col-md-3">
                <SelectableList value={this.state.selectedIndex} onChange={this.handleRequestChange.bind(this)}>
                    {this.props.users.map((item, i, items) => {
                        return (
                            <ListItem
                                key={item._id}
                                value={item._id}
                                primaryText={item.emails[0].address}
                                rightAvatar={
                                    <Avatar
                                    color={white}
                                    backgroundColor={grey400}
                                    size={30}
                                    >{item.points}</Avatar>
                                }>
                            </ListItem>
                        )
                    })}
                </SelectableList>
            </div>
        );
    }
}
StandingsBar.propTypes = {
    users: React.PropTypes.array,
    onChange: React.PropTypes.func,
    selectedUser: React.PropTypes.object
};

export default StandingsBar;

