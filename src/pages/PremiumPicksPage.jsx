import React from 'react';
import { motion } from 'framer-motion';
import { usePredictions } from '@/contexts/PredictionsContext';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertTriangle, Loader2, Lock, MessageCircle } from 'lucide-react';
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

const LockedPickCard = ({ pick }) => {
  const whatsappBaseUrl = "https://wa.me/529518393782";
  const whatsappMessage = encodeURIComponent("Hola!, quiero Información sobre la pick premium");
  const whatsappLink = `${whatsappBaseUrl}?text=${whatsappMessage}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative h-full"
    >
      <Card className="flex flex-col h-full overflow-hidden shadow-lg blur-sm select-none border-primary/20">
        <CardHeader className="bg-card">
          <CardTitle className="text-muted-foreground text-lg truncate">{pick.match || "Partido Premium"}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow p-4 space-y-3">
          <div>
            <p className="text-sm font-semibold text-muted-foreground">Apuesta:</p>
            <p className="text-md font-bold text-muted-foreground">**********</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-muted-foreground">Cuota:</p>
            <p className="text-md font-bold text-muted-foreground">{formatOdds(pick.odds)}</p>
          </div>
           {pick.status && (
            <div className="mt-1">
              <StatusBadge status={pick.status} />
            </div>
          )}
        </CardContent>
        <CardFooter className="p-4 border-t border-primary/20">
          <Button variant="secondary" className="w-full" disabled>
            <Lock className="mr-2 h-4 w-4" /> Ver Justificación
          </Button>
        </CardFooter>
      </Card>
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-card/80 backdrop-blur-xs rounded-lg p-4">
        <Lock className="h-12 w-12 text-primary mb-4" />
        <p className="text-center font-semibold text-foreground mb-4">
          Este es un pronóstico Premium.
        </p>
        <Button 
          onClick={() => window.open(whatsappLink, '_blank')}
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <MessageCircle className="mr-2 h-4 w-4" /> Desbloquear por WhatsApp
        </Button>
      </div>
    </motion.div>
  );
};


const PremiumPicksPage = () => {
  const { predictions, loading } = usePredictions();
  const premiumPicks = predictions.filter(p => p.isfree === false);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-[calc(100vh-200px)]">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
         <p className="ml-4 mt-4 text-lg text-foreground">Cargando pronósticos premium...</p>
      </div>
    );
  }
  
  if (!loading && predictions.length === 0 && premiumPicks.length === 0) {
     return (
      <div className="container mx-auto px-4 py-12 text-center">
        <AlertTriangle className="h-16 w-16 mx-auto mb-6 text-destructive" />
        <h1 className="text-3xl font-bold mb-4 text-foreground">Error al Cargar Pronósticos Premium</h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
          No pudimos cargar los pronósticos en este momento. Por favor, asegúrate de que la configuración de Google Sheets (ID de la hoja y API Key) sea correcta, que la hoja tenga datos y esté publicada en la web.
        </p>
        <Button onClick={() => window.location.reload()}>Intentar de Nuevo</Button>
      </div>
    );
  }

  if (premiumPicks.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <Lock className="h-16 w-16 mx-auto mb-6 text-primary" />
        <h1 className="text-3xl font-bold mb-4 text-foreground">No Hay Pronósticos Premium Hoy</h1>
        <p className="text-lg text-muted-foreground max-w-xl mx-auto">
          Nuestros analistas están trabajando. Vuelve más tarde para los mejores picks exclusivos o contacta por WhatsApp para más información.
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
          Apuestas <span className="text-primary">Premium</span>
        </h1>
        <p className="mt-4 text-xl text-muted-foreground max-w-xl mx-auto">
          Acceso exclusivo a nuestros mejores pronósticos y análisis detallados. Desbloquéalos para potenciar tus jugadas.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {premiumPicks.map((pick) => (
          <LockedPickCard key={pick.id} pick={pick} />
        ))}
      </div>
    </div>
  );
};

export default PremiumPicksPage;