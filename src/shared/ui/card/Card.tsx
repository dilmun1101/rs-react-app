import { Component } from 'react';

interface ICardProps {
  name: string;
  description: string;
  imageUrl?: string;
}

class Card extends Component<ICardProps> {
  render() {
    const { name, description, imageUrl } = this.props;

    return (
      <div className="card">
        {imageUrl && <img src={imageUrl} alt={name} />}
        <h3>{name}</h3>
        <p>{description}</p>
      </div>
    );
  }
}

export default Card;
