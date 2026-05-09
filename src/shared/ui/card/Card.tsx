import { Component } from 'react';
import styles from './card.module.scss';
import cx from 'classnames';

interface ICardProps {
  name: string;
  description: string;
  imageUrl?: string;
  className?: string;
}

class Card extends Component<ICardProps> {
  render() {
    const { name, description, imageUrl, className } = this.props;
    const backgroundStyle = {
      backgroundImage: `url(${imageUrl ?? ''})`,
    };

    return (
      <div className={cx(styles.card, className)}>
        <p className={cx(styles.title)}>{name}</p>
        <div
          data-testid="card-image"
          className={cx(styles.image)}
          style={backgroundStyle}
        />
        <p className={cx(styles.info)}>{description}</p>
      </div>
    );
  }
}

export default Card;
