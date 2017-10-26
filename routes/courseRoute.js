let express = require('express');
let route = express.Router();
let courseDB = require('../db/courseDB');
let Course = require('../model/Course')
//查询所有
route.get('/findAll',(req,resp)=>{
  courseDB.findAll().then((data)=>{
    resp.send(data);
  }).catch((error)=>{
    resp.send(error);
  });
});
//通过id查询
route.get('/findById',(req,resp)=>{
  courseDB.findById(req.query.id).then((data)=>{
    resp.send(data);
  }).catch((error)=>{
    resp.send(error);
  });
})
//通过name查询
route.get('/findByName',(req,resp)=>{
  courseDB.findByName(req.query.name).then((data)=>{
    resp.send(data);
  }).catch((error)=>{
    resp.send(error);
  });
})
//更新剩余的数
route.get('/update_delete',(req,resp)=>{
  console.log(req.query);
  var surplus =(+req.query.surplus)+1;
  var chosed = (+req.query.chosed)-1;
  courseDB.update_delete(surplus,chosed,req.query.course_name).then((data)=>{
    resp.send(data);
  }).catch((error)=>{
    resp.send(error);
  });
})
//模糊查询
route.get('/query/:keys',(req,resp)=>{
  courseDB.query(req.params.keys).then((data)=>{
    resp.send(data);
  }).catch((error)=>{
    resp.send(err);
  });
})
//录入
route.post('/save',(req,resp)=>{
  let course = new Course();
  Object.assign(course,req.body);
  courseDB.save(course).then((data)=>{
    resp.send(data);
  }).catch((error)=>{
    resp.send(error);
  });
});
//修改
route.post("/update",(req,resp)=>{
  let course = new Course();
  Object.assign(course,req.body);
  courseDB.update(course).then((data)=>{
    resp.send(data);
  }).catch((error)=>{
    resp.send(error);
  });
})
//批量删除
route.post('/batchDelete',(req,resp)=>{
  var ids = JSON.parse(req.body.ids);
  courseDB.batchDelete(ids).then((data)=>{
    resp.send(data);
  }).catch((error)=>{
    resp.send(error);
  });
});

module.exports = route;