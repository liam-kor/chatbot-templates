"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const kakao_1 = require("../templates/kakao");
const pupa_1 = __importDefault(require("pupa"));
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
const simpleText = new kakao_1.SimpleText('text');
const simpleImage = new kakao_1.SimpleImage('imageUrl', 'altText');
const basicCard = new kakao_1.BasicCard({
    thumbnail: new kakao_1.Thumbnail({
        imageUrl: 'https://naver.com'
    }),
    title: 'sample title',
    description: 'sample description',
    buttons: [
        new kakao_1.Button({
            label: 'label1',
            action: 'message'
        })
    ]
});
const commerceCard = new kakao_1.CommerceCard({
    thumbnails: [
        new kakao_1.Thumbnail({
            imageUrl: 'https://naver.com'
        }),
    ],
    description: '상품설명',
    price: 10000,
    currency: 'won'
});
const carouselBasicCard = new kakao_1.Carousel([
    basicCard
], new kakao_1.CarouselHeader('carousel title', 'description', new kakao_1.Thumbnail({
    imageUrl: 'https://naver.com'
})));
const template1 = new kakao_1.Template([carouselBasicCard]);
const skillResponse1 = new kakao_1.SkillResponse(template1);
const commerceCarouselDataList = [
    {
        thumbnails: [
            new kakao_1.Thumbnail({
                imageUrl: 'https://naver.com'
            }),
        ],
        description: '설명1',
        price: 10000,
        currency: 'won'
    },
    {
        thumbnails: [
            new kakao_1.Thumbnail({
                imageUrl: 'https://naver.com'
            }),
        ],
        description: '설명2',
        price: 20000,
        currency: 'won'
    },
    {
        thumbnails: [
            new kakao_1.Thumbnail({
                imageUrl: 'https://naver.com'
            }),
        ],
        description: '설명3',
        price: 30000,
        currency: 'won'
    }
];
// const carouselCommerceCardWithData = createCommerceCarouselWithData(commerceCarouselDataList);
const printTemplate = (component) => {
    console.log(JSON.stringify(component.render(), null, 2));
};
const replace = (fields, data) => {
    for (const [key, value] of Object.entries(fields)) {
        fields = Object.assign(fields, {
            [key]: pupa_1.default(value, data)
        });
    }
    return fields;
};
const testData = {
    imageUrl: 'https://naver.com',
    price: 10000,
    order_id: 1234,
};
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
];
const testButton = new kakao_1.Button({
    label: 'order_id: {order_id}',
    action: 'message'
});
const testBasicCard = new kakao_1.BasicCard({
    thumbnail: new kakao_1.Thumbnail({
        imageUrl: '{imageUrl}'
    }),
    title: '{order_id}',
    description: '{order_id}',
    buttons: [
        testButton
    ]
});
const testBasicCardList = kakao_1.createCarouselWithData(testBasicCard, testDataList);
const skillResponse = new kakao_1.SkillResponse(new kakao_1.Template([
    testBasicCardList
]));
printTemplate(skillResponse);
// const testCard = {
//   title: `{imageUrl}`,
//   price: `{price}`
// }
// console.log(replace(testCard, testData));
// console.log(JSON.stringify(testBasicCard));
// console.log(Object.assign(testData, testCard));
// printTemplate(basicCard);
// printTemplate(simpleText);
// printTemplate(simpleImage);
// printTemplate(commerceCard);
// printTemplate(carouselBasicCard);
// printTemplate(template1);
// printTemplate(skillResponse1);
// printTemplate(carouselCommerceCardWithData);
