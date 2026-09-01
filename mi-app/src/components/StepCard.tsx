import { CodeBlock } from '../shared';

interface StepCardProps {
  id: string;
  title: string;
  description: string;
  code: string;
}

export function StepCard({ id, title, description, code }: StepCardProps) {
  return (
    <article id={id} className="step-card">
      <header className="step-header">
        <h2>{title}</h2>
      </header>
      <div className="step-description">
        <p>{description}</p>
      </div>
      <div className="step-code">
        <CodeBlock code={code} />
      </div>
    </article>
  );
}