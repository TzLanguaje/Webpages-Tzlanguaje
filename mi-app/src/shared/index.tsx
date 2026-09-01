export function SectionTitle({ title, description, id }: { title: string; description?: string; id?: string }) {
  return (
    <div className="section-header">
      <h2 id={id}>{title}</h2>
      {description && <p className="section-lead">{description}</p>}
    </div>
  );
}

export function CodeBlock({ code }: { code: string }) {
  return (
    <div className="code-example">
      <pre tabIndex={0}><code>{code}</code></pre>
    </div>
  );
}