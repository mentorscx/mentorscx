"use server";

import axios, { AxiosRequestConfig } from "axios";
import { env } from "@/env";

type PARAMS = {
  mentee_name: string;
  mentor_name: string;
  session_duration: string;
  session_price: string;
  session_objective: string;
  session_outcome: string;
  session_meeting_preference: string | null;
  session_meeting_link: string | null;
  session_date: string;
  session_time: string;
  session_timezone: string | null;
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

export async function addContactToBrevo({
  email,
  firstName,
  lastName,
  role,
}: {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}) {
  const options: AxiosRequestConfig = {
    method: "POST",
    url: "https://api.brevo.com/v3/contacts",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "api-key": env.BREVO_API_KEY,
    },
    data: {
      email,
      attributes: {
        FIRSTNAME: firstName,
        LASTNAME: lastName,
        ROLE_INTEREST: role,
      },
    },
  };

  const retryCount = 3;
  let attempts = 0;

  while (attempts < retryCount) {
    try {
      const response = await axios.request(options);

      return response.data;
    } catch (error) {
      attempts++;
      console.error(`Attempt ${attempts} failed:`, error);
      if (attempts >= retryCount) {
        throw new Error(
          `Failed to add contact to Brevo after ${retryCount} attempts`
        );
      }
    }
  }
}
