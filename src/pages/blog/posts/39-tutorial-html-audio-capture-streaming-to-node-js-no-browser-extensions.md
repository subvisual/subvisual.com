---
id: 39
path: /posts/39-tutorial-html-audio-capture-streaming-to-node-js-no-browser-extensions/
title: "Tutorial: HTML Audio Capture streaming to Node.js (no browser extensions)"
author: gabriel-poca
date: 2014-06-24
tags:
  - development
intro: "I'm taking the time to write the tutorial I wish I had some months ago. My task was to set up some user voice recording mechanism in the browser. It should record for about one hour, non-stop, saving to a server. The idea was to use the [getUserMedia()][getusermedia] API. No browser extensions should be used."
---

I'm taking the time to write the tutorial I wish I had some months ago. My task was to set up some user voice recording mechanism in the browser. It should record for about one hour, non-stop, saving to a server. The idea was to use the [getUserMedia()][getusermedia] API. No browser extensions should be used.

The [getUserMedia()][getusermedia] API allows web apps to request access to a media device such as a camera or microphone. It yields raw PCM data.

### Round One

We approached the task looking for the smallest change that solved the problem. We did it using [RecordRTC][recordrtc]. It records the microphone in the browser. When finished, we can upload it to a server through a normal request. Let me show you how it works.

Add the RecordRTC library.

```html
<script src="//www.WebRTC-Experiment.com/RecordRTC.js"></script>
```

Request access to the microphone.

```javascript
var session = {
  audio: true,
  video: false
};
var recordRTC = null;
navigator.getUserMedia(session, function (mediaStream) {
  recordRTC = RecordRTC(MediaStream);
  recordRTC.startRecording();
}, onError);
```

When finished recording, stop and upload to a server.

```javascript
recordRTC.stopRecording(function(audioURL) {
  var formData = new FormData();
  formData.append('edition[audio]', recordRTC.getBlob())
  $.ajax({
    type: 'POST',
    url: 'some/path',
    data: formData,
    contentType: false,
    cache: false,
    processData: false,
  })
});
```

The code works, but you shouldn't write code like this, it's just an example.

#### Drawbacks

Audio is recorded in wav format. An one hour recording, with one channel, can take around 500mb. This is a problem for the browser limited memory. Also the upload would take ages! It wasn't working.

### Round Two

