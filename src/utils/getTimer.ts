export type TimerResult = {
  minutes: string | null;
  seconds: string | null;
  icon: string;
  text: string;
  title?: string;
  expired?: boolean;
  pending?: boolean;
};

export const getTimer = (timestamp: number): TimerResult => {
  const currentTime = Date.now();
  const timePassed = currentTime - timestamp;
  const timeLeft = 300000 - timePassed;

  if (timeLeft <= 0) {
    return {
      minutes: '00',
      seconds: '00',
      icon: 'timer',
      text: 'Transaction Failed',
      title: 'Expired',
    };
  }

  const minutes = Math.floor(timeLeft / 60000)
    .toString()
    .padStart(2, '0');
  const seconds = Math.floor((timeLeft % 60000) / 1000)
    .toString()
    .padStart(2, '0');

  return {
    minutes,
    seconds,
    icon: 'timer',
    text: 'Transaction is pending',
  };
};
