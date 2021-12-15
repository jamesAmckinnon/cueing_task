var start_time = []
var time_of_click = []
var cued = []
var times = [1000, 2000, 3000] // 1, 2 and 3 seconds
var left_or_right = [0, 1] // left and right


function start(){
    // random times between image appearance and target appearance
    var random_time1 = times[Math.floor(Math.random()*times.length)]
    var random_time2 = times[Math.floor(Math.random()*times.length)]
    // randomly chooses direction of gaze and location of target
    var random_gaze = left_or_right[Math.floor(Math.random()*left_or_right.length)]
    var random_target = left_or_right[Math.floor(Math.random()*left_or_right.length)]
    cued.push( (random_gaze == random_target) ? true : false ) // was the gaze/target cued?

    task(random_gaze, random_time1, random_target, random_time2) // start task
    
}


function task(gaze_direction, gaze_time, target_location, target_time){
    document.getElementById("start-container").style.display = "none";
    document.getElementById("task-container").style.display = "flex";
    document.getElementById("cross").style.display = "flex";

    // wait time between cross appearance and image appearance
    wait(gaze_time).then(() => {
        document.getElementById("cross").style.display = "none";
        document.getElementById("images").style.display = "flex";
        document.getElementsByClassName("picture")[gaze_direction].style.display = "block";
        // wait time between image appearance and target icon appearance
        wait(target_time).then(() => {
            document.getElementsByClassName("target")[target_location].style.display = "block";
            document.getElementById("click-sensor").style.display = "block";
            start_time.push(new Date().getTime())
        })
    })
}


// this runs when the screen is clicked after the target appears on screen
function stop(){
    time_of_click.push(new Date().getTime())
    document.getElementById("images").style.display = "none";
    document.getElementById("click-sensor").style.display = "none";

    resetImages()

    document.getElementById("cross").style.display = "flex";
    start()
}


// this runs when the done button is clicked
function done(){
    document.getElementById("summary-container").style.display = "flex";
    document.getElementById("click-sensor").style.display = "none";
    document.getElementById("task-container").style.display = "none";
     
    resetImages()

    // this inserts the results into divs when the cueing task is complete
    for (var i = 0 ; i < time_of_click.length ; i++){
        var result = ((time_of_click[i] - start_time[i]) * (1/1000) )
        var resultDiv = document.createElement('div');
        resultDiv.setAttribute("id", "result");
        resultDiv.appendChild(document.createTextNode([i + 1] + ") " + (cued[i] ? "Cued " : "Uncued ")  + 
                                                       "      result: " + Math.round((result + Number.EPSILON) * 1000) / 1000 + "s"));  
        var text = document.getElementById('summary')
        text.appendChild(resultDiv);
    }
}


// restarts program by refreshing browser
function restart(){
    location.reload();
}


// this hides previously revealed images
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


const wait = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}
