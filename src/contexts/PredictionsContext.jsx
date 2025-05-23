import React, { createContext, useContext, useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';

const PredictionsContext = createContext();

export function PredictionsProvider({ children }) {
  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const SPREADSHEET_ID = '1vsKZj28QXdLEgVYSK8dQZu1lEgXson2nuuWWJtN3yuA';
  const API_KEY = 'AIzaSyBU_Y0p75bhD3kP0K0CYM2FiY0YQ_tHyQ4';
  const SHEET_NAME = 'Sheet1';
  const RANGE = `${SHEET_NAME}!A:F`;

  useEffect(() => {
    const fetchPredictions = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`
        );
        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error fetching Google Sheets data:', errorData);
          throw new Error(`Error ${response.status}: ${errorData.error?.message || 'No se pudieron cargar los datos. Verifica la configuración de la API Key y el ID de la Hoja de Cálculo.'}`);
        }
        const data = await response.json();
        const rows = data.values;

        if (rows && rows.length > 1) {
          const headers = rows[0].map(header => String(header).trim().toLowerCase());
          const parsedPredictions = rows.slice(1).map((row, index) => {
            let prediction = { id: String(index) };
            headers.forEach((header, i) => {
              let value = row[i];
              if (header === 'isfree') {
                value = String(value).trim().toLowerCase() === 'true';
              } else if (header === 'odds') {
                value = parseFloat(String(value).replace(',', '.'));
              } else if (header === 'status') {
                value = String(value !== undefined && value !== null ? value : 'pending').trim().toLowerCase();
              }
              else {
                value = String(value !== undefined && value !== null ? value : '').trim();
              }
              prediction[header] = value;
            });
            return prediction;
          }).filter(p => p.match && p.pick && typeof p.odds === 'number' && !isNaN(p.odds));
          setPredictions(parsedPredictions);
        } else {
          setPredictions([]);
          if (rows && rows.length <= 1) {
            toast({
              title: 'Hoja de cálculo vacía o solo con encabezados',
              description: 'Asegúrate de que tu Google Sheet tenga datos de pronósticos y la columna "status".',
              variant: 'default',
            });
          }
        }
      } catch (error) {
        console.error('Error fetching predictions:', error);
        toast({
          title: 'Error al cargar pronósticos',
          description: error.message || 'No se pudieron obtener los datos de Google Sheets. Verifica la configuración y que la hoja esté compartida correctamente (publicada en la web).',
          variant: 'destructive',
        });
        setPredictions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPredictions();
  }, [toast]);

  return (
    <PredictionsContext.Provider value={{ predictions, loading }}>
      {children}
    </PredictionsContext.Provider>
  );
}

export const usePredictions = () => {
  const context = useContext(PredictionsContext);
  if (context === undefined) {
    throw new Error('usePredictions must be used within a PredictionsProvider');
  }
  return context;
};