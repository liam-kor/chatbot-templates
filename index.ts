const createKakaoTemplate = (template: any) => {
  return {
    version: '2.0',
    template: template
  }
}

export const createKakaoSimpleText = (text: string) => {
  return {
    outputs: [
      {
        simpleText: {
          text: text
        }
      }
    ]
  }
}