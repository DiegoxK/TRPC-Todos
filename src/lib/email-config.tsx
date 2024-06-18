import type { SendVerificationRequestParams } from "next-auth/providers/email";

import { createTransport } from "nodemailer";

import { renderAsync } from "@react-email/render";
import { Verification } from "@/components/email/verification";

export const generateVerificationToken = async () => {
  const random = crypto.getRandomValues(new Uint8Array(8));
  return Buffer.from(random).toString("hex").slice(0, 6);
};

export const sendVerificationRequest = async (
  params: SendVerificationRequestParams,
) => {
  const { identifier, provider, token } = params;

  const transport = createTransport(provider.server);

  const emailHtml = await renderAsync(<Verification token={token} />, {
    pretty: true,
  });
  const emailText = await renderAsync(<Verification token={token} />, {
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
