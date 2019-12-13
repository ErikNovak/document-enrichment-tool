/** ******************************************************************
 * Material: Validation
 * This component validates the material object - checks if all of
 * the required attributes are present and sends them to the
 * appropriate stream.
 */


class Validator {
    constructor() {
        this._name = null;
        this._onEmit = null;
        this._context = null;
    }

    init(name, config, context, callback) {
        this._name = name;
        this._context = context;
        this._onEmit = config.onEmit;
        this._prefix = `[Validator ${this._name}]`;

        // initialize validator with
        this._validator = require("@library/validator")();
        // the validation schema
        this._JSONSchema = config.json_schema;

        // the path to where to store the error
        this._documentErrorPath = config.document_error_path || "error";
        // use other fields from config to control your execution
        callback();
    }

    heartbeat() {
        // do something if needed
    }

    shutdown(callback) {
        // prepare for gracefull shutdown, e.g. save state
        callback();
    }

    receive(message, stream_id, callback) {
        // validate the provided material
        const { valid, errors } = this._validator.validateSchema(message, this._JSONSchema);
        const stream_direction = valid ? stream_id : "stream_error";
        // add errors it present
        if (!valid) {
            this.set(message, this._documentErrorPath, errors);
        }
        // continue to the next bolt
        return this._onEmit(message, stream_direction, callback);
    }
}

exports.create = function (context) {
    return new Validator(context);
};
