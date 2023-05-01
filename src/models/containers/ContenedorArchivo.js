import { promises as fs } from 'fs'

class ContenedorArchivo {

    constructor(ruta) {
        this.ruta = ruta;
    }

    async getById(id) {
        const elems = await this.getAll()
        const buscado = elems.find(e => e.id == id)
        return buscado
    }

    async getAll() {
        try {
            const elems = await fs.readFile(this.ruta, 'utf-8')
            return JSON.parse(elems)
        } catch (error) {
            return []
        }
    }

    async save(elem) {
        const elems = await this.getAll()

        let newId
        if (elems.length == 0) {
            newId = 1
        } else {
            newId = elems[elems.length - 1].id + 1
        }

        const newElem = { ...elem, id: newId }
        elems.push(newElem)

        try {
            await fs.writeFile(this.ruta, JSON.stringify(elems, null, 2))
            return newId
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }
    }

    async guardar(elem) {
        const elems = await this.getAll()

        let newId
        if (elems.length == 0) {
            newId = 1
        } else {
            newId = elems[elems.length - 1].id + 1
        }

        const newElem = { ...elem, id: newId }
        elems.push(newElem)

        try {
            await fs.writeFile(this.ruta, JSON.stringify(elems, null, 2))
            return newId
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }
    }

    async actualizar(elem) {
        const elems = await this.getAll()
        const index = elems.findIndex(e => e.id == elem.id)
        if (index == -1) {
            throw new Error(`Error al actualizar: no se encontró el id ${elem.id}`)
        } else {
            elems[index] = elem
            try {
                await fs.writeFile(this.ruta, JSON.stringify(elems, null, 2))
            } catch (error) {
                throw new Error(`Error al borrar: ${error}`)
            }
        }
    }

    async modifyById(pos, nuevoElem) {
        try {
            const elementos = await this.getAll()
            const carrito = elementos.find(e => e.id == pos)
            if (carrito == -1) {
                throw new Error(`Error al actualizar: no se encontró el id ${pos}`)
            } else {
                console.log("CARRITO DESDE l.88", carrito);
                carrito[0]["productos"].push(nuevoElem)
                console.log("CARRITO DESDE l.90 con PUSH", carrito);
                try {
                    await fs.writeFile(this.ruta, JSON.stringify(nuevoElem, null, 2))
                } catch (error) {
                    throw new Error(`Error al borrar: ${error}`)
                }
            }
            return nuevoElem
        } catch (error) {
            logger.error(error)
        }
    }

    async deleteById(id) {
        const elems = await this.getAll()
        const index = elems.findIndex(e => e.id == id)
        if (index == -1) {
            throw new Error(`Error al borrar: no se encontró el id ${id}`)
        }

        elems.splice(index, 1)
        try {
            await fs.writeFile(this.ruta, JSON.stringify(elems, null, 2))
            return ({Borrado: true})

        } catch (error) {
            throw new Error(`Error al borrar: ${error}`)
        }

    }

    async deleteAll() {
        try {
            await fs.writeFile(this.ruta, JSON.stringify([], null, 2))
        } catch (error) {
            throw new Error(`Error al borrar todo: ${error}`)
        }
    }
}

export default ContenedorArchivo