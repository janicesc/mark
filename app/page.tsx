import { StepsSection } from "@/components/steps-section"
import { ProductCloseup } from "@/components/product-closeup"
import { AsSeenOn } from "@/components/as-seen-on"
import { SiteFooter } from "@/components/site-footer"

export default function Home() {
  return (
    <main>
      <StepsSection />
      <ProductCloseup />
      <AsSeenOn />
      <SiteFooter />
    </main>
  )
}
