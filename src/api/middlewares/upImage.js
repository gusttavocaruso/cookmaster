const multer = require('multer');
const { resolve } = require('path');

const folderWay = resolve(__dirname, '../../uploads');

const storage = multer.diskStorage({
  destination: (_r, _file, cb) => cb(null, folderWay),
  filename: (r, _file, cb) => cb(null, `${r.params.id}.jpeg`),
});

const upload = multer({ storage });
const upp = upload.single('image');

module.exports = upp;
