import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePredictions } from '@/contexts/PredictionsContext';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, AlertTriangle, Eye, CheckCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { formatOdds } from '@/lib/utils';
import { cn } from '@/lib/utils';

const StatusBadge = ({ status }) => {
  let bgColor, textColor, text;

  switch (status) {
    case 'won':
      bgColor = 'bg-green-500/20';
      textColor = 'text-green-400';
      text = 'Ganado';
      break;
    case 'lost':
      bgColor = 'bg-red-500/20';
      textColor = 'text-red-400';
      text = 'Perdido';
      break;
    case 'pending':
    default:
      bgColor = 'bg-gray-500/20';
      textColor = 'text-gray-400';
      text = 'Pendiente';
      break;
  }

  return (
    <span className={cn('text-xs font-semibold px-2.5 py-0.5 rounded-full', bgColor, textColor)}>
      {text}
    </span>
  );
};

const PickCard = ({ pick }) => {
  const [showJustification, setShowJustification] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="h-full"
    >
      <Card className="flex flex-col h-full overflow-hidden shadow-xl hover:shadow-primary/30 transition-shadow duration-300 border-primary/20 bg-card">
        <CardHeader className="bg-primary/10">
          <CardTitle className="text-primary text-lg truncate">{pick.match || "Partido no especificado"}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow p-4 space-y-3">
          <div>
            <p className="text-sm font-semibold text-muted-foreground">Apuesta:</p>
            <p className="text-md font-bold text-foreground">{pick.pick || "No especificada"}</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-muted-foreground">Cuota:</p>
            <p className="text-md font-bold text-primary">{formatOdds(pick.odds)}</p>
          </div>
          {pick.status && (
            <div className="mt-1">
              <StatusBadge status={pick.status} />
            </div>
          )}
          <AnimatePresence>
            {showJustification && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="pt-3">
                  <p className="text-sm font-semibold text-muted-foreground">Justificación:</p>
                  <p className="text-sm text-foreground/80 mt-1 whitespace-pre-wrap">
                    {pick.justification || "No hay justificación disponible."}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
        <CardFooter className="p-4 border-t border-primary/20">
            <Button 
              variant="outline" 
              className="w-full border-primary text-primary hover:bg-primary/10 hover:text-primary"
              onClick={() => setShowJustification(!showJustification)}
            >
              {showJustification ? <ChevronUp className="mr-2 h-4 w-4" /> : <ChevronDown className="mr-2 h-4 w-4" />}
              {showJustification ? 'Ocultar Justificación' : 'Ver Justificación'}
            </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

const FreePicksPage = () => {
  const { predictions, loading } = usePredictions();
  const freePicks = predictions.filter(p => p.isfree === true);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-[calc(100vh-200px)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="ml-4 mt-4 text-lg text-foreground">Cargando pronósticos...</p>
      </div>
    );
  }

  if (!loading && predictions.length === 0 && freePicks.length === 0) {
     return (
      <div className="container mx-auto px-4 py-12 text-center">
        <AlertTriangle className="h-16 w-16 mx-auto mb-6 text-destructive" />
        <h1 className="text-3xl font-bold mb-4 text-foreground">Error al Cargar Pronósticos</h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
          No pudimos cargar los pronósticos en este momento. Por favor, asegúrate de que la configuración de Google Sheets (ID de la hoja y API Key) sea correcta, que la hoja tenga datos y esté publicada en la web.
        </p>
        <Button onClick={() => window.location.reload()}>Intentar de Nuevo</Button>
      </div>
    );
  }
  
  if (freePicks.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
         <CheckCircle className="h-16 w-16 mx-auto mb-6 text-primary" />
        <h1 className="text-3xl font-bold mb-4 text-foreground">No Hay Pronósticos Gratis Hoy</h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Vuelve más tarde o revisa nuestros pronósticos premium para más acción.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl text-foreground">
          Apuestas del Día <span className="text-primary">(Gratis)</span>
        </h1>
        <p className="mt-4 text-xl text-muted-foreground max-w-xl mx-auto">
          Nuestra selección de pronósticos gratuitos para hoy. ¡Analizados y listos para ti!
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {freePicks.map((pick) => (
          <PickCard key={pick.id} pick={pick} />
        ))}
      </div>
    </div>
  );
};

export default FreePicksPage;