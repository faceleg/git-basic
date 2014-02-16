var https = require('https'),
    exec = require('child_process').exec,
    fs = require('fs'),
    util = require('util');

function pull(localDirectory, callback) {
    exec(util.format('git --git-dir=%s/.git pull', localDirectory), callback);
}

function clone(cloneUrl, localDirectory, callback) {
    exec(util.format('git clone %s %s', cloneUrl, localDirectory), callback);
}

function determineAction(cloneUrl, localDirectory, callback) {
    return function(exists) {
        if (exists) {
            pull(localDirectory, callback);
        } else {
            clone(cloneUrl, localDirectory, callback);
        }
    };
}

function cloneOrPull(cloneUrl, localDirectory, callback) {
    fs.exists(localDirectory, determineAction(cloneUrl, localDirectory, callback));
}

module.exports = {
    clone: clone,
    pull: pull,
    cloneOrPull: cloneOrPull
};
