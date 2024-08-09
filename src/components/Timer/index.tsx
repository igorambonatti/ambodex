import './styles.scss';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';

import { useCreateSwap } from '@/hooks/useCreateSwap';
import { getTimer, type TimerResult } from '@/utils/getTimer';

import { showErrorToast } from '../Toast';

type Props = {
  timestamp: number;
  hasWinner?: boolean;
  isExpired?: boolean;
};

const TimerComponent: React.FC<Props> = ({
  timestamp,
  hasWinner,
  isExpired,
}) => {
  const { setSwapStatus } = useCreateSwap();
  const [timer, setTimer] = useState<TimerResult>({
    minutes: '05',
    seconds: '00',
    icon: 'timer',
    text: 'Transaction is pending',
    pending: true,
  });

  useEffect(() => {
    if (hasWinner) {
      const statusUpdate = hasWinner
        ? 'Transaction completed'
        : 'Transaction Failed';
      const icon = hasWinner ? 'success' : 'timer';
      const newTitle = hasWinner ? 'Swapped!' : '';
      setTimer({
        minutes: '00',
        seconds: '00',
        expired: isExpired,
        icon,
        text: statusUpdate,
        title: newTitle,
      });

      return;
    }
    const interval = setInterval(() => {
      const newTimer = getTimer(timestamp);
      if (newTimer.seconds === 'NaN') {
        clearInterval(interval);
        setTimer({
          minutes: '00',
          seconds: '00',
          icon: 'timer',
          text: 'Transaction Failed',
          expired: true,
        });
        return setSwapStatus({ status: 'Expired' });
      }
      if (newTimer.minutes === '00' && newTimer.seconds === '00') {
        clearInterval(interval);
        setTimer({
          minutes: '00',
          seconds: '00',
          icon: 'timer',
          text: 'Transaction Failed',
          expired: true,
        });
        showErrorToast(
          'Transaction failed',
          'Your swap request has expired. Please return to the swap page to create a new transaction.',
        );
        return setSwapStatus({ status: 'Expired' });
      }
      setTimer(newTimer);
    }, 1000);

    return () => clearInterval(interval);
  }, [timestamp, hasWinner, isExpired, setSwapStatus]);

  const getTimerColorClass = () => {
    if (hasWinner) {
      return 'timer-success';
    }
    if (timer.expired) {
      return 'timer-danger';
    }
    if (!timer.expired) {
      return 'timer-warning';
    }
  };

  const outerClass = `timer-outer ${getTimerColorClass()}`;
  const middleClass = `timer-middle ${getTimerColorClass()}`;
  const innerClass = `timer-inner ${getTimerColorClass()}`;

  return (
    <div className="flex flex-col items-center">
      <div className={outerClass}>
        <div className={middleClass}>
          <div className={innerClass}>
            <Image
              src={`/assets/icons/${timer.icon}.svg`}
              alt="Timer Icon"
              width={32}
              height={32}
            />
          </div>
        </div>
      </div>
      {timer.title && (
        <h1 className="mt-4 text-3xl text-white">{timer.title}</h1>
      )}
      {!hasWinner && (
        <div className="text-3xl text-white">
          {timer.minutes}:{timer.seconds}
        </div>
      )}
      <span className="text-[#999]">{timer.text}</span>
    </div>
  );
};

export default TimerComponent;
