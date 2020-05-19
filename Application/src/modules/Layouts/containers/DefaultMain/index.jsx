// Libraries
import React, {Component, Suspense} from 'react';
import {Redirect, Route, Switch, withRouter} from 'react-router-dom';
import {Layout, Spin} from 'antd';
import {connect} from 'react-redux';

// Services
import * as blockServices from 'Src/services/block';

// Actions
import {layout} from 'Layouts/actions';

// Assets
import routes from 'Src/routes';

const {Content} = Layout;

class DefaultMain extends Component {

    componentDidMount() {
        this.getDataBlocks();
    }

    getDataBlocks = () => {
        const getBlocks = blockServices.getList();

        if (getBlocks) {
            getBlocks.then(res => {
                if (res.data && res.data.data) {
                    const {blocks} = res.data.data;

                    this.props.layout({
                        type: 'getBlocks',
                        value: blocks ? blocks : []
                    });
                } 
            });
        }
    };

    render() {
        return (
            <>
                <Layout className='layout'>
                    <Layout>
                        <Layout style={{padding: 10}}>
                            <Content className={'right-content'}>
                                <Suspense fallback={<Spin><div style={{height: '100vh'}} /></Spin>}>
                                    <Switch>
                                        {routes.map((route, idx) => {
                                            return route.component ? (
                                                <Route key={idx} path={route.path} exact={route.exact} name={route.name} render={props => (
                                                    <route.component {...props} />
                                                )} />) : null;
                                        })}
                                        <Redirect to={'/home'} />
                                    </Switch>
                                </Suspense>
                            </Content>
                        </Layout>
                    </Layout>
                </Layout>
            </>
        );
    }
}

const mapDispatchToProps = {
    layout
};

export default withRouter(connect(null, mapDispatchToProps)(DefaultMain));