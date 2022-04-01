import { Router } from 'express';

interface Controller {
  path: string;
  router: Router; 
  returnData: Object;
  mensaje: string;
  error: boolean;
}

export default Controller;