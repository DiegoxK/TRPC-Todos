import { Html, Button } from "@react-email/components";

export function Verification({ url, host }: { url: string; host: string }) {
  // Prevents host to be interpreted as an hyperlink by email clients
  const escapedHost = host.replace(/\./g, "&#8203;.");

  return (
    <Html lang="en">
      <Button href={url}>Click me</Button>
    </Html>
  );
}
