import { mount } from 'svelte'
import App from './App.svelte'
import './styles/dropstyle.css'
import './styles/style.css'
import './styles/fonts.css'

const app = mount(App, {
  target: document.getElementById('app'),
})

export default app
