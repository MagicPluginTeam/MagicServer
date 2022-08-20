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

        console.log('Connected to DB')
    } catch (err) {
        console.log(`Error on DB connection: ${err}`)
    }
}

//FUNCTIONS - GENERATE
function generateLicenseModel() {
    //TODO
}

function generateProductModel() {
    //TODO
}

function generatePublicBannedUserModel() {
    //TODO
}

function generateShoppingCartModel() {
    //TODO
}

function generateUserModel() {
    //TODO
}

//FUNCTIONS - GET
function getLicenseByOwnerUserId() {
    //TODO
}

function getLicenseByLicenseUuid() {
    //TODO
}

function getProductByproductId() {
    //TODO
}

function getProductsByTitle() {
    //TODO
}

function getPublicBannedUsers() {
    //TODO
}

function getShoppingCartByUserId() {
    //TODO
}

function getUserByUserId() {
    //TODO
}

function getUserByUserName() {
    //TODO
}

function getUserByEmail() {
    //TODO
}

//FUNCTIONS - DELETE

function deleteLicenseByOwnerUserId() {
    //TODO
}

function deleteLicenseByLicenseUuid() {
    //TODO
}

function deleteProductByProductId() {
    //TODO
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

//ETC


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
    getLicenseByLicenseUuid,
    getProductByproductId,
    getProductsByTitle,
    getPublicBannedUsers,
    getShoppingCartByUserId,
    getUserByUserId,
    getUserByUserName,
    getUserByEmail,

    //DELETE
    deleteLicenseByOwnerUserId,
    deleteLicenseByLicenseUuid,
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