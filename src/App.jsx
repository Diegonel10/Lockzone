import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import Layout from '@/components/Layout';
import HomePage from '@/pages/HomePage';
import FreePicksPage from '@/pages/FreePicksPage';
import PremiumPicksPage from '@/pages/PremiumPicksPage';
import { PredictionsProvider } from '@/contexts/PredictionsContext';

function App() {
  return (
    <PredictionsProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/apuestas-gratis" element={<FreePicksPage />} />
          <Route path="/apuestas-premium" element={<PremiumPicksPage />} />
        </Routes>
      </Layout>
      <Toaster />
    </PredictionsProvider>
  );
}

export default App;