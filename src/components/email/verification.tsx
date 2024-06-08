import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Text,
  Tailwind,
  Font,
} from "@react-email/components";

export function Verification({
  url,
  picture,
}: {
  url: string;
  picture?: string | null;
}) {
  return (
    <Html lang="en">
      <Head>
        <Font
          fontFamily="Poppins"
          fallbackFontFamily="Verdana"
          webFont={{
            url: "https://fonts.gstatic.com/s/poppins/v21/pxiEyp8kv8JHgFVrJJfecg.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>Sign in to your account</Preview>
      <Tailwind>
        <Body className="bg-background text-foreground dark mx-auto my-auto px-2 font-sans">
          <Container className="bg-accent border-primary [&_span]:text-primary my-10 max-w-[465px] rounded border">
            <Section className="mb-2 mt-10">
              <Heading as="h1" className="text-center text-3xl font-extrabold">
                To<span className="text-primary">do.</span>
              </Heading>
            </Section>
            <Heading as="h2" className="text-center">
              Join <span>The dark side</span> with my <span>Todo App</span>
            </Heading>
            <Text className="text-accent-foreground mx-8 text-center">
              {
                "Hello and welcome back to the best application you'll ever see!?!?."
              }
            </Text>
            <Text className="text-center">
              {"Here it is ->"} 🪄
              <Link href={url}>
                <strong>
                  <span> Your magic link</span>
                </strong>
              </Link>
            </Text>
            {picture && (
              <Section className="text-center">
                <Img
                  className="mx-auto rounded-full"
                  src={picture}
                  width="64"
                  height="64"
                />
              </Section>
            )}

            <Text className="text-center">
              Use the magic link above to <span>sign in</span> to your account.
            </Text>
            <Hr className="!border-primary my-7 w-full" />
            <section className="text-accent-foreground mx-8 mb-6">
              <Text className="text-foreground">Need help?</Text>
              <Text>
                If you didn&apos;t request this email, please ignore it. If you
                haveany questions or need further assistance, feel free to
                contact our support team at <span>support@todos.com.</span>
              </Text>
              <Text className="!my-0">
                Thank you, <span>The To-do team.</span>
              </Text>
            </section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
