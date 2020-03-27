// Libraries
import React, {Component} from 'react';

// Components
import DefaultMain from 'Src/modules/Layouts/containers/DefaultMain';
import DefaultHeader from 'Src/modules/Layouts/containers/DefaultHeader';
import Introduce from 'Src/modules/Introduce';

class Layouts extends Component {
    state = {
        isLogin: false
    }

    render() {
        const {isLogin} = this.state;

        return (
            <div>
                <DefaultHeader />
                {
                    isLogin  ? <DefaultMain /> : <Introduce />
                }
            </div>
        );
    }
}

export default Layouts;