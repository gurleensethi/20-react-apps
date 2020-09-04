import Pomodoro from "../apps/pomodoro/Pomodoro";
import MarkdownEditor from "../apps/markdown-editor/MarkdownEditor";
import BrowserTabs from "../apps/browser-tabs/BrowserTabs";

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
];

export default navigationMeta;
