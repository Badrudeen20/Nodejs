
var fs = require('fs')
const root = process.cwd()
let team = []
const captain = []
module.exports = {
  home:async function(req,res){
      
    return res.render('pages/home',{ 
      layout: 'layouts',
    })
  },
  player:async function(req,res){
      fs.readFile(root+"/data/players.json", function(err, data) { 
    
            // Check for errors 
            if (err) throw err; 
        
            // Converting to JSON 
            const player = JSON.parse(data); 
            const menu = player.reduce((acc,cur)=>{
                if(acc[cur.Role]){
                   acc[cur.Role] = [...acc[cur.Role],cur]
                }else{
                  acc[cur.Role] = [cur]
                }
                return acc
            },{})
           
           /*  return res.render('pages/player',{ 
                  layout: 'layouts',
                  menu
            }) */
            return res.json({
              status:true,
              player:menu
            })
      }); 
    
  },
  select:async function(req,res){
    try {
      const { BOWLER,WICKETKEEPER,BATTER,'ALL-ROUNDER': ALLROUNDER } = req.body
   
      team = [...BOWLER,...WICKETKEEPER,...BATTER,...ALLROUNDER]
      return res.json({
        status:true,
      })
    } catch (error) {
      return res.json({
        status:false,
        error
      })
    }
    
  },
  captain:function(req,res){
      if (req.method === 'GET') {
           /*  return res.render('pages/captain',{ 
                  layout: 'layouts',
                  players:players
            }) */
            return res.json({
              status:true,
              team:team
            })
      }else if(req.method === 'POST'){
            const captain = req.body
            const {c,vc} = captain

            let player = team.reduce((acc,cur)=>{
               if(captain[c].c==cur){
                acc.push({name:cur,type:'c'})
               }else if(captain[vc].vc==cur){
                acc.push({name:cur,type:'vc'})
               }else{
                acc.push({name:cur,type:0})
               }
               
                
               return acc 
            },[])
           
            return res.json({
                  status:true,
                  player:player
                  
            })
      }
      
  },
  points:function(req,res){
      let points = 50;
    
      fs.readFile(root+"/data/match.json", function(err, data) { 
    
            // Check for errors 
            if (err) throw err; 
        
            // Converting to JSON 
            const match = JSON.parse(data); 
            console.log(match)
            
            return res.render('pages/points',{ 
                  layout: 'layouts',
                  points:points
            })
           
      }); 

     
  }
}