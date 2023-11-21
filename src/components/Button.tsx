'use client';

import classNames from 'classnames';
import Link from 'next/link';

type Props = {
  text: string;
  secondary?: Boolean;
  warning?: Boolean;
  error?: Boolean;
  onClick?: Function;
  link?: Boolean;
  href?: string;
  blank?: Boolean;
};

const Button = ({
  text,
  secondary,
  warning,
  error,
  onClick,
  link,
  href,
  blank,
}: Props) => {
  const btnClassnames = classNames('btn', {
    'btn-secondary': secondary,
    'btn-warning': warning,
    'btn-error': error,
  });

  if (link && href) {
    return (
      <Link href={href} target={blank ? '_blank' : ''}>
        <button className={btnClassnames}>{text}</button>
      </Link>
    );
  }

  const handleClick = () => {
    if (!onClick) {
      return null;
    }

    onClick();
    return;
  };

  return (
    <button onClick={handleClick} className={btnClassnames}>
      {text}
    </button>
  );
};
export default Button;
