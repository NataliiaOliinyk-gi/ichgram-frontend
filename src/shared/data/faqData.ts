export interface IFaqData {
  question: string;
  paragraph: string;
  bulletTitle?: string;
  bullets?: string[];
  note?: string;
  linkText?: string;
  linkUrl?: string;
}

export const faqData: IFaqData[] = [
  {
    question: "Why does Ichgram have my contact information?",
    paragraph:
      "People who use Ichgram can choose to upload and sync their contacts, such as names, phone numbers, or email addresses, to help them find friends and connect with people they know.",
    bulletTitle: "Your contact information may have been shared with us if:",
    bullets: [
      "Someone who has your phone number or email address saved in their contacts joined Ichgram",
      "That person chose to upload their contacts to the app",
    ],
  },
  {
    question: "What does Ichgram do with this information?",
    paragraph: "We use this information to:",
    bulletTitle: "",
    bullets: [
      "Suggest accounts for users to follow",
      "Help users find people they know",
      "Improve the user experience on Ichgram",
    ],
    note: "We do not display your contact information publicly or sell it to advertisers.",
  },
  {
    question: "Can I remove my contact information?",
    paragraph:
      "Yes. If you'd like to request removal of your contact information from our database, please visit:",
    linkText: "Delete My Contact Info",
    linkUrl: "/delete-contact-info", // або реальне посилання
  },
  {
    question: "How can I manage contact uploads?",
    paragraph: "Users can:",
    bulletTitle: "",
    bullets: [
      "Turn off contact syncing in their app settings",
      "Delete previously uploaded contacts by visiting their account settings",
    ],
  },
  {
    question: "Still have questions?",
    paragraph:
      "Feel free to contact us at [support@yourappname.com] for further information.",
  },
];
