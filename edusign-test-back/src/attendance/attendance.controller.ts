import { Router } from 'express'
import { AttendanceService } from './attendance.service'

export const AttendanceController = Router()

const service = new AttendanceService()


AttendanceController.get('/', (req, res) => {

  const attendance = service.getOne()

  if (!attendance) {
    throw "Attendance not found"
  }

  return res
    .status(200)
    .json(attendance)
})

AttendanceController.put('/students/:id', (req, res) => {
  const id = Number(req.params.id)

  //TODO : Add validator/authorizer
  if (!Number.isInteger(id)) {
    throw "ID must be an integer"
  }

  const updatedStudent = service.updateStudent(req.body, id)

  return res
    .status(200)
    .json(updatedStudent)
})
