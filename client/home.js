/**
 * A simple example of how to use meteor-gifmaker package
 * 
 * Upload images as your frames, pick a time interval
 * between frams, make gif and download. 
 * Supports Drag-and-Drop
 * 
 * Powered by Gifshot. https://yahoo.github.io/gifshot/
 * Happy Giffing!
 * 
 */


// Prepare gifmaker state to manage given number of frames
Meteor.init(5);

// A single place of reference for all relevant DOM nodes
var mounts = {};

Template.gifmaker.created = function() {
    var $inst = Template.instance();
    // External node reference for extensible frame manipulation features
    mounts['$' + $inst.data.frame] = $inst;
}

Template.gifmaker.events({
    'change input': function(ev) {
        var inst = Template.instance();
        _.each(ev.target.files, function(file) {
            Meteor.saveFile(file, inst.data.frame, function() {
                updateUIWithFileName(inst, file.name)
            });
        });
    }
});

Template.gifmaker.helpers({
    'frame': function() {
        return Template.instance().data.frame;
    }
})

Template.dropFile.events({
    'dropped #dropDiv': function(ev) {
        ev.preventDefault()
        var frame = Meteor.getNextAvailableFrame();
        var file = ev.originalEvent.dataTransfer.files[0];
        Meteor.saveFile(file, frame, function() {
            updateUIWithFileName(mounts['$'+frame], file.name)
        });
    }
})

Template.submit.events({
    'click': function(ev) {
        Meteor.makeGif(function(result) {
            var $gif = document.getElementById('gif');
            var $download = document.createElement('a');
            var $gifImg = document.createElement('img');
            $download.href = result;
            $download.innerText = 'Download';
            $download.download = true;
            $gifImg.src = result;
            // Clear mount, make room for new gif image.
            $gif.innerHTML = ''
            $gif.appendChild($download);
            $gif.appendChild($gifImg);
        })
    }
})

Template.interval.events({
    'change input': function(ev) {
        Meteor.setState({interval: ev.target.value/1000})
    },
    'keyup input': function(ev) {
        Meteor.setState({interval: ev.target.value/1000})
    },
    'blur input': function(ev) {
        Meteor.setState({interval: ev.target.value/1000})
    }
})

// Control input and filename display instead of using default input display
function updateUIWithFileName(node, filename) {
    node.lastNode.textContent = filename
}
