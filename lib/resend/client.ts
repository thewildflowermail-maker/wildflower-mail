import { Resend } from "resend";

/** SERVER-ONLY Resend client — never import into a Client Component. */
export const resend = new Resend(process.env.RESEND_API_KEY || "re_placeholder");

export const FROM_ADDRESS = process.env.RESEND_FROM_ADDRESS || "Wildflower Mail <hello@wildflowermail.com>";
