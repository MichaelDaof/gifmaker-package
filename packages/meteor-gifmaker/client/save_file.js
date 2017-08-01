/**
 * Files are converted into data:URL's and kept in internal state
 * system as frames for gifshot
 * 
 * Takes callback for asynchronous data handling
 */

Meteor.saveFile = function(blob, frame, callback) {
    // TODO: Investigate possible memory leak for every fileReader.
    // Find ref and and destroy for existing frames.
    var fileReader = new FileReader();    
    fileReader.onload = function(file) {
        // Set single frame data:URL in state
        var singleFrameState = {};
        singleFrameState[frame] = file.target.result;
        Meteor.setSingleFrameState(singleFrameState);
        if (callback) {
            callback(file)
        }
    }
    fileReader.readAsDataURL(blob);
}