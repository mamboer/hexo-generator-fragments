# hexo-generator-fragments

[![Build Status](https://travis-ci.org/mamboer/hexo-generator-fragments.svg?branch=master)](https://travis-ci.org/mamboer/hexo-generator-fragments)  [![NPM version](https://badge.fury.io/js/hexo-generator-fragments.svg)](http://badge.fury.io/js/hexo-generator-fragments) [![Coverage Status](https://coveralls.io/repos/github/mamboer/hexo-generator-fragments/badge.svg?branch=master)](https://coveralls.io/github/mamboer/hexo-generator-fragments?branch=master) 

Generate paged html fragments for Index, Category and Tag pages, let [Hexo](https://github.com/hexojs/hexo) support elegant ajax pagination.

## Installation

``` bash
$ npm install hexo-generator-fragments --save
```

## Options

``` yaml
fragments_generator:
  dir: 'fragments',
  index_layout: 'fragments',
  cate_layout: 'fragments',
  tag_layout: 'fragments',
  per_page: 10,
  order_by: '-date'
```

- **dir**: where the generated fragments should be put
- **index_layout**: Index layout file used by the generator
- **cate_layout**: Category layout file used by the generator
- **tag_layout**: Tag layout file used by the generator
- **per_page**: Posts displayed per page. (0 = disable pagination)
- **order_by**: Posts order. (Order by date descending by default)

## License

MIT

[Aotu.io]: https://aotu.io/
