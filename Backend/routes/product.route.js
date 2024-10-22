import express from "express";

import { createProduct, deleteProduct, getProducts, updateProduct } from "../controllers/product.controller.js";

const router = express.Router();

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
const User = require('../models/user.model.js');

//all prefixed with "/api/products"

//fetch all products in database
router.get("/", getProducts);

//add product to database
router.post("/", createProduct);

//update product depending on fields given
router.put("/:id", updateProduct); //needs an id to update specific product

//delete product from database
router.delete("/:id", deleteProduct); //needs an id to delete specific product

export default router;