import { useEffect, useRef, useState } from 'react';

interface Step {
  id: string;
  label: string;
  title: string;
}

interface TutorialProgressProps {
  steps: Step[];
}

export function TutorialProgress({ steps }: TutorialProgressProps) {
  const [activeStep, setActiveStep] = useState<string>(steps[0]?.id || '');
  const sidebarRef = useRef<HTMLElement>(null);
  const stepPositionsRef = useRef<Map<string, { top: number; bottom: number }>>(new Map());
  const rafRef = useRef<number | null>(null);

  // Cachear posiciones de cada paso
  useEffect(() => {
    const positions = new Map<string, { top: number; bottom: number }>();
    steps.forEach((step) => {
      const element = document.getElementById(step.id);
      if (element) {
        const rect = element.getBoundingClientRect();
        const scrollTop = window.scrollY || document.documentElement.scrollTop;
        positions.set(step.id, {
          top: rect.top + scrollTop,
          bottom: rect.bottom + scrollTop,
        });
      }
    });
    stepPositionsRef.current = positions;
  }, [steps]);

  // Scroll spy basado en posición de scroll (más fiable que IntersectionObserver)
  useEffect(() => {
    let ticking = false;

    const updateActiveStep = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const viewportHeight = window.innerHeight;
      const viewportCenter = scrollTop + viewportHeight / 2;

      const positions = stepPositionsRef.current;
      let bestStep = steps[0]?.id || '';
      let bestDistance = Infinity;

      positions.forEach((pos, id) => {
        // Distancia desde el centro del viewport al centro del paso
        const stepCenter = (pos.top + pos.bottom) / 2;
        const distance = Math.abs(viewportCenter - stepCenter);
        if (distance < bestDistance) {
          bestDistance = distance;
          bestStep = id;
        }
      });

      if (bestStep !== activeStep) {
        setActiveStep(bestStep);
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        rafRef.current = requestAnimationFrame(updateActiveStep);
        ticking = true;
      }
    };

    // Calcular posiciones iniciales
    updateActiveStep();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [steps, activeStep]);

  // Scroll interno del sidebar para mostrar paso activo
  useEffect(() => {
    if (sidebarRef.current) {
      const activeEl = sidebarRef.current.querySelector('.tutorial-step.active');
      if (activeEl) {
        activeEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [activeStep]);

  const scrollToStep = (stepId: string) => {
    const element = document.getElementById(stepId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <nav ref={sidebarRef} className="tutorial-progress" aria-label="Progreso del tutorial">
      <h3 className="tutorial-progress-title">Primeros Pasos</h3>
      <ol className="tutorial-steps">
        {steps.map((step, index) => (
          <li
            key={step.id}
            className={`tutorial-step ${activeStep === step.id ? 'active' : ''} ${steps.findIndex(s => s.id === activeStep) > index ? 'completed' : ''}`}
          >
            <button
              type="button"
              className="tutorial-step-button"
              onClick={() => scrollToStep(step.id)}
              aria-current={activeStep === step.id ? 'step' : undefined}
            >
              <span className="step-number">{index + 1}</span>
              <span className="step-label">{step.label}</span>
              {activeStep === step.id && <span className="step-indicator" aria-hidden="true" />}
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}