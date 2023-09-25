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
    name: 'EU',
    value: 'eu-central-1',
    apiEndpoint: 'https://api.storyblok.com/v2/cdn/',
    urlUi: 'https://app.storyblok.com',

  },
  US: {
    name: 'US',
    value: 'us-east-1',
    apiEndpoint: 'https://api-us.storyblok.com/v2/cdn/',
    urlUi: 'https://app.storyblok.com',
  },

}

export default regions
