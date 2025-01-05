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
        const records = req.body;

        if (!Array.isArray(records) || records.length === 0) {
            return res.status(400).json({
                message: "Request body must be a non-empty array of objects",
            });
        }

        for (const record of records) {
            if (!record.readerId || !record.copyId || !record.loanDate || !record.dueDate) {
                return res.status(400).json({
                    message: "Missing readerId, copyId, loanDate, and dueDate",
                });
            }
        }
        const createdRecords = await loanRecordService.createLoanRecord(records);
        res.status(201).json(createdRecords);
    } catch (err) {
        res.status(500).send(ErrorResponse(err));
    }
};
const getLoanRecordById = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({error: 'ID is required'});
        }
        const record = await loanRecordService.getLoanRecordById(id);
        if (record) {
            res.status(200).json(record);
        } else {
            res.status(404).json({error: 'loan record not found'});
        }
    } catch (err) {
        return res.status(400).send(ErrorResponse(err))
    }
}
const deleteLoanRecord = async (req, res) => {
    try {
        let response = await loanRecordService.deleteLoanRecord(req.params.id)
        return res.status(200).send(SimpleResponse(response))
    } catch (err) {
        return res.status(400).send(ErrorResponse(err))
    }
}

const updateLoanRecord = async (req, res) => {
    try {
        const id = req.params.id;
        if (!id) {
            return res.status(400).json({error: 'ID is required'});
        }
        const record = await loanRecordService.updateLoanRecord(req.params.id, req.body);
        if (record) {
            res.status(200).json(record);
        } else {
            res.status(404).json({error: 'Loan record not found'});
        }

    } catch (err) {
        return res.status(400).send(ErrorResponse(err))

    }
}
module.exports = {listLoanRecord, createLoanRecord, getLoanRecordById, deleteLoanRecord, updateLoanRecord}