import {makeAutoObservable} from "mobx"

class PostStore {

    data = []
    loading = true
    currentPage = null
    totalPage = null

    constructor() {
        makeAutoObservable(this)
    }


    getPosts({pageCount = 1}) {
        if (this.totalPage === null || this.totalPage >= pageCount) {
            this.loading = true

            const getPosts = new Promise((resolve, reject) => {
                fetch(`http://localhost:8080/post?packPosts=${pageCount}`)
                    .then(r => {
                        this.loading = false
                        resolve(r.json())
                    })
                    .catch((err) => {
                        this.loading = false
                        reject(err.json())
                    })
            })

            console.log(this.totalPage, pageCount, 'htegdrfseda')

            getPosts.then((res) => {
                this.currentPage = res.currentPage
                this.totalPage = res.packLength

                let lastDataIndex = res?.data?.length - 1
                let lastResIndex = this?.data?.length - 1

                if (res.data[lastDataIndex]?.id !== this.data[lastResIndex]?.id) this.data = [...this.data, ...res.data]
            })
        }

    }

}

export default new PostStore()