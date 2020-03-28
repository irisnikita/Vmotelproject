// Libraries
import React, {Component} from 'react';
import {connect} from 'react-redux';

// Actions
import {layout} from 'Layouts/actions';

// Services
import * as roomServices from 'Src/services/room';

class Rooms extends Component {

    componentDidMount() {
        try {
            this.props.layout({
                type: 'path',
                value: 'rooms'
            });

            // Get data rooms
            this.getDataRooms();

        } catch (error) {
            //
        }
    }

    getDataRooms = () => {
        try {
            // let getRooms = roomServices.getList({
            //     id: 'hello'
            // });

            // if (getRooms) {
            //     getRooms.then(res => {
            //         if (res.data) {
            //             console.log(res);
            //         }
            //     });
            // }

        } catch (error) {
            //
        }
    }

    render() {
        return (
            <div>
                This is Rooms
            </div>
        );
    }
}

const mapDispatchToProps = {
    layout
};

export default connect(null, mapDispatchToProps)(Rooms);