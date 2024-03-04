const QueueConnection = require('./QueueConnection') 
const { Worker } = require('bullmq')
const sendEmail = (t)=>new Promise((res,rej)=>setTimeout(()=>res(),t))
const worker = new Worker('mail-queue', async job => {
    console.log(job.data)
    await sendEmail(5000)
  },
{ connection: QueueConnection })

module.exports = worker