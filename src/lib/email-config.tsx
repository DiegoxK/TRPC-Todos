import type { SendVerificationRequestParams } from "next-auth/providers/email";

import { createTransport } from "nodemailer";

import { render } from "@react-email/render";
import { Verification } from "@/components/email/verification";
import { db } from "@/server/db";

export async function sendVerificationRequest(
  params: SendVerificationRequestParams,
) {
  const { identifier, url, provider } = params;
  const { host } = new URL(url);

  const transport = createTransport(provider.server);

  const user = await db.query.users.findFirst({
    where: (table, funcs) => funcs.eq(table.email, identifier),
  });

  const emailHtml = render(<Verification url={url} picture={user?.image} />);
  const emailText = render(<Verification url={url} />, {
    plainText: true,
  });

  const result = await transport.sendMail({
    to: identifier,
    from: provider.from,
    subject: `Sign in to ${host}`,
    html: emailHtml,
    text: emailText,
  });

  const failed = result.rejected.concat(result.pending).filter(Boolean);
  if (failed.length) {
    throw new Error(`Email(s) (${failed.join(", ")}) could not be sent`);
  }
}
