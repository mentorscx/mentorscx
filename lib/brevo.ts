"use server";

import axios, { AxiosRequestConfig } from "axios";
import { env } from "@/env";

type PARAMS = {
  menteename: string;
  duration: string;
};

export async function sendEmailViaBrevoTemplate({
  email,
  name,
  templateId,
  params,
}: {
  templateId: number;
  email: string;
  name: string;
  params?: PARAMS;
}) {
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
      params: params,
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
