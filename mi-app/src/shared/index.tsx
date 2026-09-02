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
export function ComparisonTable() {
  const comparisons = [
    { español: 'es mayor que', simbolo: '>' },
    { español: 'es menor que', simbolo: '<' },
    { español: 'es mayor o igual que', simbolo: '>=' },
    { español: 'es menor o igual que', simbolo: '<=' },
    { español: 'es igual a', simbolo: '==' },
    { español: 'es diferente de', simbolo: '!=' },
  ]

  return (
    <table className="comparison-table">
      <thead>
        <tr>
          <th>Forma en español</th>
          <th>Equivalente simbólico</th>
        </tr>
      </thead>
      <tbody>
        {comparisons.map((c, i) => (
          <tr key={i}>
            <td><code>{c.español}</code></td>
            <td><code>{c.simbolo}</code></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export function Pipeline() {
  const steps = [
    { name: 'archivo .tz', highlighted: false, desc: null },
    { name: 'Lexer', highlighted: true, desc: 'texto → tokens' },
    { name: 'Parser', highlighted: true, desc: 'tokens → AST' },
    { name: 'AST', highlighted: true, desc: 'estructura del programa' },
    { name: 'Interpreter', highlighted: true, desc: 'recorre y ejecuta' },
    { name: 'Runtime', highlighted: true, desc: 'valores, operaciones, memoria' },
    { name: 'salida', highlighted: false, desc: null },
  ]

  return (
    <div className="pipeline" role="img" aria-label="Pipeline del intérprete">
      {steps.map((step, i) => (
        <div key={step.name} className="pipeline-step">
          <div className={`step-box ${step.highlighted ? 'highlighted' : ''}`}>{step.name}</div>
          {step.desc && <div className="step-desc">{step.desc}</div>}
          {i < steps.length - 1 && <div className="arrow" aria-hidden="true">▼</div>}
        </div>
      ))}
    </div>
  )
}

export function CommandTable() {
  const commands = [
    { cmd: 'make', desc: 'Compila <code>build/tzc</code>' },
    { cmd: 'make test', desc: 'Compila y ejecuta la suite principal (244 tests)' },
    { cmd: 'make test-education', desc: 'Valida el material de <code>education/</code> (5 lecciones)' },
    { cmd: 'make debug', desc: 'Genera <code>build/tzc-debug</code> con <code>-g -O0</code>' },
    { cmd: 'make asan', desc: 'Genera <code>build/tzc-asan</code> y pasa la suite con sanitizers' },
    { cmd: 'make install', desc: 'Instala el comando <code>tz</code>' },
    { cmd: 'make uninstall', desc: 'Desinstala el comando <code>tz</code>' },
    { cmd: 'make clean', desc: 'Borra todo lo generado en <code>build/</code>' },
  ]

  return (
    <table>
      <thead>
        <tr><th>Orden</th><th>Qué hace</th></tr>
      </thead>
      <tbody>
        {commands.map((c, i) => (
          <tr key={i}>
            <td><code>{c.cmd}</code></td>
            <td dangerouslySetInnerHTML={{ __html: c.desc }} />
          </tr>
        ))}
      </tbody>
    </table>
  )
}
