import Prisma from '@prisma/client';
const { PrismaClient } = Prisma;
const prisma = new PrismaClient();

export default {

    async createUser(req, res) {

        try {
            const { name, email } = req.body
            let user = await prisma.user.findUnique({ where: { email } })

            if (user)
                return res.status(200).json({ error: 'Usuário já existe' })

            console.log('[servidor]', req.method, 'em', req.originalUrl)
            console.log('[servidor]', name, email)
            user = await prisma.user.create({
                data: { name, email }
            })

            return res.status(200).json(user)
        }

        catch (err) {
            return res.status(403).json({ err })
        }
    },

    async findAllUsers(req, res) {
        try {
            const users = await prisma.user.findMany()

            console.log('[servidor]', req.method, 'em', req.originalUrl)
            console.log('[servidor]', users)
            return res.status(200).json(users)

        } catch (error) {
            return res.status(403).json({ error })
        }


    },

    async findAUser(req, res) {
        try {
            const { id } = req.params;
            const user = await prisma.user.findUnique({ where: { id: Number(id) } })
            if (!user) {
                console.log('[servidor]', req.method, 'em', req.originalUrl)
                console.log('[servidor]', id, 'Recurso inexistente')
                return res.status(404).json({ error: 'Recurso inexistente' })
            }
            console.log('[servidor]', req.method, 'em', req.originalUrl)
            console.log('[servidor]', user)
            return res.status(200).json(user)

        } catch (error) {
            return res.status(403).json({ error })
        }
    },

    async updateUser(req, res) {
        try {
            const { id } = req.params;
            const { name, email } = req.body
            let user = await prisma.user.findUnique({ where: { id: Number(id) } })
            if (!user) {
                console.log('[servidor]', req.method, 'em', req.originalUrl)
                console.log('[servidor]', id, 'Recurso inexistente')
                return res.status(404).json({ error: 'Recurso inexistente' })
            }
            user = await prisma.user.update({
                where: { id: Number(id) },
                data: { name, email }
            })
            console.log('[servidor]', req.method, 'em', req.originalUrl)
            console.log('[servidor]', id, user)
            return res.status(200).json(user)
        } catch (error) {
            console.log(error)
            return res.status(404).json({ error })
        }
    },

    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            const user = await prisma.user.findUnique({ where: { id: Number(id) } })
            if (!user) {
                console.log('[servidor]', req.method, 'em', req.originalUrl)
                console.log('[servidor]', id, 'Recurso inexistente')
                return res.status(404).json({ error: 'Recurso inexistente' })
            }

            await prisma.user.delete({ where: { id: Number(id) } })
            console.log('[servidor]', req.method, 'em', req.originalUrl)
            console.log('[servidor]', user)
            return res.status(200).json({message: 'Usuário deletado'})

        } catch (error) {
            return res.status(403).json({ error })
        }
    }
}



