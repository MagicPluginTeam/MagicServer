//REQUIRES
require("dotenv").config()
const { mongoose, connect: connect1 } = require('mongoose')

//SCHEMAS
const licenseSchema = require("../schema/License.js")
const productSchema = require("../schema/Product.js")
const publicBannedUserSchema = require("../schema/PublicBannedUser.js")
const shoppingCartSchema = require("../schema/ShoppingCart.js")
const userSchema = require("../schema/User.js")

//DATA-MODELS
const licenseData = mongoose.model("licenseData", licenseSchema)
const productData = mongoose.model("productData", productSchema)
const publicBannedUserData = mongoose.model("publicBannedUser", publicBannedUserSchema)
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

//FUNCTIONS
function addLicense( ) {

}

module.exports = {
    connect
}