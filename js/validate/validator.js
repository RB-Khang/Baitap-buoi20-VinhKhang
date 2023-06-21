function lengthTest(idTest, min, max, selector, errMess) {
    var idTest = getID(idTest)
    if (idTest.value.trim().length < min || idTest.value.trim().length > Number(max)) {
        getID(selector).style.display = 'inline-block'
        getID(selector).innerHTML = errMess
        isValid = false
        return false
    } else {
        getID(selector).style.display = 'none'
        return true
    }

}



function patternTest(idTest, selector, pattern, messErr) {
    var idTest = getID(idTest).value
    if (!pattern.test(idTest)) {
        getID(selector).style.display = 'inline-block'
        getID(selector).innerHTML = messErr
        isValid = false
        return false
    } else {
        getID(selector).style.display = 'none'
        return true
    }
}