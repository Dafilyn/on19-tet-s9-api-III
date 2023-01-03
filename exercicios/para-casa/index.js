const express = require("express")
const app = express()
const port = 3000
const listaDeUsuarios = require("./model/usuarios.json")

app.use(express.json())

// - [X] Uma rota que atualiza todos os dados de cadastro de um usuário e se não for encontrado cria um novo na lista - DONE
app.put("/users/:id",(req, res)=>{
    const userId = req.params.id
    const userData = req.body
    
    if(listaDeUsuarios.find(usuario => usuario.id == userId)){
        listaDeUsuarios.map((usuario, index)=>{
            if(usuario.id == userId){
                return listaDeUsuarios[index] = userData
            }
        })
        return res.status(200).json({message: "Usuário atualizado com sucesso"})
    }else{
    listaDeUsuarios.push(userData)
    return res.status(201).json({ message:"O usuário não existe e foi criado com sucesso!"})
    }
})

// - [X] Uma rota que atualiza apenas o endereço do usuário - DONE
app.patch("/users/:id",(req, res)=>{
    const userId = req.params.id
    const changeAddr = req.body

    const existeUsuario = listaDeUsuarios.find(usuario => usuario.id == userId)

    if(existeUsuario){
        const userData = {
            ...existeUsuario,
            ...changeAddr
        }

        listaDeUsuarios.map((usuario, index)=>{
            if(usuario.id == userId){
                listaDeUsuarios[index] = userData
            }
        })
        return res.status(200).json({
            message:"Usuário atualizado com sucesso!",
            usuario:userData
        }
        )
    }else{
    return res.status(404).json({message:`${userId} não existe`})
    }
})

// - [X] Uma rota que ao receber um ID de usuário , consegue deletar ele da lista de usuários. - DONE
app.delete("/users/:id",(req, res)=>{
    const userId = req.params.id

    if(listaDeUsuarios.find(usuario => usuario.id == userId)){
        listaDeUsuarios.map((usuario, index)=>{
            if(usuario.id == userId){
                listaDeUsuarios.splice(index,1)
            }
        })

        return res.status(200).json({
            message:"Usuário apagado com sucesso",
            usuario: userId
        }
        )
    }else{
    return res.status(404).json({ message:`Não foi possível apagar ${userId} pois não foi encontrado`})
    }
})

// - [X] Usar corretamente os retornos com os respectivos status codes! - DONE
app.listen(port, ()=>{ console.log(`A Api está rodando na porta ${3000}`)})