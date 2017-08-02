# gifmaker-package
A gifmaker package for meteor; powered by [gifshot.js](https://yahoo.github.io/gifshot/)

meteor-gifmaker is an intuitive system that allows you to use your own images and define your animation by frames and your choice of time intervals between frames.

## Usage
meteor-gifmaker has got a super simple API. It requires you to provide it image files from the browser as constructed by the File constructor.

More easily found in the FileList from the event object in input[type=file] selector.

https://developer.mozilla.org/en-US/docs/Web/API/File

https://developer.mozilla.org/en-US/docs/Web/API/FileReader

Once you get a hold of your file object, determine which frame you want to set it to, then save it
```
Meteor.saveFile(myImgFile, 4[, callback])
```
It'll also take an optional callback which will have the file passed back to you for asynchronous execution.

Once you got all your frames in there, hit ```Meteor.makeGif()``` and meteor-gifmaker will create your animated gif based on the sequece you've defined. And don't worry, if you accidentally defined your frames in non-consecutive frames.

Lastly, meteor-gifmaker provides you with it's simple [Redux-like](https://github.com/reactjs/redux) state system, in case you wanna extend it's functionality in your UI. Currently that's the only way to set the interval time. 

Until I get an interface for that, you can simply run ```Meteor.setState({interval: someTime})``` to define your intervals between frames. It takes time in units of seconds.

And that's it. Let's make some gifs!

## Installation
This repo maintains the meteor-gifmaker package. It's nested as a meteor app which is used to demonstrate it's usage.
```
// From root directory
cd meteor-app
meteor
```

NPM is provided for unit tests for the Meteor package using Mocha/Chai.
```
npm i
npm test
```
