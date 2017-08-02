/**
 * Gif creation makes no assumptions over usage of created gif image,
 * only allows callback to accept data:URL of gif image.
 * 
 * All necessary data provided by internal state system
 */

Meteor.makeGif = function(cb) {
  var state = Meteor.getState();
  var sequence = makeSequence(state);
  // make gif, provide data:URL of gif to callback
  gifshot.createGIF({'images': sequence, 'interval': state.interval}, function(gif) {
    if (gif.error) {
      console.log('damn: ', gif.error)
    } else {
      cb(gif.image);
    }
  });
}

/////////////
// HELPERS //
/////////////

/**
 * @params{obj} Expects client-side state
 * Example: {
 *   '1': 'url string','frameCount': 5 
 * }
 * returns array sequence of only valid frames 
 */

function makeSequence(state) {
  var userSequence = new Array(state.frameCount) || [];
  var framesState = state.frames;
  for (let frame in framesState) {
    let frameIndex = Number(frame);
    userSequence[frameIndex] = framesState[frame];
  }
  return userSequence.filter(function(frame) { return Boolean(frame)})
}