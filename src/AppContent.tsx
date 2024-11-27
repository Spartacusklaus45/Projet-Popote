import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';
import MessageTicker from './components/MessageTicker';
import Navbar from './components/Navbar';
import PublicNavbar from './components/PublicNavbar';
import Footer from './components/Footer';
import PublicFooter from './components/PublicFooter';
import PrivateRoute from './components/auth/PrivateRoute';

// Public pages
import PublicHome from './pages/PublicHome';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import FAQ from './pages/FAQ';
import Subscription from './pages/Subscription';
import Partners from './pages/Partners';
import Careers from './pages/Careers';
import ExpressBasket from './pages/ExpressBasket';
import LoyaltyProgram from './pages/LoyaltyProgram';
import Referral from './pages/Referral';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import Legal from './pages/Legal';
import Cookies from './pages/Cookies';
import HowItWorks from './pages/HowItWorks';
import Help from './pages/Help';

// Private pages
import Home from './pages/Home';
import Profile from './pages/Profile';
import PaymentMethods from './pages/profile/PaymentMethods';
import Recipes from './pages/Recipes';
import RecipeDetail from './components/recipes/RecipeDetail';
import CreateRecipe from './pages/CreateRecipe';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderTracking from './pages/OrderTracking';
import MealPlanning from './pages/MealPlanning';
import FridgeCooking from './pages/FridgeCooking';

export default function AppContent() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <MessageTicker />
      {isAuthenticated ? <Navbar /> : <PublicNavbar />}

      <main className="flex-grow">
        <Routes>
          {/* Public routes */}
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/recipes/:id" element={<RecipeDetail />} />
          <Route path="/subscription" element={<Subscription />} />
          <Route path="/partners" element={<Partners />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/express-basket" element={<ExpressBasket />} />
          <Route path="/loyalty-program" element={<LoyaltyProgram />} />
          <Route path="/referral" element={<Referral />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/help" element={<Help />} />

          {/* Private routes */}
          <Route path="/" element={
            isAuthenticated ? (
              <Home />
            ) : (
              <PublicHome />
            )
          } />
          
          <Route path="/profile/*" element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          } />
          
          <Route path="/profile/payment-methods" element={
            <PrivateRoute>
              <PaymentMethods />
            </PrivateRoute>
          } />
          
          <Route path="/create-recipe" element={
            <PrivateRoute>
              <CreateRecipe />
            </PrivateRoute>
          } />
          
          <Route path="/cart" element={
            <PrivateRoute>
              <Cart />
            </PrivateRoute>
          } />
          
          <Route path="/checkout" element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          } />
          
          <Route path="/order-tracking" element={
            <PrivateRoute>
              <OrderTracking />
            </PrivateRoute>
          } />
          
          <Route path="/meal-planning" element={
            <PrivateRoute>
              <MealPlanning />
            </PrivateRoute>
          } />
          
          <Route path="/fridge-cooking" element={
            <PrivateRoute>
              <FridgeCooking />
            </PrivateRoute>
          } />
        </Routes>
      </main>

      {isAuthenticated ? <Footer /> : <PublicFooter />}
    </div>
  );
}