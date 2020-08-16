import React, {Component} from 'react';
import {AutoComplete, Input, Icon} from 'antd';
import nba from '../nba-client';
import {PROFILE_PIC_URL_PREFIX} from '../constants';

const Option = AutoComplete.Option;

class SearchBar extends Component {
    state = {
        dataSource: [],
    };



    render() {
        const {dataSource} = this.state;

        const options = dataSource.map((player) => (
            <Option key={player.fullName} value={player.fullName} className="player-option">
                <img className="player-option-image" src={`${PROFILE_PIC_URL_PREFIX}/${player.playerId}.png`}/>
                <span className="player-option-label">{player.fullName}</span>
            </Option>
        ));

        return (
            <AutoComplete
                className="search-bar"
                size="large"
                placeholder="Search NBA Player"
                optionLabelProp="value"
                onSearch={this.handleSearch}
                dataSource={options}
                onSelect={this.onSelect}
            >

                <Input suffix={<Icon type="search" className="certain-category-icon"/>}/>
            </AutoComplete>
        );
    }

    handleSearch = (value) => {
        const players = nba.searchPlayers(value);
        this.setState({
            dataSource: !value ? [] :
                players.map(player => ({
                    playerId: player.playerId,
                    fullName: player.fullName,
                }))
        });
    }

    onSelect = (name) => {
        this.props.handleSelectPlayer(name);
    }
}

export default SearchBar;