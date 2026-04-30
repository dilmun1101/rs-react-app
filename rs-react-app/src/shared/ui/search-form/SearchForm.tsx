import { Component } from 'react';
import Input from '../input/Input';
import Button from '../button/Button';

interface IFormProps extends React.FormHTMLAttributes<HTMLFormElement> {}

class SearchForm extends Component<IFormProps> {
  render() {
    return (
      <form>
        <div>
          <Input label="search" id="search" type="search" />
          <Button type="submit">Search</Button>
        </div>
      </form>
    );
  }
}

export default SearchForm;
