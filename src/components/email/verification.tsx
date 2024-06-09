import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Text,
  Font,
} from "@react-email/components";

export function Verification({ token }: { token: string }) {
  return (
    <Html lang="en">
      <Head>
        <Font
          fallbackFontFamily="Verdana"
          fontFamily="Poppins"
          webFont={{
            url: "https://fonts.gstatic.com/s/poppins/v21/pxiEyp8kv8JHgFVrJJfecg.woff2",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
      </Head>
      <Preview>Sign in to your account</Preview>

      <Body>
        <Container style={main}>
          <Heading as="h1" style={h1}>
            To<span style={span}>do.</span>
          </Heading>

          <Heading as="h2" style={h2}>
            Join <span style={span}>The dark side</span> with my{" "}
            <span style={span}>Todo App</span>
          </Heading>
          <Text
            style={{
              ...text,
              textAlign: "center" as const,
              color: colors.accentForeground,
              fontSize: "14px",
              margin: "10px 38px 0 38px",
            }}
          >
            Hello and welcome back to the best application you&apos;ll ever
            see!?!?.
          </Text>
          <Text
            style={{
              ...text,
              textAlign: "center" as const,
              color: colors.primary,
              margin: "10px 38px",
            }}
          >
            {"Here it is"} 🪄!
          </Text>
          <Text
            style={{
              ...text,
              textAlign: "center" as const,
              fontSize: "32px",
              textTransform: "uppercase",
              margin: "10px 38px 0 38px",
            }}
          >
            <strong>{token}</strong>
          </Text>
          <Text
            style={{ ...text, textAlign: "center" as const, marginTop: "10px" }}
          >
            Use the magic code above to <span style={span}>sign in</span> to
            your account.
          </Text>
          <Hr
            style={{
              borderTop: `1px solid ${colors.primary}`,
              margin: "30px 0",
            }}
          />
          <Text style={text}>
            <strong>Need help?</strong>
          </Text>
          <Text
            style={{
              ...text,
              color: colors.accentForeground,
            }}
          >
            If you didn&apos;t request this email, please ignore it. If you
            haveany questions or need further assistance, feel free to contact
            our support team at{" "}
            <Link href="mailto:support@todos.com">
              <span style={span}>support@todos.com.</span>
            </Link>
          </Text>
          <Text
            style={{
              ...text,
              margin: "10px 34px 34px 34px",
            }}
          >
            Thank you, <span style={span}>The To-do team.</span>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const colors = {
  primary: "#916bff",
  secondary: "#f87171",
  background: "#18181c",
  foreground: "#f9fafb",
  accentForeground: "#86869f",
};

const main = {
  backgroundColor: colors.background,
  color: colors.foreground,
  borderRadius: "8px",
  maxWidth: "500px",
  border: `1px solid ${colors.primary}`,
  fontFamily: "Poppins, Verdana, sans-serif",
  fontSize: "16px",
  fontWeight: 400,
};

const h1 = {
  color: colors.foreground,
  textAlign: "center" as const,
  fontSize: "42px",
  fontWeight: 900,
  margin: "34px 24px 0px 24px",
  lineHeight: "1.2",
};

const h2 = {
  color: colors.foreground,
  textAlign: "center" as const,
  fontSize: "24px",
  fontWeight: 600,
  margin: "24px 60px",
};

const text = {
  color: colors.foreground,
  fontSize: "16px",
  fontWeight: 400,
  margin: "24px 34px",
  lineHeight: "1.5",
};

const span = {
  color: colors.primary,
};
