/* global hexo */

'use strict';

const assign = require('object-assign');

hexo.config.fragments_generator = assign({
  dir: 'fragments',
  index_layout: 'fragments',
  cate_layout: 'fragments',
  tag_layout: 'fragments',
  per_page: typeof hexo.config.per_page === 'undefined' ? 10 : hexo.config.per_page,
  order_by: '-date'
}, hexo.config.fragments_generator);

hexo.extend.generator.register('fragments', require('./lib/generator'));
