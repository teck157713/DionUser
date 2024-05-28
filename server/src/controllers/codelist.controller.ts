import { Request, Response } from "express";
import { CodeList } from "../models/codelist.model";

export const getCodeList = async (_req: Request, res: Response) => {
    res.status(200).json(CodeList);
}
