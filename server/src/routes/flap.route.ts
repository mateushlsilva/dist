import { Router, Request, Response, NextFunction } from "express";
import { StatusCodes } from 'http-status-codes';

const flapRoute = Router();
const flap = require('../models/flapTable')



flapRoute.get('/flap', async(req: Request, res: Response, next: NextFunction)=>{
    const flapList = await flap.findAll();
    res.status(StatusCodes.OK).send(flapList)
})

flapRoute.get('/flap/:uuid', async(req: Request<{ uuid: string }>, res: Response, next: NextFunction)=>{
    const uuid = req.params.uuid;
    const project = await flap.findOne({ where: { id: uuid } })
    
    if (project === null) {
        return res.status(StatusCodes.NOT_FOUND).json({
            erro: true,
            mensagem: "flap não cadastrado!"
        })
    } else {
        return res.json(project)
    }
})

flapRoute.post('/flap/cadastrar', async (req: Request, res: Response, next: NextFunction)=>{
    const newflap = req.body
    await flap.create(newflap)
    .then((test) =>{
        console.log(test)
        console.log(test.id)
        return res.json({
            id: test.id,
            erro: false,
            mensagem: "flap cadastrado com sucesso!"
        })
    }).catch(() =>{
        return res.status(StatusCodes.NOT_FOUND).json({
            id: -1,
            erro: true,
            mensagem: "flap não cadastrado!"
        })
    })
})

flapRoute.put('/flap/modificar/:uuid', async(req: Request<{ uuid: string }>, res: Response, next: NextFunction)=>{
    const uuid = req.params.uuid;
    const modifiedFlap = req.body;
    modifiedFlap.uuid = uuid
    await flap.update(modifiedFlap, {
        where: {
            id: uuid
          }
    })
     .then(() =>{
         return res.json({
             erro: false,
             mensagem: "flap atualizado com sucesso!"
         })
     }).catch(() =>{
         return res.status(StatusCodes.NOT_FOUND).json({
             erro: true,
             mensagem: "flap não atualizado!"
        })
     })
})


flapRoute.delete('/flap/deletar/:uuid', async(req: Request<{ uuid: string }>, res: Response, next: NextFunction)=>{
    const uuid = req.params.uuid;
    await flap.destroy({
        where: {
            id: uuid
          }
    })
    .then(() =>{
        return res.json({
            erro: false,
            mensagem: "flap deletado com sucesso!"
        })
    }).catch(() =>{
        return res.status(StatusCodes.NOT_FOUND).json({
            erro: true,
            mensagem: "flap não deletado!"
        })
    })
})


export default flapRoute;