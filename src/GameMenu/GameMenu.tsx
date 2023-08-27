import { Link } from "react-router-dom";
import { BASE_PATH } from "../router";

interface GameLink {
  url: string;
  name: string;
}

const GAME_LINKS: GameLink[] = [
  {
    url: "solitaire",
    name: "Solitaire",
  },
  {
    url: "typing-wars",
    name: "Typing Wars",
  },
];

const GameMenu: React.FC = () => {
  return (
    <nav>
      {GAME_LINKS.map(({ url, name }) => (
        <div>
          <Link to={`${BASE_PATH}/${url}`}>{name}</Link>
        </div>
      ))}
    </nav>
  );
};

export default GameMenu;
