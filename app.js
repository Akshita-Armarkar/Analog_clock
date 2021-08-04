const secondHand=document.querySelector('.second-hand>.hand'),
    minuteHand=document.querySelector('.minute-hand'),
    hourHand=document.querySelector('.hour-hand');

const date=new Date();
const startdate=new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
);

function getTime(){
    const currentTime=Date.now();
    let difference=currentTime-startdate;
    let totalseconds=Math.floor(difference/1000);
    let hours=totalseconds/3600;
    let minutes=( totalseconds-(Math.floor(hours)*3600) ) / 60 ;
    let seconds= Math.floor( totalseconds - (Math.floor(minutes)*60) - (Math.floor(hours)*3600) ) ;
    updateHand(seconds,secondHand,6);
    updateHand(minutes,minuteHand,6);
    updateHand(hours,hourHand,30);
}

const defaultTransform='translate(-50%,-100%) '
function updateHand(time,hand,deg){
    setShadow(hand,time*deg);
    if(time===0){
        hand.style.transform=defaultTransform + `rotate(360deg)`;
        hand.dataset.completeRotation='done';
    }
    else if(hand.dataset.completeRotation==='done'){
        hand.style.transition='none';
        hand.style.transform=defaultTransform + `rotate(0deg)`;
        runNextFrame(function(){
            hand.style.transition=''; 
            hand.dataset.completeRotation='';
            hand.style.transform=defaultTransform + `rotate(${time*deg}deg)`;
        })
    }
    else hand.style.transform=defaultTransform + `rotate(${time*deg}deg)`;
}

function runNextFrame(callback){
    requestAnimationFrame(()=>{
        requestAnimationFrame(()=>{
            callback();
        })             
    })
}

const shadowPos=8;
function setShadow(hand,deg){
    const offsetX=Math.sin(deg*(Math.PI/180))*shadowPos;
    const offsetY=Math.cos(deg*(Math.PI/180))*shadowPos;
    hand.style.boxShadow=`${offsetX}px ${offsetY}px 4px 1px rgba(0,0,0,0.7)`;
}

setInterval(getTime,1000);
