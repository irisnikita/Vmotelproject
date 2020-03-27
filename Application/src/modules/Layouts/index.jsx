// Libraries
import React, {Component} from 'react';
import {connect} from 'react-redux';
import _ from 'lodash';
import axios from 'axios';

// Utils
import {appConfig} from 'Src/constant.js';

// Actions
import {layout} from 'Layouts/actions';

// Components
import DefaultMain from 'Src/modules/Layouts/containers/DefaultMain';
import DefaultHeader from 'Src/modules/Layouts/containers/DefaultHeader';
import Introduce from 'Src/modules/Introduce';

class Layouts extends Component {
    isMounted = false

    state = {
        isLogin: false
    }

    componentDidMount() {
        this.isMounted = true;
        this.validateUser();
    }

    validateUser = async () => {
        let userInfo = JSON.parse(localStorage.getItem('userInfo'));

        if (userInfo) {
            const {token = '', user = {}} = userInfo;

            let validate = await axios({
                method: 'POST',
                url: `${appConfig.API}/user/validate?token=${token}`
            });

            if (validate) {
                if (validate.data && validate.data.data) {
                    if (this.isMounted) {
                        this.props.layout({
                            type: 'validate',
                            value: user
                        });
                    }
                    
                }
            }
            
        }
    } 

    componentWillUnmount() {
        this.isMounted = false;
    }

    render() {
        const {userLogin} = this.props;

        return (
            <div>
                <DefaultHeader />
                {
                    !_.isEmpty(userLogin) ? <DefaultMain /> : <Introduce />
                }
            </div>
        );
    }
}

function mapStateToProps (state) {
    return {
        userLogin: state.Layouts.layoutReducer.userLogin
    };
}

const mapDispatchToProps = {
    layout
};

export default connect(mapStateToProps, mapDispatchToProps)(Layouts);