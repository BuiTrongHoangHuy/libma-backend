import {ErrorResponse, SimpleResponse} from "../libs/response";
import userService from "../services/userService";
import categoryService from "../services/categoryService";
import {title} from "process";
import editionService from "../services/editionService";
import bookCopyService from "../services/bookCopyService";
import loanRecordService from "../services/loanRecordService";

const listLoanRecord = async (req, res) => {
    try {
        let response = await loanRecordService.listLoanRecord()
        return res.status(200).json({
            message: response.message,
            code: response.code,
            data: response.data,
        })
    } catch (err) {
        return res.status(400).send(ErrorResponse(err))
    }
}
const createLoanRecord = async (req, res) => {
    try {
        if (!req.body.readerId || !req.body.copyId || !req.body.loanDate || !req.body.dueDate) {
            return res.status(400).json({
                message: 'Missing required fields'
            })
        }
        const edition = await loanRecordService.createLoanRecord(req.body);
        res.status(201).json(edition);
    } catch (err) {
        res.status(500).send(ErrorResponse(err));
    }
};

module.exports = {listLoanRecord, createLoanRecord}