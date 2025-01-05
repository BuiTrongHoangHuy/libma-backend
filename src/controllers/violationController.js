import {ErrorResponse, SimpleResponse} from "../libs/response";
import userService from "../services/userService";
import categoryService from "../services/categoryService";
import {title} from "process";
import editionService from "../services/editionService";
import bookCopyService from "../services/bookCopyService";
import loanRecordService from "../services/loanRecordService";
import violationService from "../services/violationService";

const listViolation = async (req, res) => {
    try {
        let response = await violationService.listViolation()
        return res.status(200).json({
            message: response.message,
            code: response.code,
            data: response.data,
        })
    } catch (err) {
        return res.status(400).send(ErrorResponse(err))
    }
}
const createViolation = async (req, res) => {
    try {

        if ( !req.body.readerId || !req.body.violationType) {
            return res.status(400).json({
                message: "Missing fields",
            });
        }

        const createdViolation = await violationService.createViolation(req.body);
        if(createdViolation.code !==200){
            res.status(500).send(createdViolation);
        }
        res.status(201).json(createdViolation);
    } catch (err) {
        res.status(500).send(ErrorResponse(err));
    }
};
module.exports = {listViolation,createViolation}