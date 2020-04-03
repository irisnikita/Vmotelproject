// Libraries
import React, {Component} from 'react';
import {connect} from 'react-redux';

// Actions
import {layout} from 'Layouts/actions';

// Services
import * as roomServices from 'Src/services/room';

let Rooms = () => {
    return (
        <div>
            Hello
        </div>
    );
};

const mapDispatchToProps = {
    layout
};

export default connect(null, mapDispatchToProps)(Rooms);