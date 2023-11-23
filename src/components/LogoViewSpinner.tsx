import Logo from '@/components/LogoView';

const LogoViewSpinner = () => {
  return (
    <div className="w-max text-center">
      <p className="my-6 font-medium">Thinking...</p>
      <div className="animate-spin">
        <Logo />
      </div>
    </div>
  );
};

export default LogoViewSpinner;
