//REQUIRES
require("dotenv").config()
const {mongoose, connect: connect1} = require("mongoose")

//SCHEMAS
const licenseSchema = require("../schema/License.js")
const productSchema = require("../schema/Product.js")
const publicBannedUserSchema = require("../schema/PublicBannedUser.js")
const shoppingCartSchema = require("../schema/ShoppingCart.js")
const userSchema = require("../schema/User.js")

//DATA-MODELS
const licenseData = mongoose.model("licenseData", licenseSchema)
const productData = mongoose.model("productData", productSchema)
const publicBannedUserData = mongoose.model("publicBannedUserData", publicBannedUserSchema)
const shoppingCartData = mongoose.model("shoppingCarsData", shoppingCartSchema)
const userData = mongoose.model("userData", userSchema)

//SETUP FUNCTION
async function connect() {
    const url = process.env.DB

    try {
        await connect1(url)

        console.log("Connected to DB")
    } catch (err) {
        console.log("Error on DB connection: " + err)
    }
}

//FUNCTIONS - GENERATE
function generateLicenseModel(ownerUserId) {
    return new licenseSchema(ownerUserId, null);
}

function generateProductModel(productId, title, description, tag, price, thumbnailImageURL, productImageURL) {
    return new productSchema(productId, title, description, tag, price, Date.now(), Date.now(), false, thumbnailImageURL, productImageURL, 0);
}

function generatePublicBannedUserModel(userId, addAt, macAddress, ipAddress) {
    return new publicBannedUserSchema(userId, addAt, macAddress, ipAddress);
}

function generateShoppingCartModel(ownerUserId) {
    return new shoppingCartSchema(ownerUserId, null);
}

function generateUserModel(userId, username, email, passwordHash, lastLoginAt, registerAt, isAdmin) {
    return new userSchema(userId, username, email, passwordHash, lastLoginAt, registerAt, isAdmin);
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

//FUNCTIONS - DELETE
function deleteLicenseByOwnerUserId(ownerUserId) {
    licenseData.findOneAndDelete({ ownerUserId: ownerUserId });
}

function deleteProductByProductId(productId) {
    productData.findOneAndDelete({ productId: productId });
}

function deletePublicBannedUserByIpAddress(ipAddress) {
    publicBannedUserData.findOneAndDelete({ ipAddress: ipAddress });
}

function deletePublicBannedUserByMacAddress(macAddress) {
    publicBannedUserData.findOneAndDelete({ macAddress: macAddress });
}

function deleteShoppingCartByOwnerUserId(ownerUserId) {
    shoppingCartData.findOneAndDelete({ ownerUserId: ownerUserId });
}

function deleteUserByUserId(userId) {
    userData.findOneAndDelete({ userId: userId });
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

    //GET
    getLicenseByOwnerUserId,
    getProductByproductId,
    getProductsByTitle,
    getPublicBannedUsers,
    getShoppingCartByOwnerUserId,
    getUserByUserId,
    getUserByUsername,
    getUserByEmail,

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