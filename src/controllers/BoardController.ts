import { Response } from 'express'
import * as httpStatus from 'http-status'

import { Request } from '../utils/types/common'
import stringToObjectId from '../utils/functions/stringToObjectId'

import BoardModel from '../models/Board'

type BoardInput = {
  name: string
  visibility: 'private' | 'public'
  cover?: string
  description?: string
}

export const findBoards = async (req: Request, res: Response): Promise<void> => {
  BoardModel.findOne()
    .then((board) => {
      res.status(httpStatus.OK).send({
        message: 'Boards founded!',
        result: board,
      })
    })
    .catch((err) => {
      res.status(err.status ?? httpStatus.INTERNAL_SERVER_ERROR).send({
        message: err.message ?? 'Internal server error on boards search!',
        error: err.error ?? err,
      })
    })
}

export const findBoard = async (req: Request, res: Response): Promise<void> => {
  const { boardid } = req.params

  BoardModel.findOne({
    _id: boardid,
  })
    .then((board) => {
      res.status(httpStatus.OK).send({
        message: 'Board founded!',
        result: board,
      })
    })
    .catch((err) => {
      res.status(err.status ?? httpStatus.INTERNAL_SERVER_ERROR).send({
        message: err.message ?? 'Internal server error on board search!',
        error: err.error ?? err,
      })
    })
}

export const insertBoard = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = <BoardInput>req.body

    const board = await BoardModel.create({
      name: data.name,
      cover: data.cover,
      visibility: data.visibility,
      user: req.userId,
    })

    res.status(httpStatus.OK).send({
      message: 'Board inserted!',
      result: board,
    })
  } catch (err) {
    res.status(err.status ?? httpStatus.INTERNAL_SERVER_ERROR).send({
      message: err.message ?? 'Internal server error on board insert!',
      error: err.error ?? err,
    })
  }
}

export const updateBoard = async (req: Request, res: Response): Promise<void> => {
  try {
    const { boardid } = req.params
    const data = <BoardInput>req.body

    const board = await BoardModel.findOneAndUpdate(
      { _id: stringToObjectId(boardid) },
      {
        name: data.name,
        cover: data.cover,
        visibility: data.visibility,
        user: req.userId,
      }
    )

    res.status(httpStatus.OK).send({
      message: 'Board inserted!',
      result: board,
    })
  } catch (err) {
    res.status(err.status ?? httpStatus.INTERNAL_SERVER_ERROR).send({
      message: err.message ?? 'Internal server error on board update!',
      error: err.error ?? err,
    })
  }
}
