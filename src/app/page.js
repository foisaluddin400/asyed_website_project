import AccessoryGift from "@/components/HomePage/AccessoryGift";
import Apparel from "@/components/HomePage/Apparel";
import Banner from "@/components/HomePage/Banner";
import Brands from "@/components/HomePage/Brands";
import Hero from "@/components/HomePage/Hero";
import Testomonial from "@/components/HomePage/Testomonial";




export default function Home() {
  
  return (
    <div className="container m-auto">
      <Hero></Hero>
       <Apparel></Apparel>
       <AccessoryGift></AccessoryGift>
       <Brands></Brands>
       <Banner></Banner>
       <Testomonial></Testomonial>
    </div>
  );
}
