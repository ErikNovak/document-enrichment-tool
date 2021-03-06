// interfaces
import * as INT from "../Interfaces";

// modules
import * as jsonschema from "jsonschema";

export default class Validator {

    private _validator: jsonschema.Validator;

    public schemas?: INT.IValidatorSchemas;

    // initialize the JSON validator
    constructor(schemas?: INT.IValidatorSchemas) {
        // save the JSON validator
        this._validator = new jsonschema.Validator();
        // the json schemas used to validate
        this.schemas = schemas;
    }


    // object validaton function
    validateSchema(instance: any, schema: jsonschema.Schema) {
        const validation = this._validator.validate(instance, schema);
        return {
            isValid: validation.valid,
            errors: validation.errors,
            message: validation.toString()
        };
    }


    // integer validation function
    validateInteger(instance: any) {
        return Number.isInteger(instance) ? true : false;
    }
}