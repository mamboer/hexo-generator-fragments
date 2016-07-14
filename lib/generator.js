'use strict';

const pagination = require('hexo-pagination');

module.exports = function(locals) {
  let config = this.config;
  let opts = config.fragments_generator;
  let posts = locals.posts.sort(opts.order_by);
  let data = [];
  // index pagination data
  let dir = opts.dir + '/' + (opts.index_dir || 'index') + '/';
  data = pagination(dir, posts, {
    perPage: opts.per_page,
    layout: [opts.index_layout],
    format: '%d/',
    data: {
      __index: true
    }
  });

  // category pagination data
  data = locals.categories.reduce((result, cate) => {
    if (!cate.length) return result;

    dir = opts.dir + '/' + cate.path;
    posts = cate.posts.sort(opts.order_by);

    let data1 = pagination(dir, posts, {
      perPage: opts.per_page,
      layout: [opts.cate_layout],
      format: '%d/',
      data: {
        category: cate.name
      }
    });
    return result.concat(data1);

  }, data);

  // tag pagination data
  data = locals.tags.reduce((result, item) => {
    if (!item.length) return result;

    dir = opts.dir + '/' + item.path;
    posts = item.posts.sort(opts.order_by);

    let data1 = pagination(dir, posts, {
      perPage: opts.per_page,
      layout: [opts.tag_layout],
      format: '%d/',
      data: {
        tag: item.name
      }
    });
    return result.concat(data1);

  }, data);

  return data;

};
