import styles from "./FooterBlock.module.css";

interface FooterBlockProps {
  variant: "actions" | "usefulLinks" | "company" | "other";
}

interface FooterBlockData {
  title: string;
  linkLabels: string[];
}

const footerBlockData: Record<FooterBlockProps["variant"], FooterBlockData> = {
  actions: {
    title: "Actions",
    // linkUrl array could go here... if these were real/live links
    linkLabels: [
      "Summarist Magazine",
      "Cancel Subscription",
      "Help",
      "Contact Us",
    ],
  },
  usefulLinks: {
    title: "Useful Links",
    linkLabels: [
      "Pricing",
      "Summarist Business",
      "Gift Cards",
      "Authors & Publishers",
    ],
  },
  company: {
    title: "Company",
    linkLabels: ["About", "Careers", "Partners", "Code of Conduct"],
  },
  other: {
    title: "Other",
    linkLabels: [
      "Sitemap",
      "Legal Notice",
      "Terms of Service",
      "Privacy Policies",
    ],
  },
};

export default function FooterBlock({ variant }: FooterBlockProps) {
  const data = footerBlockData[variant];

  return (
    <div>
      <h3 className={styles.title}>{data.title}</h3>
      <ul>
        {data.linkLabels.map((label, index) => (
          <li key={index}>
            <span className={styles.link}>{label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
