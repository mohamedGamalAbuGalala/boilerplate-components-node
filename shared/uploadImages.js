const crypto = require('crypto');
const path = require('path');
const fs = require('fs');

const dir = './uploadedImages';
const mime = require('mime');
const multer = require('multer');

const limits = { fileSize: 1024 * 1024, files: 1 };
const InvalidError = require('../shared/errors/InvalidError');

const mimeTypes = ['image/png', 'image/jpeg', 'image/jpg'];

const storage = multer.diskStorage({
  destination(req, file, cb) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
    cb(null, './uploadedImages/');
  },
  filename(req, file, cb) {
    crypto.pseudoRandomBytes(6, (err, raw) => {
      // need to req.user.rocketId
      cb(
        null,
        `${raw.toString('hex')}.${Date.now()}.${mime.getExtension(
          file.mimetype
        )}`
      );
    });
  }
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname);
  if (
    mimeTypes.includes(file.mimetype)
    || (ext === '.png' || ext === '.jpeg' || ext === '.jpg')
  )
    return cb(null, true);
  return cb(
    new InvalidError(
      'upload.File',
      'Only jpg, jpeg, png files are allowed',
      400
    )
  );
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
