import client from '..'

async function set({ key, item, maxItems }: { key: string, item: any, maxItems?: number }) {

    try {
        let element = []
        let id = 1

        const isExistSearchList = await client.localforage.isExistItem(key)
        if (isExistSearchList) {
            element = JSON.parse(await client.localforage.get(key))
            //const lastElementIndex = element.length - 1
            const firstElementIndex = 0
            id = element[firstElementIndex].id + 1
        }

        item.id = id

        let newElement
        if (maxItems) {
            const max = (maxItems - 1)
            newElement = [item, ...element.slice(0, max)]
        } else {
            newElement = [item, ...element]
        }

        await client.localforage.create({ key: key, data: JSON.stringify(newElement) })

        return id
    } catch {
        throw ''
    }
}

async function get({ key }: { key: string }) {

    try {
        const isExistList = await client.localforage.isExistItem(key)
        let elementsList
        if (isExistList) {
            const newElement = await client.localforage.get(key)
            elementsList = JSON.parse(newElement)
        } else {
            elementsList = []
        }

        return elementsList
    } catch {
        return []
    }
}

async function getItem({ key, id, propetyName }: { key: string, id: number | string, propetyName: string }) {
    try {
        const isExistList = await client.localforage.isExistItem(key)

        if (isExistList) {
            const getElement = await client.localforage.get(key)
            const element = JSON.parse(getElement)

            const item = element.find((item: { [x: string]: string | number }) => item[propetyName] === id)

            if (!item) {
                throw new Error('Item no encontrado')
            }

            return item

        } else {
            throw new Error('Lista aun no encontrada')
        }


    } catch (error: any) {
        return {}
    }
}

async function remove({ key, id }: { key: string, id: number | string }) {

    try {
        const element = JSON.parse(await client.localforage.get(key))

        const existingIndex = element.findIndex(
            (item: any) => item.id === id
        )

        if (existingIndex === -1) {
            throw new Error('El id no fue encontrado')
        }

        element.splice(existingIndex, 1)
        await client.localforage.create({ key: key, data: JSON.stringify(element) })
    } catch (error: any) {
        throw new Error(error.message)
    }

}


const useLocalForage = {
    set,
    get,
    getItem,
    remove
}

export default useLocalForage