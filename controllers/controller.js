import Questions from '../models/questionSchema.js'
import Results from '../models/resultSchema.js'
import questions,{answers} from '../db/data.js'

export async function getQuestions(req,res){
    try{
        let q = await Questions.find()
       
        if(q.length===0){
            await Questions.insertMany({questions,answers})
        }
       
        res.json(q)
    }catch(err){
        res.json({err})
    }
}

export async function insertQuestions(req,res){
    try{
        await Questions.insertMany({questions:questions,answers:answers})
    }catch(err){
        res.json({err})
    }
}

export async function dropQuestions(req,res){
    try{
            await Questions.deleteMany();
            res.json({msg:"questions deleted successfully...!"})
    }catch(err){
        res.json({err})
    }
}

export async function getResult(req,res) {
    try{
        const r = await Results.find()
        res.json(r)

    }catch(err){
        res.json({err})
    }
}

export async function storeResult(req,res) {
    try{
        const {username,result,attempts,points,achieved}= req.body

        if(!username && !result ) throw new Error('Data not provided..!')

        const newResult = await Results.create({username,result,attempts,points,achieved})
        
        res.json({msg: "result saved successfully..!",result:newResult})
    }catch(err){
        res.json({err})
    }
    
}

export async function dropResult(req,res){
    try{
        await Results.deleteMany()
        res.json({msg:"result deleted successfully...!"})
    }catch(err){
        res.json({err})
    }
}

