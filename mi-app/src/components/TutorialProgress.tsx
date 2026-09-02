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
  const observerRef = useRef<IntersectionObserver | null>(null);
  const stepElementsRef = useRef<Map<string, HTMLElement>>(new Map());
  const sidebarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        // Encontrar la entrada que más se ve en viewport (ratio más alto)
        let bestEntry: IntersectionObserverEntry | null = null;
        let bestRatio = 0;
        
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > bestRatio) {
            bestRatio = entry.intersectionRatio;
            bestEntry = entry;
          }
        });
        
        if (bestEntry && (bestEntry as IntersectionObserverEntry).target) {
          setActiveStep((bestEntry as IntersectionObserverEntry).target.id);
        }
      },
      {
        rootMargin: isMobile ? '-80px 0px -50% 0px' : '-150px 0px -50% 0px',
        threshold: [0, 0.1, 0.25, 0.5, 0.75, 1.0],
      }
    );

    observerRef.current = observer;
    steps.forEach((step) => {
      const element = document.getElementById(step.id);
      if (element) {
        observer.observe(element);
        stepElementsRef.current.set(step.id, element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [steps]);

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