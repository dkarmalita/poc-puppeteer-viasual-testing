# Visual testing using Puppeteer and Jest (POC)

## Dependencies

* [Puppeteer](https://github.com/puppeteer/puppeteer)
* [Jest](https://github.com/facebook/jest)
* [jest-image-snapshot](https://github.com/americanexpress/jest-image-snapshot)

## How to use

```sh
git clone https://github.com/dkarmalita/poc-viasual-testing.git
cd poc-viasual-testing
npm ci
npm run test-snapshot
```

> If you need update snapshots, run `npm run test-snapshots-update` instead of `npm run test-snapshot`.
