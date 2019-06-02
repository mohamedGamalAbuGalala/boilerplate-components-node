const crypto = require('crypto');
const path = require('path');
const mime = require('mime');
const multer = require('multer');
const fs = require('fs');
const InvalidError = require('../shared/errors/InvalidError');

const dir = './uploads';

const limits = { fileSize: 1024 * 1024, files: 1 };

const mimeTypes = [
  'image/jpeg',
  'image/pjpeg',
  'image/jpeg',
  'image/pjpeg',
  'image/png'
];

const storage = multer.diskStorage({
  destination(req, file, cb) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, './uploads/');
  },
  filename(req, file, cb) {
    crypto.pseudoRandomBytes(6, (err, raw) => {
      cb(
        null,
        `${raw.toString('hex')}.${Date.now()}.${mime.getExtension(
          file.mimetype
        )}`
      );
    });
  }
});

const fileFilter = (req, file, callback) => {
  const ext = path.extname(file.originalname);
  if (
    !mimeTypes.includes(file.mimetype)
    || (ext !== '.jpg' || ext !== '.jpeg' || ext !== '.png')
  )
    return callback(
      new InvalidError(
        'upload.File',
        'Only jpg, jpeg, png files are allowed',
        400
      )
    );
  return callback(null, true);
};

module.exports = (
  fileFilterParam = fileFilter,
  limitsParam = limits,
  storageParam = storage
) =>
  multer({
    fileFilter: fileFilterParam,
    storage: storageParam,
    limits: limitsParam
  });
