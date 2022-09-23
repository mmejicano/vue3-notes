import { ref, shallowRef } from 'vue';
import SignUpForm from '../components/SignUpForm.vue'
import SingInForm from '../components/SignInForm.vue'

const show = ref(false)
const component = shallowRef()

export function useModal() {
    return {
        show,
        component,
        showModal: (type: 'SignUp' | 'SignIn') => {
            // console.log(SignUp)
            show.value = true
            switch(type){
                case 'SignIn': return component.value = SingInForm
                case 'SignUp': return component.value = SignUpForm
            }
        },
        hideModal: () => (show.value = false),
    }
}

