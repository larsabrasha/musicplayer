const SerialPort = require("serialport");
const Readline = SerialPort.parsers.Readline;
var itunes = require('itunes-node-applescript');

const controls = require('./controls.json');
const albums = require('./albums.json');

const port = new SerialPort("/dev/tty.usbmodem1431", {
  baudRate: 9600
});
const parser = port.pipe(new Readline({ delimiter: "\r\n" }));

parser.on("data", data => {
  // console.log(data);

  if (controls.playpause === data) {
    console.log("playPause");
    itunes.playPause();
  } else if (controls.next === data) {
    console.log("next");
    itunes.next();
  } else {
    const album = albums[data];  
    if (album) {
      console.log("album: " +  album);
      itunes.playAlbum(album);
    }
  }
});
