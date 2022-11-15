const e = require('express');
const express = require('express');
const controller = require('../controllers/controller.js');
const userController = require('../controllers/userController.js');
const tokenController = require('../controllers/tokenController.js');

const router = express.Router();
const expense_type_list = ['식비', '교통비', '공과금', '술'];

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'iab/build/index.html'));
});

router.post('/', async (req, res) => {
    const user_id = tokenController.verifyToken(req.header('Authorization'));

    if (user_id) {
        const data = {
            asset_color_list : controller.ASSET_COLOR,
            asset_list : await controller.getAsset(user_id),
            expense_type_list : expense_type_list,
        };
        res.send(data);
    }
    else { return res.status(401).send({result: 'Unauthorized'}); }
});

router.post('/asset', async (req, res) => {
    const user_id = tokenController.verifyToken(req.header('Authorization'));
    const item = req.body;

    if (user_id) {
        await controller.addAsset(user_id, item);
        return res.send (user_id, item);
    }
    else { return res.status(401).send({result: 'Unauthorized'}); }
});
router.post('/transaction', async (req, res) => {
    const user_id = tokenController.verifyToken(req.header('Authorization'));
    const item = req.body;

    if (user_id) {
        await controller.addTransaction(user_id, item);
        // return res.send (user_id, item);
    }
    else { return res.status(401).send({result: 'Unauthorized'}); }
});

router.post('/signup', async (req, res) => {
    userController.addUser(req.body['id'], req.body['password']);
    return res.send({response: '회원가입 성공'});
});

router.post('/login', async (req, res) => {
    const user_id = await userController.searchUser(req.body['id'], req.body['password']);
    if (user_id)
        return tokenController.createToken(req, res, user_id);
    else
        return res.status(401).send({response: '로그인 정보가 올바르지 않습니다.'});
})

module.exports = router;