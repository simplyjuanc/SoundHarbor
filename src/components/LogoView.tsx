import Image from 'next/image';

export default function LogoView() {
  return (
    <Image
      src="/logo-no-background.svg"
      alt="logo"
      width={1500 / 7}
      height={935 / 7}
      className="m-5 mx-auto mt-16 pr-6"
    />
  );
}
