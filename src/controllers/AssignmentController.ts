import { Response } from 'express'
import * as httpStatus from 'http-status'

import { Request } from '../utils/types/common'

import TaskModel from '../models/Task'
import AssignmentTaskModel from '../models/AssignmentTask'
import BoardModel from '../models/Board'
import UserModel from '../models/User'

export const insertAssignment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { taskId, userId } = req.body

    const task = await TaskModel.findOne({ _id: taskId })

    if (!task) {
      throw {
        status: httpStatus.NOT_FOUND,
        message: 'Task not found!',
        error: 'Task not found!',
      }
    } else {
      const board = await BoardModel.findOne({ _id: task.board })

      if (!board) {
        throw {
          status: httpStatus.NOT_FOUND,
          message: 'Board not found!',
          error: 'Board not found!',
        }
      } else {
        await AssignmentTaskModel.create({ task: taskId, user: userId })

        const userAssigned = await UserModel.findOne({ _id: userId })

        res.status(httpStatus.OK).send({
          message: 'User assignments',
          result: userAssigned,
        })
      }
    }
  } catch (err) {
    res.status(err.status ?? httpStatus.INTERNAL_SERVER_ERROR).send({
      message: err.message ?? 'Internal server erro on user login!',
      error: err.error ?? err,
    })
  }
}

export const deleteAssignment = async (req: Request, res: Response): Promise<void> => {
  try {
    const { taskId, userId } = req.body

    const task = await TaskModel.findOne({ _id: taskId })

    if (!task) {
      throw {
        status: httpStatus.NOT_FOUND,
        message: 'Assignment not found',
        error: 'Assignment not found',
      }
    } else {
      const board = await BoardModel.findOne({ _id: task.board })

      if (!board) {
        throw {
          status: httpStatus.NOT_FOUND,
          message: 'Board not found',
          error: 'Board not found',
        }
      } else {
        await AssignmentTaskModel.findOneAndDelete({ task: taskId, user: userId })

        res.status(httpStatus.OK).send({
          message: 'Assignment task deleted!',
        })
      }
    }
  } catch (err) {
    res.status(err.status ?? httpStatus.INTERNAL_SERVER_ERROR).send({
      message: err.message ?? 'Internal server erro on user login!',
      error: err.error ?? err,
    })
  }
}
