import express from 'express'
import cors from 'cors'
import data from "./mockData.js"

const PORT = process.env.PORT || 8080

const app = express()

app.use(cors())
app.use(express.json())

app.get('/post', (req, res)=> {
    try {
        const packPosts = Number(req.query.packPosts)-1
        const countPackPosts = Math.ceil(data.length / 10)

        if(countPackPosts-1 < packPosts || packPosts < 0){
            return res.status(400).send({ message: 'packPage not found' });
        }

        const packData = data.slice(10 * packPosts, (10 * packPosts) + 10)

        res.send({
            'currentPage': packPosts+1,
            'data': packData,
            'packLength': countPackPosts
        })

    }catch (e) {
        res.status(400).send(e)
    }
})

app.get('/test', (req, res) => {
    res.send('<h1>Server Run</h1>')
})


app.listen(PORT, () => console.log(`server has benn started on port: ${PORT}`))