After reading the source code from [RecordRTC][recordrtc] (ugly) and [RecorderJS][recorderjs], I realised that using a [ScriptProcessorNode](https://developer.mozilla.org/en-US/docs/Web/API/ScriptProcessorNode) I can write JavaScript to send data chunks (audio samples) from the microphone to a server.

Turns out it's harder than it seems, mostly because of the lack of information. There are a couple of related Stack Overflow answers (I will add them in the end), but I won't bother you with this. Let's move on to the code.

#### Reading data from the microphone

First request microphone access.

```javascript
var session = {
  audio: true,
  video: false
};
var recordRTC = null;
navigator.getUserMedia(session, initializeRecorder, onError);
```

Having the microphone stream you can use the [AudioContext][audiocontext] interface to make the audio (PCM data) go through different processing nodes before reaching its destination. There are nodes for gain, compressor, panner, and much more. We are going to write a custom node, so we can access the audio samples. For that we add a [ScriptProcessorNode](https://developer.mozilla.org/en-US/docs/Web/API/ScriptProcessorNode).

```javascript
function initializeRecorder(stream) {
  var audioContext = window.AudioContext;
  var context = new audioContext();
  var audioInput = context.createMediaStreamSource(stream);
  var bufferSize = 2048;
  // create a javascript node
  var recorder = context.createJavaScriptNode(bufferSize, 1, 1);
  // specify the processing function
  recorder.onaudioprocess = recorderProcess;
  // connect stream to our recorder
  audioInput.connect(recorder);
  // connect our recorder to the previous destination
  recorder.connect(context.destination);
}
```

After this, every audio sample will go through the `recorderProcess` function.

```javascript
function recorderProcess(e) {
  var left = e.inputBuffer.getChannelData(0);
}
```

We have now PCM data samples from the left channel. Since we are recording in mono we only need the left channel. Now moving on to streaming these chunks to the server.

#### Communication

We are using WebSockets to send the samples to the server. The server is going to be written in Node.js.

I started with [Socket.IO][socketio]. When things didn't work I realised Socket.IO doesn't support binary communication (in fact, it does now, I made this before it did). [BinaryJS][binaryjs] does support binary communication, so I moved to it.

##### Setup BinaryJS

First add the BinaryJS library.

```html
<script src="https://cdn.binaryjs.com/0/binary.js"></script>
```

Now start a connection.

```javascript
var client = new BinaryClient('ws://localhost:9001');
```

When ready, create a write stream.

```javascript
client.on('open', function() {
  // for the sake of this example let's put the stream in the window
  window.Stream = client.createStream();
}
```

Going back to our custom node let's send the audio to the stream.

```javascript
function recorderProcess(e) {
  var left = e.inputBuffer.getChannelData(0);
  window.Stream.write(left);
}
```

Everything should be ready on the client side now. Our `recorderProcess` function is called for each audio chunk, and each is sent to the server.

But we aren't ready yet! There is one important step missing. WebAudio samples are in Float32. If you choose to send them like this you need to know that [endianness does matter](https://developer.mozilla.org/en-US/docs/Web/API/Uint16Array). I chose to convert them to 16 bit signed integers:

```javascript
function convertFloat32ToInt16(buffer) {
  l = buffer.length;
  buf = new Int16Array(l);
  while (l--) {
    buf[l] = Math.min(1, buffer[l])*0x7FFF;
  }
  return buf.buffer;
}

function recorderProcess(e) {
  var left = e.inputBuffer.getChannelData(0);
  window.Stream.write(convertFloat32ToInt16(left));
}
```

We are now done with the client code. Moving on to the server.

#### Setting up a server

I'm not getting into much detail on the server, I'm just going to show how to put these chunks in a playable media file. I'm assuming you already have [Node.js][nodejs] installed. 

We need [BinaryJS][binaryjs], and [node-wav][nodewav] on the server. The first is for communication, and the second accepts raw audio data and outputs a WAV file with a valid WAVE header.

```bash
npm init
npm install binaryjs
npm install wav
```

Now create the `index.js` file and start the BinaryJS server.

```javascript
var binaryServer = require('binaryjs').BinaryServer;
var wav = require('wav');

var server = binaryServer({port: 9001});

server.on('connection', function(client) {
  ...
});
```

Inside the `server.on('connection', function)` callback node-wav is going to help pipe the stream into a file.

```javascript
var fileWriter = null;

client.on('stream', function(stream, meta) {
  var fileWriter = new wav.FileWriter('demo.wav', {
    channels: 1,
    sampleRate: 48000,
    bitDepth: 16
  });
  stream.pipe(fileWriter);
  stream.on('end', function() {
    fileWriter.end();
  });
});

client.on('close', function() {
  if (fileWriter != null) {
    fileWriter.end();
  }
});
```

For a better understanding you should read [node-wav][nodewav] document. In fact, you should read the source code since there isn't much documentation. Simply put, `wav.FileWriter` accepts a pcm stream and sends it to a media file, setting the right header for the file.

Notice the settings for `wav.FileWriter` are hardcoded, but they can be sent through the stream. Parameters like sample rate change for each client.

### Setup complete

You are ready to start recording. There is still a long way to go from here. You should probably support restoring the connection if it goes down, and append the audio to the same media.

## Wrap it up

You can now start from here and build your own platform with audio recording. Maybe a personal note-taking platform.

This solution allows you to record the microphone while not worrying about upload time and audio loss. The full source code is [here](https://github.com/gabrielpoca/browser-pcm-stream). Feel free to leave any questions and comments.

#### StackOverflow related answers

* [Sound card detection for web](https://stackoverflow.com/questions/21079972/sound-card-detection-for-web/21080953#21080953)
* [Playing PCM stream from Web Audio API on Node.js](https://stackoverflow.com/questions/20876152/playing-pcm-stream-from-web-audio-api-on-node-js)
* [Stream recorded audio from browser to server](https://stackoverflow.com/questions/20850396/stream-recorded-audio-from-browser-to-server)

[nodejs]: https://nodejs.org/
[recordrtc]: https://github.com/muaz-khan/WebRTC-Experiment/tree/master/RecordRTC
[recorderjs]: https://github.com/mattdiamond/Recorderjs
[socketio]: https://socket.io/
[binaryjs]: https://binaryjs.com/
[nodewav]: https://github.com/TooTallNate/node-wav
[audiocontext]: https://developer.mozilla.org/en-US/docs/Web/API/AudioContext
[getusermedia]: https://developer.mozilla.org/en-US/docs/Web/API/Navigator.getUserMedia
