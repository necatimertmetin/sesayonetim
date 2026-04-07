import { Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { BackgroundLight } from "../../components/animated-components/div/BackgroundLight";
import { Hero } from "./components/Hero";
import { LogoBar } from "./components/LogoBar";
import { WhyUs } from "./components/WhyUs";
import { Stats } from "./components/Stats";
import { Services } from "./components/Services";
import { AboutPreview } from "./components/AboutPreview";
import { Testimonial } from "./components/Testimonial";
import { CtaSection } from "./components/CtaSection";

export const Landing = () => {
  const theme = useTheme();

  return (
    <Box sx={{ overflow: "hidden" }}>
      <BackgroundLight intensity={0.7} />
      <BackgroundLight
        color={theme.palette.secondary.main}
        intensity={0.1}
        bottom={0}
        left={0}
      />

      <Hero />
      <LogoBar />
      <WhyUs />
      <Stats />
      <Services />
      <AboutPreview />
      <Testimonial />
      <CtaSection />
    </Box>
  );
};
