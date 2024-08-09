import Image from 'next/image';

import backgroundImage from '../../../public/assets/background.svg';

const BackgroundImage: React.FC = () => {
  return (
    <div className="fixed left-0 top-0 z-[-5] size-full">
      <Image
        alt="background"
        src={backgroundImage}
        fill
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
        }}
        priority
      />
    </div>
  );
};

export default BackgroundImage;
