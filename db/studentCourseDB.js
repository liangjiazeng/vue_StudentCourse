let pool = require('./pool');
module.exports = {
  //选课
  selectCourse:function(studentId,courseId){
    var sql = "insert into xk_studentcourse values(null,0,(select id from xk_student where name ='"+studentId+"'),"+courseId+")";
    console.log(sql);
    return pool.execute(sql);
  },
  //取消选课
  cancelCourse:function(studentId,courseId){
    var sql = 'delete from xk_studentcourse where student_id='+studentId+' and course_id='+courseId;
    return pool.execute(sql);
  },
   //查询所有选课关系
  findSelectedCourse:function(){
    var sql = 'select s.*,c.*,sc.*'
      +' from xk_student as s,xk_studentcourse as sc,xk_course as c'
      +' where s.id = sc.student_id'
      +' and c.id = sc.course_id';
    return pool.execute({sql:sql,nestTables:true});
  },
  selectCourseByKeys:function(keys){
    var sql = "select distinct sc.*,s.*,c.* from xk_studentcourse as sc inner join xk_student as s on(sc.student_id=s.id) inner join xk_course as c on (sc.course_id=c.id) where sc.student_id like '%"
    +keys+"%' or sc.course_id like '%"
    +keys+"%' or sc.student_id=(select id from xk_student where name like '%"
    +keys+"%') or sc.course_id=(select id from xk_course where name like '%"
    +keys+"%') and sc.course_id=c.id and sc.student_id=s.id";
    console.log(sql)
    return pool.execute({sql:sql,nestTables:true});
  },
  //通过学生ID查询已经选课信息
  findSelectedCourseByStudentId:function(studentId){
    var sql = 'select s.*,c.*,sc.*'
      +' from xk_student as s,xk_studentcourse as sc,xk_course as c'
      +' where s.id = sc.student_id'
      +' and c.id = sc.course_id'
      +' and s.id = '+studentId;
    return pool.execute({sql:sql,nestTables:true});
  },
  //打分
  score:function(id,score){
    var sql = 'update xk_studentcourse set grade ='+score+' where id = '+id;
    return pool.execute(sql);
  }
}


