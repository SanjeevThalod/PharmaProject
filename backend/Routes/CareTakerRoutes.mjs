import express from "express";
import { verifyToken } from "../Config/jwt.mjs";
import { assign, findCareTaker } from "../Controllers/CareTakerController.mjs";

const CareTaker = express.Router();

// Asigining CareTaker
CareTaker.post('/assign',verifyToken,assign);

// Fetching CareTaker
CareTaker.get('/find',verifyToken,findCareTaker);

export default CareTaker;