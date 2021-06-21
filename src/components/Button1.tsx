type Button1Props = {
  text: string;
};

export function Button1(props: Button1Props) {
  return <button>{props.text}</button>
}