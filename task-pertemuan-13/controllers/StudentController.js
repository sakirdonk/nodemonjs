// import Model Student
const Student = require("../models/Student");

class StudentController {
  // menambahkan keyword async
  async index(req, res) {
    // memanggil method static all dengan async await.
    const students = await Student.all();

    if(students.length > 0){
      const data = {
        message: "Menampilkkan semua students",
        data: students,
      };

      return res.status(200).json(data);
    }
    else{
      const data = {
        message: "Students is empty",
      };

      return res.status(200).json(data);
    }
  }

  async store(req, res) {
    
    const {nama, nim, email, jurusan} = req.body;

    if(!nama || !nim || !email || !jurusan){
      const data = {
        message: "Semua data harus dikirim"
      };
      res.status(422).json(data);
    }

    const students = await Student.create(req.body);
    const data = {
      message: "Menambahkan semua students",
      data: students,
    };
    res.status(201).json(data);
  }

  async update(req, res) {
    const {id} = req.params;
    const student = await Student.find(id);

    if(student){
      const student = await Student.update(id, req.body);
      const data = {
        message: "Mengedit data students",
        data: student
      };
      res.status(200).json(data);
    }
    else{
      const data = {
        message: "Student not found"
      };
      res.status(404).json(data);
    }
  }

  async destroy(req, res) {
    const {id} = req.params;
    const student = await Student.find(id);

    if(student){
      await Student.delete(id);
      const data = {
        message: "Menghapus data students"
      }
      res.status(200).json(data);
    }
    else{
      const data = {
        message: "Student not found"
      }
      res.status(404).json(data);
    }
  }

  async show(req, res) {
    const {id} = req.params;
    const student = await Student.find(id);

    if(student){
      const data = {
        message: "Menampilan detail students",
        data: student
      }
      res.status(200).json(data);
    }
    else{
      const data = {
        message: "Student not found"
      }
      res.status(404).json(data);
    }
  }
}

// Membuat object StudentController
const object = new StudentController();

// Export object StudentController
module.exports = object;