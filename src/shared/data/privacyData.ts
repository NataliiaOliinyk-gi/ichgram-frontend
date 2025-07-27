import type { ILegalPageData } from "../../modules/LegalPage/LegalPage";

export const privacyData: ILegalPageData = {
  title: "Privacy Policy",
  date: "Effective Date: July 21, 2025",
  sections: [
    {
      heading: "Information We Collect",
      content:
        "Information you provide (e.g., name, email, username), content you upload, usage data.",
    },
    {
      heading: "How We Use Your Information",
      content:
        "To provide and improve our services, personalize your experience, and communicate with you.",
    },
    {
      heading: "Sharing of Information",
      content:
        "We do not sell your personal data. We may share information with service providers or law enforcement if required by law.",
    },
    {
      heading: "Data Retention",
      content:
        "We retain your information as long as your account is active or as needed to comply with legal obligations.",
    },
    {
      heading: "Your Rights",
      content:
        "You may access, update, or delete your personal data by contacting us.",
    },
    {
      heading: "Children's Privacy",
      content: "Our service is not intended for children under 13.",
    },
    {
      heading: "Changes to This Policy",
      content:
        "We may update this policy. You will be notified of any significant changes.",
    },
    {
      heading: "Contact",
      content: "Contact us: privacy@yourappname.com",
    },
  ],
};
