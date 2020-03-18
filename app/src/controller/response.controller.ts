import { Response } from "express";
export default abstract class ResponseController {

    public renderSuccess(res: Response, body: any) {
        res.status(200).json(body);
    }

    public renderError(res: Response, err: Error) {
        res.status(500).json(err);
    }

}