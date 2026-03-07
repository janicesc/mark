import { Navbar } from "@/components/navbar"
import { HeroSection } from "@/components/hero-section"
import { WaitlistBanner } from "@/components/waitlist-banner"
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

        {/* 2. As seen on */}
        <AsSeenOn />

        {/* 3. Waitlist Banner */}
        <WaitlistBanner />

        {/* 4. Capture */}
        <CaptureSection />

        {/* 5. Organize */}
        <OrganizeSection />

        {/* 6. Beyond paper */}
        <BeyondPaperSection />

        {/* 7. Product closeup */}
        <ProductCloseup />

        {/* 8. How Mark Works */}
        <div id="how-it-works">
          <StepsSection />
        </div>

        {/* 9. Social Proof */}
        <SocialProofSection />

        {/* 10. Mission */}
        <MissionSection />
      </main>

      {/* Footer */}
      <SiteFooter />
    </>
  )
}
