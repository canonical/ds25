import { createContext } from "react";
import type { ContextOptions } from "./types.js";

const Context = createContext<ContextOptions | undefined>(undefined);

export default Context;
