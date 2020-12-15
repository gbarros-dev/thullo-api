import axios from 'axios'
import * as bcrypt from 'bcryptjs'
import { Response } from 'express'
import * as httpStatus from 'http-status'

import { frontendUrl } from '../utils/serverData'
import { Request } from '../utils/types/common'

import generateToken from '../utils/functions/generateToken'

import UserModel from '../models/User'

type LoginInput = {
  email: string
  password: string
}

type RegisterInput = {
  username: string
  email: string
  password: string
}

export const login = async (req: Request, res: Response): Promise<void> => {
  const data = <LoginInput>req.body

  UserModel.findOne({ email: data.email }, { name: 1, email: 1, password: 1, avatar: 1 })
    .then(async (user) => {
      if (!user) {
        throw {
          message: 'Email and/or password incorrect!',
          status: httpStatus.FAILED_DEPENDENCY,
        }
      }

      const passVerification = await bcrypt.compare(data.password, user.password)

      if (!passVerification) {
        throw {
          erro: 'E-mail e/ou senha incorreto(s)!',
          mensagem: 'Erro na autenticação de usuário!',
          status: httpStatus.FAILED_DEPENDENCY,
        }
      }

      const token = generateToken(user._id)

      user.password = undefined
      res.status(httpStatus.OK).send({
        message: 'User logged successfully!',
        result: user,
        token,
      })
    })
    .catch((err) => {
      res.status(err.status ?? httpStatus.INTERNAL_SERVER_ERROR).send({
        message: err.message ?? 'Internal server erro on user login!',
        error: err.error ?? err,
      })
    })
}

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = <RegisterInput>req.body

    const user = await UserModel.create(data)

    const token = generateToken(user._id)

    user.password = undefined
    res.status(httpStatus.OK).send({
      message: 'User logged successfully!',
      result: user,
      token,
    })
  } catch (err) {
    res.status(err.status ?? httpStatus.INTERNAL_SERVER_ERROR).send({
      message: err.message ?? 'Internal server erro on user login!',
      error: err.error ?? err,
    })
  }
}

export const findUserLogged = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await UserModel.findOne({ _id: req.userId })

    res.status(httpStatus.OK).send({
      message: 'User found!',
      result: user,
    })
  } catch (err) {
    res.status(err.status ?? httpStatus.INTERNAL_SERVER_ERROR).send({
      message: err.message ?? 'Internal server erro on user login!',
      error: err.error ?? err,
    })
  }
}

export const loginGithub = async (req: Request, res: Response): Promise<void> => {
  const { code } = req.query
  try {
    const tokenResponse = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      },
      {
        headers: {
          Accept: 'application/json',
        },
      }
    )

    const { access_token } = tokenResponse.data

    const response = await axios.get('https://api.github.com/user', {
      headers: {
        Authorization: `token ${access_token}`,
      },
    })

    const emails = await axios.get('https://api.github.com/user/emails?scope=user:email', {
      headers: {
        Accept: 'application/vnd.github.v3+json',
        Authorization: `token ${access_token}`,
      },
    })

    const validEmail = emails.data.filter((email: any) => {
      return email.primary === true && email.verified === true
    })

    if (!validEmail) {
      throw {
        status: httpStatus.UNAUTHORIZED,
        message: 'User e-mail not found!',
        error: 'User e-mail not found!',
      }
    } else {
      const { id, login, avatar_url } = response.data

      const githubUser = await UserModel.findOne({ githubId: id })

      let token

      if (!githubUser) {
        const newUser = await UserModel.create({
          githubId: id,
          avatar: avatar_url,
          username: login,
          email: validEmail[0].email,
        })
        token = generateToken(newUser._id)
      } else {
        token = generateToken(githubUser._id)
      }

      res.redirect(`${frontendUrl}?access_token=${token}`)
    }
  } catch (err) {
    res.redirect(`${frontendUrl}?error=${err.message}`)
  }
}
