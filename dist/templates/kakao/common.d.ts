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
declare type ButtonAction = 'webLink' | 'message' | 'phone' | 'block';
declare type QuickReplyAction = 'message' | 'block';
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
export declare class Component {
    fields: {};
    type: string;
    constructor(fields: any, type: string, data?: Object);
    insertData(data: any): void;
    render(): {
        [x: string]: {};
    };
    toJSON(): {};
}
export declare class Thumbnail extends Component {
    constructor(fields: IThumbnail, data?: any);
}
export declare class Button extends Component {
    constructor(fields: IButton, data?: any);
    insertData(data: any): void;
}
export declare class QuickReply extends Component {
    constructor(fields: IQuickReply, data?: any);
    insertData(data: any): void;
}
export declare class Template extends Component {
    constructor(outputs: any[], quickReplies?: QuickReply[]);
}
export declare class SkillResponse extends Component {
    constructor(template: Template, context?: any, data?: any);
    render(): {};
}
export {};
