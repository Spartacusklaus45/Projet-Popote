import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { RecipeProvider } from './contexts/RecipeContext';
import { OrderProvider } from './contexts/OrderContext';
import { MealPlanningProvider } from './contexts/MealPlanningContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { LoyaltyProvider } from './contexts/LoyaltyContext';
import { RecipeStatsProvider } from './contexts/RecipeStatsContext';
import AppContent from './AppContent';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <OrderProvider>
            <LoyaltyProvider>
              <RecipeProvider>
                <RecipeStatsProvider>
                  <CartProvider>
                    <MealPlanningProvider>
                      <AppContent />
                    </MealPlanningProvider>
                  </CartProvider>
                </RecipeStatsProvider>
              </RecipeProvider>
            </LoyaltyProvider>
          </OrderProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}