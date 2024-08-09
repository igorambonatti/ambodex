/* eslint-disable react/no-array-index-key */

import Image from 'next/image';

import { positions } from '@/constants/FloatingIcons';
import styles from '@/styles/floatingIcons.module.scss';

const FloatingIcons: React.FC = () => {
  const getAnimationDelay = () => `-${Math.random() * 20}s`;

  return (
    <div className={styles.iconsContainer}>
      {positions.map((position, index) => (
        <div
          key={index}
          className={styles.icon}
          style={{
            left: position.x,
            top: position.y,
            animationDelay: getAnimationDelay(),
          }}
        >
          <Image src={position.src} alt="Icon" width={90} height={90} />
        </div>
      ))}
    </div>
  );
};

export default FloatingIcons;
