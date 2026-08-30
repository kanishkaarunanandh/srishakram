const BASE = "/assets/";

const heritageSteps = [
  {
    title: "Mulberry Silk Selection",
    description:
    "Fine silk threads are selected for a smooth, lustrous drape.",
    image: BASE + "10.jpg"
  },
  {
    title: "Zari Preparation",
    description:
      "Gold-toned zari is readied for borders, motifs, and pallu work.",
    image: BASE + "zari.webp"
  },
  {
    title: "Handloom Weaving",
    description:
    "Artisans weave the saree with traditional Kanchipuram structure.",
    image: BASE + "saree.jpg"
  },
  {
    title: "Finishing",
    description:
      "The saree is inspected, folded, and prepared for presentation.",
    image: BASE + "11.jpg"
  }
];

const customerReview = [
  {
    customerName: "Demo Customer",
    content:
      "Beautiful silk texture, rich zari, and perfect festive finish.",
    image: BASE + "img1.jpg",
    video: ""
  }
];

export const demoJournal = [
  {
    id: "demo-journal-1",
    productName: "Royal Maroon Kanchipuram Silk Saree",
    heroImage: BASE + "11.jpg",
    zariCertificateImage: BASE + "zari.webp",
    heritageSteps,
    isDemo: true,
    customerReview
  },

  {
    id: "demo-journal-2",
    productName: "Peacock Blue Korvai Silk Saree",
    heroImage: BASE + "saree.jpg",
    zariCertificateImage: BASE + "zari.webp",
    heritageSteps,
    isDemo: true,
    customerReview
  },

  {
    id: "demo-journal-3",
    productName: "Golden Butta Bridal Silk Saree",
    heroImage: BASE + "10.jpg",
    zariCertificateImage: BASE + "zari.webp",
    heritageSteps,
    isDemo: true,
    customerReview
  },
  
];