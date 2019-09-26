/**
 * Output the basic bolt template.
 */

class BasicBolt {

    constructor() {
        this._name = null;
        this._onEmit = null;
        this._context = null;
    }

    init(name, config, context, callback) {
        // create sometyhing if needed
        callback();
    }

    heartbeat() {
        // do something if needed
    }

    shutdown(callback) {
        // prepare for gracefull shutdown, e.g. save state
        callback();
    }

    /**
     * @description Extracts the data from the object.
     * @param {Object} object - The object from which we wish to extract information.
     * @param {String} path - The path of the value to be extracted.
     */
    get(object, path) {
        let schema = object;
        let pathList = path.split('.');
        for (let val of pathList) {
            schema = schema[val];
        }
        return schema;
    }

    /**
     * @description Sets the value from the object.
     * @param {Object} object - The object from which we wish to set value.
     * @param {String} path - The path of the value to be assigned.
     * @param {Object} value - The value to be assigned.
     */
    set(object, path, value) {
        let schema = object;
        let pathList = path.split('.');
        let pathLength = pathList.length;
        for (let i = 0; i < pathLength - 1; i++) {
            var el = pathList[i];
            if (!schema[el]) {
                schema[el] = {};
            }
            schema = schema[el];
        }
        schema[pathList[pathLength - 1]] = value;
    }


    receive(message, stream_id, callback) {
        // do something
        callback();
    }

}
// export the basic bolt
module.exports = BasicBolt;