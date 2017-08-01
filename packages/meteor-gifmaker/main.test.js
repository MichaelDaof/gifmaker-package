/**
 * Mocha unit testing for meteor-gifmaker package
 */

// A global to mock Meteor environment
global.Meteor = {};

const assert = require('chai').assert;

// HTML5 API's
const File = require('file-api');
const FileReader = require('filereader');

// Run Meteor Package modules to decorate mocked Meteor global
require('./client/make_gif');
require('./client/save_file');
require('./client/state');

describe('state', function() {
  describe('#init()', function() {
    it('initiates state', function() {
      const numberOfFrames = 10;
      Meteor.init(numberOfFrames);
      const frameStateLength = Object.keys(Meteor.state.frames).length;
      assert.equal(frameStateLength, numberOfFrames)
    })
  })
  describe('#setState()', function() {
    it('should create new state object')
  })
  describe('#setSingleFrameState()', function() {
    it('should not clobber frame state')
  })
})