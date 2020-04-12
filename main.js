let payment = document.getElementById('paymentButton')

payment.addEventListener('click', (e)=>{
    let images = document.createElement('img')
    images.src = '/pay'
    images.onload = function(){
        alert('付款成功')
        amount.innerText = amount.innerText - 1
    }
    images.onerror = function(){
        alert('付款失败')
    }
})