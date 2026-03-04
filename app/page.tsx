import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { CaptureSection } from "@/components/capture-section"
import { OrganizeSection } from "@/components/organize-section"
import { BeyondPaperSection } from "@/components/beyond-paper-section"
import { ProductCloseup } from "@/components/product-closeup"
import { StepsSection } from "@/components/steps-section"
import { SocialProofSection } from "@/components/social-proof-section"
import { MissionSection } from "@/components/mission-section"
import { AsSeenOn } from "@/components/as-seen-on"
import { SiteFooter } from "@/components/site-footer"

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* 1. Hero */}
        <HeroSection />

        {/* 2. Capture */}
        <CaptureSection />

        {/* 3. Organize */}
        <OrganizeSection />

        {/* 4. Beyond paper */}
        <BeyondPaperSection />

        {/* 5. Product closeup */}
        <ProductCloseup />

        {/* 6. How Mark Works */}
        <div id="how-it-works">
          <StepsSection />
        </div>

        {/* 7. Social Proof */}
        <SocialProofSection />

        {/* 8. Our Mission */}
        <MissionSection />

        {/* 8. As seen on */}
        <AsSeenOn />
      </main>

      {/* Footer */}
      <SiteFooter />
    </>
  )
}
