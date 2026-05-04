import { Component } from 'react';
import styles from './card.module.scss';
import cx from 'classnames';
import noImage from '../../../assets/images/no-image.svg';

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
      backgroundImage: imageUrl ? `url(${imageUrl})` : `url(${noImage})`,
    };

    return (
      <div className={cx(styles.card, className)}>
        <p className={cx(styles.title, className)}>{name}</p>
        <div
          className={cx(styles.image, className)}
          style={backgroundStyle}
        ></div>
        <p className={cx(styles.info, className)}>{description}</p>
      </div>
    );
  }
}

export default Card;
