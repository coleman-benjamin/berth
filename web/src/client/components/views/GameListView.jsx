import React from "react";
import { Link } from 'react-router-dom';

const GameListItems = ({games}) => (
    games.map(game => <li key={game.id}><Link to={`/lines/${game.id}`}>{game.title}</Link></li>)
);

class GameListView extends React.Component {
    render() {
        return (
            <ul>
                <GameListItems games={this.props.games} />
            </ul>
        );
    }
}

export default GameListView;