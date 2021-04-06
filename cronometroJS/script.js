'use strict'

var h = 0
var m = 0
var s = 0

var tempo = 1000 // Equivale a 1 segundo
var cron

function start(){
    cron = setInterval(() => {timer()}, tempo)
    document.getElementById('start').disabled = true
}
function pause(){
    clearInterval(cron)
    document.getElementById('start').disabled = false
}
function parar(){
    clearInterval(cron)
    h = 0
    m = 0
    s = 0
    document.getElementById('cont').innerText = '00:00:00'
    document.getElementById('start').disabled = false
}
function timer(){
    s++
    if(s == 60){
        s = 0
        m++
        if(m == 60){
            m = 0
            h++
        }
    }

    var format = (h < 10 ? '0'+h : h) + ':' + (m < 10 ? '0'+m : m) + ':' + (s < 10 ? '0'+s : s)
    document.getElementById('cont').innerText = format
}