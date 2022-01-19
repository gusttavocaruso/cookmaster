const multer = require('multer');
const path = require('path');

const folderWay = path.join(__dirname, '/../uploads');

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, folderWay),
  filename: (req, _file, cb) => cb(null, `${req.params.id}.jpeg`),
});

const upload = multer({ storage });
const upp = upload.single('image');

module.exports = upp;
