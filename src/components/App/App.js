import React from 'react';
import MetaTags from 'react-meta-tags';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';

import About from '../About/About';
import styles from './App.module.css';

const App = () =>
    (<div className={styles.wrap}>
        <MetaTags>
            <title>Viktoriya Zubtsova</title>
            <meta property="og:title" content="Junior Frontend-developer Viktoiya Zubtsova"/>
            <meta property="og:image" content="title.png"/>
            <meta property="og:image:width" content="450"/>
            <meta property="og:image:height" content="323"/>
        </MetaTags>
        <Card className={styles.content}>
          <About />
        </Card>
      </div>);

export default App;
