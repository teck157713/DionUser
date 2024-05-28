import { createContext } from "react";
import { CodeListValue } from "../models/codelist.model";

const value: CodeListValue[] = [];
export const CodeListContext = createContext(value);