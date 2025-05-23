import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, BarChart3, CheckCircle, Lock, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FeatureCard = ({ icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    className="bg-card p-6 rounded-lg shadow-xl text-center border border-primary/20"
  >
    <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold mb-2 text-foreground">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </motion.div>
);

const HomePage = () => {
  return (
    <div className="sports-pattern">
      <section className="relative overflow-hidden">
        <div className="hero-gradient-sports text-primary-foreground">
          <div className="container mx-auto px-4 py-20 md:py-32 text-center">
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <BarChart3 className="h-16 w-16 mx-auto mb-6 text-primary" />
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-foreground">
                Pronósticos Deportivos Diarios
              </h1>
              <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-muted-foreground">
                Obtén los mejores análisis y pronósticos deportivos para tomar decisiones informadas.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="font-semibold bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link to="/apuestas-gratis">Ver Pronósticos Gratis</Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="text-primary border-primary hover:bg-primary/10">
                  <Link to="/apuestas-premium">Acceder a Premium</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="features" className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">¿Por Qué Elegirnos?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Te ofrecemos análisis detallados y pronósticos fundamentados para tus deportes favoritos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<CheckCircle className="h-8 w-8 text-primary" />}
              title="Análisis Expertos"
              description="Pronósticos basados en datos, estadísticas y conocimiento profundo del deporte."
              delay={0.1}
            />
            <FeatureCard
              icon={<BarChart3 className="h-8 w-8 text-primary" />}
              title="Pronósticos Diarios"
              description="Actualizaciones constantes con los mejores picks del día para diversos eventos."
              delay={0.2}
            />
            <FeatureCard
              icon={<Lock className="h-8 w-8 text-primary" />}
              title="Contenido Exclusivo"
              description="Accede a pronósticos premium con análisis detallados y justificaciones completas."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-foreground">¿Cómo Funciona?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Es simple. Elige tu plan y empieza a recibir los mejores pronósticos.
            </p>
          </div>
          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-card p-8 rounded-lg shadow-xl border border-primary/30"
            >
              <Star className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-2xl font-semibold mb-3 text-foreground">Pronósticos Gratis</h3>
              <p className="text-muted-foreground mb-6">
                Accede a una selección de nuestros pronósticos diarios sin costo alguno. Ideal para que conozcas nuestra calidad.
              </p>
              <Button asChild variant="outline" className="w-full border-primary text-primary hover:bg-primary/10 hover:text-primary">
                <Link to="/apuestas-gratis">Ver Gratis <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="bg-card p-8 rounded-lg shadow-xl border border-primary/30"
            >
              <Lock className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-2xl font-semibold mb-3 text-foreground">Pronósticos Premium</h3>
              <p className="text-muted-foreground mb-6">
                Desbloquea todos nuestros pronósticos, análisis detallados y picks exclusivos. ¡Maximiza tus oportunidades!
              </p>
              <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                <Link to="/apuestas-premium">Acceder a Premium <ArrowRight className="ml-2 h-4 w-4" /></Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold mb-4 text-foreground">¿Listo para Empezar?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto text-muted-foreground">
              Únete a nuestra comunidad y lleva tus apuestas al siguiente nivel con análisis profesionales.
            </p>
            <Button asChild size="lg" className="font-semibold bg-primary text-primary-foreground hover:bg-primary/90">
              <Link to="/apuestas-gratis">Explorar Pronósticos</Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;