import type { SendVerificationRequestParams } from "next-auth/providers/email";

import { createTransport } from "nodemailer";

import { render } from "@react-email/render";
import { Verification } from "@/components/email/verification";

export const sendVerificationRequest = async (
  params: SendVerificationRequestParams,
) => {
  const { identifier, url, provider, token } = params;

  const transport = createTransport(provider.server);

  const emailHtml = render(<Verification url={token} />);
  const emailText = render(<Verification url={token} />, {
    plainText: true,
  });

  const result = await transport.sendMail({
    to: identifier,
    from: provider.from,
    subject: "Sign in to todos!",
    html: emailHtml,
    text: emailText,
  });

  const failed = result.rejected.concat(result.pending).filter(Boolean);
  if (failed.length) {
    throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`);
  }
};

export const generateVerificationToken = async () => {
  const random = crypto.getRandomValues(new Uint8Array(8));
  return Buffer.from(random).toString("hex").slice(0, 6);
};
