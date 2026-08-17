import { z } from "zod";

const zip = z.string().regex(/^\d{5}(-\d{4})?$/, "Please enter a valid ZIP code.");
const email = z.string().email("Please enter a valid email address.");

export const subscriptionCheckoutSchema = z.object({
  plan: z.literal("monthly-membership"),
  fullName: z.string().min(1, "Please enter your full name."),
  email,
  addressLine1: z.string().min(1, "Please enter a street address."),
  addressLine2: z.string().optional().default(""),
  city: z.string().min(1, "Please enter a city."),
  state: z.string().min(1, "Please select a state."),
  zip,
  newsletterConsent: z.boolean().default(false),
  termsConsent: z.literal(true, {
    errorMap: () => ({ message: "Please agree to the Terms & Conditions." }),
  }),
});

export const giftCheckoutSchema = z.object({
  duration: z.enum(["gift-three-month", "gift-six-month"]),
  recipientName: z.string().min(1, "Please enter the recipient's full name."),
  addressLine1: z.string().min(1, "Please enter a street address."),
  addressLine2: z.string().optional().default(""),
  city: z.string().min(1, "Please enter a city."),
  state: z.string().min(1, "Please select a state."),
  zip,
  purchaserName: z.string().min(1, "Please enter your full name."),
  purchaserEmail: email,
  giftMessage: z.string().max(500, "Gift messages must be 500 characters or fewer.").optional().default(""),
  startingMonth: z.string().min(1, "Please select a starting month."),
  revealSender: z.enum(["reveal", "anonymous"]),
  announcementPreference: z.enum(["email-now", "letter-first"]),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Please confirm the recipient's shipping details." }),
  }),
});

export const contactSchema = z.object({
  name: z.string().min(1, "Please enter your name."),
  email,
  orderNumber: z.string().optional().default(""),
  topic: z.string().min(1, "Please choose a topic."),
  subject: z.string().min(1, "Please add a subject."),
  message: z.string().min(1, "Please add a message."),
});

export const newsletterSchema = z.object({
  firstName: z.string().min(1, "Please share your first name."),
  email,
});
