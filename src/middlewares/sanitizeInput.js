const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

exports.sanitizeInput = (req, res, next) => {
  try {
    req.body.content = DOMPurify.sanitize(
      req.body.content,
      {
        FORBID_TAGS: ['style', 'marquee']
      },
      {
        FORBID_ATTR: ['style']
      },
    );

    if (req.body.tags) {
      req.body.tags = req.body.tags.map(tagName => {
        return DOMPurify.sanitize(
          tagName,
          {
            FORBID_TAGS: ['style', 'marquee']
          },
          {
            FORBID_ATTR: ['style']
          },
        );
      });
    }
    return next();
  } catch (error) {
    return next(error);
  }
};