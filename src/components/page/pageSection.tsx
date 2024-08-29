interface IProps {
  title?: string;
  pillText?: string;
  content?: string;
}

// @TODO Create a component for this
export function PageSection({ title, pillText, content }: IProps) {
  return (
    <div>
      <h3>{title}</h3> {/* Could be null */}
      <p>{pillText}</p> {/* Could be null */}
      <p>{content}</p>
    </div>
  );
}
