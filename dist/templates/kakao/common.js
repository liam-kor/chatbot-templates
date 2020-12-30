"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkillResponse = exports.Template = exports.QuickReply = exports.Button = exports.Thumbnail = exports.Component = void 0;
const pupa_1 = __importDefault(require("pupa"));
const replace = (fields, data) => {
    for (const [key, value] of Object.entries(fields)) {
        if (typeof value === 'string') {
            fields = Object.assign(fields, {
                [key]: pupa_1.default(value, data)
            });
        }
        else if (value instanceof Component) {
            value.insertData(data);
        }
        else if (value instanceof Array) {
            for (const obj of value) {
                if (obj instanceof Component) {
                    obj.insertData(data);
                }
            }
        }
    }
    return fields;
};
class Component {
    constructor(fields, type, data) {
        this.fields = {};
        this.type = '';
        this.fields = fields;
        this.type = type;
        this.insertData(data);
    }
    insertData(data) {
        if (data && Object.entries(data).length > 0) {
            this.fields = replace(this.fields, data);
        }
    }
    render() {
        return {
            [this.type]: Object.assign({}, this.fields)
        };
    }
    toJSON() {
        return this.fields;
    }
}
exports.Component = Component;
class Thumbnail extends Component {
    constructor(fields, data) {
        super(fields, 'thumbnail');
    }
}
exports.Thumbnail = Thumbnail;
class Button extends Component {
    constructor(fields, data) {
        super(fields, 'button', data);
    }
    insertData(data) {
        super.insertData(data);
        this.fields = Object.assign(Object.assign({}, this.fields), { extra: {
                data: data
            } });
    }
}
exports.Button = Button;
class QuickReply extends Component {
    constructor(fields, data) {
        super(fields, 'quickReply', data);
    }
    insertData(data) {
        super.insertData(data);
        this.fields = Object.assign(Object.assign({}, this.fields), { extra: {
                data: data
            } });
    }
}
exports.QuickReply = QuickReply;
class Template extends Component {
    constructor(outputs, quickReplies) {
        const fields = {
            outputs: outputs,
            quickReplies: quickReplies
        };
        super(fields, 'template');
    }
}
exports.Template = Template;
class SkillResponse extends Component {
    constructor(template, context, data) {
        const fields = {
            version: '2.0',
            template: template,
            context: context,
            data: data
        };
        super(fields, 'skillResponse');
    }
    render() {
        return Object.assign({}, this.fields);
    }
}
exports.SkillResponse = SkillResponse;
