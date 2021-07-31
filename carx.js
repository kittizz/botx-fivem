function changeWrench(target) {
    wrenchWrap.style.backgroundColor = "black"
    wrenchWrap.innerHTML = target
    if (target >= 95) {
        wrenchWrap.style.color = "#219c31"
    } else if (target >= 90) {
        wrenchWrap.style.color = "#6e9900"
    } else if (target >= 80) {
        wrenchWrap.style.color = "#999900"
    } else if (target >= 70) {
        wrenchWrap.style.color = "#998c00"
    } else if (target >= 60) {
        wrenchWrap.style.color = "#997500"
    } else if (target >= 50) {
        wrenchWrap.style.color = "#995c00"
    } else if (target >= 40) {
        wrenchWrap.style.color = "#994700"
    } else if (target >= 30) {
        wrenchWrap.style.color = "#993000"
    } else if (target >= 20) {
        wrenchWrap.style.color = "#990000"
    } else if (target >= 10) {
        wrenchWrap.style.color = ""
    }
}
function logKey(e) {
    if (e.code == "End") {
        function changeWrench(target) {
            wrenchWrap.style.backgroundColor = ""
            wrenchWrap.innerHTML = ""
            if (target >= 95) {
                wrenchWrap.style.color = "#219c31"
            } else if (target >= 90) {
                wrenchWrap.style.color = "#6e9900"
            } else if (target >= 80) {
                wrenchWrap.style.color = "#999900"
            } else if (target >= 70) {
                wrenchWrap.style.color = "#998c00"
            } else if (target >= 60) {
                wrenchWrap.style.color = "#997500"
            } else if (target >= 50) {
                wrenchWrap.style.color = "#995c00"
            } else if (target >= 40) {
                wrenchWrap.style.color = "#994700"
            } else if (target >= 30) {
                wrenchWrap.style.color = "#993000"
            } else if (target >= 20) {
                wrenchWrap.style.color = "#990000"
            } else if (target >= 10) {
                wrenchWrap.style.color = ""
            }
        }
    }
}
document.addEventListener("keypress", logKey)
