import React from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import QuickPlanning from '../components/QuickPlanning';
import RecipeShowcase from '../components/RecipeShowcase';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import Newsletter from '../components/Newsletter';
import PromoBanner from '../components/banners/PromoBanner';
import RecipeBanner from '../components/banners/RecipeBanner';

export default function PrivateHome() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <Hero />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <PromoBanner />
          <RecipeBanner />
        </div>

        <QuickPlanning />
        <Features />
        <RecipeShowcase />
        <HowItWorks />
        <Testimonials />
        <Newsletter />
      </main>
    </div>
  );
}