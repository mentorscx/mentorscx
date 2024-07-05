"use server";

import axios, { AxiosRequestConfig } from "axios";
import { env } from "@/env";

export async function sendEmailViaBrevoTemplate(params: {
  templateId: number;
  email: string;
  name: string;
}) {
  const { email, name, templateId } = params;
  const options: AxiosRequestConfig = {
    method: "POST",
    url: "https://api.brevo.com/v3/smtp/email",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "api-key": env.BREVO_API_KEY,
    },
    data: {
      to: [{ email, name }],
      templateId,
    },
  };

  const retryCount = 3;
  let attempts = 0;

  while (attempts < retryCount) {
    try {
      const response = await axios.request(options);
      console.log("Email sent successfully:", response.data);
      return response.data;
    } catch (error) {
      attempts++;
      console.error(`Attempt ${attempts} failed:`, error);
      if (attempts >= retryCount) {
        throw new Error(`Failed to send email after ${retryCount} attempts`);
      }
    }
  }
}
