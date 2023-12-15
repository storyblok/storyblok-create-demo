export type Region = {
  /** The code of the region EU, US, CN */
  name: string;
  /** The AWS region code eu-central-1, us-east-1, useful for composing the right APP UI URL */
  value: string;
  /** The endpoint for the API, because the hostname differs by the region */
  apiEndpoint: string;
  /** The URL of the Stroyblok UI, for the China is different */
  urlUi: string;
};

type RegionMap = {
  [key: string]: Region;
};

const regions: RegionMap = {
  EU: {
    name: 'EU - Europe',
    value: 'eu-central-1',
    apiEndpoint: 'https://api.storyblok.com/v2/cdn/',
    urlUi: 'https://app.storyblok.com',

  },
  US: {
    name: 'US - United States',
    value: 'us-east-1',
    apiEndpoint: 'https://api-us.storyblok.com/v2/cdn/',
    urlUi: 'https://app.storyblok.com',
  },
  CN: {
    name: 'CN - China',
    value: 'cn-north-1',
    apiEndpoint: 'https://app.storyblokchina.cn/v2/cdn/',
    urlUi: 'https://app.storyblokchina.cn/fe/editor_v2',
  },
  CA: {
    name: 'CA - Canada',
    value: 'ca-central-1',
    apiEndpoint: 'https://api-ca.storyblok.com/v2/cdn/',
    urlUi: 'https://app.storyblok.com',
  },
  AP: {
    name: 'AP - Australia',
    value: 'ap-southeast-2',
    apiEndpoint: 'https://api-ap.storyblok.com/v2/cdn/',
    urlUi: 'https://app.storyblok.com',
  },
}

export default regions
