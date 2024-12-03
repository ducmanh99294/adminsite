const express = require('express');
const multer = require('multer');
const tripmodels = require('../models/Trip');
const methodOverride = require('method-override'); // Cài đặt method-override
const router = express.Router();

// Cấu hình multer để upload ảnh
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'public/images/'),  // Đường dẫn đến thư mục public/images
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
});

const upload = multer({ storage });

// Sử dụng method-override
router.use(methodOverride('_method'));

// Hiển thị danh sách Trips
router.get('/', async (req, res) => {
  try {
    const trips = await tripmodels.find();
    res.render('index', { tripmodels: trips });
  } catch (err) {
    console.error('Lỗi khi lấy dữ liệu tripmodels:', err);
    res.status(500).send('Lỗi khi lấy dữ liệu');
  }
});

// Hiển thị form thêm mới Trip
router.get('/new', (req, res) => {
  res.render('form', { trip: {}, action: '/trips', method: 'POST' });
});

// Xử lý thêm mới Trip
router.post('/', upload.single('avatar'), async (req, res) => {
  const { name, time, days, price } = req.body;
  const avatar = req.file ? '/images/' + req.file.filename : null;
  try {
  const newTrip = await tripmodels.create({ name, time, days, price, avatar });
  res.redirect('/trips');
  res.status(201).json(newTrip);
 } catch (err) {
  console.error('Lỗi khi thêm dữ liệu:', err);
  res.status(500).json({ error: 'Lỗi khi thêm dữ liệu' });
}
}); 

// Hiển thị form chỉnh sửa Trip
router.get('/:_id/edit', async (req, res) => {
  const trip = await tripmodels.findById(req.params.id);
  if (!trip) {
    return res.status(404).send('Trip không tồn tại');
  }
  res.render('form', { trip, action: `/trips/${trip.id}?_method=PUT`, method: 'POST' });
});

// Xử lý cập nhật Trip
router.put('/:_id', upload.single('avatar'), async (req, res) => {
  const { name, time, days, price } = req.body;
  const avatar = req.file ? '/images/' + req.file.filename : null;

  const trip = await tripmodels.findById(req.params.id);
  if (!trip) {
    return res.status(404).send('Trip không tồn tại');
  }

  trip.name = name;
  trip.time = time;
  trip.days = days;
  trip.price = price;
  if (avatar) trip.avatar = avatar;

  await trip.save();
  res.redirect('/trips');
});

// Xóa Trip
router.delete('/:_id', async (req, res) => {
  await tripmodels.findByIdAndDelete(req.params.id);
  res.redirect('/trips');
});

module.exports = router;
