import Button from '@/components/Button';

export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Button primary text="Return Home" link href="/" />
    </div>
  );
}
