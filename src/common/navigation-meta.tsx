import Pomodoro from "../apps/pomodoro/Pomodoro";
import MarkdownEditor from "../apps/markdown-editor/MarkdownEditor";
import BrowserTabs from "../apps/browser-tabs/BrowserTabs";
import RockPaperScissors from "../apps/rock-paper-scissors/RockPaperScissors";

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
];

export default navigationMeta;
