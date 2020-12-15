import { Response } from 'express'
import * as httpStatus from 'http-status'

import { Request } from '../utils/types/common'

import AttachmentTaskModel from '../models/AttachmentTask'

export const insertAttachmentTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, url, format, publicId, taskId } = req.body

    const attachment = await AttachmentTaskModel.create({
      name,
      url,
      format,
      publicId,
      task: taskId,
      user: req.userId,
    })

    res.status(httpStatus.OK).send({
      message: 'Attachment task inserted!',
      result: attachment,
    })
  } catch (err) {
    res.status(err.status ?? httpStatus.INTERNAL_SERVER_ERROR).send({
      message: err.message ?? 'Internal server erro on user login!',
      error: err.error ?? err,
    })
  }
}

export const deleteAttachmentTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { attachmentid } = req.params

    await AttachmentTaskModel.findOneAndDelete({ _id: attachmentid })

    res.status(httpStatus.OK).send({
      message: 'Attachment task deleted!',
    })
  } catch (err) {
    res.status(err.status ?? httpStatus.INTERNAL_SERVER_ERROR).send({
      message: err.message ?? 'Internal server erro on user login!',
      error: err.error ?? err,
    })
  }
}
