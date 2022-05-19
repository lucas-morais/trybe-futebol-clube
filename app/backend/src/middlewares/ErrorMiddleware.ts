import { NextFunction, Request, Response } from 'express';
import RequestError from '../errors/RequestError';

export default class ErrorMiddleware {
  public static execute = (
    error: Error | RequestError,
    req:Request,
    res:Response,
    _next:
    NextFunction,
  ): Response => {
    if (error.name === 'RequestError') {
      const requestError = error as RequestError;
      return res.status(requestError.status).json({ message: requestError.message });
    }
    return res.status(500).json({ message: 'Internal Server Error' });
  };
}
