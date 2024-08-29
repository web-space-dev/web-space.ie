interface IProps {
  text: string;
}

// @TODO Create a component for this
export function SubHero({ text }: IProps) {
  return (
    <div>
      <h2>{text}</h2>
    </div>
  );
}
