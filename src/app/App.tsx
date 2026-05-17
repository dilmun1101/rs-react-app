import { Component } from 'react';
import { router } from '../router/router';
import { RouterProvider } from 'react-router';
import ErrorTest from '../shared/ui/error-test/ErrorTest';
import styles from './app.module.scss';

class App extends Component {
  render() {
    return (
      <>
        <ErrorTest className={styles.errorButton} />
        <RouterProvider router={router} />
      </>
    );
  }
}

export default App;
