import { Component } from 'react';
import { router } from '../router/router';
import { RouterProvider } from 'react-router';

class App extends Component {
  render() {
    return <RouterProvider router={router} />;
  }
}

export default App;
