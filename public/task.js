var start_time = []
var time_of_click = []
var cued = []
var times = [1000, 2000, 3000]
var left_or_right = [0,1]


function start(){
    var random_time1 = times[Math.floor(Math.random()*times.length)]
    var random_time2 = times[Math.floor(Math.random()*times.length)]
    var random_gaze = left_or_right[Math.floor(Math.random()*left_or_right.length)]
    var random_target = left_or_right[Math.floor(Math.random()*left_or_right.length)]
    cued.push( (random_gaze == random_target) ? true : false )

    task(random_gaze, random_time1, random_target, random_time2)
    
}

function stop(){
    time_of_click.push(new Date().getTime())
    console.log(time_of_click.slice(-1).pop() - start_time.slice(-1).pop())
    document.getElementById("images").style.display = "none";
    document.getElementById("click-sensor").style.display = "none";

    resetImages()

    document.getElementById("cross").style.display = "block";
    start()
}

function done(){
    document.getElementById("summary-container").style.display = "flex";
    document.getElementById("click-sensor").style.display = "none";
    document.getElementById("task-container").style.display = "none";
    
    resetImages()

    for (var i = 0 ; i < start_time.length ; i++){
        console.log(i)
        var result = ((time_of_click[i] - start_time[i]) * (1/100) )
        var resultDiv = document.createElement('div');
        resultDiv.setAttribute("id", "result");
        resultDiv.appendChild(document.createTextNode([i + 1] + ") " + (cued[i] ? "Cued " : "Uncued ")  + 
                                                       "      result: " + Math.round((result + Number.EPSILON) * 100) / 100 + "s"));  
        var text = document.getElementById('summary')
        text.appendChild(resultDiv);
    }
}

function restart(){
    location.reload();
}

function task(gaze_direction, gaze_time, target_location, target_time){
    document.getElementById("start-container").style.display = "none";
    document.getElementById("task-container").style.display = "flex";
    document.getElementById("cross").style.display = "block";

    sleep(gaze_time).then(() => {
        document.getElementById("cross").style.display = "none";
        document.getElementById("images").style.display = "flex";
        document.getElementsByClassName("picture")[gaze_direction].style.display = "block";
        sleep(target_time).then(() => {
            document.getElementsByClassName("target")[target_location].style.display = "block";
            document.getElementById("click-sensor").style.display = "block";
            start_time.push(new Date().getTime())
            console.log(start_time)
        })
    })
}

function resetImages(){
    var all_pictures = document.getElementsByClassName('picture');
    for (const picture of all_pictures) {
        picture.style.display = 'none';
    }

    var all_targets = document.getElementsByClassName('target');
    for (target of all_targets) {
        target.style.display = 'none';
    }
}

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }
