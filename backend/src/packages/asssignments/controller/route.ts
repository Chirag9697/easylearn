//lib
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { checktoken } from '../../../utils/check-token';

import multer from 'multer';
//local
import * as fromusers from '../../users';
import * as fromannouncements from '../../announcements';
import * as frompparentclass from '../../parentclass';
import * as fromclasses from '../../classes';
import * as fromassignments from '../../asssignments';
dotenv.config();

const app = express();
export const router = express.Router()
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './files')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + file.originalname);
    }
})
const upload = multer({ storage: storage })

router.get('/:studentid', checktoken(['teacher', 'student']), async (req, res) => {
    try {
        console.log("assignments obtain");
        const { studentid } = req.params;
        const allclassid = await fromclasses.getallclassstudentid(studentid);
        console.log(allclassid);
        const newdata = [];
        for (let i = 0; i < allclassid.length; i++) {
            const allassignment = await fromassignments.getallbyclassid(allclassid[i].id);
            console.log(allassignment);
            const classdetails = await frompparentclass.get_one(allclassid[i].id);
            for (let j = 0; j < allassignment.length; j++) {
                newdata.push(allassignment[j]);
            }
        }
        console.log("hello");
        console.log(newdata);
        res.send({ data: newdata });
    } catch (error) {
        res.send({ error: error });
    }
})
router.get('/:studentid/:classid', checktoken(['teacher', 'student']), async (req, res) => {
    try {
        console.log("assignments obtain");
        const { studentid, classid } = req.params;
        const newdata = [];
        const allassignment = await fromassignments.getallbyclassid(classid);
        const classdetails = await frompparentclass.get_one(classid);
        for (let j = 0; j < allassignment.length; j++) {
            newdata.push(allassignment[j]);
        }
        console.log(newdata);
        res.send({ assignment: newdata });
    } catch (error) {
        res.send({ error: error });
    }
})
router.put('/', upload.single("file"), checktoken(['teacher', 'student']), async (req, res) => {
    try {
        console.log("hello")
        const { id, classid, title, deadline,qp } = req.body;
        const  ans = req.file.filename;
        const data = { id, qp, ans, classid, title, deadline };
        const updateassignment = await fromassignments.updatebyid(data, id);
        res.send({ success: "successfully uploaded assignments" });
    } catch (error) {
        res.send({ error: error });
    }
})
router.post('/', upload.single("file"), checktoken(['teacher', 'student']), async (req, res) => {
    try {
        console.log("assignment");
        const { classid, title, deadline } = req.body;
        const qp = req.file.filename;
        const data = { qp, ans: "NA", classid, title, deadline };
        const updateassignment = await fromassignments.create(data);
        console.log(updateassignment);
        res.send({ success: "successfully created assignments" });
    } catch (error) {
        res.send({ error: error });
    }
})







