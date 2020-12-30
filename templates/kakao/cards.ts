import { IThumbnail, IButton, Thumbnail, Button, Component } from './common'

export interface IBasicCard {
  title?: string;
  description?: string;
  thumbnail: Thumbnail;
  buttons?: Button[];
}

export interface ICommerceCard {
  thumbnails: Thumbnail[],
  description: string,
  price: number,
  currency: string,
  buttons?: Button[],
  discount?: number,
  discountRate?: number,
  discountPrice?: number
}

export class BasicCard extends Component {
  constructor(fields: IBasicCard, data?: any) {
    super(fields, 'basicCard', data);
  }
}

export class CommerceCard extends Component {
  constructor(fields: ICommerceCard, data?: any) {
    super(fields, 'commerceCard', data);
  }
}

export interface CommerceCarouselData {
  thumbnails: Thumbnail[];
  description: string;
  price: number;
  currency: string;
  buttons?: Button[]
}

export interface BasicCarouselData {
  thumbnail: Thumbnail,
  title: string,
  description: string,
  buttons?: Button[]
}

export const createCarouselWithData = (card: CommerceCard | BasicCard, dataList: any, header?: CarouselHeader) => {
  const items = [];
  for (const data of dataList) {
    card.insertData(data);
    items.push(card);
  }
  return new Carousel(items, header);
}

export class CarouselHeader extends Component {
  constructor(title: string, description: string, thumbnail: Thumbnail, data?: any) {
    const fields = {
      title: title,
      description: description,
      thumbnail: thumbnail
    }
    super(fields, 'header', data);
  }
}

export class Carousel extends Component {
  constructor(items: CommerceCard[] | BasicCard[], header?: CarouselHeader) {
    const fields = {
      type: items[0].type,
      items: items,
      header: header
    }
    super(fields, 'carousel');
  }
}