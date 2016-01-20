import { Transform } from 'stream';
import { PluginError } from 'gulp-util';
import htmlnano from 'htmlnano';

const PLUGIN_NAME = 'gulp-htmlnano';

export default options => {
    let stream = new Transform({objectMode: true});

    stream._transform = (file, encoding, callback) => {
        if (file.isStream()) {
            return callback(new PluginError(PLUGIN_NAME, 'Streaming not supported'));
        } else if (file.isNull() || ! file.isBuffer()) {
            return callback(null, file);
        }

        htmlnano
            .process(String(file.contents), options)
            .then(result => {
                file.contents = new Buffer(result.html);
                stream.push(file);
                callback();
            })
            .catch(error => {
                // Prevent stream’s unhandled exception from being suppressed by Promise
                setImmediate(function () {
                    callback(new PluginError(PLUGIN_NAME, error));
                });
            });
    };

    return stream;
};
