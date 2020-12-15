import { Response } from 'express'
import * as httpStatus from 'http-status'

import { ObjectId, Request } from '../utils/types/common'
import stringToObjectId from '../utils/functions/stringToObjectId'

import BoardUserModel from '../models/BoardUser'
import InvitationModel from '../models/Invitation'
import AssignmentTaskModel from '../models/AssignmentTask'

type BoardUserInput = {
  board: string
  role: 'admin' | 'user'
}

// a new member to a board
export const insertBoardUser = async (req: Request, res: Response): Promise<void> => {
  const data = <BoardUserInput>req.body

  BoardUserModel.create({
    board: stringToObjectId(data.board),
    user: stringToObjectId(req.userId),
    role: data.role,
  })
    .then((boardUser) => {
      res.status(httpStatus.OK).send({
        message: 'Board user inserted!',
        result: boardUser,
      })
    })
    .catch((err) => {
      res.status(err.status ?? httpStatus.INTERNAL_SERVER_ERROR).send({
        message: err.message ?? 'Internal server error on insert board user!',
        error: err.error ?? err,
      })
    })
}

// delete a member from board
export const deleteBoardUser = async (req: Request, res: Response): Promise<void> => {
  const { boardid, userid } = req.params
  try {
    await BoardUserModel.deleteMany({ board: stringToObjectId(boardid), user: stringToObjectId(userid) })
    await InvitationModel.deleteMany({ board: stringToObjectId(boardid), user: stringToObjectId(userid) })
  } catch (err) {
    res.status(err.status ?? httpStatus.INTERNAL_SERVER_ERROR).send({
      message: err.message ?? 'Internal server error on insert board user!',
      error: err.error ?? err,
    })
  }
}
