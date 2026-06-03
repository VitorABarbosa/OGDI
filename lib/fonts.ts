import { Cormorant_Garamond, Instrument_Sans, Newsreader } from "next/font/google";

export const serif = Cormorant_Garamond({
  subsets: ["latin"], weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"], variable: "--ff-serif", display: "swap",
});
export const sans = Instrument_Sans({
  subsets: ["latin"], weight: ["400", "500", "600"],
  variable: "--ff-sans", display: "swap",
});
export const news = Newsreader({
  subsets: ["latin"], weight: ["400", "500"],
  style: ["normal", "italic"], variable: "--ff-news", display: "swap",
});
