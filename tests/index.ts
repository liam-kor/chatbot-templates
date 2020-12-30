import { BasicCard, Thumbnail, SimpleImage, SimpleText, Component, Button, CommerceCard, Carousel, CarouselHeader, Template, SkillResponse, ICommerceCard, createCarouselWithData } from '../templates/kakao'
import pupa from 'pupa';
// const createKakaoTemplate = (template: any) => {
//   return {
//     version: '2.0',
//     template: template
//   }
// }

// export const createKakaoSimpleText = (text: string) => {
//   return {
//     outputs: [
//       {
//         simpleText: {
//           text: text
//         }
//       }
//     ]
//   }
// }
const simpleText = new SimpleText('text')
const simpleImage = new SimpleImage('imageUrl', 'altText');
const basicCard = new BasicCard(
  {
    thumbnail:   new Thumbnail({
      imageUrl: 'https://naver.com'
    }),
    title: 'sample title',
    description: 'sample description',
    buttons: [
      new Button({
        label: 'label1',
        action: 'message'
      })
    ]
  }
);
const commerceCard = new CommerceCard(
  {
    thumbnails: [
      new Thumbnail({
        imageUrl: 'https://naver.com'
      }),
    ],
    description: '상품설명',
    price: 10000,
    currency: 'won'
  }

)

const carouselBasicCard = new Carousel(
    [
      basicCard
    ],
    new CarouselHeader(
      'carousel title', 
      'description', 
      new Thumbnail({
        imageUrl: 'https://naver.com'
      })
    ),
)

const template1 = new Template(
  [carouselBasicCard]
)

const skillResponse1 = new SkillResponse(
  template1
)

const commerceCarouselDataList: ICommerceCard[] = [
  {
    thumbnails: [
        new Thumbnail({
          imageUrl: 'https://naver.com'
        }),
    ],
    description: '설명1',
    price: 10000,
    currency: 'won'
  },
  {
    thumbnails: [
        new Thumbnail({
          imageUrl: 'https://naver.com'
        }),
    ],
    description: '설명2',
    price: 20000,
    currency: 'won'
  },
  {
    thumbnails: [
        new Thumbnail({
          imageUrl: 'https://naver.com'
        }),
    ],
    description: '설명3',
    price: 30000,
    currency: 'won'
  }
]

// const carouselCommerceCardWithData = createCommerceCarouselWithData(commerceCarouselDataList);

const printTemplate = (component: Component) => {
  console.log(JSON.stringify(component.render(), null, 2));
}

const replace = (fields: Object, data: Object) => {
  for (const [key, value] of Object.entries(fields)) {
    fields = Object.assign(fields, {
      [key]: pupa(value, data)
    })
  }
  return fields;
}

const testData = {
  imageUrl: 'https://naver.com',
  price: 10000,
  order_id: 1234,
}

const testDataList = [
  {
    imageUrl: 'https://naver.com/1234',
    price: 20000,
    order_id: 1231234,
  },
  {
    imageUrl: 'https://naver.com',
    price: 10000,
    order_id: 1234,
  }
]

const testButton = new Button({
  label: 'order_id: {order_id}',
  action: 'message'
});

const testBasicCard = new BasicCard({
  thumbnail: new Thumbnail({
    imageUrl: '{imageUrl}'
  }),
  title: '{order_id}',
  description: '{order_id}',
  buttons: [
    testButton
  ]
});

const testBasicCardList = createCarouselWithData(testBasicCard, testDataList);

const skillResponse = new SkillResponse(
  new Template(
    [
      testBasicCardList
    ]
  )
)

// printTemplate(skillResponse);
// const testCard = {
//   title: `{imageUrl}`,
//   price: `{price}`
// }

// console.log(replace(testCard, testData));
// console.log(JSON.stringify(testBasicCard));
// console.log(Object.assign(testData, testCard));

// printTemplate(basicCard);
printTemplate(simpleText);
// printTemplate(simpleImage);
// printTemplate(commerceCard);
// printTemplate(carouselBasicCard);
// printTemplate(template1);
// printTemplate(skillResponse1);
// printTemplate(carouselCommerceCardWithData);