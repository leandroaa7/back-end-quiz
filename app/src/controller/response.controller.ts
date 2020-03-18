import { Response } from "express";
export default abstract class ResponseController {

    protected renderSuccess(res: Response, body: any) {
        res.status(200).json(body);
    }

    protected renderError(res: Response, err: Error) {
        res.status(500).json(err);
    }

}