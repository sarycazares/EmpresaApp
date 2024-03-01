import localForage from 'localforage'
import useLocalForage from './useLocalForage'

const db = localForage.createInstance({
    name: 'empresa-web',
})

async function create({ key, data }: { key: string, data: any }): Promise<void> {
    try {
        await db.setItem(key, data)
    } catch (err) {
        throw Error('Error al crear item')
    }
}

async function get(key: string): Promise<any> {
    try {
        const data = await db.getItem(key)
        return data
    } catch {
        throw Error('Error al leer item')
    }

}

async function update({ key, newData }: { key: string, newData: any }): Promise<void> {
    try {
        const existingData = await get(key)
        if (existingData) {
            const updatedData = { ...existingData, ...newData }
            await db.setItem(key, updatedData)
        } else {
            throw new Error('Error el elemento no existe')
        }
    } catch {
        throw new Error('Error al modificar item')
    }

}

async function remove(key: string): Promise<void> {
    try {
        await db.removeItem(key)
    } catch {
        throw new Error('Error al eliminar item')
    }
}

async function isExistItem(key: string): Promise<boolean> {

    try {
        const isExist = await db.getItem(key)
        return isExist ? true : false
    } catch (err) {
        throw new Error('Error al verificar item')
    }
}

const localforageServer = {
    create,
    get,
    update,
    remove,
    isExistItem,
    useLocalForage
}

export default localforageServer