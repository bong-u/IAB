const e = require('express');
const express = require('express');
const controller = require('../controllers/controller.js');
const userController = require('../controllers/userController.js');

const router = express.Router();
const expense_type_list = ['식비', '교통비', '공과금', '술'];

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'iab/build/index.html'));
});

router.post('/', async (req, res) => {
    const data = {
        asset_color_list : controller.ASSET_COLOR,
        asset_list : await controller.getAsset(),
        expense_type_list : expense_type_list,
    };
    res.send(data);
});

router.post('/asset', async (req, res) => {
    console.log (req.body);
    res.send (req.body);
});
router.post('/transaction', async (req, res) => {
    console.log (req.body);
    res.send (req.body);
});

router.post('/signup', async (req, res) => {
    userController.addUser(req.body['id'], req.body['password']);
    return res.send({response: '회원가입 성공'});
});

router.post('/login', async (req, res) => {
    const isUser = await userController.searchUser(req.body['id'], req.body['password']);
    if (isUser)
        return res.send({response: '로그인 성공'});
    else
        return res.status(401).send({response: '로그인 정보가 올바르지 않습니다.'});
})

module.exports = router;