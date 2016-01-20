import expect from 'expect';
import File from 'vinyl';
import es from 'event-stream';
import gulpHtmlnano from '.';

const html = '<div>  <!-- test -->  </div>';
const minifiedHtml = '<div></div>';


describe('gulp-htmlnano', () => {
    it('should minify HTML', (done) => {
        init(html, minifiedHtml, done);
    });


    it('should not remove HTML comments if removeComments == false', (done) => {
        init(html, '<div><!-- test --></div>', done, {removeComments: false});
    });


    it('should throw an error in stream mode', () => {
        let htmlFile = new File({contents: es.readArray([html])});
        let pluginInstance = gulpHtmlnano();
        expect(() => pluginInstance.write(htmlFile)).toThrow(/Streaming not supported/);
    });


    it('should catch htmlnano errors', (done) => {
        init(html, '', done, {notDefinedModule: true}).on('error', (error) => {
            expect(error.message).toBe('Module "notDefinedModule" is not defined');
            done();
        });
    });
});


function init(html, expectedHtml, done, options = {}) {
    let htmlFile = new File({contents: new Buffer(html)});
    let pluginInstance = gulpHtmlnano(options);
    pluginInstance.write(htmlFile);
    pluginInstance.once('data', file => {
        expect(file.isBuffer()).toBe(true);
        expect(file.contents.toString('utf8')).toBe(expectedHtml);
        done();
    });

    return pluginInstance;
}
