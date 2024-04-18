import { Request, Response, NextFunction } from "express";
import createError from "http-errors";
interface Item {
      id:number;
      name:string;
      status:boolean
}
class HomeController {
      item:Item[];
      constructor() {
        this.item = [];
        this.view = this.view.bind(this); // Bind the view method to the instance
        this.add = this.add.bind(this); // Bind the add method to the instance
        this.status = this.status.bind(this);
        this.delete = this.delete.bind(this);
      }
      #generateId(len:number):number{
          return Math.floor(Math.random()*10000)
      }
      view(req:Request,res:Response,next: NextFunction) {
         
         return res.render('index',{list:this.item})
      }
      add(req:Request,res:Response) {
         const {item} = req.body
         const list:Item = {
            id:this.#generateId(1000),
            name:item,
            status:false
         }
         this.item.push(list)
         return res.redirect('back')
      }

     /*  edit(req:Request,res:Response){
            return res.redirect('back')
      } */
      delete(req:Request,res:Response){
            const id:number = parseInt(req.params.id)
            this.item = this.item.filter(i=>i.id!==id)
            return res.redirect('back')
      }
      status(req:Request,res:Response){
         const id:number = parseInt(req.params.id)
         this.item = this.item.map(i=>{
            if(i.id==id){
                  i.status= !i.status
            }
            return i
         })
         return res.redirect('back')
      }
}

export default new HomeController()




