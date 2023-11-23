'use client';
import { useAuthStore } from '@/lib/authStore';
import Button from '@/components/Button';

export default function Login() {
  const { setIsLoggedIn } = useAuthStore();

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  return (
    <form className="w-full" onSubmit={handleSubmit}>
      <div className="flex flex-col gap-6 mt-12 justify-evenly  ">
        <input
          type="email"
          name="email"
          id="email"
          placeholder="rick.astley@soundharbor.music"
          required
          className="rounded p-2"
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Never gonna..."
          required
          className="rounded p-2"
        />
      </div>
      <div className="flex flex-col gap-4 mt-12 w-full items-center justify-center ">
        <Button primary text="Log In" type="submit" btnClasses="w-10/12 h-6" />
        <Button primary text="Sign Up" type="submit" btnClasses="w-10/12 h-8" />
      </div>
    </form>
  );
}
