const { Queue, Worker } = require('bullmq')
const QueueConnection = require('../helper/QueueConnection') 
const MailQueue = new Queue('mail-queue')
module.exports = {
      message:async function(req,res){
            const mail = await MailQueue.add('email', {
                  to: 'user@example.com',
                  subject: 'Welcome email' 
            })
           res.json({
            status:200,
            msg:mail
           })
      }
}