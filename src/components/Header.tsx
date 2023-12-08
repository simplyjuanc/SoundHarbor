import Image from 'next/image';
import CustomLink from '@/components/CustomLink';

type Props = {
  img: {
    width: number;
    height: number;
    alt: string;
    src: string;
  };
  type: 'dashboard' | 'collection' | 'record';
  backTo?: string;
};

const Header = ({ img, type, backTo }: Props) => {
  const { width, height, alt, src } = img;

  const href = {
    dashboard: '/dashboard',
    collection: '/collection',
    record: `/${backTo}`,
  };

  const text = `Back to ${type}`;

  return (
    <div className="header">
      <Image
        width={width}
        height={height}
        alt={alt}
        src={src}
        className="w-full h-64 object-cover"
      />
      <CustomLink secondary text={text} href={href[type]} />
    </div>
  );
};
export default Header;
