'use client';
import classNames from 'classnames';
import Link from 'next/link';

type Props = {
  text: string;
  primary?: Boolean;
  secondary?: Boolean;
  warning?: Boolean;
  error?: Boolean;
  info?: Boolean;
  small?: Boolean;
  type?: 'button' | 'submit';
  onClick?: Function;
  btnClasses?: string;
  link?: Boolean;
  href?: string;
  blank?: Boolean;
  name?: string;
};

const Button = ({
  text,
  primary,
  secondary,
  warning,
  error,
  info,
  small,
  type = 'button',
  onClick,
  btnClasses,
  link,
  href,
  blank,
  name,
}: Props) => {
  const btnClassnames = classNames('btn', btnClasses, {
    'btn-primary': primary,
    'btn-secondary': secondary,
    'btn-warning': warning,
    'btn-error': error,
    'btn-info': info,
    'btn-sm': small,
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
    <button type={type} onClick={handleClick} className={btnClassnames} name={name}>
      {text}
    </button>
  );
};
export default Button;
