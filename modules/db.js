//REQUIRES
require("dotenv").config()
const {mongoose, connect: connect1} = require('mongoose')

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
function generateLicenseModel() {
    //TODO
}

function generateProductModel() {
    //TODO
}

function generatePublicBannedUserModel(userId, addAt, macAddress, ipAddress) {
    return new publicBannedUserData(userId, addAt, macAddress, ipAddress);
}

function generateShoppingCartModel() {
    //TODO
}

function generateUserModel(userId, username, email, passwordHash, lastLoginAt, registerAt, isAdmin) {
    return new userData(userId, username, email, passwordHash, lastLoginAt, registerAt, isAdmin);
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

async function getShoppingCartByUserId(ownerUserId) {
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

function deleteProductByProductId() {
    
}

function deletePublicBannedUserByUserId() {
    //TODO
}

function deletePublicBannedUserByIpAddress() {
    //TODO
}

function deletePublicBannedUserByMacAddress() {
    //TODO
}

function deleteShoppingCartByUserId() {
    //TODO
}

function deleteUserByUserId() {
    //TODO
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

function updateShoppingCartByUserId() {
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
    getShoppingCartByUserId,
    getUserByUserId,
    getUserByEmail,

    //DELETE
    deleteLicenseByOwnerUserId,
    deleteProductByProductId,
    deletePublicBannedUserByUserId,
    deletePublicBannedUserByIpAddress,
    deletePublicBannedUserByMacAddress,
    deleteShoppingCartByUserId,
    deleteUserByUserId,

    //UPDATE
    updateLicenseByOwnerUserId,
    updateLicenseByLicenseUuid,
    updateProductByProductId,
    updatePublicBannedUserByUserId,
    updatePublicBannedUserByIpAddress,
    updatePublicBannedUserByMacAddress,
    updateShoppingCartByUserId,
    updateUserByUserId
}