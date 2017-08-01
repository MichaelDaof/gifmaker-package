/**
 * Manage state of meteor-gifmaker here. Simple setting and
 * getting to create fresh object as single source of truth.
 * 
 * Expects definition of number of frames and stores data:URL
 * per frame.
 */

Meteor.init = function(frameCount) {
  // Set default state
  const state = {
    frames: {
      /* Example:
      '0': 'data:URL/sdf/r23fwef',
      '1': null 
      */
    },
    interval: 0.3,
    frameCount: frameCount
  };
  for (let i = 0; i < frameCount; i++) {
    state.frames[i] = null;
  }
  Meteor.state = state;
  console.log('Meteor app initialized')
}

Meteor.getState = function() {
  return Meteor.state;
}

// This should be the only place to set state.
// Fresh object per state update.
Meteor.setState = function(newState) {
  Meteor.state = Object.assign({}, Meteor.state, newState);
}

// Reducer for frame state
Meteor.setSingleFrameState = function(frame) {
  var framesState = {
    frames: Object.assign({}, Meteor.state.frames, frame)
  }
  Meteor.setState(framesState)
}

Meteor.getNextAvailableFrame = function() {
  var state = Meteor.getState();
  for (let i = 0; i < state.frameCount; i++) {
    if (!state.frames[i]) {
      return i
    }
  }
}