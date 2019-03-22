const mongoose = require('mongoose')
const chalk = require('chalk')

// ----------链接数据库-----------
const DB_URL = 'mongodb://127.0.0.1/test'
mongoose.connect(DB_URL)
const DB = mongoose.connection
// DB.once('open', () => {
//   console.log('MoogoDB connecttion open success')
// })
DB.on('connected', () => {
  console.log(`MoogoDB connect success to ${chalk.green(DB_URL)}`)
})
DB.on('error', err => {
  console.log(`chalk.red(MoogoDB connect fail: ${err})`)
})
DB.on('disconnected', () => {
  console.log('MoogoDB connect disconnected')
})
// ----------链接数据库-----------

// -------------------操作mongoDB-------------------
// 【schema】是mongoose里会用到的一种数据模式，可以理解为表结构的定义；每个schema会映射到mongodb中的一个collection，它不具备操作数据库的能力
const userSchema = new mongoose.Schema({
  username: { type: String, index: true }, // 用户账号  index建索引
  userpwd: { type: String }, // 密码
  userage: { type: Number }, // 年龄
  logindate: { type: Date, default: Date.now } // 最近登录时间
})
// 【model】是由schema生成的模型，可以对数据库的操作
const UserModel = mongoose.model('User', userSchema)
// 操作数据
const UserEntity = new UserModel({
  name: 'ppya',
  userpwd: 'abcd',
  userage: 18,
  logindate: new Date()
})
// 保存数据
UserEntity.save().then((data, len, err) => {
  if (err) {
    console.error('err', err)
  } else {
    console.log('data', data)
  }
  setTimeout(() => {
    // update()
    // findByIdAndUpdate()
    // del()
    // getByConditions()
    // getById('5c9473741c7a92fcea1579bc')
    getByRegex()
  }, 1000)
})

function update () {
  // 根据用户名更新密码
  const wherestr = { username: 'ppya' }
  const updatestr = { userpwd: 'zzzz' }

  UserModel.updateOne(wherestr, updatestr, function (err, res) {
    if (err) {
      console.log('update Error:' + err)
    } else {
      console.log('update Res:' + res)
    }
  })
}

function findByIdAndUpdate () {
  const id = '5c94711b02b183fbdc1b40f8'
  const updatestr = { userpwd: 'findByIdAndUpdate pwd' }

  UserModel.findByIdAndUpdate(id, updatestr, function (err, res) {
    if (err) {
      console.log('findByIdAndUpdate Error:' + err)
    } else {
      console.log('findByIdAndUpdate Res:' + res)
    }
  })
}

function del () {
  const wherestr = { username: 'ppya' }

  UserModel.remove(wherestr, function (err, res) {
    if (err) {
      console.log('del Error:' + err)
    } else {
      console.log('del Res:' + res)
    }
  })
}
function getByConditions () {
  // 条件查询
  const wherestr = { username: 'ppya' }

  UserModel.find(wherestr, function (err, res) {
    if (err) {
      console.log('getByConditions Error:' + err)
    } else {
      console.log('getByConditions Res:' + res)
    }
  })
}

function getById (id) {
  UserModel.findById(id, function (err, res) {
    if (err) {
      console.log('getById Error:' + err)
    } else {
      console.log('getById Res:' + res)
    }
  })
}
function getByRegex () {
  // 模糊查询
  const whereStr = { username: { $regex: /p/i } }

  UserModel.find(whereStr, function (err, res) {
    if (err) {
      console.log('getByRegex Error:' + err)
    } else {
      console.log('getByRegex Res:' + res)
    }
  })
}

function getByPager () {
  // 分页查询
  const pageSize = 5 // 一页多少条
  const currentPage = 1 // 当前第几页
  const sort = { logindate: -1 } // 排序（按登录时间倒序）
  const condition = {} // 条件
  const skipnum = (currentPage - 1) * pageSize // 跳过数

  UserModel.find(condition)
    .skip(skipnum)
    .limit(pageSize)
    .sort(sort)
    .exec(function (err, res) {
      if (err) {
        console.log('Error:' + err)
      } else {
        console.log('Res:' + res)
      }
    })
}

// UserEntity.save((er, data) => {
//   if (err) {
//     console.error('err', err)
//   } else {
//     console.log('data', data)
//   }
// })
// -------------------操作mongoDB---------------------

module.exports = mongoose
