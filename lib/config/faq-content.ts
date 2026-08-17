/**
 * FAQ copy — edit freely. Answers intentionally avoid promising policies
 * that haven't been finalized (exact carrier, international shipping, returns).
 * Review alongside legal pages before launch.
 */
import type { AccordionItem } from "@/components/ui/Accordion";
import { operations } from "./site-config";

export const fullFaq: AccordionItem[] = [
  {
    question: "What is Wildflower Mail?",
    answer:
      "Wildflower Mail is a monthly physical-mail subscription created for mothers. Each month, subscribers receive a thoughtfully designed envelope that may include a letter, a reflection prompt, an illustrated card, an affirmation, a curated playlist, and a small seasonal ritual.",
  },
  {
    question: "Is this intended for mothers only?",
    answer:
      "Wildflower Mail is created with mothers in mind — of babies, young children, or grown children, whether working, at home, or somewhere in between. Anyone who connects with the experience is welcome to subscribe, and it also makes a meaningful gift for a mother in your life.",
  },
  {
    question: "What is included each month?",
    answer:
      "Each edition is built around a new theme and may include a letter, a journaling or reflection prompt, a keepsake art card, an affirmation, a curated playlist accessed by QR code, and a small seasonal ritual or paper surprise. Exact contents vary by month.",
  },
  {
    question: "Will every edition be different?",
    answer:
      "Yes. Each month has its own theme, letter, and contents, so no two editions are identical. Some elements — like a letter and a playlist — are consistent, while the format around them evolves.",
  },
  {
    question: "When will my first letter arrive?",
    answer: `Orders placed before the monthly cutoff (${operations.orderCutoffDay}) are included in that month's mailing, sent ${operations.mailingDay}. Expected domestic delivery is ${operations.domesticDeliveryWindow} after mailing. Orders placed after the cutoff begin with the following month's edition.`,
  },
  {
    question: "What is the monthly order cutoff?",
    answer: `The current cutoff is ${operations.orderCutoffDay}. This date is reviewed periodically — the most current cutoff is always shown at checkout and on the How It Works page.`,
  },
  {
    question: "Is shipping included?",
    answer:
      "Shipping within the United States is included in the price shown at checkout. International shipping is not currently available — see \"Do you ship internationally?\" below.",
  },
  {
    question: "Can I send it as a gift?",
    answer:
      "Yes. Gift options include a three-month or six-month one-time gift, with a personal message and a choice of starting month. Visit the Gift page to begin.",
  },
  {
    question: "Will the recipient know who sent it?",
    answer:
      "That's your choice. When sending a gift, you can choose to reveal your name to the recipient or remain anonymous.",
  },
  {
    question: "Does a gift subscription renew automatically?",
    answer:
      "No. Three-month and six-month gifts are one-time payments that do not renew automatically. After the gift concludes, the recipient is welcome to continue with a monthly membership of their own.",
  },
  {
    question: "Can I change the recipient's address?",
    answer: `Address changes can be made up until ${operations.addressChangeDeadline}. Please contact us as soon as possible if an address needs to change — we cannot guarantee changes requested after this point.`,
  },
  {
    question: "Can I pause or cancel a monthly membership?",
    answer: `You may cancel your monthly membership at any time from your account page. To avoid being billed for the next edition, cancel ${operations.cancellationDeadline}. A pause option may be added in the future.`,
  },
  {
    question: "What happens if my envelope is lost or damaged?",
    answer:
      "Please contact us if your mail hasn't arrived within the expected delivery window or arrives damaged, and we will do our best to make it right. Our full policy is being finalized and will be posted on the Shipping, Cancellation, and Refund Policy page.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Not yet. Wildflower Mail currently ships to addresses within the United States only. We hope to expand shipping in the future.",
  },
  {
    question: "Can I buy a past edition?",
    answer:
      "Select past editions may be available individually while supplies last. Visit the Past Editions page to see current availability.",
  },
  {
    question: "Can I return a letter?",
    answer:
      "Because each edition is personalized and consumable by nature (letters, prompts, and paper goods), returns are handled on a case-by-case basis. See the Shipping, Cancellation, and Refund Policy page for current details.",
  },
  {
    question: "How do I contact customer support?",
    answer:
      "You can reach us any time through the Contact page, or by emailing hello@wildflowermail.com.",
  },
];

export const homeFaqPreview: AccordionItem[] = fullFaq.slice(0, 5);
