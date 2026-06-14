export type ProductConfig = {
  id: string;
  name: string;
  tagline: string;
  specs: string[];
  color: string;
  lightColor: string;
  rimColor: string;
  mediaUrl: string;
};

const basePath = process.env.NODE_ENV === 'production' ? '/air-link' : '';

export const productsData: ProductConfig[] = [
  {
    id: "split-ac",
    name: "Aura Split AC",
    tagline: "Whisper-quiet precision cooling for modern living spaces.",
    specs: ["24.5 SEER2 Efficiency", "Inverter-Driven Compressor", "Ultra-Quiet 19dB Operation"],
    color: "#2C82C9", // Arctic blue accent
    lightColor: "#ffffff",
    rimColor: "#3b82f6", // Soft blue rim
    mediaUrl: `${basePath}/images/split_ac.png`
  },
  {
    id: "ceiling-cassette",
    name: "Nimbus Cassette",
    tagline: "Architectural climate control. Invisible performance.",
    specs: ["360° Airflow Dynamics", "Flush-Mount Design", "Multi-Zone Capability"],
    color: "#D4AF37", // Warm gold accent
    lightColor: "#fff4e6", // Warm neutral key
    rimColor: "#fde047", // Slight warm fill
    mediaUrl: `${basePath}/images/ceiling_cassette.png`
  },
  {
    id: "air-purifier",
    name: "Purity Pro System",
    tagline: "Medical-grade air purification for absolute peace of mind.",
    specs: ["HEPA H14 Filtration", "UVC Pathogen Eradication", "VOC Sensing Array"],
    color: "#E2E8F0", // Clean white accent
    lightColor: "#ffffff", // Bright white key
    rimColor: "#e9d5ff", // Soft lavender rim
    mediaUrl: `${basePath}/images/air_purifier.png`
  },
  {
    id: "industrial-cooler",
    name: "Titan Precision",
    tagline: "Mission-critical thermal management for high-density infrastructure.",
    specs: ["150kW Cooling Capacity", "N+1 Redundant Architecture", "Liquid-to-Air Heat Exchange"],
    color: "#22c55e", // Electric green accent
    lightColor: "#14b8a6", // Cool blue-green key
    rimColor: "#059669", // Electric rim
    mediaUrl: `${basePath}/images/industrial_cooler.png`
  },
];
