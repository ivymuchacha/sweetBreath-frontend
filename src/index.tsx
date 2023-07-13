import { createRoot } from "react-dom/client";

import App from "./app";
import "./index.css";

const ROOT_CONTAINER_ID = "root";

const container = document.getElementById(ROOT_CONTAINER_ID);
if (container === null) {
  throw new Error(`can't find the container where id==="${ROOT_CONTAINER_ID}"`);
}
const root = createRoot(container);
root.render(<App />);
