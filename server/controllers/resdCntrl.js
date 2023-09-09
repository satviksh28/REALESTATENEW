import asyncHandler from "express-async-handler";
import { prisma } from '../config/prismaConfig.js';

export const createResidency = asyncHandler(async (req, res) => {
 
  const {
    title,
    description,
    price,
    address,
    country,
    city,
    facilities,
    image,
    userEmail,
  } = req.body.data;
  console.log(req.body.data);
  try {
    const residency = await prisma.residency.create({
      data: {
        title,
        description,
        price,
        address,
        country,
        city,
        facilities,
        image,
        owner :{connect:{email:userEmail}}, 
      },
    });

    res.send({message:"Residency created Successfully",residency})
  } catch (err) {
    if (err.code === "P2002") {
      throw new Error("A Residency With adress already there");
    }
    throw new Error(err.message);
  }
});

//to get all the documentation/residencies
 export const getAllResidencies=asyncHandler(async(req,res)=>{
  const residencies=await prisma.residency.findMany({
    orderBy:{
      createdAt:"desc",

    },
    
  });
  res.send(residencies)
});


//to get specific document/resoidencies


export const getResidency=asyncHandler(async(req,res)=>{
  const {id}=req.params;
  
  try{

      const residency=await prisma.residency.findUnique({
        where:{id}
      })
      res.send(residency);

  }catch(err){
    throw new Error(err.message);
  }
})