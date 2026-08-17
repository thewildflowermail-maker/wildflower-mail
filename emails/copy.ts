/**
 * All transactional email WORDING lives here, separate from send logic
 * (lib/resend/send.ts) and application code, so copy can be edited without
 * touching anything functional. Each entry returns { subject, heading, body }
 * — `body` is an array of paragraphs rendered inside the shared branded
 * layout in emails/render.ts.
 */

export type EmailCopyInput = Record<string, string>;

export const emailCopy = {
  welcome: (v: EmailCopyInput) => ({
    subject: "Welcome to Wildflower Mail",
    heading: `Welcome, ${v.firstName || "friend"}.`,
    body: [
      "Thank you for joining the Wildflower Club. You've made space for something that belongs entirely to you.",
      "Your first edition will be prepared with care and mailed according to our monthly schedule — we'll let you know as soon as it's on its way.",
    ],
  }),

  membershipConfirmation: (v: EmailCopyInput) => ({
    subject: "Your Wildflower Mail membership is confirmed",
    heading: "Your membership is confirmed.",
    body: [
      `Thank you, ${v.firstName || "friend"} — your monthly membership is now active.`,
      `Your mail will be sent to: ${v.addressLine1}, ${v.city}, ${v.state} ${v.zip}.`,
      "You can view your membership, update your address, or manage billing any time from your account page.",
    ],
  }),

  giftOrderConfirmationPurchaser: (v: EmailCopyInput) => ({
    subject: "Your Wildflower Mail gift is confirmed",
    heading: "Your gift has been sent on its way.",
    body: [
      `Thank you, ${v.purchaserName || "friend"} — your gift of ${v.editionCount} editions for ${v.recipientName} is confirmed.`,
      v.announcementPreference === "email-now"
        ? "We'll email the recipient a gift announcement right away, as you requested."
        : "As you requested, the physical letter will be the first surprise — no advance email will be sent to the recipient.",
      "You can review the details of this gift any time from your account page.",
    ],
  }),

  giftAnnouncementRecipient: (v: EmailCopyInput) => ({
    subject: "A gift is on its way to your mailbox",
    heading: "Something is on its way to you.",
    body: [
      `${v.senderLine || "Someone who cares about you"} has sent you Wildflower Mail — a monthly envelope of letters, reflection, and music, made for mothers.`,
      `Your first edition is expected to begin with ${v.startingMonth}.`,
      "No action is needed from you. Simply watch your mailbox.",
    ],
  }),

  paymentReceipt: (v: EmailCopyInput) => ({
    subject: "Your Wildflower Mail receipt",
    heading: "Here's your receipt.",
    body: [
      `Amount charged: ${v.amount}`,
      `For: ${v.productName}`,
      "Keep this email for your records. A full billing history is available from your account page.",
    ],
  }),

  editionInPreparation: (v: EmailCopyInput) => ({
    subject: "Your monthly letter is being prepared",
    heading: "Your next letter is being prepared.",
    body: [
      `This month's edition, "${v.editionName}", is being written, designed, and assembled with care.`,
      "We'll let you know as soon as it has been mailed.",
    ],
  }),

  editionMailed: (v: EmailCopyInput) => ({
    subject: "Your Wildflower Mail is on its way",
    heading: "Your letter has been mailed.",
    body: [
      `This month's edition, "${v.editionName}", was mailed on ${v.mailedDate}. Expected delivery is ${v.deliveryWindow} for most U.S. addresses.`,
      "We hope it finds you at a moment you can enjoy it slowly.",
    ],
  }),

  renewalReminder: (v: EmailCopyInput) => ({
    subject: "Your Wildflower Mail membership renews soon",
    heading: "A quick heads up.",
    body: [
      `Your monthly membership will renew on ${v.renewalDate}.`,
      "No action is needed to continue. If you'd like to make changes, you can do so any time from your account page.",
    ],
  }),

  paymentFailed: (v: EmailCopyInput) => ({
    subject: "We couldn't process your Wildflower Mail payment",
    heading: "There was a problem with your payment.",
    body: [
      "We were unable to process your most recent membership payment. Please update your payment method from your account page to avoid an interruption to your subscription.",
    ],
  }),

  addressUpdateConfirmation: (v: EmailCopyInput) => ({
    subject: "Your shipping address has been updated",
    heading: "Your address has been updated.",
    body: [
      `Your mail will now be sent to: ${v.addressLine1}, ${v.city}, ${v.state} ${v.zip}.`,
      "If you didn't make this change, please contact us right away.",
    ],
  }),

  cancellationConfirmation: (v: EmailCopyInput) => ({
    subject: "Your Wildflower Mail membership has been canceled",
    heading: "Your membership has been canceled.",
    body: [
      "We're sorry to see you go. Your membership will remain active through the end of your current billing period, and you will not be charged again.",
      "You're welcome back any time.",
    ],
  }),

  // Added alongside the "Pause" / "Skip Next Edition" soft-cancellation
  // options in CancelMembershipButton.tsx — distinct from
  // cancellationConfirmation so a member who only pauses or skips one
  // edition never receives copy telling them their membership was canceled.
  membershipPaused: (v: EmailCopyInput) => ({
    subject: "Your Wildflower Mail membership is paused",
    heading: "Your membership is paused.",
    body: [
      "Billing and mailings are paused starting now — you won't be charged, and no editions will be prepared for you, until you resume.",
      "Nothing else about your account has changed. You can resume any time from your account page, whenever you're ready.",
    ],
  }),

  editionSkipped: (v: EmailCopyInput) => ({
    subject: "Your next edition will be skipped",
    heading: "Got it — next edition skipped.",
    body: [
      "Your upcoming edition won't be prepared or mailed. Your membership otherwise continues as normal, and future editions will resume automatically after this one.",
      "If this was a mistake, just let us know and we'll sort it out.",
    ],
  }),

  giftEndingSoon: (v: EmailCopyInput) => ({
    subject: "This gift subscription is ending soon",
    heading: "One edition remains.",
    body: [
      `The gift subscription for ${v.recipientName} will conclude after its next edition.`,
      "If you'd like to extend the gift or start a monthly membership, you can do so any time.",
    ],
  }),

  contactConfirmation: (v: EmailCopyInput) => ({
    subject: "We received your message",
    heading: "Thank you for reaching out.",
    body: [
      `We've received your message about "${v.subject}" and will reply by email soon.`,
    ],
  }),

  internalNewOrderNotification: (v: EmailCopyInput) => ({
    subject: `New order: ${v.productName}`,
    heading: "New order received.",
    body: [
      `Type: ${v.orderType}`,
      `Customer: ${v.customerName} (${v.customerEmail})`,
      `Product: ${v.productName}`,
    ],
  }),
};

export type EmailTemplateKey = keyof typeof emailCopy;
