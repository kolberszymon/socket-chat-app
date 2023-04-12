import React from 'react';
import withPrivateRoute from '../components/withPrivateRoute';

const NewGame = () => {
    return (
            <div>
                new-game
            </div>
    );
};

export default withPrivateRoute(NewGame);