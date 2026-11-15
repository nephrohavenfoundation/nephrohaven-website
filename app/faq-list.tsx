import type { ReactNode } from "react";

export function FaqList({ questions }: { questions: readonly { id?: string; title: string; answer: ReactNode }[] }) {
  return (
    <div className="faq-list">
      {questions.map(({ id, title, answer }) => (
        <details key={title}>
          <summary>{title}<span className="disclosure-icon" aria-hidden="true" /></summary>
          <div className="faq-answer" id={id}><p>{answer}</p></div>
        </details>
      ))}
    </div>
  );
}
