import sequelize from "../../config/dbConnection.js";
export const getHealth = async(req,res,next)=>{

  if (req.body.constructor === Object && Object.keys(req.body).length === 0 && Object.keys(req.query).length === 0){
    // console.log(req.body);
    await sequelize.authenticate()
    .then(() => {
      res.status(200).end(); 
    })
    .catch(() => {
      res.status(503).end();
    });
  }
    
  else{
    return notAllowed(req,res,next);
  }

}

export const notFound = (req,res,next)=>{
    res.status(404).end();
}

export const notAllowed = (req,res,next)=>{
  res.status(405).end();
}

export const badRequest = (req,res,next)=>{
  res.status(400).end();
}