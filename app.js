require('dotenv').config(); // .env 파일에서 환경 변수를 로드

const express = require('express');
const connectDB = require('./config/db');
const User = require('./models/User');
const generateToken = require('./utils/generateToken');
const bcrypt = require('bcryptjs'); // 비밀번호 비교를 위해 추가

connectDB();
const app = express();

//request.body 파싱하기
app.use(express.json());

//회원가입
app.post('/api/register', async(req, res) => {
    const { user } = req.body;
    const existingUser = await User.findOne({ email : user.email });
    if (existingUser) return res.status(400).json({ message: '이미 가입된 이메일입니다.'});

    const newUser = new User(user);
    await newUser.save();
    res.status(201).json({message: '회원가입이 완료되었습니다.'});
});

//로그인
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if(!user) return res.status(400).json({ message: '가입되지 않은 회원입니다.'});

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: '잘못된 비밀번호입니다.'});
    
    const token = generateToken(user);
    res.json({token});
})

app.listen(3000, () => {
    console.log("Serving on port 3000");
});