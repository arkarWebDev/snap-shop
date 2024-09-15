"use server";
import { getBaseUrl } from "@/lib/get-baseUrl";
import { Resend } from "resend";
import EmailComfirimationTemplate from "@/components/email-template";

const currentBaseUrl = getBaseUrl();
const resend = new Resend(process.env.RESEND_API_KEY);
export const sendEmail = async (
  email: string,
  token: string,
  userFirstname: string
) => {
  const comfirmLink = `${currentBaseUrl}/confirm-email?token=${token}`;

  const { data, error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm Your Account - Welcome to SnapShop",
    react: EmailComfirimationTemplate({
      userFirstname,
      comfirmEmailLink: comfirmLink,
    }),
  });

  if (error) {
    console.log(error);
  }
};
