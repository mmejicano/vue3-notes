// custom store

import { reactive, readonly } from "vue"

interface PostsState {
    foo:string
}
export class PostsStore {
    #state: PostsState
    
    constructor() {
        this.#state = reactive<PostsState>({
            foo: 'foo'
        })
    }
    getState() {
        return readonly(this.#state)
    }
    
    updateFoo(foo: string) {
        this.#state.foo = foo
    }
}

const store = new PostsStore()

// store.updateFoo("nuevo valor")

// inject/provide
export function usePosts() {
    return store
}