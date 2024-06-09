import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Tailwind,
  Font,
} from "@react-email/components";

export function Verification({ url }: { url: string }) {
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
        <Body className="dark mx-auto my-auto bg-background px-2 font-sans text-foreground">
          <Container className="my-10 max-w-[465px] rounded border border-primary bg-accent [&_span]:text-primary">
            <Section className="mb-2 mt-10">
              <Heading as="h1" className="text-center text-3xl font-extrabold">
                To<span className="text-primary">do.</span>
              </Heading>
            </Section>
            <Heading as="h2" className="text-center">
              Join <span>The dark side</span> with my <span>Todo App</span>
            </Heading>
            <Text className="mx-8 text-center text-accent-foreground">
              {
                "Hello and welcome back to the best application you'll ever see!?!?."
              }
            </Text>
            <Text className="text-center">{"Here it is"} 🪄!</Text>
            <Text className="text-center">
              <strong className="text-3xl uppercase">{url}</strong>
            </Text>
            <Text className="text-center">
              Use the magic code above to <span>sign in</span> to your account.
            </Text>
            <Hr className="my-7 w-full !border-primary" />
            <section className="mx-8 mb-6 text-accent-foreground">
              <Text className="text-foreground">
                <strong>Need help?</strong>
              </Text>
              <Text>
                If you didn&apos;t request this email, please ignore it. If you
                haveany questions or need further assistance, feel free to
                contact our support team at{" "}
                <Link href="mailto:support@todos.com">
                  <span>support@todos.com.</span>
                </Link>
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
