import { Html, Button } from "@react-email/components";

export function Verification({ url }: { url: string }) {
  return (
    <Html lang="en">
      <Button href={url}>Click me</Button>
    </Html>
  );
}
