'use strict';

var should = require('chai').should(); // eslint-disable-line
var Hexo = require('hexo');

describe('Fragments generator - index', function() {
  var hexo = new Hexo(__dirname, {silent: true});
  var Post = hexo.model('Post');
  var generator = require('../lib/generator').bind(hexo);
  var posts;
  var locals;

  // Default config
  hexo.config.fragments_generator = {
    dir: 'fragments',
    index_layout: 'fragments-index',
    cate_layout: 'fragments-cate',
    tag_layout: 'fragments-tag',
    per_page: 10,
    order_by: '-date'
  };

  before(function() {
    return Post.insert([
      {source: 'foo', slug: 'foo', date: 1e8, order: 0},
      {source: 'bar', slug: 'bar', date: 1e8 + 1, order: 10},
      {source: 'baz', slug: 'baz', date: 1e8 - 1, order: 1}
    ]).then(function(data) {
      posts = Post.sort('-date');
      locals = hexo.locals.toObject();
    });
  });

  it('pagination enabled', function() {
    hexo.config.fragments_generator.per_page = 2;

    var result = generator(locals);

    result.length.should.eql(2);

    for (var i = 0, len = result.length; i < len; i++) {
      result[i].layout.should.eql(['fragments-index']);
      result[i].data.current.should.eql(i + 1);
      result[i].data.base.should.eql('fragments/index/');
      result[i].data.total.should.eql(2);
    }

    result[0].path.should.eql('fragments/index/');
    result[0].data.current_url.should.eql('fragments/index/');
    result[0].data.posts.should.eql(posts.limit(2));
    result[0].data.prev.should.eql(0);
    result[0].data.prev_link.should.eql('');
    result[0].data.next.should.eql(2);
    result[0].data.next_link.should.eql('fragments/index/2/');
    result[0].data.__index.should.be.true;

    result[1].path.should.eql('fragments/index/2/');
    result[1].data.current_url.should.eql('fragments/index/2/');
    result[1].data.posts.should.eql(posts.skip(2));
    result[1].data.prev.should.eql(1);
    result[1].data.prev_link.should.eql('fragments/index/');
    result[1].data.next.should.eql(0);
    result[1].data.next_link.should.eql('');
    result[1].data.__index.should.be.true;

    // Restore config
    hexo.config.fragments_generator.per_page = 10;
  });

  it('pagination disabled', function() {
    hexo.config.fragments_generator.per_page = 0;

    var result = generator(locals);

    result.length.should.eql(1);

    result[0].path.should.eql('fragments/index/');
    result[0].layout.should.eql(['fragments-index']);
    result[0].data.base.should.eql('fragments/index/');
    result[0].data.total.should.eql(1);
    result[0].data.current.should.eql(1);
    result[0].data.current_url.should.eql('fragments/index/');
    result[0].data.posts.should.eql(posts);
    result[0].data.prev.should.eql(0);
    result[0].data.prev_link.should.eql('');
    result[0].data.next.should.eql(0);
    result[0].data.next_link.should.eql('');
    result[0].data.__index.should.be.true;

    // Restore config
    hexo.config.fragments_generator.per_page = 10;
  });

  describe('order', function() {
    it('default order', function() {
      var result = generator(locals);

      result[0].data.posts.should.eql(posts);
    });

    it('custom order', function() {
      hexo.config.fragments_generator.order_by = '-order';

      var result = generator(locals);

      result[0].data.posts.eq(0).source.should.eql('bar');
      result[0].data.posts.eq(1).source.should.eql('baz');
      result[0].data.posts.eq(2).source.should.eql('foo');

      hexo.config.fragments_generator.order_by = 'order';

      result = generator(locals);

      result[0].data.posts.eq(0).source.should.eql('foo');
      result[0].data.posts.eq(1).source.should.eql('baz');
      result[0].data.posts.eq(2).source.should.eql('bar');

      // Restore config
      delete hexo.config.fragments_generator.order_by;
    });

    it('custom order - invalid order key', function() {
      hexo.config.fragments_generator.order_by = '-something';

      var result = generator(locals);

      result[0].data.posts.eq(0).source.should.eql('foo');
      result[0].data.posts.eq(1).source.should.eql('bar');
      result[0].data.posts.eq(2).source.should.eql('baz');

      // Restore config
      delete hexo.config.fragments_generator.order_by;
    });
  });

  it('custom pagination dir', function() {
    hexo.config.fragments_generator.per_page = 1;
    hexo.config.fragments_generator.dir = 'yo';

    var result = generator(locals);

    result[0].path.should.eql('yo/index/');
    result[1].path.should.eql('yo/index/2/');
    result[2].path.should.eql('yo/index/3/');

    // Restore config
    hexo.config.fragments_generator.per_page = 10;
    hexo.config.fragments_generator.dir = 'fragments';
  });
});
