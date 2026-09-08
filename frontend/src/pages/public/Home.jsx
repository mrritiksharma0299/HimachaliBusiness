import HeroSection from "../../components/home/HeroSection";
import CategorySection from "../../components/category/CategorySection";
import PopularBusinesses from "../../components/business/PopularBusinesses";
import LatestOffers from "../../components/home/LatestOffers";
import BusinessUpdates from "../../components/home/BusinessUpdates";
import WhyHimachaliBusiness from "../../components/home/WhyHimachaliBusiness";
import RegisterBusinessCTA from "../../components/home/RegisterBusinessCTA";

function Home() {
  return (
    <>
      <HeroSection />

      <CategorySection />

      <PopularBusinesses />

      <LatestOffers />

      <BusinessUpdates />

      <WhyHimachaliBusiness />

      <RegisterBusinessCTA />

      {/* More homepage sections will be added here */}
    </>
  );
}

export default Home;