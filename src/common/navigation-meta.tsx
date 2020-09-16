import Pomodoro from "../apps/pomodoro/Pomodoro";
import MarkdownEditor from "../apps/markdown-editor/MarkdownEditor";
import BrowserTabs from "../apps/browser-tabs/BrowserTabs";
import RockPaperScissors from "../apps/rock-paper-scissors/RockPaperScissors";
import MovingLinkAcrossACanvas from "../apps/moving-link-across-a-canvas/MovingLinkAcrossACanvas";

const navigationMeta: {
  name: string;
  path: string;
  component: React.ComponentType;
}[] = [
  {
    name: "Pomodoro",
    path: "pomodoro",
    component: Pomodoro,
  },
  {
    name: "Markdown Editor",
    path: "markdown-editor",
    component: MarkdownEditor,
  },
  {
    name: "Browser Tabs",
    path: "browser-tabs",
    component: BrowserTabs,
  },
  {
    name: "Rock Paper Scissors",
    path: "rock-paper-scissors",
    component: RockPaperScissors,
  },
  {
    name: "Moving Link Across a Canvas",
    path: "moving-link-across-a-canvas",
    component: MovingLinkAcrossACanvas,
  },
];

export default navigationMeta;
