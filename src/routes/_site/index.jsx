import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import HeroSlider from "@/components/home/HeroSlider";
import TrustStrip from "@/components/home/TrustStrip";
import CollectionsGrid from "@/components/home/CollectionsGrid";
import ProductSection from "@/components/home/ProductSection";
import PromoBanner from "@/components/home/PromoBanner";
import StyleGrid from "@/components/home/StyleGrid";
import LifestyleSection from "@/components/home/LifestyleSection";
import CelebrityCampaign from "@/components/home/CelebrityCampaign";
import FeaturedCarousel from "@/components/home/FeaturedCarousel";
import ReviewsSlider from "@/components/home/ReviewsSlider";
import QuickView from "@/components/product/QuickView";
import { bestsellers, newArrivals, featured } from "@/lib/products";

export const Route = createFileRoute("/_site/")({
  head: () => ({
    meta: [
      { title: "AURAVEN — Premium Watches, Considered" },
      {
        name: "description",
        content:
          "AURAVEN makes considered watches — Swiss movements, sapphire crystal and premium finishing. Shop men's, women's, chronograph and classic collections.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const [quickProduct, setQuickProduct] = useState(null);

  return (
    <>
      <HeroSlider />
      <TrustStrip />
      <CollectionsGrid />

      <ProductSection
        eyebrow="Bestsellers"
        title="Most wanted"
        products={bestsellers}
        linkLabel="Shop All Watches"
        onQuickView={setQuickProduct}
      />

      <PromoBanner />

      <ProductSection
        eyebrow="New Arrivals"
        title="Just landed"
        products={newArrivals}
        linkLabel="All New Arrivals"
        linkSearch={{ new: "true" }}
        onQuickView={setQuickProduct}
      />

      <StyleGrid />
      <LifestyleSection />
      <CelebrityCampaign />
      <FeaturedCarousel products={featured} onQuickView={setQuickProduct} />
      <ReviewsSlider />

      <QuickView
        product={quickProduct}
        open={Boolean(quickProduct)}
        onOpenChange={(open) => !open && setQuickProduct(null)}
      />
    </>
  );
}
