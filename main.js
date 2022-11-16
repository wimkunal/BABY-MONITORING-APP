
status = "";

//defining an array variable
objects = [];

 song = "";
function preload() {
    song = loadSound("new_years_song.mp3");
  }

function setup(){
    canvas = createCanvas( 380 , 380);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
     
    //initializing cocossd model
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML  =  "Status : Detecting Objects";
   // document.getElementById("status2").innerHTML  =  "Status : Baby found";
}

function modelLoaded(){
    console.log("Model is loaded");
     status = true;

   //objectDetector.detect(img , gotResults);
}

function gotResults(error , results){
    if (error) {
       console.log(error);

    } 
    else {
       console.log(results);
       objects = results;
    }
}

function draw(){
  
    image(video , 0 , 0 , 380 , 380);

    if (status != "") {

        r = random(255);
        g = random(255);
        b = random(255);

        objectDetector.detect(video , gotResults);

        for (i = 0; i < objects.length; i++) {
          document.getElementById("status").innerHTML = "Status : Object detected";
         
         // document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : " + objects.length;

             fill (r,g,b);
             percent = floor(objects[i].confidence * 100);

             text (objects[i].label + " " +  percent + "%" , objects[i].x + 15, objects[i].y + 15 , 100, 100);
             textSize(20);
          
             noFill ();
             stroke (r,g,b);
             rect ( objects[i].x , objects[i].y , objects[i].width, objects[i].height ); 

             if(objects[i].label == "person"){
                document.getElementById("status2").innerHTML  =  "Status :Baby found";
                song.stop();
             }
             else{
                document.getElementById("status2").innerHTML = "Status : Baby not found";
                song.play();
            }
             
        }
        if(objects.length == 0){
            document.getElementById("status2").innerHTML = "Status : Baby not found";
            song.play();
        }
    } 
    
        
    
}


