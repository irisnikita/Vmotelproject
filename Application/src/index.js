// Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as Sentry from '@sentry/browser';

Sentry.init({dsn: 'https://b16b89f93ebe4df7a22d99572f48794a@o352898.ingest.sentry.io/5257623'});

// Assets
import 'antd/dist/antd.css';
import 'Src/assets/style/styles.less';
import 'Src/assets/style/icon.less';

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
