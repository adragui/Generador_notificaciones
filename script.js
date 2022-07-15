//Declaramos las variables
const inputStartDate = document.getElementById("initial_date")
const inputEndDate = document.getElementById("end_date")
const submitBtn = document.getElementById("submit_btn")
const daysResult = document.getElementById("daysresult")

//
submitBtn.addEventListener("click", function () {
    let initialDate = new Date(inputStartDate.value)
    let finalDate = new Date(inputEndDate.value)
    let initialYear = initialDate.getUTCFullYear()
    let finalYear = finalDate.getUTCFullYear()
    let yearList = []
    let countedDays = []
    let daysDictionary = {}
    let sustractDict = {}
  
    for (let i = initialYear; i <= finalYear; i++) {
        yearList.push(i)
    }
  
    for (let i = 0; i < yearList.length; i++) {
    countedDays.push(calcDiffDays(new Date(`${yearList[i]}-01-01`), new Date(`${yearList[i]}-12-31`))+1)
    }
  
    yearList.forEach((key, i) => daysDictionary[key] = countedDays[i])

    let firstyearElapsed = calcDiffDays(new Date(`${initialYear}-01-01`),initialDate)
    let lastYearElapsed = calcDiffDays(finalDate, new Date(`${finalYear}-12-31`))
    if (yearList.includes(2020)) {
        suspendedDays2020 = calcDiffDays(new Date('2020-03-15'), new Date('2020-12-31'))
    } else {
        suspendedDays2020 = 0
    }
    if (yearList.includes(2021)) {
        suspendedDays2021 = calcDiffDays(new Date('2021-01-01'), new Date('2021-08-19'))
    } else {
        suspendedDays2021 = 0
    }

    if (initialYear === finalYear && initialYear === 2020) {
        sustractDict = {
                2020 : -suspendedDays2020-firstyearElapsed-1
            }
        } else if (initialYear === finalYear && initialYear === 2021){
            sustractDict = {
                2021 : -suspendedDays2021-lastYearElapsed-1
            }
        } else if (initialYear === 2020 && finalYear === 2021) {
            sustractDict = {
                2020 : -suspendedDays2020-firstyearElapsed-1,
                2021 : -suspendedDays2021-lastYearElapsed-1 
            } } else {
            sustractDict = {
                [initialYear] : -firstyearElapsed-1,
                2020 :  -suspendedDays2020,
                2021 : -suspendedDays2021,
                [finalYear] : -lastYearElapsed-1
            }
    }
    let finalCountedDays = []
    for (let i = 0; i < yearList.length; i++) {
        finalCountedDays.push(daysDictionary[yearList[i]])
        if (sustractDict[yearList[i]]) {
            finalCountedDays.push(sustractDict[yearList[i]])
        } else {
            
        }
    }

    const sum = finalCountedDays.reduce((partialSum, a) => partialSum + a, 0);
    daysResult.textContent = sum
    console.log(sum)
})
                           
function calcDiffDays(startDate, endDate) {
    let diffDays = endDate.getTime() - startDate.getTime()
    return Math.ceil(diffDays / (1000 * 3600 * 24));
}
