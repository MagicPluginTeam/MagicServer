jQuery(document).ready(function($) {
    $('.payment-creditcard').hide()
    $('.payment-paypal').hide()
    $('.creditcard').click(function() {
        $('.payment-paypal').hide()
        $('.payment-creditcard').show(300)
    })
    $('.paypal').click(function() {
        $('.payment-creditcard').hide()
        $('.payment-paypal').show(300)
    })
})