import { Component } from 'react';
import Button from '../button/Button';
import styles from './error-test.module.scss';

interface State {
  shouldThrowError: boolean;
}

class ErrorTest extends Component<unknown, State> {
  constructor(props: unknown) {
    super(props);
    this.state = { shouldThrowError: false };
  }

  handleClick = () => {
    this.setState({ shouldThrowError: true });
  };

  render() {
    if (this.state.shouldThrowError) {
      throw new Error('Test error');
    }

    return (
      <Button className={styles.button} onClick={this.handleClick}>
        Test Error
      </Button>
    );
  }
}

export default ErrorTest;
