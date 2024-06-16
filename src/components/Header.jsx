import appImage from "../assets/quiz-logo.png";
export default function Header() {
  return (
    <header>
      <img src={appImage}></img>
      <h1>React Quiz</h1>
    </header>
  );
}
