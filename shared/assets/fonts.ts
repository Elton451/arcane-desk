import { Spectral, Lato } from "next/font/google";

export const spectral = Spectral({
  subsets: ["latin"],
  weight: ["200", "400", "700"],
  variable: "--font-spectral",
});

export const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
});
