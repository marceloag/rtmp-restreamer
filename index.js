const express = require('express')
bodyParser = require('body-parser')

const { spawn, exec } = require("child_process");
const app = express()
const port = 3030

app.use(bodyParser.urlencoded({ extended: true }))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.post('/', (req, res) => {
    console.log('Got body:', req.body)
    var igUrl = `"rtmps://live-upload.instagram.com:443/rtmp/${req.body.key}"`
      const child = spawn('ffmpeg', ['-rtbufsize','256M', '-re', '-i', req.body.URL, '-vf', '"scale=1080:-1:force_original_aspect_ratio=decrease,pad=1080:1920:(ow-iw)/2:(oh-ih)/2,setsar=1"', '-c:a', 'aac', '-ar', '44100', '-b:a', '128k', '-pix_fmt', 'yuv420p', '-profile:v', 'baseline', '-bufsize', '6000k', '-vb', '400k', '-maxrate', '1500k', '-deinterlace', '-vcodec', 'libx264', '-preset', 'veryfast', '-g', '30', '-r', '30', '-f', 'flv', igUrl], {shell: true});

      // const child = spawn('ffmpeg', ['-rtbufsize','256M', '-re', '-i' , 'bg.jpeg', '-i', req.body.URL,'-filter_complex', '"[0:v]scale=1080:-2[bg];[bg][1:v]overlay=(main_w-overlay_w)/2:(main_h-overlay_h)/2"', '-c:a', 'aac', '-ar', '44100', '-b:a', '96k', '-pix_fmt', 'yuv420p', '-profile:v', 'baseline', '-s', '720x1280', '-bufsize', '6000k', '-vb', '400k', '-maxrate', '1500k', '-deinterlace', '-vcodec', 'libx264', '-preset', 'slower', '-g', '30', '-r', '30', '-f', 'flv', igUrl], {shell: true});

      child.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
      });
        
      child.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
      });
        
      child.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
      });
    res.send('Streaming...');
});

app.use('/', express.static(__dirname + '/public'));
