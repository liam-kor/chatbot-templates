import { CommerceCard } from "./cards";
import pupa from 'pupa';

export interface IThumbnail {
  imageUrl: string;
  link?: ILink;
  fixedRatio?: boolean;
  width?: number;
  height?: number;
}

export interface ILink {
  pc?: string;
  mobile?: string;
  web?: string;
}

type ButtonAction = 'webLink' | 'message' | 'phone' | 'block';
type QuickReplyAction = 'message' | 'block';

export interface IButton {
  label: string;
  action: ButtonAction;
  webLinkUrl?: string;
  messageText?: string;
  phoneNumber?: string;
  blockId?: string;
  extra?: any;
}

export interface IQuickReply {
  label: string;
  action: QuickReplyAction;
  messageText?: string;
  blockId?: string;
  extra?: any;
}

const replace = (fields: Object, data: Object) => {
  for (const [key, value] of Object.entries(fields)) {
    if (typeof value === 'string') {
      fields = Object.assign(fields, {
        [key]: pupa(value, data)
      })
    } else if (value instanceof Component) {
      value.insertData(data);
    } else if (value instanceof Array) {
      for (const obj of value) {
        if (obj instanceof Component) {
          obj.insertData(data);
        }
      }
    }
  }
  return fields;
}

export class Component {
  fields = {};
  type = '';

  constructor(fields: any, type: string, data?: Object) {
    this.fields = fields;
    this.type = type;
    this.insertData(data);
  }

  insertData(data: any) {
    if (data && Object.entries(data).length > 0) {
      this.fields = replace(this.fields, data);
    }
  }

  render() {
    return {
      [this.type] : {
        ...this.fields
      }
    }
  }

  toJSON() {
    return this.fields;
  }
}

export class Thumbnail extends Component {
  constructor(fields: IThumbnail, data?: any) {
    super(fields, 'thumbnail');
  }
}

export class Button extends Component {
  constructor(fields: IButton, data?: any) {
    super(fields, 'button', data);
  }

  insertData(data: any) {
    super.insertData(data);
    this.fields = {
      ...this.fields,
      extra: {
        data: data
      }
    };
  }
}

export class QuickReply extends Component {
  constructor(fields: IQuickReply, data?: any) {
    super(fields, 'quickReply', data);
  }

  insertData(data: any) {
    super.insertData(data);
    this.fields = {
      ...this.fields,
      extra: {
        data: data
      }
    };
  }
}

export class Template extends Component {
  constructor(outputs: any[], quickReplies?: QuickReply[]) {
    const fields = {
      outputs: outputs,
      quickReplies: quickReplies
    }
    super(fields, 'template');
  }
}

export class SkillResponse extends Component {
  constructor(template: Template, context?: any, data?: any) {
    const fields = {
      version: '2.0',
      template: template,
      context: context,
      data: data
    }
    super(fields, 'skillResponse');
  }

  render() {
    return {
        ...this.fields
    }
  }
}