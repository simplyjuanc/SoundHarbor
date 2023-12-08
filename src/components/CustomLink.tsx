import classNames from 'classnames';
import Link from 'next/link';

type Props = {
  text: string;
  href: string;
  secondary?: Boolean;
};

const CustomLink = ({ text, href, secondary }: Props) => {
  const linkClassnames = classNames('link font-thin text-sm ml-4 mt-8', {
    'link-secondary': secondary,
  });

  return (
    <Link href={href} className={linkClassnames}>
      {text}
    </Link>
  );
};
export default CustomLink;
