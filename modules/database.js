//REQUIRES
require("dotenv").config();
const {mongoose, connect: connect1} = require("mongoose");

//SCHEMAS
const licenseSchema = require("../schema/LicenseSchema.js");
const paymentSchema = require("../schema/PaymentSchema.js");
const productSchema = require("../schema/ProductSchema.js");
const publicBannedUserSchema = require("../schema/PublicBannedUserSchema.js");
const redirectSchema = require("../schema/RedirectSchema.js");
const userSchema = require("../schema/UserSchema.js");

//DATA-MODELS
const licenseData = mongoose.model("licenseData", licenseSchema);
const paymentData = mongoose.model("paymentData", paymentSchema);
const productData = mongoose.model("productData", productSchema);
const publicBannedUserData = mongoose.model("publicBannedUserData", publicBannedUserSchema);
const userData = mongoose.model("userData", userSchema);
const redirectData = mongoose.model("redirectData", redirectSchema);

//SETUP FUNCTION
async function connect() {
    const url = process.env.DB;

    try {
        await connect1(url);

        console.log("Connected to DB");
    } catch (err) {
        console.log("Error on DB connection: " + err);
    }
}

//FUNCTIONS - GENERATE
function generateLicenseModel(ownerUserId) {
    return new licenseData({
        ownerUserId: ownerUserId,
        items: null //TODO
    });
}

function generatePaymentModel(orderId, userId, productId) {
    return new paymentData({
        orderId: orderId,
        userId: userId,
        productId: productId,
        buyAt: Date.now()
    })
}

function generateProductModel(productId, title, shortDescription, description, tag, price, thumbnailImageURL, productImageURL) {
    return new productData({
        productId: productId,
        title: title,
        shortDescription: shortDescription,
        description: description,
        tag: tag,
        price: price,
        createAt: Date.now(), 
        lastUpdateAt: Date.now(),
        thumbnailImageURL: thumbnailImageURL,
        productImageURL: productImageURL,
        buys: 0
    });
}

function generatePublicBannedUserModel(userId, addAt, macAddress, ipAddress) {
    return new publicBannedUserData({
        userId: userId,
        addAt: addAt,
        macAddress: macAddress,
        ipAddress: ipAddress
    });
}

function generateUserModel(userId, username, email, passwordHash, salt, lastLoginAt, registerAt, isAdmin) {
    return new userData({
        userId: userId,
        username: username,
        email: email,
        passwordHash: passwordHash,
        salt: salt,
        lastLoginAt: lastLoginAt,
        registerAt: registerAt,
        isAdmin: isAdmin,
        isMailVerified: false
    });
}

function generateRedirectModel(directCode, url) {
    return new redirectData({
        directCode: directCode,
        url: url
    });
}

//FUNCTIONS - GET
async function getLicenseByOwnerUserId(ownerUserId) {
    return await licenseData.findOne({ ownerUserId: ownerUserId }).exec();
}

async function getPaymentByOrderId(orderId) {
    return await paymentData.findOne({ orderId: orderId }).exec();
}

async function getPaymentsByUserId(userId) {
    return await paymentData.find({ userId: userId }).exec();
}

async function getPaymentsByOrderId(orderId) {
    return await paymentData.find({ orderId: orderId }).exec();
}

async function getProductByproductId(productId) {
    return await productData.findOne({ productId: productId }).exec();
}

async function getProductByTitle(title) {
    return await productData.findOne({ title: title }).exec();
}

async function getProducts() {
    return await productData.find({}).exec();
}

async function getPublicBannedUsers() {
    return await publicBannedUserData.find({}).exec();
}

async function getUserByUserId(userId) {
    return await userData.findOne({ userId: userId }).exec();
}

async function getUserByUsername(username) {
    return await userData.find({ username: username }).exec();
}

async function getUserByEmail(email) {
    return await userData.findOne({ email: email }).exec();
}

async function getUsers() {
    return await userData.find({}).exec();
}

async function getRedirectByDirectCode(directCode) {
    return await redirectData.findOne({ directCode: directCode }).exec();
}

//FUNCTIONS - DELETE
async function deleteLicenseByOwnerUserId(ownerUserId) {
    await licenseData.findOneAndDelete({ ownerUserId: ownerUserId }).exec();
}

async function deleteProductByProductId(productId) {
    await productData.findOneAndDelete({ productId: productId }).exec();
}

async function deletePublicBannedUserByIpAddress(ipAddress) {
    await publicBannedUserData.findOneAndDelete({ ipAddress: ipAddress }).exec();
}

async function deletePublicBannedUserByMacAddress(macAddress) {
    await publicBannedUserData.findOneAndDelete({ macAddress: macAddress }).exec();
}

async function deleteUserByUserId(userId) {
    await userData.findOneAndDelete({ userId: userId }).exec();
}

//FUNCTIONS - UPDATE
async function updateLicenseByOwnerUserId(ownerUserId, data) {
    await licenseData.updateOne({ ownerUserId: ownerUserId }, data).exec();
}

async function updateProductByProductId(productId, data) {
    await productData.updateOne({ productId: productId }, data).exec();
}

async function updatePublicBannedUserByUserId(userId, data) {
    await publicBannedUserData.updateOne({ userId: userId }, data).exec();
}

async function updatePublicBannedUserByIpAddress(ipAddress, data) {
    await publicBannedUserData.updateOne({ ipAddress: ipAddress }, data).exec
}

async function updatePublicBannedUserByMacAddress(macAddress, data) {
    await publicBannedUserData.updateOne({ macAddress: macAddress }, data).exec();
}

async function updateUserByUserId(userId, data) {
    await userData.updateOne({ userId: userId }, data).exec();
}

module.exports = {
    connect,

    //GENERATE
    generateLicenseModel,
    generatePaymentModel,
    generateProductModel,
    generatePublicBannedUserModel,
    generateUserModel,
    generateRedirectModel,

    //GET
    getLicenseByOwnerUserId,
    getPaymentByOrderId,
    getPaymentsByUserId,
    getPaymentsByOrderId,
    getProductByproductId,
    getProductByTitle,
    getProducts,
    getPublicBannedUsers,
    getUserByUserId,
    getUserByUsername,
    getUserByEmail,
    getUsers,
    getRedirectByDirectCode,

    //DELETE
    deleteLicenseByOwnerUserId,
    deleteProductByProductId,
    deletePublicBannedUserByIpAddress,
    deletePublicBannedUserByMacAddress,
    deleteUserByUserId,

    //UPDATE
    updateLicenseByOwnerUserId,
    updateProductByProductId,
    updatePublicBannedUserByUserId,
    updatePublicBannedUserByIpAddress,
    updatePublicBannedUserByMacAddress,
    updateUserByUserId
}