//REQUIRES
require("dotenv").config();
const {mongoose, connect: connect1} = require("mongoose");

//SCHEMAS
const licenseSchema = require("../schema/license.js");
const productSchema = require("../schema/product.js");
const publicBannedUserSchema = require("../schema/publicBannedUser.js");
const shoppingCartSchema = require("../schema/shoppingCart.js");
const userSchema = require("../schema/User.js");
const redirectSchema = require("../schema/redirect.js");

//DATA-MODELS
const licenseData = mongoose.model("licenseData", licenseSchema);
const productData = mongoose.model("productData", productSchema);
const publicBannedUserData = mongoose.model("publicBannedUserData", publicBannedUserSchema);
const shoppingCartData = mongoose.model("shoppingCarsData", shoppingCartSchema);
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
        items: null
    });
}

function generateProductModel(productId, title, description, tag, price, thumbnailImageURL, productImageURL) {
    return new productData({
        productId: productId,
        title: title,
        description: description,
        tag: tag,
        price: price,
        createAt: Date.now(), 
        lastUpdateAt: Date.now(),
        thumbnailImage: thumbnailImageURL,
        productImage: productImageURL,
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

function generateShoppingCartModel(ownerUserId) {
    return new shoppingCartData({
        ownerUserId: ownerUserId,
        items: null
    });
}

function generateUserModel(userId, username, email, passwordHash, lastLoginAt, registerAt, isAdmin) {
    return new userData({
        userId: userId,
        username: username,
        email: email,
        passwordHash: passwordHash,
        lastLoginAt: lastLoginAt,
        registerAt: registerAt,
        isAdmin: isAdmin
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

async function getProductByproductId(productId) {
    return await productData.findOne({ productId: productId }).exec();
}

async function getProductsByTitle(title) {
    return await productData.fine({ title: title }).exec();
}

async function getPublicBannedUsers() {
    return await publicBannedUserData.find({});
}

async function getShoppingCartByOwnerUserId(ownerUserId) {
    return await shoppingCartData.find({ ownerUserId: ownerUserId });
}

async function getUserByUserId(userId) {
    return await userData.findOne({ userId: userId }).exec();
}

async function getUserByUsername(username) {
    return await userData.find({ username: username }).exec();
}

async function getUserByEmail(email) {
    return await userData.find({ email: email }).exec();
}

async function getRedirectByDirectCode(directCode) {
    return await redirectData.findOne({ directCode: directCode }).exec();
}

//FUNCTIONS - DELETE
async function deleteLicenseByOwnerUserId(ownerUserId) {
    await licenseData.findOneAndDelete({ ownerUserId: ownerUserId });
}

async function deleteProductByProductId(productId) {
    await productData.findOneAndDelete({ productId: productId });
}

async function deletePublicBannedUserByIpAddress(ipAddress) {
    await publicBannedUserData.findOneAndDelete({ ipAddress: ipAddress });
}

async function deletePublicBannedUserByMacAddress(macAddress) {
    await publicBannedUserData.findOneAndDelete({ macAddress: macAddress });
}

async function deleteShoppingCartByOwnerUserId(ownerUserId) {
    await shoppingCartData.findOneAndDelete({ ownerUserId: ownerUserId });
}

async function deleteUserByUserId(userId) {
    await userData.findOneAndDelete({ userId: userId });
}

//FUNCTIONS - UPDATE
function updateLicenseByOwnerUserId() {
    //TODO
}

function updateLicenseByLicenseUuid() {
    //TODO
}

function updateProductByProductId() {
    //TODO
}

function updatePublicBannedUserByUserId() {
    //TODO
}

function updatePublicBannedUserByIpAddress() {
    //TODO
}

function updatePublicBannedUserByMacAddress() {
    //TODO
}

function updateShoppingCartByOwnerUserId() {
    //TODO
}

function updateUserByUserId() {
    //TODO
}

module.exports = {
    connect,

    //GENERATE
    generateLicenseModel,
    generateProductModel,
    generatePublicBannedUserModel,
    generateShoppingCartModel,
    generateUserModel,
    generateRedirectModel,

    //GET
    getLicenseByOwnerUserId,
    getProductByproductId,
    getProductsByTitle,
    getPublicBannedUsers,
    getShoppingCartByOwnerUserId,
    getUserByUserId,
    getUserByUsername,
    getUserByEmail,
    getRedirectByDirectCode,

    //DELETE
    deleteLicenseByOwnerUserId,
    deleteProductByProductId,
    deletePublicBannedUserByIpAddress,
    deletePublicBannedUserByMacAddress,
    deleteShoppingCartByOwnerUserId,
    deleteUserByUserId,

    //UPDATE
    updateLicenseByOwnerUserId,
    updateLicenseByLicenseUuid,
    updateProductByProductId,
    updatePublicBannedUserByUserId,
    updatePublicBannedUserByIpAddress,
    updatePublicBannedUserByMacAddress,
    updateShoppingCartByOwnerUserId,
    updateUserByUserId
}