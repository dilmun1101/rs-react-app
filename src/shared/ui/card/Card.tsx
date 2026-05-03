import { Component } from 'react';
import styles from './card.module.scss';
import classNames from 'classnames';

interface ICardProps {
  name: string;
  description: string;
  imageUrl?: string;
}

class Card extends Component<ICardProps> {
  render() {
    const { name, description, imageUrl } = this.props;

    return (
      <div className={classNames(styles.card, classNames)}>
        <p className={classNames(styles.title, classNames)}>{name}</p>
        <div
          className={classNames(styles.image, classNames)}
          style={{ backgroundImage: imageUrl ? `url(${imageUrl})` : undefined }}
        ></div>
        <p className={classNames(styles.info, classNames)}>{description}</p>
      </div>
    );
  }
}

export default Card;
