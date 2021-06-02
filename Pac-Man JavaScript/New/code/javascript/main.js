// "Made by Haki Malai animation"
intro = {
    myName : document.getElementById('MyName'),
    top : $(window).height()/2 - 40,
    left : $(window).width()/2 - 370,
    madeBy : document.getElementById('MadeBy'),
    h : document.getElementById('H'),
    a : document.getElementById('A'),
    k : document.getElementById('K'),
    i : document.getElementById('I'),
    m : document.getElementById('M'),
    a2 : document.getElementById('A2'),
    l : document.getElementById('L'),
    a3 : document.getElementById('A3'),
    i2 : document.getElementById('I2'),
    pac : document.getElementById('Pac'),
    dash : document.getElementById('Dash'),
    man : document.getElementById('Man'),
    start : document.getElementById('Start'),
    options : document.getElementById('Options'),
    exit : document.getElementById('Exit'),
    t : document.getElementById('T'),
    io : document.getElementById('IO'),
    x : document.getElementById('X'),
    show(){
        this.myName.style.opacity = '100%'
        this.myName.style.top = this.top + "px"
        this.myName.style.left = this.left + "px"
    },
    go(){
        this.madeBy.style.animation = "WelcomeMadeBy 1s 1"
        this.h.style.animation = "WelcomeH 1.2s 1"
        this.a.style.animation = "WelcomeA 1.1s 1"
        this.k.style.animation = "WelcomeH 0.9s 1"
        this.i.style.animation = "WelcomeA 1.5s 1"
        this.m.style.animation = "WelcomeH 1.4s 1"
        this.a2.style.animation = "WelcomeA 1.3s 1"
        this.l.style.animation = "WelcomeH 1.6s 1"
        this.a3.style.animation = "WelcomeA 0.8s 1"
        this.i2.style.animation = "WelcomeH 1.7s 1"
    },
    bye(){
        this.h.style.animation = "ByeH 1.8s 0.5s 1"
        this.a.style.animation = "ByeA 1.9s 0.5s 1"
        this.k.style.animation = "ByeH 1.7s 0.5s 1"
        this.i.style.animation = "ByeA 2.3s 0.5s 1"
        this.m.style.animation = "ByeH 2.1s 0.5s 1"
        this.a2.style.animation = "ByeA 1.8s 0.5s 1"
        this.l.style.animation = "ByeH 1.8s 0.5s 1"
        this.a3.style.animation = "ByeA 1.7s 0.5s 1"
        this.i2.style.animation = "ByeH 1.6s 0.5s 1"
        this.madeBy.style.animation = "ByeMadeBy 1.6s 0.5s 1"
    },
    hide(){
        this.myName.style.opacity = '0%'
    }
}