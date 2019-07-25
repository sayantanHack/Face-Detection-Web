import { accessSync } from "fs";

const video = document.getElementById('video');

promise.all([
    faceapi.nets.tnyFaceDetector.loadFromUri('/models'),
    faceapi.nets.tnyFaceLandmarkk68Net.loadFromUri('/models'),
    faceapi.nets.tnyFaceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.tnyFaceExpressionNet.loadFromUri('/models'),
    
]).then(startVideo)

function startVideo() {
    navigator.getUserMedia(
        {video : {} },
    stream => video.srcObject = stream,
    err => console.error(err)
  )
}

video.addEventListener('play', ()=>{
    const canvas = faceapi.createCanasFromMedia(video)
    document.body.append(canvas)
    const displaySize = {
        width: video.width, height: video.height
    }
    faceapi.matchDimensions(camera, displaySize)
    setInterval(async () => {
        const detections =await faceapi.detectAllFaces(video,
            new faceapi.tinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions()
            console.log(detections);
        const resizedDetections = faceapi.resizeResults(detections,displaySize)
        canvas.getContext('2d').clearReact(0, 0, canvas.width, canvas.height)
        faceapi.draw.drawDetections(canvas,resizedDetections)
        faceapi.draw.drawLandmarks(canvas,resizeDetections) 
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections)  
    }, 100)
})