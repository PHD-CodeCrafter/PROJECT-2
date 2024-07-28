document.addEventListener("DOMContentLoaded", () => {
    var sum = 0
    var seconds = JSON.parse(localStorage.getItem("seconds"))
    var minutes = 0
    var hours = 0
    var attempts = 0
    var game_start = localStorage.getItem("start")
    var numbers =[]

    

    document.getElementById("start").onclick = ()=>{
        document.querySelector("table").style.display = "block"
        document.getElementById("intro").style.display = "none"
        document.querySelector("input").disabled = false
        document.getElementById("check").disabled = false
        localStorage.setItem("start", "yes")
        
    }


    if (localStorage.getItem("data") == null){
        for (let i = 0; i<25; i++){
            let number_list = []
            for (let n = 0; n<25; n++){
                number = Math.floor(Math.random()*10)
                
              
                number_list.push(number)
            }
            numbers.push(number_list)
        }
        localStorage.setItem("data", JSON.stringify(numbers))
    }

  
    numbers = JSON.parse(localStorage.getItem("data"))

    for (let i = 0; i<25; i++){
    
        for (let n = 0; n<25; n++){
            document.getElementById("row-"+(i+1).toString()+"-col-"+(n+1).toString()).innerHTML = numbers[i][n]
            sum = sum + numbers[i][n]
        }
    }


    
    if (localStorage.getItem("start") == "yes"){
        document.querySelector("table").style.display = "block"
        document.getElementById("intro").style.display = "none"
        document.querySelector("input").disabled = false
        document.getElementById("check").disabled = false
    }

    var stopwatch = setInterval(()=>{
        if (localStorage.getItem("start") == "yes"){
            
            if (localStorage.getItem("seconds") == null){
                seconds = 0
            }
            seconds += 1
            localStorage.setItem("seconds", JSON.stringify(seconds))
            minutes = Math.floor(seconds / 60)
            hours = Math.floor(minutes/60)
            let seconds_display = seconds - minutes*60
            let minutes_display = minutes - hours*60

            if (seconds_display < 10){
                document.getElementById("second").innerHTML = "0"+seconds_display.toString()
            }
            else {
                document.getElementById("second").innerHTML = seconds_display
            }

            if (minutes_display < 10){
                document.getElementById("minute").innerHTML = "0"+minutes_display.toString()
            }
            else {
                document.getElementById("minute").innerHTML = minutes_display
            }

            if (hours < 10){
                document.getElementById("hour").innerHTML = "0"+hours.toString()
            }
            else {
                document.getElementById("hour").innerHTML = hours
            }
        }
    },1000)

    


    document.querySelector("input").addEventListener("keypress", function(event){
        if (event.key == 'Enter'){
            document.querySelector("#check").click()

        }
    })

    document.getElementById("menyerah").onclick = () => {
        document.getElementById("result").innerHTML = "The correct answer is <br> " + sum
        document.getElementById("result").style.color = "red"
        document.getElementById("lagi").style.display = "block"
        document.getElementById("menyerah").style.display = "none"
        sss
        localStorage.removeItem("start")
        clearInterval(stopwatch)
        
    }
    
    document.querySelector("#check").onclick = () => {
    if (document.querySelector("input").value != ""){
        if (document.querySelector("input").value == sum){
            document.getElementById("lagi").style.display = "block"
            document.querySelector("input").disabled = true
            document.getElementById("check").disabled = true
            localStorage.removeItem("start")
            clearInterval(stopwatch)
            if(minutes < 5){
                document.getElementById("result").innerHTML = "You're cheating"
                document.getElementById("result").style.color = "yellow"
            }
            else{
                document.getElementById("result").innerHTML = "TRUE <br> the answer is " + sum 
                document.getElementById("result").style.color = "green"
            }
            
            localStorage.removeItem("data")

        }
        else {
            attempts += 1
            document.getElementById("result").innerHTML = "WRONG"
            document.getElementById("result").style.color = "red"
        
            if (attempts == 3){
                document.getElementById("menyerah").style.display = "block"
            }
        }   

        document.querySelector("input").value = ""
    }
    else{
        document.getElementById("result").innerHTML = "Please fill in first :)"
        document.getElementById("result").style.color = "yellow"
    }
        
    }

    document.getElementById("lagi").onclick = () =>{
        localStorage.removeItem("seconds")
        location.reload()
    }
    
})