import { Request, Response, NextFunction } from 'express';


export const onlyJefe = (req: Request, res: Response, next: NextFunction) => {
  const {usuario, password} = req.body
  next(); 
};

export const onlyEmpleado = (req: Request, res: Response, next: NextFunction) => {
  const {usuario, password} = req.body
  next(); 
};

